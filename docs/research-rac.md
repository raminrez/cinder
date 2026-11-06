# React Aria Components research for Cinder

**Research date:** 2026-11-06. The first-party documentation and npm snapshot was captured on 2026-11-05 UTC.
**Target:** React Aria Components (RAC) **1.22.1**, React/React DOM **19.3.1**, and Bun **1.4.4**.
**Purpose:** define the behavioral and composition contracts behind Cinder's Carbon-aligned React library, including deliberate differences from Carbon's React implementation.

**Phase 1 follow-up · 6 November 2026:** the later Frame foundation work adds
portable appearance and effective HTML language to the shared portal bridge, plus
additive Modal part access and field hooks. The snapshot observations below retain
their original scope. Use the [current React contract](../packages/react/README.md)
and [Phase 1 verification](verification.md#frame-phase-1) for the new behavior.

## 1. Implementation decisions

- Keep RAC responsible for interaction, focus, collection state, accessible relationships, and internationalization. Apply Cinder's tokens, geometry, icons, and state styling around those contracts.
- Use the exact installed **1.22.1** declarations for API decisions. The latest archived release article describes **1.22.0**; it does not document the subsequent npm patch.
- Preserve render-prop functions, slots, DOM props, and refs wherever the wrapper exposes them. Document the narrower composition surface of convenience wrappers such as `Select`, `ComboBox`, and `AccordionItem`.
- Use **`value` / `defaultValue` / `onChange`** for current single- and multiple-selection `Select` and `ComboBox` APIs. Keep these distinct from collection key sets and Tabs' singular `selectedKey`.
- Retain the Cinder base class in wrappers. When styling directly re-exported RAC parts, explicitly preserve their **`react-aria-*` default class** if Cinder's stylesheet depends on it.
- Keep form labels, descriptions, and errors connected through RAC. The shared helper/error row reserves ordinary message space; it is not a fixed-height guarantee for arbitrary content.
- Carry theme, layer, and direction across portals, and provide a consistent explicit locale when server rendering. A successful client-rendered Bun application does not establish hydration correctness.
- Describe the actual semantics: Space-operated Switch, radio-group ContentSwitcher, grid/treegrid collections, segmented dates, modal-by-default dialog Popover, native `NativeSelect`, and experimental Toast.

These decisions are grounded in the [archived primary sources](#12-archive-and-honest-reading-coverage), installed implementation, and [existing verification evidence](#11-verification-evidence-and-remaining-gaps). They do not establish blanket Carbon parity or accessibility conformance.

## 2. Package and release baseline

### Exact installation versus declared support

| Evidence                       | Observed baseline                                                                   | Meaning for Cinder                                                                |
| ------------------------------ | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Archived npm `latest` dist-tag | `react-aria-components@1.22.1`                                                      | Latest tagged release at capture time; the separate nightly tag was not selected. |
| RAC package metadata           | `react-aria@3.53.1`, `react-stately@3.51.0`, `@internationalized/date@^3.12.4`      | The hooks and state packages behind this RAC installation.                        |
| Root catalog                   | React/React DOM `19.3.1`, RAC `1.22.1`, date `3.12.4`, React type packages `19.3.0` | Exact local development versions.                                                 |
| Toolchain                      | Bun `1.4.4`, TypeScript `7.0.2`                                                     | Matches the retained Bun integration probes.                                      |
| Cinder consumer peers          | React/React DOM `>=19.0.0 <20`; RAC `>=1.22.0 <2`                                   | A broader declared range, not a tested version matrix.                            |

Sources: [npm dist-tags][npm-tags], [version metadata][npm-rac], their [archived copies](../.research/rac/npm/), [root manifest](../package.json), and [React package manifest](../packages/react/package.json).

The RAC metadata records `gitHead` **`740c6c5c4a717ca8c82fc4d15d199f6166cd42dc`**, the package tarball URL, and its npm integrity value. RAC provides typed root and component-subpath exports, with ESM and CommonJS entry points. Cinder's own published contract is **ESM JavaScript + declarations + an explicit `./styles.css` export**, with CSS marked as side-effectful. Upstream's additional module formats do not automatically become Cinder exports.

RAC's upstream React peer range includes older React generations. Cinder deliberately declares React 19 and uses its ref-as-prop model in wrappers. Compatibility of RAC itself with React 16–18 is not evidence that Cinder supports those versions.

### Recent release changes that matter here

| Archived release                          | Relevant first-party changes                                                                                                                                         | Consequence                                                                                                                          |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| [1.20.0][release-120] — selected sections | `PreviewTrigger`, explicitly alpha `TokenField`, and context-menu triggering                                                                                         | Useful newer composition patterns, with separate adoption and verification needs.                                                    |
| [1.21.0][release-121] — full article      | `NavigationTree`; async/empty-state Menu support; TypeScript 7; callback input refs; Dialog nesting fixes; RTL Tabs and iOS overlay fixes                            | Inspect current APIs rather than carrying forward old examples or assuming all collection/navigation components have the same model. |
| [1.22.0][release-122] — full article      | `Sheet`; virtual-keyboard-aware overlay positioning; duplicate-key warnings; async ComboBox reopening; table-cell focus restoration; Turbopack locale-plugin support | Relevant to overlays, dynamic collections, and focus regression coverage.                                                            |
| npm `1.22.1`                              | Exact package metadata and installed files are available                                                                                                             | No matching patch release article was identified in this archive. This report does not invent a patch changelog.                     |

The documentation snapshot is a live-site snapshot, not documentation guaranteed to be versioned with every npm patch. Where generated Markdown is incomplete or a signature is ambiguous, use the installed `.d.ts` files. For example, the archived Toast page contains an unresolved description expression and empty generated API headings, while its examples and accessibility prose remain useful.

## 3. Composition and styling contracts

### The RAC contract

RAC's [customization guide][customization] describes components that exchange behavior through React context and named slots. Examples include `Button slot="increment"` in a NumberField, `Text slot="description"`, a dialog's title `Heading`, and `DateInput slot="start"` / `slot="end"` in a range picker. These names carry behavior or accessible relationships; they are more than CSS selectors.

For a custom DOM `render` function:

1. Render the expected element type. A Button's expected `<button>` cannot be replaced by an anchor merely to change its appearance.
2. Produce one root DOM element.
3. Forward the provided DOM props and ref. Use upstream `mergeProps` when combining additional event/DOM props so RAC's handlers and relationships survive.
4. Treat the second argument as RAC render state, rather than rebuilding focus, selection, or press state independently.

For example, this retains the Button contract while adding a marker:

```tsx
import { Button } from "@cinder/react";

<Button
  render={(domProps) => <button {...domProps} data-project-action="save" />}
  className={({ isPending }) => (isPending ? "project-saving" : "project-ready")}
>
  {({ isPending }) => (isPending ? "Saving…" : "Save")}
</Button>;
```

Cinder's [Button wrapper](../packages/react/src/buttons.tsx) uses `composeRenderProps` for its pending indicator and the shared [`classes()` helper](../packages/react/src/utils.ts) for its CSS hook. It extends the user's value/function instead of converting a function to a string or discarding it. `onPress` is the interaction abstraction for actions; adding parallel keyboard toggles around RAC can cause duplicate behavior. [Customization][customization] · [Prop merging][merge-props] · [Styling][styling]

### Two class-name contracts

**Cinder wrappers:** components using `classes("cinder-…", className)` always retain their Cinder base classes. String-only wrappers such as Breadcrumbs also explicitly concatenate their base class.

**Direct RAC re-exports:** `ListBoxItem`, `Menu`, `MenuItem`, `Tab`, `Row`, `Cell`, `Tree`, `GridList`, and other parts in the [public barrel](../packages/react/src/index.ts) retain RAC's original behavior. Upstream **replaces** the default class when a custom `className` is supplied. Because Cinder styles these parts with `react-aria-*` selectors, a custom class must retain the required hook:

```tsx
import { ListBoxItem } from "@cinder/react";

<ListBoxItem
  id="eu"
  textValue="Europe"
  className={({ defaultClassName }) =>
    [defaultClassName, "project-region"].filter(Boolean).join(" ")
  }
>
  Europe
</ListBoxItem>;
```

A static `className="react-aria-ListBoxItem project-region"` is also explicit. `className="project-region"` alone removes the default hook. This behavior is stated in the [Styling guide][styling]; Cinder's direct exports do not automatically merge it back.

Style RAC state through `data-hovered`, `data-pressed`, `data-focus-visible`, `data-selected`, `data-disabled`, and the relevant component-specific attributes. RAC normalizes these states across input modalities. Cinder's [stylesheet](../packages/react/src/styles.css) maps them to its semantic tokens. Preserve focus-visible styling, disabled/invalid distinctions, and reduced-motion behavior when overriding styles.

### What Cinder actually exposes

| Wrapper or export                                                                 | Composition boundary                                                                                                                                                   |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button, Checkbox, Radio, Switch, Column, FilterTag                                | Extend state-driven children with Cinder visual pieces using `composeRenderProps`.                                                                                     |
| TextField, TextArea, NumberField, SearchField, date/time fields, Calendar, Slider | Supply a default composition through `children ?? …`; custom children replace that composition and take responsibility for its labels, inputs, slots, and help.        |
| Select and ComboBox                                                               | Replace the outer RAC `children` type with `ListBoxProps<T>["children"]`. Children describe options/the inner collection, not arbitrary outer state-rendered anatomy.  |
| TagGroup                                                                          | Children belong to the inner TagList; the wrapper supplies the optional Label and TagList.                                                                             |
| AccordionItem                                                                     | Exposes `title`, `children`, and `headingLevel`; it supplies the Disclosure heading, trigger, and panel. It does not expose arbitrary Disclosure render-prop children. |
| Modal                                                                             | Most props, including `render` and `style`, apply to ModalOverlay. `className`, `size`, and `ref` apply to the inner RAC Modal.                                        |
| Direct RAC re-exports                                                             | Preserve the upstream component contract, subject to Cinder's explicit export list and the default-class rule above.                                                   |

Sources: [fields](../packages/react/src/fields.tsx), [selection](../packages/react/src/selection.tsx), [dates](../packages/react/src/dates.tsx), [collections](../packages/react/src/collections.tsx), and [overlays](../packages/react/src/overlays.tsx).

Refs also have specific targets:

| Public ref                      | Target                                                                                                             |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Button / ToggleButton           | Button element.                                                                                                    |
| TextField / TextArea `ref`      | Root div, not the editable control.                                                                                |
| TextField / TextArea `inputRef` | Input / textarea in the default composition; custom children must wire their own control ref.                      |
| Select / ComboBox `ref`         | Root div.                                                                                                          |
| Checkbox / Radio / Switch `ref` | Label root; upstream `inputRef` remains the route to the native input.                                             |
| Modal `ref`                     | Inner modal div, not the overlay/backdrop.                                                                         |
| Table / Column                  | The element union declared by RAC/Cinder, supporting table or div-based rendering; do not narrow it by assumption. |
| NativeSelect `ref`              | Native select element.                                                                                             |

The [contract fixture](../tests/fixtures/contracts.tsx) and [browser contract tests](../tests/browser/contracts.test.ts) exercise selected refs, custom rendering, classes, and children. Their coverage is representative, not proof of every wrapper/prop combination.

## 4. Current selection and collection APIs

### Select and ComboBox use values

The installed state declarations define the same conditional shapes for both components:

```ts
type SelectionMode = "single" | "multiple";
type ValueType<M extends SelectionMode> = M extends "single" ? Key | null : readonly Key[];
type ChangeValueType<M extends SelectionMode> = M extends "single" ? Key | null : Key[];
```

These are excerpts of [Select state types][select-types] and [ComboBox state types][combobox-types], not new Cinder aliases. They are inherited through the installed RAC props.

| Component/mode                                      | Controlled / uncontrolled props                                   | Change callback                                       |
| --------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------- |
| Select or ComboBox, single                          | `value` / `defaultValue`: `Key \| null`                           | `onChange(Key \| null)`                               |
| Select or ComboBox, multiple                        | `value` / `defaultValue`: `readonly Key[]`                        | `onChange(Key[])`                                     |
| ListBox, GridList, Table, Tree, selectable TagGroup | `selectedKeys` / `defaultSelectedKeys`                            | Collection `Selection`, generally `Set<Key> \| "all"` |
| ContentSwitcher / ToggleButtonGroup                 | `selectedKeys` / `defaultSelectedKeys`, even for single selection | A set of selected keys through `onSelectionChange`    |
| Tabs                                                | `selectedKey` / `defaultSelectedKey`                              | Singular key through `onSelectionChange`              |

On Select and ComboBox, `selectedKey`, `defaultSelectedKey`, and `onSelectionChange` still exist as **deprecated single-selection aliases**. Their presence in types or old examples is not a reason to use them for new multiple-selection code. Use one API family consistently. [Selection guide][selection] · [Select][select] · [ComboBox][combobox]

A controlled multiple Select using Cinder's actual wrapper:

```tsx
import { useState } from "react";
import { Select, ListBoxItem, type Key } from "@cinder/react";

const regions = [
  { id: "eu", name: "Europe" },
  { id: "apac", name: "Asia Pacific" },
];

function Regions() {
  const [value, setValue] = useState<Key[]>(["eu"]);

  return (
    <Select
      label="Regions"
      selectionMode="multiple"
      items={regions}
      value={value}
      onChange={setValue}
    >
      {(item) => (
        <ListBoxItem id={item.id} textValue={item.name}>
          {item.name}
        </ListBoxItem>
      )}
    </Select>
  );
}
```

Cinder forwards Select's `items` to its inner ListBox. ComboBox instead forwards `items` / `defaultItems` to the RAC ComboBox root and obtains the collection in its inner ListBox through context. The multiple ComboBox composition also renders `ComboBoxValue`. These are explicit implementation choices in [selection.tsx](../packages/react/src/selection.tsx).

### ComboBox text is a separate state channel

`inputValue` / `defaultInputValue` / `onInputChange` describe text; `value` / `onChange` describe selected keys. If both are controlled, coordinate their updates deliberately. A key change alone cannot update a separately controlled input string on the application's behalf.

The upstream guide distinguishes `defaultItems` with built-in filtering from controlled `items` whose filtering/loading is application-owned. By default, an unrecognized input is reverted on blur; `allowsCustomValue` opts into free-form text. `formValue` chooses submission of the selected key or text and defaults to `"key"`. **When `allowsCustomValue` is true, text is always submitted and `formValue` is ignored**, even if it was explicitly set to `"key"`. Submitted text should therefore not be inferred from the selection callback. [ComboBox value, filtering, and forms sections][combobox] · [Installed ComboBox implementation][combobox-runtime]

For key-valued multiple ComboBoxes, the installed implementation renders repeated same-named hidden inputs. Read `FormData.getAll(name)` when collecting those values; collapsing them into one object property loses the repeated entries.

### Collection rules that survive styling

- Give items stable, unique IDs and keep the key's type consistent. A numeric key and its string representation are different keys.
- Provide `textValue` when an item's rendered content is not plain text. It supports typeahead and text-based accessibility behavior.
- Use `items` plus a renderer or `Collection` for dynamic collections. RAC caches item rendering; update data immutably and use documented `dependencies` when a renderer depends on outside state.
- A collection's `"all"` selection represents the whole collection, including items not currently loaded. It is not synonymous with a set containing only visible rows, and it is not a multiple Select's array value.
- Keep selection, item actions, disabled keys, and sorting distinct. For example, a Table sort descriptor/callback does not itself sort application data.

Sources: [Collections][collections] and [Selection][selection]. Cinder re-exports `Collection`, `useListData`, `useAsyncList`, and `useDragAndDrop`; that availability alone does not verify a particular async, virtualized, or drag-and-drop product workflow.

## 5. Forms, validation, and stable help rows

RAC components default to **native validation behavior**, which blocks invalid submission and can focus the invalid control. `validationBehavior="aria"` reports required/invalid semantics without native submission blocking; the application must decide when submission is allowed. The lower-level hooks can have different defaults, so do not apply a hook's default blindly to a RAC component. [Forms][forms]

The standard relationships are:

- `Label` supplies the accessible name; a placeholder is not a label.
- `Text slot="description"` supplies help associated with the control.
- `FieldError` reads validation state, including native validation errors or a custom render function.
- `name` identifies the submitted field and the key used by `Form.validationErrors` for server errors.
- `validate` provides component-specific client validation; `isInvalid` can explicitly reflect application validation state.

For example:

```tsx
import { Form, TextField, Button } from "@cinder/react";

<Form
  validationBehavior="native"
  onSubmit={(event) => {
    event.preventDefault();
    console.log([...new FormData(event.currentTarget)]);
  }}
>
  <TextField
    label="Email"
    name="email"
    type="email"
    isRequired
    description="Used for account updates."
    errorMessage={({ validationErrors }) => validationErrors.join(" ")}
  />
  <Button type="submit">Save</Button>
</Form>;
```

This illustrates the API, not a new executed test. Server error keys must match `name`; field IDs and visible labels are not substitutes. Native browser validation messages follow the browser's language, **not `I18nProvider`**. Use explicit custom messages when the application requires a particular translation. [Forms][forms]

### Cinder's help-row adaptation

[`FieldHelp`](../packages/react/src/fields.tsx) always renders a `.cinder-field-help` wrapper, with optional description text and a FieldError. Its [CSS](../packages/react/src/styles.css) creates one grid area and reserves **`min-block-size: 1.125rem`**. When the field is invalid and a nonempty error exists, the description is visually hidden and the error occupies the shared row.

This stabilizes ordinary helper/error changes, including validation clearing during a blur before a submit interaction completes. It retains RAC's description/error wiring rather than replacing errors with unrelated text. The rule is a **minimum**: multiline descriptions, translations, or longer errors can still increase the row's height. Custom field children must recreate the desired help composition themselves.

`NativeSelect` has its own native label and `aria-describedby`/`aria-invalid` wiring and conditional helper/error span. It does not use `FieldHelp` or consume RAC Form's validation context. Its `errorMessage` must be supplied explicitly when application validation needs to display one. [NativeSelect implementation](../packages/react/src/pagination.tsx)

## 6. Overlays, theme inheritance, and focus

React context crosses a portal; CSS inheritance follows the DOM. A Popover mounted near `document.body` can therefore retain RAC state while losing the trigger's Cinder theme and layer variables.

Cinder addresses that distinction in [`theme.tsx`](../packages/react/src/theme.tsx):

- `Theme` establishes a theme, resets its layer to `0`, and obtains locale/direction through RAC.
- `Layer` advances the current layer or uses an explicit level. The normal sequence saturates at level `2`.
- `useOverlayTheme()` returns `data-cinder-theme`, `data-cinder-layer`, and `dir` from context.
- Cinder Popover, ModalOverlay, Tooltip, and ToastRegion receive these attributes so their token scopes and direction survive their upstream portal behavior.

A modal composition keeps its trigger, accessible title, and theme context together:

```tsx
import { Theme, Layer, DialogTrigger, Button, Modal, Dialog, Heading } from "@cinder/react";

<Theme theme="g90" locale="en-US">
  <Layer>
    <DialogTrigger>
      <Button>Edit settings</Button>
      <Modal>
        <Dialog>
          <Heading slot="title">Settings</Heading>
          <p>Update your workspace preferences.</p>
          <Button slot="close">Done</Button>
        </Dialog>
      </Modal>
    </DialogTrigger>
  </Layer>
</Theme>;
```

The same pattern applies to a `DialogTrigger` with `Popover` and `Dialog`. RAC handles opening, dismissal, focus movement, and restoration through the composition. Popover positioning includes trigger-relative variables such as `--trigger-width`; Cinder does not need a second hand-written positioning system. [Popover][popover] · [Styling][styling]

### Modality is part of the component contract

A normal **dialog Popover is modal by default**. `isNonModal` is an explicit override intended for carefully integrated patterns such as ComboBox, where focus and assistive-technology access to the input are coordinated with the popup. The official prop documentation cautions against applying it indiscriminately. A visually small floating panel is not necessarily a non-modal interaction. The [installed Popover][popover-runtime] assigns a dialog role when appropriate and avoids adding a second one when a Dialog is already nested inside it.

The [installed ComboBox][combobox-runtime] supplies `isNonModal: true` through PopoverContext. The shared Cinder Popover forwards RAC props and accepts that contextual specialization. Do not force `isNonModal` on every popup to imitate a different library's visual component. Label each Dialog using a title slot or an accessible label, and preserve the expected trigger/overlay relationship. [Popover API][popover]

Upstream [`PortalProvider`][portal-provider] can choose an overlay container; this is separate from Cinder's token propagation. It is **not re-exported by Cinder**, and changing the portal destination does not by itself supply the correct theme attributes. Likewise, consumers composing raw upstream overlays outside Cinder's wrappers must account for the intended DOM theme scope.

The theme bridge copies direction but **does not copy `lang`**. `Theme` sets `lang` on its own DOM root, while a portal can be outside that root. A locally different spoken language in portalled custom content therefore needs an appropriate `lang` on that content/container or the document; the RAC locale context and the DOM language attribute are separate mechanisms.

## 7. Locale, dates, and server-rendering consistency

`Theme locale="…"` wraps `I18nProvider`; when `locale` is omitted it inherits RAC's current locale. `ThemeRoot` then uses `useLocale()` to derive `dir` and its default `lang`. Setting only a DOM `dir` attribute cannot change RAC's localized strings, formatting, or directional keyboard behavior. Similarly, overriding `lang` alone does not update the provider's locale. [I18nProvider][i18n] · [useLocale][use-locale] · [Cinder Theme](../packages/react/src/theme.tsx)

Cinder re-exports `I18nProvider` but **not `useLocale`**. A consumer needing that hook imports it from RAC. A separate provider inside a Theme can also diverge from the Theme's stored direction, so the Theme locale is the coherent boundary for a Cinder theme subtree.

### Segmented date and time entry

Cinder's DateField, TimeField, DatePicker, and DateRangePicker compose **`DateInput` and `DateSegment`**. Editable segments expose individual controls; literal separators are not editable fields. Range inputs use the `start` and `end` slots. This is a meaningful change from a single text-string date-input contract, even when the surrounding field geometry looks familiar. Give each field a task-specific label, such as arrival or departure date, consistent with [Carbon's date-picker guidance][carbon-date]. [Cinder date wrappers](../packages/react/src/dates.tsx) · [DateField][date-field]

Values come from `@internationalized/date`: calendar dates, date-times, zoned date-times, or time values as appropriate. They are not interchangeable with native JavaScript `Date` or arbitrary formatted strings. The DateField guide states that:

- Display format and segment ordering follow locale.
- A Unicode calendar extension can choose the displayed calendar system.
- `onChange` retains the calendar of `value` / `defaultValue`, or uses Gregorian when neither supplies one, independently of the displayed calendar.
- A named DateField submits an ISO 8601 string.

Keep the value type, calendar, and time-zone decisions explicit. Do not hard-code one displayed date order or replace segments with a string input while claiming to preserve the same RAC contract. The current wrappers' default date-dialog labels are English strings such as “Choose a date”; changing `I18nProvider` does not translate application-authored labels. Custom compositions can supply translated content.

### SSR is a separate integration check

The [framework guide][frameworks] requires matching server/client locale. React 18+ uses React's ID support; the archived [`SSRProvider` documentation][ssr-provider] says its wrapper is needed for React 16/17, not React 19.

For an SSR consumer of Cinder:

1. Resolve the locale on the server and pass the same value into the initial client Theme/provider.
2. Keep document `lang`/`dir`, date values, time zones, and the initial collection data consistent with that initial render.
3. Keep interactive components on the framework's client boundary. Cinder's public entry is marked `"use client"`.
4. Verify hydration, IDs/labels, date formatting, and overlay focus after hydration in the actual framework.

The framework guide documents locale-bundle tooling for other bundlers, including Turbopack support added in 1.22.0. It does not establish a Bun adapter for that plugin. Cinder's Bun client-rendered site and the retained probes do not test an SSR/hydration path or locale pruning.

## 8. Precise Carbon adaptations

Cinder's [catalog](../apps/docs/src/catalog.ts) documents **45 component families**. Shared names and Carbon-aligned styling do not imply identical DOM, interaction, or API contracts.

| Carbon-facing family                | Cinder foundation                                     | Actual adaptation                                                                                                  |
| ----------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Toggle                              | RAC Switch                                            | Native checkbox input with switch semantics; Space toggles.                                                        |
| Content switcher                    | RAC ToggleButtonGroup                                 | Radio-group semantics by default; key-set selection and application-owned view content.                            |
| Dropdown / multi-select / combo box | RAC Select / ComboBox                                 | Current scalar-or-array value API and RAC collection/focus behavior.                                               |
| Select / pagination size selector   | Cinder NativeSelect                                   | Native select/options and DOM change events; browser-owned popup.                                                  |
| Data table                          | RAC Table                                             | Interactive grid, with treegrid semantics when configured with a tree column.                                      |
| Contained list                      | RAC GridList                                          | Interactive grid behavior, rather than a static unordered list contract.                                           |
| Tree view                           | RAC Tree                                              | Treegrid semantics, not Carbon's documented tree/treeitem structure.                                               |
| Removable/filter tags               | RAC TagGroup / TagList / Tag                          | Nonempty TagList uses grid semantics; empty TagList uses group. Static Cinder Tag is a separate display component. |
| Date/time pickers                   | RAC segmented fields and calendars                    | Locale-aware segments and internationalized values inside Carbon-aligned geometry.                                 |
| Popover                             | RAC trigger + Popover, with Dialog for dialog content | Modal-by-default dialog behavior, differing from Carbon's documented in-page tab progression.                      |
| Toast notification                  | Experimental RAC toast primitives                     | Queue, landmark navigation, and focus behavior through an explicitly unstable upstream API.                        |

### Switch: Space and Enter are deliberately different

Carbon's [Toggle accessibility page][carbon-toggle] describes a **button** with `role="switch"`, activated by Enter or Space. RAC's installed [`useSwitch`][switch-runtime] instead builds on [`useToggle`][toggle-runtime], which supplies an **`input type="checkbox"`**; Switch adds `role="switch"` and its checked state.

The installed [`usePress`][press-runtime] explicitly restricts checkbox/radio toggling to **Space**. It also preserves the browser's ability to perform **implicit form submission on Enter**. Therefore Enter is not a Switch toggle key and should not be described as universally having “no effect”: its form effect depends on the surrounding form and browser. Cinder preserves this upstream behavior. Keep the control's accessible label stable as its on/off state changes.

### ContentSwitcher is a radio group; Tabs owns tab panels

Carbon [documents ContentSwitcher as a tablist][carbon-switcher], with tab roles and automatic/manual activation choices. In RAC, [`useToggleButtonGroup`][toggle-group-runtime] assigns `radiogroup` / `radio` and `aria-checked` for single selection. Multiple mode uses toolbar/toggle-button behavior instead.

Cinder defaults `ContentSwitcher` to single selection and `disallowEmptySelection`, but spreads caller props afterward, so those defaults are overridable. Its selection remains a **key set**. It does not create tab panels or establish tab-to-panel relationships. Use Cinder Tabs with TabList, Tab, and TabPanel/TabPanels when the content actually needs the tabs pattern. Do not apply a `tab` role to the existing radio-group composition to create apparent parity. [Cinder buttons](../packages/react/src/buttons.tsx) · [ToggleButtonGroup][toggle-group]

### Interactive collections keep their upstream roles

The installed implementations establish the roles, rather than the component's visual shape:

- [`useGrid`][grid-runtime] supplies Table's default `grid`; [`useTable`][table-runtime] changes it to `treegrid` when `state.treeColumn` exists.
- [`useGridList`][gridlist-runtime] supplies `grid` for an interactive list.
- [`useTagGroup`][taggroup-runtime] supplies `grid` when tags exist and `group` when empty.
- [`useTree`][tree-runtime] supplies `treegrid`. Carbon's [Tree view page][carbon-tree] describes `tree` on a list and `treeitem` on its nodes instead.

Preserve the matching row/cell/content composition, accessible names, navigation, and selection behavior. Tests should query those actual roles. Static lists and noninteractive tabular content can use their separate native Cinder components; styling a grid to resemble a list does not change its semantic contract.

### NativeSelect and Popover are explicit boundaries

Carbon [distinguishes Select from Dropdown][carbon-select]: the Select's option popup is browser-owned, while the Dropdown's list can be styled. Cinder reflects that distinction with **NativeSelect** versus **Select/ComboBox**. NativeSelect accepts native `disabled`, `required`, `<option>` children, and `onChange(event)`. Its `size` prop is Cinder control density, not the native HTML visible-option-count attribute. It does not accept RAC `isDisabled`/`isRequired` or RAC selection callbacks. [Implementation](../packages/react/src/pagination.tsx)

Carbon's [Popover accessibility page][carbon-popover] describes focus remaining on the trigger after opening, then tabbing into interactive content and out to close. Cinder's normal dialog Popover follows RAC's modal focus contract described above. These are different interaction models even when both are rendered as a small floating surface.

The Carbon comparisons here use six archived first-party page extracts, whose source URLs and extraction details are retained in [.research/carbon/pages](../.research/carbon/pages/). The broader Carbon token, specification, and coverage research is in [research-carbon.md](research-carbon.md).

## 9. Newer and experimental features

| Upstream feature             | Upstream status/evidence                                                                 | Cinder scope                                                                                                                                         |
| ---------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| NavigationTree               | Ordinary exported component name, introduced in 1.21.0                                   | Absent from Cinder's public exports; Tree and SideNav are not claims of NavigationTree parity.                                                       |
| Sheet                        | Ordinary exported component name, introduced in 1.22.0                                   | Absent from Cinder's public exports; Modal is not a swipeable Sheet implementation.                                                                  |
| TokenField                   | Explicitly described as alpha in 1.20.0; selection model changed in 1.21.0               | Absent from Cinder's public exports. Its absence is not a defect in the documented Select/ComboBox value API.                                        |
| PreviewTrigger               | Introduced in 1.20.0 for hover/focus/long-press interactive previews                     | Absent from Cinder's public exports; Tooltip is not a substitute for interactive preview content.                                                    |
| Menu async loading additions | `renderEmptyState` and `MenuLoadMoreItem` described in 1.21.0                            | Menu props remain upstream through the direct export, but Cinder does not export MenuLoadMoreItem or establish a complete styled load-more workflow. |
| Toast                        | `UNSTABLE_ToastQueue`, `UNSTABLE_ToastRegion`, `UNSTABLE_Toast`, `UNSTABLE_ToastContent` | Wrapped by Cinder's explicitly experimental ToastProvider/useToast.                                                                                  |
| `@react-aria/test-utils`     | Archived npm version `1.0.0-rc.1`; guide labels it release-candidate tooling             | Not a dependency or verified Bun testing path in the current Cinder root manifest.                                                                   |

Sources: [release articles](#recent-release-changes-that-matter-here), [Toast][toast], [Testing][testing], [npm snapshot](../.research/rac/npm/), and the [Cinder export list](../packages/react/src/index.ts). “Newer” and “experimental” are distinct: NavigationTree and Sheet do not have `UNSTABLE_` export names.

### Toast's exposed contract

[`ToastProvider`](../packages/react/src/feedback.tsx) creates a queue per provider with **at most three visible toasts**, renders structured title/description slots and a sibling close button, and exposes `add(message, options)` and `close(key)` through `useToast`. The hook requires a provider. This is a narrower API than every operation available on an upstream queue.

The official [Toast guidance][toast] describes F6 / Shift+F6 landmark navigation, focus movement when a toast closes, focus restoration after the last toast, and pausing timers on hover/focus. It recommends a **minimum five-second timeout** and auto-dismissal only for noncritical or otherwise available information. Cinder forwards the timeout options; it does **not enforce** that minimum. The current browser interaction test covers displaying/dismissing a toast, not the complete timing, landmark, queue-overflow, or assistive-technology contract.

## 10. Bun integration and testing choices

The retained Bun research establishes a working ordinary React/RAC browser path; RAC's framework guide does not supply a separate Bun integration layer. Continue using the exact local runtime, HTML-entry development server, and explicit library package boundary documented in [research-bun.md](research-bun.md).

| Concern               | Evidence-backed choice                                                                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Development           | Bun HTML imports and `Bun.serve` with browser HMR. The retained probe preserves a RAC button's React state through a component edit and an imported token-CSS edit.            |
| Production library    | ESM with React/RAC external, production JSX transform, declarations, and a CSS export. Keep the interactive entry's `"use client"` directive.                                  |
| Type declarations     | TypeScript `emitDeclarationOnly`. The installed Bun revision's advertised `dts` option did not emit declarations in the saved capability probe.                                |
| DOM tests             | Explicit Happy DOM registration before Testing Library initialization. The three advertised native environment selectors left `document` undefined in the saved Bun probes.    |
| Browser tests         | Playwright browser APIs with `bun:test`; Cinder's suites import Playwright assertions from `playwright/test`. Browser/server setup and teardown remain explicit.               |
| RAC interaction tests | Query actual roles and accessible names; simulate complete user interactions and await state/focus changes. A lone synthetic click is insufficient for every interaction path. |

Evidence: [HMR/browser results](../.research/bun/probes/browser.json), [production library and Bun-run Playwright result](../.research/bun/probes/production-library.json), [DOM/build results](../.research/bun/probes/build-and-dom.json), [capability results](../.research/bun/probes/capabilities.json), and [RAC Testing guide][testing]. These records were inspected for this report; their experiments were run by the earlier Bun research work.

The RAC testing guide recommends semantic queries, Testing Library user-event, appropriate timer handling, and explicit geometry/event setup for simulated movement. Its examples use Jest APIs in places; those are patterns to adapt, not evidence that the exact snippets run unchanged under Bun. Happy DOM does not establish real layout, font, hit-target, focus-engine, or assistive-technology behavior.

The saved real-browser probes used **Chrome 156.0.8078.80 on macOS**. The broader HMR probe used Python Playwright **1.62.0**; the separately successful `bun test` probe used JavaScript Playwright **1.65.0**. Keep those separate when reproducing an environment. [Bun browser-testing details](research-bun.md#playwright-with-bun)

## 11. Verification evidence and remaining gaps

### What was examined

| Evidence                                                                                            | What it establishes                                                                                                                                                                                                                                                                         |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Installed RAC/state declarations and runtime                                                        | Exact value shapes, deprecated aliases, role assignment, checkbox key behavior, and package-level contracts. This is source inspection.                                                                                                                                                     |
| [Contract tests](../tests/browser/contracts.test.ts) and [fixture](../tests/fixtures/contracts.tsx) | Definitions cover selected refs/render props, controlled fields, current single/multiple values, four themes, nested/saturated layers, RTL portals, and focus return.                                                                                                                       |
| [Interaction tests](../tests/browser/interactions.test.ts)                                          | Definitions cover buttons, selection, validation/submission, filtering, dates/time segments, tables, modal/menu/popover focus, tags/tree expansion, and toast dismissal. The implementation handoff reports these and the contract checks passed; this research did not execute them again. |
| [Documentation browser tests](../tests/browser/docs.test.ts)                                        | Definitions cover production routes, three viewport widths, four themes, reduced motion, and configured axe checks. Definitions alone are not a recorded successful run.                                                                                                                    |
| [Packed-consumer result](../test-results/package-consumer.json)                                     | A saved `passed: true` result at `2026-11-06T00:22:47.022Z` for Cinder `0.1.0`, including strict declarations without path aliases, package exports, refs, theme/portal behavior, keyboard state, form submission, and selection.                                                           |
| Retained Bun probe results in section 10                                                            | Successful runtime/build/DOM/browser capability probes, with their environment and expected negative cases preserved.                                                                                                                                                                       |
| Archive integrity inspection                                                                        | Recomputed byte counts and SHA-256 values matched all 213 archived documents and the index. This verifies retained source integrity, not component behavior.                                                                                                                                |

### Retained axe files are earlier failure diagnostics

The 46 existing `test-results/a11y-*.json` files have timestamps from **2026-11-05T23:30:44.694Z to 2026-11-05T23:36:42.465Z**; a metadata/violation-summary inspection found violations in all 46. Examples include `label-content-name-mismatch` in [the ContentSwitcher snapshot](../test-results/a11y-content-switcher-g10.json) and `color-contrast` in [the gray-90 DatePicker snapshot](../test-results/a11y-date-picker-g90.json).

The current documentation test writes these JSON files **only when violations exist** and does not remove an earlier file on success. Their presence is therefore neither a clean-audit receipt nor proof that those earlier failures persist in current code. Read the implementation run result for current status. This report has not rerun axe or promoted those snapshots into a passing accessibility claim.

### Explicit coverage gaps

- **Manual assistive technology:** no manual NVDA, JAWS, VoiceOver, TalkBack, braille, speech-input, or screen-magnifier verification was performed by this research. Upstream or Carbon testing claims do not transfer automatically to Cinder compositions.
- **Browser engines and platforms:** the inspected runtime evidence is Chrome/macOS. Firefox, WebKit/Safari, real iOS/Android, and Linux CI remain outside that evidence.
- **Locale/calendar coverage:** an RTL fixture and locale-aware implementation do not verify every translation, writing direction, numbering system, calendar, time zone, or daylight-saving boundary. Application-authored strings also need localization.
- **SSR/hydration:** no Bun SSR or external-framework hydration probe establishes initial ID, language, date, collection, or overlay correctness.
- **Advanced/new/experimental features:** full Toast timing/landmark behavior, newer unexported components, collection virtualization, broad async races, and all drag-and-drop modalities were not comprehensively exercised.
- **Version range and composition breadth:** the exact installation and selected fixtures do not prove all declared peer versions, all custom `render` functions, all wrapper props, or every combination of nested overlays.
- **Visual/accessibility combinations:** automated scans of sampled states cannot establish every zoom level, forced-colors setting, focus treatment, target size, or long translated message. Follow-up validation should target the actual supported configurations.

The aggregate build/package/browser gate remains the implementation's verification boundary. This research deliverable is checked for formatting, source provenance, and local/reference-link consistency.

## 12. Archive and honest reading coverage

Research starts at the official **[RAC `llms.txt` index][llms]**. The retained [archive script](../.research/rac/archive-docs.mjs) follows the Markdown documents explicitly indexed there, with **six workers**, **three attempts per request**, and **60-second per-request timeouts**.

The [manifest](../.research/rac/manifest.json) records a capture from **`2026-11-05T22:49:16.913Z`** through **`2026-11-05T22:49:41.460Z`**:

- **213 indexed documents; 213 successful document downloads; zero document failures.**
- **3,321,473 document bytes**, plus the **40,078-byte** index: **3,361,551 bytes** across 214 source files.
- Per-document source/final URL, timestamp, response metadata, byte count, line count, and SHA-256.
- Ten npm package records, each with a saved dist-tag response and exact-version metadata response: **20 additional JSON files**. These normalized JSON saves are separate from the document byte/hash totals; package tarball integrity metadata is not a claim that this research verified every tarball.

All 214 document/index byte counts and SHA-256 values were recomputed and matched the manifest. That proves the retained snapshot matches its recorded contents. It does not prove every downloaded document was read or every claim within it validated.

### Reading coverage

The conservative [reading ledger](../.research/rac/read-coverage.json) records the following substantive RAC archive reads:

| Reading mode                            | Sources                                                                                                                                                          |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Full, raw source — seven guides         | Styling, Customization, Selection, Forms, Framework setup, Testing, Collections.                                                                                 |
| Full, raw source — two release articles | `releases/v1-21-0.md`, `releases/v1-22-0.md`.                                                                                                                    |
| Full, raw source — five utility pages   | I18nProvider, useLocale, PortalProvider, SSRProvider, mergeProps.                                                                                                |
| Full, raw source — one hook page        | `Switch/useSwitch.md`.                                                                                                                                           |
| Targeted raw sections — seven documents | Select, ComboBox, ToggleButtonGroup, DateField, Popover, Toast, and the opening sections of the 1.20.0 release. Exact ranges are in the ledger.                  |
| Index scan                              | The complete eight-line `releases/index.md`; this is an index scan, not an additional release article.                                                           |
| Other inspection                        | Selected component headings/API rows were searched; installed types/runtime, Cinder source/test definitions, and saved result records were inspected separately. |

Thus **15 archived source texts were fully read**, **seven were read in selected sections**, and **one release index was scanned** in the positively recorded coverage. The remaining archive is available for lookup, with some keyword-only inspection; it is not counted as substantively read. Earlier component/API reading history does not provide an exhaustive per-file ledger, so no broader full-reading claim is made. The seven guides above were subsequently read in full raw form, superseding their earlier partial-read status.

The retained [`read-view.mjs`](../.research/rac/read-view.mjs) is a **filtered reading aid**, not a verbatim source. It omits starter CSS, duplicate Tailwind sections, and many DOM/ARIA/event rows; **`--prose` also omits most code examples**. It preserves source line numbers for displayed lines and rewrites the long `render` description. Its source was reviewed, but no helper output is counted as a full raw read in this report. A filtered view can span a document without exposing all its contents.

The ledger's line ranges use ordinary numbered source lines. The manifest's `text.split("\n").length` includes a trailing empty entry for newline-terminated files and is generally one larger. Carbon comparison pages are separately identified as complete reads of the retained **HTML-main extracts**, not full original HTML or inspected screenshots.

### Reproduction and source lookup

From the repository root, the existing archive can be regenerated with:

```sh
./node_modules/.bin/bun .research/rac/archive-docs.mjs
```

That script downloads afresh and rewrites its source files and manifest. Preserve this dated snapshot when comparing a later capture. For lookup, an official URL such as `https://react-aria.adobe.com/Select.md` maps to `.research/rac/docs/Select.md`; the manifest identifies the exact archived bytes.

Installed implementation citations below point to files in this installation. They are implementation evidence, not public import paths: application code should use RAC's public exports. Reinstall from the pinned lockfile to recover those dependencies.

[llms]: https://react-aria.adobe.com/llms.txt
[npm-tags]: https://registry.npmjs.org/-/package/react-aria-components/dist-tags
[npm-rac]: https://registry.npmjs.org/react-aria-components/1.22.1
[release-120]: https://react-aria.adobe.com/releases/v1-20-0.md
[release-121]: https://react-aria.adobe.com/releases/v1-21-0.md
[release-122]: https://react-aria.adobe.com/releases/v1-22-0.md
[styling]: https://react-aria.adobe.com/styling.md
[customization]: https://react-aria.adobe.com/customization.md
[merge-props]: https://react-aria.adobe.com/mergeProps.md
[collections]: https://react-aria.adobe.com/collections.md
[selection]: https://react-aria.adobe.com/selection.md
[select]: https://react-aria.adobe.com/Select.md
[combobox]: https://react-aria.adobe.com/ComboBox.md
[toggle-group]: https://react-aria.adobe.com/ToggleButtonGroup.md
[forms]: https://react-aria.adobe.com/forms.md
[popover]: https://react-aria.adobe.com/Popover.md
[portal-provider]: https://react-aria.adobe.com/PortalProvider.md
[i18n]: https://react-aria.adobe.com/I18nProvider.md
[use-locale]: https://react-aria.adobe.com/useLocale.md
[date-field]: https://react-aria.adobe.com/DateField.md
[frameworks]: https://react-aria.adobe.com/frameworks.md
[ssr-provider]: https://react-aria.adobe.com/SSRProvider.md
[toast]: https://react-aria.adobe.com/Toast.md
[testing]: https://react-aria.adobe.com/testing.md
[carbon-toggle]: https://www.carbondesignsystem.com/building-blocks/core/components/toggle/accessibility
[carbon-switcher]: https://www.carbondesignsystem.com/building-blocks/core/components/content-switcher/accessibility
[carbon-tree]: https://www.carbondesignsystem.com/building-blocks/core/components/tree-view/accessibility
[carbon-select]: https://www.carbondesignsystem.com/building-blocks/core/components/select/guidelines
[carbon-popover]: https://www.carbondesignsystem.com/building-blocks/core/components/popover/accessibility
[carbon-date]: https://www.carbondesignsystem.com/building-blocks/core/components/date-picker/accessibility
[select-types]: ../node_modules/.bun/node_modules/react-stately/dist/types/src/select/useSelectState.d.ts
[combobox-types]: ../node_modules/.bun/node_modules/react-stately/dist/types/src/combobox/useComboBoxState.d.ts
[combobox-runtime]: ../packages/react/node_modules/react-aria-components/dist/private/ComboBox.mjs
[popover-runtime]: ../packages/react/node_modules/react-aria-components/dist/private/Popover.mjs
[switch-runtime]: ../node_modules/.bun/node_modules/react-aria/dist/private/switch/useSwitch.mjs
[toggle-runtime]: ../node_modules/.bun/node_modules/react-aria/dist/private/toggle/useToggle.mjs
[press-runtime]: ../node_modules/.bun/node_modules/react-aria/dist/private/interactions/usePress.mjs
[toggle-group-runtime]: ../node_modules/.bun/node_modules/react-aria/dist/private/button/useToggleButtonGroup.mjs
[grid-runtime]: ../node_modules/.bun/node_modules/react-aria/dist/private/grid/useGrid.mjs
[table-runtime]: ../node_modules/.bun/node_modules/react-aria/dist/private/table/useTable.mjs
[gridlist-runtime]: ../node_modules/.bun/node_modules/react-aria/dist/private/gridlist/useGridList.mjs
[taggroup-runtime]: ../node_modules/.bun/node_modules/react-aria/dist/private/tag/useTagGroup.mjs
[tree-runtime]: ../node_modules/.bun/node_modules/react-aria/dist/private/tree/useTree.mjs
