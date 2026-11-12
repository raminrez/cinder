# @cinder/tokens

Carbon-derived foundations and authored Relay and Frame tokens for Cinder **0.1.0**.
The Carbon baseline is generated from pinned official packages:
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
  type ThemeToken,
  type FoundationToken,
  type LayerLevel,
  type TokenName,
  type TypeStyleName,
} from "@cinder/tokens";
import "@cinder/tokens/tokens.css";

token("text-primary"); // "var(--hashti-text-primary)"
themes.g90.background; // "#262626"
themes["relay-light"].background; // "#f5f5f5"
themes["frame-light"].background; // "#f5f6f8"
themes["frame-dark"]["size-md"]; // "2.75rem": Frame's 44px minimum at 16px root size
token("control-radius"); // "var(--hashti-control-radius)": an authored-theme token
token("font-sans"); // A live CSS reference; follows the nearest theme/override
foundations["spacing-05"]; // "1rem"
foundations["size-md"]; // "2.5rem": the unchanged legacy foundation
typeStyles["fluid-heading-05"].breakpoints.md.fontSize; // "2.25rem"
nextLayer(2); // 2: Carbon has three contextual levels, 0–2
```

`@cinder/tokens/tokens.json` exports the full `themes`, `global`, `breakpoints`, and
`typeStyles` objects. Enable `resolveJsonModule` to import it in TypeScript. Use the
application's standard CSS declarations for stylesheet imports.

The four Carbon maps contain **313 entries per theme**: 234 semantic color
tokens, `color-scheme` metadata, and 78 component tokens. Relay light/dark each
contain **318 entries**: the baseline roles with authored overrides and five
geometry tokens. Frame light/dark each contain **343 entries**: the 313 baseline
roles, those same five geometry names, and overrides for 25 existing foundation
names. `ThemeToken` is the union of keys across all eight maps; `FoundationToken`
is the global-map key union, and `TokenName` combines both. The `global` map contains
**191 scalar** typography, spacing, size, motion, and other foundation values. Some
component-token values deliberately refer to contextual CSS variables.

## Typography and responsive data

`typeStyles` preserves **36 selected Carbon type definitions in full**, including
compact, legal, and fluid styles and the legacy display aliases. `TypeStyleName`
is their key union. Each definition retains its original property names and any
sparse `breakpoints` overrides from `@carbon/type`.

The scalar `foundations` entries and CSS variables describe **base values only**.
For example, `--hashti-fluid-heading-05-font-size` stays `2rem`; importing the CSS
does not apply breakpoint changes or interpolate fluid typography. Consumers can
use `typeStyles` together with `breakpoints` to implement their responsive rules.
An override may omit properties that continue from an earlier breakpoint, so it
must be applied cumulatively rather than treated as a complete independent style.

`foundations` and `typeStyles` always return the original Carbon data. Frame's
working scale lives in its theme maps and on Frame CSS roots; it does not rewrite
either export. Reading a JavaScript theme value gives a fixed value, whereas
`token()` returns a reference that follows CSS inheritance and customization.

## Themes and layers

Use the React package's `Theme` and `Layer`, or the same attributes in other markup:

```html
<div data-hashti-theme="g10" data-hashti-layer="0">
  <section data-hashti-layer="1">A nested surface</section>
</div>
```

`white`, `g10`, `g90`, `g100`, `relay-light`, `relay-dark`, `frame-light`, and
`frame-dark` define semantic colors. Frame also defines its working type and size.
Most contextual aliases
select suffixes 01/02/03 at levels 0/1/2. `border-subtle` selects 00/01/02 instead;
`layer-background` identifies the containing surface. These attributes establish
tokens; the React package supplies surface painting and component styling.

The CSS namespace is `--hashti-*`. Prefer semantic references such as
`var(--hashti-text-primary)` to hard-coded color values. The typed `token()` helper
accepts exported token names; contextual aliases are available directly in CSS.

```css
.task-surface {
  color: var(--hashti-text-primary);
  background: var(--hashti-layer); /* Contextual CSS alias; not token("layer"). */
  border: 1px solid var(--hashti-border-subtle);
}
```

### Cascade, foundations, and override placement

Every generated declaration, including the original root foundations, belongs to
`@layer hashti.tokens`. The React stylesheet establishes
`cinder.tokens, cinder.reset, cinder.components, cinder.themes, cinder.accessibility`
in that order. Normal unlayered application rules beat these layered declarations;
an application layer placed after `cinder` can also supply overrides.

Frame owns only the 25 foundation names listed in its type/size mapping below.
On `html` and `body` outside Frame, private CSS aliases capture the winning
document values for those names. A Carbon or Relay Theme root beneath Frame
restores that document baseline, with the original foundation as fallback.
Standalone legacy roots continue to inherit normally. Other foundations are not
redeclared at theme boundaries, and `Layer` only changes contextual aliases.

Existing document-level legacy overrides therefore continue to work, including
live changes, when their owner is outside Frame:

```css
:root {
  --hashti-font-sans: Georgia, serif;
  --hashti-size-md: 3rem;
  --hashti-body-01-line-height: 1.6;
}
```

With ordinary React Theme roots below that document, Carbon and Relay use these
values even when nested inside Frame. Frame uses its system sans, 44px medium
control, and working type. A Frame subtree inside Carbon gets Frame's values too.

**Document-owned Frame:** if `body` itself owns Frame, a non-Frame `html` can still
provide the legacy baseline. If `html` owns Frame, there is no outside document
baseline; nested legacy roots use the original foundations. A font/size/type
override on a Frame `html` or `body` belongs to that Frame root and cannot also be
inferred as a legacy baseline. Put legacy-specific overrides on the actual legacy
Theme roots, using an appearance recipe when they must reach portals.

For portable custom foundations, declare variables directly on a recipe class:

```css
.account-appearance {
  --hashti-font-sans: Georgia, serif;
  --hashti-size-md: 3rem;
  --hashti-helper-text-01-line-height: 1.5rem;
}
```

Apply it with `<Theme theme="frame-light" appearanceClassName="account-appearance">`.
The React package repeats the class on Theme and detached overlay roots; those
direct application declarations win over generated Frame values and legacy
restoration. Omission inherits the recipe, a string replaces it, and `""` clears
it. Ordinary `className`, inline styles, and arbitrary ancestor values are
DOM-local. Document aliases remain live CSS values, not runtime style snapshots.
`--hashti-internal-legacy-*` is private generation machinery and is not exported
through JSON or `token()`.

## Authored Relay values

`src/relay.ts` owns Relay's palette and geometry. The generator merges those
choices over the white/g100 token maps so every existing role remains available.
Roles outside the first component slice keep their Carbon-derived values.

| Authored token   | Relay value | Role                           |
| ---------------- | ----------- | ------------------------------ |
| `control-radius` | `0.5rem`    | Button and field corners       |
| `popover-radius` | `0.75rem`   | Menu surfaces                  |
| `overlay-radius` | `1.25rem`   | Dialog surfaces                |
| `focus-width`    | `2px`       | Focus ring width               |
| `focus-offset`   | `2px`       | Gap outside the control border |

These five names are defined on Relay and Frame roots; Carbon maps do not define
them. The table gives Relay's unchanged values.
Shared size, spacing, type, and motion values continue to come from `foundations`.
Edit the authored inputs and run `bun run build:tokens`; do not hand-edit
`tokens.css` or `tokens.json`. Both generated formats and the typed JavaScript
exports describe the same choices. See the workspace's `docs/relay.md` and `/relay`
gallery for the color-to-component mapping and usage guidance.

## Authored Frame values

`src/frame.ts` owns Frame's authored overlays. The generator merges `frame-light`
over `white` and `frame-dark` over `g100`. The six older theme maps, all 191 global
foundations, and all 36 structured Carbon type definitions retain their values.
No parallel palette-name API is introduced: DESIGN.md's descriptive names map to
the existing semantic roles below.

### Palette mapping

| Frame role          | Light     | Dark      | Public token mapping                                                                                                                                                                                                                                              |
| ------------------- | --------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Canvas              | `#f5f6f8` | `#18191d` | `background`, `layer-background-01`                                                                                                                                                                                                                               |
| Surface             | `#ffffff` | `#22242a` | `layer-01`, `layer-background-02`, `field-01/02/03`, `focus-inset`                                                                                                                                                                                                |
| Raised              | `#eef1f6` | `#2c2f38` | `layer-02/03`, `layer-background-03`, all `layer-hover-*`, `layer-active-*`, `layer-accent-01/02/03`, `field-hover-*`; `background-hover`, `button-secondary`, `button-tertiary-hover`, `button-disabled`, `layer-selected-disabled`, `notification-action-hover` |
| Text                | `#25272c` | `#f1f2f6` | `text-primary`, `icon-primary`, `border-inverse`                                                                                                                                                                                                                  |
| Muted               | `#606674` | `#b1b6c3` | `text-secondary`, `text-helper`, `text-placeholder`, `icon-secondary`, `toggle-off`                                                                                                                                                                               |
| Divider             | `#dde1e8` | `#3e424d` | `border-subtle-00/01/02`, `border-tile-01/02/03`, `border-disabled`, all `layer-accent-hover/active-*`, `button-secondary-hover`, `button-tertiary-active`, `background-active`                                                                                   |
| Control border      | `#7f8795` | `#7d8493` | `border-strong-01/02/03`, `button-tertiary`, `text-disabled`, `icon-disabled`, `text-on-color-disabled`, `icon-on-color-disabled`                                                                                                                                 |
| Neutral action      | `#272a32` | `#f1f2f6` | `button-primary`, `background-brand`, `background-inverse`, `layer-selected-inverse`                                                                                                                                                                              |
| Action hover        | `#434754` | `#d2d7e4` | `button-primary-hover`                                                                                                                                                                                                                                            |
| Action press        | `#555b6b` | `#b6bfd2` | `button-primary-active`                                                                                                                                                                                                                                           |
| Secondary press     | `#cbd2dc` | `#515765` | `button-secondary-active`                                                                                                                                                                                                                                         |
| On action           | `#ffffff` | `#22242a` | `text-on-color`, `icon-on-color`, `text-inverse`, `icon-inverse`, `button-separator`                                                                                                                                                                              |
| Focus blue          | `#365ccb` | `#a9bdff` | `focus`, `interactive`, `border-interactive`, `border-subtle-selected-01/02/03`, `link-primary`, `link-primary-hover`, `link-secondary`, `link-visited`, `support-info`                                                                                           |
| Selected surface    | `#e7edff` | `#333f62` | `background-selected`, `background-selected-hover`, all `layer-selected-01/02/03` and `layer-selected-hover-*`, `highlight`                                                                                                                                       |
| Information surface | `#edf2ff` | `#2c354e` | `notification-background-info`                                                                                                                                                                                                                                    |
| Error               | `#aa2735` | `#ffacb3` | `text-error`, `support-error`, `button-danger-primary`, `button-danger-secondary`                                                                                                                                                                                 |
| Error surface       | `#ffe8eb` | `#452830` | `notification-background-error`                                                                                                                                                                                                                                   |
| Warning             | `#75500d` | `#e7c383` | `support-warning`                                                                                                                                                                                                                                                 |
| Warning surface     | `#fff0ce` | `#3e3321` | `notification-background-warning`                                                                                                                                                                                                                                 |
| Success             | `#246343` | `#a4d9b8` | `support-success`                                                                                                                                                                                                                                                 |
| Success surface     | `#e1f2e8` | `#203a2b` | `notification-background-success`                                                                                                                                                                                                                                 |

`focus-inverse`, all four `link-inverse*` roles, and the error/warning/success/info
`support-*-inverse` roles use the opposite Frame palette's corresponding color.
The four notification backgrounds pair with their same-theme support foregrounds;
the information foreground is focus blue. No additional status-surface names are
needed.

Outlined and ghost actions use raised neutrals on hover and divider neutrals on
press. Primary and secondary press use separately authored shades beyond hover,
so a held press remains visible.
Danger feedback
extends the measured error rest color: `button-danger-hover/active` are
`#91212d` / `#771b25` in light and `#ffb8be` / `#ffc5ca` in dark. Pair filled
primary and danger states with `text-on-color`; Frame's secondary/outlined/ghost
recipes use `text-primary` until a danger interaction uses its filled pair.
These authored state pairs are covered by contrast tests.

Higher contextual surfaces saturate deliberately: `layer-01/02/03` is
surface/raised/raised, while `layer-background-01/02/03` is canvas/surface/raised.
Fields remain ordinary surfaces at every level. The higher steps are authored
defaults, not additional prototype measurements. Alias levels still saturate at
2, and subtle separator suffixes remain 00/01/02.

### Working typography, font scope, and geometry

Frame's `font-sans` is
`ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.
It needs no font download. Carbon and Relay retain the IBM Plex Sans stack;
`font-mono` retains the IBM Plex Mono stack everywhere. Cinder does not bundle or
load fonts. A custom font still needs appropriate glyph coverage and metrics.

| Usage          | Existing scalar role | Font size          | Line height      | Weight             |
| -------------- | -------------------- | ------------------ | ---------------- | ------------------ |
| Theme body     | `body-01`            | `0.875rem` (14px)  | `1.5` (21px)     | 400                |
| Entered values | `body-02`            | `1rem` (16px)      | `1.5` (24px)     | 400                |
| Button action  | `body-compact-01`    | `0.875rem` (14px)  | `20 / 14` (20px) | 500                |
| Field label    | `label-01`           | `0.875rem` (14px)  | `20 / 14` (20px) | 600                |
| Help/recovery  | `helper-text-01`     | `0.8125rem` (13px) | `1.25rem` (20px) | Regular, inherited |
| Dialog title   | `heading-03`         | `1.125rem` (18px)  | `1.4` (25.2px)   | 600                |

Each role overrides its existing `-font-size`, `-line-height`, and
`-letter-spacing` scalars; letter spacing is zero. The five roles with existing
`-font-weight` tokens override those too. Helper line-height is intentionally a
**length**, so it can also reserve the help region's minimum block size. These
23 type scalars plus `font-sans` and `size-md` are the 25 scoped foundations.
The values in parentheses assume a 16px root font size; rem values scale with it.
Other typography, including Carbon's expressive/responsive data, is unchanged.

| Token            | Frame value           | Role                                                           |
| ---------------- | --------------------- | -------------------------------------------------------------- |
| `size-md`        | `2.75rem` (44px)      | Ordinary control minimum; explicit `md` and omitted Frame size |
| `control-radius` | `0.625rem` (10px)     | Buttons and fields                                             |
| `popover-radius` | `0.875rem` (14px)     | Floating menu surfaces                                         |
| `overlay-radius` | `1.125rem` (18px)     | Dialog surfaces                                                |
| `focus-width`    | `2px`                 | External focus ring                                            |
| `focus-offset`   | `2px`                 | Gap outside a control; action recipes add 1px                  |
| `overlay`        | `rgb(18 22 32 / 50%)` | Modal backdrop                                                 |
| `shadow`         | `rgb(0 0 0 / 14%)`    | Color composed into floating-surface shadows                   |

`size-sm` (32px), `size-lg` (48px), other sizes, spacing, and productive motion
continue to come from the original foundations. Minimum control sizes can grow
with content and text scaling. The React Frame recipe owns the omitted Button
size behavior; token availability alone does not alter component defaults.

### Inherited roles and later families

Every key not authored in `src/frame.ts` retains its exact white/g100 value. This
includes `tag-*`, `status-*`, `content-switcher-*`,
`notification-action-tertiary-inverse*`, and `support-caution-*` roles, as well as
other later-family-specific tokens. Their presence makes the semantic maps
complete, not those component families Frame-verified. Shared Frame colors may
reach a later component before its anatomy, states, or contrast are reviewed.
The Phase 1 representative Button/field/dialog/Select styling and later full
component promotion are separate from this token contract.

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
