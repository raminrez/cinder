import { afterAll, afterEach, beforeAll, beforeEach, test } from "bun:test";
import { basename, resolve } from "node:path";
import { chromium, type Browser, type BrowserContext, type Page } from "playwright";
import { expect } from "playwright/test";
import { themes } from "@hashti/tokens";
import {
  expectNoDanglingStatusDescriptions,
  verifyAppearanceOnlyStatus,
  verifyComposedStatus,
  verifyLabelHelpIsolation,
  verifyValidationStatusPrecedence,
  verifyStatusNativeTransitions,
  verifySelectStatusAdornment,
} from "./field-status.assertions";

let server: ReturnType<typeof Bun.serve>;
let browser: Browser;
let context: BrowserContext;
let page: Page;
let errors: string[];

beforeAll(async () => {
  const bundle = await Bun.build({
    entrypoints: [resolve(import.meta.dir, "../fixtures/status.html")],
    tsconfig: resolve(import.meta.dir, "../../tsconfig.json"),
    target: "browser",
  });
  if (!bundle.success) throw new AggregateError(bundle.logs, "Could not build status fixture");
  server = Bun.serve({
    port: 0,
    hostname: "127.0.0.1",
    routes: Object.fromEntries(
      bundle.outputs.map((output) => [
        basename(output.path) === "status.html" ? "/" : `/${basename(output.path)}`,
        new Response(output, { headers: { "Content-Type": output.type } }),
      ]),
    ),
    development: false,
  });
  browser = await chromium.launch({
    channel: process.env.PLAYWRIGHT_CHANNEL ?? "chrome",
    headless: true,
  });
});
beforeEach(async () => {
  context = await browser.newContext({
    viewport: { width: 768, height: 1000 },
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

async function open(theme: string, locale = "en-US") {
  await page.goto(`${server.url}?theme=${theme}&locale=${locale}`);
  await expect(
    page.getByRole("heading", { name: "Field status contracts", exact: true }),
  ).toBeVisible();
}

for (const theme of ["frame-light", "frame-dark"]) {
  test(`${theme}: all twelve statuses are appearance-only and retain FormData`, async () => {
    await open(theme);
    await verifyAppearanceOnlyStatus(page);
  });
  test(`${theme}: native and server validation suppress presentation status`, async () => {
    await open(theme);
    await verifyValidationStatusPrecedence(page);
  });
  test(`${theme}: custom status mount, slot isolation, refs, and raw input identity`, async () => {
    await open(theme);
    await verifyComposedStatus(page);
  });
  test(`${theme}: help supports hover/focus and click/keyboard without field actions`, async () => {
    await open(theme);
    await verifyLabelHelpIsolation(page);
  });
  test(`${theme}: status transitions keep draft, caret, focus, and native parents`, async () => {
    await open(theme);
    await verifyStatusNativeTransitions(page);
  });
  test(`${theme}: attached input status and detached group status reflow at 320px`, async () => {
    await page.setViewportSize({ width: 320, height: 1000 });
    await open(theme);
    for (const name of [
      "text",
      "area",
      "number",
      "search",
      "select",
      "combo",
      "date",
      "time",
      "picker",
      "range",
    ]) {
      const field = page.locator(`[data-status-field="${name}"]`);
      const control = field.locator(":scope > .hashti-field__control");
      const status = field.locator(".hashti-field__status");
      const a = await control.boundingBox();
      const b = await status.boundingBox();
      expect(Math.abs(a!.x - b!.x), `${name} attached start`).toBeLessThanOrEqual(1);
      expect(Math.abs(a!.width - b!.width), `${name} attached width`).toBeLessThanOrEqual(1);
      expect(Math.abs(a!.y + a!.height - b!.y), `${name} attached edge`).toBeLessThanOrEqual(1);
      await expect(status).toHaveCSS("border-top-width", "0px");
      const icon = field.locator(".hashti-field__status-icon");
      const mark = await icon.boundingBox();
      expect(mark!.x, `${name} icon start`).toBeGreaterThanOrEqual(a!.x);
      expect(mark!.x + mark!.width, `${name} icon end`).toBeLessThan(a!.x + a!.width);
      for (const segment of await control.locator('[role="spinbutton"]').all()) {
        const box = await segment.boundingBox();
        expect(box!.x, `${name} segment start`).toBeGreaterThanOrEqual(a!.x);
        expect(box!.x + box!.width, `${name} segment end`).toBeLessThanOrEqual(a!.x + a!.width);
      }
      if (["text", "area", "date", "time"].includes(name)) {
        const padding = await control.evaluate((node) =>
          parseFloat(getComputedStyle(node).paddingInlineEnd),
        );
        expect(padding, `${name} icon reservation`).toBeGreaterThanOrEqual(36);
      }
    }
    for (const name of ["checkbox", "radio"]) {
      await expect(page.locator(`[data-status-field="${name}"] .hashti-field__status`)).toHaveCSS(
        "border-bottom-width",
        "0px",
      );
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      320,
    );
    await verifySelectStatusAdornment(page);
  });
}

for (const theme of Object.keys(themes)) {
  test(`${theme}: Select status icon keeps trailing alignment and status ink`, async () => {
    await open(theme);
    await verifySelectStatusAdornment(page);
  });
  if (theme.startsWith("relay-")) {
    test(`${theme}: label help preserves disabled label ink`, async () => {
      await open(theme);
      const field = page.getByTestId("status-disabled-help");
      const disabledInk = await field.evaluate((node) => {
        const probe = document.createElement("span");
        probe.style.color = "var(--hashti-text-disabled)";
        node.append(probe);
        const color = getComputedStyle(probe).color;
        probe.remove();
        return color;
      });
      await expect(field.locator(".hashti-field__label")).toHaveCSS("color", disabledInk);
    });
  }
  test(`${theme}: status text and icons retain readable contrast`, async () => {
    await open(theme);
    for (const type of ["warning", "error", "success"]) {
      await page.getByRole("button", { name: `Show ${type}`, exact: true }).click();
      const ratios = await page.locator('[data-status-field="text"]').evaluate((field) => {
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 1;
        const ctx = canvas.getContext("2d")!;
        const rgb = (value: string) => {
          ctx.clearRect(0, 0, 1, 1);
          ctx.fillStyle = value;
          ctx.fillRect(0, 0, 1, 1);
          return [...ctx.getImageData(0, 0, 1, 1).data];
        };
        const background = (node: Element): number[] => {
          const color = rgb(getComputedStyle(node).backgroundColor);
          return color[3] === 0 && node.parentElement ? background(node.parentElement) : color;
        };
        const luminance = (color: number[]) =>
          color.slice(0, 3).reduce((sum, component, index) => {
            const x = component / 255;
            return (
              sum +
              (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4) *
                [0.2126, 0.7152, 0.0722][index]!
            );
          }, 0);
        const contrast = (a: number[], b: number[]) => {
          const x = luminance(a);
          const y = luminance(b);
          return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
        };
        const status = field.querySelector(".hashti-field__status")!;
        const icon = field.querySelector(".hashti-field__status-icon")!;
        const control = field.querySelector(".hashti-field__control")!;
        return {
          text: contrast(rgb(getComputedStyle(status).color), background(status)),
          icon: contrast(rgb(getComputedStyle(icon).color), background(control)),
        };
      });
      expect(ratios.text, `${type} text`).toBeGreaterThanOrEqual(4.5);
      expect(ratios.icon, `${type} icon`).toBeGreaterThanOrEqual(3);
    }
  });
}

for (const [locale, required, optional, warning, about, close] of [
  ["en-US", "required", "optional", "Warning", "About", "Close field help"],
  ["fa-IR", "الزامی", "اختیاری", "هشدار", "دربارهٔ", "بستن راهنمای فیلد"],
  ["ar-EG", "مطلوب", "اختياري", "تحذير", "حول", "إغلاق مساعدة الحقل"],
  ["de-DE", "erforderlich", "optional", "Warnung", "Informationen zu", "Feldhilfe schließen"],
  ["fr-FR", "required", "optional", "Warning", "About", "Close field help"],
]) {
  test(`${locale}: required wins, optional is explicit, and icon-only status/help are localized`, async () => {
    await open("frame-light", locale);
    const field = page.getByTestId("status-localized");
    await expect(field.locator(".hashti-field__necessity")).toHaveText(`(${required})`);
    await expect(
      page.getByTestId("status-optional").locator(".hashti-field__necessity"),
    ).toHaveText(`(${optional})`);
    await expect(field.locator(".hashti-field__status.hashti-visually-hidden")).toHaveText(
      warning!,
    );
    await expect(field.getByRole("textbox")).toHaveAccessibleDescription(warning!);
    await expect(page.getByTestId("status-raw-label").getByRole("textbox")).toHaveAccessibleName(
      "Authored required marker",
    );
    const trigger = field.getByRole("button");
    await expect(trigger).toHaveAccessibleName(new RegExp(`^${about} `));
    await trigger.click();
    const popover = page.locator(".hashti-field__label-popover");
    await expect(popover).toHaveAttribute("lang", locale!);
    await expect(popover).toHaveAttribute(
      "dir",
      locale === "fa-IR" || locale === "ar-EG" ? "rtl" : "ltr",
    );
    await popover.getByRole("button", { name: close, exact: true }).click();
    await expect(popover).toHaveCount(0);
    await expectNoDanglingStatusDescriptions(page);
    await verifySelectStatusAdornment(page);
  });
}

test("forced colors: status meaning and control descriptions survive system colors", async () => {
  await page.emulateMedia({ forcedColors: "active" });
  await open("frame-light");
  const colors = await page.evaluate(() => {
    const probe = document.createElement("span");
    probe.style.color = "CanvasText";
    probe.style.backgroundColor = "Canvas";
    document.body.append(probe);
    const style = getComputedStyle(probe);
    const result = { text: style.color, background: style.backgroundColor };
    probe.remove();
    return result;
  });
  const field = page.locator('[data-status-field="text"]');
  for (const type of ["warning", "error", "success"]) {
    await page.getByRole("button", { name: `Show ${type}`, exact: true }).click();
    const status = field.locator(".hashti-field__status");
    await expect(status).toHaveText("Review this value before saving.");
    await expect(status).toHaveCSS("color", colors.text);
    await expect(status).toHaveCSS("background-color", colors.background);
    await expect(field.locator(".hashti-field__status-icon")).toHaveCSS("color", colors.text);
    await expect(field.getByRole("textbox")).toHaveAccessibleDescription(
      "Use a name your team recognizes. Review this value before saving.",
    );
    await expectNoDanglingStatusDescriptions(page);
  }
});

test("coarse pointer: label help and dismissal keep 44px tap targets", async () => {
  await context.close();
  context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: "reduce",
  });
  page = await context.newPage();
  await open("frame-light");
  const trigger = page.getByRole("button", { name: "About Display name", exact: true });
  const target = await trigger.boundingBox();
  expect(target!.height).toBeGreaterThanOrEqual(44);
  expect(target!.width).toBeGreaterThanOrEqual(44);
  await trigger.tap();
  const close = page.getByRole("button", { name: "Close field help", exact: true });
  expect((await close.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  await close.tap();
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
