import assert from "node:assert/strict";
import { cp, mkdir, mkdtemp, realpath, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve, join, sep } from "node:path";
import { chromium } from "playwright";
import { expect } from "playwright/test";

const root = resolve(import.meta.dir, "..");
const workspace = await Bun.file(join(root, "package.json")).json();
const catalog = workspace.workspaces.catalog;
const docs = await Bun.file(join(root, "apps/docs/package.json")).json();
const archives = await Bun.file(join(root, "dist/packages/manifest.json")).json();
const directory = await mkdtemp(
  join(process.env.CINDER_TEST_TMPDIR ?? tmpdir(), "cinder-consumer-"),
);
const results = join(root, "test-results");
await mkdir(results, { recursive: true });
let browser: Awaited<ReturnType<typeof chromium.launch>> | undefined;
let server: ReturnType<typeof Bun.serve> | undefined;
let passed = false;

async function run(...command: string[]) {
  const child = Bun.spawn(command, { cwd: directory, stdout: "inherit", stderr: "inherit" });
  assert.equal(await child.exited, 0, `Consumer command failed: ${command.join(" ")}`);
}

try {
  await cp(join(root, "tests/fixtures/consumer"), directory, { recursive: true });
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
  await Bun.write(
    join(directory, "package.json"),
    JSON.stringify(
      {
        name: "cinder-external-consumer",
        private: true,
        type: "module",
        scripts: { typecheck: "tsc --noEmit" },
        dependencies,
        devDependencies: {
          typescript: workspace.devDependencies.typescript,
          "@types/react": catalog["@types/react"],
          "@types/react-dom": catalog["@types/react-dom"],
        },
      },
      null,
      2,
    ),
  );
  await run(process.execPath, "install");
  // No source aliases, symlinked Cinder workspaces, or ancestor node_modules.
  const manifestChecks = [];
  for (const archive of archives) {
    const installed = await realpath(join(directory, "node_modules", archive.name));
    assert.ok(
      installed.startsWith(`${directory}${sep}`),
      "Cinder must be installed inside the fixture",
    );
    const manifest = await Bun.file(join(installed, "package.json")).json();
    assert.equal(manifest.version, archive.version);
    assert.doesNotMatch(JSON.stringify(manifest), /workspace:|catalog:/);
    for (const file of ["README.md", "LICENSE", "NOTICE", "dist/index.js", "dist/index.d.ts"])
      assert.ok(await Bun.file(join(installed, file)).exists(), `Missing ${archive.name}/${file}`);
    assert.match(await Bun.file(join(installed, "NOTICE")).text(), /Copyright 2015 IBM Corp\./);
    if (archive.name === "@cinder/react") {
      assert.equal(manifest.peerDependencies["@cinder/tokens"], "0.1.0");
      assert.equal(
        manifest.dependencies["@internationalized/date"],
        catalog["@internationalized/date"],
      );
      assert.match(
        await Bun.file(join(installed, "dist/styles.css")).text(),
        /--cinder-background/,
      );
      assert.match(await Bun.file(join(installed, "dist/index.js")).text(), /^"use client";/);
    }
    manifestChecks.push({
      name: archive.name,
      version: manifest.version,
      filename: archive.filename,
      sha256: archive.sha256,
      protocolsResolved: true,
    });
  }
  // skipLibCheck is false: this also resolves the distributed declaration graph.
  await run(process.execPath, "run", "typecheck");
  const dist = join(directory, "dist");
  const build = await Bun.build({
    entrypoints: [join(directory, "index.html")],
    outdir: dist,
    target: "browser",
    minify: true,
    publicPath: "/",
    env: "disable",
    define: { "process.env.NODE_ENV": JSON.stringify("production") },
  });
  assert.ok(build.success, build.logs.map(String).join("\n"));
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
          "refs and render props",
          "keyboard state",
          "form validation and submission",
          "selection",
          "Plex fonts",
          "no browser errors",
        ],
        requestedFontAssets: fonts.length,
        loadedFontFaces: fontFaces,
      },
      null,
      2,
    )}\n`,
  );
  passed = true;
  console.log(
    "External package consumer passed · declarations, production bundle, CSS/fonts, and browser contracts",
  );
} finally {
  await browser?.close();
  server?.stop(true);
  if (passed) await rm(directory, { recursive: true, force: true });
  else console.error(`Consumer fixture retained for diagnosis: ${directory}`);
}
