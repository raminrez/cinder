# @cinder/react

Carbon-aligned React components built on React Aria Components (**RAC**).
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
Import `@cinder/react/styles.css` once; it includes the Carbon-derived token CSS.
React, React DOM, RAC, and `@internationalized/date` are external to the JS bundle.

```tsx
import { Button, Layer, Stack, TextField, Theme } from "@cinder/react";
import "@cinder/react/styles.css";

export function Settings() {
  return (
    <Theme theme="g10" locale="en-US">
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
- `Theme` resets the layer to 0. Its `locale` controls formatting, `lang`, reading
  direction, and RAC keyboard direction; nested themes inherit the parent locale.
  Use `locale`, rather than setting a conflicting native `dir` prop.
- `Layer` advances to levels 1 and 2, then saturates. Cinder's Layer paints a nested
  surface. Cinder Popover, Modal, Tooltip, and Toast propagate theme/layer context
  through portals; React context providers alone do not propagate CSS inheritance.
- Pair `DialogTrigger` with `Modal` or `Popover` and a named `Dialog`. Use a
  `Heading slot="title"` or `aria-label`; Escape restores trigger focus.

The exports include controls, text/number/date fields, selection, tables and other
collections, tabs, accordion, breadcrumbs, overlays, notifications, files,
pagination, content, layout, and shell primitives. Run the docs for all 45 families.

## Visual and behavioral boundary

Cinder follows Carbon v11 tokens and visual rules; this is an initial independent
API. RAC Switch uses Space (Enter can submit a containing form). ContentSwitcher
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
