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
    await expect(page.getByRole("button", { name: "Nested Carbon action" })).toHaveCSS(
      "border-radius",
      "0px",
    );
    await expect(page.getByRole("button", { name: "Nested Carbon action" })).toHaveCSS(
      "background-color",
      "rgb(15, 98, 254)",
    );
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
    await expect(overlay).toHaveAttribute("lang", "ar-AE");
    await expect(overlay).not.toHaveClass(/\bcinder-theme\b/);
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
    await expect(popover).toHaveAttribute("lang", "ar-AE");
    await expect(popover).not.toHaveClass(/\bcinder-theme\b/);
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
    await expect(page.getByRole("tooltip")).toHaveAttribute("lang", "ar-AE");
  });
}

const portalSelectors = [
  ".cinder-modal-overlay",
  ".cinder-popover",
  ".cinder-tooltip",
  ".cinder-toast-region",
];

async function openAppearanceOverlays() {
  await page.getByRole("button", { name: "Show provider toast" }).click();
  await page.getByRole("button", { name: "Open appearance dialog" }).click();
  await page.getByRole("button", { name: "Open appearance settings" }).click();
  const roots = portalSelectors.map((selector) => page.locator(selector));
  for (const root of roots) await expect(root).toBeVisible();
  return roots;
}

test("appearance recipes inherit, replace, and clear on all four portal roots without copying root props", async () => {
  await page.goto("/?appearance");
  await page.addStyleTag({
    content: `
      .brand-a { --cinder-focus: rgb(120, 40, 180); --cinder-font-sans: Georgia, serif; }
      .brand-b { --cinder-focus: rgb(0, 90, 100); --cinder-font-sans: Verdana, sans-serif; }
    `,
  });
  const child = page.locator(".appearance-child");
  await expect(child).toHaveClass(/\bbrand-a recipe-common\b/);
  await expect(child).toHaveAttribute("data-cinder-theme", "white");
  await expect(child).toHaveAttribute("data-cinder-layer", "0");
  await expect(page.locator(".local-language-layer")).toHaveAttribute("data-cinder-layer", "1");

  const siblingTrigger = page.getByRole("button", { name: "Open sibling popover" });
  await siblingTrigger.click();
  const sibling = page.locator(".cinder-popover");
  await expect(sibling).toHaveClass(/\bbrand-b\b/);
  await expect(sibling).not.toHaveClass(/brand-a|recipe-common/);
  await expect(sibling).toHaveCSS("--cinder-focus", "rgb(0, 90, 100)");
  await expect(sibling).toHaveCSS("font-family", "Verdana, sans-serif");
  await expect(sibling).toHaveAttribute("lang", "de-DE");
  await page.keyboard.press("Escape");
  await expect(siblingTrigger).toBeFocused();

  const roots = await openAppearanceOverlays();
  for (const root of roots) {
    await expect(root).toHaveClass(/\bbrand-a recipe-common\b/);
    await expect(root).toHaveCSS("--cinder-focus", "rgb(120, 40, 180)");
    await expect(root).toHaveCSS("font-family", "Georgia, serif");
    await expect(root).not.toHaveClass(/cinder-theme|layout-only|appearance-child/);
    expect(await root.getAttribute("data-theme-only")).toBeNull();
    expect(await root.getAttribute("title")).toBeNull();
    expect(await root.getAttribute("appearanceclassname")).toBeNull();
    expect(await root.evaluate((element) => (element as HTMLElement).style.paddingTop)).toBe("");
  }
  await expect(page.locator("#appearance-root-only")).toHaveCount(1);
  await expect(page.locator(".cinder-modal-overlay")).toHaveClass(/consumer-overlay/);
  await expect(page.locator(".cinder-modal")).not.toHaveClass(/brand-a|recipe-common/);
  await expect(page.locator(".cinder-popover")).toHaveClass(
    /consumer-popover-(top|bottom|left|right)/,
  );
  await expect(page.locator(".cinder-tooltip")).toHaveClass(
    /consumer-tooltip-(top|bottom|left|right)/,
  );
  await expect(page.locator(".cinder-tooltip")).toContainText("Live appearance hint");

  await page.getByRole("button", { name: "Use brand B", exact: true }).click();
  for (const root of [child, ...roots]) {
    await expect(root).toHaveClass(/\bbrand-b\b/);
    await expect(root).not.toHaveClass(/brand-a|recipe-common/);
    await expect(root).toHaveCSS("--cinder-focus", "rgb(0, 90, 100)");
  }
  await page.getByRole("button", { name: "Clear appearance", exact: true }).click();
  for (const root of [child, ...roots]) {
    await expect(root).not.toHaveClass(/brand-a|brand-b|recipe-common/);
  }
  await page.getByRole("button", { name: "Inherit appearance", exact: true }).click();
  for (const root of [child, ...roots]) await expect(root).toHaveClass(/\bbrand-a recipe-common\b/);
  await expect(page.locator(".appearance-sibling")).toHaveClass(/\bbrand-b\b/);
  await expect(page.locator(".cinder-toast")).toHaveCount(1);
  await expect(page.locator(".cinder-toast")).toContainText("Provider-owned toast");
});

test("open portals track same-direction language changes, RTL, explicit Theme language, and theme without remounting", async () => {
  // Keep every settings action in view: ancestor scrolling intentionally dismisses RAC tooltips.
  await page.setViewportSize({ width: 1280, height: 1200 });
  await page.goto("/?appearance");
  const child = page.locator(".appearance-child");
  await expect(page.locator(".appearance-parent")).toHaveAttribute("lang", "it-IT");
  await expect(child).toHaveAttribute("lang", "en-US");
  await expect(page.locator(".local-language-layer")).toHaveAttribute("lang", "ja-JP");
  await expect(page.locator(".local-language-layer")).toHaveAttribute("dir", "rtl");

  const roots = await openAppearanceOverlays();
  const mounted = await Promise.all(roots.map((root) => root.elementHandle()));
  for (const root of roots) {
    await expect(root).toHaveAttribute("lang", "en-US");
    await expect(root).toHaveAttribute("dir", "ltr");
    await expect(root).toHaveAttribute("data-cinder-theme", "white");
    await expect(root).toHaveAttribute("data-cinder-layer", "1");
  }

  for (const [action, lang, direction] of [
    ["Use French locale", "fr-FR", "ltr"],
    ["Use Arabic locale", "ar-AE", "rtl"],
    ["Use German language", "de-DE", "rtl"],
    ["Clear content language", "", "rtl"],
  ] as const) {
    await page.getByRole("button", { name: action, exact: true }).click();
    for (const root of [child, ...roots]) {
      await expect(root).toHaveAttribute("lang", lang);
      await expect(root).toHaveAttribute("dir", direction);
    }
    for (const node of mounted)
      expect(await node!.evaluate((element) => element.isConnected)).toBe(true);
  }

  await page.getByRole("button", { name: "Use g10 theme" }).click();
  for (const root of roots) {
    await expect(root).toHaveAttribute("data-cinder-theme", "g10");
    await expect(root).toHaveAttribute("data-cinder-layer", "1");
  }
  await expect(page.locator(".cinder-toast")).toHaveCount(1);
  await expect(page.locator(".cinder-toast")).toContainText("Provider-owned toast");
  await expect(page.locator(".local-language-layer")).toHaveAttribute("lang", "ja-JP");
  await expect(page.locator(".appearance-parent")).toHaveAttribute("lang", "it-IT");
  await expect(page.locator(".cinder-tooltip")).toBeVisible();
  for (const node of mounted)
    expect(await node!.evaluate((element) => element.isConnected)).toBe(true);
  await page.keyboard.press("Escape");
  await expect(page.locator(".cinder-tooltip")).toHaveCount(0);
  await expect(page.locator(".cinder-popover")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator(".cinder-popover")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Open appearance settings" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.locator(".cinder-modal-overlay")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Open appearance dialog" })).toBeFocused();
  await page.locator(".cinder-toast").getByRole("button", { name: "Dismiss notification" }).click();
  await expect(page.locator(".cinder-toast")).toHaveCount(0);
});

for (const [themeLang, overlayLang] of [
  ["de-DE", ""],
  ["", "fa-IR"],
] as const) {
  test(`overlay lang=${JSON.stringify(overlayLang)} overrides Theme lang=${JSON.stringify(themeLang)} while direction and toast stay provider-owned`, async () => {
    await page.goto(`/?appearance&themeLang=${themeLang}&overlayLang=${overlayLang}`);
    const roots = await openAppearanceOverlays();
    for (const root of roots) {
      const isToast = await root.evaluate((element) =>
        element.classList.contains("cinder-toast-region"),
      );
      await expect(root).toHaveAttribute("lang", isToast ? themeLang : overlayLang);
      await expect(root).toHaveAttribute("dir", "ltr");
    }
    await page.getByRole("button", { name: "Use French locale" }).click();
    await expect(page.locator(".appearance-child")).toHaveAttribute("lang", themeLang);
    await expect(page.locator(".cinder-toast-region")).toHaveAttribute("lang", themeLang);
    for (const selector of portalSelectors.slice(0, 3)) {
      await expect(page.locator(selector)).toHaveAttribute("lang", overlayLang);
    }
  });
}

test("a branded dialog Select keeps keyboard selection, disabled skipping, inner-first Escape, and focus restoration", async () => {
  await page.goto("/?appearance");
  const trigger = page.getByRole("button", { name: "Open appearance dialog" });
  await trigger.click();
  const choice = page.getByRole("button", { name: "Alpha Dialog choice" });
  await choice.press("ArrowDown");
  const popover = page.locator(".cinder-select-popover");
  await expect(popover).toHaveClass(/\bbrand-a recipe-common\b/);
  await expect(popover).toHaveAttribute("lang", "en-US");
  await expect(popover).toHaveAttribute("dir", "ltr");
  await expect(page.getByRole("option", { name: "Alpha", exact: true })).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("option", { name: "Gamma", exact: true })).toBeFocused();
  await page.keyboard.press("Enter");
  const selected = page.getByRole("button", { name: "Gamma Dialog choice" });
  await expect(selected).toBeFocused();
  await selected.press("ArrowDown");
  await expect(popover).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(popover).toBeHidden();
  await expect(selected).toBeFocused();
  await expect(page.getByRole("dialog", { name: "Appearance dialog" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator(".cinder-modal-overlay")).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("Modal independently targets backdrop and surface classes, styles, refs, and render callbacks without duplicating ordinary props", async () => {
  await page.goto("/?modal-parts");
  const trigger = page.getByRole("button", { name: "Open parts dialog" });
  await trigger.click();
  const overlay = page.locator(".cinder-modal-overlay");
  const modal = page.locator(".cinder-modal");
  await expect(overlay).toHaveClass(/consumer-overlay-open/);
  await expect(modal).toHaveClass(/consumer-modal-open/);
  await expect(overlay).not.toHaveClass(/consumer-modal-open/);
  await expect(modal).not.toHaveClass(/consumer-overlay-open/);
  await expect(overlay).toHaveCSS("padding", "32px");
  await expect(modal).toHaveCSS("max-width", "480px");
  expect(await overlay.evaluate((element) => (element as HTMLElement).style.maxWidth)).toBe("");
  expect(await modal.evaluate((element) => (element as HTMLElement).style.padding)).toBe("");
  for (const [attribute, value] of [
    ["lang", "fr-CA"],
    ["data-consumer-part", "overlay"],
    ["data-custom-overlay", "open"],
    ["data-enter-target", "true"],
    ["data-cinder-theme", "white"],
  ] as const) {
    await expect(overlay).toHaveAttribute(attribute, value);
    expect(await modal.getAttribute(attribute)).toBeNull();
  }
  await expect(modal).toHaveAttribute("data-size", "md");
  await expect(page.locator('[aria-label="Modal lifecycle"]')).toHaveText("1,0");
  await page.getByRole("button", { name: "Inspect part refs" }).click();
  await expect(overlay).toHaveAttribute("data-overlay-ref", "true");
  await expect(modal).toHaveAttribute("data-modal-ref", "true");
  expect(await overlay.getAttribute("data-modal-ref")).toBeNull();
  expect(await modal.getAttribute("data-overlay-ref")).toBeNull();
  // RAC Button presses stop propagation; an ordinary DOM click reaches the overlay once.
  await page.getByRole("heading", { name: "Modal parts" }).click();
  await expect(page.locator('[aria-label="Overlay clicks"]')).toHaveText("1");

  await page.getByRole("button", { name: "Close via modal state" }).click();
  await expect(overlay).toHaveCount(0);
  await expect(page.locator('[aria-label="Modal changes"]')).toHaveText("false");
  await expect(page.locator('[aria-label="Modal lifecycle"]')).toHaveText("1,1");
  await expect(trigger).toBeFocused();
  await trigger.click();
  await expect(overlay).toBeVisible();
  await page.mouse.click(2, 2);
  await expect(overlay).toHaveCount(0);
  await expect(page.locator('[aria-label="Modal changes"]')).toHaveText("false,false");
  await expect(page.locator('[aria-label="Modal lifecycle"]')).toHaveText("2,2");
  await expect(trigger).toBeFocused();
});

test("all four portal consumers leave lang absent outside Theme", async () => {
  await page.goto("/?unscoped");
  await page.getByRole("button", { name: "Show provider toast" }).click();
  await page.getByRole("button", { name: "Open unscoped dialog" }).click();
  await page.getByRole("button", { name: "Open unscoped popover" }).click();
  for (const selector of portalSelectors) {
    const root = page.locator(selector);
    await expect(root).toBeVisible();
    expect(await root.getAttribute("lang")).toBeNull();
    await expect(root).toHaveAttribute("dir", "ltr");
    await expect(root).toHaveAttribute("data-cinder-theme", "white");
    await expect(root).toHaveAttribute("data-cinder-layer", "0");
    await expect(root).not.toHaveClass(/\bcinder-theme\b/);
  }
});
