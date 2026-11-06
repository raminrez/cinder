# @cinder/tokens

Carbon-derived tokens for Cinder **0.1.0**. Generated from pinned official packages:
`@carbon/themes` 11.85.0, `@carbon/layout` 11.63.0, `@carbon/type` 11.71.0, and
`@carbon/motion` 11.56.0.

## Exports

```tsx
import {
  breakpoints,
  foundations,
  isThemeName,
  nextLayer,
  themeNames,
  themes,
  token,
  typeStyles,
  type ThemeName,
  type LayerLevel,
  type TokenName,
  type TypeStyleName,
} from "@cinder/tokens";
import "@cinder/tokens/tokens.css";

token("text-primary"); // "var(--cinder-text-primary)"
themes.g90.background; // "#262626"
foundations["spacing-05"]; // "1rem"
typeStyles["fluid-heading-05"].breakpoints.md.fontSize; // "2.25rem"
nextLayer(2); // 2: Carbon has three contextual levels, 0–2
```

`@cinder/tokens/tokens.json` exports the full `themes`, `global`, `breakpoints`, and
`typeStyles` objects. Enable `resolveJsonModule` to import it in TypeScript. Use the
application's standard CSS declarations for stylesheet imports.

The generated theme maps contain **313 entries per theme**: 234 semantic color
tokens, `color-scheme` metadata, and 78 component tokens. The `global` map contains
**191 scalar** typography, spacing, size, motion, and other foundation values. Some
component-token values deliberately refer to contextual CSS variables.

## Typography and responsive data

`typeStyles` preserves **36 selected Carbon type definitions in full**, including
compact, legal, and fluid styles and the legacy display aliases. `TypeStyleName`
is their key union. Each definition retains its original property names and any
sparse `breakpoints` overrides from `@carbon/type`.

The scalar `foundations` entries and CSS variables describe **base values only**.
For example, `--cinder-fluid-heading-05-font-size` stays `2rem`; importing the CSS
does not apply breakpoint changes or interpolate fluid typography. Consumers can
use `typeStyles` together with `breakpoints` to implement their responsive rules.
An override may omit properties that continue from an earlier breakpoint, so it
must be applied cumulatively rather than treated as a complete independent style.

## Themes and layers

Use the React package's `Theme` and `Layer`, or the same attributes in other markup:

```html
<div data-cinder-theme="g10" data-cinder-layer="0">
  <section data-cinder-layer="1">A nested surface</section>
</div>
```

`white`, `g10`, `g90`, and `g100` define all semantic colors. Most contextual aliases
select suffixes 01/02/03 at levels 0/1/2. `border-subtle` selects 00/01/02 instead;
`layer-background` identifies the containing surface. These attributes establish
tokens; the React package supplies surface painting and component styling.

The CSS namespace is `--cinder-*`. Prefer semantic references such as
`var(--cinder-text-primary)` to hard-coded color values. The typed `token()` helper
accepts exported token names; contextual aliases are available directly in CSS.

## Local distribution and regeneration

From Cinder's root:

```sh
bun run build:tokens
bun run pack
```

Install `dist/packages/cinder-tokens-0.1.0.tgz` in another app. Install it alongside
the React tarball when using `@cinder/react`. The token package has no runtime npm
dependencies; CSS and JSON are pre-generated. The build copies the root license
and attribution into each package before packing.

## License

Apache-2.0, retaining Carbon's `Copyright 2015 IBM Corp.` attribution. Cinder changes
the namespace/serialization and introduces contextual aliases and foundation
conveniences. See `LICENSE` and `NOTICE`. Fonts are a separate consumer dependency.
