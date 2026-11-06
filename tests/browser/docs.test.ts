import { afterAll, afterEach, beforeAll, beforeEach, describe, test } from "bun:test";
import { chromium, type Browser, type BrowserContext, type Page } from "playwright";
import { expect } from "playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
import { components } from "../../apps/docs/src/catalog";
import { startPreview } from "../../scripts/preview";

let server: Awaited<ReturnType<typeof startPreview>>;
let browser: Browser;
let context: BrowserContext;
let page: Page;
let errors: string[];
const carbonThemes = {
  white: "White",
  g10: "Gray 10",
  g90: "Gray 90",
  g100: "Gray 100",
};

beforeAll(async () => {
  server = await startPreview({ port: 0 });
  browser = await chromium.launch({
    channel: process.env.PLAYWRIGHT_CHANNEL ?? "chrome",
    headless: true,
  });
  await mkdir("test-results", { recursive: true });
});

beforeEach(async () => {
  context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    locale: "en-US",
    reducedMotion: "reduce",
  });
  page = await context.newPage();
  page.setDefaultTimeout(8000);
  errors = [];
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

async function visit(path: string) {
  const response = await page.goto(new URL(path, server.url).href);
  expect(response?.status()).toBe(200);
  await expect(page.locator("main h1")).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
}

async function accessible(name: string, selector?: string) {
  let audit = new AxeBuilder({ page }).withTags([
    "wcag2a",
    "wcag2aa",
    "wcag21a",
    "wcag21aa",
    "wcag22aa",
  ]);
  if (selector) audit = audit.include(selector);
  const result = await audit.analyze();
  if (result.violations.length)
    await Bun.write(`test-results/a11y-${name}.json`, JSON.stringify(result, null, 2));
  expect(
    result.violations.map((violation) => ({
      id: violation.id,
      nodes: violation.nodes.map((node) => ({ target: node.target, summary: node.failureSummary })),
    })),
  ).toEqual([]);
}

async function fits(width: number) {
  await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
  const dimensions = await page.evaluate(() => ({
    viewport: innerWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(dimensions.content, `Document overflow at ${width}px`).toBeLessThanOrEqual(
    dimensions.viewport,
  );
}

describe("production routes", () => {
  test("home entrances retain Carbon timing after minification and settle for reduced motion", async () => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await visit("/");
    const heading = page.locator("#setup-title");
    await heading.evaluate((element) => element.scrollIntoView({ behavior: "instant" }));
    await expect
      .poll(() =>
        heading.evaluate((element) =>
          element.getAnimations().map((animation) => animation.effect?.getTiming().duration),
        ),
      )
      .toContain(700);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect.poll(() => heading.evaluate((element) => element.getAnimations().length)).toBe(0);
    await expect(heading).toHaveCSS("opacity", "1");
    await expect(heading).toHaveCSS("transform", "none");
    await expect(page.locator(".hero-theme-strip")).toHaveCSS("animation-name", "none");
  });

  for (const path of ["/", "/components", "/foundations", "/get-started", "/research", "/relay"]) {
    test(`${path} renders at desktop, tablet, and mobile widths`, async () => {
      await visit(path);
      for (const width of [1440, 768, 390]) await fits(width);
      await accessible(path.replaceAll("/", "") || "home");
    });
  }

  test("serves deep links, immutable assets, HEAD, and genuine missing-file errors", async () => {
    for (const path of ["/components/button/", "/foundations/", "/get-started/", "/relay/"]) {
      await visit(path);
      expect(await page.locator("main h1").count()).toBe(1);
    }
    const html = await (await fetch(new URL("/components/button", server.url))).text();
    const script = html.match(/src="(\/[^"]+\.js)"/);
    expect(script).not.toBeNull();
    const asset = await fetch(new URL(script![1]!, server.url), { method: "HEAD" });
    expect(asset.status).toBe(200);
    expect(asset.headers.get("cache-control")).toContain("immutable");
    expect(await asset.text()).toBe("");
    expect((await fetch(new URL("/missing.js", server.url))).status).toBe(404);
    expect((await fetch(new URL("/not-a-route", server.url))).status).toBe(404);
    const post = await fetch(server.url, { method: "POST" });
    expect(post.status).toBe(405);
    expect(post.headers.get("allow")).toBe("GET, HEAD");
  });
});

describe("complete component catalog", () => {
  for (const entry of components) {
    test(`${entry.name}: four themes, responsive layout, and automated accessibility`, async () => {
      await visit(`/components/${entry.slug}?theme=g10`);
      await expect(
        page.getByRole("heading", { name: entry.name, exact: true, level: 1 }),
      ).toBeVisible();
      await expect(page.locator(".example-canvas")).not.toHaveText(
        "Choose a component from the navigation.",
      );
      await accessible(`${entry.slug}-g10`);
      for (const [theme, label] of Object.entries(carbonThemes)) {
        if (theme === "g10") continue;
        await page
          .getByRole("radiogroup", { name: "Preview theme" })
          .getByRole("radio", { name: label, exact: true })
          .click();
        await expect(page.locator(".site-root")).toHaveAttribute("data-cinder-theme", theme);
        await accessible(`${entry.slug}-${theme}`, ".example-canvas");
      }
      for (const width of [1440, 768, 390]) await fits(width);
    });
  }
});
