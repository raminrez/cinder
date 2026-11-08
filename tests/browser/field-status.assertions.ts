import { expect } from "playwright/test";
import type { Page } from "playwright";

export async function expectNoDanglingStatusDescriptions(page: Page) {
  expect(
    await page.locator("[aria-describedby]").evaluateAll((controls) =>
      controls.flatMap((control) =>
        (control.getAttribute("aria-describedby") ?? "")
          .split(/\s+/)
          .filter((id) => id && !document.getElementById(id))
          .map((id) => ({ control: control.outerHTML.slice(0, 240), id })),
      ),
    ),
  ).toEqual([]);
}

export async function verifySelectStatusAdornment(page: Page) {
  const field = page.locator('[data-status-field="select"]');
  const trigger = field.locator(".cinder-select-trigger");
  const icon = trigger.locator(":scope > .cinder-field__status-icon");
  const chevron = trigger.locator(":scope > svg:not(.cinder-field__status-icon)");
  for (const type of ["warning", "error", "success"]) {
    await page.getByRole("button", { name: `Show ${type}`, exact: true }).click();
    await expect(icon).toHaveAttribute("data-cinder-status", type);
    const marker = await icon.boundingBox();
    const arrow = await chevron.boundingBox();
    const layout = await trigger.evaluate((node) => {
      const style = getComputedStyle(node);
      return { direction: style.direction, gap: parseFloat(style.columnGap) };
    });
    const gap =
      layout.direction === "rtl"
        ? marker!.x - arrow!.x - arrow!.width
        : arrow!.x - marker!.x - marker!.width;
    expect(Math.abs(gap - layout.gap), `${type} trailing icon gap`).toBeLessThanOrEqual(1);
    await expect(icon).toHaveCSS(
      "color",
      await field
        .locator(".cinder-field__status > svg")
        .evaluate((node) => getComputedStyle(node).color),
    );
  }
  await trigger.click();
  await expect(field).toHaveAttribute("data-open");
  await expect(icon).toHaveCSS("transform", "none");
  await expect(chevron).not.toHaveCSS("transform", "none");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
}

export async function verifyAppearanceOnlyStatus(page: Page) {
  const form = page.getByRole("form", { name: "Appearance-only form", exact: true });
  const fields = form.locator("[data-status-field]");
  await expect(fields).toHaveCount(12);
  for (const type of ["warning", "error", "success"]) {
    await page.getByRole("button", { name: `Show ${type}`, exact: true }).click();
    for (const field of await fields.all()) {
      await expect(field).toHaveAttribute("data-cinder-status", type);
      await expect(field).not.toHaveAttribute("data-invalid");
      const status = field.locator(".cinder-field__status");
      await expect(status).toHaveCount(1);
      await expect(status).toHaveText("Review this value before saving.");
      await expect(status).not.toHaveAttribute("slot", "description");
      const statusId = await status.getAttribute("id");
      expect(statusId).toBeTruthy();
      expect(statusId).not.toBe(
        await field.locator(".cinder-field__description").getAttribute("id"),
      );
      expect(
        await field.evaluate(
          (root, id) =>
            [
              root,
              ...root.querySelectorAll("input, textarea, button, [role=group], [role=radiogroup]"),
            ].some((control) =>
              (control.getAttribute("aria-describedby") ?? "").split(" ").includes(id!),
            ),
          statusId,
        ),
      ).toBe(true);
      await expect(status.locator("svg")).toHaveAttribute("aria-hidden", "true");
    }
    await expect(form.locator('[aria-invalid="true"]')).toHaveCount(0);
    expect(await form.evaluate((node) => (node as HTMLFormElement).checkValidity())).toBe(true);
    await expectNoDanglingStatusDescriptions(page);
  }
  await page.getByRole("button", { name: "Show error", exact: true }).click();
  await page.getByRole("button", { name: "Save appearance-only form", exact: true }).click();
  const data = JSON.parse(
    (await page.getByRole("status", { name: "Status FormData", exact: true }).textContent())!,
  );
  expect(Object.fromEntries(data)).toEqual({
    text: "Draft name",
    area: "Draft notes",
    number: "3",
    search: "Draft query",
    checkbox: "email",
    radio: "daily",
    select: "reader",
    combo: "sam",
    date: "2026-11-08",
    time: "10:30:00",
    picker: "2026-11-08",
    "range-start": "2026-11-08",
    "range-end": "2026-11-11",
  });
  await page.getByRole("button", { name: "Clear status", exact: true }).click();
  await expect(fields.locator(".cinder-field__status, .cinder-field__status-icon")).toHaveCount(0);
  await expectNoDanglingStatusDescriptions(page);
}

export async function verifyValidationStatusPrecedence(page: Page) {
  const field = page.getByTestId("status-validation");
  const input = field.getByRole("textbox", { name: "Email address (required)", exact: true });
  const saved = page.getByRole("status", { name: "Email submit count", exact: true });
  await expect(field.locator(".cinder-field__status")).toHaveText("Address lookup completed.");
  await page.getByRole("button", { name: "Submit email", exact: true }).click();
  await expect(input).toBeFocused();
  await expect(input).toHaveAttribute("aria-invalid", "true");
  await expect(saved).toHaveText("0");
  await expect(field.locator(".cinder-field__status")).toHaveCount(0);
  await expect(field.locator(".cinder-field__status-icon")).toHaveAttribute(
    "data-cinder-status",
    "error",
  );
  await expect(field.locator(".cinder-field__error")).not.toHaveText("");
  await expect(input).toHaveAccessibleDescription(/Enter an address you can receive mail at\./);
  await expect(input).not.toHaveAccessibleDescription(/Address lookup completed/);
  await expectNoDanglingStatusDescriptions(page);
  await input.fill("person@example.com");
  await input.press("Tab");
  await page.getByRole("button", { name: "Submit email", exact: true }).click();
  await expect(saved).toHaveText("1");
  await expect(field.locator(".cinder-field__status")).toBeVisible();
  await page.getByRole("button", { name: "Reject email", exact: true }).click();
  await expect(input).toHaveAttribute("aria-invalid", "true");
  await expect(field.locator(".cinder-field__error")).toHaveText("This address cannot be used.");
  await expect(field.locator(".cinder-field__status")).toHaveCount(0);
  await expect(input).toHaveAccessibleDescription(/This address cannot be used\./);
  await page.getByRole("button", { name: "Clear server rejection", exact: true }).click();
  await expect(input).not.toHaveAttribute("aria-invalid", "true");
  await expect(input).toHaveValue("person@example.com");
  await expect(field.locator(".cinder-field__status")).toBeVisible();
  await expectNoDanglingStatusDescriptions(page);

  const form = page.getByRole("form", { name: "Appearance-only form", exact: true });
  const fields = form.locator("[data-status-field]");
  const draft = await form.evaluate((node) => [...new FormData(node as HTMLFormElement)]);
  const statusIds = await fields
    .locator(".cinder-field__status")
    .evaluateAll((nodes) => nodes.map((node) => node.id));
  await page.getByRole("button", { name: "Toggle actual invalidity", exact: true }).click();
  for (const root of await fields.all()) {
    await expect(root).toHaveAttribute("data-invalid");
    await expect(root.locator(".cinder-field__status")).toHaveCount(0);
    await expect(root.locator(".cinder-field__error")).toHaveText(
      "Correct this field before saving.",
    );
    for (const icon of await root.locator(".cinder-field__status-icon").all())
      await expect(icon).toHaveAttribute("data-cinder-status", "error");
  }
  expect(
    await form.evaluate(
      (node, ids) =>
        [...node.querySelectorAll("[aria-describedby]")].some((control) =>
          (control.getAttribute("aria-describedby") ?? "")
            .split(/\s+/)
            .some((id) => ids.includes(id)),
        ),
      statusIds,
    ),
  ).toBe(false);
  await expectNoDanglingStatusDescriptions(page);
  await page.getByRole("button", { name: "Toggle actual invalidity", exact: true }).click();
  for (const root of await fields.all()) {
    await expect(root).not.toHaveAttribute("data-invalid");
    await expect(root.locator(".cinder-field__status")).toHaveText(
      "Review this value before saving.",
    );
  }
  expect(await form.evaluate((node) => [...new FormData(node as HTMLFormElement)])).toEqual(draft);
  await expectNoDanglingStatusDescriptions(page);
}

export async function verifyStatusNativeTransitions(page: Page) {
  for (const name of ["text", "area", "number", "search", "date", "time", "picker", "range"]) {
    const field = page.locator(`[data-status-field="${name}"]`);
    const isDate = ["date", "time", "picker", "range"].includes(name);
    const controls = isDate
      ? field.locator(".react-aria-DateInput")
      : field.locator("input:not([type=hidden]),textarea").first();
    for (const input of await controls.all()) {
      const node = await input.elementHandle();
      const parent = await input.evaluateHandle((element) => element.parentElement);
      const focused = isDate ? input.getByRole("spinbutton").first() : input;
      if (isDate) await focused.click();
      else await input.fill(name === "number" ? "4" : "Retained draft");
      if (name === "text" || name === "area")
        await input.evaluate((element) =>
          (element as HTMLInputElement | HTMLTextAreaElement).setSelectionRange(2, 6),
        );
      const segments = isDate
        ? await input.locator(".react-aria-DateSegment").allTextContents()
        : [];
      const draft = await page
        .getByRole("form", { name: "Appearance-only form", exact: true })
        .evaluate((form) => [...new FormData(form as HTMLFormElement)]);
      for (const status of ["error", "success", undefined, "warning"]) {
        await focused.press("Alt+s");
        if (status) await expect(field).toHaveAttribute("data-cinder-status", status);
        else await expect(field).not.toHaveAttribute("data-cinder-status");
        await expect(focused).toBeFocused();
        if (isDate)
          expect(await input.locator(".react-aria-DateSegment").allTextContents()).toEqual(
            segments,
          );
        else await expect(input).toHaveValue(name === "number" ? "4" : "Retained draft");
        expect(await input.evaluate((current, previous) => current === previous, node)).toBe(true);
        expect(
          await input.evaluate((current, previous) => current.parentElement === previous, parent),
        ).toBe(true);
        if (name === "text" || name === "area")
          expect(
            await input.evaluate((element) => [
              (element as HTMLInputElement).selectionStart,
              (element as HTMLInputElement).selectionEnd,
            ]),
          ).toEqual([2, 6]);
        expect(
          await page
            .getByRole("form", { name: "Appearance-only form", exact: true })
            .evaluate((form) => [...new FormData(form as HTMLFormElement)]),
        ).toEqual(draft);
        await expectNoDanglingStatusDescriptions(page);
      }
      await node?.dispose();
      await parent.dispose();
    }
  }
}

export async function verifyComposedStatus(page: Page) {
  const field = page.getByTestId("status-composed");
  const input = field.getByRole("textbox", { name: "Composed name", exact: true });
  const node = await input.elementHandle();
  await expect(field.locator(".cinder-field__status")).toHaveCount(0);
  await expect(input).toHaveAccessibleDescription(
    "Composed guidance. External instructions remain associated.",
  );
  await expectNoDanglingStatusDescriptions(page);
  await page.getByRole("button", { name: "Inspect status ref", exact: true }).click();
  await expect(page.getByRole("status", { name: "Status ref target", exact: true })).toHaveText(
    "unmounted",
  );
  await input.fill("Retained composed draft");
  await page.getByRole("button", { name: "Toggle composed status", exact: true }).click();
  const status = field.locator(".cinder-field__status");
  await expect(status).toHaveClass(/consumer-status/);
  await expect(status).toHaveAttribute("data-consumer-status", "true");
  await expect(input).toHaveAccessibleDescription(
    "Composed guidance. External instructions remain associated. Composed status is mounted.",
  );
  await page.getByRole("button", { name: "Inspect status ref", exact: true }).click();
  await expect(page.getByRole("status", { name: "Status ref target", exact: true })).toHaveText(
    "SPAN",
  );
  await expect(input).toBeFocused();
  await expect(input).toHaveClass(/consumer-focused/);
  await expect(input).toHaveAttribute("data-consumer-input", "true");
  await expect(input).toHaveValue("Retained composed draft");
  expect(await input.evaluate((current, previous) => current === previous, node)).toBe(true);
  await page.getByRole("button", { name: "Toggle composed status", exact: true }).click();
  await expect(status).toHaveCount(0);
  await expect(input).not.toHaveAccessibleDescription(/Composed status is mounted/);
  await expectNoDanglingStatusDescriptions(page);
  await node?.dispose();

  const inherited = page.getByTestId("status-inherited").getByRole("textbox");
  const slotted = page.getByTestId("status-slotted").getByRole("textbox");
  const explicit = page.getByTestId("status-explicit").getByRole("textbox");
  const cleared = page.getByTestId("status-cleared-guidance").getByRole("textbox");
  const bypass = page.getByTestId("status-bypass").getByRole("textbox");
  const parts = page.getByTestId("status-inherited-parts").getByRole("textbox");
  await expect(inherited).toHaveAccessibleName("Inherited name (required)");
  await expect(inherited).toHaveAccessibleDescription(
    "Local guidance. Inherited external guidance.",
  );
  await expect(inherited).toHaveAttribute("required", "");
  await expect(
    page.getByRole("status", { name: "Inherited required state", exact: true }),
  ).toHaveText("true");
  await expect(slotted).toHaveAccessibleName("Slotted inherited name");
  await expect(slotted).toHaveAccessibleDescription("Inherited external guidance.");
  await expect(explicit).toHaveAccessibleName("Explicit name");
  await expect(explicit).toHaveAccessibleDescription("Explicit external guidance.");
  await expect(cleared).toHaveAccessibleDescription("");
  await expect(bypass).toHaveAccessibleName("Context bypass");
  await expect(bypass).not.toHaveAttribute("required");
  await expect(bypass).not.toHaveAttribute("aria-describedby");
  await expect(parts).toHaveAccessibleName("Context-part name");
  await expect(parts).toHaveAccessibleDescription("Part-context guidance.");
  await parts.fill("Updated part draft");
  await expect(
    page.getByRole("status", { name: "Part context change count", exact: true }),
  ).toHaveText("1");
  const partsNode = await parts.elementHandle();
  const partHelp = page.getByRole("button", { name: "About Context-part name", exact: true });
  await partHelp.click();
  const partDialog = page.getByRole("dialog", { name: "About Context-part name", exact: true });
  await expect(partDialog).toBeVisible();
  await partDialog.getByRole("button", { name: "Close field help", exact: true }).click();
  await expect(partDialog).toHaveCount(0);
  await expect(partHelp).toBeFocused();
  await inherited.fill("Updated inherited draft");
  await expect(
    page.getByRole("status", { name: "Inherited context change count", exact: true }),
  ).toHaveText("1");
  const inheritedNode = await inherited.elementHandle();
  for (const mounted of [true, false]) {
    await page.getByRole("button", { name: "Toggle composed status", exact: true }).click();
    await expect(inherited).toHaveAccessibleDescription(
      `Local guidance. Inherited external guidance.${mounted ? " Mounted status." : ""}`,
    );
    await expect(slotted).toHaveAccessibleDescription(
      `Inherited external guidance.${mounted ? " Slotted status." : ""}`,
    );
    await expect(explicit).toHaveAccessibleDescription(
      `Explicit external guidance.${mounted ? " Explicit status." : ""}`,
    );
    await expect(cleared).toHaveAccessibleDescription(mounted ? "Cleared guidance status." : "");
    await expect(parts).toHaveAccessibleDescription(
      `Part-context guidance.${mounted ? " Inherited parts status." : ""}`,
    );
    await expect(parts).toHaveValue("Updated part draft");
    expect(await parts.evaluate((current, previous) => current === previous, partsNode)).toBe(true);
    await expect(inherited).toHaveValue("Updated inherited draft");
    expect(
      await inherited.evaluate((current, previous) => current === previous, inheritedNode),
    ).toBe(true);
    await expectNoDanglingStatusDescriptions(page);
  }
  expect(
    await page
      .getByRole("form", { name: "Inherited context form", exact: true })
      .evaluate((form) => new FormData(form as HTMLFormElement).get("inherited-draft")),
  ).toBe("Updated inherited draft");
  expect(
    await page
      .getByRole("form", { name: "Inherited context form", exact: true })
      .evaluate((form) => new FormData(form as HTMLFormElement).get("inherited-parts")),
  ).toBe("Updated part draft");
  await inheritedNode?.dispose();
  await partsNode?.dispose();
}

export async function verifyLabelHelpIsolation(page: Page) {
  const help = page.getByRole("button", { name: "About Display name", exact: true });
  await page.mouse.move(0, 0);
  await help.hover();
  await expect(page.getByRole("tooltip")).toHaveText("This name appears beside your work.");
  await page.mouse.move(0, 0);
  await expect(page.getByRole("tooltip")).toHaveCount(0);
  await page.getByRole("textbox", { name: "Display name (required)", exact: true }).click();
  await page.keyboard.press("Shift+Tab");
  await expect(help).toBeFocused();
  await expect(page.getByRole("tooltip")).toHaveText("This name appears beside your work.");
  await help.press("Enter");
  await expect(page.getByRole("dialog", { name: "About Display name", exact: true })).toBeVisible();
  await expect(page.getByRole("tooltip")).toHaveCount(0);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(help).toBeFocused();

  for (const [name, label] of [
    ["number", "Seats"],
    ["search", "Find records"],
    ["select", "Access level"],
    ["combo", "Assignee"],
    ["picker", "Start date"],
    ["range", "Review window"],
  ]) {
    const field = page.locator(`[data-status-field="${name}"]`);
    const trigger = field.getByRole("button", { name: `About ${label}`, exact: true });
    expect(await trigger.evaluate((node) => node.closest("label") === null)).toBe(true);
    const values = await field.evaluate((root) =>
      [...root.querySelectorAll("input")].map((node) => node.value),
    );
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: `About ${label}`, exact: true });
    await expect(dialog).toBeVisible();
    await expect(field).not.toHaveAttribute("data-open");
    await expect(page.getByRole("listbox")).toHaveCount(0);
    await expect(page.getByRole("grid")).toHaveCount(0);
    expect(
      await field.evaluate((root) => [...root.querySelectorAll("input")].map((node) => node.value)),
    ).toEqual(values);
    const close = dialog.getByRole("button", { name: "Close field help", exact: true });
    await expect(close).toHaveCSS("position", "static");
    const paragraph = await dialog.locator("p").boundingBox();
    const button = await close.boundingBox();
    expect(button!.y).toBeGreaterThanOrEqual(paragraph!.y + paragraph!.height);
    await close.click();
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
  }
  await expect(page.getByRole("status", { name: "Status FormData", exact: true })).toHaveText("");
}
