import { afterAll, afterEach, beforeAll, beforeEach, test } from "bun:test";
import { chromium, type Browser, type BrowserContext, type Page } from "playwright";
import { expect } from "playwright/test";
import index from "../fixtures/contracts.html";
import { themeNames, themes } from "@cinder/tokens";

let server: ReturnType<typeof Bun.serve>;
let browser: Browser;
let context: BrowserContext;
let page: Page;
let errors: string[];

beforeAll(async () => {
  server = Bun.serve({
    port: 0,
    hostname: "127.0.0.1",
    routes: { "/": index },
    development: false,
  });
  browser = await chromium.launch({
    channel: process.env.PLAYWRIGHT_CHANNEL ?? "chrome",
    headless: true,
  });
});

beforeEach(async () => {
  context = await browser.newContext({
    baseURL: String(server.url),
    reducedMotion: "reduce",
    locale: "en-US",
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

test("refs, custom DOM rendering, render-prop classes/children, and controlled fields survive the wrappers", async () => {
  await page.goto("/");
  await page.getByRole("button", { name: "Focus action via ref" }).click();
  const action = page.getByRole("button", { name: "Contract action" });
  await expect(action).toBeFocused();
  await expect(action).toHaveAttribute("data-custom-render", "true");
  await page.keyboard.down("Space");
  await expect(action).toHaveText("Pressing");
  await expect(action).toHaveClass(/cinder-button.*consumer-pressed/);
  await page.keyboard.up("Space");
  await expect(page.getByRole("status", { name: "Press count" })).toHaveText("1");
  await expect(action).toHaveText("Ready");
  await page.getByRole("button", { name: "Focus field via ref" }).click();
  const field = page.getByRole("textbox", { name: "Controlled name" });
  await expect(field).toBeFocused();
  await field.fill("Changed by the consumer");
  await expect(page.getByRole("status", { name: "Controlled value" })).toHaveText(
    "Changed by the consumer",
  );
  await page.getByText("Choice off", { exact: true }).click();
  await expect(page.getByRole("checkbox", { name: "Contract option" })).toBeChecked();
  await expect(page.locator(".cinder-checkbox.consumer-selected")).toHaveText("Choice on");
  const custom = page.getByRole("textbox", { name: "Custom anatomy" });
  await expect(custom).toHaveAttribute("aria-invalid", "true");
  await expect(custom).toHaveAccessibleDescription("This account name is already taken.");
  await expect(page.locator(".cinder-field.consumer-invalid")).toContainText("Server error");
});

test("generic dynamic collections preserve the current single/multiple value API", async () => {
  await page.goto("/");
  await page.getByRole("button", { name: "Alpha Dynamic single" }).click();
  await page.getByRole("option", { name: "Gamma", exact: true }).click();
  await expect(page.getByRole("status", { name: "Single value", exact: true })).toHaveText("gamma");
  await expect(page.getByRole("listbox", { name: "Dynamic single" })).toBeHidden();
  await page.getByRole("button", { name: "Beta Dynamic multiple" }).click();
  await page.getByRole("option", { name: "Alpha", exact: true }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("status", { name: "Multiple values", exact: true })).toHaveText(
    "beta,alpha",
  );
  const combo = page.getByRole("combobox", { name: "Multiple combobox" });
  await combo.fill("Gam");
  // Wait for the filtered view: ArrowDown on a still-closed popup opens all items.
  const options = page.getByRole("listbox", { name: "Multiple combobox" }).getByRole("option");
  await expect(options).toHaveCount(1);
  const gamma = page.getByRole("option", { name: "Gamma", exact: true });
  await expect(gamma).toBeVisible();
  await combo.press("ArrowDown");
  await expect(combo).toHaveAttribute("aria-activedescendant", (await gamma.getAttribute("id"))!);
  await combo.press("Enter");
  await expect(page.getByRole("option", { name: "Gamma", exact: true })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await combo.press("Escape");
  await expect(combo).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByRole("status", { name: "Combobox values", exact: true })).toHaveText(
    "gamma",
  );
});

for (const theme of themeNames) {
  test(`${theme}: nested themes, saturated layers, and RTL survive modal and nested popover portals`, async () => {
    await page.goto("/?portals");
    await page.getByRole("combobox", { name: "Contract theme" }).selectOption(theme);
    await page.getByRole("combobox", { name: "Contract direction" }).selectOption("rtl");
    await expect(page.locator(".inherited-locale")).toHaveAttribute("dir", "rtl");
    await expect(page.locator(".inherited-locale")).toHaveAttribute("lang", "ar-AE");
    await expect(page.locator(".first-layer")).toHaveAttribute("data-cinder-layer", "1");
    await expect(page.locator(".second-layer")).toHaveAttribute("data-cinder-layer", "2");
    await expect(page.locator(".saturated-layer")).toHaveAttribute("data-cinder-layer", "2");
    for (const [selector, suffix] of [
      [".inherited-locale", "00"],
      [".first-layer", "01"],
      [".second-layer", "02"],
      [".saturated-layer", "02"],
    ] as const) {
      const separator = await page.locator(selector).evaluate((element) => {
        const probe = document.createElement("span");
        probe.style.borderBottom = "1px solid var(--cinder-border-subtle)";
        element.append(probe);
        const color = getComputedStyle(probe).borderBottomColor;
        probe.remove();
        return color;
      });
      const expected = await page.evaluate((value) => {
        const style = document.createElement("span").style;
        style.color = value;
        return style.color;
      }, themes[theme][`border-subtle-${suffix}`]);
      expect(separator).toBe(expected);
    }
    const fieldColor = await page.evaluate((value) => {
      const style = document.createElement("span").style;
      style.color = value;
      return style.color;
    }, themes[theme]["field-03"]);
    await expect(page.getByRole("textbox", { name: "Layer field" })).toHaveCSS(
      "background-color",
      fieldColor,
    );
    const trigger = page.getByRole("button", { name: "Open contract dialog" });
    await trigger.click();
    const overlay = page.locator(".cinder-modal-overlay");
    await expect(overlay).toHaveAttribute("data-cinder-theme", theme);
    await expect(overlay).toHaveAttribute("data-cinder-layer", "2");
    await expect(overlay).toHaveAttribute("dir", "rtl");
    await expect(overlay).toHaveCSS("animation-name", "none");
    expect(await overlay.evaluate((element) => element.closest(".inner-theme"))).toBeNull();
    const inside = page.getByRole("textbox", { name: "Inside dialog" });
    await expect(inside).toBeFocused();
    await expect(inside).toHaveCSS("background-color", fieldColor);
    const nested = page.getByRole("button", { name: "Nested actions" });
    await nested.click();
    const popover = page.locator(".cinder-popover");
    await expect(popover).toHaveAttribute("data-cinder-theme", theme);
    await expect(popover).toHaveAttribute("data-cinder-layer", "2");
    await expect(popover).toHaveAttribute("dir", "rtl");
    await expect(popover).toHaveCSS("animation-name", "none");
    await page.keyboard.press("Escape");
    await expect(nested).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
    await page.keyboard.press("Tab");
    await page.getByRole("button", { name: "Layer hint" }).focus();
    await expect(page.getByRole("tooltip")).toHaveAttribute("data-cinder-theme", theme);
    await expect(page.getByRole("tooltip")).toHaveAttribute("data-cinder-layer", "2");
    await expect(page.getByRole("tooltip")).toHaveAttribute("dir", "rtl");
  });
}
