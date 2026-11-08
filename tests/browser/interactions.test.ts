import { afterAll, afterEach, beforeAll, beforeEach, test } from "bun:test";
import { mkdir, mkdtemp, rm } from "node:fs/promises";
import { resolve } from "node:path";
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
  context = await browser.newContext({
    baseURL: String(server.url),
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

async function example(slug: string) {
  await page.goto(`/components/${slug}?theme=g100`);
  await expect(page.locator(".example-canvas")).toBeVisible();
  return page.locator(".example-canvas");
}

async function audit(selector: string) {
  const result = await new AxeBuilder({ page })
    .include(selector)
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(
    result.violations.map(({ id, nodes }) => ({
      id,
      nodes: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })),
    })),
  ).toEqual([]);
}

test("buttons activate from the keyboard and disabled/pending actions block duplicate presses", async () => {
  const canvas = await example("button");
  const create = canvas.getByRole("button", { name: "Create workspace" });
  await create.focus();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Space");
  await expect(canvas.getByRole("status")).toHaveText("2 button presses recorded.");
  await expect(canvas.getByRole("button", { name: "Unavailable" })).toBeDisabled();
  const pending = canvas.getByRole("button", { name: "Saving" });
  await pending.focus();
  await page.keyboard.press("Enter");
  await expect(pending).toBeFocused();
  await expect(canvas.getByRole("status")).toHaveText("2 button presses recorded.");
});

test("checkboxes, radios, switches, and segmented views retain keyboard selection", async () => {
  let canvas = await example("checkbox");
  await canvas.getByRole("checkbox", { name: "Tips and tutorials" }).focus();
  await page.keyboard.press("Space");
  await expect(canvas.getByRole("status")).toHaveText("2 preferences selected");
  await expect(canvas.getByRole("checkbox", { name: "Some items selected" })).toBeChecked({
    indeterminate: true,
  });

  canvas = await example("radio-button");
  await canvas.getByRole("radio", { name: "Private — only you" }).focus();
  await page.keyboard.press("ArrowDown");
  await expect(canvas.getByRole("radio", { name: "Team — invited members" })).toBeChecked();
  await expect(canvas.getByRole("radio", { name: "Private — only you" })).not.toBeChecked();

  canvas = await example("toggle");
  await canvas.getByRole("switch", { name: "Email notifications" }).focus();
  await page.keyboard.press("Space");
  await expect(canvas.getByRole("status")).toHaveText("Email notifications are off.");

  canvas = await example("content-switcher");
  await canvas.getByRole("radio", { name: "List", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(canvas.getByRole("radio", { name: "Grid", exact: true })).toBeFocused();
  await page.keyboard.press("Space");
  await expect(canvas.getByRole("radio", { name: "Grid", exact: true })).toBeChecked();
  await expect(canvas.locator(".view-grid")).toBeVisible();
});

test("search filters real results, presents an empty state, and Escape clears", async () => {
  const canvas = await example("search");
  const input = canvas.getByRole("searchbox", { name: "Search the collection" });
  await input.fill("box");
  await expect(canvas.locator(".search-example-results")).toHaveText("CheckboxCombo box");
  await input.fill("not-present");
  await expect(canvas.getByText("No components match this query.")).toBeVisible();
  await input.press("Escape");
  await expect(input).toHaveValue("");
  await expect(canvas.locator(".search-example-results > div")).toHaveCount(7);
});

test("native validation connects errors, focuses the invalid field, and submits named values", async () => {
  const canvas = await example("form");
  const name = canvas.getByRole("textbox", { name: "Name (required)", exact: true });
  const email = canvas.getByRole("textbox", { name: "Email (required)", exact: true });
  await canvas.getByRole("button", { name: "Save profile" }).click();
  await expect(name).toBeFocused();
  await expect(name).toHaveAttribute("aria-invalid", "true");
  await expect(name).toHaveAccessibleDescription(/fill out this field/i);
  await audit(".example-canvas");
  await name.fill("Ada");
  await email.fill("ada@invalid");
  await email.fill("ada@example.com");
  await canvas.getByRole("button", { name: "Save profile" }).click();
  await expect(canvas.getByRole("status")).toContainText("Profile saved locally");
  await expect(canvas.getByRole("status")).toContainText("ada@example.com");
});

test("single and multiple selects preserve controlled values, typeahead, and focus return", async () => {
  let canvas = await example("dropdown");
  const trigger = canvas.getByRole("button", { name: "Preview Environment", exact: true });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("listbox")).toBeVisible();
  await audit(".cinder-popover");
  await page.keyboard.press("End");
  await page.keyboard.press("Enter");
  await expect(canvas.getByRole("status")).toHaveText("Selected: production");
  await expect(
    canvas.getByRole("button", { name: "Production Environment", exact: true }),
  ).toBeFocused();

  canvas = await example("multi-select");
  await canvas.getByRole("button", { name: "Preview Environments", exact: true }).click();
  await page.getByRole("option", { name: "Development", exact: true }).click();
  await expect(page.getByRole("option", { name: "Development", exact: true })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.getByRole("option", { name: "Preview", exact: true })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.getByRole("option", { name: "Archived", exact: true })).toBeDisabled();
  await page.keyboard.press("Escape");
  await expect(canvas.getByRole("status")).toHaveText("Selected: preview, development");
});

test("combobox filters, selects with the keyboard, and does not accept an unknown value", async () => {
  const canvas = await example("combo-box");
  const input = canvas.getByRole("combobox", { name: "Framework" });
  await input.fill("rea");
  await expect(page.getByRole("option")).toHaveCount(1);
  await expect(page.getByRole("option", { name: "React", exact: true })).toBeVisible();
  await input.press("ArrowDown");
  await input.press("Enter");
  await expect(input).toHaveValue("React");
  await expect(canvas.getByRole("status")).toHaveText("Selected: react");
  await input.fill("unknown framework");
  await input.press("Tab");
  await expect(input).toHaveValue("React");
});

test("number fields and slider ranges enforce their bounds from the keyboard", async () => {
  let canvas = await example("number-input");
  const seats = canvas.getByRole("textbox", { name: "Team seats" });
  await seats.focus();
  await seats.press("ArrowUp");
  await expect(seats).toHaveValue("9");
  await seats.press("End");
  await expect(seats).toHaveValue("100");
  await seats.press("ArrowUp");
  await expect(seats).toHaveValue("100");

  canvas = await example("slider");
  const capacity = canvas.getByRole("slider", { name: "Capacity", exact: true });
  await capacity.focus();
  await capacity.press("Home");
  await expect(capacity).toHaveValue("0");
  await capacity.press("End");
  await expect(capacity).toHaveValue("100");
  const minimum = canvas.getByRole("slider", { name: "Minimum capacity" });
  await minimum.focus();
  await minimum.press("End");
  await expect(minimum).toHaveValue("75");
});

test("tabs skip disabled items and disclosures expose their expanded state", async () => {
  let canvas = await example("tabs");
  await canvas.getByRole("tab", { name: "Overview" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(canvas.getByRole("tabpanel", { name: "Members" })).toBeVisible();
  await page.keyboard.press("End");
  await expect(canvas.getByRole("tab", { name: "Settings", exact: true })).toBeFocused();
  await expect(canvas.getByRole("tabpanel", { name: "Settings" })).toBeVisible();

  canvas = await example("accordion");
  const trigger = canvas.getByRole("button", { name: "Accessible interaction" });
  await trigger.focus();
  await trigger.press("Space");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(
    canvas.getByText("RAC supplies keyboard, pointer, touch, and assistive-technology behavior.", {
      exact: false,
    }),
  ).toBeVisible();
  await trigger.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("the table filters, sorts, selects, paginates, and reports an empty collection", async () => {
  const canvas = await example("data-table");
  const table = canvas.getByRole("grid", { name: "Workspaces" });
  await expect(table.getByRole("rowheader")).toHaveText(["Atlas", "Fieldnotes", "Meridian"]);
  await canvas.getByRole("button", { name: "Next page" }).click();
  await expect(table.getByRole("rowheader")).toHaveText(["Sandbox", "Studio", "Workshop"]);
  await expect(canvas.getByRole("button", { name: "Next page" })).toBeDisabled();
  await canvas.getByRole("searchbox", { name: "Search workspaces" }).fill("design");
  await expect(table.getByRole("rowheader")).toHaveText(["Atlas", "Studio"]);
  await expect(canvas.getByRole("navigation", { name: "Pagination" })).toContainText(
    "1–2 of 2 items",
  );
  await table.getByRole("columnheader", { name: "Members", exact: true }).click();
  await expect(table.getByRole("rowheader")).toHaveText(["Studio", "Atlas"]);
  const atlasSelection = table.getByRole("checkbox", { name: "Select Atlas", exact: true });
  await atlasSelection.focus();
  await atlasSelection.press("Space");
  await expect(canvas.getByText("1 selected", { exact: true })).toBeVisible();
  await canvas.getByRole("button", { name: "Clear selection" }).click();
  await expect(
    table.getByRole("checkbox", { name: "Select Atlas", exact: true }),
  ).not.toBeChecked();
  await canvas.getByRole("searchbox", { name: "Search workspaces" }).fill("missing workspace");
  await expect(table).toContainText("No workspaces match your search.");
  await expect(canvas.getByRole("navigation", { name: "Pagination" })).toContainText(
    "0–0 of 0 items",
  );
  await expect(canvas.getByRole("button", { name: "Previous page" })).toBeDisabled();
});

test("calendar selection, range endpoints, and time segments update their actual values", async () => {
  let canvas = await example("date-picker");
  const trigger = canvas.getByRole("button", { name: "Calendar Start date", exact: true });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Choose a date", exact: true });
  await expect(dialog).toBeVisible();
  await audit(".cinder-date-popover");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Enter");
  await expect(dialog).toBeHidden();
  await expect(
    canvas.getByRole("spinbutton", { name: "day, Start date", exact: true }),
  ).toHaveAttribute("aria-valuenow", "17");

  canvas = await example("date-range-picker");
  await canvas.getByRole("button", { name: "Calendar Reporting period" }).click();
  await audit(".cinder-date-popover");
  const range = page.getByRole("dialog", { name: "Choose a date range" });
  await range.getByRole("button", { name: /Tuesday, November 10, 2026/ }).click();
  await range.getByRole("button", { name: /Friday, November 20, 2026/ }).click();
  await expect(
    canvas.getByRole("spinbutton", { name: "day, Start Date, Reporting period", exact: true }),
  ).toHaveAttribute("aria-valuenow", "10");
  await expect(
    canvas.getByRole("spinbutton", { name: "day, End Date, Reporting period", exact: true }),
  ).toHaveAttribute("aria-valuenow", "20");

  canvas = await example("time-picker");
  const hour = canvas.getByRole("spinbutton", { name: "hour, 24-hour time", exact: true });
  await hour.focus();
  await hour.press("ArrowUp");
  await expect(hour).toHaveAttribute("aria-valuenow", "18");
});

test("file selection validates mixed batches and removal changes the displayed files", async () => {
  const canvas = await example("file-uploader");
  const input = canvas.locator('input[type="file"]');
  await input.setInputFiles([
    { name: "notes.txt", mimeType: "text/plain", buffer: Buffer.from("Local notes") },
    { name: "program.exe", mimeType: "application/octet-stream", buffer: Buffer.from("rejected") },
  ]);
  await expect(canvas.getByRole("listitem")).toHaveCount(1);
  await expect(canvas.getByRole("listitem")).toContainText("notes.txt");
  await expect(canvas.getByRole("alert")).toHaveText("program.exe is not an accepted file type.");
  await input.setInputFiles({
    name: "large.txt",
    mimeType: "text/plain",
    buffer: Buffer.alloc(2 * 1024 * 1024 + 1),
  });
  await expect(canvas.getByRole("alert")).toHaveText("large.txt exceeds the size limit.");
  await expect(canvas.getByRole("listitem")).toHaveCount(1);
  await canvas.getByRole("button", { name: "Remove notes.txt" }).click();
  await expect(canvas.getByRole("listitem")).toHaveCount(0);
});

test("file drops share validation with the chooser and preserve accepted files", async () => {
  const canvas = await example("file-uploader");
  const results = resolve(import.meta.dir, "../../test-results");
  await mkdir(results, { recursive: true });
  const directory = await mkdtemp(`${results}/drop-`);
  const session = await context.newCDPSession(page);
  try {
    const files = [`${directory}/dropped.txt`, `${directory}/dropped.exe`];
    await Promise.all(files.map((file) => Bun.write(file, "Dropped file")));
    const target = canvas.locator(".react-aria-DropZone");
    await target.scrollIntoViewIfNeeded();
    const box = (await target.boundingBox())!;
    // Native file entries matter: JS-created DataTransfer items have no
    // FileSystemEntry in Chromium, so RAC correctly ignores those empty entries.
    const payload = {
      x: box.x + box.width / 2,
      y: box.y + box.height / 2,
      data: { items: [], files, dragOperationsMask: 1 },
    };
    await session.send("Input.dispatchDragEvent", { type: "dragEnter", ...payload });
    await session.send("Input.dispatchDragEvent", { type: "dragOver", ...payload });
    await session.send("Input.dispatchDragEvent", { type: "drop", ...payload });
    await expect(canvas.getByRole("listitem")).toHaveCount(1);
    await expect(canvas.getByRole("listitem")).toContainText("dropped.txt");
    await expect(canvas.getByRole("alert")).toHaveText("dropped.exe is not an accepted file type.");
    await canvas.locator('input[type="file"]').setInputFiles({
      name: "chosen.txt",
      mimeType: "text/plain",
      buffer: Buffer.from("Chosen notes"),
    });
    await expect(canvas.getByRole("listitem")).toHaveCount(2);
    await expect(canvas.getByRole("alert")).toHaveCount(0);
  } finally {
    await session.detach();
    await rm(directory, { recursive: true, force: true });
  }
});

test("code copying writes the exact source and reports permission failures", async () => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  const canvas = await example("code-snippet");
  const source = await canvas.locator("code").innerText();
  const copy = canvas.getByRole("button", { name: "Copy component example" });
  await copy.click();
  await expect(canvas.getByRole("status")).toHaveText("Copied to clipboard");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(source);
  await page.evaluate(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: () => Promise.reject(new DOMException("Permission denied", "NotAllowedError")),
      },
    });
  });
  await copy.click();
  await expect(canvas.getByRole("status")).toHaveText(
    "Could not copy. Select the code and copy it manually.",
  );
  await expect(canvas.locator("code")).toHaveText(source);
  await expect(canvas.locator("pre")).toHaveAttribute("tabindex", "0");
});

test("modal contains focus, saves controlled values, dismisses with Escape, and restores focus", async () => {
  const canvas = await example("modal");
  const trigger = canvas.getByRole("button", { name: "Workspace settings" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Workspace settings" });
  const input = dialog.getByRole("textbox", { name: "Workspace name" });
  await expect(input).toBeFocused();
  await audit(".cinder-modal-overlay");
  await dialog.getByRole("button", { name: "Save changes" }).focus();
  await page.keyboard.press("Tab");
  expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  await input.fill("Keyboard studio");
  await dialog.getByRole("button", { name: "Save changes" }).click();
  await expect(canvas.getByRole("status")).toHaveText("Saved locally: Keyboard studio");
  await expect(trigger).toBeFocused();
  await trigger.press("Enter");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("menus skip disabled actions and popovers restore focus after dismissal", async () => {
  let canvas = await example("menu");
  const trigger = canvas.getByRole("button", { name: "Actions", exact: true });
  await trigger.focus();
  await trigger.press("Enter");
  await audit(".cinder-popover");
  await page.keyboard.press("End");
  await expect(page.getByRole("menuitem", { name: "Archive", exact: true })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(canvas.getByRole("status")).toHaveText("Action selected: Archive");
  await expect(trigger).toBeFocused();

  canvas = await example("popover");
  const display = canvas.getByRole("button", { name: "Display settings" });
  await display.click();
  await audit(".cinder-popover");
  await page.getByText("Compact layout", { exact: true }).click();
  await expect(page.getByRole("switch", { name: "Compact layout" })).toBeChecked();
  await page.keyboard.press("Escape");
  await expect(display).toBeFocused();
});

test("tooltip is available on keyboard focus and toast is dismissible", async () => {
  let canvas = await example("tooltip");
  await page.keyboard.press("Tab");
  await canvas.getByRole("button", { name: "Settings", exact: true }).focus();
  await expect(page.getByRole("tooltip")).toHaveText("Manage workspace settings");
  await audit(".cinder-tooltip");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("tooltip")).toBeHidden();

  canvas = await example("toast");
  await canvas.getByRole("button", { name: "Show notification" }).click();
  await expect(page.locator(".cinder-toast")).toContainText("Preferences saved");
  await audit(".cinder-toast-region");
  await page.locator(".cinder-toast").getByRole("button", { name: "Dismiss notification" }).click();
  await expect(page.locator(".cinder-toast")).toHaveCount(0);
});

test("tags remove from the keyboard and tree branches expand and collapse", async () => {
  let canvas = await example("tag");
  await canvas.getByRole("row", { name: "React", exact: true }).focus();
  await page.keyboard.press("Delete");
  await expect(canvas.getByRole("row", { name: "React", exact: true })).toHaveCount(0);
  await expect(canvas.getByRole("row")).toHaveCount(2);

  canvas = await example("tree-view");
  const packages = canvas.getByRole("row", { name: /packages/ }).first();
  await packages.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(packages).toHaveAttribute("aria-expanded", "false");
  await expect(canvas.getByText("buttons.tsx", { exact: true })).toBeHidden();
  await page.keyboard.press("ArrowRight");
  await expect(packages).toHaveAttribute("aria-expanded", "true");
});

test("global search, persisted theme, and mobile navigation reach actual documentation", async () => {
  await page.goto("/?theme=g10");
  await page.getByRole("button", { name: "Change theme, current theme Gray 10" }).click();
  await page.getByRole("menuitemradio", { name: "Gray 100" }).click();
  await expect(page.locator(".site-root")).toHaveAttribute("data-cinder-theme", "g100");
  await page.goto("/");
  await page.reload();
  await expect(page.locator(".site-root")).toHaveAttribute("data-cinder-theme", "g100");
  await page.getByRole("button", { name: /Search/ }).click();
  await page.getByRole("searchbox", { name: "Find components" }).fill("date range");
  await page
    .getByRole("dialog")
    .getByRole("link", { name: /Date range picker/ })
    .click();
  await expect(page.getByRole("heading", { name: "Date range picker", level: 1 })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation", exact: true }).click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Foundations" })
    .click();
  await expect(
    page.getByRole("heading", { name: "The rules behind the work.", level: 1 }),
  ).toBeVisible();
});
