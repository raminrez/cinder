# @cinder/react

React Aria Components (**RAC**) with Carbon reference styling, Relay themes, and
reusable Frame foundations.
Version **0.1.0**; Cinder and the package scope are working names.

## Installation

In the Cinder workspace, run `bun run pack`. In a separate React app:

```sh
bun add /path/to/cinder/dist/packages/cinder-react-0.1.0.tgz \
  /path/to/cinder/dist/packages/cinder-tokens-0.1.0.tgz \
  react@19.3.1 react-dom@19.3.1 react-aria-components@1.22.1
```

Tokens are an explicit peer so an application provides one shared copy. Both local
archives are needed because the scope has not been published. The tested
baseline is React/React DOM 19.3.1 and RAC 1.22.1. The declared peer ranges allow
React 19 and RAC 1.22+, but those other versions have not been independently tested.

ESM JavaScript and TypeScript declarations are exported from `@cinder/react`.
Import `@cinder/react/styles.css` once; this static stylesheet includes all tokens,
themes, and component CSS. No Cinder CSS compiler is required.
React, React DOM, RAC, and `@internationalized/date` are external to the JS bundle.

```tsx
import { Button, Layer, Stack, TextField, Theme } from "@cinder/react";
import "@cinder/react/styles.css";

export function Settings() {
  return (
    <Theme theme="frame-light" locale="en-US">
      <Layer>
        <Stack gap={6}>
          <TextField label="Workspace name" defaultValue="Cinder studio" />
          <Button onPress={() => console.log("Saved locally")}>Save workspace</Button>
        </Stack>
      </Layer>
    </Theme>
  );
}
```

## Frame foundations — Phase 1

The approved `frame-light` and `frame-dark` foundations and customization contracts
below are implemented. These themes are additive: `white`, `g10`,
`g90`, `g100`, `relay-light`, and `relay-dark` keep their existing defaults.
Each Frame map contains 343 entries, including 25 theme-owned typography/size
foundation overrides. The six older maps, 191 global foundations, and 36 structured
Carbon typography objects retain their values; see the
[token guide](../tokens/README.md#authored-frame-values).

Representative installed-package proof has passed for native CSS, real Bun CSS
Modules, and Tailwind 4.3.5. The workspace's
[Phase 1 verification](../../docs/verification.md#frame-phase-1) records the executed checks; the
[coverage matrix](../../docs/coverage.md) records implemented family scope.

Minimum heights for ordinary Buttons and single-line fields at a 16px root are:

| Theme family | Button, size omitted | Field, size omitted | Explicit `sm` / `md` / `lg` |
| ------------ | -------------------- | ------------------- | --------------------------- |
| Carbon/Relay | 48px                 | 40px                | 32 / 40 / 48px              |
| Frame        | 44px                 | 44px                | 32 / 44 / 48px              |

Fields still default to `size="md"`. Button retains its resolved
`data-size="lg"` when size is omitted; Frame distinguishes omission internally
to use 44px. That internal marker is not a public CSS hook. Use the `size` prop
for explicit sizing. Button's `xl` and `2xl` remain 64px and 80px in every theme.
TextArea keeps its multiline `rows` contract rather than a size prop.

These are foundation contracts, not a claim that the full catalog has Frame
styling. The [Phase 2 slice](../../docs/component-library-plan.md#phase-2--first-complete-frame-slice)
owns the fourteen complete entries, persistent field guidance, and attached
recovery presentation. Phase 1 retains the convenience fields' existing DOM order
and help/error presentation.

## Button and Link

Use **Button** to perform an action and **Link** to navigate. Choose one primary
action per decision. Destructive variants need explicit wording such as “Delete
draft”; color alone does not explain the consequence.

The canonical [Button stories](../../apps/storybook/stories/Button.stories.tsx) and
[Link stories](../../apps/storybook/stories/Link.stories.tsx) cover appearance,
keyboard/pointer interaction, pending and recovery, customization, long labels,
and a Hebrew `Theme locale` boundary. They inherit Frame light/dark from Storybook's
preview. Story coverage is distinct from the executed browser/AT evidence in
the [verification record](../../docs/verification.md).

### Button props and behavior

| Prop                    | Contract                                                                                                                                                                                  |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`               | `primary` (default), `secondary`, `tertiary`, `ghost`, `danger`, `danger-tertiary`, or `danger-ghost`                                                                                     |
| `size`                  | Omitted: Frame 44px, Carbon/Relay 48px. Explicit `sm`, `md`, `lg`, `xl`, `2xl` use the [theme minimums](#frame-foundations--phase-1).                                                     |
| `iconOnly`              | Defaults to `false`. Gives the icon a square target at the resolved size; supply `aria-label` or `aria-labelledby` on Button.                                                             |
| `isDisabled`            | Native disabled button: unavailable, skipped in tab order, and does not activate.                                                                                                         |
| `isPending`             | Application-owned pending state. RAC prevents press/hover interaction and repeat activation while retaining focusability.                                                                 |
| `pendingLabel`          | Accessible progress label; defaults to `"Pending"`. Supply the operation in the application's language, such as `"Saving draft"`.                                                         |
| `onPress`               | RAC's normalized mouse, touch, keyboard, and assistive-technology activation callback. Returning a promise does not set `isPending` automatically.                                        |
| `type`, `name`, `value` | Native form contract. `type` defaults to `"button"`; use `"submit"` explicitly. RAC temporarily changes a pending submit button to `type="button"` to prevent implicit repeat submission. |

Frame's primary action is neutral, secondary is a quiet fill, tertiary is outlined,
and ghost is unfilled. The three danger variants retain destructive text/fill
meaning. Hover and press use RAC state; keyboard focus has an external two-pixel
outline with a three-pixel offset. Minimum heights and labels can grow with text.
The compact 32px size is intentional; use the ordinary 44px minimum for comfortable
standalone targets.

#### Pending, naming, and request ownership

Keep the action's children and accessible label stable while pending to preserve
its identity and dimensions. Frame and Relay visually replace the retained content
with the centered progress mark. `isPending` keeps focus; adding `isDisabled` also
applies native disabling and loses that focus-retaining contract.

RAC 1.22.1 includes the progress label in its pending announcement and browser
accessible name: for example, **“Save draft” → “Save draft Saving draft”**. The action
text is retained, not replaced by “Saving”. The nested progressbar is independently
named by `pendingLabel`. Some DOM-based accessible-name helpers omit this embedded
progress text; the browser accessibility tree is the authority for the combined
name. Cinder does not freeze or rewrite caller-authored children: a `children`
render function can still change its text, and the caller owns that label change.

Applications own the request, pending lifetime, failure message, and retry. Keep
recoverable data in place, announce a consequential failure near the action, and
let the same action retry. The **Save and retry** story demonstrates this complete
path with a local simulated request and deterministic interaction checks. It uses
`isPending` without `isDisabled`, preserves focus and button dimensions, and keeps
the draft after failure. Localize both the action text and `pendingLabel`; a
spinner alone cannot name an icon-only action.

```tsx
<Button isPending={isSaving} pendingLabel="Saving draft" onPress={saveDraft}>
  Save draft
</Button>

<Button variant="ghost" iconOnly aria-label="Copy workspace link" onPress={copyLink}>
  <Icon name="copy" />
</Button>
```

### Link props and navigation

An enabled, nonempty `href` renders a native `<a>`, preserving browser navigation,
Enter activation, open-in-new-tab behavior, and upstream `target`, `rel`, and
`download` props. Space is not link activation. Use an actual destination rather
than an `onPress` action disguised as navigation. Applications own any router
integration and current-page `aria-current` value.

- `inline` defaults to false. Standalone links acquire an underline on interaction;
  `inline` keeps it visible within prose. It changes decoration, not DOM display
  or navigation. Frame hover/press strengthens the underline without moving text.
- `isDisabled` removes navigation and activation, exposes `aria-disabled="true"`,
  and skips the link in tab order. RAC renders a `<span role="link">` rather than
  leaving a disabled-looking anchor with a live destination. Explain dependencies
  in nearby text.
- Without a nonempty `href`, RAC likewise renders a `<span role="link">`. This
  upstream behavior is preserved, but it has no native URL to open or copy.
- Link text names the destination. Name icon-only links explicitly; Cinder `Icon`
  is decorative by default. If opening a new tab, include that information in the
  link text when it would otherwise surprise the user.

```tsx
<p>
  Read the{" "}
  <Link href="/guidelines" inline>
    publishing guidelines
  </Link>{" "}
  before sharing.
</p>
```

### DOM, refs, and customization

| Component/part   | Actual target and responsibility                                                                                                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button           | One `<button>` with `cinder-button`; `ref`, `className`, and `style` target it.                                                                                                                                                 |
| Pending progress | A `div.cinder-spinner` with `role="progressbar"` inside Button while pending. RAC supplies the announcement relationship; Cinder supplies the indeterminate appearance and `pendingLabel`.                                      |
| Link             | `cinder-link` on the anchor, or on RAC's fallback span. `className`, `style`, and the ref reach that same element. The inherited ref type is `HTMLAnchorElement`; it is an actual anchor only with an enabled, nonempty `href`. |

Both components preserve RAC `children`, `className`, and `style` render functions.
Custom classes are appended to the Cinder root hook. A `render` function must
return one correct native element and pass all supplied DOM props and the ref
through. Button expects `<button>`; Link's render props distinguish `<a>` from
`<span>` with `"href" in domProps`. Replacing handlers, IDs, or the element type can
break the interaction and labeling contracts.

Appearance hooks are `data-variant`, `data-size`, and `data-icon-only` on Button,
and `data-inline` on Link. RAC owns `data-hovered`, `data-pressed`, `data-focused`,
`data-focus-visible`, and `data-disabled` on both; Button additionally exposes
`data-pending`, and Link exposes `data-current`. Drive those states with props and
real input rather than writing the attributes yourself. Button's omitted-size
marker remains private.

Use public semantic variables such as `--cinder-button-primary`,
`--cinder-button-primary-hover`, `--cinder-button-primary-active`,
`--cinder-text-on-color`, `--cinder-link-primary`, `--cinder-focus`, and
`--cinder-control-radius`, or an ordinary custom class. The stories show root refs,
class/style render functions, and a custom DOM render while retaining the base
classes, labels, and interaction. Private recipe variables are not customization
contracts. See [CSS integration](#css-integration) for cascade order.

## Relay themes

Use `theme="relay-light"` or `theme="relay-dark"` on the existing `Theme` component.
The first Relay slice styles Button, TextField, Select, Checkbox/CheckboxGroup,
Radio/RadioGroup, Switch, ContentSwitcher, and Dialog/Modal/Popover compositions.
The remaining families keep their baseline geometry with the selected theme's
tokens. The original `white`, `g10`, `g90`, and `g100` themes remain available.

- Switch has its own `sm`/`md` track geometry; Checkbox and Radio do not expose
  a size prop.
- Controls, popovers, and dialogs have 8/12/20px corners. Labels and control text
  use IBM Plex Sans at 14/20px; buttons and field labels use weight 500.
- `variant` applies to Button: `primary`, `secondary`, `tertiary`, `ghost`, `danger`,
  `danger-tertiary`, and `danger-ghost`. Validation is a field state, not a variant.
- `isPending` keeps a Button focusable and prevents repeat activation. Keep its
  children stable; Relay replaces their appearance with a progress mark without
  changing the width. `pendingLabel` labels that progress mark and defaults to
  `"Pending"`; localize it alongside the action, e.g. `pendingLabel="Saving"`.
  Applications own when pending starts and ends. Icon-only buttons need an
  `aria-label`.

Relay uses native CSS `@scope` to stop styling at a nested Theme boundary,
including portals. See [CSS integration](#css-integration) for cascade order and
browser requirements. Reduced-motion preferences remove transitions and animation.

The running workspace's `/relay` page shows the states, token values, live
compositions, and customization examples. `docs/relay.md` records the specification.

## Composition contracts

- Use RAC's `onPress` for actions. Fields expose their upstream controlled/default
  value APIs. `Select` and `ComboBox` use the current `value`/`defaultValue`/`onChange`
  API; multiple selection uses `selectionMode="multiple"` and arrays of keys.
- Provide a visible `label` or accessible name. Field conveniences connect labels,
  descriptions, and `errorMessage`. `Form` defaults to native submit-time validation;
  `validationBehavior="aria"` opts into application-managed validation.
- Controls preserve upstream render props, events, and refs. TextField and TextArea
  expose a `ref` to the outer `div` and an `inputRef` to the default input or textarea.
  With custom children, supply the control ref yourself. SearchField retains its
  `inputProps` contract.
- Cinder wrappers retain their base classes when `className` is customized. Direct
  RAC re-exports such as `Label`, `Input`, `Text`, `FieldError`, `MenuItem`,
  `ListBoxItem`, `Tab`, and `TreeItem` retain RAC's behavior: a custom class replaces
  the default. Include the `react-aria-*` class yourself to retain the existing
  stylesheet hooks. Raw Label and Text accept a string `className`; Input and
  FieldError also accept class render functions.
- Dynamic collections need stable item IDs and `textValue` when children are more
  than plain text. Use upstream collection children/functions and selection types.
  Select options may use `Text slot="label"` and `Text slot="description"`; the
  description stays in the menu and is hidden in the selected value.
- TextField and TextArea `children` replace their convenience anatomy. Retain RAC's
  `Label`, `Input` (or raw RAC TextArea), `Text slot="description"`, and `FieldError`
  to keep their associations. Select's `children` remains
  its option collection (including item render functions), not a replacement
  trigger; its generic item and single/multiple value types are preserved.
- Pair `DialogTrigger` with `Modal` or `Popover` and a named `Dialog`. Use a
  `Heading slot="title"` or `aria-label`; Escape restores trigger focus.

The exports include controls, text/number/date fields, selection, tables and other
collections, tabs, accordion, breadcrumbs, overlays, notifications, files,
pagination, content, layout, and shell primitives. Run the docs for all 45 families.

### Default and custom field anatomy

Default field roots keep `cinder-field` and their family classes, such as
`cinder-text-field`, `cinder-text-area`, and `cinder-select`. Phase 1 adds these
stable BEM-style hooks to Cinder-owned default anatomy alongside the existing classes:

| Hook                        | Default part                                   |
| --------------------------- | ---------------------------------------------- |
| `cinder-field__label`       | Associated label                               |
| `cinder-field__control`     | Input, textarea, or field control              |
| `cinder-field__help`        | Help/error container; also `cinder-field-help` |
| `cinder-field__description` | Description text                               |
| `cinder-field__error`       | Validation error                               |
| `cinder-select__value`      | Selected value                                 |
| `cinder-select__listbox`    | Options in the detached Select popover         |

RAC classes such as `react-aria-Label`, `react-aria-Input`, `react-aria-Text`,
`react-aria-FieldError`, `react-aria-SelectValue`, and `react-aria-ListBox` are
retained on the default parts, as are existing Cinder family/part classes.
RAC slots establish relationships; the BEM classes provide styling hooks.
State selectors belong on the element that owns the state: for example,
`.cinder-field[data-invalid]` for the field and
`.cinder-field__control[data-focused]` for a RAC Input's focus state.

The convenience API supplies the default label → control → help/error anatomy:

```tsx
<TextField
  name="email"
  label="Work email"
  type="email"
  description="Use your work address."
  errorMessage="Enter a valid work email."
  isRequired
/>
```

To retain this styling in custom children, supply both the raw RAC classes and
the part hooks explicitly:

```tsx
import { useRef } from "react";
import { FieldError, Input, Label, Text, TextField } from "@cinder/react";

export function WorkEmail() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <TextField name="email" type="email" isRequired>
      <Label className="react-aria-Label cinder-field__label">Work email</Label>
      <Input ref={inputRef} className="react-aria-Input cinder-field__control" />
      <div className="cinder-field-help cinder-field__help">
        <Text slot="description" className="react-aria-Text cinder-field__description">
          Use your work address.
        </Text>
        <FieldError className="react-aria-FieldError cinder-field__error">
          Enter a valid work email.
        </FieldError>
      </div>
    </TextField>
  );
}
```

With the current help/error styling, a nonempty error replaces the visible
description in that container. Persistent guidance and attached recovery are
Phase 2 work. A class render function on Input or FieldError must likewise return
the raw class and BEM hook if it should retain this styling.

## Theme, locale, and portals

`Theme` is the coherent appearance and locale boundary; `useTheme()` exposes its
effective theme, layer, direction, language, and appearance class.

- An omitted `theme` selects `white`, including in nested Themes. Every Theme
  resets the layer to 0. `Layer` advances to 1, then 2, then saturates at 2.
- `locale` controls formatting, RAC translations, reading direction, and keyboard
  direction. Omitted locale uses the effective surrounding RAC locale.
- HTML language is `lang ?? effectiveRACLocale`. An explicit `lang=""` is preserved.
  A nested Theme without `lang` computes its language from its own effective locale
  again; it does not inherit an outer Theme's explicit language override.
- `appearanceClassName?: string` is the portable recipe. Omission inherits the
  parent's effective recipe, a string replaces it, and `""` clears it. Clearing
  the class does not cancel ordinary CSS inheritance.

The effective appearance class is applied to the Theme root and four detached
roots: Popover, ModalOverlay, Tooltip, and ToastRegion. Those roots also receive
theme/layer attributes, direction, and language, including updates while open.
Ordinary Theme `className`, `style`, `id`, event handlers, and arbitrary props are
not copied to portals.
Declare the variables and fonts a recipe needs on the recipe's matched roots;
variables inherited only from a page ancestor cannot reach detached content.

A raw nested `I18nProvider` changes RAC locale but does not update Cinder's portal
boundary. Native `lang`/`dir` attributes on Layer are DOM-local. Introduce a nested
`Theme` when a locale or language change must stay coherent through portals.
An explicit `lang` on Popover, Modal, or Tooltip overrides the bridged HTML
language, including `lang=""`; it does not change formatting or direction.

ToastRegion uses the recipe at its `ToastProvider`, not the Theme of a descendant
calling `useToast()`. Theme changes around that provider update its region while
preserving the provider's queue.

### A portable appearance recipe

This recipe supplies its own variables at every matching root. The scoped part
selectors stop at nested Theme boundaries and start again on matching portal roots.

```css
/* workspace.css */
.workspace-appearance {
  --cinder-focus: #0b57b5;
  --workspace-label-weight: 600;
}

@scope (.workspace-appearance) to ([data-cinder-theme]) {
  .cinder-field__label {
    font-weight: var(--workspace-label-weight);
  }

  .cinder-select__listbox {
    padding: 0.5rem;
  }
}
```

```tsx
import {
  Button,
  Dialog,
  DialogTrigger,
  Heading,
  ListBoxItem,
  Modal,
  Select,
  TextField,
  Theme,
} from "@cinder/react";
import "@cinder/react/styles.css";
import "./workspace.css";

export function WorkspaceSharing() {
  return (
    <Theme theme="frame-light" locale="en-US" appearanceClassName="workspace-appearance">
      <TextField label="Workspace name" defaultValue="Cinder studio" />
      <DialogTrigger>
        <Button variant="secondary">Edit sharing</Button>
        <Modal isDismissable>
          <Dialog>
            <Heading slot="title">Workspace sharing</Heading>
            <TextField label="Invite by email" type="email" />
            <Select label="Access" defaultValue="viewer">
              <ListBoxItem id="viewer">Viewer</ListBoxItem>
              <ListBoxItem id="editor">Editor</ListBoxItem>
            </Select>
            <Button slot="close">Done</Button>
          </Dialog>
        </Modal>
      </DialogTrigger>
    </Theme>
  );
}
```

The label rule reaches both fields, and the listbox rule reaches the Select's
second portal. A selector depending on a page-only ancestor would not do that.

### Overlay targets

Popover and Tooltip keep `className`, `style`, and `ref` on the same portalled
surface (`cinder-popover` / `cinder-tooltip`). Their custom classes merge with the
base and effective appearance classes.

Modal has two elements, with additive access to each:

| Modal prop                                              | Target                                |
| ------------------------------------------------------- | ------------------------------------- |
| `className`, `ref`                                      | Inner `cinder-modal` surface          |
| `modalStyle`                                            | Inner `cinder-modal` surface          |
| `overlayClassName`, `overlayRef`                        | Outer `cinder-modal-overlay` backdrop |
| `style`, `render`, native props such as `id` and `lang` | Outer `cinder-modal-overlay` backdrop |

The inherited appearance class and theme/layer/language attributes are on the
outer overlay; the inner surface inherits through it. `className` and
`overlayClassName` accept strings or RAC render functions and retain their base
classes. `style` and `modalStyle` accept inline styles or RAC style render functions.

## CSS integration

The distributed stylesheet uses one top-level `cinder` cascade layer, ordered
internally as `cinder.tokens`, `cinder.reset`, `cinder.components`, `cinder.themes`,
and `cinder.accessibility`. Normal unlayered application CSS wins over Cinder's
normal layered declarations. Native nesting, cascade layers, and `@scope` require
a modern browser. Current browser verification is Chromium-only; see the
[verification record](../../docs/verification.md) for the tested scope.

Use ordinary CSS or CSS Modules with your application's bundler. To adapt the
recipe above to a CSS Module, rename `.workspace-appearance` to `.appearance`
and keep the Cinder part selectors global: `:global(.cinder-field__label)` and
`:global(.cinder-select__listbox)`. Import the module as `styles`, then pass
`appearanceClassName={styles.appearance}`. The variables stay on the recipe class
itself so each portal can resolve them.

Carbon and Relay boundaries keep their typography defaults. Baseline styles for
raw RAC parts are scoped within `[data-cinder-theme]`. A raw RAC component imported
directly inside Theme is indistinguishable from the same component re-exported by
Cinder and receives those styles. The boundary isolates neighboring raw RAC
controls outside it, not raw components intentionally placed inside it.

### Tailwind

The isolated Phase 1 fixture pins both **Tailwind CSS** and **`@tailwindcss/cli`**
to **4.3.5**, with real preflight and generated utilities. Establish this order
before the imports in the application's CSS entry:

```css
@layer theme, base, cinder, components, utilities;
@import "tailwindcss";
@import "@cinder/react/styles.css";
```

Cinder already declares its own layer, so import it without a second `layer(cinder)`
wrapper. This order places preflight before Cinder and application components and
utilities after it. With this CSS entry, the Cinder stylesheet is already imported
once. Tailwind is optional application build tooling, not a Cinder runtime
dependency. The [Phase 1 verification](../../docs/verification.md#frame-phase-1)
records the passing installed-consumer proof for this pinned version.

### Installed-package fixture commands

From Cinder's root:

```sh
bun run build
bun scripts/pack.ts
bun run test:package
```

The [consumer fixtures](../../tests/fixtures/consumer/README.md) install both
tarballs into two isolated apps with no workspace aliases. Both use `strict: true`
and `skipLibCheck: false`. The native app builds `index.html` for Carbon/Relay and
`frame.html` for plain CSS and a real Bun CSS Module. The second app compiles
`tailwind.css` through the pinned CLI and builds `tailwind.html`, importing the
generated CSS once. The verifier drives both production builds in Chromium.

## Visual and behavioral boundary

Cinder's original themes follow Carbon v11; Relay is an authored extension using
the same initial independent API. RAC Switch uses Space (Enter can submit a containing form). ContentSwitcher
uses radio-group semantics; use Tabs for tab-to-panel relationships. Table, GridList,
and TagGroup are interactive grids; Tree is a treegrid. Date inputs are segmented,
and dialog Popover uses RAC's modal focus model. NativeSelect remains available for
native select behavior. Toast relies on RAC's `UNSTABLE_*` APIs and is experimental.

Carbon variants such as AI label, toggletip, advanced shell panels, selectable tiles,
and advanced table features are not implied by a similarly shaped primitive. See
the workspace's `docs/coverage.md` for the exact supported scope and verification.

## Fonts and TypeScript

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

IBM Plex Mono is separate and optional for code, date segments, and other
`font-mono` roles in any theme; otherwise those roles use the monospace fallback:

```sh
bun add @fontsource/ibm-plex-mono@5.3.0
```

```tsx
import "@fontsource/ibm-plex-mono/latin-400.css";
```

If the app's bundler does not provide CSS import declarations, add
`declare module "*.css";` to an included `env.d.ts`. Apps that import date constructors
directly should declare `@internationalized/date@3.12.4` as a dependency too.

## License

Apache-2.0. See `LICENSE` and `NOTICE` shipped with this package. Carbon is an IBM
project; RAC is an Adobe project. Fonts retain their separate SIL Open Font License.
