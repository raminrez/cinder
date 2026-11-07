import { afterAll, afterEach, beforeAll, beforeEach, test } from "bun:test";
import { resolve } from "node:path";
import { chromium, type Browser, type BrowserContext, type Locator, type Page } from "playwright";
import { expect } from "playwright/test";
import * as Cinder from "@cinder/react";
import index from "../fixtures/composition.html";

let server: ReturnType<typeof Bun.serve>;
let browser: Browser;
let context: BrowserContext;
let page: Page;
let errors: string[];
const frameThemes = ["frame-light", "frame-dark"] as const;
type FrameTheme = (typeof frameThemes)[number];

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

async function open(fixture: string, theme: FrameTheme) {
  await page.goto(`/?case=${fixture}&theme=${theme}`);
  await expect(page.getByRole("heading", { name: "Cinder composed fields" })).toBeVisible();
  await expect(page.locator(".cinder-theme")).toHaveAttribute("data-cinder-theme", theme);
}

function output(name: string) {
  return page.getByRole("status", { name, exact: true });
}

async function jsonOutput(name: string) {
  return JSON.parse((await output(name).textContent())!);
}

async function expectGroupedControl(
  field: Locator,
  inputSelector = ".react-aria-Input",
  count = 1,
) {
  await expect(field.locator(":scope > .cinder-field__control.cinder-input-group")).toHaveCount(1);
  await expect(field.locator(".cinder-field__control")).toHaveCount(1);
  await expect(field.locator(inputSelector)).toHaveCount(count);
  await expect(field.locator(`${inputSelector}.cinder-field__control`)).toHaveCount(0);
}

test("all twelve field namespaces remain callable, share common parts, and leave raw RAC exports intact", async () => {
  for (const field of [
    Cinder.TextField,
    Cinder.TextArea,
    Cinder.NumberField,
    Cinder.SearchField,
    Cinder.CheckboxGroup,
    Cinder.RadioGroup,
    Cinder.Select,
    Cinder.ComboBox,
    Cinder.DateField,
    Cinder.TimeField,
    Cinder.DatePicker,
    Cinder.DateRangePicker,
  ]) {
    expect(typeof field).toBe("function");
    expect(typeof field.Root).toBe("function");
    for (const part of ["Label", "Description", "Help", "ErrorMessage"] as const) {
      expect(field[part]).toBe(Cinder.TextField[part]);
    }
  }
  expect(Cinder.TextField.Control).toBe(Cinder.TextArea.Control);
  expect(Cinder.CheckboxGroup.Checkbox).toBe(Cinder.Checkbox);
  expect(Cinder.RadioGroup.Radio).toBe(Cinder.Radio);
  expect(Cinder.ComboBox.Input).toBe(Cinder.NumberField.Input);
  expect(Cinder.SearchField.Input).toBe(Cinder.NumberField.Input);
  expect(Cinder.DatePicker.Input).toBe(Cinder.DateRangePicker.Input);
  expect(Cinder.DateField.Input).toBe(Cinder.TimeField.Input);
  expect(Cinder.DatePicker.Calendar).toBe(Cinder.Calendar);
  expect(Cinder.DateRangePicker.Calendar).toBe(Cinder.RangeCalendar);
  // Resolve the installed peer from its owner, without adding a workspace-root dependency.
  const rac = await import(
    Bun.resolveSync("react-aria-components", resolve(import.meta.dir, "../../packages/react"))
  );
  expect(Cinder.Label).toBe(rac.Label);
  expect(Cinder.Input).toBe(rac.Input);
  expect(Cinder.FieldError).toBe(rac.FieldError);
  expect(Cinder.TextField.Label).not.toBe(rac.Label);
  expect(Cinder.TextField.Input).not.toBe(rac.Input);
  expect(Cinder.TextField.ErrorMessage).not.toBe(rac.FieldError);
  for (const field of [
    Cinder.DateField,
    Cinder.TimeField,
    Cinder.DatePicker,
    Cinder.DateRangePicker,
  ]) {
    expect(field.Segment).toBe(rac.DateSegment);
  }
});

for (const theme of frameThemes) {
  test(`${theme}: text roots and inputs preserve distinct DOM refs, events, render callbacks, and slots`, async () => {
    await open("text", theme);
    const field = page.getByTestId("composed-text");
    const input = page.getByRole("textbox", { name: "Composed text", exact: true });
    const description = field.locator(".cinder-field__description");
    const error = field.locator(".cinder-field__error");
    const descriptionId = await description.getAttribute("id");
    const errorId = await error.getAttribute("id");
    await expect(field).toHaveClass(/cinder-field cinder-text-field.*consumer-invalid/);
    await expect(field).toHaveAttribute("slot", "consumer-field");
    await expect(field).toHaveAttribute("data-custom-root", "invalid");
    await expect(field).toHaveCSS("max-width", "320px");
    await expect(field).not.toHaveAttribute("placeholder");
    await expect(field).not.toHaveAttribute("data-leaf-only");
    await expect(input).toHaveClass(/cinder-field__control react-aria-Input.*consumer-resting/);
    await expect(input).toHaveAttribute("slot", "consumer-input");
    await expect(input).toHaveAttribute("placeholder", "Leaf placeholder");
    await expect(input).toHaveAttribute("spellcheck", "false");
    await expect(input).toHaveAttribute("data-leaf-only", "input");
    await expect(input).toHaveAttribute("data-custom-input", "resting");
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAccessibleDescription(
      /Text guidance.*Use at least three characters\./,
    );
    expect((await input.getAttribute("aria-describedby"))!.split(" ")).toEqual(
      expect.arrayContaining([descriptionId, errorId]),
    );
    await expect(error).toHaveClass(/cinder-field__error react-aria-FieldError.*consumer-recovery/);
    await expect(error).toHaveAttribute("data-custom-error", "true");
    await expect(error).toHaveCSS("letter-spacing", "0.5px");
    await expect(field.locator(".cinder-field__help")).toHaveClass(
      /cinder-field__help cinder-field-help.*consumer-help/,
    );
    await expect(field.locator(".cinder-field__label")).toHaveAttribute(
      "for",
      (await input.getAttribute("id"))!,
    );

    await page.getByRole("button", { name: "Inspect text refs" }).click();
    expect(await jsonOutput("Text ref targets")).toEqual({
      root: "DIV",
      input: "INPUT",
      label: "LABEL",
      description: "SPAN",
      help: "DIV",
      error: "DIV",
      containsInput: true,
      containsError: true,
    });
    await expect(input).toBeFocused();
    await input.click();
    await expect(input).toHaveClass(/consumer-focused/);
    await expect(input).toHaveAttribute("data-custom-input", "focused");
    await expect(input).toHaveCSS("padding-inline-start", "19px");
    await input.fill("Ready");
    await input.press("End");
    await input.press("!");
    await expect(input).toHaveValue("Ready!");
    await input.press("Backspace");
    await expect
      .poll(() => jsonOutput("Text events"))
      .toMatchObject({
        rootChange: "string:Ready",
        leafChange: "INPUT:Ready",
        leafInput: "INPUT:Ready",
        rootFocus: "INPUT",
        leafFocus: "INPUT",
        rootClick: "DIV",
        leafClick: "INPUT",
      });
    await expect(output("Text value")).toHaveText("Ready");
    await expect(output("Text child callback")).toHaveText("valid");
    await expect(field).toHaveClass(/consumer-valid/);
    await expect(field).toHaveAttribute("data-custom-root", "valid");
    await expect(field).toHaveCSS("max-width", "336px");
    await expect(error).toHaveCount(0);
    await expect(input).not.toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAccessibleDescription("Text guidance");
    await expect(description).toHaveAttribute("id", descriptionId!);

    const detached = page.getByTestId("detached-leaf");
    await expect(detached).toHaveAttribute("slot", "consumer-leaf");
    await expect(detached).toHaveValue("Local leaf");
    await expect(detached).not.toHaveAttribute("aria-invalid");
    await expect(detached).not.toHaveAttribute("aria-describedby");
    await detached.fill("Local edit");
    await expect(input).toHaveValue("Ready");
    await expect(output("Text value")).toHaveText("Ready");
    const overridden = page.getByRole("textbox", { name: "Description slot override" });
    await expect(page.getByTestId("overridden-description")).toHaveAttribute(
      "slot",
      "errorMessage",
    );
    await expect(overridden).toHaveAccessibleDescription("Explicit error slot");
    const nullRoot = page.getByTestId("null-slot-root");
    await expect(nullRoot).not.toHaveAttribute("slot");
    await expect(nullRoot.getByRole("textbox")).toHaveValue("Independent root");
    await expectGroupedControl(nullRoot);
    const shorthand = page.getByTestId("default-text");
    await expect(shorthand.locator(".cinder-field__control.react-aria-Input")).toHaveCount(1);
    await expect(shorthand.getByRole("textbox")).toHaveValue("Default value");
    await page.getByRole("button", { name: "Submit text composition" }).click();
    await expect(output("Text FormData")).toHaveText(
      JSON.stringify([
        ["text", "Ready"],
        ["detached", "Local edit"],
      ]),
    );
  });

  test(`${theme}: composed and callable textareas preserve zero children and native multiline editing`, async () => {
    await open("area", theme);
    const field = page.getByTestId("composed-area");
    const input = field.getByRole("textbox", { name: "0", exact: true });
    for (const id of ["composed-area", "default-area"]) {
      const root = page.getByTestId(id);
      await expect(root.locator(".cinder-field__label")).toHaveText("0");
      await expect(root.locator(".cinder-field__description")).toHaveText("0");
      await expect(root.locator("textarea.cinder-field__control.react-aria-TextArea")).toHaveCount(
        1,
      );
      await expect(root.locator(".cinder-field__control")).toHaveCount(1);
      await expect(root.getByRole("textbox")).toHaveAccessibleDescription("0");
    }
    await expect(page.getByTestId("zero-help")).toHaveText("0");
    await expect(field.locator(".cinder-field__error")).toHaveCount(0);
    await expect(input).toHaveAttribute("rows", "2");
    await expect(input).toHaveClass(/react-aria-TextArea.*consumer-area-input/);
    await page.getByRole("button", { name: "Inspect area refs" }).click();
    await expect(output("Area ref targets")).toHaveText("DIV,TEXTAREA,DIV,true");
    await expect(input).toBeFocused();
    await expect(input).toHaveValue("Initial note");
    await input.fill("First line\nSecond line");
    await input.press("End");
    await input.press("Enter");
    await input.press("X");
    const value = "First line\nSecond line\nX";
    await expect(input).toHaveValue(value);
    await expect(output("Area native input")).toHaveText(`TEXTAREA:${value}`);
    await expect(page.getByTestId("default-area").getByRole("textbox")).toHaveValue("Default note");
    await page.getByRole("button", { name: "Submit area composition" }).click();
    await expect(output("Area FormData")).toHaveText(JSON.stringify([["note", value]]));
  });

  test(`${theme}: number composition enforces bounds and steps while submitting raw numeric values`, async () => {
    await open("number", theme);
    const field = page.getByTestId("composed-number");
    const input = field.getByRole("textbox", { name: "Composed amount" });
    const increase = field.getByRole("button", { name: "Increase amount" });
    const decrease = field.getByRole("button", { name: "Decrease amount" });
    await expectGroupedControl(field);
    await expectGroupedControl(page.getByTestId("default-number"));
    await expect(input).toHaveClass(/react-aria-Input.*consumer-number-input/);
    await expect(input).toHaveValue("$1.50");
    await expect(field).toHaveAttribute("data-size", "sm");
    await expect(increase).toHaveAttribute("slot", "increment");
    await expect(decrease).toHaveAttribute("slot", "decrement");
    await page.getByRole("button", { name: "Inspect amount refs" }).click();
    await expect(output("Number ref targets")).toHaveText("DIV,DIV,INPUT,BUTTON,true,true");
    await expect(input).toBeFocused();
    await expect(page.getByTestId("number-control")).toHaveClass(/consumer-control-focused/);
    await increase.click();
    await expect(input).toHaveValue("$1.75");
    await expect(output("Number value")).toHaveText("number:1.75");
    await input.press("ArrowUp");
    await expect(input).toHaveValue("$2.00");
    await expect(increase).toBeDisabled();
    await input.press("ArrowUp");
    await expect(output("Number value")).toHaveText("number:2");
    await input.press("Home");
    await expect(input).toHaveValue("$1.25");
    await expect(decrease).toBeDisabled();
    await input.press("ArrowDown");
    await expect(output("Number value")).toHaveText("number:1.25");
    await input.fill("999");
    await input.press("Tab");
    await expect(input).toHaveValue("$2.00");
    await decrease.click();
    await expect(output("Number value")).toHaveText("number:1.75");
    await page.getByRole("button", { name: "Submit amount composition" }).click();
    await expect(output("Number FormData")).toHaveText(JSON.stringify([["amount", "1.75"]]));
    await page.getByTestId("default-number").getByRole("textbox").press("ArrowUp");
    await expect(page.getByTestId("default-number").getByRole("textbox")).toHaveValue("3");
  });

  test(`${theme}: search clear and Escape preserve root and button handlers and raw shorthand overrides`, async () => {
    await open("search", theme);
    const field = page.getByTestId("composed-search");
    const input = field.getByRole("searchbox", { name: "Composed search" });
    const clear = page.getByTestId("search-clear");
    await expectGroupedControl(field);
    await expect(input).toHaveClass(/react-aria-Input.*consumer-search-input/);
    await expect(input).toHaveAttribute("placeholder", "Leaf search placeholder");
    await expect(input).toHaveAccessibleDescription("Escape also clears the query.");
    await expect(field).not.toHaveAttribute("data-empty");
    await expect(clear).toBeVisible();
    await expect(clear).toBeEnabled();
    await expect(clear).toHaveAttribute("tabindex", "-1");
    await clear.click();
    await expect(input).toBeFocused();
    await expect(input).toHaveValue("");
    await expect(output("Search value")).toHaveText("");
    await expect(output("Search clears")).toHaveText("1");
    await expect(output("Clear button presses")).toHaveText("1");
    await expect(field).toHaveAttribute("data-empty");
    await expect(field).toHaveClass(/consumer-empty/);
    await expect(clear).toBeEnabled();
    await expect(clear).toBeHidden();
    await input.fill("Second query");
    await expect(field).not.toHaveAttribute("data-empty");
    await expect(field).toHaveClass(/consumer-query/);
    await expect(clear).toBeVisible();
    await expect(clear).toBeEnabled();
    await input.press("Escape");
    await expect(input).toBeFocused();
    await expect(input).toHaveValue("");
    await expect(output("Search clears")).toHaveText("2");
    await expect(output("Clear button presses")).toHaveText("1");
    await expect(field).toHaveAttribute("data-empty");
    await expect(clear).toBeEnabled();
    await expect(clear).toBeHidden();
    await page.getByRole("button", { name: "Submit search composition" }).click();
    await expect(output("Search FormData")).toHaveText(JSON.stringify([["query", ""]]));
    const shorthand = page.getByTestId("default-search");
    await expect(shorthand.locator(".cinder-field__control")).toHaveCount(1);
    const raw = shorthand.getByRole("searchbox", { name: "Default search" });
    await expect(raw).toHaveClass("consumer-raw-search");
    await expect(raw).toHaveAttribute("placeholder", "Raw override");
    await raw.fill("Raw query");
    await raw.press("Escape");
    await expect(raw).toHaveValue("");
  });

  test(`${theme}: Select parts preserve rich object values, numeric single/multiple keys, and native submissions`, async () => {
    await open("collections", theme);
    const field = page.getByTestId("composed-select");
    const trigger = page.getByTestId("single-trigger");
    await expect(field.locator(".cinder-field__control.cinder-select-trigger")).toHaveCount(1);
    await expect(field.locator(".cinder-field__control")).toHaveCount(1);
    await expect(field.locator(".cinder-select__value.react-aria-SelectValue")).toContainText(
      "Reader",
    );
    await trigger.click();
    const list = page.getByRole("listbox", { name: "Composed role", exact: true });
    await expect(list).toHaveClass(/cinder-select__listbox react-aria-ListBox.*consumer-listbox/);
    await expect(list.getByRole("option")).toHaveCount(3);
    await expect(list.getByText("Can edit records", { exact: true })).toBeVisible();
    await expect(list.getByRole("option", { name: /^Reader/ })).toHaveClass(/consumer-selected/);
    await expect(list.getByRole("option", { name: /^Owner/ })).toBeDisabled();
    await expect(page.getByTestId("single-popover")).toHaveClass(
      /cinder-popover.*cinder-select-popover/,
    );
    await expect(page.getByTestId("single-popover")).toHaveAttribute("data-cinder-theme", theme);
    await expect(output("Select child callback")).toHaveText("open");
    await expect(field).toHaveClass(/consumer-open/);
    await page.keyboard.press("Home");
    await expect(list.getByRole("option", { name: /^Reader/ })).toBeFocused();
    await page.keyboard.press("End");
    await expect(list.getByRole("option", { name: /^Writer/ })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(list).toBeHidden();
    await expect(trigger).toBeFocused();
    await expect(output("Single key")).toHaveText("number:2");
    await expect(output("Select child callback")).toHaveText("closed");
    await expect(page.getByTestId("single-value-items")).toHaveText(
      JSON.stringify([{ id: 2, name: "Writer", description: "Can edit records" }]),
    );

    const multipleTrigger = page.getByTestId("multiple-trigger");
    await multipleTrigger.click();
    const multiple = page.getByRole("listbox", { name: "Composed multiple roles" });
    const writer = multiple.getByRole("option", { name: /^Writer/ });
    await writer.click();
    await expect(writer).toHaveAttribute("aria-selected", "true");
    await expect(writer).toHaveClass(/consumer-selected/);
    await expect(multiple.getByRole("option", { name: /^Reader/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await page.keyboard.press("Escape");
    await expect(multiple).toBeHidden();
    await expect(multipleTrigger).toBeFocused();
    await expect(output("Multiple keys")).toHaveText("number:1,number:2");
    await page.getByRole("button", { name: "Submit collection composition" }).click();
    expect(await jsonOutput("Collection FormData")).toEqual([
      ["single", "2"],
      ["multiple", "1"],
      ["multiple", "2"],
      ["combo", "1"],
    ]);
  });

  test(`${theme}: ComboBox skeletons retain filtering, keyboard selection, rich values, and numeric form keys`, async () => {
    await open("collections", theme);
    const field = page.getByTestId("composed-combo");
    const input = field.getByRole("combobox", { name: "Composed searchable roles" });
    const description = field.locator(".cinder-field__description");
    const value = field.locator(".cinder-combobox-values.react-aria-ComboBoxValue");
    // RAC hides the callback output from assistive technology while the menu is open.
    const callback = field.locator('output[aria-label="ComboBox child callback"]');
    await expectGroupedControl(field);
    await expect(input).toHaveClass(/react-aria-Input.*consumer-combo-input/);
    await expect(input).not.toHaveAttribute("name");
    await expect(description).toHaveText("Type to filter roles");
    await expect(value).toContainText("Reader");
    await expect(input).toHaveAccessibleDescription("Type to filter roles Reader");
    const descriptionId = await description.getAttribute("id");
    const valueId = await value.getAttribute("id");
    expect((await input.getAttribute("aria-describedby"))!.split(" ")).toEqual(
      expect.arrayContaining([descriptionId, valueId]),
    );
    await input.fill("Wri");
    const list = page.getByRole("listbox", { name: "Composed searchable roles" });
    await expect(list.getByRole("option")).toHaveCount(1);
    await expect(input).toHaveAttribute("aria-expanded", "true");
    await expect(input).toHaveAttribute("aria-controls", (await list.getAttribute("id"))!);
    const writer = list.getByRole("option", { name: /^Writer/ });
    await expect(writer.getByText("Can edit records", { exact: true })).toBeVisible();
    await expect(callback).toHaveText("open");
    await expect(page.getByTestId("combo-popover")).toHaveAttribute("data-cinder-theme", theme);
    await input.press("ArrowDown");
    await expect(input).toHaveAttribute(
      "aria-activedescendant",
      (await writer.getAttribute("id"))!,
    );
    await input.press("Enter");
    await expect(writer).toHaveAttribute("aria-selected", "true");
    await input.press("Escape");
    await expect(input).toHaveAttribute("aria-expanded", "false");
    await expect(input).toBeFocused();
    await expect(callback).toHaveText("closed");
    await expect(output("ComboBox keys")).toHaveText("number:1,number:2");
    await expect(description).toHaveAttribute("id", descriptionId!);
    await expect(value).toHaveAttribute("id", valueId!);
    await expect(input).toHaveAccessibleDescription("Type to filter roles Reader and Writer");
    expect((await input.getAttribute("aria-describedby"))!.split(" ")).toEqual(
      expect.arrayContaining([descriptionId, valueId]),
    );
    await expect(page.getByTestId("combo-value-items")).toHaveText(
      JSON.stringify([
        { id: 1, name: "Reader", description: "Can view records" },
        { id: 2, name: "Writer", description: "Can edit records" },
      ]),
    );
    await field.getByRole("button").click();
    await expect(list.getByRole("option", { name: /^Owner/ })).toBeDisabled();
    await input.press("Escape");
    await page.getByRole("button", { name: "Submit collection composition" }).click();
    expect(await jsonOutput("Collection FormData")).toEqual([
      ["single", "1"],
      ["multiple", "1"],
      ["combo", "1"],
      ["combo", "2"],
    ]);
  });

  test(`${theme}: native group validation retains first-invalid focus, unclipped recovery, and nonblanket option paint`, async () => {
    await open("validation", theme);
    const first = page.getByRole("textbox", { name: "First required field" });
    const checkbox = page.getByTestId("native-checkbox-group");
    const radio = page.getByTestId("native-radio-group");
    const email = checkbox.getByRole("checkbox", { name: "Email alerts" });
    const immediate = radio.getByRole("radio", { name: "Immediate delivery" });
    const quiet = radio.getByRole("radio", { name: "Quiet delivery" });
    const submit = page.getByRole("button", { name: "Validate composed groups" });
    const controls = page.locator(".cinder-checkbox-control, .cinder-radio-control");
    const restingPaint = await controls.evaluateAll((elements) =>
      elements.map((element) => getComputedStyle(element).borderTopColor),
    );
    const descriptionIds = await Promise.all(
      [checkbox, radio].map((group) =>
        group.locator(".cinder-field__description").getAttribute("id"),
      ),
    );
    await expect(page.locator(".cinder-field__error")).toHaveCount(0);
    await expect(page.getByTestId("radio-options")).toHaveClass(
      /cinder-radio-options.*consumer-options/,
    );
    await submit.click();
    await expect(first).toBeFocused();
    await expect(first).toHaveAccessibleDescription(
      /Text guidance stays visible\..*Enter the first field\./,
    );
    await expect(output("Validation FormData")).toHaveText("");
    await expect(output("CheckboxGroup child callback")).toHaveText("invalid");
    await expect(checkbox).not.toHaveAttribute("aria-invalid");
    await expect(radio).toHaveAttribute("aria-invalid", "true");
    await expect(checkbox.getByRole("checkbox")).toHaveCount(2);
    for (const option of await checkbox.getByRole("checkbox").all()) {
      await expect(option).toHaveAttribute("aria-invalid", "true");
    }
    for (const [index, group] of [checkbox, radio].entries()) {
      const description = group.locator(".cinder-field__description");
      const error = group.locator(".cinder-field__error.react-aria-FieldError");
      await expect(group).toHaveAttribute("data-invalid");
      await expect(group).toHaveAccessibleDescription(/guidance stays visible\..*Choose/);
      await expect(description).toBeVisible();
      await expect(description).toHaveAttribute("id", descriptionIds[index]!);
      expect((await group.getAttribute("aria-describedby"))!.split(" ")).toEqual(
        expect.arrayContaining([descriptionIds[index], await error.getAttribute("id")]),
      );
      await expect(group.locator("input")).toHaveCount(2);
      for (const option of await group.locator("input").all()) {
        await expect(option).toHaveAttribute("required");
        expect((await option.getAttribute("aria-describedby"))!.split(" ")).toEqual(
          expect.arrayContaining([descriptionIds[index], await error.getAttribute("id")]),
        );
        await expect(option).toHaveAccessibleDescription(/Choose.*guidance stays visible\./);
        expect(await option.evaluate((element: HTMLInputElement) => element.validity.valid)).toBe(
          false,
        );
      }
      await expect(error).toBeVisible();
      expect(
        await error.evaluate((element) => {
          const range = document.createRange();
          range.selectNodeContents(element);
          const text = range.getBoundingClientRect();
          const box = element.getBoundingClientRect();
          const help = element.parentElement!;
          return {
            multiline: text.height > 40,
            fitsError:
              text.bottom <= box.bottom + 1 && element.scrollHeight <= element.clientHeight + 1,
            fitsHelp:
              text.bottom <= help.getBoundingClientRect().bottom + 1 &&
              help.scrollHeight <= help.clientHeight + 1,
          };
        }),
      ).toEqual({ multiline: true, fitsError: true, fitsHelp: true });
      await expect(group.locator(".cinder-field__control")).toHaveCount(0);
    }
    const invalidPaint = await controls.evaluateAll((elements) =>
      elements.map((element) => getComputedStyle(element).borderTopColor),
    );
    await first.fill("Entered");
    await submit.click();
    await expect(email).toBeFocused();
    await email.press("Space");
    await expect(email).toBeChecked();
    await expect(checkbox).toContainText("Enabled");
    await submit.click();
    await expect(immediate).toBeFocused();
    await immediate.press("ArrowDown");
    await expect(quiet).toBeFocused();
    await expect(quiet).toBeChecked();
    await expect(immediate).not.toBeChecked();
    await submit.click();
    await expect(output("Validation FormData")).toHaveText(
      JSON.stringify([
        ["first", "Entered"],
        ["channels", "email"],
        ["delivery", "quiet"],
      ]),
    );
    await expect(page.locator(".cinder-field__error")).toHaveCount(0);
    await expect(output("CheckboxGroup child callback")).toHaveText("valid");
    for (const [index, group] of [checkbox, radio].entries()) {
      await expect(group).not.toHaveAttribute("data-invalid");
      await expect(group).not.toHaveAttribute("aria-invalid", "true");
      await expect(group.locator(".cinder-field__description")).toHaveAttribute(
        "id",
        descriptionIds[index]!,
      );
      await expect(group).toHaveAttribute("aria-describedby", descriptionIds[index]!);
      for (const option of await group.locator("input").all()) {
        await expect(option).not.toHaveAttribute("aria-invalid", "true");
        await expect(option).toHaveAttribute("aria-describedby", descriptionIds[index]!);
        expect(await option.evaluate((element: HTMLInputElement) => element.validity.valid)).toBe(
          true,
        );
      }
    }
    expect(invalidPaint).toEqual(restingPaint);
  });

  test(`${theme}: date and time segments retain native refs, render children, keyboard values, and submissions`, async () => {
    await open("dates", theme);
    for (const id of ["default-date", "default-time", "composed-date", "composed-time"]) {
      const field = page.getByTestId(id);
      await expect(
        field.locator(":scope > .cinder-field__control.react-aria-DateInput"),
      ).toHaveCount(1);
      await expect(field.locator(".cinder-field__control")).toHaveCount(1);
    }
    await page.getByRole("button", { name: "Inspect date refs" }).click();
    await expect(output("Date ref targets")).toHaveText("DIV,DIV,SPAN,true,true");
    const day = page.getByRole("spinbutton", { name: "day, Composed date", exact: true });
    await expect(day).toBeFocused();
    await expect(day).toHaveClass(/react-aria-DateSegment consumer-segment-day/);
    await expect(day.locator("b")).toHaveText("12");
    await expect(page.getByTestId("composed-date").locator(".react-aria-DateInput")).toHaveClass(
      /consumer-date-focused/,
    );
    await day.press("ArrowUp");
    await expect(day).toHaveAttribute("aria-valuenow", "13");
    await expect(day.locator("b")).toHaveText("13");
    await expect(output("Date child callback")).toHaveText("2026-11-13");
    await page.getByRole("spinbutton", { name: "day, Default date", exact: true }).press("ArrowUp");
    const hour = page.getByRole("spinbutton", { name: "hour, Composed time", exact: true });
    await hour.press("ArrowUp");
    await expect(hour).toHaveAttribute("aria-valuenow", "11");
    await hour.press("ArrowRight");
    const minute = page.getByRole("spinbutton", { name: "minute, Composed time", exact: true });
    await expect(minute).toBeFocused();
    await minute.press("ArrowUp");
    await expect(minute.locator("b")).toHaveText("31");
    await page
      .getByRole("spinbutton", { name: "hour, Default time", exact: true })
      .press("ArrowUp");
    await page.getByRole("button", { name: "Submit date composition" }).click();
    expect(Object.fromEntries(await jsonOutput("Date FormData"))).toEqual({
      "default-date": "2026-11-13",
      "default-time": "11:30:00",
      "default-picker": "2026-11-12",
      "default-start": "2026-11-12",
      "default-end": "2026-11-16",
      date: "2026-11-13",
      time: "11:31:00",
      picker: "2026-11-12",
      start: "2026-11-12",
      end: "2026-11-16",
    });
  });

  test(`${theme}: nullable root slots isolate picker-owned disabled state and values`, async () => {
    await open("dates", theme);
    const inherited = page.getByTestId("inherited-date-root");
    const independent = page.getByTestId("null-slot-date-root");
    const inheritedDay = inherited.getByRole("spinbutton", { name: /^day,/ });
    const independentDay = independent.getByRole("spinbutton", { name: /^day,/ });
    await expect(inherited).toHaveAttribute("data-disabled");
    await expect(inheritedDay).toHaveAttribute("aria-valuenow", "12");
    await expect(independent).not.toHaveAttribute("data-disabled");
    await expect(independent).not.toHaveAttribute("slot");
    await expect(independentDay).toHaveAttribute("aria-valuenow", "7");
    await independentDay.click();
    await independentDay.press("ArrowUp");
    await expect(independentDay).toBeFocused();
    await expect(independentDay).toHaveAttribute("aria-valuenow", "8");
    await expect(inheritedDay).toHaveAttribute("aria-valuenow", "12");
  });

  test(`${theme}: default and composed pickers keep grouped controls, calendar selection, range slots, and focus restoration`, async () => {
    await open("dates", theme);
    for (const id of ["default-picker", "composed-picker", "default-range", "composed-range"]) {
      await expectGroupedControl(
        page.getByTestId(id),
        ".react-aria-DateInput",
        id.endsWith("range") ? 2 : 1,
      );
    }
    const defaultTrigger = page.getByTestId("default-picker").getByRole("button");
    await defaultTrigger.press("Enter");
    const defaultDialog = page.getByRole("dialog", { name: "Choose a date", exact: true });
    await expect(defaultDialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(defaultDialog).toBeHidden();
    await expect(defaultTrigger).toBeFocused();

    const picker = page.getByTestId("composed-picker");
    const trigger = picker.getByRole("button");
    await trigger.press("Enter");
    const calendar = page.getByRole("dialog", { name: "Composed date calendar" });
    await expect(calendar).toBeVisible();
    await expect(page.getByTestId("date-popover")).toHaveClass(
      /cinder-popover.*cinder-date-popover/,
    );
    await expect(page.getByTestId("date-popover")).toHaveAttribute("data-cinder-theme", theme);
    await expect(output("Picker child callback")).toHaveText("open");
    await expect(
      calendar.getByRole("button", { name: /Thursday, November 12, 2026/ }),
    ).toBeFocused();
    await page.keyboard.press("ArrowRight");
    await expect(calendar.getByRole("button", { name: /Friday, November 13, 2026/ })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(calendar).toBeHidden();
    await expect(trigger).toBeFocused();
    await expect(picker.getByRole("spinbutton", { name: /^day,/ })).toHaveAttribute(
      "aria-valuenow",
      "13",
    );
    await expect(output("Picker child callback")).toHaveText("closed");
    await trigger.click();
    await page.keyboard.press("Escape");
    await expect(calendar).toBeHidden();
    await expect(trigger).toBeFocused();

    for (const [id, dialogName] of [
      ["default-range", "Choose a date range"],
      ["composed-range", "Composed range calendar"],
    ] as const) {
      const field = page.getByTestId(id);
      const rangeTrigger = field.getByRole("button");
      await rangeTrigger.click();
      const rangeCalendar = page.getByRole("dialog", { name: dialogName, exact: true });
      await expect(rangeCalendar).toBeVisible();
      await rangeCalendar.getByRole("button", { name: /Tuesday, November 10, 2026/ }).click();
      await rangeCalendar.getByRole("button", { name: /Friday, November 20, 2026/ }).click();
      await expect(rangeCalendar).toBeHidden();
      await expect(rangeTrigger).toBeFocused();
      const start = field.locator('.react-aria-DateInput[slot="start"]');
      const end = field.locator('.react-aria-DateInput[slot="end"]');
      await expect(start.getByRole("spinbutton", { name: /^day,/ })).toHaveAttribute(
        "aria-valuenow",
        "10",
      );
      await expect(end.getByRole("spinbutton", { name: /^day,/ })).toHaveAttribute(
        "aria-valuenow",
        "20",
      );
    }
    await page.getByRole("button", { name: "Submit date composition" }).click();
    expect(Object.fromEntries(await jsonOutput("Date FormData"))).toEqual({
      "default-date": "2026-11-12",
      "default-time": "10:30:00",
      "default-picker": "2026-11-12",
      "default-start": "2026-11-10",
      "default-end": "2026-11-20",
      date: "2026-11-12",
      time: "10:30:00",
      picker: "2026-11-13",
      start: "2026-11-10",
      end: "2026-11-20",
    });
  });
}
