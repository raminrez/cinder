import { afterAll, afterEach, beforeAll, beforeEach, test } from "bun:test";
import { chromium, type Browser, type BrowserContext, type Page } from "playwright";
import { expect } from "playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { startPreview } from "../../scripts/preview";

let server: Awaited<ReturnType<typeof startPreview>>;
let browser: Browser;
let context: BrowserContext;
let page: Page;
let errors: string[];

beforeAll(async () => {
  server = await startPreview({ port: 0 });
  browser = await chromium.launch({
    channel: process.env.PLAYWRIGHT_CHANNEL ?? "chrome",
    headless: true,
  });
});
beforeEach(async () => {
  context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  // External font CDNs never resolve in CI; keep the page local and deterministic.
  await context.route(/^https?:\/\/(?!127\.0\.0\.1|localhost)/, (route) => route.abort());
  page = await context.newPage();
  page.setDefaultTimeout(15000);
  errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
});
afterEach(async () => {
  await context?.close();
  expect(errors).toEqual([]);
});
afterAll(async () => {
  await browser?.close();
  await server?.stop();
});

for (const path of ["/", "/docs/components/button"]) {
  test(`${path} renders without console or a11y errors`, async () => {
    const response = await page.goto(new URL(path, server.url).href, {
      waitUntil: "domcontentloaded",
    });
    expect(response?.status()).toBe(200);
    await expect(page.locator("main, body").first()).toBeVisible();
    const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(violations.map((violation) => `${violation.id}: ${violation.nodes[0]?.target}`)).toEqual(
      [],
    );
  });
}
