import { afterAll, afterEach, beforeAll, beforeEach, test } from "bun:test";
import { chromium, type Browser, type BrowserContext, type Page } from "playwright";
import { expect } from "playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { themes } from "@hashti/tokens";
import { startPreview } from "../../scripts/preview";

let server: Awaited<ReturnType<typeof startPreview>>;
let browser: Browser;
let context: BrowserContext;
let page: Page;
let errors: string[];
const relayThemes = ["relay-light", "relay-dark"] as const;
type RelayTheme = (typeof relayThemes)[number];

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
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
});

afterEach(async () => {
  await context?.close();
  expect(errors).toEqual([]);
});

afterAll(async () => {
  await browser?.close();
  server?.stop(true);
});

async function visit(theme: RelayTheme) {
  await page.goto(`/relay?theme=${theme}`);
  await expect(page.getByRole("heading", { name: "Relay components" })).toBeVisible();
  await expect(page.locator(".site-root")).toHaveAttribute("data-cinder-theme", theme);
  await page.evaluate(() => document.fonts.ready);
}

async function color(theme: RelayTheme, name: keyof (typeof themes)["relay-light"]) {
  return page.evaluate((value) => {
    const style = document.createElement("span").style;
    style.color = value;
    return style.color;
  }, themes[theme][name]);
}

async function expectAccessible() {
  // Axe 4.14 treats option descriptions as labels; verify their RAC associations explicitly.
  const describedOptions: string[] = [];
  for (const option of await page
    .locator('.cinder-select-popover [role="option"][aria-describedby]')
    .all()) {
    await expect(option).toHaveAccessibleName(await option.locator('[slot="label"]').innerText());
    await expect(option).toHaveAccessibleDescription(
      await option.locator('[slot="description"]').innerText(),
    );
    describedOptions.push(await option.evaluate((element) => `#${CSS.escape(element.id)}`));
  }
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  const violations = result.violations.filter(
    ({ id, nodes }) =>
      id !== "label-content-name-mismatch" ||
      !nodes.every(
        ({ target }) =>
          target.length === 1 &&
          typeof target[0] === "string" &&
          describedOptions.includes(target[0]),
      ),
  );
  expect(
    violations.map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) })),
  ).toEqual([]);
}

for (const theme of relayThemes) {
  test(`${theme}: real button states, density, pending names, and repeat prevention`, async () => {
    await visit(theme);
    // Read Chrome's actual tree: Playwright's DOM name calculation drops embedded progress.
    const accessibility = await context.newCDPSession(page);
    async function expectPendingName() {
      const { nodes } = await accessibility.send("Accessibility.getFullAXTree");
      expect(
        nodes.filter((node) => node.role?.value === "button").map((node) => node.name?.value),
      ).toContain("Save changes Saving");
    }
    const button = page.getByTestId("relay-live-button");
    await expect(button).toHaveCSS("border-radius", "8px");
    await expect(button).toHaveCSS("column-gap", "8px");
    await expect(button).toHaveCSS("font-size", "14px");
    await expect(button).toHaveCSS("font-weight", "500");
    for (const [size, height] of [
      ["sm", 32],
      ["md", 40],
      ["lg", 48],
    ] as const) {
      await page
        .getByRole("radiogroup", { name: "Live button size" })
        .getByRole("radio", { name: `${size} · ${height}` })
        .click();
      await expect(button).toHaveCSS("height", `${height}px`);
    }
    for (const [variant, hover, pressed] of [
      ["Primary", "button-primary-hover", "button-primary-active"],
      ["Secondary", "button-secondary-hover", "button-secondary-active"],
      ["Tertiary", "button-tertiary-hover", "button-tertiary-active"],
      ["Ghost", "background-hover", "background-active"],
      ["Danger", "button-danger-hover", "button-danger-active"],
      ["Danger tertiary", "button-danger-hover", "button-danger-active"],
      ["Danger ghost", "button-danger-hover", "button-danger-active"],
    ] as const) {
      await page.getByRole("button", { name: /Button variant$/ }).click();
      await page.getByRole("option", { name: variant, exact: true }).click();
      await button.hover();
      await expect(button).toHaveCSS("background-color", await color(theme, hover));
      await page.mouse.down();
      await expect(button).toHaveCSS("background-color", await color(theme, pressed));
      // Cancel the press outside the target so this state check does not start a save.
      await page.mouse.move(0, 0);
      await page.mouse.up();
      await page.keyboard.press("Tab");
      await button.focus();
      await expect(button).toHaveAttribute("data-focus-visible");
      await expect(button).toHaveCSS("outline-color", await color(theme, "focus"));
      await expect(button).toHaveCSS("outline-offset", "2px");
    }
    await page.getByRole("button", { name: /Button variant$/ }).click();
    await page.getByRole("option", { name: "Primary", exact: true }).click();
    const before = (await button.boundingBox())!;
    await button.focus();
    await page.keyboard.press("Space");
    await expect(button).toHaveAttribute("data-pending");
    await expect(button).toHaveAttribute("aria-disabled", "true");
    await expectPendingName();
    await expect(button.getByRole("progressbar", { name: "Saving" })).toBeVisible();
    await expect(button).toBeFocused();
    const pending = (await button.boundingBox())!;
    expect([pending.width, pending.height]).toEqual([before.width, before.height]);
    await page.mouse.click(pending.x + pending.width / 2, pending.y + pending.height / 2);
    await page.keyboard.press("Enter");
    await page.keyboard.press("Space");
    await expect(page.getByRole("status", { name: "Button preview status" })).toHaveText(
      "1 preview save. Nothing is sent.",
    );
    await expect(button).toHaveAccessibleName("Save changes");
    await page.locator(".relay-control-options").getByText("Disabled", { exact: true }).click();
    await expect(button).toBeDisabled();
    await page.locator(".relay-control-options").getByText("Disabled", { exact: true }).click();
    await page.getByText("Icon only", { exact: true }).click();
    await expect(button).toHaveCSS("width", "48px");
    await button.press("Enter");
    await expectPendingName();
    await expect(button.getByRole("progressbar", { name: "Saving" })).toBeVisible();
    await expect(button).toHaveCSS("width", "48px");
    await expect(button.locator("svg")).toHaveCSS("visibility", "hidden");
    await accessibility.detach();
  });

  test(`${theme}: field validation, read-only copying, and shared size tokens`, async () => {
    await visit(theme);
    const field = page.getByRole("textbox", { name: "Workspace name (required)" });
    const readonly = page.getByRole("textbox", { name: "Workspace ID" });
    for (const [size, height] of [
      ["sm", 32],
      ["md", 40],
      ["lg", 48],
    ] as const) {
      await page
        .getByRole("radiogroup", { name: "Live field size" })
        .getByRole("radio", { name: `${size} · ${height}` })
        .click();
      await expect(field).toHaveCSS("height", `${height}px`);
      await expect(readonly).toHaveCSS("height", `${height}px`);
    }
    await expect(field).toHaveCSS("border-radius", "8px");
    await expect(field).toHaveCSS("border-top-color", await color(theme, "border-strong-01"));
    await expect(field).toHaveAccessibleDescription(
      "Use at least 3 characters. Teammates will see this name.",
    );
    await readonly.focus();
    await readonly.press("ControlOrMeta+a");
    expect(
      await readonly.evaluate((element: HTMLInputElement) =>
        element.value.slice(element.selectionStart!, element.selectionEnd!),
      ),
    ).toBe("WS-1042");
    await readonly.press("Backspace");
    await expect(readonly).toHaveValue("WS-1042");
    await page.getByRole("button", { name: "Clear name" }).click();
    await page.getByRole("button", { name: "Validate name" }).click();
    await expect(field).toBeFocused();
    await expect(field).toHaveAttribute("aria-invalid", "true");
    await expect(field).toHaveCSS("border-color", await color(theme, "support-error"));
    await expect(field).toHaveCSS("outline-color", await color(theme, "focus"));
    await expect(field).toHaveCSS("outline-offset", "2px");
    await expect(field).toHaveAccessibleDescription(
      /Use at least 3 characters for the workspace name/,
    );
    await field.fill("Studio review");
    await page.getByRole("button", { name: "Validate name" }).click();
    await expect(field).not.toHaveAttribute("aria-invalid", "true");
    await expect(page.getByRole("status", { name: "Field preview status" })).toHaveText(
      "“Studio review” is valid. Nothing is saved.",
    );
  });

  test(`${theme}: selection controls and a validated dialog with a nested Select portal`, async () => {
    await visit(theme);
    const design = page.getByRole("checkbox", { name: "Design changes" });
    await page.getByText("Design changes", { exact: true }).click();
    await expect(design).not.toBeChecked();
    const readonly = page.getByRole("checkbox", { name: "Audit log (read-only)", exact: true });
    await readonly.press("Space");
    await expect(readonly).toBeChecked();
    await expect(
      page.getByRole("checkbox", { name: "Billing changes (unavailable)" }),
    ).toBeDisabled();
    await page.getByText("Review is complete", { exact: true }).click();
    await expect(
      page.getByText("Confirm that the review is complete.", { exact: true }),
    ).toBeHidden();
    const team = page.getByRole("radio", { name: "Workspace team" });
    await team.press("ArrowDown");
    await expect(page.getByRole("radio", { name: "Only me" })).toBeChecked();
    const summary = page.getByRole("switch", { name: "Weekly summary" });
    await expect(summary.locator("..")).toHaveCSS("font-size", "14px");
    await summary.press("Space");
    await expect(summary).not.toBeChecked();

    const trigger = page.getByRole("button", { name: "Open invitation dialog" });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "Invite a teammate", exact: true });
    const email = dialog.getByRole("textbox", { name: "Email address (required)" });
    await expect(email).toBeFocused();
    await expect(page.locator(".cinder-modal")).toHaveCSS("border-radius", "20px");
    await expect(page.locator(".cinder-modal-overlay")).toHaveAttribute("data-cinder-theme", theme);
    await dialog.getByRole("button", { name: "Preview invitation" }).focus();
    await page.keyboard.press("Tab");
    await expect(dialog.getByRole("button", { name: "Close invitation dialog" })).toBeFocused();
    await dialog.getByRole("button", { name: "Preview invitation" }).click();
    await expect(email).toBeFocused();
    await expect(email).toHaveAttribute("aria-invalid", "true");
    await expectAccessible();
    await email.fill("alex@example.com");
    const role = dialog.getByRole("button", { name: "Viewer Workspace role", exact: true });
    await role.click();
    const popover = page.locator(".cinder-select-popover");
    await expect(popover).toHaveAttribute("data-cinder-theme", theme);
    await expect(popover).toHaveCSS("border-radius", "12px");
    await expect(popover).toHaveCSS("border-color", await color(theme, "border-subtle-00"));
    await expect(
      page.getByRole("option", { name: "Viewer", exact: true }),
    ).toHaveAccessibleDescription("Can view and comment");
    const firstOption = page.getByRole("option", { name: "Viewer", exact: true });
    const labelBounds = (await firstOption.locator('[slot="label"]').boundingBox())!;
    const descriptionBounds = (await firstOption.locator('[slot="description"]').boundingBox())!;
    expect(descriptionBounds.y).toBeGreaterThanOrEqual(labelBounds.y + labelBounds.height);
    await expect(page.getByRole("option", { name: "Owner", exact: true })).toBeDisabled();
    await expectAccessible();
    await page.keyboard.press("End");
    await expect(page.getByRole("option", { name: "Editor", exact: true })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(
      dialog.getByRole("button", { name: "Editor Workspace role", exact: true }),
    ).toBeFocused();
    await dialog.getByRole("button", { name: "Preview invitation" }).click();
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
    await expect(page.getByRole("status", { name: "Invitation preview status" })).toHaveText(
      "Invitation preview: alex@example.com · Editor. No email sent.",
    );
    for (const width of [768, 390, 320]) {
      const height = width === 768 ? 1000 : 844;
      await page.setViewportSize({ width, height });
      await trigger.click();
      await expect(email).toBeFocused();
      expect(
        await dialog.evaluate((element) => element.scrollWidth - element.clientWidth),
      ).toBeLessThanOrEqual(1);
      if (width === 390) await expectAccessible();
      await role.click();
      for (const surface of [page.locator(".cinder-modal"), popover]) {
        const bounds = (await surface.boundingBox())!;
        expect(bounds.x).toBeGreaterThanOrEqual(0);
        expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
        expect(bounds.y).toBeGreaterThanOrEqual(0);
        expect(bounds.y + bounds.height).toBeLessThanOrEqual(height);
      }
      if (width === 390) await expectAccessible();
      await page.keyboard.press("Escape");
      await expect(role).toBeFocused();
      await expect(dialog).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(trigger).toBeFocused();
    }
  });

  test(`${theme}: responsive page, reduced motion, token overrides, and accessibility`, async () => {
    await visit(theme);
    const corners = page.getByRole("radiogroup", { name: "Custom control corners" });
    await corners.getByRole("radio", { name: "16 px" }).click();
    const customField = page.getByRole("textbox", { name: "Custom corner preview" });
    const restore = page.getByRole("button", { name: "Restore Relay corners" });
    await expect(customField).toHaveCSS("border-radius", "16px");
    await expect(restore).toHaveCSS("border-radius", "16px");
    await restore.click();
    await expect(customField).toHaveCSS("border-radius", "8px");
    await expect(restore).toHaveCSS("border-radius", "8px");
    await expect(page.getByTestId("relay-live-button")).toHaveCSS("transition-duration", "0s");
    await expect(page.locator(".relay-pinned .cinder-spinner").first()).toHaveCSS(
      "animation-name",
      "none",
    );
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        width,
      );
      if (width === 1440 || width === 390) {
        await expectAccessible();
      }
    }
  });

  test(`${theme}: forced colors keep action, pending, selection, and focus indicators readable`, async () => {
    await page.emulateMedia({ forcedColors: "active" });
    await visit(theme);
    const system = await page.evaluate(() =>
      Object.fromEntries(
        ["ButtonText", "ButtonFace", "Highlight", "HighlightText", "GrayText"].map((name) => {
          const probe = document.createElement("span");
          probe.style.cssText = `color: ${name}; forced-color-adjust: none`;
          document.body.append(probe);
          const color = getComputedStyle(probe).color;
          probe.remove();
          return [name, color];
        }),
      ),
    );
    for (const row of await page.locator(".relay-state-table tbody tr").all()) {
      const button = row.locator(".cinder-button").first();
      await expect(button).toHaveCSS("color", system.ButtonText!);
      await expect(button).toHaveCSS("background-color", system.ButtonFace!);
      await expect(row.locator(".cinder-spinner")).toHaveCSS("color", system.ButtonText!);
      await expect(row.locator("[data-focus-visible]")).toHaveCSS(
        "outline-color",
        system.Highlight!,
      );
      await expect(row.locator("[data-disabled]")).toHaveCSS("color", system.GrayText!);
    }
    await expect(page.locator(".relay-playground .cinder-select-trigger")).toHaveCSS(
      "color",
      system.ButtonText!,
    );
    await expect(page.locator(".relay-playground .cinder-select-trigger > svg")).toHaveCSS(
      "color",
      system.ButtonText!,
    );
    const themeChoice = page.locator(".relay-page-heading .cinder-toggle-button[data-selected]");
    await expect(themeChoice).toHaveCSS("background-color", system.Highlight!);
    await expect(themeChoice).toHaveCSS("color", system.HighlightText!);
    const selected = page
      .locator(".relay-selection-examples .cinder-switch[data-selected]:not([data-disabled])")
      .first();
    await expect(selected.locator(".cinder-switch-track")).toHaveCSS(
      "background-color",
      system.Highlight!,
    );
    await expect(selected.locator(".cinder-switch-thumb")).toHaveCSS(
      "background-color",
      system.HighlightText!,
    );
  });
}

test("Relay and Carbon routes select valid themes and retain Relay preference on reload", async () => {
  await page.goto("/relay?theme=g100");
  await expect(page.locator(".site-root")).toHaveAttribute("data-cinder-theme", "relay-light");
  await page
    .getByRole("radiogroup", { name: "Relay theme" })
    .getByRole("radio", { name: "Dark", exact: true })
    .click();
  await page.goto("/relay/");
  await expect(page.locator(".site-root")).toHaveAttribute("data-cinder-theme", "relay-dark");
  await page.reload();
  await expect(page.locator(".site-root")).toHaveAttribute("data-cinder-theme", "relay-dark");
  await page.goto("/components/button?theme=relay-dark");
  await expect(page.locator(".site-root")).toHaveAttribute("data-cinder-theme", "g10");
});
