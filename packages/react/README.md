# @cinder/react

React Aria Components (**RAC**) with Carbon reference styling and Relay themes.
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
Import `@cinder/react/styles.css` once; it includes all token and component CSS.
React, React DOM, RAC, and `@internationalized/date` are external to the JS bundle.

```tsx
import { Button, Layer, Stack, TextField, Theme } from "@cinder/react";
import "@cinder/react/styles.css";

export function Settings() {
  return (
    <Theme theme="relay-light" locale="en-US">
      <Layer>
        <Stack gap={6}>
          <TextField label="Workspace name" defaultValue="Cinder studio" size="lg" />
          <Button onPress={() => console.log("Saved locally")}>Save workspace</Button>
        </Stack>
      </Layer>
    </Theme>
  );
}
```

## Relay themes

Use `theme="relay-light"` or `theme="relay-dark"` on the existing `Theme` component.
The first Relay slice styles Button, TextField, Select, Checkbox/CheckboxGroup,
Radio/RadioGroup, Switch, ContentSwitcher, and Dialog/Modal/Popover compositions.
The remaining families keep their baseline geometry with the selected theme's
tokens. The original `white`, `g10`, `g90`, and `g100` themes remain available.

- Button, TextField, and Select share `sm`/`md`/`lg`: 32/40/48px at a 16px root.
  Button defaults to `lg`; fields default to `md`. Button also supports 64/80px
  through `xl`/`2xl`. Switch has its own `sm`/`md` track geometry; Checkbox and Radio
  do not expose a size prop.
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

Relay uses native CSS `@scope` to stop styling at a nested Theme boundary, including
portals. It requires a browser that supports `@scope`. Normal styles are in the
`cinder` and `cinder-relay` cascade layers; `cinder-relay-forced-colors` applies
system colors in high-contrast mode. Unlayered application CSS can override them.
Reduced-motion preferences remove transitions and animation.

The running workspace's `/relay` page shows the states, token values, live
compositions, and customization examples. `docs/relay.md` records the specification.

## Composition contracts

- Use RAC's `onPress` for actions. Fields expose their upstream controlled/default
  value APIs. `Select` and `ComboBox` use the current `value`/`defaultValue`/`onChange`
  API; multiple selection uses `selectionMode="multiple"` and arrays of keys.
- Provide a visible `label` or accessible name. Field conveniences connect labels,
  descriptions, and `errorMessage`. `Form` defaults to native submit-time validation;
  `validationBehavior="aria"` opts into application-managed validation.
- Controls preserve upstream render props, events, and refs. Field wrappers expose
  `inputRef` separately from the outer field `ref` where the API specifies it.
- Cinder wrappers retain their base classes when `className` is customized. Direct
  RAC re-exports such as `MenuItem`, `ListBoxItem`, `Tab`, and `TreeItem` retain RAC's
  behavior: a custom class replaces the default. Include the `react-aria-*` class
  yourself to retain Cinder's stylesheet hooks.
- Dynamic collections need stable item IDs and `textValue` when children are more
  than plain text. Use upstream collection children/functions and selection types.
  Select options may use `Text slot="label"` and `Text slot="description"`; the
  description stays in the menu and is hidden in the selected value.
- TextField's `children` replaces its convenience anatomy. Retain RAC's `Label`,
  `Input`, `Text slot="description"`, and `FieldError` to keep their associations.
  Select's `children` describes its options, not a replacement trigger.
- `Theme` resets the layer to 0. Its `locale` controls formatting, `lang`, reading
  direction, and RAC keyboard direction; nested themes inherit the parent locale.
  Use `locale`, rather than setting a conflicting native `dir` prop.
- `Layer` advances to levels 1 and 2, then saturates. Cinder's Layer paints a nested
  surface. Cinder Popover, Modal, Tooltip, and Toast propagate theme/layer context
  through portals; React context providers alone do not propagate CSS inheritance.
  Local token overrides inherit through the DOM only. To customize a portal, put
  the override on its Popover/Modal or a theme selector that also matches the portal.
- Pair `DialogTrigger` with `Modal` or `Popover` and a named `Dialog`. Use a
  `Heading slot="title"` or `aria-label`; Escape restores trigger focus.

The exports include controls, text/number/date fields, selection, tables and other
collections, tabs, accordion, breadcrumbs, overlays, notifications, files,
pagination, content, layout, and shell primitives. Run the docs for all 45 families.

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

Supply IBM Plex or allow the fallback stack. For locally bundled fonts:

```sh
bun add @fontsource/ibm-plex-sans@5.3.0 @fontsource/ibm-plex-mono@5.3.0
```

```tsx
import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-500.css";
import "@fontsource/ibm-plex-sans/latin-600.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
```

If the app's bundler does not provide CSS import declarations, add
`declare module "*.css";` to an included `env.d.ts`. Apps that import date constructors
directly should declare `@internationalized/date@3.12.4` as a dependency too.

## License

Apache-2.0. See `LICENSE` and `NOTICE` shipped with this package. Carbon is an IBM
project; RAC is an Adobe project. Fonts retain their separate SIL Open Font License.
