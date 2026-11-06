import { mkdir, rm, copyFile } from "node:fs/promises";
import { resolve } from "node:path";
import { siteLicenses } from "./licenses";

const root = resolve(import.meta.dir, "..");
const run = async (...command: string[]) => {
  const process = Bun.spawn(command, { cwd: root, stdout: "inherit", stderr: "inherit" });
  if ((await process.exited) !== 0) throw new Error(`Build step failed: ${command.join(" ")}`);
};

await run("bun", "run", "build:tokens");
for (const name of ["tokens", "react"]) {
  const folder = `${root}/packages/${name}`;
  await rm(`${folder}/dist`, { recursive: true, force: true });
  const result = await Bun.build({
    entrypoints: [`${folder}/src/index.ts`],
    outdir: `${folder}/dist`,
    target: "browser",
    format: "esm",
    jsx: { runtime: "automatic", development: false },
    packages: "external",
    external: ["@cinder/tokens"],
    sourcemap: "linked",
    minify: false,
    ...(name === "react" ? { banner: '"use client";' } : {}),
  });
  if (!result.success) throw new AggregateError(result.logs, `Could not build ${name}`);
  await run("bunx", "--bun", "tsc", "-p", `packages/${name}/tsconfig.build.json`);
  await Promise.all(
    ["LICENSE", "NOTICE"].map((file) => copyFile(`${root}/${file}`, `${folder}/${file}`)),
  );
  if (name === "tokens") {
    await Promise.all(
      ["tokens.css", "tokens.json"].map((file) =>
        copyFile(`${folder}/src/${file}`, `${folder}/dist/${file}`),
      ),
    );
  } else {
    const css = await Bun.build({
      entrypoints: [`${folder}/src/styles.css`],
      outdir: `${folder}/dist`,
      minify: true,
    });
    if (!css.success) throw new AggregateError(css.logs, "Could not build styles");
  }
  console.log(`Built @cinder/${name}`);
}

await rm(`${root}/dist/site`, { recursive: true, force: true });
await mkdir(`${root}/dist/site`, { recursive: true });
const site = await Bun.build({
  entrypoints: [`${root}/apps/docs/index.html`],
  outdir: `${root}/dist/site`,
  target: "browser",
  minify: true,
  splitting: true,
  sourcemap: "linked",
  publicPath: "/",
  env: "disable",
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
});
if (!site.success) throw new AggregateError(site.logs, "Could not build the documentation site");
await Promise.all([
  copyFile(`${root}/LICENSE`, `${root}/dist/site/LICENSE.txt`),
  copyFile(`${root}/NOTICE`, `${root}/dist/site/NOTICE.txt`),
  Bun.write(`${root}/dist/site/THIRD_PARTY_LICENSES.txt`, await siteLicenses(root)),
]);
console.log(`Built documentation · ${site.outputs.length} assets`);
