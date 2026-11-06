# Cinder

A React component library built on React Aria Components (**RAC**), with
Frame components, Carbon/Relay themes, and Storybook for component development.

**0.1.0 · working name and package scope.** The library has 45 documented component
families, eight themes (four Carbon, two Relay, two Frame), contextual layers, and
typed compositional APIs. The packages are available as local tarballs.

**[Open Relay](http://127.0.0.1:3000/relay)** for buttons and fields across sizes and
states, live validation, selection controls, an invitation dialog, tokens, and API
guidance. See the [Relay specification](docs/relay.md) for its implemented scope.

**[Try Frame settings](http://127.0.0.1:3000/prototypes?variant=frame&view=settings)**
in the development-only `/prototypes` comparison. Start with the [design system](docs/design-system.md),
[visual foundations](DESIGN.md), and [ordered library plan](docs/component-library-plan.md).
Frame foundations are implemented in the packages under Phase 1, including
additive `frame-light` / `frame-dark` themes and public customization contracts.
Representative installed-package proof has passed; see the
[Phase 1 verification](docs/verification.md#frame-phase-1) for its scope.
Phase 2 develops the fourteen-entry Frame slice in Storybook, starting with Button
and Link. The documentation website follows the component work; Figma is the final
handoff.

## Develop components in Storybook

```sh
bun install --frozen-lockfile
bun run storybook
```

Use the theme toolbar to review Frame light and dark. Stories import the public
packages, with one library stylesheet in the preview. The workflow builds package
output before starting and refreshes it when component or token sources change.

Build the static Storybook:

```sh
bun run build:storybook
```

See the [Storybook workspace guide](apps/storybook/README.md) for commands, story
conventions, and the current batch's scope.

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
external. One static `@cinder/react/styles.css` import includes all tokens, themes,
and component styles; no Cinder CSS compiler is required.

```tsx
import { Button, Form, TextField, Theme } from "@cinder/react";
import "@cinder/react/styles.css";

export function Profile() {
  return (
    <Theme theme="frame-light" locale="en-US">
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

Frame uses a system sans-serif stack and needs no web-font installation. Carbon
and Relay retain IBM Plex Sans with CSS fallbacks. To match their example typography:

```sh
bun add @fontsource/ibm-plex-sans@5.3.0
```

```tsx
import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-500.css";
import "@fontsource/ibm-plex-sans/latin-600.css";
```

For code and other monospace roles, IBM Plex Mono is a separate optional install;
otherwise the monospace fallback is used:

```sh
bun add @fontsource/ibm-plex-mono@5.3.0
```

```tsx
import "@fontsource/ibm-plex-mono/latin-400.css";
```

For a TypeScript app without its bundler's CSS declarations, include
`declare module "*.css";` in an `env.d.ts`. Set `resolveJsonModule: true` if importing
`@cinder/tokens/tokens.json`. See the [React package guide](packages/react/README.md)
and [token guide](packages/tokens/README.md).

## Design and scope

Carbon supplies the reference tokens, 2x grid, IBM Plex, and original four themes.
Relay adds authored light/dark palettes, neutral actions, rounded controls, and
separate error borders and focus rings. Frame adds its selected light/dark roles,
system typography, and 44px ordinary controls. RAC supplies accessible interaction,
focus management, collections, and forms. Cinder owns the component API, static CSS,
documentation, and examples.

The `/components` reference retains Carbon's v11 vocabulary with explicit RAC
adaptations. `/relay` demonstrates the first reusable slice using the same components.
Relay's first verified slice covers Button, TextField, Select, Checkbox, Radio,
Switch, ContentSwitcher, and Dialog/Popover composition. Other families retain
their baseline styling; the [coverage matrix](docs/coverage.md) records the scope.

- Phase 1 adds `frame-light` and `frame-dark` alongside `white`, `g10`, `g90`,
  `g100`, `relay-light`, and `relay-dark`. The six existing themes keep their defaults.
  Frame's ordinary Button/field height is 44px with omitted size; explicit
  `sm`/`md`/`lg` is 32/44/48px. Button's `xl`/`2xl` remains 64/80px.
- `Theme` defaults to `white` and resets the contextual layer to 0. `locale` owns
  formatting and reading/keyboard direction; `Layer` advances to 1 and 2, then
  saturates. Detached overlays retain the effective theme, layer, direction, and
  language. `appearanceClassName` carries an explicit appearance recipe to their
  roots: omission inherits, a string replaces, and `""` clears it. Ordinary Theme
  `className` and `style` stay local.
- RAC-native differences include Space-only Switch activation, radio-group
  ContentSwitcher, grid/treegrid collections, segmented date fields, and modal-default
  dialog popovers. They are documented with each component.
- Toast uses RAC's experimental API. The API is initial, and full Carbon React API
  compatibility is not a goal of this version. Manual assistive-technology auditing
  remains outstanding.

The [React package guide](packages/react/README.md#composition-contracts) documents
field root/part hooks, default and custom RAC composition, and Modal's distinct
surface/backdrop targets. Its [styling guide](packages/react/README.md#css-integration)
covers the single top-level `cinder` cascade layer, plain CSS, CSS Modules, and the
pinned Tailwind fixture. Native CSS nesting, cascade layers, and `@scope` require
a modern browser; current browser evidence is Chromium-only.

## Verify

```sh
bun run check
```

This runs formatting, Oxlint, type checking, unit tests, the production build, browser tests,
packing, and two independent tarball consumers. They use strict declaration
checking, build outside this workspace, and exercise native CSS, Bun CSS Modules,
and pinned Tailwind 4.3.5 in a real browser. Their isolated dependency installs need
registry access.

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
See the [consumer fixture commands](tests/fixtures/consumer/README.md),
[verification results](docs/verification.md#frame-phase-1), and the [visual critique](docs/visual-review.md).

## Research

- [Bun](docs/research-bun.md): current docs/releases, isolated installs, native
  HTML/HMR, production builds, declaration and testing capability probes.
- [Carbon](docs/research-carbon.md): foundations, component rules, visual/source
  comparisons, and the read-only Carbon and Carbon MCP reference repositories.
- [RAC](docs/research-rac.md): current APIs, composition contracts, and adaptations.
- [Prototype guide](docs/prototypes-guide.md): compare Field, Relay, Index, and Frame
  with Astryx, Carbon, and HeroUI using the development-only `/prototypes` page.
- [Astryx](docs/research-astryx.md) and [HeroUI](docs/research-heroui.md): visual,
  anatomy, customization, and implementation findings with versioned evidence.
- [Design direction](docs/design-direction.md), [system specification](docs/design-system.md),
  and [Frame library plan](docs/component-library-plan.md). The
  [original implementation plan](docs/superpowers/plans/2026-11-05-cinder.md) remains historical context.

Reports distinguish full reads, targeted reads, and archived material. Downloaded
primary-source archives are in the ignored `.research/` directory.

## Project layout

- `packages/tokens` — Carbon-derived foundations, authored Relay/Frame values, and theme generation.
- `packages/react` — styled RAC components and composition patterns.
- `apps/docs` — the Cinder website and interactive component reference.
- `scripts` — build, production preview, packing, and distribution verification.
- `tests` — behavioral and browser verification.

## License

[Apache-2.0](LICENSE), with [upstream attribution](NOTICE). Carbon is an IBM project;
RAC is an Adobe project. The site ships the IBM Plex SIL Open Font License and
runtime dependency notices in `dist/site/THIRD_PARTY_LICENSES.txt`. Font binaries
are not included in the component tarballs.
