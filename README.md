# Cinder

A Carbon-aligned React component library built on React Aria Components (**RAC**),
with a Bun-native workspace and interactive documentation.

**0.1.0 · working name and package scope.** The library has 45 documented component
families, four themes, contextual layers, typed compositional APIs, and a live
reference. The packages are available as local tarballs.

## Run the site

Use Bun **1.4.4** (pinned in `.bun-version` and `package.json`). From this directory:

```sh
bun install --frozen-lockfile
bun dev
```

Open **http://localhost:3000**. `PORT` and `HOST` configure the server. The development
server bundles HTML, TSX, CSS, and fonts with React HMR. After changing token-generator
inputs, run `bun run build:tokens` to update the generated CSS.

```sh
bun run build
bun start
```

The production preview serves `dist/site`, including deep links and all emitted
assets. Stop the dev server first or use a different `PORT`.

## Use the library in another app

Build and pack from Cinder's root:

```sh
bun run pack
```

Then, in your React application, install **both tarballs in one command**:

```sh
bun add /absolute/path/to/cinder/dist/packages/cinder-react-0.1.0.tgz \
  /absolute/path/to/cinder/dist/packages/cinder-tokens-0.1.0.tgz \
  react@19.3.1 react-dom@19.3.1 react-aria-components@1.22.1
```

Packing resolves the source workspace/catalog protocols to registry-compatible
versions. `dist/packages/manifest.json` records the archive hashes. React/RAC stay
external, and the React package's CSS includes the token definitions.

```tsx
import { Button, Form, TextField, Theme } from "@cinder/react";
import "@cinder/react/styles.css";

export function Profile() {
  return (
    <Theme theme="g10" locale="en-US">
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          console.log(data.get("email"));
        }}
      >
        <TextField name="email" label="Email" type="email" isRequired />
        <Button type="submit">Save profile</Button>
      </Form>
    </Theme>
  );
}
```

Supply IBM Plex yourself, or use the CSS fallback stack. The site uses:

```sh
bun add @fontsource/ibm-plex-sans@5.3.0 @fontsource/ibm-plex-mono@5.3.0
```

```tsx
import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-500.css";
import "@fontsource/ibm-plex-sans/latin-600.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
```

For a TypeScript app without its bundler's CSS declarations, include
`declare module "*.css";` in an `env.d.ts`. Set `resolveJsonModule: true` if importing
`@cinder/tokens/tokens.json`. See the [React package guide](packages/react/README.md)
and [token guide](packages/tokens/README.md).

## Design and scope

Carbon supplies the design language: semantic tokens, the 2x grid, IBM Plex,
four themes, component geometry, state treatment, and content guidance. RAC
supplies accessible interaction, focus management, collections, and forms.
Cinder owns the component API, CSS, documentation, examples, and visual identity.

The target is Carbon's v11 visual vocabulary with explicit RAC adaptations. The
reference includes keyboard notes, source links, examples, and focused API notes.
The [coverage matrix](docs/coverage.md) lists supported variants and omissions.

- `Theme` selects `white`, `g10`, `g90`, or `g100`; `locale` controls reading and
  keyboard direction. `Layer` advances contextual surfaces. Portals retain context.
- RAC-native differences include Space-only Switch activation, radio-group
  ContentSwitcher, grid/treegrid collections, segmented date fields, and modal-default
  dialog popovers. They are documented with each component.
- Toast uses RAC's experimental API. The API is initial, and full Carbon React API
  compatibility is not a goal of this version. Manual assistive-technology auditing
  remains outstanding.

## Verify

```sh
bun run check
```

This runs formatting, Oxlint, type checking, unit tests, the production build, browser tests,
packing, and an independent tarball consumer. The consumer uses strict declaration
checking, builds outside this workspace, and exercises the installed packages in
a real browser. It needs registry access for its isolated dependency install.

Browser checks default to installed Google Chrome. To install it through Playwright:

```sh
bunx playwright install chrome
```

Use `PLAYWRIGHT_CHANNEL=msedge` with an installed supported channel if appropriate.
For formatting, linting, and type checking:

```sh
bun run format
bun run format:check
bun run lint
bun run lint:fix
bun run typecheck
```

Formatting uses native `bun fmt`, configured in `bunfig.toml`. Type checking uses
`bun check --no-script -p tsconfig.json`; `--no-script` selects Bun's checker rather
than the workspace's aggregate `check` script. TypeScript is required for `.d.ts`
generation and independent consumer checks.

Linting uses **Oxlint 1.91.0** through Bun, configured in `.oxlintrc.json`. Correctness
rules cover JavaScript, TypeScript, React hooks, and JSX accessibility; errors and
warnings fail the check. `lint:fix` applies safe automatic fixes. The
[tooling notes](docs/research-bun.md#oxlint-on-stable-bun) document its scope and
intentional accessibility exceptions.

The individual test commands are `bun test tests/unit`, `bun run test:browser`,
and (after packing) `bun run test:package`.
See [verification results](docs/verification.md) and the [visual critique](docs/visual-review.md).

## Research

- [Bun](docs/research-bun.md): current docs/releases, isolated installs, native
  HTML/HMR, production builds, declaration and testing capability probes.
- [Carbon](docs/research-carbon.md): foundations, component rules, visual/source
  comparisons, and the read-only Carbon and Carbon MCP reference repositories.
- [RAC](docs/research-rac.md): current APIs, composition contracts, and adaptations.
- [Prototype guide](docs/prototypes-guide.md): compare Field, Relay, and Index with
  Carbon and HeroUI using the development-only `/prototypes` page.
- [Design direction](docs/design-direction.md) and [implementation plan](docs/superpowers/plans/2026-11-05-cinder.md).

Reports distinguish full reads, targeted reads, and archived material. Downloaded
primary-source archives are in the ignored `.research/` directory.

## Project layout

- `packages/tokens` — Carbon-derived semantic tokens and theme generation.
- `packages/react` — styled RAC components and Carbon patterns.
- `apps/docs` — the Cinder website and interactive component reference.
- `scripts` — build, production preview, packing, and distribution verification.
- `tests` — behavioral and browser verification.

## License

[Apache-2.0](LICENSE), with [upstream attribution](NOTICE). Carbon is an IBM project;
RAC is an Adobe project. The site ships the IBM Plex SIL Open Font License and
runtime dependency notices in `dist/site/THIRD_PARTY_LICENSES.txt`. Font binaries
are not included in the component tarballs.
