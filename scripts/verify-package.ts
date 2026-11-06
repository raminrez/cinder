import assert from "node:assert/strict";
import { cp, mkdir, mkdtemp, realpath, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve, join, sep } from "node:path";
import { chromium, type Locator, type Page } from "playwright";
import { expect } from "playwright/test";

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
  { name: "native", directory, entrypoints: ["index.html", "frame.html"] },
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
  await page.getByTestId("use-hebrew").evaluate((element: HTMLButtonElement) => element.click());
  const overlay = page.locator(".cinder-modal-overlay");
  const popover = page.locator(".cinder-select-popover");
  for (const portal of [overlay, popover])
    await expectPortal(portal, "frame-dark", "he-IL", "plain-appearance", "rtl");
  await expect(page.locator(".cinder-modal")).toHaveCSS("background-color", "rgb(44, 47, 56)");
  await expect(popover).toHaveCSS("background-color", "rgb(44, 47, 56)");
  await page
    .getByTestId("replace-recipe")
    .evaluate((element: HTMLButtonElement) => element.click());
  for (const portal of [overlay, popover]) {
    await expectPortal(portal, "frame-dark", "he-IL", moduleAppearance, "rtl");
    await expect(portal).toHaveCSS("font-family", /Trebuchet MS/);
  }
  await page.getByTestId("clear-recipe").evaluate((element: HTMLButtonElement) => element.click());
  for (const portal of [overlay, popover]) {
    await expectPortal(portal, "frame-dark", "he-IL", "", "rtl");
    await expect(portal).toHaveCSS("font-family", /system-ui/);
  }
  await page
    .getByTestId("inherit-recipe")
    .evaluate((element: HTMLButtonElement) => element.click());
  for (const portal of [overlay, popover])
    await expectPortal(portal, "frame-dark", "he-IL", "plain-appearance", "rtl");
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
  await page.emulateMedia({ forcedColors: "active" });
  const system = await page.getByTestId("frame-baseline").evaluate((root) =>
    Object.fromEntries(
      ["ButtonFace", "ButtonText", "Highlight"].map((name) => {
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
      if (archive.name === "@cinder/react") {
        assert.equal(manifest.peerDependencies["@cinder/tokens"], "0.1.0");
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
      if (archive.name === "@cinder/tokens") {
        const css = await Bun.file(
          Bun.resolveSync("@cinder/tokens/tokens.css", consumer.directory),
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
    // skipLibCheck is false: this also resolves the distributed declaration graph.
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
  for (const consumer of consumers) {
    const build = await Bun.build({
      entrypoints: consumer.entrypoints.map((entry) => join(consumer.directory, entry)),
      outdir: dist,
      target: "browser",
      minify: true,
      publicPath: "/",
      env: "disable",
      define: { "process.env.NODE_ENV": JSON.stringify("production") },
    });
    assert.ok(build.success, build.logs.map(String).join("\n"));
  }
  server = Bun.serve({
    port: 0,
    hostname: "127.0.0.1",
    development: false,
    routes: { "/*": { dir: dist } },
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
    await expect(page.getByRole("textbox", { name: "Email", exact: true })).toHaveCSS(
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
          "ESM imports",
          "CSS and JSON exports",
          "structured type styles and sparse breakpoint metadata",
          "theme and portalled layer",
          "Relay light/dark geometry, tokens, pending state, and nested Select portal",
          "Frame public JS/JSON/CSS tokens and default/explicit sizes in light and dark",
          "Frame Link native pointer/Enter navigation, disabled blocking, and tab order",
          "nested Frame/Carbon sizing and font boundaries with document-level legacy overrides",
          "plain CSS and compiled CSS Modules root, part, state, and detached portal overrides",
          "controlled native input and wrapper refs, uncontrolled custom field validation",
          "Modal outer/inner class, style, and ref targets",
          "rich Select collection types, descriptions, disabled options, and focus return",
          "live portal theme, locale, and inherited/replaced/cleared appearance",
          "explicit overlay language and exclusion of ordinary root class/style/id",
          "unrelated raw RAC ListBox and data-size/data-kind isolation",
          "pinned Tailwind CLI, genuine preflight, utilities, and cascade layer order",
          "Frame forced-color action and focus precedence",
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
          native: ["index.html", "frame.html"],
          tailwind: { version: tailwindVersion, entrypoint: "tailwind.html" },
        },
      },
      null,
      2,
    )}\n`,
  );
  passed = true;
  console.log(
    "External package consumers passed · strict declarations, legacy/Frame, CSS Modules, Tailwind, and browser contracts",
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
      `Serve built output for review: ${join(directory, "dist")} (index.html, frame.html, tailwind.html)`,
    );
  } else {
    console.error(`Consumer fixtures retained for diagnosis: ${directory}, ${tailwindDirectory}`);
  }
}
