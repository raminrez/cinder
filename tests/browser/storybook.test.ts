import { afterAll, afterEach, beforeAll, beforeEach, test } from "bun:test";
import { resolve, sep } from "node:path";
import { chromium, type Browser, type BrowserContext, type Page } from "playwright";
import { expect } from "playwright/test";

type StoryFinished = {
  storyId: string;
  status: "success" | "error";
  reporters: {
    type: string;
    status: "passed" | "failed" | "warning";
    result: unknown;
  }[];
};

type StorybookWindow = Window & {
  __STORYBOOK_ADDONS_CHANNEL__?: {
    last(event: "storyFinished"): [StoryFinished] | undefined;
    last(event: string): unknown[] | undefined;
  };
};

const root = resolve(import.meta.dir, "../../dist/storybook");
const indexFile = Bun.file(resolve(root, "index.json"));
if (!(await indexFile.exists()) || !(await Bun.file(resolve(root, "iframe.html")).exists()))
  throw new Error("Run bun run build:storybook before running the Storybook browser tests.");

const index: { entries: Record<string, { id: string; type: string }> } = await indexFile.json();
const stories = Object.values(index.entries).filter(({ type }) => type === "story");
if (!stories.length)
  throw new Error("No stories in dist/storybook/index.json. Run bun run build:storybook.");

let server: ReturnType<typeof Bun.serve>;
let browser: Browser;
let context: BrowserContext;
let page: Page;
let errors: string[];

beforeAll(async () => {
  server = Bun.serve({
    port: 0,
    hostname: "127.0.0.1",
    development: false,
    async fetch(request) {
      if (request.method !== "GET" && request.method !== "HEAD")
        return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
      let path: string;
      try {
        path = decodeURIComponent(new URL(request.url).pathname);
      } catch {
        return new Response("Bad request", { status: 400 });
      }
      if (path.includes("\0")) return new Response("Bad request", { status: 400 });
      const filename = resolve(root, `.${path === "/" ? "/index.html" : path}`);
      if (!filename.startsWith(`${root}${sep}`))
        return new Response("Not found", { status: 404 });
      const file = Bun.file(filename);
      return (await file.exists())
        ? new Response(file)
        : new Response("Not found", { status: 404 });
    },
  });
  browser = await chromium.launch({
    channel: process.env.PLAYWRIGHT_CHANNEL ?? "chrome",
    headless: true,
  });
});

beforeEach(async () => {
  errors = [];
  context = await browser.newContext({
    baseURL: String(server.url),
    viewport: { width: 1440, height: 1000 },
    locale: "en-US",
    reducedMotion: "reduce",
  });
  page = await context.newPage();
  page.setDefaultTimeout(8000);
  page.on("pageerror", (error) => errors.push(error.message));
});

afterEach(async () => {
  await context?.close();
  expect(errors).toEqual([]);
});

afterAll(async () => {
  await browser?.close();
  server?.stop(true);
});

for (const theme of ["frame-light", "frame-dark"]) {
  for (const { id } of stories) {
    test(`${theme}: ${id} completes play and accessibility`, async () => {
      const query = new URLSearchParams({ id, viewMode: "story", globals: `theme:${theme}` });
      const response = await page.goto(`/iframe.html?${query}`);
      expect(response?.status()).toBe(200);

      // storyRendered precedes addon afterEach; storyFinished includes its a11y reports.
      const handle = await page.waitForFunction(
        (storyId) => {
          const channel = (window as StorybookWindow).__STORYBOOK_ADDONS_CHANNEL__;
          for (const event of [
            "storyThrewException",
            "storyErrored",
            "playFunctionThrewException",
            "unhandledErrorsWhilePlaying",
          ]) {
            const exception = channel?.last(event);
            if (exception) throw new Error(`${event}: ${JSON.stringify(exception)}`);
          }
          const finished = channel?.last("storyFinished")?.[0];
          return finished?.storyId === storyId ? finished : undefined;
        },
        id,
        { timeout: 30000 },
      );
      const finished = await handle.jsonValue();
      await handle.dispose();
      expect(finished?.status, JSON.stringify(finished)).toBe("success");
      expect(finished?.reporters.filter(({ status }) => status === "failed")).toEqual([]);
      for (const report of finished?.reporters ?? [])
        expect(report.result).not.toHaveProperty("error");
      expect(
        finished?.reporters.find(({ type }) => type === "a11y"),
        "Every story must complete the a11y afterEach check.",
      ).toMatchObject({ status: "passed", result: { violations: [] } });
      await expect(page.locator("#storybook-root > [data-cinder-theme]")).toHaveAttribute(
        "data-cinder-theme",
        theme,
      );
    }, 60000);
  }
}
