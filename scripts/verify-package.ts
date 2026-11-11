import assert from "node:assert/strict";
import { cp, mkdir, mkdtemp, realpath, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve, join, relative, sep } from "node:path";
import { chromium, type Locator, type Page } from "playwright";
import { expect } from "playwright/test";
import {
  verifyAppearanceOnlyStatus,
  verifyComposedStatus,
  verifyLabelHelpIsolation,
  verifyStatusNativeTransitions,
  verifyValidationStatusPrecedence,
  verifySelectStatusAdornment,
} from "../tests/browser/field-status.assertions";

const root = resolve(import.meta.dir, "..");
const workspace = await Bun.file(join(root, "package.json")).json();
const catalog = workspace.workspaces.catalog;
const docs = await Bun.file(join(root, "apps/docs/package.json")).json();
const archives = await Bun.file(join(root, "dist/packages/manifest.json")).json();
const directory = await mkdtemp(
  join(process.env.CINDER_TEST_TMPDIR ?? tmpdir(), "cinder-consumer-"),
);
const tailwindDirectory = await mkdtemp(
  join(process.env.CINDER_TEST_TMPDIR ?? tmpdir(), "cinder-tailwind-consumer-"),
);
const tailwindVersion = "4.3.5";
const consumers = [
  {
    name: "native",
    directory,
    entrypoints: ["index.html", "frame.html", "composition.html", "status.html"],
  },
  { name: "tailwind", directory: tailwindDirectory, entrypoints: ["tailwind.html"] },
] as const;
const results = join(root, "test-results");
await mkdir(results, { recursive: true });
let browser: Awaited<ReturnType<typeof chromium.launch>> | undefined;
let server: ReturnType<typeof Bun.serve> | undefined;
let passed = false;

async function run(cwd: string, ...command: string[]) {
  const child = Bun.spawn(command, { cwd, stdout: "inherit", stderr: "inherit" });
  assert.equal(await child.exited, 0, `Consumer command failed: ${command.join(" ")}`);
}

async function verifyStatusConsumer(page: Page, baseURL: URL) {
  for (const [theme, background] of [
    ["frame-light", "rgb(245, 246, 248)"],
    ["frame-dark", "rgb(24, 25, 29)"],
  ] as const) {
    const url = new URL("status.html", baseURL);
    url.searchParams.set("theme", theme);
    for (const verify of [
      verifyAppearanceOnlyStatus,
      verifyValidationStatusPrecedence,
      verifyComposedStatus,
      verifyLabelHelpIsolation,
      verifyStatusNativeTransitions,
      verifySelectStatusAdornment,
    ]) {
      // Each shared proof expects a fresh fixture, including empty submission output.
      await page.goto(url.href);
      await expect(
        page.getByRole("heading", { name: "Field status contracts", exact: true }),
      ).toBeVisible();
      const themeRoot = page.locator(".cinder-theme").first();
      await expect(themeRoot).toHaveAttribute("data-cinder-theme", theme);
      await expect(themeRoot).toHaveCSS("background-color", background);
      await verify(page);
    }
  }
}

async function verifyCompositionConsumer(page: Page, baseURL: URL) {
  for (const [theme, background, surface] of [
    ["frame-light", "rgb(245, 246, 248)", "rgb(255, 255, 255)"],
    ["frame-dark", "rgb(24, 25, 29)", "rgb(34, 36, 42)"],
  ] as const) {
    const url = new URL("composition.html", baseURL);
    url.searchParams.set("theme", theme);
    await page.goto(url.href);
    const themeRoot = page.locator(".cinder-theme").first();
    await expect(themeRoot).toHaveAttribute("data-cinder-theme", theme);
    await expect(themeRoot).toHaveAttribute("data-cinder-layer", "0");
    await expect(themeRoot).toHaveCSS("background-color", background);
    async function expectPortal(portal: Locator) {
      await expect(portal).toHaveAttribute("data-cinder-theme", theme);
      await expect(portal).toHaveAttribute("data-cinder-layer", "0");
      await expect(portal).toHaveAttribute("lang", "en-US");
      await expect(portal).toHaveAttribute("dir", "ltr");
      await expect(portal).toHaveCSS("background-color", surface);
      await expect(portal).toHaveCSS("font-family", /system-ui/);
    }
    const form = page.locator("form").first();
    const text = form.locator(".cinder-text-field").first();
    const area = form.locator(".cinder-text-area");
    const number = form.locator(".cinder-number-field");
    const search = form.locator(".cinder-search-field");
    const checkbox = form.locator(".cinder-checkbox-group");
    const radio = form.locator(".cinder-radio-group");
    const select = form.locator(".cinder-select").first();
    const combo = form.locator(".cinder-combobox").first();
    const date = form.locator(".cinder-date-field").first();
    const time = form.locator(".cinder-date-field").nth(1);
    const picker = form.locator(".cinder-date-picker");
    const range = form.locator(".cinder-date-range-picker");
    for (const [name, field, leaf, count] of [
      ["TextField", text, "input.cinder-field__control.react-aria-Input", 1],
      ["TextArea", area, "textarea.cinder-field__control.react-aria-TextArea", 1],
      ["NumberField", number, ".cinder-field__control.cinder-input-group", 1],
      ["SearchField", search, ".cinder-field__control.cinder-input-group", 1],
      ["CheckboxGroup", checkbox, ".cinder-checkbox", 2],
      ["RadioGroup", radio, ".cinder-radio-options .cinder-radio", 2],
      ["Select", select, ".cinder-field__control.cinder-select-trigger", 1],
      ["ComboBox", combo, ".cinder-field__control.cinder-input-group", 1],
      ["DateField", date, ".cinder-field__control.react-aria-DateInput", 1],
      ["TimeField", time, ".cinder-field__control.react-aria-DateInput", 1],
      ["DatePicker", picker, ".cinder-field__control.cinder-input-group", 1],
      ["DateRangePicker", range, ".cinder-field__control.cinder-input-group", 1],
    ] as const) {
      await expect(field, `${name}.Root`).toBeVisible();
      await expect(field.locator(".cinder-field__label.react-aria-Label")).toHaveCount(1);
      await expect(field.locator(".cinder-field__description.react-aria-Text")).toHaveCount(1);
      await expect(field.locator(".cinder-field__help.cinder-field-help")).toHaveCount(1);
      await expect(field.locator(leaf)).toHaveCount(count);
    }
    const nativeInput = page.getByRole("status", { name: "Consumer native input", exact: true });
    const saved = page.getByRole("status", { name: "Consumer FormData", exact: true });
    const workspace = text.getByRole("textbox", { name: "Workspace (required)", exact: true });
    const description = text.locator(".cinder-field__description");
    const descriptionId = await description.getAttribute("id");
    await expect(workspace).toHaveValue("Workspace");
    await expect(workspace).toHaveAttribute("slot", "consumer-input");
    await expect(workspace).toHaveAttribute("placeholder", "Workspace name");
    await expect(workspace).toHaveAttribute("spellcheck", "false");
    await expect(text).not.toHaveAttribute("placeholder");
    await expect(text.locator(".cinder-field__label")).toHaveAttribute(
      "for",
      (await workspace.getAttribute("id"))!,
    );
    await workspace.focus();
    await expect(workspace).toHaveAttribute("data-consumer-focus", "focused");
    await expect(workspace).toHaveClass(/consumer-focused/);
    await expect(workspace).toHaveCSS("padding-inline-start", "20px");
    await workspace.fill("ab");
    await expect(nativeInput).toHaveText("ab");
    await expect(text).toHaveClass(/consumer-invalid/);
    await expect(text).toHaveAttribute("data-consumer-validation", "invalid");
    await expect(text).toHaveCSS("max-width", "320px");
    await expect(text.locator("output")).toHaveText("Needs attention");
    const textError = text.locator(".cinder-field__error.react-aria-FieldError");
    await expect(textError).toHaveCount(1);
    await expect(textError).toHaveClass(/consumer-error/);
    await expect(textError).toHaveCSS("letter-spacing", "0.5px");
    assert.ok(
      (await workspace.getAttribute("aria-describedby"))!
        .split(" ")
        .includes((await textError.getAttribute("id"))!),
    );
    const inspectRefs = page.getByRole("button", {
      name: "Inspect consumer refs",
      exact: true,
      includeHidden: true,
    });
    const refTargets = page.getByRole("status", {
      name: "Consumer ref targets",
      exact: true,
      includeHidden: true,
    });
    const expectedRefs = {
      root: "DIV",
      input: "INPUT",
      label: "LABEL",
      description: "P",
      help: "DIV",
      error: "DIV",
      area: "TEXTAREA",
      numberControl: "DIV",
      numberButton: "BUTTON",
      checkboxLabel: "LABEL",
      checkboxInput: "INPUT",
      radioLabel: "LABEL",
      radioInput: "INPUT",
      radioOptions: "DIV",
      selectTrigger: "BUTTON",
      selectValue: "SPAN",
      selectList: null,
      selectPopover: null,
      comboInput: "INPUT",
      comboControl: "DIV",
      comboValue: "DIV",
      dateRoot: "DIV",
      dateInput: "DIV",
      dateSegment: "SPAN",
      pickerInput: "DIV",
      pickerTrigger: "BUTTON",
      rangeStart: "DIV",
      rangeEnd: "DIV",
      rootContainsInput: true,
      helpContainsDescription: true,
      helpContainsError: true,
      controlContainsButton: true,
      checkboxLabelContainsInput: true,
      radioLabelContainsInput: true,
      radioOptionsContainsLabel: true,
      selectTriggerContainsValue: true,
      selectPopoverContainsList: false,
      comboControlContainsInput: true,
      dateRootContainsInput: true,
      dateInputContainsSegment: true,
    };
    await inspectRefs.click();
    await expect(refTargets).not.toHaveText("");
    assert.deepEqual(JSON.parse((await refTargets.textContent())!), expectedRefs);
    await workspace.fill("Design studio");
    await expect(workspace).toHaveValue("Design studio");
    await expect(nativeInput).toHaveText("Design studio");
    await expect(text).toHaveAttribute("data-consumer-validation", "valid");
    await expect(text).toHaveCSS("max-width", "336px");
    await expect(text.locator("output")).toHaveText("Ready");
    await expect(textError).toHaveCount(0);
    await expect(workspace).toHaveAccessibleDescription("This name appears in invitations.");
    await expect(description).toHaveAttribute("id", descriptionId!);

    const independent = form.getByRole("textbox", { name: "Independent root", exact: true });
    const independentRoot = form.locator(".cinder-text-field").nth(1);
    await expect(independentRoot).not.toHaveAttribute("slot");
    await expect(independent).toBeEnabled();
    await expect(independent).toHaveAttribute("slot", "native-input");
    await expect(independent).toHaveValue("Independent value");
    await independent.fill("Local edit");
    await expect(independent).toHaveValue("Local edit");
    await expect(independentRoot.locator(".cinder-field__control")).toHaveCount(1);
    await expect(independentRoot.locator(".cinder-input-group")).toHaveClass(/consumer-focus/);
    await expect(workspace).toHaveValue("Design studio");
    const notes = area.getByRole("textbox", { name: "0", exact: true });
    await expect(notes).toHaveValue("Initial note");
    await expect(notes).toHaveAttribute("slot", "native-area");
    await expect(notes).toHaveAttribute("rows", "3");
    await expect(notes).toHaveAccessibleDescription("0");
    await expect(area.locator(".cinder-field__help")).toHaveText("0");
    await notes.fill("First line\nSecond line");
    await expect(notes).toHaveClass(/consumer-focused/);
    await expect(notes).toHaveCSS("min-height", "96px");
    await expect(nativeInput).toHaveText("First line\nSecond line");
    const amount = number.getByRole("textbox", { name: "Amount", exact: true });
    await expect(amount).toHaveValue("$1.50");
    await expect(number.getByRole("button", { name: "Increase amount" })).toHaveAttribute(
      "slot",
      "increment",
    );
    await expect(number.getByRole("button", { name: "Decrease amount" })).toHaveAttribute(
      "slot",
      "decrement",
    );
    await number.getByRole("button", { name: "Increase amount" }).click();
    await expect(amount).toHaveValue("$2.00");
    const query = search.getByRole("searchbox", { name: "Search", exact: true });
    const clear = search.getByRole("button", { name: "Clear search", exact: true });
    await query.fill("First query");
    await expect(search.locator("output")).toHaveText("First query");
    await clear.click();
    await expect(query).toHaveValue("");
    await expect(query).toBeFocused();
    await expect(search.locator("output")).toHaveText("No query");
    await query.fill("Second query");
    await query.press("Escape");
    await expect(query).toHaveValue("");
    await expect(query).toBeFocused();
    await expect(nativeInput).toHaveText("cleared");

    const submit = form.getByRole("button", { name: "Save composed values", exact: true });
    const required = form.getByRole("textbox", {
      name: "Native required text (required)",
      exact: true,
    });
    const requiredRoot = form
      .locator(".cinder-text-field")
      .filter({ hasText: "Native required text" });
    const requiredDescription = requiredRoot.locator(".cinder-field__description");
    const requiredDescriptionId = await requiredDescription.getAttribute("id");
    const requiredGuidance = "Required text guidance stays visible.";
    await expect(requiredDescription).toHaveText(requiredGuidance);
    await expect(required).toHaveValue("");
    await expect(required).toHaveAttribute("required");
    await expect(required).toHaveAccessibleDescription(requiredGuidance);
    const email = checkbox.getByRole("checkbox", { name: "Email", exact: true });
    const checkboxDescription = checkbox.locator(".cinder-field__description");
    const checkboxDescriptionId = await checkboxDescription.getAttribute("id");
    await submit.click();
    await expect(saved).toHaveText("");
    await expect(required).toBeFocused();
    await expect(required).toHaveAttribute("aria-invalid", "true");
    const requiredError = requiredRoot.locator(".cinder-field__error.react-aria-FieldError");
    await expect(requiredError).toHaveText("Enter the required text.");
    await expect(required).toHaveAccessibleDescription(
      `${requiredGuidance} Enter the required text.`,
    );
    const requiredAssociation = (await required.getAttribute("aria-describedby"))!.split(" ");
    for (const id of [requiredDescriptionId, await requiredError.getAttribute("id")]) {
      assert.ok(id);
      assert.ok(requiredAssociation.includes(id));
    }
    await expect(checkbox).toHaveAttribute("data-invalid");
    await expect(email).toHaveAttribute("aria-invalid", "true");
    await expect(checkbox.locator("output")).toHaveText("Choose a channel");
    const checkboxError = checkbox.locator(".cinder-field__error.react-aria-FieldError");
    await expect(checkboxError).toBeVisible();
    const associated = (await checkbox.getAttribute("aria-describedby"))!.split(" ");
    for (const id of [checkboxDescriptionId, await checkboxError.getAttribute("id")]) {
      assert.ok(id);
      assert.ok(associated.includes(id));
    }
    await required.fill("Entered native text");
    await submit.click();
    await expect(saved).toHaveText("");
    await expect(email).toBeFocused();
    await expect(requiredError).toHaveCount(0);
    await expect(required).not.toHaveAttribute("aria-invalid", "true");
    await expect(required).toHaveAccessibleDescription(requiredGuidance);
    await expect(requiredDescription).toHaveAttribute("id", requiredDescriptionId!);
    await email.press("Space");
    await expect(
      checkbox.getByRole("checkbox", { name: "Email enabled", exact: true }),
    ).toBeChecked();
    await expect(checkbox.locator(".cinder-checkbox").first()).toHaveClass(/consumer-selected/);
    await radio.getByRole("radio", { name: "Immediate selected", exact: true }).press("ArrowRight");
    await expect(radio.getByRole("radio", { name: "Quiet", exact: true })).toBeChecked();

    // Collections and dates get installed API smoke, not later-family interaction completeness.
    const trigger = select.getByRole("button");
    await expect(trigger.locator('[title="Can view records"]')).toHaveText("Reader");
    await trigger.click();
    await expectPortal(page.locator(".cinder-select-popover"));
    const list = page.getByRole("listbox", { name: "Single role", exact: true });
    await expect(list).toHaveClass(/cinder-select__listbox.*consumer-listbox/);
    await expect(list.getByRole("option", { name: /^Reader/ })).toHaveAccessibleDescription(
      "Can view records",
    );
    await expect(list.getByRole("option", { name: /^Writer/ })).toBeDisabled();
    await expect(select.locator("output")).toHaveText("Open");
    // Read live popup refs without moving focus out of the modal Select.
    await inspectRefs.evaluate((element: HTMLButtonElement) => element.click());
    await expect
      .poll(async () => JSON.parse((await refTargets.textContent())!))
      .toEqual({
        ...expectedRefs,
        error: null,
        helpContainsError: false,
        selectList: "DIV",
        selectPopover: "DIV",
        selectPopoverContainsList: true,
      });
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
    await expect(select.locator("output")).toHaveText("Closed");
    const comboInput = combo.getByRole("combobox", { name: "Searchable role", exact: true });
    await expect(comboInput).toHaveValue("Reader");
    // Scroll before focus; RAC dismisses an open popover when its page scrolls.
    await comboInput.scrollIntoViewIfNeeded();
    await expect(comboInput).toBeInViewport({ ratio: 1 });
    await comboInput.click();
    await comboInput.fill("Wri");
    const comboList = page.getByRole("listbox", {
      name: "Suggestions Searchable role",
      exact: true,
    });
    await expectPortal(page.locator(".cinder-select-popover"));
    await expect(comboList.getByRole("option")).toHaveCount(1);
    await expect(comboInput).toHaveAttribute(
      "aria-controls",
      (await comboList.getAttribute("id"))!,
    );
    await comboInput.press("ArrowDown");
    await expect(comboInput).toHaveAttribute(
      "aria-activedescendant",
      (await comboList.getByRole("option", { name: "Writer", exact: true }).getAttribute("id"))!,
    );
    await comboInput.press("Enter");
    await expect(comboInput).toHaveValue("Writer");
    assert.equal(
      await form.evaluate((form: HTMLFormElement) => new FormData(form).get("combo-single")),
      "2",
    );
    await comboInput.fill("");
    assert.equal(
      await form.evaluate((form: HTMLFormElement) => new FormData(form).get("combo-single")),
      "",
    );
    await comboInput.fill("Wri");
    await expect(comboList.getByRole("option", { name: "Writer", exact: true })).toBeVisible();
    await comboInput.press("ArrowDown");
    await comboInput.press("Enter");
    await expect(comboInput).toHaveValue("Writer");
    await comboInput.press("Escape");
    const multipleCombo = form.locator(".cinder-combobox").nth(1);
    await expect(
      multipleCombo.locator('.cinder-combobox-values [title="Can view records"]'),
    ).toHaveText("Reader");
    const day = date.getByRole("spinbutton", { name: /^day,/ });
    await expect(day.locator("span")).toHaveText("12");
    await day.press("ArrowUp");
    await expect(day.locator("span")).toHaveText("13");
    await expect(date.locator("output")).toHaveText("2026-11-13");
    await expect(time.getByRole("spinbutton", { name: /^hour,/ }).locator("b")).toHaveText("10");
    await expect(picker.getByRole("spinbutton", { name: /^day,/ })).toHaveAttribute(
      "aria-valuenow",
      "13",
    );
    for (const [field, buttonName, dialogName] of [
      [picker, "Open date calendar Pick a date", "Date calendar"],
      [range, "Open range calendar Date range", "Range calendar"],
    ] as const) {
      const button = field.getByRole("button", { name: buttonName, exact: true });
      await button.click();
      const dialog = page.getByRole("dialog", { name: dialogName, exact: true });
      await expect(dialog).toBeVisible();
      await expectPortal(page.locator(".cinder-date-popover"));
      await expect(dialog.locator(".cinder-calendar")).toHaveCount(1);
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(button).toBeFocused();
    }
    for (const [slot, value] of [
      ["start", "12"],
      ["end", "16"],
    ] as const)
      await expect(
        range
          .locator(`.react-aria-DateInput[slot="${slot}"]`)
          .getByRole("spinbutton", { name: /^day,/ }),
      ).toHaveAttribute("aria-valuenow", value);
    await submit.click();
    await expect(saved).not.toHaveText("");
    assert.deepEqual(Object.fromEntries(JSON.parse((await saved.textContent())!)), {
      workspace: "Design studio",
      notes: "First line\nSecond line",
      amount: "2",
      search: "",
      native: "Entered native text",
      channels: "email",
      delivery: "quiet",
      single: "1",
      multiple: "1",
      "combo-single": "2",
      "combo-multiple": "1",
      date: "2026-11-13",
      time: "10:30:00",
      picker: "2026-11-13",
      start: "2026-11-12",
      end: "2026-11-16",
    });
    await expect(checkboxError).toHaveCount(0);
    await expect(checkbox).not.toHaveAttribute("data-invalid");
    await expect(
      checkbox.getByRole("checkbox", { name: "Email enabled", exact: true }),
    ).not.toHaveAttribute("aria-invalid", "true");
    await expect(checkboxDescription).toHaveAttribute("id", checkboxDescriptionId!);
    await expect(requiredDescription).toHaveAttribute("id", requiredDescriptionId!);
    const shorthand = page.getByRole("region", {
      name: "Callable shorthand compatibility",
      exact: true,
    });
    await expect(
      shorthand.getByRole("searchbox", { name: "Shorthand search", exact: true }),
    ).toHaveClass("consumer-raw-input");
    await expect(
      shorthand.getByRole("searchbox", { name: "Shorthand search", exact: true }),
    ).toHaveAttribute("placeholder", "Native override");
    await expect(
      shorthand.getByRole("textbox", { name: "Raw RAC exports", exact: true }),
    ).toHaveAccessibleDescription("Raw recovery");
  }
}

async function verifyFrameConsumer(page: Page, baseURL: URL, integration: "native" | "tailwind") {
  await page.goto(new URL(integration === "native" ? "frame.html" : "tailwind.html", baseURL).href);
  await expect(page.getByRole("heading", { name: "Frame installed-package proof" })).toBeVisible();
  const moduleAppearance = await page
    .getByTestId("module-brand")
    .evaluate((element) =>
      [...element.classList].find(
        (name) => !["cinder-theme", "fixture-brand", "fixture-stack"].includes(name),
      ),
    );
  assert.ok(
    moduleAppearance && moduleAppearance !== "appearance",
    "Bun must compile the CSS Module class",
  );
  const exported = JSON.parse((await page.getByLabel("Frame token exports").textContent())!);
  assert.deepEqual(exported.names, [
    "white",
    "g10",
    "g90",
    "g100",
    "relay-light",
    "relay-dark",
    "frame-light",
    "frame-dark",
  ]);
  assert.equal(exported.cssRadius, "var(--cinder-control-radius)");
  const brands = [
    {
      kind: "plain",
      label: "Plain CSS",
      appearance: "plain-appearance",
      radius: "12px",
      overlayRadius: "20px",
      popoverRadius: "14px",
      font: "Arial",
      color: "rgb(48, 79, 130)",
      gap: "10px",
      padding: "18px",
      surfacePadding: "28px",
    },
    {
      kind: "module",
      label: "CSS Modules",
      appearance: moduleAppearance,
      radius: "14px",
      overlayRadius: "22px",
      popoverRadius: "16px",
      font: "Trebuchet MS",
      color: "rgb(86, 58, 118)",
      gap: "12px",
      padding: "20px",
      surfacePadding: "32px",
    },
  ] as const;

  async function expectPortal(
    portal: Locator,
    theme: string,
    lang: string,
    appearance: string,
    dir = "ltr",
  ) {
    await expect(portal).toHaveAttribute("data-cinder-theme", theme);
    await expect(portal).toHaveAttribute("data-cinder-layer", "1");
    await expect(portal).toHaveAttribute("lang", lang);
    await expect(portal).toHaveAttribute("dir", dir);
    for (const brand of brands)
      await expect
        .poll(() =>
          portal.evaluate((element, name) => element.classList.contains(name), brand.appearance),
        )
        .toBe(brand.appearance === appearance);
    await expect(portal).not.toHaveClass(/fixture-brand|fixture-stack|fixture-portal-layout/);
    await expect(portal).not.toHaveAttribute("id", /^(plain|module)-portal-source$/);
    assert.equal(
      await portal.evaluate((element) =>
        getComputedStyle(element).getPropertyValue("--fixture-root-only"),
      ),
      "",
    );
  }

  for (const [theme, background, ink, raised] of [
    ["frame-light", "rgb(245, 246, 248)", "rgb(39, 42, 50)", "rgb(238, 241, 246)"],
    ["frame-dark", "rgb(24, 25, 29)", "rgb(241, 242, 246)", "rgb(44, 47, 56)"],
  ] as const) {
    await page.getByTestId(`use-${theme}`).click();
    const baseline = page.getByTestId("frame-baseline");
    await expect(baseline).toHaveAttribute("data-cinder-theme", theme);
    await expect(baseline).toHaveCSS("background-color", background);
    assert.equal(exported.frames[theme].accepted, true);
    assert.deepEqual(exported.frames[theme].js, exported.frames[theme].json);
    assert.equal(
      exported.frames[theme].js.background,
      theme === "frame-light" ? "#f5f6f8" : "#18191d",
    );
    assert.equal(typeof exported.frames[theme].js.radius, "string");
    assert.equal(typeof exported.frames[theme].js.font, "string");
    const cssTokens = await baseline.evaluate(
      (element, values: { radius: string; font: string }) => {
        // Compare computed values: CSS minifiers may normalize rems and font quoting.
        const probe = document.createElement("span");
        probe.style.borderRadius = "var(--cinder-control-radius)";
        element.append(probe);
        const radius = getComputedStyle(probe).borderTopLeftRadius;
        probe.style.borderRadius = values.radius;
        probe.style.fontFamily = values.font;
        const result = {
          radius,
          jsRadius: getComputedStyle(probe).borderTopLeftRadius,
          font: getComputedStyle(element).fontFamily,
          jsFont: getComputedStyle(probe).fontFamily,
        };
        probe.remove();
        return result;
      },
      exported.frames[theme].js,
    );
    assert.equal(cssTokens.radius, cssTokens.jsRadius);
    assert.equal(cssTokens.font, cssTokens.jsFont);
    await expect(baseline).toHaveCSS("font-family", /system-ui/);
    for (const [size, height] of [
      ["default", 44],
      ["sm", 32],
      ["md", 44],
      ["lg", 48],
    ] as const) {
      const button = page.getByTestId(`size-${size}-button`);
      const input = page.getByTestId(`size-${size}-field`).getByRole("textbox");
      const select = page.getByTestId(`size-${size}-select`).getByRole("button");
      for (const control of [button, input, select]) {
        await expect(control).toHaveCSS("height", `${height}px`);
        await expect(control).toHaveCSS("border-radius", "10px");
      }
      await expect(input).toHaveCSS("font-size", "16px");
      await expect(button).toHaveCSS("background-color", ink);
    }
    await expect(page.getByTestId("size-default-button")).toHaveAttribute("data-size", "lg");
    await expect(page.getByTestId("size-default-button")).toHaveAttribute(
      "data-cinder-size-default",
    );
    await expect(page.getByTestId("size-lg-button")).not.toHaveAttribute(
      "data-cinder-size-default",
    );
    const sizesLink = page.getByRole("link", { name: "Review control sizes", exact: true });
    const disabledLink = page.getByRole("link", { name: "Unavailable export", exact: true });
    await expect(sizesLink).toHaveAttribute("href", "#consumer-sizes");
    await expect(disabledLink).toHaveAttribute("aria-disabled", "true");
    assert.equal(await disabledLink.evaluate((element) => element.tagName), "SPAN");
    await sizesLink.focus();
    await page.keyboard.press("Tab");
    await expect(page.getByTestId("size-default-button")).toBeFocused();
    const beforeNavigation = page.url();
    await disabledLink.scrollIntoViewIfNeeded();
    const disabledBounds = await disabledLink.boundingBox();
    assert.ok(disabledBounds);
    await page.mouse.click(
      disabledBounds.x + disabledBounds.width / 2,
      disabledBounds.y + disabledBounds.height / 2,
    );
    assert.equal(page.url(), beforeNavigation, "Disabled Link must not navigate");
    await sizesLink.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#consumer-sizes$/);
    await expect(page.locator("#consumer-sizes")).toBeFocused();
    await page.goBack();
    await expect(page).toHaveURL(beforeNavigation);
    await sizesLink.click();
    await expect(page).toHaveURL(/#consumer-sizes$/);
    await page.goBack();
    await expect(page).toHaveURL(beforeNavigation);
    const treatments = ["primary", "secondary", "ghost", "danger"];
    const appearances = [];
    for (const variant of treatments) {
      const button = page.getByTestId(`variant-${variant}`);
      await expect(button).toHaveAttribute("data-variant", variant);
      await expect(button).toHaveCSS("height", "44px");
      appearances.push(
        await button.evaluate((element) => {
          const css = getComputedStyle(element);
          return [css.color, css.backgroundColor, css.borderTopColor].join("|");
        }),
      );
    }
    assert.equal(new Set(appearances).size, treatments.length, "Four distinct Frame treatments");
    const choices = baseline.getByTestId("installed-choices");
    const choiceValues = choices.getByRole("status", { name: "Installed choice FormData" });
    const repeatedChannels = choices.getByRole("status", { name: "Installed repeated channels" });
    await choices.getByRole("button", { name: "Reset installed choices", exact: true }).click();
    await expect(choiceValues).toHaveText("");
    await expect(repeatedChannels).toHaveText("");
    const channels = choices.getByRole("group", { name: "Installed review channels", exact: true });
    const email = channels.getByRole("checkbox", { name: "Email updates", exact: true });
    const inApp = channels.getByRole("checkbox", { name: "In-app updates", exact: true });
    const audit = channels.getByRole("checkbox", { name: "Owner-managed audit record" });
    const archived = channels.getByRole("checkbox", { name: "Archived updates", exact: true });
    const mixed = choices.getByRole("checkbox", { name: "Mixed review snapshot", exact: true });
    const disabledMixed = choices.getByRole("checkbox", {
      name: "Unavailable mixed review snapshot",
      exact: true,
    });
    const delivery = choices.getByRole("radiogroup", { name: "Installed delivery", exact: true });
    const immediate = delivery.getByRole("radio", { name: "Immediate delivery", exact: true });
    const daily = delivery.getByRole("radio", { name: "Daily delivery", exact: true });
    const live = choices.getByRole("switch", { name: "Live review updates", exact: true });
    const liveLabel = live.locator("xpath=ancestor::label[1]");
    const managed = choices.getByRole("switch", { name: "Owner-managed live updates" });
    const archivedSwitch = choices.getByRole("switch", { name: "Archived live updates" });
    const choiceFocus = theme === "frame-light" ? "rgb(54, 92, 203)" : "rgb(169, 189, 255)";
    const choiceGray = theme === "frame-light" ? "rgb(127, 135, 149)" : "rgb(125, 132, 147)";
    for (const target of await choices
      .locator(".cinder-checkbox, .cinder-radio, .cinder-switch")
      .all()) {
      assert.equal(await target.evaluate((label) => label.tagName), "LABEL");
      assert.ok((await target.boundingBox())!.height >= 44, "Frame choice label target >=44px");
    }
    const checkboxMark = email
      .locator("xpath=ancestor::label[1]")
      .locator(".cinder-checkbox-control");
    await expect(checkboxMark).toHaveCSS("width", "18px");
    await expect(checkboxMark).toHaveCSS("height", "18px");
    await expect(checkboxMark).toHaveCSS("border-radius", "5px");
    await expect(checkboxMark).toHaveCSS("background-color", choiceFocus);
    for (const [input, paint] of [
      [mixed, choiceFocus],
      [disabledMixed, choiceGray],
    ] as const) {
      await expect(input).toHaveJSProperty("indeterminate", true);
      await expect(input).not.toBeChecked();
      const mark = input.locator("xpath=ancestor::label[1]").locator(".cinder-checkbox-control");
      await expect(mark).toHaveCSS("background-color", paint);
      await expect(mark).toHaveCSS("border-top-color", paint);
      await expect(mark.locator("svg")).toBeVisible();
    }
    await expect(mixed.locator("xpath=ancestor::label[1]")).toHaveAttribute("data-readonly");
    const radioMark = immediate
      .locator("xpath=ancestor::label[1]")
      .locator(".cinder-radio-control");
    await expect(radioMark).toHaveCSS("width", "18px");
    await expect(radioMark).toHaveCSS("height", "18px");
    assert.equal(
      await radioMark.evaluate((mark) => getComputedStyle(mark, "::after").backgroundColor),
      choiceFocus,
    );
    for (const input of [email, audit, archived, immediate, managed, archivedSwitch])
      await expect(input).toBeChecked();
    for (const input of [inApp, daily, live]) await expect(input).not.toBeChecked();
    for (const input of [archived, disabledMixed, archivedSwitch])
      await expect(input).toBeDisabled();
    for (const input of [audit, managed]) {
      const label = input.locator("xpath=ancestor::label[1]");
      await expect(input).toBeEnabled();
      await expect(label).toHaveAttribute("data-readonly");
      await expect(label).toHaveCSS("cursor", "default");
      await label.click();
      await expect(input).toBeChecked();
      await input.press("Space");
      await expect(input).toBeFocused();
      await expect(input).toBeChecked();
    }
    const invalid = choices.getByTestId("installed-invalid-checkbox");
    const invalidMark = invalid.locator(".cinder-checkbox-control");
    const errorInk = theme === "frame-light" ? "rgb(170, 39, 53)" : "rgb(255, 172, 179)";
    await expect(invalid.getByRole("checkbox")).toHaveAttribute("aria-invalid", "true");
    await expect(invalidMark).toHaveCSS("border-top-color", errorInk);
    await invalid.hover();
    await expect(invalid).toHaveAttribute("data-hovered");
    await expect(invalidMark).toHaveCSS("border-top-color", errorInk);
    const readChoices = choices.getByRole("button", {
      name: "Read installed choice values",
      exact: true,
    });
    await readChoices.click();
    await expect(repeatedChannels).toHaveText(JSON.stringify(["email", "audit"]));
    assert.deepEqual(JSON.parse((await choiceValues.textContent())!), [
      ["channels", "email"],
      ["channels", "audit"],
      ["delivery", "immediate"],
      ["managedUpdates", "enabled"],
    ]);
    await email.press("Space");
    await expect(email).not.toBeChecked();
    await channels.getByText("Email updates", { exact: true }).click();
    await expect(email).toBeChecked();
    await channels.getByText("In-app updates", { exact: true }).click();
    await expect(inApp).toBeChecked();
    await immediate.press("ArrowDown");
    await expect(daily).toBeChecked();
    await expect(immediate).not.toBeChecked();
    await delivery.getByText("Immediate delivery", { exact: true }).click();
    await expect(immediate).toBeChecked();
    await expect(daily).not.toBeChecked();
    await choices
      .getByRole("button", { name: "Focus installed live updates", exact: true })
      .click();
    await expect(live).toBeFocused();
    assert.deepEqual(
      JSON.parse(
        (await choices.getByRole("status", { name: "Installed switch refs" }).textContent())!,
      ),
      { root: "LABEL", input: "INPUT", contains: true },
    );
    await expect(live).toHaveAttribute("type", "checkbox");
    await expect(live).toHaveAttribute("name", "liveUpdates");
    await expect(live).toHaveAttribute("value", "enabled");
    await expect(liveLabel).toHaveAttribute("data-consumer-switch", "true");
    await expect(liveLabel).toHaveClass("cinder-switch consumer-switch-off");
    await expect(liveLabel).toHaveCSS("font-weight", "400");
    await expect(liveLabel).toContainText("(Off)");
    await expect(liveLabel.locator(".cinder-switch-thumb")).toHaveCSS("transform", "none");
    await liveLabel.click();
    await expect(live).toBeChecked();
    await expect(liveLabel).toHaveClass("cinder-switch consumer-switch-on");
    await expect(liveLabel).toHaveCSS("font-weight", "600");
    await expect(liveLabel).toContainText("(On)");
    await live.press("Space");
    await expect(live).not.toBeChecked();
    await expect(liveLabel).toHaveClass("cinder-switch consumer-switch-off");
    await expect(liveLabel).toHaveCSS("font-weight", "400");
    await live.press("Space");
    await expect(live).toBeChecked();
    for (const [direction, locale, sign] of [
      ["ltr", "english", 1],
      ["rtl", "persian", -1],
    ] as const) {
      await page.getByTestId(`use-${locale}`).click();
      for (const [input, size, width, height, thumbSize, travel] of [
        [live, "sm", 32, 16, 10, 16],
        [managed, "md", 48, 24, 18, 24],
      ] as const) {
        const label = input.locator("xpath=ancestor::label[1]");
        const track = label.locator(".cinder-switch-track");
        const thumb = label.locator(".cinder-switch-thumb");
        await expect(input).toBeChecked();
        await expect(label).toHaveAttribute("data-size", size);
        await expect(label).toHaveCSS("direction", direction);
        await expect(track).toHaveCSS("inline-size", `${width}px`);
        await expect(track).toHaveCSS("block-size", `${height}px`);
        await expect(track).toHaveCSS("background-color", choiceFocus);
        await expect(thumb).toHaveCSS("inline-size", `${thumbSize}px`);
        await expect(thumb).toHaveCSS("block-size", `${thumbSize}px`);
        await expect(thumb).toHaveCSS("transform", `matrix(1, 0, 0, 1, ${travel * sign}, 0)`);
      }
    }
    await page.getByTestId("use-english").click();
    await readChoices.click();
    await expect(repeatedChannels).toHaveText(JSON.stringify(["email", "inApp", "audit"]));
    assert.deepEqual(JSON.parse((await choiceValues.textContent())!), [
      ["channels", "email"],
      ["channels", "inApp"],
      ["channels", "audit"],
      ["delivery", "immediate"],
      ["liveUpdates", "enabled"],
      ["managedUpdates", "enabled"],
    ]);
    const carbon = page.getByTestId("nested-carbon");
    await expect(carbon).toHaveCSS("font-family", /IBM Plex Sans/);
    await expect(page.getByTestId("carbon-button")).toHaveCSS("height", "48px");
    await expect(page.getByTestId("carbon-button")).toHaveCSS("border-radius", "0px");
    await expect(
      carbon.getByRole("textbox", { name: "Carbon default field", exact: true }),
    ).toHaveCSS("height", "40px");
    await expect(
      carbon.getByRole("textbox", { name: "Carbon default field", exact: true }),
    ).toHaveCSS("font-size", "14px");
    await expect(carbon.locator(".cinder-field__label").first()).toHaveCSS("font-size", "12px");
    const nested = page.getByTestId("nested-frame");
    await expect(nested).toHaveCSS("font-family", /system-ui/);
    await expect(page.getByTestId("nested-frame-button")).toHaveCSS("height", "44px");
    await expect(nested.getByRole("textbox")).toHaveCSS("height", "44px");
    await expect(nested.getByRole("textbox")).toHaveCSS("font-size", "16px");

    for (const brand of brands) {
      const root = page.getByTestId(`${brand.kind}-brand`);
      const field = page.getByTestId(`${brand.kind}-default-field`);
      await expect(root).toHaveCSS("font-family", new RegExp(brand.font));
      await expect(field).toHaveCSS("row-gap", brand.gap);
      await expect(field).toHaveCSS("max-width", "480px");
      await expect(field.getByRole("textbox")).toHaveCSS("padding-left", brand.padding);
      await expect(field.getByRole("textbox")).toHaveCSS("border-radius", brand.radius);
      await expect(field.locator(".cinder-field__label.react-aria-Label")).toHaveText(
        `${brand.label} workspace`,
      );
      await expect(field.locator(".cinder-field__control.react-aria-Input")).toHaveCount(1);
      await expect(field.locator(".cinder-field__help.cinder-field-help")).toHaveCount(1);
      await expect(field.locator(".cinder-field__description")).toHaveText(
        "This name appears in invitations.",
      );
      const trigger = page.getByTestId(`${brand.kind}-open-dialog`);
      await expect(trigger).toHaveCSS("background-color", brand.color);
      await trigger.click();
      const dialog = page.getByRole("dialog", { name: `${brand.label} invitation`, exact: true });
      const overlay = page.locator(".cinder-modal-overlay");
      const modal = page.locator(".cinder-modal");
      await expect(dialog).toBeVisible();
      await expectPortal(
        overlay,
        theme,
        brand.kind === "module" ? "fr-CA" : "en-US",
        brand.appearance,
      );
      await expect(overlay).toHaveCSS("font-family", new RegExp(brand.font));
      await expect(overlay).toHaveCSS("padding-top", brand.surfacePadding);
      await expect(overlay).toHaveCSS("padding-left", "24px");
      await expect(modal).toHaveCSS("border-radius", brand.overlayRadius);
      await expect(modal).toHaveCSS("background-color", raised);
      await expect(modal).toHaveCSS("border-top-width", "2px");
      await expect(modal).toHaveCSS("border-top-color", brand.color);
      await expect(dialog).toHaveCSS("padding-top", brand.surfacePadding);
      assert.deepEqual(
        await overlay.evaluate((element: HTMLElement) => [
          element.style.paddingInline,
          element.style.maxWidth,
        ]),
        ["24px", ""],
      );
      assert.deepEqual(
        await modal.evaluate((element: HTMLElement) => [
          element.style.paddingInline,
          element.style.maxWidth,
        ]),
        ["", "34rem"],
      );
      await dialog.getByRole("button", { name: `Inspect ${brand.label} modal refs` }).click();
      assert.deepEqual(
        JSON.parse(
          (await dialog.getByRole("status", { name: `${brand.label} modal refs` }).textContent())!,
        ),
        { outer: true, inner: true, distinct: true, contains: true },
      );
      const select = page.getByTestId(`${brand.kind}-role`).getByRole("button");
      await expect(select).toHaveCSS("height", "44px");
      await expect(select.locator(".cinder-select__value.react-aria-SelectValue")).toHaveCount(1);
      await select.click();
      const popover = page.locator(".cinder-select-popover");
      await expectPortal(popover, theme, "en-US", brand.appearance);
      await expect(popover).toHaveCSS("font-family", new RegExp(brand.font));
      await expect(popover).toHaveCSS("border-radius", brand.popoverRadius);
      await expect(popover).toHaveCSS("background-color", raised);
      await expect(popover).toHaveCSS("border-top-width", "2px");
      await expect(popover).toHaveCSS("border-top-color", brand.color);
      await expect(popover.locator(".cinder-select__listbox.react-aria-ListBox")).toHaveCount(1);
      await expect(
        page.getByRole("option", { name: "Viewer", exact: true }),
      ).toHaveAccessibleDescription("Can read and comment");
      await expect(page.getByRole("option", { name: "Owner", exact: true })).toBeDisabled();
      await page.keyboard.press("End");
      const editor = page.getByRole("option", { name: "Editor", exact: true });
      await expect(editor).toBeFocused();
      await expect(editor).toHaveCSS("padding-left", brand.padding);
      await page.keyboard.press("Enter");
      await expect(select).toBeFocused();
      await expect(dialog.getByRole("status", { name: `${brand.label} selected role` })).toHaveText(
        "editor",
      );
      await select.click();
      await page.keyboard.press("Escape");
      await expect(popover).toBeHidden();
      await expect(dialog).toBeVisible();
      await expect(select).toBeFocused();
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(trigger).toBeFocused();
    }
  }

  const globalOverride = await page.addStyleTag({
    content:
      ":root { --cinder-font-sans: Georgia, serif; --cinder-size-md: 2.625rem; --cinder-body-01-font-size: 1rem; }",
  });
  const carbon = page.getByTestId("nested-carbon");
  await expect(carbon).toHaveCSS("font-family", /Georgia/);
  await expect(carbon).toHaveCSS("font-size", "16px");
  await expect(
    carbon.getByRole("textbox", { name: "Carbon default field", exact: true }),
  ).toHaveCSS("height", "42px");
  const frame = page.getByTestId("frame-baseline");
  await expect(frame).toHaveCSS("font-family", /system-ui/);
  await expect(frame).toHaveCSS("font-size", "14px");
  await expect(page.getByTestId("size-default-field").getByRole("textbox")).toHaveCSS(
    "height",
    "44px",
  );
  await globalOverride.evaluate((element) => element.parentNode?.removeChild(element));

  for (const brand of brands) {
    const input = page.getByRole("textbox", { name: `${brand.label} workspace`, exact: true });
    await input.fill(`${brand.label} studio`);
    await expect(page.getByRole("status", { name: `${brand.label} controlled value` })).toHaveText(
      `${brand.label} studio`,
    );
    await page.getByRole("button", { name: `Focus ${brand.label} workspace` }).click();
    await expect(input).toBeFocused();
    assert.deepEqual(
      JSON.parse(
        (await page.getByRole("status", { name: `${brand.label} field refs` }).textContent())!,
      ),
      { root: "DIV", input: "INPUT", contains: true },
    );
    const validate = page.getByRole("button", { name: `Validate ${brand.label} team` });
    await page.keyboard.press("Tab");
    await validate.focus();
    await expect(validate).toHaveAttribute("data-focus-visible");
    await expect(validate).toHaveCSS("outline-style", "dashed");
    await page.keyboard.press("Space");
    const field = page.getByTestId(`${brand.kind}-composed-field`);
    const composed = field.getByRole("textbox");
    await expect(composed).toBeFocused();
    await expect(field).toHaveAttribute("data-invalid");
    await expect(composed).toHaveAttribute("aria-invalid", "true");
    await expect(composed).toHaveAttribute("data-focused");
    await expect(composed).toHaveCSS("border-top-style", "dashed");
    await expect(composed).toHaveCSS("outline-style", "dashed");
    await expect(composed).toHaveCSS("outline-offset", "4px");
    await expect(composed).toHaveCSS("padding-left", brand.padding);
    assert.equal(
      await composed.evaluate((element: HTMLInputElement) => element.style.textAlign),
      "start",
    );
    await expect(composed).toHaveAccessibleDescription(/Use at least three characters/);
    await expect(composed).toHaveAccessibleDescription(/Enter at least 3 characters/);
    await expect(field.locator(".react-aria-Label")).toHaveCSS("font-weight", "700");
    await expect(field.locator(".react-aria-FieldError")).toHaveCSS("font-weight", "600");
    await composed.fill("Design team");
    await validate.click();
    await expect(composed).not.toHaveAttribute("aria-invalid", "true");
    await expect(page.getByRole("status", { name: `${brand.label} validated team` })).toHaveText(
      "Design team",
    );
  }

  // Host settings can change while focus remains inside a modal and its open Select.
  await page.getByTestId("use-frame-light").click();
  await page.getByTestId("plain-open-dialog").click();
  const select = page.getByTestId("plain-role").getByRole("button");
  await select.click();
  await page
    .getByTestId("use-frame-dark")
    .evaluate((element: HTMLButtonElement) => element.click());
  await page.getByTestId("use-persian").evaluate((element: HTMLButtonElement) => element.click());
  const overlay = page.locator(".cinder-modal-overlay");
  const popover = page.locator(".cinder-select-popover");
  for (const portal of [overlay, popover])
    await expectPortal(portal, "frame-dark", "fa-IR", "plain-appearance", "rtl");
  await expect(page.locator(".cinder-modal")).toHaveCSS("background-color", "rgb(44, 47, 56)");
  await expect(popover).toHaveCSS("background-color", "rgb(44, 47, 56)");
  await page
    .getByTestId("replace-recipe")
    .evaluate((element: HTMLButtonElement) => element.click());
  for (const portal of [overlay, popover]) {
    await expectPortal(portal, "frame-dark", "fa-IR", moduleAppearance, "rtl");
    await expect(portal).toHaveCSS("font-family", /Trebuchet MS/);
  }
  await page.getByTestId("clear-recipe").evaluate((element: HTMLButtonElement) => element.click());
  for (const portal of [overlay, popover]) {
    await expectPortal(portal, "frame-dark", "fa-IR", "", "rtl");
    await expect(portal).toHaveCSS("font-family", /system-ui/);
  }
  await page
    .getByTestId("inherit-recipe")
    .evaluate((element: HTMLButtonElement) => element.click());
  for (const portal of [overlay, popover])
    await expectPortal(portal, "frame-dark", "fa-IR", "plain-appearance", "rtl");
  await expect(page.getByRole("option", { name: "Editor", exact: true })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(select).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("plain-open-dialog")).toBeFocused();
  await expect(page.getByTestId("module-brand")).toHaveCSS("font-family", /Trebuchet MS/);

  const raw = await page.getByTestId("raw-small").evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      height: style.height,
      controlHeight: style.getPropertyValue("--control-height"),
      notificationBackground: style.getPropertyValue("--notification-bg"),
    };
  });
  assert.equal(
    raw.controlHeight,
    "",
    "data-size on an unrelated RAC control must not receive Cinder sizes",
  );
  assert.equal(
    raw.notificationBackground,
    "",
    "data-kind on an unrelated RAC control must not receive Cinder notification colors",
  );
  await expect(page.getByTestId("raw-default")).toHaveCSS("height", raw.height);
  const rawList = page.getByRole("listbox", { name: "Host choices" });
  await expect(rawList).toHaveCSS("padding", "0px");
  await expect(rawList.getByRole("option").first()).toHaveCSS("padding", "0px");
  await expect(rawList.getByRole("option").first()).toHaveCSS(
    "background-color",
    "rgba(0, 0, 0, 0)",
  );
  const utility = page.getByTestId("utility-action");
  await expect(utility).toHaveCSS("height", "44px");
  await expect(utility).toHaveCSS("border-radius", integration === "tailwind" ? "0px" : "10px");
  if (integration === "tailwind") {
    await expect(utility).toHaveCSS("padding-left", "24px");
    await expect(page.locator("body")).toHaveCSS("margin", "0px");
    await expect(page.getByTestId("preflight-heading")).toHaveCSS("font-size", "18px");
    await expect(page.getByTestId("preflight-heading")).toHaveCSS("font-weight", "400");
    await expect(page.getByTestId("preflight-heading")).toHaveCSS("margin", "0px");
  }
  await page.getByRole("button", { name: "Reset installed choices", exact: true }).click();
  await page.emulateMedia({ forcedColors: "active" });
  const system = await page.getByTestId("frame-baseline").evaluate((root) =>
    Object.fromEntries(
      ["ButtonFace", "ButtonText", "Highlight", "GrayText"].map((name) => {
        const probe = document.createElement("span");
        probe.style.cssText = `color: ${name}; forced-color-adjust: none`;
        root.append(probe);
        const color = getComputedStyle(probe).color;
        probe.remove();
        return [name, color];
      }),
    ),
  );
  const button = page.getByTestId("size-default-button");
  await page.keyboard.press("Tab");
  await button.focus();
  await expect(button).toHaveAttribute("data-focus-visible");
  await expect(button).toHaveCSS("background-color", system.ButtonFace!);
  await expect(button).toHaveCSS("color", system.ButtonText!);
  await expect(button).toHaveCSS("outline-color", system.Highlight!);
  const disabledMixedMark = page
    .getByRole("checkbox", { name: "Unavailable mixed review snapshot", exact: true })
    .locator("xpath=ancestor::label[1]")
    .locator(".cinder-checkbox-control");
  await expect(disabledMixedMark).toHaveCSS("background-color", system.ButtonFace!);
  await expect(disabledMixedMark).toHaveCSS("border-top-color", system.GrayText!);
  await expect(disabledMixedMark).toHaveCSS("color", system.GrayText!);
  await page.emulateMedia({ forcedColors: "none" });
}

try {
  const dependencies: Record<string, string> = {};
  for (const archive of archives) {
    const path = join(root, "dist/packages", archive.filename);
    const hash = new Bun.CryptoHasher("sha256")
      .update(await Bun.file(path).arrayBuffer())
      .digest("hex");
    assert.equal(hash, archive.sha256, `Archive changed after packing: ${archive.filename}`);
    dependencies[archive.name] = `file:${path}`;
  }
  for (const name of ["react", "react-dom", "react-aria-components", "@internationalized/date"])
    dependencies[name] = catalog[name];
  for (const name of ["@fontsource/ibm-plex-sans", "@fontsource/ibm-plex-mono"])
    dependencies[name] = docs.dependencies[name];
  for (const consumer of consumers) {
    await cp(join(root, "tests/fixtures/consumer"), consumer.directory, { recursive: true });
    if (
      consumer.name === "native" &&
      !(await Bun.file(join(consumer.directory, "composition.html")).exists())
    ) {
      await Bun.write(
        join(consumer.directory, "composition.html"),
        `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Compound native package consumer</title>
    <script type="module" src="./composition-native.tsx"></script>
  </head>
  <body><div id="root"></div></body>
</html>\n`,
      );
      const entry = join(consumer.directory, "composition-native.tsx");
      if (!(await Bun.file(entry).exists()))
        await Bun.write(
          entry,
          `import { createRoot } from "react-dom/client";
import { CompositionConsumer } from "./composition";
import "@hashti/react/styles.css";

const theme: "frame-light" | "frame-dark" =
  new URLSearchParams(location.search).get("theme") === "frame-dark" ? "frame-dark" : "frame-light";
createRoot(document.getElementById("root")!).render(<CompositionConsumer theme={theme} />);\n`,
        );
    }
    await Bun.write(
      join(consumer.directory, "package.json"),
      JSON.stringify(
        {
          name: `cinder-external-${consumer.name}-consumer`,
          private: true,
          type: "module",
          scripts: { typecheck: "tsc --noEmit" },
          dependencies,
          devDependencies: {
            typescript: workspace.devDependencies.typescript,
            "@types/react": catalog["@types/react"],
            "@types/react-dom": catalog["@types/react-dom"],
            ...(consumer.name === "tailwind"
              ? { tailwindcss: tailwindVersion, "@tailwindcss/cli": tailwindVersion }
              : {}),
          },
        },
        null,
        2,
      ),
    );
    await run(consumer.directory, process.execPath, "install");
  }
  // No source aliases, symlinked Cinder workspaces, or ancestor node_modules.
  const manifestChecks = [];
  for (const consumer of consumers) {
    for (const archive of archives) {
      const installed = await realpath(join(consumer.directory, "node_modules", archive.name));
      assert.ok(
        installed.startsWith(`${consumer.directory}${sep}`),
        "Cinder must be installed inside the fixture",
      );
      const manifest = await Bun.file(join(installed, "package.json")).json();
      assert.equal(manifest.version, archive.version);
      assert.doesNotMatch(JSON.stringify(manifest), /workspace:|catalog:/);
      for (const file of ["README.md", "LICENSE", "NOTICE", "dist/index.js", "dist/index.d.ts"])
        assert.ok(
          await Bun.file(join(installed, file)).exists(),
          `Missing ${archive.name}/${file}`,
        );
      assert.match(await Bun.file(join(installed, "NOTICE")).text(), /Copyright 2015 IBM Corp\./);
      if (archive.name === "@hashti/react") {
        assert.equal(manifest.peerDependencies["@hashti/tokens"], "0.1.0");
        assert.equal(
          manifest.dependencies["@internationalized/date"],
          catalog["@internationalized/date"],
        );
        const css = await Bun.file(join(installed, "dist/styles.css")).text();
        assert.match(css, /--cinder-background/);
        assert.match(
          css,
          /@layer\s+cinder\.tokens\s*,\s*cinder\.reset\s*,\s*cinder\.components\s*,\s*cinder\.themes\s*,\s*cinder\.accessibility\s*;/,
        );
        assert.match(await Bun.file(join(installed, "dist/index.js")).text(), /^"use client";/);
      }
      if (archive.name === "@hashti/tokens") {
        const css = await Bun.file(
          Bun.resolveSync("@hashti/tokens/tokens.css", consumer.directory),
        ).text();
        assert.match(css, /frame-light/);
        assert.match(css, /frame-dark/);
      }
      manifestChecks.push({
        consumer: consumer.name,
        name: archive.name,
        version: manifest.version,
        filename: archive.filename,
        sha256: archive.sha256,
        protocolsResolved: true,
      });
    }
    // *.tsx includes compound positive/negative proofs; skipLibCheck=false resolves the declarations.
    await run(consumer.directory, process.execPath, "run", "typecheck");
  }
  for (const name of ["tailwindcss", "@tailwindcss/cli"])
    assert.equal(
      (await Bun.file(join(tailwindDirectory, "node_modules", name, "package.json")).json())
        .version,
      tailwindVersion,
    );
  await run(
    tailwindDirectory,
    process.execPath,
    "run",
    "--bun",
    "tailwindcss",
    "--input",
    "tailwind.css",
    "--output",
    "tailwind.generated.css",
    "--minify",
  );
  const tailwindCSS = await Bun.file(join(tailwindDirectory, "tailwind.generated.css")).text();
  // Tailwind folds layer statements into ordered blocks; the browser checks their precedence.
  assert.ok(/\.rounded-none\b/.test(tailwindCSS), "Tailwind must emit the corner utility");
  assert.ok(/\.px-6\b/.test(tailwindCSS), "Tailwind must emit the padding utility");
  const dist = join(directory, "dist");
  const routes: Record<string, Response> = {};
  for (const consumer of consumers) {
    const build = await Bun.build({
      entrypoints: consumer.entrypoints.map((entry) => join(consumer.directory, entry)),
      // Use the isolated consumer config, never the workspace's source aliases.
      tsconfig: join(consumer.directory, "tsconfig.json"),
      outdir: dist,
      target: "browser",
      minify: true,
      publicPath: "/",
      env: "disable",
      define: { "process.env.NODE_ENV": JSON.stringify("production") },
    });
    assert.ok(build.success, build.logs.map(String).join("\n"));
    for (const output of build.outputs) {
      const path = `/${relative(dist, output.path)}`;
      const response = new Response(output, { headers: { "Content-Type": output.type } });
      routes[path] = response;
      if (path === "/index.html") routes["/"] = response;
    }
  }
  server = Bun.serve({
    port: 0,
    hostname: "127.0.0.1",
    development: false,
    routes,
  });
  browser = await chromium.launch({
    channel: process.env.PLAYWRIGHT_CHANNEL ?? "chrome",
    headless: true,
  });
  const page = await browser.newPage({ reducedMotion: "reduce" });
  const errors: string[] = [];
  const failedAssets: string[] = [];
  const fonts: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("requestfailed", (request) => failedAssets.push(request.url()));
  page.on("response", (response) => {
    if (response.status() >= 400) failedAssets.push(`${response.status()} ${response.url()}`);
    if (response.url().endsWith(".woff2") && response.ok()) fonts.push(response.url());
  });
  await page.goto(String(server.url));
  await expect(page.getByRole("heading", { name: "Installed from tarballs" })).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("[data-cinder-theme]").first()).toHaveCSS(
    "background-color",
    "rgb(38, 38, 38)",
  );
  await page.getByRole("button", { name: "Focus counter" }).click();
  const counter = page.getByRole("button", { name: "Activate counter" });
  await expect(counter).toBeFocused();
  await page.keyboard.press("Space");
  await expect(counter).toHaveText("Count: 1");
  await page.getByRole("button", { name: "Save profile" }).click();
  await expect(page.getByRole("textbox", { name: "Email" })).toBeFocused();
  await page.getByRole("textbox", { name: "Email" }).fill("cinder@example.com");
  await page.getByRole("button", { name: "Region" }).click();
  await page.getByRole("option", { name: "United States" }).click();
  await expect(page.getByRole("status", { name: "Selected region" })).toHaveText("us");
  await page.getByRole("button", { name: "Save profile" }).click();
  await expect(page.getByRole("status", { name: "Saved profile" })).toHaveText(
    "cinder@example.com",
  );
  await page.getByRole("button", { name: "Open details" }).click();
  await expect(page.getByRole("dialog", { name: "Package details" })).toBeVisible();
  await expect(page.locator(".cinder-modal-overlay")).toHaveAttribute("data-cinder-theme", "g90");
  await expect(page.locator(".cinder-modal-overlay")).toHaveAttribute("data-cinder-layer", "1");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open details" })).toBeFocused();
  await expect(page.getByLabel("Token exports", { exact: true })).toContainText(
    '"json": "#262626"',
  );
  const exportedTokens = JSON.parse(
    (await page.getByLabel("Token exports", { exact: true }).textContent())!,
  );
  assert.deepEqual(exportedTokens.typeStyle, exportedTokens.jsonTypeStyle);
  assert.equal(exportedTokens.typeStyle.fontSize, "2rem");
  assert.equal(exportedTokens.typeStyle.breakpoints.md.fontSize, "2.25rem");
  assert.equal(exportedTokens.typeStyle.breakpoints.md.fontWeight, 300);
  assert.equal(Object.hasOwn(exportedTokens.typeStyle.breakpoints.lg, "fontWeight"), false);
  assert.equal(exportedTokens.cssRadius, "var(--cinder-control-radius)");
  assert.equal(exportedTokens.relayRadius, "0.5rem");
  assert.equal(exportedTokens.jsonRelayRadius, exportedTokens.relayRadius);
  for (const [theme, label, background] of [
    ["relay-light", "Relay light", "rgb(245, 245, 245)"],
    ["relay-dark", "Relay dark", "rgb(21, 21, 21)"],
  ] as const) {
    await page.getByRole("button", { name: `Use ${label}` }).click();
    await expect(page.locator(".cinder-theme").first()).toHaveAttribute("data-cinder-theme", theme);
    await expect(page.locator(".cinder-theme").first()).toHaveCSS("background-color", background);
    await expect(counter).toHaveCSS("border-radius", "8px");
    await expect(counter).toHaveCSS("font-weight", "500");
    await expect(page.getByRole("textbox", { name: "Email (required)", exact: true })).toHaveCSS(
      "border-radius",
      "8px",
    );
    const pending = page.getByRole("button", { name: "Save draft", exact: true });
    await expect(pending).toHaveAttribute("aria-disabled", "true");
    await expect(pending.getByRole("progressbar", { name: "Saving" })).toBeVisible();
    await page.getByRole("button", { name: "Open details" }).click();
    await expect(page.locator(".cinder-modal-overlay")).toHaveAttribute("data-cinder-theme", theme);
    await expect(page.locator(".cinder-modal")).toHaveCSS("border-radius", "20px");
    await page.getByRole("button", { name: "Viewer Review role", exact: true }).click();
    await expect(page.locator(".cinder-select-popover")).toHaveAttribute(
      "data-cinder-theme",
      theme,
    );
    await expect(page.locator(".cinder-select-popover")).toHaveAttribute("data-cinder-layer", "1");
    await expect(page.locator(".cinder-select-popover")).toHaveCSS("border-radius", "12px");
    await page.getByRole("option", { name: "Editor", exact: true }).click();
    await expect(
      page.getByRole("button", { name: "Editor Review role", exact: true }),
    ).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Open details" })).toBeFocused();
  }
  // Bun may inline font files into a CSS data URL for a TSX stylesheet import.
  // Verify decoded FontFace entries rather than requiring separate HTTP requests.
  const fontFaces = await page.evaluate(() =>
    [...document.fonts].map((font) => ({
      family: font.family,
      status: font.status,
    })),
  );
  for (const family of ["IBM Plex Sans", "IBM Plex Mono"])
    assert.ok(fontFaces.some((font) => font.family === family && font.status === "loaded"));
  assert.equal(await page.evaluate(() => document.fonts.check('16px "IBM Plex Sans"')), true);
  assert.equal(await page.evaluate(() => document.fonts.check('16px "IBM Plex Mono"')), true);
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const consumer of consumers) await verifyFrameConsumer(page, server.url, consumer.name);
  await verifyCompositionConsumer(page, server.url);
  await verifyStatusConsumer(page, server.url);
  assert.deepEqual(failedAssets, []);
  assert.deepEqual(errors, []);
  await Bun.write(
    join(results, "package-consumer.json"),
    `${JSON.stringify(
      {
        passed: true,
        runtime: Bun.version,
        at: new Date().toISOString(),
        packages: manifestChecks,
        declarationCheck: "strict; skipLibCheck=false; no paths aliases",
        checks: [
          "archive hashes",
          "resolved package protocols",
          "license files",
          "strict compound positive/negative RAC props, refs, raw exports, and generic declarations",
          "ESM imports",
          "CSS and JSON exports",
          "structured type styles and sparse breakpoint metadata",
          "theme and portalled layer",
          "Relay light/dark geometry, tokens, pending state, and nested Select portal",
          "Frame public JS/JSON/CSS tokens and default/explicit sizes in light and dark",
          "Frame Link native pointer/Enter navigation, disabled blocking, and tab order",
          "installed Frame light/dark choices in native CSS and Tailwind: label targets, checkbox/radio marks, mixed/disabled paint, standalone invalid hover, and sm/md logical Switch geometry",
          "installed choice native keyboard/label pointer, read-only immutability, repeated CheckboxGroup FormData, single radio/Switch values, disabled omission, and reset independence",
          "installed Switch actual label/input refs, containment, native label rendering, and retained base/custom class/style/children callbacks",
          "nested Frame/Carbon sizing and font boundaries with document-level legacy overrides",
          "plain CSS and compiled CSS Modules root, part, state, and detached portal overrides",
          "controlled native input and wrapper refs, uncontrolled custom field validation",
          "installed compound twelve namespace root/part trees and portal appearance in Frame light/dark",
          "compound actual text root/leaf and representative part/live popup refs, render callbacks, and explicit/null slots",
          "compound native text/group required focus order, error association, and corrected FormData submission",
          "compound controlled/uncontrolled text, raw NumberField values, and Search clear/Escape",
          "compound Select/ComboBox/date API smoke only; not later-family complete",
          "installed Frame light/dark status: all twelve appearance-only fields and FormData, validation precedence, composed mount/refs/native identity, and isolated label help",
          "Modal outer/inner class, style, and ref targets",
          "rich Select collection types, descriptions, disabled options, and focus return",
          "live portal theme, locale, and inherited/replaced/cleared appearance",
          "explicit overlay language and exclusion of ordinary root class/style/id",
          "unrelated raw RAC ListBox and data-size/data-kind isolation",
          "pinned Tailwind CLI, genuine preflight, utilities, and cascade layer order",
          "Frame forced-color action/focus precedence and disabled mixed choice GrayText",
          "refs and render props",
          "keyboard state",
          "form validation and submission",
          "selection",
          "Plex fonts",
          "no browser errors",
        ],
        requestedFontAssets: fonts.length,
        loadedFontFaces: fontFaces,
        integrations: {
          native: ["index.html", "frame.html", "composition.html", "status.html"],
          tailwind: { version: tailwindVersion, entrypoint: "tailwind.html" },
        },
      },
      null,
      2,
    )}\n`,
  );
  passed = true;
  console.log(
    "External package consumers passed · strict compound declarations, installed Frame light/dark choice values/marks/Switch refs and geometry, field/form journeys, collection/date API smoke, legacy/Frame, CSS Modules, and pinned Tailwind",
  );
  console.log(
    "Installed field status passed · Frame light/dark, 12 appearance-only fields and FormData, validation precedence, composed refs/native identity, and isolated label help",
  );
} finally {
  await browser?.close();
  server?.stop(true);
  if (passed && process.env.CINDER_KEEP_TEST_APP !== "1") {
    await Promise.all(
      consumers.map((consumer) => rm(consumer.directory, { recursive: true, force: true })),
    );
  } else if (passed) {
    console.log(`Installed consumer app retained: ${directory}`);
    console.log(`Tailwind consumer retained: ${tailwindDirectory}`);
    console.log(
      `Serve built output for review: ${join(directory, "dist")} (index.html, frame.html, composition.html, status.html, tailwind.html)`,
    );
  } else {
    console.error(`Consumer fixtures retained for diagnosis: ${directory}, ${tailwindDirectory}`);
  }
}
