import { afterAll, afterEach, beforeAll, beforeEach, test } from "bun:test";
import { chromium, type Browser, type BrowserContext, type Page } from "playwright";
import { expect } from "playwright/test";
import { themes, type ThemeName } from "@cinder/tokens";
import index from "../fixtures/fidelity.html";

let server: ReturnType<typeof Bun.serve>;
let browser: Browser;
let context: BrowserContext;
let page: Page;
let errors: string[];
const carbonThemes = ["white", "g10", "g90", "g100"] as const;

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
async function openFieldParts(theme: ThemeName = "white") {
  await page.goto(`/?field-parts&theme=${theme}`);
  await expect(page.getByRole("heading", { name: "Cinder field part contracts" })).toBeVisible();
}
async function color(theme: ThemeName, name: keyof typeof themes.white) {
  return page.evaluate((value) => {
    const style = document.createElement("span").style;
    style.color = value;
    return style.color;
  }, themes[theme][name]);
}

test("all twelve default field anatomies retain legacy aliases, BEM parts, and composition order", async () => {
  await openFieldParts();
  const fields = page.locator('[data-fixture="default-field-parts"]');
  await expect(fields.locator(".cinder-field")).toHaveCount(12);
  for (const [name, controlSelector] of [
    ["text", "input.react-aria-Input"],
    ["area", "textarea.react-aria-TextArea"],
    ["number", ".cinder-input-group"],
    ["search", ".cinder-input-group"],
    ["checkbox", null],
    ["radio", null],
    ["select", "button.cinder-button.cinder-select-trigger"],
    ["combobox", ".cinder-input-group"],
    ["date-picker", ".cinder-input-group"],
    ["date-range", ".cinder-input-group"],
    ["date", ".react-aria-DateInput"],
    ["time", ".react-aria-DateInput"],
  ] as const) {
    const field = fields.locator(`[data-field="${name}"]`);
    const label = field.locator(":scope > .cinder-field__label.react-aria-Label");
    const help = field.locator(":scope > .cinder-field__help.cinder-field-help");
    await expect(label).toHaveCount(1);
    await expect(help).toHaveCount(1);
    await expect(help.locator(".cinder-field__description.react-aria-Text")).toHaveAttribute(
      "slot",
      "description",
    );
    await expect(help.locator(".cinder-field__description")).toHaveText(
      name === "text" ? "0" : "Field guidance",
    );
    await expect(help.locator(".cinder-field__error.react-aria-FieldError")).toHaveText(
      "Field recovery",
    );
    if (controlSelector) {
      await expect(field.locator(`:scope > ${controlSelector}.cinder-field__control`)).toHaveCount(
        1,
      );
      await expect(field.locator(".cinder-field__control")).toHaveCount(1);
      expect(
        await field.evaluate((element) => {
          const label = element.querySelector(".cinder-field__label")!;
          const control = element.querySelector(".cinder-field__control")!;
          const help = element.querySelector(".cinder-field__help")!;
          return [
            Boolean(label.compareDocumentPosition(control) & Node.DOCUMENT_POSITION_FOLLOWING),
            Boolean(control.compareDocumentPosition(help) & Node.DOCUMENT_POSITION_FOLLOWING),
          ];
        }),
      ).toEqual([true, true]);
    } else {
      await expect(field.locator(".cinder-field__control")).toHaveCount(0);
    }
  }
  await expect(fields.locator('[data-field="text"] .cinder-field__label')).toHaveText("0");
  await expect(fields.getByRole("textbox", { name: "0", exact: true })).toBeVisible();
  expect(
    await fields
      .locator(".cinder-button")
      .evaluateAll((buttons) =>
        buttons.map((button) => [
          button.getAttribute("data-size"),
          button.hasAttribute("data-cinder-size-default"),
        ]),
      ),
  ).toEqual(Array.from({ length: 7 }, () => ["md", false]));
});

test("field root/control refs, values, and raw custom composition keep their existing targets", async () => {
  await openFieldParts();
  await page.getByRole("button", { name: "Check field refs" }).click();
  await expect(page.getByRole("status", { name: "Field ref targets" })).toHaveText(
    "DIV,INPUT,true,DIV,TEXTAREA,true",
  );
  const text = page.getByRole("textbox", { name: "0", exact: true });
  await expect(text).toBeFocused();
  await text.fill("Controlled update");
  await expect(page.getByRole("status", { name: "Controlled text" })).toHaveText(
    "Controlled update",
  );
  const textRoot = page.locator('[data-field="text"]');
  await expect(textRoot).toHaveClass(/cinder-field cinder-text-field.*consumer-invalid/);
  await expect(textRoot).toHaveCSS("max-width", "320px");
  await expect(text).toHaveCSS("max-width", "none");
  await page.getByRole("button", { name: "Focus area control" }).click();
  const area = page.getByRole("textbox", { name: "Part area" });
  await expect(area).toBeFocused();
  await expect(area).toHaveValue("Initial note");
  await area.fill("Uncontrolled update");
  await expect(area).toHaveValue("Uncontrolled update");
  await expect(page.locator('[data-field="area"]')).toHaveClass(
    /cinder-field cinder-text-area.*consumer-area/,
  );
  await expect(page.locator('[data-field="area"]')).toHaveCSS("max-width", "336px");
  await expect(area).toHaveCSS("max-width", "none");

  const custom = page.locator('[data-fixture="custom-field"]');
  await expect(custom.locator("[class*='cinder-field__']")).toHaveCount(0);
  await expect(custom.locator("label")).toHaveClass("consumer-label");
  await expect(custom.getByRole("textbox", { name: "Custom invalid field" })).toHaveClass(
    "consumer-input",
  );
  await expect(custom.locator('[slot="description"]')).toHaveClass("consumer-description");
  await expect(custom.locator(".consumer-error")).toHaveText("Consumer recovery");
  await expect(custom).not.toContainText("Unused");
});

test("default errors remain mounted for native validation and validation callbacks keep guidance associations", async () => {
  await openFieldParts();
  const native = page.getByRole("textbox", { name: "Native required" });
  const custom = page.getByRole("textbox", { name: "Custom required" });
  const submit = page.getByRole("button", { name: "Validate fields" });
  await submit.click();
  await expect(native).toBeFocused();
  await expect(native).toHaveAttribute("aria-invalid", "true");
  await expect(native).toHaveAccessibleDescription(/fill out this field/i);
  const nativeRoot = page.locator(".cinder-text-field").filter({ has: native });
  const nativeError = nativeRoot.locator(".cinder-field__error.react-aria-FieldError");
  await expect(nativeError).toHaveText(/fill out this field/i);
  const description = nativeRoot.locator(".cinder-field__description.react-aria-Text");
  await expect(description).toHaveText("Native guidance");
  expect((await native.getAttribute("aria-describedby"))!.split(" ")).toEqual(
    expect.arrayContaining([
      await description.getAttribute("id"),
      await nativeError.getAttribute("id"),
    ]),
  );
  const customRoot = page.locator(".cinder-text-area").filter({ has: custom });
  await expect(customRoot.locator(".cinder-field__error.react-aria-FieldError")).toHaveText(
    "Add a note.",
  );
  await expect(custom).toHaveAccessibleDescription(/Add a note\./);
  await expect(customRoot.locator(".cinder-field__description")).toHaveText("Custom guidance");
  await native.fill("Entered");
  await custom.fill("Details");
  await submit.click();
  await expect(page.getByRole("status", { name: "Submitted fields" })).toHaveText(
    "Entered|Details",
  );
  await expect(native).not.toHaveAttribute("aria-invalid", "true");
  await expect(custom).not.toHaveAttribute("aria-invalid", "true");
});

test("SearchField inputProps still replace raw input classes and override the parent placeholder", async () => {
  await openFieldParts();
  const search = page.getByRole("searchbox", { name: "Part search" });
  await expect(search).toHaveAttribute("placeholder", "Input placeholder");
  await expect(search).toHaveClass("consumer-search");
  await expect(search).toHaveCSS("padding-inline-start", "17px");
  await search.fill("Find records");
  await expect(page.getByRole("status", { name: "Controlled search" })).toHaveText("Find records");
  await search.press("Escape");
  await expect(search).toHaveValue("");
  await expect(page.getByRole("status", { name: "Controlled search" })).toHaveText("");
});

test("Select part aliases preserve rich option children and numeric single/multiple keys", async () => {
  await openFieldParts();
  const single = page.locator('[data-field="select"]');
  const value = single.locator(".cinder-select__value.react-aria-SelectValue");
  await expect(value).toContainText("Reader");
  await single.getByRole("button").click();
  const options = page.getByRole("listbox", { name: "Part select" });
  await expect(options).toHaveClass(/cinder-select__listbox.*react-aria-ListBox/);
  await expect(options.getByText("Can edit records", { exact: true })).toBeVisible();
  await options.getByRole("option", { name: /^Writer/ }).click();
  await expect(value).toContainText("Writer");
  await expect(page.getByRole("status", { name: "Numeric single value" })).toHaveText("number:2");
  await expect(single.getByRole("button")).toBeFocused();
  await page.getByRole("button", { name: "Reader Numeric multiple", exact: true }).click();
  const multiple = page.getByRole("listbox", { name: "Numeric multiple" });
  await expect(multiple).toHaveClass(/cinder-select__listbox.*react-aria-ListBox/);
  await multiple.getByRole("option", { name: "Writer", exact: true }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("status", { name: "Numeric multiple values" })).toHaveText(
    "number:1,number:2",
  );
});

test("Button marks only omitted sizes while retaining resolved sizes and all six legacy theme heights", async () => {
  for (const theme of [...carbonThemes, "relay-light", "relay-dark"] as const) {
    await openFieldParts(theme);
    expect(
      await page
        .locator('[data-fixture="button-sizes"] .cinder-button')
        .evaluateAll((buttons) =>
          buttons.map((button) => [
            button.getAttribute("data-size"),
            button.getAttribute("data-cinder-size-default"),
            getComputedStyle(button).minHeight,
          ]),
        ),
    ).toEqual([
      ["lg", "", "48px"],
      ["lg", "", "48px"],
      ["sm", null, "32px"],
      ["md", null, "40px"],
      ["lg", null, "48px"],
      ["xl", null, "64px"],
      ["2xl", null, "80px"],
    ]);
  }
});

test("Button omission marker survives custom rendering, refs, render props, and focus-retaining pending behavior", async () => {
  await openFieldParts();
  const button = page.getByRole("button", { name: "Omitted size", exact: true });
  await page.getByRole("button", { name: "Focus omitted action" }).click();
  await expect(button).toBeFocused();
  await expect(button).toHaveAttribute("data-custom-render", "true");
  await expect(button).toHaveClass(/cinder-button.*consumer-ready/);
  await expect(button).toHaveText("Run action");
  await button.press("Enter");
  await expect(button).toHaveClass(/cinder-button.*consumer-pending/);
  await expect(button).toHaveText("Working");
  await expect(button.getByRole("progressbar", { name: "Saving contract" })).toBeVisible();
  await expect(button).toHaveAttribute("data-cinder-size-default", "");
  await expect(button).toHaveAttribute("data-size", "lg");
  await button.press("Enter");
  await expect(button).toBeFocused();
  await expect(page.getByRole("status", { name: "Pending press count" })).toHaveText("1");
});

for (const theme of ["frame-light", "frame-dark"] as const) {
  test(`${theme}: Frame geometry and typography retain separate invalid and focus signals`, async () => {
    await openFieldParts(theme);
    expect(
      await page
        .locator('[data-fixture="button-sizes"] .cinder-button')
        .evaluateAll((buttons) => buttons.map((button) => button.getBoundingClientRect().height)),
    ).toEqual([44, 44, 32, 44, 48, 64, 80]);
    const field = page.locator('[data-field="text"]');
    const input = field.getByRole("textbox");
    const label = field.locator(".cinder-field__label");
    const error = field.locator(".cinder-field__error");
    await expect(label).toHaveCSS("font-size", "14px");
    await expect(label).toHaveCSS("line-height", "20px");
    await expect(label).toHaveCSS("font-weight", "600");
    await expect(error).toHaveCSS("font-size", "13px");
    await expect(error).toHaveCSS("line-height", "20px");
    for (const control of [input, page.locator('[data-field="select"] .cinder-select-trigger')]) {
      expect((await control.boundingBox())!.height).toBe(44);
      await expect(control).toHaveCSS("font-size", "16px");
      await expect(control).toHaveCSS("line-height", "24px");
      await expect(control).toHaveCSS("border-radius", "10px");
      await expect(control).toHaveCSS("border-top-color", await color(theme, "support-error"));
      await expect(control).toHaveCSS("outline-style", "none");
      await page.keyboard.press("Tab");
      await control.focus();
      await expect(control).toHaveCSS("outline-width", "2px");
      await expect(control).toHaveCSS("outline-offset", "2px");
      await expect(control).toHaveCSS("outline-color", await color(theme, "focus"));
      await expect(control).toHaveCSS("border-top-color", await color(theme, "support-error"));
      await expect(control).toHaveCSS("box-shadow", "none");
    }
    const legacyNumber = page.getByRole("textbox", { name: "Legacy composed number" });
    await legacyNumber.focus();
    const legacyGroup = page.locator(".cinder-input-group", { has: legacyNumber });
    await expect(legacyGroup).toHaveCSS("outline-color", await color(theme, "focus"));
    await expect(legacyGroup).toHaveCSS("outline-style", "solid");
    await expect(legacyGroup).toHaveCSS("border-top-color", await color(theme, "support-error"));
    const disabled = page.locator('[data-fixture="legacy-disabled-field"]');
    await expect(disabled.getByRole("textbox")).toBeDisabled();
    await expect(disabled.locator("label")).toHaveCSS("color", await color(theme, "text-disabled"));

    await page.addStyleTag({
      content: `.cinder-theme {
      --cinder-body-01-font-weight: 500;
      --cinder-body-01-letter-spacing: 0.5px;
      --cinder-body-compact-01-font-size: 1rem;
      --cinder-body-compact-01-font-weight: 700;
      --cinder-body-compact-01-letter-spacing: 1px;
      --cinder-label-01-font-weight: 500;
      --cinder-label-01-letter-spacing: 0.75px;
      --cinder-body-02-font-weight: 600;
      --cinder-body-02-letter-spacing: 0.25px;
    }`,
    });
    await expect(page.locator(".cinder-theme")).toHaveCSS("font-weight", "500");
    await expect(page.locator(".cinder-theme")).toHaveCSS("letter-spacing", "0.5px");
    const action = page.getByRole("button", { name: "Omitted size", exact: true });
    await expect(action).toHaveCSS("font-size", "16px");
    await expect(action).toHaveCSS("font-weight", "700");
    await expect(action).toHaveCSS("letter-spacing", "1px");
    await expect(label).toHaveCSS("font-weight", "500");
    await expect(label).toHaveCSS("letter-spacing", "0.75px");
    await expect(input).toHaveCSS("font-weight", "600");
    await expect(input).toHaveCSS("letter-spacing", "0.25px");
  });

  test(`${theme}: forced colors preserve pending feedback and invalid field focus`, async () => {
    await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
    await openFieldParts(theme);
    const systemColors = await page.evaluate(() => {
      const probe = document.createElement("span");
      probe.style.forcedColorAdjust = "none";
      document.querySelector("[data-cinder-theme]")!.append(probe);
      const color = (value: string) => {
        probe.style.color = value;
        return getComputedStyle(probe).color;
      };
      const values = {
        text: color("ButtonText"),
        focus: color("Highlight"),
        disabled: color("GrayText"),
      };
      probe.remove();
      return values;
    });
    const input = page.locator('[data-field="text"] input');
    await input.focus();
    await expect(input).toHaveCSS("border-top-style", "dashed");
    await expect(input).toHaveCSS("outline-color", systemColors.focus);
    const legacyNumber = page.getByRole("textbox", { name: "Legacy composed number" });
    await legacyNumber.focus();
    const legacyGroup = page.locator(".cinder-input-group", { has: legacyNumber });
    await expect(legacyGroup).toHaveCSS("border-top-style", "dashed");
    await expect(legacyGroup).toHaveCSS("outline-color", systemColors.focus);
    const disabled = page.locator('[data-fixture="legacy-disabled-field"]');
    await expect(disabled.getByRole("textbox")).toHaveCSS("color", systemColors.disabled);
    await expect(disabled.locator("label")).toHaveCSS("color", systemColors.disabled);
    const action = page.getByRole("button", { name: "Omitted size", exact: true });
    await action.press("Enter");
    await expect(action).toBeFocused();
    await expect(action).toHaveCSS("color", "rgba(0, 0, 0, 0)");
    const progress = action.getByRole("progressbar", { name: "Saving contract" });
    await expect(progress).toBeVisible();
    await expect(progress).toHaveCSS("color", systemColors.text);
    await expect(progress).toHaveCSS("animation-name", "none");
    await action.press("Enter");
    await expect(page.getByRole("status", { name: "Pending press count" })).toHaveText("1");
  });
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

for (const theme of carbonThemes) {
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
