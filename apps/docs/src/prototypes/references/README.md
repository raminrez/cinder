# Comparison captures

These fifty WebP images support the comparison at `/prototypes`, captured on
**6 November 2026**. Forty-eight are real rendered components in comparison-authored
task layouts. The two `astryx-field-*` images are crops of Astryx's own documentation
examples. All are static images; use the “Try” buttons for working Cinder flows.

## Sources

| Image prefix | Component source                                                                               | Styles and theme                                                                         |
| ------------ | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `field`      | Local `@cinder/react` components on `research/base-heroui-cinder`                              | The prototype stylesheet's Field variables, in light and dark mode                       |
| `relay`      | The same local Cinder components                                                               | The prototype stylesheet's Relay variables, in light and dark mode                       |
| `index`      | The same local Cinder components                                                               | The prototype stylesheet's Index variables, in light and dark mode                       |
| `frame`      | Local Cinder components after the Relay baseline `8481028`                                     | `../frame.css`, with cool-neutral light/dark palettes and attached field recovery        |
| `astryx`     | Public [Field documentation](https://astryx.atmeta.com/components/Field), displaying **0.7.9** | The rendered documentation's light/dark treatment and Figtree typography                 |
| `carbon`     | Published `@carbon/react` **1.120.0**                                                          | Published `@carbon/styles` **1.119.0**, `css/styles.css`, with `white` and `g100` themes |
| `heroui`     | Published `@heroui/react` **3.2.7**                                                            | Published `@heroui/styles` **3.2.7**, `dist/heroui.min.css`, with light and dark themes  |

The earlier Field, Relay, and Index captures began at commit `a901da8`, including
the prototype-only validation spacing adjustment in `../styles.css`. They remain
historical specimens; only Frame's eight task images were added in the fourth pass.
The proposed themes are distinct from the library's production styles.

HeroUI's precompiled file was served directly from the archived package. This
research setup does not establish a working public package import for that file.
The normal HeroUI source stylesheet uses Tailwind v4 processing; the export-map
limitation for its precompiled artifact is documented in the
[HeroUI research report](../../../../../docs/research-heroui.md#43-precompiled-stylesheet-useful-artifact-packaging-limitation).

The pinned package archives are available from the registry:

- [Carbon React 1.120.0](https://registry.npmjs.org/@carbon/react/-/react-1.120.0.tgz)
- [Carbon Styles 1.119.0](https://registry.npmjs.org/@carbon/styles/-/styles-1.119.0.tgz)
- [HeroUI React 3.2.7](https://registry.npmjs.org/@heroui/react/-/react-3.2.7.tgz)
- [HeroUI Styles 3.2.7](https://registry.npmjs.org/@heroui/styles/-/styles-3.2.7.tgz)

Carbon is an IBM project, and HeroUI is a HeroUI project. The reviewed Carbon and
HeroUI package manifests and license files declare Apache-2.0. The local Cinder
project is also Apache-2.0. IBM Plex is distributed under the SIL Open Font License.
Astryx is a Meta project; its inspected core source manifest declares MIT. Its local
snapshot is `ec84130f57b3c3c3f51a82ef5103d7d3eb357647` (core 0.7.10), distinct from
the public documentation capture. The names here identify the sources being compared.

## What the comparison author chose

The components retain their published visual treatment within a reduced task.
The capture fixtures set the following context:

- Each task specimen is **380 CSS pixels wide**, captured in a **1200 × 1000** desktop
  viewport at device scale factor 1, using Chromium through `agent-browser`.
- Forms and queues have a 24px outer inset and common headings. The two form fields
  have the same entered values and help text. The error state is set explicitly.
- The form uses a 20px field-to-field layout gap. Field, Relay, and Index reserve
  a 36px error row. Frame places guidance above the control and reserves a 58px
  desktop recovery row; this accounts for much of its additional height.
- Queues use the same three fictional records, two columns where a table is shown,
  and author-selected status tags or chips. Small adjustments to table columns and
  cell padding keep the content readable at the specimen width.
- Relay's next-task panel and Index's selected-record details are application
  compositions. The Index details appear below the small table; the wide working
  prototype places them beside it.
- Dialogs are constrained to the common 380px width, with the same reviewer,
  status, and note. They show closed dropdowns. The captures crop to the dialog
  surface, excluding the surrounding backdrop.
- Cinder uses its prototype form typography, including 16px entered text. Vendor
  input typography is left to the published styles.
- Field, Relay, Index, and Carbon use IBM Plex Sans. Frame and HeroUI use the local
  system font in these fixtures. HeroUI's documentation-site font, Inter, is not
  imposed on its components.
- Focus is cleared and animations finish before capture. PNG screenshots are
  cropped and converted with `cwebp -lossless`; the component pixels are not
  redrawn or generated from prompts.

The working examples use the shared Cinder prototype application. The pictures
are smaller, purpose-built compositions, so they do not imply that every control,
padding value, or label in a complete page is shown.

### Astryx's documentation crop

`astryx-field-light.webp` and `astryx-field-dark.webp` are **252 × 368px**, captured
at a **1440 × 1000** viewport. They retain the documentation's email-error,
username-warning, and API-key-success examples. No common task content or 380px
width was imposed. The comparison labels these as anatomy references, so their
height is not evidence that one system's equivalent form is shorter.

## Files and measured dimensions

Names follow `{system}-{state}-{theme}.webp`.

- `system` is `field`, `relay`, `index`, `frame`, `carbon`, or `heroui`.
- `state` is `form`, `error`, `queue`, or `dialog`.
- `theme` is `light` or `dark`.

Every task specimen is 380px wide. Dimensions are read from the exported raster,
rather than rounded DOM bounds. The heights below apply to both themes:

| System |  Form | Invalid email | Queue | Dialog |
| ------ | ----: | ------------: | ----: | -----: |
| Field  | 468px |         468px | 421px |  526px |
| Relay  | 492px |         492px | 449px |  550px |
| Index  | 468px |         468px | 483px |  502px |
| Frame  | 522px |         522px | 409px |  543px |
| Carbon | 384px |         384px | 361px |  480px |
| HeroUI | 364px |         380px | 403px |  442px |

The captured desktop button and input heights are:

| System | Form input | Form Save button | Dialog Save button |
| ------ | ---------: | ---------------: | -----------------: |
| Field  |       40px |             40px |               40px |
| Relay  |       48px |             48px |               48px |
| Index  |       40px |             40px |               32px |
| Frame  |       44px |             44px |               44px |
| Carbon |       40px |             48px |               64px |
| HeroUI |       36px |             36px |               36px |

These are measurements of the displayed configurations, not universal sizes for
either library. In particular, Carbon's modal footer uses a different button size
from the ordinary primary button in the form.

## Local capture evidence

The isolated fixtures and raw evidence are retained locally under the ignored
`.research/prototype-comparison/` directory:

- `cinder.tsx`, `carbon/fixture.tsx`, and `heroui/fixture.tsx` define the compositions.
- `common.ts` defines the common content and theme/state selection.
- `capture.css` records the framing adjustments listed above.
- `build.ts` and `server.ts` build and serve the fixtures at `127.0.0.1:4372`.
- `capture.mjs` checks visible content, entered form values, selected dialog values,
  and specimen bounds before producing each WebP.
- `captures.json` records the capture URLs, dimensions, control measurements,
  loaded fonts, and SHA-256 hashes. `captures/` contains the raw PNG screenshots.

The fourth-pass evidence is under `.research/astryx-2026-11-06/`:

- `capture-frame.mjs` and `frame-captures.json` record eight Frame images, including
  actual content, values, dimensions, control measurements, and WebP hashes.
- `capture-astryx.mjs` and `public-field-captures.json` record the public Field URL,
  crop bounds, displayed values, description/error IDs, and hashes for both themes.
- The corresponding PNGs retain the unconverted captures. All ten new WebPs were
  visually reviewed in addition to the capture assertions.

The fourth-pass capture records were reconciled against those original PNGs on
6 November 2026. `width` and `height` are raster dimensions; `roundedCssBounds`
retains the original rounded DOM measurements. Astryx's width changed from 253
to 252px, and Frame's dialog height from 544 to 543px. The images were not
regenerated, and their original WebP hashes still match. The capture scripts now
record raster dimensions and unrounded CSS bounds separately on future runs.

The capture fixtures reuse the archived HeroUI packages and Carbon stylesheet.
Carbon's React installation is confined to the fixture's own `carbon/` directory.
The comparison page imports only these image assets through `../references.ts`.
The ignored fixture scripts and archives are local research evidence and are not
included in a fresh Git checkout.

## Reading limits

The images demonstrate appearance, spacing, and visible feedback at one desktop
viewport. They do not establish keyboard behavior, screen-reader support,
responsive touch targets, default application layouts, or a general accessibility
ranking of the component libraries. Use the working Cinder examples for the
prototype interactions.

For the plain-language comparison and working links, see
[the prototype guide](../../../../../docs/prototypes-guide.md).
