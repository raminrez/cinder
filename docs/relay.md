# Relay: the first component slice

**6 November 2026 · Cinder 0.1.0.** Relay is the preferred direction for Cinder.
This specification records its implemented web controls and the choices visible
in the [live gallery](http://127.0.0.1:3000/relay).

## Try it

Run `bun run dev` and open `/relay`. The route also ships in the production build.
Use `?theme=relay-light` or `?theme=relay-dark` for a direct link. The gallery has:

- Seven Button variants, six state appearances, five heights, and a live
  size/variant/icon-only/pending example.
- TextField's default, hover, focus, invalid, read-only, and disabled appearances;
  a controlled form demonstrates validation and recovery at three heights.
- Live Checkbox, Radio, and Switch controls, including selected, mixed, disabled,
  read-only, and recoverable invalid examples where applicable.
- An invitation form in Dialog with a Select menu in a nested portal.
- Light/dark token values, a working corner-token override, API notes, field
  anatomy, controlled/uncontrolled examples, and do/don't guidance.

Pinned specimens use the real components and state styles inside `inert`
containers. They are visual comparisons; the separate live examples provide
keyboard and pointer interaction. Saves and invitations are local demonstrations.

## Package scope and ownership

Relay extends `@cinder/react` and `@cinder/tokens`. It uses the existing React Aria
behavior and ready-to-import CSS:

```tsx
import { Button, TextField, Theme } from "@cinder/react";
import "@cinder/react/styles.css";

<Theme theme="relay-light" locale="en-US">
  <TextField label="Workspace name" defaultValue="Atlas design" size="lg" />
  <Button size="lg">Save changes</Button>
</Theme>;
```

The first slice covers Button, TextField, Select, Checkbox/CheckboxGroup,
Radio/RadioGroup, Switch, ContentSwitcher, and Dialog/Modal/Popover compositions.
Related input anatomy receives shared field styles. Other families retain their
baseline geometry with the selected tokens; they have not received a complete
Relay state and composition review. The [coverage matrix](coverage.md) remains
the inventory for subsequent work.

| Responsibility                                   | Source                                                                                             |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| Authored palettes and geometry                   | [`packages/tokens/src/relay.ts`](../packages/tokens/src/relay.ts)                                  |
| Carbon baseline, theme merge, contextual aliases | [`packages/tokens/scripts/generate.ts`](../packages/tokens/scripts/generate.ts)                    |
| CSS/JSON data and typed names                    | [`packages/tokens/src`](../packages/tokens/src)                                                    |
| Shared anatomy and React Aria contracts          | [`packages/react/src`](../packages/react/src)                                                      |
| Relay appearance and high-contrast styling       | [`packages/react/src/relay.css`](../packages/react/src/relay.css)                                  |
| Gallery composition and layout                   | [`apps/docs/src/relay.tsx`](../apps/docs/src/relay.tsx), [`relay.css`](../apps/docs/src/relay.css) |

No second component API or theme provider is introduced. `Theme` accepts the two
new names alongside `white`, `g10`, `g90`, and `g100`.

## Visual decisions

Neutral actions let red retain its destructive/error meaning. A separate blue
focus ring identifies keyboard location without replacing an error border.
Field borders are stronger than surface dividers because they identify an
interactive boundary. Dark mode uses a light neutral primary action rather than
reusing a dark button against a dark canvas.

| Semantic role            | CSS suffix after `--cinder-`                        | Light     | Dark      |
| ------------------------ | --------------------------------------------------- | --------- | --------- |
| Page                     | `background`                                        | `#f5f5f5` | `#151515` |
| Surface                  | `layer-01`                                          | `#ffffff` | `#242424` |
| Main text                | `text-primary`                                      | `#171717` | `#f4f4f4` |
| Help / placeholder       | `text-secondary`, `text-helper`, `text-placeholder` | `#606060` | `#b9b9b9` |
| Field surface            | `field-01`                                          | `#ffffff` | `#242424` |
| Interactive border       | `border-strong-01`                                  | `#848484` | `#818181` |
| Surface divider          | `border-subtle-00`                                  | `#dfdfdf` | `#444444` |
| Primary                  | `button-primary`                                    | `#171717` | `#f4f4f4` |
| Primary hover            | `button-primary-hover`                              | `#383838` | `#d7d7d7` |
| Primary pressed          | `button-primary-active`                             | `#525252` | `#b9b9b9` |
| Text on primary / danger | `text-on-color`                                     | `#ffffff` | `#151515` |
| Secondary fill           | `button-secondary`                                  | `#eeeeee` | `#303030` |
| Focus and links          | `focus`, `link-primary`                             | `#3346a8` | `#b3beff` |
| Error / danger           | `support-error`, `button-danger-primary`            | `#b42332` | `#ff9ca3` |

The source and generated data contain the remaining hover, pressed, disabled, and
layer roles. Each Relay theme has the 313 baseline roles plus five geometry
tokens; untouched roles inherit the Carbon white/g100 starting values.

| Geometry or type          | Contract                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| Core heights              | `size-sm` / `size-md` / `size-lg`: 32/40/48px at a 16px root                                      |
| Button-only large heights | `size-xl` / `size-2xl`: 64/80px                                                                   |
| Corners                   | `control-radius` / `popover-radius` / `overlay-radius`: 8/12/20px                                 |
| Field label and value     | IBM Plex Sans, 14px with 20px line height; label weight 500                                       |
| Button text               | IBM Plex Sans, 14/20px, weight 500                                                                |
| Help and error            | IBM Plex Sans, 12/16px                                                                            |
| Code                      | IBM Plex Mono                                                                                     |
| Internal spacing          | 8px label/icon gaps, 16px control inset including its border, 24px dialog padding                 |
| Focus                     | `focus-width: 2px`, `focus-offset: 2px` outside the border                                        |
| Motion                    | Color transitions and popover entrance use `duration-fast-02`; dialogs use `duration-moderate-02` |

Button defaults to 48px; TextField and Select default to 40px. Set `size="lg"`
on fields for the comfortable forms shown in the gallery. Switch has 48×24px and
32×16px tracks, with a 40px minimum label target in Relay. Checkbox and Radio use
18px marks inside minimum-40px label targets and do not have a size prop.

## States and behavior

### Buttons

| Variant           | Use                                      |
| ----------------- | ---------------------------------------- |
| `primary`         | The main action for the current decision |
| `secondary`       | A supporting action with a quiet fill    |
| `tertiary`        | An outlined alternative, such as Cancel  |
| `ghost`           | A low-emphasis toolbar or inline action  |
| `danger`          | Confirmation of a destructive action     |
| `danger-tertiary` | An outlined destructive alternative      |
| `danger-ghost`    | A destructive list or toolbar action     |

React Aria owns hover, press, and keyboard-focus states. `isDisabled` prevents
activation and removes the control from the tab order. `isPending` prevents repeat
activation while retaining focus. Keep action content stable while pending;
Relay keeps its space and displays a centered progress mark. `pendingLabel`
provides the progress name, defaults to `"Pending"`, and should be localized with
the action (for example `"Saving"`). Icon-only buttons require an accessible name.
The application owns the asynchronous action and sets `isPending` explicitly.

### Fields and selection

- Keep a visible label. A placeholder is an example, not a replacement label.
- Native validation runs on submit by default and focuses the first invalid
  field. Use `validate`, `isRequired`, input types, and a useful `errorMessage`.
- `validationBehavior="aria"` lets an application own validation timing through
  `isInvalid`. Clear the error when its condition is corrected.
- The default field composition shares one help/error row. An error replaces the
  visible helper, preserving space for the actions. The label and accessible
  description/error associations remain connected.
- A read-only TextField remains focusable and copyable. A disabled value is
  unavailable and excluded from submission. Select does not have an `isReadOnly`
  prop; present noneditable information as text instead.
- Checkbox supports multiple choices and mixed/read-only states. RadioGroup
  selects one value. A Switch applies immediately; Space toggles it. Use a
  checkbox for a choice submitted with a form.
- Select options can contain `Text slot="label"` and `Text slot="description"`.
  Make them direct children of ListBoxItem to stack the description below its
  label, and supply `textValue` for rich content. The selected value hides the
  description; the menu retains its visible and accessible description.

### Dialog composition

Use `DialogTrigger`, a Button, Modal, and a named Dialog. Give its Heading
`slot="title"`, name an icon-only close action, and keep related form actions
inside the Form. The invitation example focuses Email, traps Tab, validates on
submit, skips a disabled Select option, and restores trigger focus on close.
Escape dismisses the innermost overlay first.

## API and customization

| Concern           | Existing contract                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------- |
| Action            | Button `onPress` covers pointer, keyboard, and touch                                                    |
| Text              | TextField `value` / `defaultValue`; `onChange` returns a string                                         |
| Choice            | Select `value` / `defaultValue`; `onChange` returns a key or null, or an array in multiple mode         |
| Boolean selection | Checkbox and Switch `isSelected` / `defaultSelected`; `onChange` returns a boolean                      |
| Group selection   | CheckboxGroup uses arrays; RadioGroup uses a single `value`; ContentSwitcher uses selected key sets     |
| Root styling      | `className` and `style`, including upstream render-state functions; Cinder wrapper classes are retained |
| Refs              | Button `ref` targets the button; TextField `ref` targets its wrapper and `inputRef` its input           |
| Inner anatomy     | TextField `children` replaces its convenience parts; Select `children` supplies options                 |

Choose one owner for the value:

```tsx
const [name, setName] = useState("Atlas design");

// Controlled: another part of the app can use the current value.
<TextField label="Workspace" value={name} onChange={setName} />;

// Uncontrolled: read the named value from FormData at submission.
<TextField label="Workspace" name="workspace" defaultValue="Atlas design" />;
```

Use CSS variables for shared visual changes. For example,
`.my-controls { --cinder-control-radius: 1rem; }` changes both Button and TextField
corners inside that wrapper. Keep RAC's Label, Input, Text, and FieldError when
composing a field so those parts retain their accessible relationships. Direct
RAC re-exports replace their default class when given `className`; retain their
`react-aria-*` class to keep Cinder's styles.

`Layer` changes contextual aliases such as `--cinder-field` and
`--cinder-border-subtle`. Theme, layer, and locale cross portals through React
context; arbitrary inline CSS overrides only follow DOM inheritance. Put overlay
overrides on the actual Popover/Modal or a selector matching its theme root.

Native CSS `@scope` stops Relay selectors at each nested Theme. A nested Carbon
Theme keeps its baseline styling. The stylesheet declares `cinder`, `cinder-relay`,
and `cinder-relay-forced-colors` in order so variant colors cannot override system
colors. Use a browser with `@scope` support. Reduced motion disables transitions
and animations while leaving progress and focus indicators visible.

## Usage guidance

| Do                                                                    | Avoid                                                        |
| --------------------------------------------------------------------- | ------------------------------------------------------------ |
| Choose one primary action for a decision                              | Make every action equally prominent                          |
| Use 48px controls for comfortable forms and denser sizes deliberately | Shrink every control to fit more content                     |
| Reserve red for destructive or invalid states                         | Use red just to attract attention                            |
| Explain how to correct an error                                       | Say only “Invalid value”                                     |
| Use read-only when a value must stay copyable                         | Disable information people need to copy                      |
| Keep labels and pending action text stable                            | Replace labels with placeholders or change width during work |
| Let React Aria generate interaction state                             | Pass fake hover/press/focus state in application code        |

## Verification and next work

[`tests/browser/relay.test.ts`](../tests/browser/relay.test.ts) exercises the
production gallery in both themes: real button states, pending repeat prevention,
field validation/recovery, selection, nested dialog focus, responsive overflow,
token overrides, reduced motion, forced colors, and automated accessibility.
The existing contract tests cover six themes, nested boundaries, and RTL portals.
The external tarball consumer checks Relay's distributed types, tokens, geometry,
and a Select inside a portalled dialog. See [verification](verification.md) for
the latest executed results and remaining coverage limits.

Subsequent library slices should follow the same path: finish a family from the
coverage inventory, show its applicable states and composition, document its
actual props, and verify the package. This specification and `tokens.json` are
the inputs for the editable Figma system. Detailed Figma variables and component
sets are the next phase after this web slice.
