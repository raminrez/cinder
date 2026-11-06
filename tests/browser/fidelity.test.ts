import { afterAll, afterEach, beforeAll, beforeEach, test } from "bun:test";
import { chromium, type Browser, type BrowserContext, type Page } from "playwright";
import { expect } from "playwright/test";
import { themeNames, themes, type ThemeName } from "@cinder/tokens";
import index from "../fixtures/fidelity.html";

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
    viewport: { width: 1440, height: 1000 },
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

async function open(theme: ThemeName = "white") {
  await page.goto(`/?theme=${theme}`);
  await expect(page.getByRole("heading", { name: "Cinder visual contracts" })).toBeVisible();
}
async function color(theme: ThemeName, name: keyof typeof themes.white) {
  return page.evaluate((value) => {
    const style = document.createElement("span").style;
    style.color = value;
    return style.color;
  }, themes[theme][name]);
}

test("compound sizes produce 32/40/48px controls and equal bounded switcher segments", async () => {
  await open();
  for (const [size, height] of [
    ["sm", 32],
    ["md", 40],
    ["lg", 48],
  ] as const) {
    const section = page.locator(`[data-density="${size}"]`);
    const triggerHeights = await section
      .locator(".cinder-accordion-trigger")
      .evaluateAll((elements) => elements.map((element) => element.getBoundingClientRect().height));
    expect(triggerHeights).toEqual([height, height]);
    const group = section.getByRole("radiogroup");
    const segments = group.getByRole("radio");
    expect(
      await segments.evaluateAll((elements) =>
        elements.map((element) => {
          const box = element.getBoundingClientRect();
          return { width: box.width, height: box.height };
        }),
      ),
    ).toEqual(Array.from({ length: 3 }, () => ({ width: 120, height })));
    await expect(group).toHaveCSS("outline-width", "1px");
    await expect(group).toHaveCSS("outline-offset", "-1px");
    await expect(segments.first()).toHaveCSS("border-top-left-radius", "4px");
    await expect(segments.last()).toHaveCSS("border-top-right-radius", "4px");
    await expect(segments.nth(1)).toHaveCSS("border-top-width", "1px");
    expect(
      await segments.last().evaluate((element) => {
        const divider = getComputedStyle(element, "::before");
        return [divider.width, divider.height];
      }),
    ).toEqual(["1px", "16px"]);
    await segments.first().focus();
    await page.keyboard.press("ArrowRight");
    await expect(segments.nth(1)).toBeFocused();
    await page.keyboard.press("Space");
    await expect(segments.nth(1)).toBeChecked();
  }
  await expect(page.getByRole("button", { name: "Standalone toggle" })).toHaveCSS(
    "min-height",
    "40px",
  );
});

test("standard and compact toggles retain exact thumb size, inset, and logical travel", async () => {
  await open();
  for (const direction of ["ltr", "rtl"] as const) {
    for (const [size, width, height, thumbSize, travel] of [
      ["sm", 32, 16, 10, 16],
      ["md", 48, 24, 18, 24],
    ] as const) {
      const control = page.locator(`[data-fixture="toggle-${size}-${direction}"]`);
      const geometry = () =>
        control.evaluate((element) => {
          const track = element.querySelector(".cinder-switch-track")!.getBoundingClientRect();
          const thumb = element.querySelector(".cinder-switch-thumb")!.getBoundingClientRect();
          return {
            width: track.width,
            height: track.height,
            thumbWidth: thumb.width,
            thumbHeight: thumb.height,
            left: thumb.left - track.left,
            right: track.right - thumb.right,
            top: thumb.top - track.top,
          };
        });
      const before = await geometry();
      expect([
        before.width,
        before.height,
        before.thumbWidth,
        before.thumbHeight,
        before.top,
        before[direction === "ltr" ? "left" : "right"],
      ]).toEqual([width, height, thumbSize, thumbSize, 3, 3]);
      await control.click();
      await expect(control.getByRole("switch")).toBeChecked();
      const after = await geometry();
      expect(after[direction === "ltr" ? "right" : "left"]).toBe(3);
      expect(Math.abs(after.left - before.left)).toBe(travel);
    }
  }
});

test("slider tracks and active thumbs match the single/range geometry without shifting their centers", async () => {
  await open();
  const single = page.locator(".cinder-slider").first();
  const thumb = single.locator(".react-aria-SliderThumb");
  const track = single.locator(".react-aria-SliderTrack");
  expect(await track.evaluate((element) => getComputedStyle(element, "::before").height)).toBe(
    "4px",
  );
  await expect(single.locator(".react-aria-SliderFill")).toHaveCSS("height", "4px");
  await thumb.scrollIntoViewIfNeeded();
  const before = (await thumb.boundingBox())!;
  expect([before.width, before.height]).toEqual([14, 14]);
  await thumb.hover();
  await page.mouse.down();
  await expect(thumb).toHaveAttribute("data-dragging");
  const active = (await thumb.boundingBox())!;
  expect([active.width, active.height]).toEqual([20, 20]);
  expect(active.x + active.width / 2).toBeCloseTo(before.x + before.width / 2, 1);
  expect(active.y + active.height / 2).toBeCloseTo(before.y + before.height / 2, 1);
  await page.mouse.up();
  const rangeThumbs = page.locator(".cinder-slider").last().locator(".react-aria-SliderThumb");
  for (const rangeThumb of await rangeThumbs.all()) {
    await expect(rangeThumb).toHaveCSS("width", "16px");
    await expect(rangeThumb).toHaveCSS("height", "16px");
    await rangeThumb.hover();
    await page.mouse.down();
    await expect(rangeThumb).toHaveAttribute("data-dragging");
    await expect(rangeThumb).toHaveCSS("width", "16px");
    await page.mouse.up();
  }
});

test("supporting text and block code use Carbon's compact type roles", async () => {
  await open();
  await expect(page.getByText("Type label", { exact: true })).toHaveCSS("letter-spacing", "0.32px");
  await expect(page.getByText("Type helper", { exact: true })).toHaveCSS(
    "letter-spacing",
    "0.32px",
  );
  const code = page.locator(".cinder-code-snippet pre");
  await expect(code).toHaveCSS("font-size", "12px");
  expect(
    await code.evaluate((element) => Number.parseFloat(getComputedStyle(element).lineHeight)),
  ).toBeCloseTo(16, 2);
  await expect(code).toHaveCSS("padding-top", "16px");
  await expect(code).toHaveCSS("padding-inline-start", "16px");
});

for (const theme of themeNames.filter((name) => !name.startsWith("relay-"))) {
  test(`${theme}: ghost/danger states and variant-specific keyboard focus retain Carbon colors`, async () => {
    await open(theme);
    const ghost = page.getByRole("button", { name: "ghost", exact: true });
    await expect(ghost).toHaveCSS("column-gap", "8px");
    await expect(ghost).toHaveCSS("padding-inline-start", "15px");
    await expect(ghost).toHaveCSS("padding-inline-end", "15px");
    await ghost.hover();
    await expect(ghost).toHaveCSS("color", await color(theme, "link-primary-hover"));
    const danger = page.getByRole("button", { name: "danger-ghost", exact: true });
    await danger.hover();
    await expect(danger).toHaveCSS("background-color", await color(theme, "button-danger-hover"));
    await expect(danger).toHaveCSS("color", await color(theme, "text-on-color"));
    await page.mouse.down();
    await expect(danger).toHaveCSS("background-color", await color(theme, "button-danger-active"));
    await page.mouse.up();
    await page.mouse.move(0, 0);
    await page.keyboard.press("Tab");
    const focus = await color(theme, "focus");
    const background = await color(theme, "background");
    for (const variant of [
      "primary",
      "secondary",
      "tertiary",
      "ghost",
      "danger",
      "danger-tertiary",
      "danger-ghost",
    ] as const) {
      const button = page.getByRole("button", { name: variant, exact: true });
      await button.focus();
      await expect(button).toHaveAttribute("data-focus-visible");
      await expect(button).toHaveCSS("border-top-color", focus);
      await expect(button).toHaveCSS(
        "box-shadow",
        `${focus} 0px 0px 0px 1px inset, ${background} 0px 0px 0px 2px inset`,
      );
      if (variant === "tertiary") {
        await expect(button).toHaveCSS("background-color", await color(theme, "button-tertiary"));
        await expect(button).toHaveCSS("color", await color(theme, "text-inverse"));
      } else if (variant === "danger-tertiary") {
        await expect(button).toHaveCSS(
          "background-color",
          await color(theme, "button-danger-primary"),
        );
        await expect(button).toHaveCSS("color", await color(theme, "text-on-color"));
      } else if (variant.endsWith("ghost")) {
        await expect(button).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
      }
    }
    const icon = page.getByRole("button", { name: "Icon ghost" });
    await icon.focus();
    await expect(icon).toHaveCSS("box-shadow", `${focus} 0px 0px 0px 1px inset`);
    await expect(page.getByRole("button", { name: "Disabled ghost" })).toHaveCSS(
      "color",
      await color(theme, "text-disabled"),
    );
  });

  test(`${theme}: notification contrast pairs, text insets, and dismiss targets survive inverse surfaces`, async () => {
    await open(theme);
    for (const kind of ["info", "success", "warning", "error"] as const) {
      for (const inverse of [false, true]) {
        const notification = page.locator(
          `.cinder-notification[data-kind="${kind}"]${inverse ? ":not([data-low-contrast])" : "[data-low-contrast]"}`,
        );
        const support = await color(theme, inverse ? `support-${kind}-inverse` : `support-${kind}`);
        await expect(notification).toHaveCSS("border-inline-start-color", support);
        await expect(notification.locator(":scope > svg")).toHaveCSS("color", support);
        await expect(notification).toHaveCSS(
          "background-color",
          await color(theme, inverse ? "background-inverse" : `notification-background-${kind}`),
        );
        await expect(notification.locator(".cinder-notification-content")).toHaveCSS(
          "padding-top",
          "15px",
        );
        const close = notification.getByRole("button", { name: "Dismiss notification" });
        const box = (await close.boundingBox())!;
        expect([box.width, box.height]).toEqual([48, 48]);
        await page.keyboard.press("Tab");
        await close.focus();
        await expect(close).toHaveCSS(
          "outline-color",
          await color(theme, inverse ? "focus-inverse" : "focus"),
        );
      }
    }
    await page.getByRole("button", { name: "Show contract toast" }).click();
    const toast = page.locator(".cinder-toast");
    await expect(toast).toBeVisible();
    expect((await toast.boundingBox())!.width).toBe(288);
    const close = toast.getByRole("button", { name: "Dismiss notification" });
    expect((await close.boundingBox())!.height).toBe(48);
    await page.setViewportSize({ width: 1600, height: 1000 });
    expect((await toast.boundingBox())!.width).toBe(352);
    await close.click();
    await expect(toast).toHaveCount(0);
  });

  test(`${theme}: calendar geometry, blue selection, range interior, and inner focus stay distinct`, async () => {
    await open(theme);
    const single = page.locator(".cinder-calendar:not(.cinder-range-calendar)");
    expect((await single.boundingBox())!.width).toBe(288);
    await expect(single).toHaveCSS("padding", "4px 4px 8px");
    const navigation = single
      .locator(".cinder-calendar-header")
      .getByRole("button", { name: "Next", exact: true });
    expect((await navigation.boundingBox())!.height).toBe(40);
    const selected = single.locator(".react-aria-CalendarCell[data-selected]");
    expect((await selected.boundingBox())!.width).toBe(40);
    await expect(selected).toHaveCSS("background-color", await color(theme, "button-primary"));
    await expect(selected).toHaveCSS("color", await color(theme, "text-on-color"));
    await page.keyboard.press("Tab");
    await selected.focus();
    await expect(selected).toHaveCSS("outline-width", "1px");
    await expect(selected).toHaveCSS("outline-offset", "-3px");
    await expect(selected).toHaveCSS("outline-color", await color(theme, "layer-02"));
    await page.keyboard.press("ArrowRight");
    const ordinary = single.locator(".react-aria-CalendarCell[data-focus-visible]");
    await expect(ordinary).not.toHaveAttribute("data-selected");
    await expect(ordinary).toHaveCSS("outline-width", "2px");
    await expect(ordinary).toHaveCSS("outline-color", await color(theme, "button-primary"));
    const range = page.locator(".cinder-range-calendar");
    const endpoints = range.locator(
      ".react-aria-CalendarCell:is([data-selection-start], [data-selection-end])",
    );
    await expect(endpoints).toHaveCount(2);
    for (const endpoint of await endpoints.all()) {
      await expect(endpoint).toHaveCSS("background-color", await color(theme, "button-primary"));
      await expect(endpoint).toHaveCSS("color", await color(theme, "text-on-color"));
      await endpoint.focus();
      await expect(endpoint).toHaveCSS("outline-width", "1px");
      await expect(endpoint).toHaveCSS("outline-offset", "-3px");
    }
    const interior = range
      .locator(
        ".react-aria-CalendarCell[data-selected]:not([data-selection-start], [data-selection-end])",
      )
      .first();
    await expect(interior).toHaveCSS("background-color", await color(theme, "highlight"));
    await interior.focus();
    await expect(interior).toHaveCSS("outline-width", "2px");
  });
}
