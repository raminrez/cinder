# Bun research for Cinder

**Research date:** 2026-11-06. Original sources and probes were captured on 2026-11-05 UTC; the native-tooling follow-up was captured on 2026-11-06 UTC.
**Target:** Bun **1.4.4**, revision `38afee6c84fcf48c0edb2466aa4b27d287a59c30`.
**Purpose:** implementation decisions for Cinder's Carbon-aligned tokens, React Aria Components library, and documentation site.

## 1. Implementation decisions

- Use the exact project-local Bun **1.4.4** already installed in Cinder. The current root manifest now pins Bun and the React/RAC catalog; the earlier `latest` declarations have been replaced by the main implementation agent.
- Keep the successful **workspace + catalog + isolated-linker** setup. Build generated tokens before the React library and documentation site.
- Use **HTML imports with `Bun.serve`** for development. React state-preserving HMR, CSS-token updates, WOFF2 loading, and RAC pointer/keyboard activation were verified in a real browser.
- Build the documentation site from its **HTML entry**, with `target: "browser"` and `publicPath: "/"`. Deploy every emitted artifact and configure explicit client-route fallbacks.
- Publish **ESM JavaScript, declaration files, and an explicit CSS export**. Keep React/RAC imports external. Set `jsx.development: false` for the published library.
- Generate declarations with **TypeScript 7.0.2 and `emitDeclarationOnly`**. The live Bun docs advertise `dts: true` / `--dts`, but the tested stable executable silently ignores them.
- Use **`bun test`** for token logic and component tests, with explicit Happy DOM preloads when a DOM is needed. The advertised native DOM-environment selectors did not work on this revision. **Playwright Library under `bun test`** did work.
- Use native **`bun fmt`** and **`bun check --no-script -p tsconfig.json`** for formatting and workspace type checking. Native linting is deferred under the user's stable-runtime choice; the availability probe below distinguishes stable from canary.

These conclusions combine primary documentation with the [probe results](#10-verification-results). They are not a claim that every downloaded page or every Cinder component was tested.

## 2. Current stable version and a local pin

### Authoritative version evidence

| Evidence                             | Observed result                                                                     |
| ------------------------------------ | ----------------------------------------------------------------------------------- |
| GitHub's official latest-release API | `bun-v1.4.4`; `draft: false`; `prerelease: false`; published `2026-10-22T10:11:32Z` |
| Official release article             | Bun v1.4.4                                                                          |
| npm registry `bun/latest`            | `1.4.4`                                                                             |
| Project-local executable             | `1.4.4`, revision `38afee6c84fcf48c0edb2466aa4b27d287a59c30`                        |
| Existing global executable           | The same version and revision                                                       |

Sources: [GitHub release metadata][github-latest], [npm metadata][npm-bun], [release notes][release-144], and the saved [environment snapshot](../.research/bun/probes/environment.json). The brief's Bun 1.3.3 baseline is older than both executables found during this research. This research performed no global Bun upgrade.

The project-local launcher resolves to:

```text
cinder/node_modules/.bun/bun@1.4.4/node_modules/bun/bin/bun.exe
```

The installed project versions were Bun and `@types/bun` **1.4.4**, TypeScript **7.0.2**, React/React DOM **19.3.1**, RAC **1.22.1**, Playwright **1.65.0**, and both IBM Plex Fontsource packages **5.3.0**. Bun also reports embedded TypeScript **7.0.2**. These are observations of this installation, not independent claims about each package's latest release.

### Pinning strategy

The current root `package.json` already contains the important pieces:

```json
{
  "packageManager": "bun@1.4.4",
  "engines": { "bun": ">=1.4.4" },
  "devDependencies": {
    "bun": "1.4.4",
    "@types/bun": "1.4.4",
    "typescript": "7.0.2"
  },
  "trustedDependencies": ["bun"]
}
```

This is an excerpt, not a replacement manifest. `packageManager` records the selected version; `engines.bun` expresses the minimum. **Invoking the local executable** is what makes a developer command use the pinned runtime. Keep `bun.lock` in version control and use frozen installs in CI. [Installation][installation] · [Lockfile][lockfile]

For a fresh checkout with Node/npm available, bootstrap the exact runtime through npm's package-execution cache, then use the project's installed executable:

```sh
npm exec --yes --package=bun@1.4.4 -- bun install --frozen-lockfile
./node_modules/.bin/bun --version
./node_modules/.bin/bun --revision
./node_modules/.bin/bun run dev
```

The bootstrap mechanism was verified in an independent fixture with no local Bun package: the executable came from that fixture's `.npm-cache/_npx/.../bun/bin/bun.exe` and reported the exact version/revision. The same `npm exec` invocation also resolved Cinder's already-installed local Bun correctly. npm documents that an explicit package version must match exactly, otherwise it is fetched into the execution cache. [npm exec][npm-exec] · [Fresh-bootstrap evidence](../.research/bun/probes/bootstrap.json) · [Root-resolution evidence](../.research/bun/probes/root-npm-exec.json)

The `bun` npm package has a `postinstall` that prepares its executable. Retain its explicit trust entry; `--ignore-scripts` is inappropriate for a fresh installation that depends on that launcher. An explicit `trustedDependencies` list replaces Bun's default allowlist. The probe dependency workspace could use `--ignore-scripts` because its Bun executable came from the already-installed root. [Lifecycle scripts][lifecycle]

For GitHub Actions, use the official action with an exact version:

```yaml
- uses: oven-sh/setup-bun@v2
  with:
    bun-version: "1.4.4"
- run: bun install --frozen-lockfile
- run: ./node_modules/.bin/bun run check
```

The action can also read `packageManager` or a version file; an explicit `bun-version` is straightforward here. [Official setup-bun README][setup-bun]

For a future upgrade, update the exact Bun dependency, `packageManager`, matching Bun types, and CI version together; regenerate the lockfile using the selected executable; then run the build/declaration/browser checks. The shell installer supports a version and `BUN_INSTALL`, but its source also installs completions and may edit shell startup files. Merely setting `BUN_INSTALL` is not the same local-only bootstrap contract as the verified npm-cache method. [Installation][installation] · [Archived installer](../.research/bun/metadata/install.sh)

## 3. What changed since the supplied 1.3.3 baseline?

| Release or period          | Relevant change                                                                                                             | Consequence for Cinder                                                                                                           |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Already available by 1.3.3 | Workspaces, catalogs, HTML bundling, React development HMR; isolated installs became the default for new monorepos in 1.3.2 | These are established capabilities, not reasons to redesign the successful workspace setup.                                      |
| 1.3.6                      | Fake timers fixed for `@testing-library/react`; `--grep` added as a test-name alias                                         | Useful for component tests involving timers.                                                                                     |
| 1.3.13                     | File isolation, process-parallel tests, sharding, changed-test selection; faster peer-heavy isolated installs               | Available scaling tools once the suite needs them.                                                                               |
| 1.4                        | Directory routes in `Bun.serve`; optional React Compiler; additional workspace/catalog tooling                              | Native directory serving is useful for the production preview. The React Compiler is an opt-in and is not needed for this build. |
| 1.4                        | Runtime `.css` imports now export `{}` rather than a pathname                                                               | Use browser CSS imports for styles, or `Bun.file(...).text()` when a generator needs CSS text.                                   |
| 1.4.3                      | Built-in `bun check`, `--check`, and `Bun.build({ check: true })`                                                           | Bun can type-check as well as transpile. Its checker does not emit declarations.                                                 |
| 1.4.4                      | Deterministic dependency resolution; workspace/catalog/peer/linker fixes; HTML image/CSS fixes; redesigned dev overlay      | Strong reason to use the current patch release for this peer-heavy CSS/React monorepo.                                           |
| 1.4.4                      | `bun fmt`, faster checking, and corrected coverage accounting                                                               | Cinder now uses native formatting; coverage percentages can change because accounting was fixed.                                 |

Sources: [1.3.3][release-133], [1.3.6][release-136], [1.3.13][release-1313], [1.4][release-14], [1.4.3][release-143], [1.4.4][release-144]. Vendor performance numbers are not Cinder benchmarks.

### Native formatter migration

Cinder's `format` and `format:check` scripts now run `bun fmt` and `bun fmt --check`. The former Prettier options and ignore patterns live in `[fmt]` in `bunfig.toml`; the Prettier dependency and its separate configuration files have been removed. The generated Carbon report blocks retain their supported `prettier-ignore-start` / `prettier-ignore-end` comments. [Formatter documentation](https://bun.com/docs/format)

Before migration, both Prettier and `bun fmt --check` passed on the same source tree, and `bun fmt --doctor` reported 70 natively formatted files with no plugin-dependent files. This is workspace-specific compatibility evidence; Bun still documents intentional differences for some inputs. See [verification](verification.md) for the post-migration checks.

### Native lint availability

On 6 November 2026, the [live linter documentation](https://bun.sh/docs/lint.md) describes native `bun lint`. Both installed stable **1.4.4+38afee6c8** executables reject the command with `Script not found "lint"`, including the documented `--no-script` form. The npm `latest` tag and GitHub's latest stable release both still identify 1.4.4.

A separately downloaded canary, **1.4.4-canary.1+b1305ddc7**, successfully ran `bun lint --no-script --doctor`, discovering 44 files and 78 default rules. The [capability record](../.research/bun/probes/native-lint-canary/probe.json) includes its archive/executable hashes and command output. This checks command availability, not whether Cinder passes lint. The user chose to retain stable 1.4.4 and defer native lint until a stable release supports it; Cinder therefore has no lint script or external linter dependency.

## 4. Workspaces, catalogs, and isolated installs

The user's successful root installation is the implementation baseline. The current catalog has exact React **19.3.1**, React DOM **19.3.1**, RAC **1.22.1**, `@internationalized/date` **3.12.4**, and React type-package **19.3.0** versions. The independent probe also installed an object-form workspace/catalog configuration with the isolated linker successfully.

The validated configuration shape is:

```json
{
  "workspaces": {
    "packages": ["packages/*", "apps/*"],
    "catalog": {
      "react": "19.3.1",
      "react-dom": "19.3.1",
      "react-aria-components": "1.22.1"
    }
  }
}
```

Workspace manifests use `"react": "catalog:"` and local package edges such as `"@cinder/tokens": "workspace:*"`. Give each workspace a `name`. A root install covers all workspaces; use `bun install --filter ...` for an intentional subset and `bun run --filter ...` for workspace scripts. [Workspaces][workspaces] · [Catalogs][catalogs] · [Filtering][filter]

```toml
[install]
linker = "isolated"
```

Important details:

- Declare runtime imports in the package that owns them. Catalogs centralize versions; they do not create dependency edges by themselves.
- Workspace packages are linked to their source directories; external packages live in the isolated store. Peer combinations can produce separate store entries. Do not hardcode `.bun/...` paths in application code.
- “Isolated” is not an absolute undeclared-import barrier: the default store includes a hidden `.bun/node_modules` fallback. `install.hoist = false` disables that fallback, but root dependencies remain ancestor-resolvable. The detailed isolated-install documentation is more precise than its introductory “phantom dependencies prevented” table.
- The global virtual store is optional and off by default. It is unnecessary to change linker/store settings for the already-working Cinder setup.
- Commit the lockfile and freeze normal CI installs. A frozen reinstall of the independent probe completed without changes.

Sources: [Isolated installs][isolated] · [Lockfile][lockfile] · [Probe install result](../.research/bun/probes/build-and-dom.json).

Packing converts `catalog:` references to concrete versions. The probe tarball contained React **19.3.1** and RAC **1.22.1**, with no `catalog:` strings. Bun also documents the workspace transformations `workspace:*` → exact version, `workspace:^` → caret range, and `workspace:~` → tilde range. Distinguish the exact development catalog from the library's supported consumer peer ranges. Cinder currently declares broader React/RAC peer ranges; this research tested the installed versions only. [Catalogs][catalogs] · [Workspaces][workspaces]

## 5. HTML development server and React HMR

Bun accepts HTML as a route value and discovers the scripts, stylesheets, and assets referenced by that HTML. TSX is transpiled and CSS is bundled as part of this path. A bare `bun ./index.html` is useful for a static application; Cinder's explicit server makes its route set and health endpoint clear. [Fullstack server][fullstack] · [HTML/static sites][html]

An environment-controlled server pattern, equivalent to the tested fixture:

```ts
import index from "./index.html";

Bun.serve({
  port: Number(process.env.PORT ?? 3000),
  routes: {
    "/": index,
    "/components": index,
    "/components/*": index,
  },
  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
  fetch() {
    return new Response("Not found", { status: 404 });
  },
});
```

The browser entry can retain its React root across module evaluations:

```tsx
import { createRoot } from "react-dom/client";
import { App } from "./App";

const container = document.getElementById("root")!;
const root = (import.meta.hot.data.root ??= createRoot(container));
root.render(<App />);
```

This is Bun's documented `hot.data` pattern. In production Bun substitutes a normal object and simplifies the expression; the production browser probes confirmed that it runs. Use `import.meta.hot` APIs directly rather than aliasing `hot`, because Bun's transformation relies on the direct expression. [HMR API][hmr]

The development probe incremented a RAC button to **3**, changed the component's label, and observed **“Updated count: 3” with zero full-page reloads**. Editing an imported token CSS file then changed the button's computed color without losing state. This demonstrates the tested component-edit boundary; it is not a promise to preserve state through every change to component shape or module exports.

`bun --hot apps/docs/server.ts` controls server-side soft reloads; `development.hmr` controls browser HMR. The watch-mode page still mentions using a framework such as Vite for browser HMR, while Bun's newer fullstack/HMR pages document its own working implementation. Use those dedicated pages for the frontend path. [Watch modes][watch] · [Fullstack server][fullstack]

The current Cinder server explicitly enables development mode and the root dev script runs the token generator first. Treat that server as the development entry unless adopting the environment guard above. HMR reacts to changed generated CSS; it does not itself execute Cinder's token generator when a generator input changes.

## 6. CSS, fonts, and other assets

Bun has a native CSS bundler: local `@import`, nesting, CSS Modules, minification, and `url(...)` asset handling are documented. Its default CSS lowering targets include Chrome/Edge 80, Firefox 78, and Safari 14; this is a CSS-transformation target, not a complete browser-support guarantee for RAC or Cinder. [CSS][css] · [Loaders][loaders]

For Cinder:

- Keep semantic theme values and layer tokens as CSS custom properties. Bun bundles their definitions; it does not generate the Carbon token model.
- Import generated token CSS before component/site CSS, so the cascade is deliberate.
- Keep IBM Plex fonts in the site's asset graph. Use the pinned Fontsource packages and select the weights/subsets the design actually uses.
- A relative `@font-face` URL or a package stylesheet can supply the font. A relative HTML preload should reference the same font source, with `as="font"`, `type="font/woff2"`, and `crossorigin`.
- Ship the library's CSS as an explicit export and preserve CSS side effects in package metadata.

The probe used a real **22,588-byte Plex Sans Latin 400 WOFF2** copied from the installed Fontsource package. It verified a CSS `url()`, an HTML font preload, a local `@import`, nested RAC state selectors, and the same SVG referenced by both HTML and CSS. Production emitted hashed font/SVG URLs. In Chrome, the assets returned **200** with the expected MIME types, `document.fonts.load()` completed, and the image had a nonzero natural size. [Build evidence](../.research/bun/probes/build-and-dom.json) · [Browser evidence](../.research/bun/probes/browser.json)

Keep frontend environment substitution explicit:

```toml
[serve.static]
env = "disable"
```

That is already Cinder's configuration. The fullstack server also supports a public prefix such as `PUBLIC_*` if the site needs build-time configuration. For `Bun.build`, use its own `env`/`define` options; the probe explicitly defined production `NODE_ENV`. Server runtime environment variables and frontend build-time substitution are different mechanisms. [Fullstack environment configuration][fullstack] · [Bundler][bundler]

## 7. Production builds and serving

### Recommended static documentation build

Build the HTML entry, not just the TSX file:

```ts
const result = await Bun.build({
  entrypoints: ["./apps/docs/index.html"],
  outdir: "./dist/site",
  target: "browser",
  format: "esm",
  splitting: true,
  minify: true,
  publicPath: "/",
  env: "disable",
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  throw: false,
});

if (!result.success) {
  for (const log of result.logs) console.error(log);
  process.exit(1);
}
```

The equivalent probe emitted HTML, JavaScript, CSS, WOFF2, and SVG. Deploy the whole output directory. `publicPath: "/"` is appropriate for a site hosted at the origin root and makes nested client routes request assets from that root. A subpath deployment needs a matching asset prefix and server route configuration. [HTML builds][html] · [Bundler][bundler]

For a Bun preview, directory routes are supported in 1.4.4:

```ts
import { join } from "node:path";

const dist = join(import.meta.dir, "../dist/site"); // scripts/preview.ts
const shell = () => new Response(Bun.file(join(dist, "index.html")));

Bun.serve({
  port: Number(process.env.PORT ?? 3000),
  development: false,
  routes: {
    "/components": shell,
    "/components/*": shell,
    "/foundations": shell,
    "/get-started": shell,
    "/research": shell,
    "/*": { dir: dist },
  },
});
```

The exact and more-specific routes take precedence. Directory serving supplies MIME types, `ETag`, `Last-Modified`, conditional requests, ranges, and directory `index.html` handling. The probe verified **304** for a conditional font request and **206** for a 16-byte range. [Routing][routing]

**A directory-route miss returns 404; it does not fall through to `fetch`.** The probe deliberately installed a fallback handler and confirmed it was not invoked for a missing file covered by `"/*": { dir }`. Configure known client-side paths explicitly, as above. If the client supports additional nested paths, add their route patterns too. Keep genuine missing assets as 404s.

The tested directory and AOT responses had ETags but no `Cache-Control` header. Set deployment caching policy deliberately at the serving layer; a hashed filename alone does not establish an immutable response policy.

### AOT Bun server: supported, with two verified constraints

Bun's fullstack documentation also supports bundling a server that imports HTML. With an environment-controlled server like the example in section 5, the validated command pattern is:

```sh
BUN="$PWD/node_modules/.bin/bun"
"$BUN" build --target=bun --production --public-path=/ \
  --outdir=dist/server ./apps/docs/server.ts
NODE_ENV=production "$BUN" --cwd dist/server server.js
```

Preserve all emitted files beside the server. [AOT documentation][fullstack]

Two failures were reproduced before that corrected pattern passed:

1. Running the default AOT server from the project root failed with `Bundled file "./index-....js" not found`. Running from the output directory resolved the manifest's relative filesystem paths.
2. Default relative asset URLs worked at `/` but failed at `/components/button`: the browser requested `/components/index-....js`, which the HTML wildcard answered with HTML. Building with `--public-path=/` fixed the URLs and the nested-route browser check passed.

The failed and corrected evidence is retained in [AOT runtime results](../.research/bun/probes/aot-runtime.json), [initial browser results](../.research/bun/probes/browser.json), and [corrected AOT browser results](../.research/bun/probes/browser-aot.json). A successful build command alone was insufficient proof of a deployable server.

## 8. ESM library packaging and declarations

### JavaScript and CSS output

For the React library, the tested production build shape is:

```ts
const result = await Bun.build({
  entrypoints: ["./packages/react/src/index.ts", "./packages/react/src/styles.css"],
  outdir: "./packages/react/dist",
  target: "browser",
  format: "esm",
  packages: "external",
  external: ["@cinder/tokens"],
  jsx: { runtime: "automatic", development: false },
  sourcemap: "linked",
  banner: '"use client";',
  throw: false,
});

if (!result.success) throw new AggregateError(result.logs, "React build failed");
```

Use the actual source filenames in Cinder's build script. `packages: "external"` leaves package imports external while bundling relative source modules. The probe retained imports from `react-aria-components` and `react/jsx-runtime`, bundled a relative class-name helper, preserved the leading `"use client"`, and emitted a separate stylesheet. An explicit `external: ["react", "react-dom", "react-aria-components"]` also kept React's JSX subpath external. [Bundler][bundler] · [Production library evidence](../.research/bun/probes/production-library.json)

Without `jsx.development: false`, the initial library build imported `react/jsx-dev-runtime`. Explicit production JSX configuration removed that development transform. The current `scripts/build.ts` already externalizes packages and `@cinder/tokens`, invokes TypeScript for declarations, and builds the HTML site with `publicPath: "/"`; its React build still needs this explicit production JSX setting. The `"use client"` banner belongs on the interactive React library, not on the pure token generator/package.

Cinder's existing export structure is appropriate:

```json
{
  "type": "module",
  "files": ["dist", "README.md", "LICENSE", "NOTICE"],
  "sideEffects": ["**/*.css"],
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./styles.css": "./dist/styles.css"
  }
}
```

Keep React, React DOM, and RAC as the declared peers that the consumer supplies, and catalog-backed development dependencies for local builds. Every other external runtime import must likewise have an appropriate dependency declaration. Check the packed artifact rather than assuming a source-tree import proves the published package is complete.

### Type-checking and `.d.ts`

Bun ordinarily transpiles TypeScript without checking it. Cinder's `typecheck` script now runs **`bun check --no-script -p tsconfig.json`**, verified on stable 1.4.4 against the previous `tsc --noEmit` check. Cinder has a root script named `check`, so plain **`bun check` selects that script**; `--no-script` explicitly selects Bun's checker and avoids recursive aggregate execution. The aggregate `bun run check` remains the project's full verification command. `Bun.build({ check: true })` also rejects a type error before writing outputs. [Type checking][check] · [Stable introduction in 1.4.3][release-143]

The current bundler page advertises declaration output via `dts: true` / `--dts`. On the installed stable revision:

- A valid input with `dts: true` emitted only JavaScript.
- A deliberately invalid TypeScript input with `dts: true` also succeeded and emitted only JavaScript.
- `bun build typed.ts --dts` emitted no declarations.
- `check: true` correctly returned `success: false`, no outputs, and `TS2322` for the invalid input.

Treat this as a **live-docs versus tested-stable mismatch**, not as a working declaration API. The [saved capability probe](../.research/bun/probes/capabilities.json) includes arguments, outputs, and diagnostics. [Advertised bundler API][bundler] · [1.4.3 checker contract][release-143]

Use the installed TypeScript compiler for declarations:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist",
    "noEmit": false,
    "declaration": true,
    "emitDeclarationOnly": true,
    "noEmitOnError": true,
    "paths": {},
    "types": ["react"],
    "lib": ["ESNext", "DOM", "DOM.Iterable"]
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"]
}
```

```sh
./node_modules/.bin/bun run tsc -p packages/react/tsconfig.build.json
```

The important override is `noEmit: false` when extending a no-emit application config. Declaration-only emit is specifically intended to accompany another JavaScript transpiler. The probe emitted real `.d.ts` files that retained RAC prop types and a React JSX return type. Declaration emit is per source file; ship all referenced declaration files, not just the barrel. [TypeScript `emitDeclarationOnly`][ts-declarations] · [Declaration result](../.research/bun/probes/packages/library/dist/index.d.ts)

For Cinder, build the token package first. The `paths: {}` override clears the root's development aliases so `@cinder/tokens` resolves through its package export to built declarations. This keeps sibling token sources outside the React declaration build's `rootDir`. If retaining an alias instead, point it at the built declaration file with a path relative to the config that defines it.

For TypeScript 6/7, explicitly list ambient type packages. Use `types: ["bun"]` for Bun scripts and appropriate React/DOM types for browser/library code. Bun's runtime-oriented suggested config lists `lib: ["ESNext"]`; browser code needs `DOM` and `DOM.Iterable` as well. `moduleResolution: "bundler"`, `module: "Preserve"`, and `jsx: "react-jsx"` fit this bundler-driven source workflow. [TypeScript setup][typescript] · [TypeScript 6/7 changes][typescript-67]

### Verify the package boundary

```sh
./node_modules/.bin/bun pm pack --cwd packages/react --dry-run
```

The independent probe also wrote and inspected a real tarball. It included JavaScript, CSS, declaration files, and a source map; its `exports` paths existed and catalog references were replaced. The archive was inspected with `tar`; an initial `Bun.Archive(Bun.file(...))` inspection attempt failed before results were saved, so the orchestration script was corrected to persist results before tarball inspection. That tool-call failure is not evidence of a defective package tarball. [Packing][pm] · [Packed manifest and file list](../.research/bun/probes/build-and-dom.json)

## 9. DOM and browser testing

### Choose tests by behavior

| Layer                      | Useful Cinder checks                                                                                                   | Tooling                                           |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Pure token/generator logic | Semantic token completeness, all four themes, layer relationships, deterministic generated output                      | `bun:test`                                        |
| DOM component behavior     | Rendering, accessible names, controlled state, callbacks                                                               | `bun:test` + explicit Happy DOM + Testing Library |
| Real browser               | Keyboard navigation, focus/overlays, actual CSS/fonts, responsive layout, screenshots, accessibility scans, deep links | Playwright Library driven by `bun:test`           |

Happy DOM provides mocked browser APIs, not a browser layout/rendering engine. Browser evidence matters for Carbon geometry and font metrics as well as RAC interactions. [Happy DOM guide][happy-dom] · [Playwright Library][playwright-library]

### Explicit DOM preloads are the verified path

The current DOM page documents `--environment=happy-dom`, `[test] environment = "happy-dom"`, and `// @vitest-environment happy-dom`. **All three left `document` undefined on Bun 1.4.4 even after Happy DOM was installed.** The older explicit-preload guide worked. [DOM page][dom] · [Saved installed-dependency results](../.research/bun/probes/build-and-dom.json)

Use two preloads in order:

```ts
// tests/setup/happydom.ts
import { GlobalRegistrator } from "@happy-dom/global-registrator";
GlobalRegistrator.register();
```

```ts
// tests/setup/testing-library.ts
import { afterEach, expect } from "bun:test";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);
afterEach(cleanup);
```

```toml
# bunfig.dom.toml
[test]
preload = ["./tests/setup/happydom.ts", "./tests/setup/testing-library.ts"]
```

```sh
./node_modules/.bin/bun test --config=./bunfig.dom.toml tests/components
```

This order initializes the DOM before Testing Library captures it. The official Testing Library guide also documents Bun matcher type augmentation when using jest-dom's custom matchers in TypeScript. The probe passed a basic DOM assertion and a React/RAC `onPress` state update using these preloads. [Testing Library guide][testing-library]

The tested optional DOM dependencies were `@happy-dom/global-registrator` / `happy-dom` **21.0.4**, Testing Library React **16.3.3**, DOM **10.4.2**, and jest-dom **7.0.1**. They were installed only in the research fixture, not added to Cinder's application dependencies by this research.

`--parallel` uses worker processes across files and implies isolation; `test.concurrent` overlaps tests within a file. Shared `document` state and DOM cleanup do not mix with overlapping tests. Start with the current serial suites and explicit cleanup; use file-level parallelism when tests own independent resources. [Parallel and isolated tests][parallel]

### Playwright with Bun

The retained [Playwright test fixture](../.research/bun/probes/playwright.test.ts) starts `Bun.serve` on port `0`, launches Chrome with Playwright **1.65.0**, clicks the RAC button, asserts the updated state, and closes both browser and server in `finally`. It passed under `bun test`.

Use Playwright's `chromium`/browser/context/page APIs from `playwright` when Bun owns the test runner. Playwright Library requires explicit setup, cleanup, and condition waiting; it does not supply Playwright Test's fixtures and auto-retrying `expect` API. Use locator actions/waits before Bun assertions. [Library versus runner][playwright-library]

Install the browser corresponding to the pinned Playwright package in CI:

```sh
./node_modules/.bin/bun ./node_modules/playwright/cli.js install --with-deps chromium
./node_modules/.bin/bun run test:browser
```

This invokes the installed CLI directly. Use `chromium.launch({ headless: true })` without a `channel` to select that downloaded browser. Browser binaries are a separate installation from the JavaScript package. In this environment, Playwright's expected downloaded Chromium was absent, so the probes used the already-installed **Chrome 156.0.8078.80**, via `channel: "chrome"`. The Python driver for the broader HMR/asset probes was Playwright **1.62.0**; the separate Bun-run test validated the project's JavaScript Playwright **1.65.0** integration. Firefox, WebKit, and Linux CI were not exercised here. [Browser installation and channels][playwright-browsers]

## 10. Verification results

The capability, build, and Bun-test probes used the exact project-local 1.4.4 executable. Bootstrap and environment probes also inspected the npm-cache and existing global executables. Expected negative cases are retained alongside successful replacements.

| Probe                              | Result                                                                                                             | Evidence                                                                                                     |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| Exact runtime/bootstrap            | Local, global, and npm-cache executable agree on version/revision                                                  | [environment](../.research/bun/probes/environment.json), [bootstrap](../.research/bun/probes/bootstrap.json) |
| Isolated workspace/catalog install | Install and frozen reinstall succeeded                                                                             | [build-and-dom](../.research/bun/probes/build-and-dom.json)                                                  |
| HTML production build              | HTML, JS, CSS, WOFF2, SVG emitted                                                                                  | [build-and-dom](../.research/bun/probes/build-and-dom.json)                                                  |
| React HMR + token CSS HMR          | Count stayed at 3; CSS changed; zero page reloads                                                                  | [browser](../.research/bun/probes/browser.json)                                                              |
| Static browser/deep route          | Assets and fonts loaded; RAC click/Space/Enter worked; deep link 200; missing file 404; conditional 304; range 206 | [browser](../.research/bun/probes/browser.json)                                                              |
| AOT default output                 | Build succeeded; root-directory launch failed; nested route failed with relative asset URLs                        | [runtime](../.research/bun/probes/aot-runtime.json), [browser](../.research/bun/probes/browser.json)         |
| AOT corrected command              | Output-directory launch and root-relative URLs passed root/deep-route browser checks                               | [browser-aot](../.research/bun/probes/browser-aot.json)                                                      |
| ESM/external imports               | RAC/React external; relative helper bundled; production JSX and client directive preserved                         | [production-library](../.research/bun/probes/production-library.json)                                        |
| TypeScript declaration emit        | Real `.d.ts` files emitted and packed                                                                              | [build-and-dom](../.research/bun/probes/build-and-dom.json)                                                  |
| Advertised `dts` API               | No declarations; invalid types also accepted                                                                       | [capabilities](../.research/bun/probes/capabilities.json)                                                    |
| Built-in type checker              | Valid config passed; `check: true` rejected invalid type before emit                                               | [capabilities](../.research/bun/probes/capabilities.json)                                                    |
| Native Happy DOM selectors         | Three installed-dependency probes failed with undefined `document`                                                 | [build-and-dom](../.research/bun/probes/build-and-dom.json)                                                  |
| Explicit DOM preloads              | 2 tests passed, including RAC callback/state                                                                       | [build-and-dom](../.research/bun/probes/build-and-dom.json)                                                  |
| Playwright under Bun's runner      | 1 real-browser test passed                                                                                         | [production-library](../.research/bun/probes/production-library.json)                                        |
| Packed catalog metadata            | Concrete peer versions; exported artifact paths present                                                            | [build-and-dom](../.research/bun/probes/build-and-dom.json)                                                  |

These are implementation-capability probes. Cinder's aggregate application checks, every component, broad peer-version ranges, and cross-browser accessibility remain the main implementation's verification responsibilities.

## 11. Archive and honest reading coverage

Research started from **[bun.sh/llms.txt][llms]**, which resolves to Bun's current documentation index. The retained [archive script](../.research/bun/archive.ts) uses **six concurrent requests**, **three attempts**, and **45-second per-request timeouts**. Successful cached downloads preserve their original timestamps and hashes. The manifest records source URL, final URL, HTTP status, retrieval time, size, SHA-256, category, and errors. Supplemental URLs are retained across reruns.

The final [download manifest](../.research/bun/manifest.json) contains:

- **319** indexed documentation URLs attempted.
- **18** release articles: the 1.3 overview, the 1.3.3 baseline onward, and all indexed 1.4 releases through 1.4.4.
- **16** non-release editorial posts from the blog index.
- **365 successful downloads**, **7 failed URLs**, **5,727,461 downloaded bytes**, including indexes, release metadata, replacements, and supplemental primary sources.

Final integrity verification recomputed all 365 successful downloads' byte counts and SHA-256 hashes: every value matched the manifest. All 319 indexed URLs have manifest entries; the report's local links and citation references resolve, and its counts agree with the reading record.

The seven indexed URLs returned 404:

| Indexed path                   | Retained working replacement          |
| ------------------------------ | ------------------------------------- |
| `/docs/index.md`               | `https://bun.com/docs.md`             |
| `/docs/runtime/index.md`       | `https://bun.com/docs/runtime.md`     |
| `/docs/bundler/index.md`       | `https://bun.com/docs/bundler.md`     |
| `/docs/test/index.md`          | `https://bun.com/docs/test.md`        |
| `/docs/guides/index.md`        | `https://bun.com/guides`              |
| `/docs/bundler/bytecode.md`    | No replacement confirmed in this pass |
| `/docs/bundler/executables.md` | No replacement confirmed in this pass |

Failures and replacements have separate manifest entries. An early broad blog URL extractor also tried **172 image-derived URLs** as articles. Those attempts are retained in [extraction diagnostics](../.research/bun/excluded-index-candidates.json); the corrected extractor follows article `href` values, and those image candidates are excluded from the final article-failure count.

**Downloading is not reading.** The conservative [reading record](../.research/bun/read-coverage.json) identifies **24 full source texts**, **13 selected-section reads**, **2 index scans**, **3 metadata inspections**, and **2 keyword-only searches**. **321 successful downloads remain classified as downloaded but not substantively reviewed.** Task-related release headings were searched across all 18 releases; only recorded sections count as substantive release reading.

The fully read material includes the core HTML/fullstack/CSS/loader/HMR pages, workspace/catalog/isolation/lockfile/lifecycle pages, TypeScript/checker pages, DOM/preload and parallel-test guides, installation/watch material, the 1.3.3 release, the historical text-lockfile article, and setup-bun's README. The report's decisions depend on these reviewed sources and the saved probes, not on unread archive contents.

### Reproduction

From the repository root, re-run the bounded archive with:

```sh
./node_modules/.bin/bun .research/bun/archive.ts
```

The script reuses successful cached sources; failed URLs are retried. The [probe workspace](../.research/bun/probes/package.json) has its own package manifest and lockfile. From `.research/bun/probes`, use the absolute path to Cinder's local Bun executable to install its dependencies and run:

```sh
"$BUN" install --frozen-lockfile --ignore-scripts --cache-dir .cache
"$BUN" capabilities.mjs
"$BUN" build-and-dom.mjs
"$BUN" aot-runtime.mjs
"$BUN" production-library.mjs
```

Set `BUN` to the repository's absolute `node_modules/.bin/bun` path first. The browser script documents ports **47731** (development fixture), **47732** (directory fixture), and **47733** (AOT fixture). Run the respective retained servers and `python3 browser.py`; for the corrected AOT-only check, serve `out/aot-root/server.js` with that directory as the working directory and use `python3 browser.py --case aot-production --output browser-aot.json`. It requires Python Playwright and the existing Chrome channel. The Bun/JavaScript browser test is independently runnable as `"$BUN" test ./playwright.test.ts`.

## 12. Handoff to the implementation agent

1. Continue from the successful root install and current exact catalog/runtime pins.
2. Complete token generation before dependent builds; make input changes regenerate the imported CSS during development.
3. Build/serve the docs with root-correct asset URLs and explicit deep-link routes. Verify the production output in a browser, including font requests and missing-asset behavior.
4. Use production JSX for the ESM library, external peer imports, explicit CSS exports, and TypeScript declaration emit. Inspect the packed artifact.
5. Run the existing local-runtime `bun run check` pipeline. Use the explicit preload pattern if component DOM tests are added; keep real-browser interaction/layout checks in Playwright.

[llms]: https://bun.sh/llms.txt
[github-latest]: https://api.github.com/repos/oven-sh/bun/releases/latest
[npm-bun]: https://registry.npmjs.org/bun/latest
[installation]: https://bun.com/docs/installation.md
[setup-bun]: https://github.com/oven-sh/setup-bun/blob/main/README.md
[npm-exec]: https://docs.npmjs.com/cli/v11/commands/npm-exec/
[release-133]: https://bun.com/blog/bun-v1.3.3.md
[release-136]: https://bun.com/blog/bun-v1.3.6.md
[release-1313]: https://bun.com/blog/bun-v1.3.13.md
[release-14]: https://bun.com/blog/bun-v1.4.md
[release-143]: https://bun.com/blog/bun-v1.4.3.md
[release-144]: https://bun.com/blog/bun-v1.4.4.md
[workspaces]: https://bun.com/docs/pm/workspaces.md
[catalogs]: https://bun.com/docs/pm/catalogs.md
[isolated]: https://bun.com/docs/pm/isolated-installs.md
[lockfile]: https://bun.com/docs/pm/lockfile.md
[filter]: https://bun.com/docs/pm/filter.md
[lifecycle]: https://bun.com/docs/pm/lifecycle.md
[pm]: https://bun.com/docs/pm/cli/pm.md
[bundler]: https://bun.com/docs/bundler.md
[fullstack]: https://bun.com/docs/bundler/fullstack.md
[html]: https://bun.com/docs/bundler/html-static.md
[hmr]: https://bun.com/docs/bundler/hot-reloading.md
[watch]: https://bun.com/docs/runtime/watch-mode.md
[css]: https://bun.com/docs/bundler/css.md
[loaders]: https://bun.com/docs/bundler/loaders.md
[routing]: https://bun.com/docs/runtime/http/routing.md
[typescript]: https://bun.com/docs/typescript.md
[typescript-67]: https://bun.com/docs/typescript-6.md
[check]: https://bun.com/docs/runtime/check.md
[ts-declarations]: https://www.typescriptlang.org/tsconfig/emitDeclarationOnly.html
[dom]: https://bun.com/docs/test/dom.md
[happy-dom]: https://bun.com/docs/guides/test/happy-dom.md
[testing-library]: https://bun.com/docs/guides/test/testing-library.md
[parallel]: https://bun.com/docs/test/parallel.md
[playwright-library]: https://playwright.dev/docs/library
[playwright-browsers]: https://playwright.dev/docs/browsers
