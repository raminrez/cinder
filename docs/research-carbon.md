# Carbon research for Cinder

Research baseline: **6 November 2026**. Source acquisitions carry their original UTC timestamps in the archive. The starting index is Carbon’s [`llms.txt`][carbon-index].

**Implementation direction:** use Carbon v11’s visual rules and interaction contracts, implement behavior with current React Aria Components (RAC) where the contracts agree, and use semantic HTML where that preserves Carbon’s model more closely. Cinder’s own identity comes from composition, editorial typography, and the live four-theme specimen described in [the design brief](design-direction.md).

This report combines an upstream implementation reference with a **scoped, static snapshot of Cinder’s 45-entry catalog, wrappers, stylesheet, and token generator taken before the final product-correction pass**. Its Cinder findings and crosswalk preserve that inspected state. Final resolved findings, remaining gaps, and execution results belong in [implementation coverage](coverage.md) and the forthcoming `docs/verification.md`. The upstream contracts below remain implementation targets; the snapshot does not establish Cinder runtime or accessibility conformance.

## Contents

- [Prioritized corrections in the Cinder snapshot](#prioritized-corrections-in-the-cinder-snapshot)
- [Nine priority mismatch checks](#nine-priority-mismatch-checks)
- [Version boundary: v11 and v12](#version-boundary-v11-and-v12)
- [Foundations](#foundations)
- [Current RAC integration rules](#current-rac-integration-rules)
- [Minimum contracts for all 42 component families](#minimum-contracts-for-all-42-component-families)
- [Exact crosswalk for Cinder’s 45 catalog entries](#exact-crosswalk-for-cinders-45-catalog-entries)
- [Visual evidence actually viewed](#visual-evidence-actually-viewed)
- [Findings from the rest of the index](#findings-from-the-rest-of-the-index)
- [Disagreement ledger](#disagreement-ledger)
- [Implementation acceptance and remaining gaps](#implementation-acceptance-and-remaining-gaps)
- [Licensing and identity](#licensing-and-identity)
- [Provenance and review coverage](#provenance-and-review-coverage)

## Prioritized corrections in the Cinder snapshot

These findings record the **static source snapshot before the final correction pass**, including the P1 button, compound-size, notification, and calendar findings and the narrow P2 geometry findings. **P1** affects shared geometry, state contrast, or a promised interaction contract; **P2** completes narrower visual/API coverage. “Current evidence” below means the source at that snapshot, with its then-current line numbers; it is not an assertion that each defect remains open after subsequent fixes. Final resolved/gap results will be recorded in [coverage](coverage.md) and `docs/verification.md`. The inspected [catalog](../apps/docs/src/catalog.ts) already declared several RAC adaptations, so a documented difference is not listed as an undisclosed defect.

| Priority                                                | Current evidence                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Correction and upstream authority                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **P1 — button states and ghost geometry**               | [styles.css:63–168](../packages/react/src/styles.css#L63-L168) gives ghost buttons the shared **32px gap**, 15px start/16px end padding before borders, unchanged link text on hover/press, and neutral danger-ghost hover/pressed surfaces. The generic focus rule also differs from the source’s border/two-inset composition.                                                                                                                                                                                                                                                                        | Use an **8px ghost icon gap**, symmetric 15px CSS padding plus 1px border, `link-primary-hover` for ordinary ghost hover/active text, and `button-danger-hover` / `button-danger-active` with `text-on-color` for danger-ghost. Reproduce variant-specific focus; danger-tertiary has a focus fill that the examined danger-ghost branch does not. [Button SCSS:198–228, 346–426][s-button], [focus mixin:134–138][s-button-mixins], [viewed diagrams](#visual-evidence-actually-viewed).                                                                                    |
| **P1 — size inheritance and switcher outline**          | [Accordion:69–104](../packages/react/src/collections.tsx#L69-L104) sets size on the group, but its trigger uses [Button’s `lg` default:24–37](../packages/react/src/buttons.tsx#L24-L37). [Size aliases:36–44](../packages/react/src/styles.css#L36-L44) therefore give the trigger a 48px minimum even when the parent requests 32/40px. [ToggleButton:68–90](../packages/react/src/buttons.tsx#L68-L90) similarly keeps a child `md` default inside any switcher size. [Switcher CSS:551–584](../packages/react/src/styles.css#L551-L584) has no equal-width rule, 1px outline/dividers, or 4px ends. | Make compound controls inherit their advertised size, then verify **32/40/48px** border boxes. Supply equal-width switcher segments, 16px insets, 1px boundaries, and 4px ends. Accordion’s default target is 40px; its panel spacing also differs at [styles.css:914–928](../packages/react/src/styles.css#L914-L928). [Accordion specification][c-accordion-spec]; [switcher SCSS:25–35, 148–175, 190–199][s-content-switcher]. The catalog explicitly retains a radio-group switcher adaptation; Carbon tab/panel parity remains outside that choice.                     |
| **P1 — notification contrast and contract**             | [styles.css:1310–1356](../packages/react/src/styles.css#L1310-L1356) changes the high-contrast surface to inverse but leaves ordinary `support-*` icon/rail colors. [InlineNotification:27–74](../packages/react/src/feedback.tsx#L27-L74) allows an action inside a default `status` region and uses a **32px** close button. [Toast:207–232](../packages/react/src/feedback.tsx#L207-L232) also uses a 32px close button; [styles.css:1431–1464](../packages/react/src/styles.css#L1431-L1464) caps the region at **384px**.                                                                          | Pair inverse surfaces with **`support-*-inverse`**. For v11 fidelity, use the 48px close target, source 15px inline text padding, and 288/352px toast widths. Give passive, callout, and actionable content separate documented contracts: Carbon’s default actionable notification is an `alertdialog` with explicit focus management. A passive live region plus an action is an adaptation, not that implementation. [Inverse variants:158–193][s-inline-notification], [notification source][s-notification-react], [existing upstream measurements][cascade-results].   |
| **P1 — calendar state colors and focus**                | [styles.css:1211–1248](../packages/react/src/styles.css#L1211-L1248) uses `interactive` / `text-inverse` for selected days and endpoints, and the shared 2px focus treatment. Those tokens diverge from stable blue/white in dark themes. Range interiors already use `highlight`.                                                                                                                                                                                                                                                                                                                      | Use **`button-primary` / `text-on-color`** for selection/endpoints; ordinary day focus uses `button-primary`, selected focus uses a **1px inner outline at −3px**. Preserve independent today/range/unavailable states. Also measure the 16px current calendar padding and 32px navigation buttons against the 4/4/8px padding and 40px navigation target. [Classic SCSS:515–598][s-flatpickr], [specification][c-date-picker-spec], [Cinder calendar:34–50](../packages/react/src/dates.tsx#L34-L50), [styles.css:1163–1206](../packages/react/src/styles.css#L1163-L1206). |
| **P2 — compact toggle and slider**                      | [styles.css:525–538](../packages/react/src/styles.css#L525-L538) uses a 12px small-toggle thumb with 2px inset. [Slider CSS:607–632](../packages/react/src/styles.css#L607-L632) uses a 2px track and scales a 14px thumb by 1.15, about 16.1px. The [catalog:285–288](../apps/docs/src/catalog.ts#L285-L288) also describes the 2px track.                                                                                                                                                                                                                                                             | Small toggle is **10px thumb / 3px inset**. Slider is **4px track / 14→20px active thumb**; range thumbs are **16px in both states**. Keep RAC’s range-relative page increment explicit. [Toggle SCSS:59–80, 119–131][s-toggle], [Slider specification:85–117][c-slider-spec], [RAC slider state][r-slider-state].                                                                                                                                                                                                                                                           |
| **P2 — complete type tokens and apply the right roles** | [generate.ts:67–74](../packages/tokens/scripts/generate.ts#L67-L74) excludes `headingCompact01/02`, every `fluid*` style, and nested display breakpoint objects. [Snippet CSS:1475–1482](../packages/react/src/styles.css#L1475-L1482) uses 14px/1.6 Mono and 24px padding, while the Carbon block reference is `code-01` 12/16px and 16px padding.                                                                                                                                                                                                                                                     | Include compact heading tokens and preserve the responsive type definitions if expressive/fluid coverage is claimed. Do not flatten a breakpoint-bearing display token into only its base values. **Both `label-01` and `helper-text-01` use 0.32px tracking**; 0.16px belongs to the 14px compact/body roles. [Pinned type JS:272–288, 560–577, 665–682][s-type-js], [Code snippet source][s-code-snippet].                                                                                                                                                                 |

### Corrections and declared boundaries already present in the snapshot

- **Subtle-border layer offsets are fixed in source and generated CSS:** [generate.ts:107–114](../packages/tokens/scripts/generate.ts#L107-L114) and [tokens.css:1401–1450](../packages/tokens/src/tokens.css#L1401-L1450) select **00/01/02**, agreeing with [upstream layer sets:67–72][s-layer-sets]. Runtime nesting remains a verification condition, not an open generator defect.
- **Sparse dark-theme aliases are intentional:** [generate.ts:44–52](../packages/tokens/scripts/generate.ts#L44-L52) maps notification action hover to contextual layer hover and orange/yellow status outlines to their matching status colors. This follows [notification token fallbacks:108–128][s-notification-tokens] and [status token fallbacks:63–130][s-status-tokens]; do not fill absent entries by inheriting white-theme values.
- **Catalog size props now match the wrappers:** [Button:66–67](../apps/docs/src/catalog.ts#L66-L67) explicitly lists its five 32–80px sizes; [Text area:111–114](../apps/docs/src/catalog.ts#L111-L114) lists rows and excludes the shared control-size prop. These documentation fixes do not change the component geometry findings above.
- **Split-family links have been corrected:** [Text area:108](../apps/docs/src/catalog.ts#L108) now targets Text input and [Overflow menu:812](../apps/docs/src/catalog.ts#L812) targets Menu. Combo box/Multi-select, date range/time, Toast, and UI shell also use their parent families. Menu buttons supplies the additional overflow/split-trigger specification; the shared `usage` suffix still merits canonical-route normalization.
- **Interaction adaptations are now visible in the catalog:** Toggle’s Space-only input model ([270–271](../apps/docs/src/catalog.ts#L270-L271)); Content switcher’s single-selection radio group ([435–444](../apps/docs/src/catalog.ts#L435-L444)); Tree’s treegrid ([487–494](../apps/docs/src/catalog.ts#L487-L494)); Table and Contained list grids ([525–558](../apps/docs/src/catalog.ts#L525-L558)); filter-tag grid navigation ([595–605](../apps/docs/src/catalog.ts#L595-L605)); and Popover’s focus-containing dialog ([820–830](../apps/docs/src/catalog.ts#L820-L830)). Retain these qualifications. They explain behavior choices without establishing full Carbon parity.
- **Portal context and reduced motion have implementations to verify:** [theme.tsx:71–75](../packages/react/src/theme.tsx#L71-L75) carries theme/layer/direction to overlays; [styles.css:1791–1801](../packages/react/src/styles.css#L1791-L1801) disables animations/transitions and smooth scrolling. Conversely, Cinder’s [Layer:46–64](../packages/react/src/theme.tsx#L46-L64) always paints through [styles.css:33–34](../packages/react/src/styles.css#L33-L34), unlike Carbon’s default `withBackground=false`. State this API difference explicitly.

## Nine priority mismatch checks

These checks have the highest likelihood of catching a plausible-looking but inaccurate Carbon implementation. References distinguish documentation intent from the pinned stylesheet and current-source behavior.

### 1. Button: component tokens, asymmetric space, and focus

- Normal-density, text-only buttons reserve **16px at the start and 64px at the end**. The source implements 15px/63px padding plus a 1px border. Ghost buttons are symmetric; their icon gap is 8px. A trailing icon belongs at the end inset, not immediately after the label in an otherwise symmetric button.
- The height scale is **24, 32, 40, 48, 64, 80px** (`xs` through `2xl`). The common productive button is 48px high with 14px type and a 16px icon. The expressive 48px treatment uses 16px type and a 20px icon. Preserve the source’s minimum-height/content growth behavior for wrapping text.
- Use **`button-primary`**, not `interactive`, for primary fill. It is `#0f62fe` in all four themes. In g90/g100, `interactive` is `#4589ff` and `focus` is white; substituting either changes the button.
- Focus is a composed border/inset treatment: the variant mixin sets the focus-colored border and two inset shadows. A generic outside blue halo does not reproduce it. Disabled filled buttons use `button-disabled` and `text-on-color-disabled`; tertiary and ghost disabled treatments remain transparent.
- **Cinder check:** compare text-only, icon-bearing, icon-only, ghost, danger, disabled, and keyboard-focused examples in all four themes. Verify the end space and the focus inset at the actual border box.

Sources: [Button specifications][c-button-spec], [button mixins, lines 23–148][s-button-mixins], [variant styles][s-button], [button component tokens][s-button-tokens].

### 2. Fields: underline, label rhythm, and disabled disagreement

- Text/password fields support **24/32/40/48px** heights; 40px is the source default. Normal-density start padding is 16px. Labels use `label-01` (12/16px) with an 8px gap; helper/error text uses the 12px supporting scale with a 4px gap.
- The normal field uses contextual `field`, a **1px `border-strong` underline**, `text-primary`, and `text-placeholder`. Focus and invalid states use **2px inset outlines**; error color is `support-error`. Keep the warning/error icon, explanatory text, and accessible association distinct from the color treatment.
- Fluid fields are a separate **64px, label-inside-field** pattern; they are not merely the largest size of the normal labeled field.
- **Documentation/source disagreement:** Text input Specifications says the disabled bottom border is transparent. The pinned v11 stylesheet retains its 1px `border-strong` rule. A Chromium check with the unmodified stylesheet confirms **1px solid `rgb(141, 141, 141)`** in the default white context. For source parity, retain it and document the disagreement.
- **Cinder check:** distinguish empty, populated, disabled, read-only, focused, invalid, warning, password-visible, and helper-text states. A read-only field must still expose its value; disabling a field is not an equivalent implementation.

Sources: [Text input specifications][c-text-input-spec], [Text input accessibility][c-text-input-a11y], [field SCSS][s-text-input], [Form SCSS][s-form], [fluid styles][p-fluid], [browser evidence][cascade-results].

### 3. Checkbox: a 16px neutral control

- The visible box is **16×16px**, with a 1px border and **2px corner radius**. The label gap is 8px; group-label gap is 8px; vertically stacked item spacing is 4px.
- Unselected: transparent fill and `icon-primary` border. Selected/indeterminate: **`icon-primary` fill and `icon-inverse` mark**. Carbon checkboxes are not primary-blue filled controls.
- Keyboard focus is a **2px outline with a 1px outside offset** in the examined SCSS. The specification’s “border inset” wording should not be copied literally into an inset ring.
- Read-only checked controls use a transparent background, disabled border treatment, and a primary-colored mark. Preserve the disabled/invalid/read-only precedence instead of reducing everything to opacity.
- **Cinder check:** use independent Tab stops and Space activation; expose mixed state; associate a group label and description/error. Test nested parent/child selection logic separately from the checkbox primitive.

Sources: [Checkbox specifications][c-checkbox-spec], [accessibility][c-checkbox-a11y], [checkbox SCSS][s-checkbox], [RAC Checkbox][r-checkbox], [RAC CheckboxGroup][r-checkboxgroup].

### 4. Toggle: geometry and the Enter-key mismatch

- Standard track: **48×24px**; thumb: **18px**; inset: 3px; travel: 24px. Small track: **32×16px**; thumb: **10px**; inset: 3px; travel: 16px.
- Off uses `toggle-off`; on uses **`support-success`**, with a white thumb. State-label gap is 8px. The top label’s v11 gap is **16px**; the v12 reduced-label-spacing flag changes it to 8px.
- Carbon implements a native **button with `role="switch"`** and supports **Enter and Space**. The accessible label stays constant; visible On/Off state text is separate and hidden from assistive technology because `aria-checked` conveys state.
- RAC 1.22.1’s old `Switch` is deprecated in favor of **`SwitchField` + `SwitchButton`**. Both remain input-backed through `useSwitch`/`useToggle`. `usePress` explicitly excludes Enter toggling for checkbox/radio inputs; Enter may instead participate in implicit form submission. Replacing the old RAC component name does not remove the mismatch.
- **Cinder check:** either document the RAC-native Space-only activation difference or implement and verify a Carbon-compatible adapter. Enter, Space, label click, controlled state, read-only state, and form behavior must each work once, without duplicate toggles.

Sources: [Toggle specifications][c-toggle-spec], [accessibility][c-toggle-a11y], [Toggle.tsx][s-toggle-react], [toggle SCSS][s-toggle], [RAC Switch][r-switch], [Switch declarations, lines 147–160][r-switch-types], [input-backed implementation][r-switch-source], [`usePress` lines 710–733][r-usepress], [`useToggle`][r-usetoggle].

### 5. Content switcher: use tabs semantics

- Heights: **32/40/48px**; 4px outer corners; equal-width segments; 16px label insets. High-contrast selection uses `layer-selected-inverse` and `text-inverse`; low-contrast selection uses the dedicated content-switcher tokens and semibold selected text.
- Carbon uses **`tablist` / `tab`**, not a radio group or a pressed-button toolbar. Automatic activation is the default in the examined React source; manual activation is an explicit option.
- **Cinder check:** map to `Tabs`, `TabList`, `Tab`, and associated `TabPanel`s. One tab stop enters the group; arrows move between options. Automatic selection follows focus; manual selection waits for Enter/Space. Keep focus visually distinguishable from selection, including low contrast and disabled options.

Sources: [Content switcher specifications][c-content-switcher-spec], [accessibility][c-content-switcher-a11y], [React implementation][s-content-switcher-react], [SCSS][s-content-switcher], [RAC Tabs][r-tabs].

### 6. Data table: native table versus RAC grid

- Body-row heights: **24/32/40/48/64px**, with 48px the default. Cell insets are 16px. Column headers use `heading-compact-01` on `layer-accent`; body cells use `body-compact-01` on `layer`. The separate title/description region has its own container treatment.
- States include `layer-hover`, `layer-selected`, and the source’s **`data-table-column-hover`** selected-hover treatment. An embedded input needs the correct next field layer; a table background alone does not establish that context.
- Carbon’s documented interaction model is a **semantic table with ordinary Tab navigation to controls**. RAC `Table` is a **grid-navigation widget**, with row/cell focus, arrow keys, selection, and optional cell navigation. Its `keyboardNavigationBehavior="tab"` setting controls entry into cell children; it does not establish native-table equivalence.
- **Cinder check:** use `<table>`, caption/accessible naming, `<th scope>`, sort buttons with `aria-sort`, row checkboxes, and explicit expansion buttons for the Carbon-aligned table. If offering RAC Table, name and document the grid interaction model as an intentional variant. A styled collection of divs is insufficient.

Sources: [Data table specifications][c-data-table-spec], [accessibility][c-data-table-a11y], [table SCSS][s-data-table], [RAC Table][r-table], [table state declaration][r-table-state].

### 7. Calendar: the 40px day grid and source-specific state colors

- The documented calendar menu is **288×336px**, with 4px top/side and 8px bottom padding, **40px day/navigation cells**, and a 4px today dot. Date field text uses **Plex Mono `code-02`**.
- The classic Flatpickr stylesheet uses **`button-primary`** for the selected-day fill and ordinary focused-day outline, and **`highlight`** for the selected range. The selected-day inner outline is **1px, offset −3px**. Specifications calls some focus colors generic `focus`; that differs in dark themes.
- Keep today, keyboard focus, selection, selected range, unavailable dates, disabled dates, and adjacent-month dates independently representable.
- **Cinder check:** compose RAC `DatePicker`/`DateRangePicker`, `DateInput`/`DateSegment`, `Calendar`/`RangeCalendar`, and their grid/cell parts. RAC’s locale-aware segmented input is a behavioral adaptation of Carbon’s classic text field; document it. Verify month/year boundaries, leap days, min/max, unavailable dates, keyboard dismissal, and focus return.
- The separately exported `preview__DatePicker` uses Temporal/shared state and a native-popover implementation. It is a different preview path; enabling a radius flag does not make the classic picker that component.

Sources: [Date picker specifications][c-date-picker-spec], [accessibility][c-date-picker-a11y], [classic Flatpickr SCSS][s-flatpickr], [preview documentation][s-date-preview], [RAC DatePicker][r-datepicker], [RAC DateRangePicker][r-daterangepicker].

### 8. Notification: rail, spacing, and distinct focus models

- Active source call sites use a **3px status rail**, despite older helper mixins that default to 6px. Close controls are **48×48px** in v11. Toast width is **288px**, becoming **352px at the 1584px max breakpoint**; inline minimum height is 48px.
- Source inline text padding is **15px** top/bottom; Specifications says 12px. The source’s 13px inline-start details margin plus the 3px rail yields the intended 16px outer-edge alignment.
- Toast subtitle `margin-bottom` is **16px**, while caption `padding-top` is **8px**. The browser confirms a **24px subtitle-to-caption content-box gap**. Specifications assigns 24px to the subtitle margin itself; treat this as a property/composition discrepancy, not proof that the visible gap is wrong. Without a caption, the fixture measures 32px to the bottom because subtitle and details spacing both contribute.
- Passive inline/toast content is announced with `status`, `alert`, or `log` and does not grab focus. A close button is still an interactive control; the source excludes interactive **content children**, not its dismiss button. `Callout` is ordinary persistent content, without an automatic live announcement. Default `ActionableNotification` uses **`alertdialog`**, moves focus to the action button, and wraps focus; it is not a passive toast with an action appended.
- RAC toast remains **`UNSTABLE_Toast*`** in this pin. Its queue/region supports hover/focus pause, focus restoration, F6 navigation, and a documented five-second minimum timeout. Those are useful explicit RAC behavior choices, not Carbon implementation equivalence.
- **Cinder check:** distinguish passive, dismissible, actionable-alertdialog, and callout contracts; test keyboard operation and announcements as well as colors and dimensions.

Sources: [Notification specifications][c-notification-spec], [accessibility][c-notification-a11y], [inline SCSS][s-inline-notification], [toast SCSS][s-toast-notification], [mixins][s-notification-mixins], [React notification source][s-notification-react], [browser evidence][cascade-results], [RAC Toast][r-toast].

### 9. Layer: contextual families do not share one numeric offset

- Contextual `layer`, `field`, `border-strong`, and their applicable state families select **01/02/03**. Contextual **`border-subtle` selects 00/01/02** at those same three levels. Its source list has four entries; blindly appending the layer number gives the wrong separators.
- `layer-background-01/02/03` describes the **containing surface**. It is not an alias for `layer-01/02/03`, which identifies the next component surface.
- Carbon React `Layer` accepts levels **0–2**, provides the incremented/clamped level to descendants, and defaults **`withBackground` to false**. It can change token context without painting a box.
- Light themes alternate white and gray surfaces; dark themes become successively lighter. A field drawn on a `layer-02` surface normally needs **`field-03` / `border-strong-03`**. Source utilities explicitly update embedded fields.
- **Cinder check:** nest three layers in all four themes, then open a menu/date picker/popover from each. React context can cross a portal; CSS custom-property inheritance follows the portal’s DOM location. Ensure the intended theme and layer are established at the actual overlay host.

Sources: [Themes][f-themes], [Color tokens][f-color-tokens], [layer-set definitions][s-layer-sets], [React Layer][s-layer-react], [field-on-layer utility][s-fields-on-layer].

## Version boundary: v11 and v12

### Fixed baselines

The report uses these immutable inputs, rather than treating “latest documentation” as one internally consistent release:

| Input                                                                | Pin / snapshot                                                   | Purpose                                                                  |
| -------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `@carbon/themes`                                                     | **11.85.0**                                                      | Resolved theme/component tokens and canonical DTCG names                 |
| `@carbon/layout`, `@carbon/type`, `@carbon/motion`, `@carbon/colors` | **11.63.0 / 11.71.0 / 11.56.0 / 11.62.0**                        | Spacing, sizing, type, motion, palette                                   |
| `@carbon/styles`                                                     | **1.119.0**                                                      | Published v11-default CSS and Sass, including disabled preview branches  |
| Carbon npm `gitHead`                                                 | `d9c9a18b8ffcc3c03881c88999a3675e4e1b6b1a`                       | Release-source reference                                                 |
| Local Carbon clone                                                   | `f8aceaf5583e0bec00e0883fe06760da9283e213`                       | Current canonical React source, v12 migration docs, comparison snapshots |
| Local Carbon MCP clone                                               | `c8af75506de40846f0b0c3e42e068345776a43b7`                       | Hosted-service documentation, terms, and builder guidance                |
| `react-aria-components`                                              | **1.22.1**, `gitHead` `740c6c5c4a717ca8c82fc4d15d199f6166cd42dc` | Actual exports, declarations, and component behavior                     |
| `react-aria`                                                         | **3.53.1**, `gitHead` `740c6c5c4a717ca8c82fc4d15d199f6166cd42dc` | Underlying interaction behavior                                          |
| `react-stately`                                                      | **3.51.0**, `gitHead` `1abc52dd5ad238143f168912963ff3ad932547a4` | State behavior; this package has a distinct release commit               |

`@carbon/react@1.120.0`, `@carbon/icons-react@11.92.0`, and `@ibm/plex-sans@1.1.0` have **metadata-only** npm records. Carbon React implementation evidence comes from the pinned clone snapshot. The archive includes full tarballs/extractions for the nine implementation/token packages above, with the acquisition details in [the package manifest][package-manifest].

All **92 overlapping Sass/token/layout files** compared between the selected current Carbon snapshot and the pinned npm artifacts were byte-identical. This is evidence for those files only, not a whole-repository release-equivalence claim. [Comparison manifest][local-manifest]

### Preview behavior must be deliberate

The v12 release flag enables the `enable-v12-*` family; unrelated experimental flags are not included merely because they exist. The archived published styles already contain conditional v12 source. A matching source line therefore needs its flag condition checked before it is called the default. [Feature flags][s-flags], [v12 migration guide][s-v12]

| Area                          | v11 baseline                                | Flagged/preview direction to keep explicit                                                                             |
| ----------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Button                        | Square by default                           | Fully rounded fallback; logical-corner custom properties and many square containing-context overrides                  |
| Text/date fields              | Square                                      | 4px field rounding in flagged styles; password controls become inset 24px/32px circular buttons                        |
| Calendar                      | Classic Flatpickr geometry                  | 8px calendar corners, 4px day-cell corners; separately imported Temporal-based picker has different state/API plumbing |
| Popover / Tooltip / Toggletip | Caret and square surface treatment          | 8px Popover, 4px Tooltip/Toggletip corners; caret removed and 4px trigger gap                                          |
| Menu                          | Square surface/items                        | 8px surface, 4px items, 4px inner padding                                                                              |
| Notification                  | Square, 48px close control                  | 8px toast/actionable or 4px inline/callout corners; circular 32px close control, 8px insets                            |
| Toggle                        | 16px label-to-track gap                     | 8px gap                                                                                                                |
| Tag                           | Pill corners                                | 2px small and 4px medium/large corners                                                                                 |
| Progress bar                  | Square track/fill                           | Fully rounded track/fill; indeterminate motion implemented with translated element                                     |
| Search / number input         | Full-height clear/stepper treatment         | Smaller inset search clear control; revised number stepper spacing and removed rule dividers                           |
| Tile / structured list        | Legacy selected-only indicators/composition | Visible radio indicators in both states; StructuredList selection prop and first-cell indicator                        |
| Overflow menu                 | `OverflowMenuItem` composition              | `MenuItem` / `MenuItemDivider` composition, renamed tooltip-specific props                                             |
| Floating alignment            | Most `autoAlign` defaults false             | Defaults true; fixed-position floating styles are used even when collision detection is disabled                       |
| Toggletip description         | Automatically describes trigger when open   | Automatic `aria-describedby` removed; expanded/controls disclosure relationship remains                                |

Sources: [migration guide][s-v12], [button-radius source][s-button-radius], [text input SCSS][s-text-input], [classic date SCSS][s-flatpickr], [preview date docs][s-date-preview]. These preview changes are a separate design/version choice; Cinder’s declared v11 geometry should remain internally coherent.

## Foundations

### Geometry, spacing, and grid

Carbon’s **8px mini unit** establishes the 2x Grid. Detail spacing also uses 2px and 4px increments; 1px borders and optical corrections are intentional. “Carbon-aligned” does not mean rounding every coordinate to 8px. Type aligns to the inner padding edge, with shared vertical/horizontal key lines. [2x Grid][f-grid], [Spacing][f-spacing]

| Token suffix      | 01   | 02  | 03  | 04  | 05  | 06  | 07  | 08  | 09  | 10  | 11  | 12  | 13  |
| ----------------- | ---- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `spacing-*` px    | 2    | 4   | 8   | 12  | 16  | 24  | 32  | 40  | 48  | 64  | 80  | 96  | 160 |
| rem, at 16px root | .125 | .25 | .5  | .75 | 1   | 1.5 | 2   | 2.5 | 3   | 4   | 5   | 6   | 10  |

Spacing tokens are fixed values. A responsive composition can choose a different token at a breakpoint. Parent layout/Stack owns inter-component gaps; components own their internal padding. Avoid accidental doubling from child margins plus parent gap. [Spacing][f-spacing]

| Breakpoint | Minimum width  | Columns | Standard box padding | Outer grid margin |
| ---------- | -------------- | ------- | -------------------- | ----------------- |
| sm         | 320px / 20rem  | **4**   | 16px                 | 0                 |
| md         | 672px / 42rem  | **8**   | 16px                 | 16px              |
| lg         | 1056px / 66rem | **16**  | 16px                 | 16px              |
| xlg        | 1312px / 82rem | **16**  | 16px                 | 16px              |
| max        | 1584px / 99rem | **16**  | 16px                 | 24px              |

The default wide gutter is 32px: the adjoining 16px half-gutters/box insets form it. Narrow and condensed compositions serve denser relationships. A 16-column desktop grid should not be replaced with a generic 12-column framework grid based on an isolated sentence in the Spacing page. Fluid columns scale content size; fixed tiled boxes increase visible item count; hybrid layouts keep one dimension fixed (header height, panel width) while the other is fluid. [Grid overview][f-grid], [grid guidelines][f-grid-guidelines]

The source’s **size and density are separate axes**. Common control heights run 24–80px, while normal horizontal density is 16px. Component support is a bounded subset: a button’s largest size is not automatically a valid checkbox, text field, or menu size. Preserve per-component defaults and border-box adjustments. [Layout utility][s-layout], [button base][s-button-mixins]

### Four themes and semantic color

Theme names are **white, g10, g90, g100**. Use semantic roles in component CSS and resolve them per theme; palette swatches alone do not identify the correct role. [Themes][f-themes], [Color][f-color], [Color tokens][f-color-tokens]

| Token                               | white     | g10       | g90       | g100      |
| ----------------------------------- | --------- | --------- | --------- | --------- |
| `background`                        | `#ffffff` | `#f4f4f4` | `#262626` | `#161616` |
| `layer-01` / `field-01`             | `#f4f4f4` | `#ffffff` | `#393939` | `#262626` |
| `layer-02` / `field-02`             | `#ffffff` | `#f4f4f4` | `#525252` | `#393939` |
| `layer-03` / `field-03`             | `#f4f4f4` | `#ffffff` | `#6f6f6f` | `#525252` |
| `text-primary` / `icon-primary`     | `#161616` | `#161616` | `#f4f4f4` | `#f4f4f4` |
| `text-secondary` / `icon-secondary` | `#525252` | `#525252` | `#c6c6c6` | `#c6c6c6` |
| `text-inverse` / `icon-inverse`     | `#ffffff` | `#ffffff` | `#161616` | `#161616` |
| `text-on-color` / `icon-on-color`   | `#ffffff` | `#ffffff` | `#ffffff` | `#ffffff` |
| `interactive`                       | `#0f62fe` | `#0f62fe` | `#4589ff` | `#4589ff` |
| `focus`                             | `#0f62fe` | `#0f62fe` | `#ffffff` | `#ffffff` |
| `button-primary` (component token)  | `#0f62fe` | `#0f62fe` | `#0f62fe` | `#0f62fe` |

Values are from the [pinned reference export][reference-tokens], not copied from swatch images. Important role distinctions:

- **`text-on-color` versus `text-inverse`:** on-color stays white for stable filled-color surfaces; inverse reverses with theme. Primary-blue buttons in dark themes still need on-color text.
- **`background-*` versus `layer-*`:** page surfaces and contained component surfaces have separate hover/active/selected families.
- **`field-*`:** use the field palette and matching underline at the appropriate layer, including hover. Inputs nested in tables, dialogs, and tiles need explicit context.
- **`border-subtle`, `border-strong`, `border-inverse`, `border-interactive`:** separators, input rules, contrasting strokes, and selected rails are different jobs.
- **`support-*` and `support-*-inverse`:** status color must match its surface; warning art can contain a contrasting inner glyph. Preserve an icon/label cue as well as hue.
- **Disabled tokens:** alpha-valued `text-disabled`, `icon-disabled`, and component-specific disabled fills must be used against the actual containing surface. A single global `opacity` also fades text, borders, and descendants that may need different treatments.
- **Component tokens:** button, tag, notification, content-switcher, and status families supplement universal tokens. Sparse per-theme maps are intentional; preserve the upstream fallback instead of inventing missing theme entries.

Canonical names come from **DTCG JSON keys**. Carbon’s `kebabToCamel` conversion removes hyphens before digits, so a generic inverse conversion corrupts names such as `syntax-heading-1`…`syntax-heading-6`. The corrected [research exporter][token-exporter] maps generated JS names back through the canonical key set and asserts coverage. It exports **234 color tokens plus `color-scheme` metadata per theme**, and **78 component-token names**. `color-scheme` is not a 235th color token. [Token source documentation][s-token-readme], [upstream formatter][s-token-formatter]

### Layer implementation model

Use the following explicit lookup rather than a universal string-suffix formula:

| Context level  | `layer`, `field`, `border-strong` | `border-subtle`    | `layer-background`    |
| -------------- | --------------------------------- | ------------------ | --------------------- |
| 0 / first set  | `*-01`                            | `border-subtle-00` | `layer-background-01` |
| 1 / second set | `*-02`                            | `border-subtle-01` | `layer-background-02` |
| 2 / third set  | `*-03`                            | `border-subtle-02` | `layer-background-03` |

Apply the equivalent lookup to hover/active/selected/accent families listed in the [source layer sets][s-layer-sets]. A theme boundary should re-establish the proper contextual aliases; an overlay should deliberately choose whether to inherit the trigger’s context or establish a new surface. CSS variables alone do not infer a component’s semantic layer from its visual background.

### Typography

Use **IBM Plex Sans** for product/UI text and **IBM Plex Mono** for code and Carbon’s date-entry treatment. Font metrics, line height, weight, and letter spacing are part of the component geometry. Productive UI is based on 14px; expressive content is based on 16px. [Typography][f-type], [type sets][f-type-sets], [pinned type styles][s-type]

| Type role            | Font size / line height | Weight            | Typical use                                                |
| -------------------- | ----------------------- | ----------------- | ---------------------------------------------------------- |
| `label-01`           | 12 / 16px               | 400               | Field labels, compact metadata                             |
| `helper-text-01`     | 12 / 16px               | Inherited regular | Field assistance; no explicit weight in the exported token |
| `body-compact-01`    | 14 / 18px               | 400               | Buttons, rows, compact controls                            |
| `body-01`            | 14 / 20px               | 400               | Product body content                                       |
| `body-compact-02`    | 16 / 22px               | 400               | Expressive compact controls                                |
| `body-02`            | 16 / 24px               | 400               | Expressive body copy                                       |
| `heading-compact-01` | 14 / 18px               | 600               | Compact column/section headings                            |
| `heading-compact-02` | 16 / 22px               | 600               | Expressive compact headings                                |
| `heading-01`         | 14 / 20px               | 600               | Small layout headings                                      |
| `heading-02`         | 16 / 24px               | 600               | Small expressive/layout headings                           |
| `heading-03`         | 20 / 28px               | 400               | Product section heading                                    |
| `heading-04`         | 28 / 36px               | 400               | Product page/layout heading                                |
| `heading-05`         | 32 / 40px               | 400               | Larger fixed heading                                       |
| `heading-06`         | 42 / 50px               | 300               | Large fixed heading                                        |
| `heading-07`         | 54 / 64px               | 300               | Largest fixed heading                                      |
| `code-01`            | 12 / 16px, Mono         | 400               | Code snippets                                              |
| `code-02`            | 14 / 20px, Mono         | 400               | Date input / larger code                                   |

`body-compact-01` and `body-01` use **0.16px** letter spacing; both 12px **`label-01` and `helper-text-01` use 0.32px**. The helper token does not set a weight, so the containing text style must supply it. Preserve the complete type token rather than only font-size. Expressive fluid headings/display styles change at breakpoints; they are useful for Cinder’s public-page hierarchy, while the embedded library specimen remains productive UI. For example, `fluid-display-01` aliases `display01`: 42px at the base/md, 54px at lg, 60px at xlg, and 76px at max, with line-height changes as well. Type tokens do not determine HTML heading level: document outline and visual style are independent decisions. [Type sets][f-type-sets], [type JS:272–304, 560–577, 665–682][s-type-js], [type styles][s-type]

### Motion

| Token                  | Duration | Appropriate scale                 |
| ---------------------- | -------- | --------------------------------- |
| `duration-fast-01`     | 70ms     | Immediate micro-interactions      |
| `duration-fast-02`     | 110ms    | Small fades / control feedback    |
| `duration-moderate-01` | 150ms    | Small expansion / short travel    |
| `duration-moderate-02` | 240ms    | Larger expansion / communication  |
| `duration-slow-01`     | 400ms    | Large, deliberate expansion       |
| `duration-slow-02`     | 700ms    | Large background/hero transitions |

| Curve    | Productive                     | Expressive                     |
| -------- | ------------------------------ | ------------------------------ |
| Standard | `cubic-bezier(.2, 0, .38, .9)` | `cubic-bezier(.4, .14, .3, 1)` |
| Entrance | `cubic-bezier(0, 0, .38, .9)`  | `cubic-bezier(0, 0, .3, 1)`    |
| Exit     | `cubic-bezier(.2, 0, 1, .9)`   | `cubic-bezier(.4, .14, 1, 1)`  |

Use productive motion for frequent controls and expressive motion sparingly for hierarchy/communication. Avoid animating every property indiscriminately. Respect reduced-motion preferences with an immediate readable final state; a loader must still communicate progress when decorative animation is reduced. These durations are a vocabulary, not a mandate to animate all interactions. [Motion guidance][f-motion], [pinned motion exports][s-motion]

### Borders, corners, focus, and state precedence

- v11’s predominant square geometry has specific exceptions: checkbox 2px corners, content switcher 4px corners, pill tags and toggles, circular radios/slider thumbs. The pinned inline code snippet uses **4px corners**, while its specification says 2px. A universal radius reset would erase these distinctions. [Snippet source][s-code-snippet]
- The shared focus helper offers **1px border**, **2px inset outline**, and a separate blurred style; component-specific button/checkbox/radio/calendar treatments override that baseline. Match the component, not one global ring rule. [Focus utility][s-focus]
- Keep keyboard focus visible through hover, selection, and invalid states. RAC’s `data-focus-visible` is useful for keyboard focus styling; its data attributes are not Carbon’s CSS class API. Test pointer focus and keyboard focus deliberately.
- Read-only means immutable but available for inspection/copy/navigation where the control permits it. Disabled means unavailable and typically removed from keyboard interaction. Warning and error need explanatory text, not just a changed stroke. [Read-only pattern][p-readonly], [disabled pattern][p-disabled]
- Include forced-colors behavior: borders/focus indicators may need explicit system-color treatment when background fills disappear. Preserve focus at zoom/reflow and prevent overflow containers from clipping it. [Accessibility foundation][f-a11y], [developer guidance][f-a11y-dev]

### Icons, pictograms, content, and AI

Icons are compact functional symbols with size-specific geometry; pictograms carry larger illustrative concepts. Preserve their intended artboard, optical weight, and alignment rather than stretching one arbitrary SVG across every control. Give meaningful icon-only actions accessible names and visible hover/focus labels; hide decorative icons from assistive technology. The huge icon/pictogram catalogs were **sampled**, while guidance received bounded review; individual asset shapes and image measurements have not been visually audited. [Icons][f-icons], [Pictograms][f-pictograms], [Button accessibility][c-button-a11y]

Content should make the next action and current state understandable: sentence-case labels, concise action verbs, persistent field labels, specific error recovery, and clear status descriptions. Localization includes label growth, date/number formats, directionality, and meaningful DOM order. Keep icons and layout from being the sole carrier of meaning. [Content][f-content], [accessibility][f-a11y]

Carbon for AI uses the AI label as **disclosure and provenance**, including an explainability popover and contextual revert behavior. It should not become a generic decoration or the trigger for an AI action. Cinder should distinguish a design specimen with sample data from a genuinely AI-generated result. [Carbon for AI][f-ai], [AI label guidelines][c-ai-label], [AI label accessibility][c-ai-label-a11y]

## Current RAC integration rules

The following rules use **RAC 1.22.1** and the archived first-party documentation; older remembered APIs are not a sufficient baseline. [RAC archive manifest][rac-manifest], [package manifest][package-manifest]

1. **Compose the accessible anatomy.** A field is its label, input, description, and error; a menu is its trigger, positioned surface, collection, and items; a dialog is its modal surface, named dialog, content, and actions. Forward refs, form attributes, accessible names, state props, and render-prop state rather than wrapping only the visible element. [RAC forms][r-forms], [styling][r-styling]
2. **Use current selection/value types.** `Select` supports `selectionMode="single" | "multiple"`. Its inherited `value`/`onChange` contract is `Key | null` for single selection, with readonly input arrays and mutable change arrays for multiple selection. `SelectValue.selectedItems` and `selectedText` supersede deprecated singular `selectedItem`. The filtering composition in current docs uses `Autocomplete` + `SearchField`; editable combobox input is a different interaction. [RAC Select][r-select], [Autocomplete][r-autocomplete], [Select declarations][r-select-types], [inherited value/state declarations][r-select-state]
3. **Distinguish low-level semantics.** Prefer native `<select>` for Carbon Select, native `<table>` for Carbon Data table, and `<ul>/<li>` for Contained list. RAC Select is useful for Carbon Dropdown. RAC Table/GridList introduce grid navigation; `Tree` uses **`treegrid`**, while Carbon documents `tree`/`treeitem`; `TagGroup` uses **`grid`** when populated, unlike Carbon’s static tags or individually tabbable tag actions. These mappings require an explicit interaction choice. [RAC Select][r-select], [Table][r-table], [GridList][r-gridlist], [`useTree`][r-tree-hook], [`useTagGroup`][r-tag-hook]
4. **Switch API changes do not change keyboard semantics.** `SwitchField`/`SwitchButton` replace the deprecated `Switch`, but are still input-backed. Similar newer exports include `CheckboxField`/`CheckboxButton` and `RadioField`/`RadioButton`. Verify wrapper props against the actual declarations. [Switch declarations][r-switch-types], [Switch implementation][r-switch-source], [package exports][r-exports]
5. **Slider acceleration is range-relative.** Arrow movement uses the step; Shift+arrows and PageUp/PageDown use a page size approximately one tenth of the range, snapped to the step and at least one step. It is **not always ten steps**. Home/End go to bounds, and each range thumb has its own accessible value/name. [RAC Slider][r-slider], [thumb behavior][r-slider-thumb], [slider state][r-slider-state]
6. **Default Popover is not Carbon’s trigger-retaining disclosure.** RAC’s default surface becomes a dialog, focuses itself unless a descendant is already focused, contains focus, hides/inerts outside content, and prevents scrolling. Carbon Popover/Toggletip/AI label specifications retain trigger focus and allow Tab into and out of content. `isNonModal` changes more than focus; RAC explicitly cautions that it requires a carefully designed interaction such as combobox. An exact Carbon adapter remains a verification task. [RAC Popover][r-popover], [Popover implementation][r-popover-source], [`usePopover`][r-usepopover], [Carbon Popover accessibility][c-popover-a11y]
7. **New exports need intentional adoption.** The pin includes `useTableOptions`, `TableFooter`, `TableLoadMoreItem`, `SliderFill`, `TabPanels`, `ComboBoxValue`, and calendar month/year picker parts. Availability does not require exposing every part in Cinder’s first contract. [Package exports][r-exports]
8. **Keep unstable APIs visible.** Toast exports still use `UNSTABLE_` names. A Cinder wrapper can stabilize its own small API, but should disclose the pinned dependency and own its compatibility testing. [RAC Toast][r-toast]
9. **Dates are structured values.** RAC’s date/time parts support localized segments, calendars, time zones, and validation. Do not coerce every value into a local JavaScript `Date` or parse a display string as storage. Decide the Cinder date value contract explicitly and distinguish plain date, local date-time, and zoned date-time. [DateField][r-datefield], [DatePicker][r-datepicker], [TimeField][r-timefield]
10. **Behavioral ownership stays explicit.** RAC supplies interaction foundations; Cinder supplies Carbon styling and the higher-level contract. Application-specific upload transport, search, sort, pagination data, AI provenance, and network/error policies remain explicit callbacks/data flows in the API. A working-looking control with an inert handler does not meet a minimum usable contract.

## Minimum contracts for all 42 component families

The following entries define the smallest useful **Carbon-aligned implementation target**, including observable behavior. “Omissions” names variants or capabilities that may remain outside that target and must be shown in the public coverage matrix. It does not describe the current implementation status. Shared field, button, layer, motion, and focus rules above apply wherever referenced. The linked Specifications and Accessibility tabs are part of each contract’s evidence.

### 1. AI label

- **Visual contract:** default button sizes 16/20/24/32/40/48/64px; inline sizes 16/18/22px. Default has a 1px `border-inverse` outline, transparent fill, and `text-primary`; hover reverses to `background-inverse`/`text-inverse`. Explainability content has 24px padding and a 48px footer, using the `ai-popover-background`, aura, and border token families. Resolve canonical names from the export; the specification contains inconsistent AI token spellings.
- **Behavior / mapping:** RAC `Button` plus an explicitly adapted disclosure surface. Enter/Space toggles; opening retains trigger focus; Tab enters interactive content or leaves and closes; Escape closes and restores focus when necessary. Set an informative name, `aria-expanded`, and `aria-controls`. Default RAC Popover is a different focus contract.
- **Minimum:** a real explainability disclosure with meaningful provenance/context, a named close path, and four-theme styling.
- **Omissions to declare:** input decorators and reverting an edited AI value; inline and extreme sizes; AI presence treatments on every eligible component. The label indicates AI provenance, rather than initiating an AI operation.

Sources: [Specifications][c-ai-label-spec], [Accessibility][c-ai-label-a11y], [RAC Button][r-button], [RAC Popover][r-popover].

### 2. Accordion

- **Visual contract:** 32/40/48px headers, default 40px; 1px `border-subtle` rules; 16px title/start inset and chevron. Panel padding is 8px above and 24px below. Documentation reserves 25% at the right on wide accordions, 64px at intermediate widths, and 16px on narrow ones; flush alignment removes the start indent. Text uses `text-primary`/`body-01`; hover uses `layer-hover`; disabled title/icon use their disabled tokens.
- **Behavior / mapping:** `DisclosureGroup`, `Disclosure`, a heading containing `Button slot="trigger"`, and `DisclosurePanel`. Each enabled header is a Tab stop; Enter/Space toggles its associated panel. Hidden panel controls must leave the tab order. Use real heading levels and the expanded/controls relationship.
- **Minimum:** multiple independently openable sections, controlled/default expansion, disabled sections, keyboard operation, and content that can grow without clipping focus.
- **Omissions to declare:** flush alignment, single-open mode, skeletons, or animated height if not implemented. Group selection semantics must not replace independent disclosure semantics.

Sources: [Specifications][c-accordion-spec], [Accessibility][c-accordion-a11y], [RAC Disclosure][r-disclosure], [DisclosureGroup][r-disclosuregroup].

### 3. Breadcrumb

- **Visual contract:** small 12/16px text with 4px inline spacing; medium 14/18px with 8px spacing. Slash separators use `text-primary`; ancestor links use `link-primary`, then hover/visited/focus link states. The current item uses `text-primary`. Overflow options are documented at 40px high.
- **Behavior / mapping:** `Breadcrumbs`, `Breadcrumb`, and `Link`, inside an appropriately named navigation landmark. Ancestors are real links activated with Enter; the current page is text with `aria-current="page"`. Decorative separators stay outside the accessible name. An overflow trigger needs Menu behavior.
- **Minimum:** a labeled hierarchy with working ancestor destinations, a non-link current page, wrapping or an intentional narrow-screen layout, and visible keyboard focus.
- **Omissions to declare:** automatic truncation and the “more breadcrumbs” menu. If included, hidden ancestors must remain reachable through that menu.

Sources: [Specifications][c-breadcrumb-spec], [Accessibility][c-breadcrumb-a11y], [RAC Breadcrumbs][r-breadcrumbs].

### 4. Button

- **Visual contract:** apply priority check 1: 24–80px supported heights, 16px start/64px end visual space, the variant-specific component tokens, square v11 fallback, and composed inset focus. Distinguish primary, secondary, tertiary, ghost, and danger treatments; icon-only controls have their own square geometry and accessible label.
- **Behavior / mapping:** RAC `Button` for actions and `Link` for navigation. Enter/Space activates a button; only Enter is the ordinary link activation key. Forward `type`, `form`, disabled state, refs, and the press callback. Avoid accidental form submission from non-submit actions.
- **Minimum:** working text, trailing-icon, and icon-only actions; hover/pressed/focus-visible/disabled states; intentional submit/reset behavior; a tooltip/name for icon-only controls.
- **Omissions to declare:** expressive density, fluid button sets, pending/loading presentation, and less-used sizes or danger subvariants. A disabled-looking button must actually be non-operable.

Sources: [Specifications][c-button-spec], [Accessibility][c-button-a11y], [button source][s-button], [RAC Button][r-button].

### 5. Checkbox

- **Visual contract:** priority check 3: 16px neutral box, 1px stroke, 2px corners, 8px label gap, `icon-primary` selected fill, `icon-inverse` mark, and 2px outside focus outline with 1px offset. Keep checked, mixed, invalid, read-only, and disabled states distinguishable.
- **Behavior / mapping:** RAC `Checkbox` and `CheckboxGroup`, with associated label, description, and error. Each checkbox has its own Tab stop; Space toggles; a mixed checkbox exposes `aria-checked="mixed"`. Group state must be separate from one parent checkbox’s aggregate state.
- **Minimum:** controlled/uncontrolled checked state, mixed display, required/group validation, disabled/read-only behavior, and keyboard/label-click operation.
- **Omissions to declare:** automatic parent/descendant cascade, nested tree selection, and AI decorators. RAC does not infer a domain-specific “select all” policy from `isIndeterminate`.

Sources: [Specifications][c-checkbox-spec], [Accessibility][c-checkbox-a11y], [RAC Checkbox][r-checkbox], [CheckboxGroup][r-checkboxgroup].

### 6. Code snippet

- **Visual contract:** Plex Mono `code-01` (12/16px), `text-primary` on contextual `layer`. Single-line height is **40px / 2.5rem**, with 16px start space and a separate copy-control area. Multiline source uses 16px container padding and scrolling; the specification describes a 288px minimum-height specimen and 768px maximum width. Inline code has 8px horizontal code padding and **4px source radius versus 2px documented**.
- **Behavior / mapping:** semantic `<pre><code>` for blocks; RAC Button for copy and show-more controls. A copyable inline snippet is a button containing code; a non-copyable one is ordinary `<code>`. Scrollable blocks need keyboard access. Announce copy success or failure and preserve the exact copied whitespace.
- **Minimum:** single-line and multiline content, working clipboard action with feedback, accessible overflow scrolling, and a readable inline treatment.
- **Omissions to declare:** syntax highlighting, line numbers, wrapping modes, and configurable collapsed row counts. A show-more affordance is only present when it changes visible content.

Sources: [Specifications][c-code-snippet-spec], [Accessibility][c-code-snippet-a11y], [snippet SCSS][s-code-snippet], [RAC Button][r-button].

### 7. Contained list

- **Visual contract:** rows support 32/40/48/64px, with **48px source default** and 16px insets. On-page headers follow the selected size; disclosed headers are **32px** in source and the specification’s size table, despite a contradictory 48px structure row. Use `body-01`, `text-primary`, contextual `border-subtle`, and hover/active layer states. Rows with actions reserve end space; disclosed headings use `label-01`/`text-secondary`.
- **Behavior / mapping:** named `<ul>`/`<li>` with native or RAC buttons/links inside each item. All actionable controls are ordinary Tab stops. Clickable row and separate action controls must be siblings, not nested buttons. RAC `GridList` would introduce a different keyboard model.
- **Minimum:** labeled static and actionable lists, real item/action callbacks, disabled actions, separators, and content wrapping.
- **Omissions to declare:** sticky search/header, disclosed variant, inset rules, and secondary row actions. No selection model is implied by a contained list.

Sources: [Specifications][c-contained-list-spec], [Accessibility][c-contained-list-a11y], [contained-list source][s-contained-list].

### 8. Content switcher

- **Visual contract:** priority check 5: 32/40/48px, equal-width segments, 16px insets, 4px outer corners, high-contrast or dedicated low-contrast selection tokens. Preserve the boundary between adjacent segments and distinguish focus from selection.
- **Behavior / mapping:** RAC `Tabs`/`TabList`/`Tab` with associated `TabPanel`s. One tab stop enters the group; arrows navigate. Automatic activation follows focus; manual activation uses Enter/Space. Carbon’s examined source defaults to automatic activation.
- **Minimum:** two or more working options that actually replace associated content, controlled selection, disabled options, and horizontal keyboard navigation.
- **Omissions to declare:** icon-only segments, low-contrast treatment, manual activation, or responsive overflow. An arbitrary collection of independently tabbable toggle buttons does not meet the Carbon tablist contract.

Sources: [Specifications][c-content-switcher-spec], [Accessibility][c-content-switcher-a11y], [React source][s-content-switcher-react], [RAC Tabs][r-tabs].

### 9. Data table

- **Visual contract:** priority check 6: 24/32/40/48/64px rows, 48px default, 16px cell insets, `layer-accent` headers, contextual `layer` body, 1px separators, selected/hover states, and properly layered embedded controls. Keep header weight at `heading-compact-01` and cell text at `body-compact-01`.
- **Behavior / mapping:** native `<table>`, `<thead>`, `<tbody>`, scoped `<th>` and caption/label; RAC buttons/checkboxes for controls. Sort controls update data and `aria-sort`; expansion buttons disclose associated content; selection requires clear row labels and an aggregate header checkbox. Ordinary Tab navigation is the baseline.
- **Minimum:** named table with real column headers, data rows, sorting, and an empty state; any displayed selection, expansion, search, or pagination control changes the relevant data/state.
- **Omissions to declare:** virtualization, column resizing/reordering, batch actions, in-cell editing, server-side data management, and grid-style navigation. A RAC Table variant should be explicitly named as an interactive grid.

Sources: [Specifications][c-data-table-spec], [Accessibility][c-data-table-a11y], [table SCSS][s-data-table], [RAC Table comparison][r-table].

### 10. Date picker

- **Visual contract:** priority check 7: 288×336px documented calendar, 40px day/navigation cells, 4px today dot, Mono date entry, 24/32/40/48px field sizes, and distinct selected/today/range/unavailable/focus states. For the classic source contract, selected fill/focus use `button-primary` and ranges use `highlight`.
- **Behavior / mapping:** RAC `DatePicker`/`DateRangePicker`, `DateInput`/`DateSegment`, `Calendar`/`RangeCalendar`, heading/navigation buttons, calendar grid and cells, and a named popup dialog. Arrow/date-segment navigation, month movement, selection, Escape dismissal, and focus return are required. RAC `TimeField` can supply a separately documented time input.
- **Minimum:** working single-date and date-range selection; labels, min/max, invalid/unavailable dates, controlled values, localized display, and keyboard entry. Preserve structured date values rather than silently converting to a local instant.
- **Omissions to declare:** free-form Flatpickr-compatible parsing, timezone selection, time input, multiple calendars, and the Temporal preview API. RAC segmented entry and dialog focus are intentional adaptations that need end-to-end verification.

Sources: [Specifications][c-date-picker-spec], [Accessibility][c-date-picker-a11y], [classic source][s-flatpickr], [RAC Calendar][r-calendar], [DatePicker][r-datepicker], [DateRangePicker][r-daterangepicker], [TimeField][r-timefield].

### 11. Dropdown

- **Visual contract:** field/menu rows 24/32/40/48px; field 16px start and 48px end reserve, 1px underline, 8px label and 4px helper gaps. Use `field`, `border-strong`, `layer` menu, `layer-hover`/`layer-selected`, and a `0 2px 6px rgb(0 0 0 / .2)` menu shadow. Multiselect count tags are 24px high; combobox clear/chevron controls need the larger 72px end reserve.
- **Behavior / mapping:** RAC `Select` + `Button` + `SelectValue` + `Popover` + `ListBox`/`ListBoxItem` for single/multiple selection; `ComboBox` for editable input; `Autocomplete` + `SearchField` for the current filterable-list composition. Use current `value`/`onChange` and plural selected-items APIs. Arrows navigate, Enter/Space select in non-editable lists, Escape dismisses; Space stays text in a combobox.
- **Minimum:** labeled single and multiple choice, genuine value updates, disabled items, selected-count/clear behavior, validation, empty state, and focus return. Carbon’s collapsed multiselect Delete-to-clear behavior needs explicit verification/adaptation.
- **Omissions to declare:** editable combobox, filterable multiselect, async/virtualized options, inline/fluid variants, or select-all if absent.

Sources: [Specifications][c-dropdown-spec], [Accessibility][c-dropdown-a11y], [RAC Select][r-select], [ComboBox][r-combobox], [Autocomplete][r-autocomplete].

### 12. File uploader

- **Visual contract:** file rows 32/40/48px high, documented 288px width, 16px horizontal padding, 8px between rows, 16px remove icon. Filenames use `body-compact-01`/`text-primary` on `field`; the drop-zone border uses `border-strong`, active focus uses `focus`, success uses `interactive`, errors use `support-error` with explanatory text.
- **Behavior / mapping:** RAC `FileTrigger` with Button, and `DropZone` with a keyboard-accessible file-selection action. Each remove button names its file. Selecting/dropping exposes actual `File` objects; one flow handles acceptance, duplicates, removal, and validation. Changes and failures need accessible status text.
- **Minimum:** file-dialog selection, drop input, actual file list, size/type feedback, remove actions, disabled state, and explicit uploading/success/error state supplied by the caller.
- **Omissions to declare:** network transport, resumable upload, directory traversal, previews, and server-side acceptance. A simulated upload in a specimen must be identified as a simulation.

Sources: [Specifications][c-file-uploader-spec], [Accessibility][c-file-uploader-a11y], [RAC FileTrigger][r-filetrigger], [DropZone][r-dropzone].

### 13. Form

- **Visual contract:** default recommendations are 32px between items/columns, 40px below the title area, and 48px above actions. Fluid layouts use adjoining fields with 1px gutters and no vertical item margin. Labels/input/helper text follow the shared field scale. The specification’s “28px `heading-03`” is inconsistent: choose `heading-04` for 28/36px or actual `heading-03` for 20/28px.
- **Behavior / mapping:** RAC `Form` plus field components, native `<fieldset>`/`<legend>` for related choices, and real submit/reset buttons. Explain required/optional notation, associate instructions/errors, preserve names and values in form submission, and focus/report validation errors appropriately. Form layout does not replace field semantics.
- **Minimum:** a real submitted value set, client and supplied server errors, required/optional fields, disabled/read-only distinction, reset where exposed, and an observable successful result.
- **Omissions to declare:** schema-library integration, backend submission, autosave, multistep persistence, fluid fields, and AI form-wide decorators.

Sources: [Specifications][c-form-spec], [Accessibility][c-form-a11y], [Forms pattern][p-forms], [RAC Form][r-form], [RAC form guidance][r-forms].

### 14. Inline loading

- **Visual contract:** 16px spinner/check/error glyph, `body-compact-01` text (14px, **0.875rem**), `text-secondary`, subtle track, `border-interactive` active stroke, and `support-success`/`support-error` outcomes. Match the neighboring control’s vertical alignment rather than adding a new large loading panel.
- **Behavior / mapping:** non-interactive semantic status region with decorative SVG; RAC ProgressBar can provide an indeterminate progress primitive where useful. Use polite, meaningful status updates; expose “loading” when no visible label exists. Only dependent controls become unavailable while work runs.
- **Minimum:** distinct inactive, active, finished, and error presentations driven by real state, a readable status, and completion/error notification. The spinner itself is not a Tab stop.
- **Omissions to declare:** replacing button contents automatically, minimum-display timing, and automatic success dismissal. The repeated `status: finished` error row in Specifications is a documentation typo.

Sources: [Specifications][c-inline-loading-spec], [Accessibility][c-inline-loading-a11y], [inline-loading source][s-inline-loading], [RAC ProgressBar][r-progressbar].

### 15. Link

- **Visual contract:** 12/16, 14/18, or 16/22px type; `link-primary`, `link-primary-hover`, `link-visited`, and disabled text/icon roles. Small/medium icons are 16px; large icons 20px. Distinguish inline underlining from standalone link treatment and retain a visible focus boundary.
- **Behavior / mapping:** RAC `Link` or native `<a href>`. Tab and Enter navigate; modifier-click, browser context menus, downloads, and external destinations should retain native behavior. Supply contextual names for repeated generic labels. Disabled links need actual interaction suppression rather than only muted color.
- **Minimum:** working internal/external destinations, inline and standalone presentation, hover/focus/visited states, icon labeling, and correct keyboard navigation.
- **Omissions to declare:** router adapters, download handling, or disabled-link API if absent. Use a button when the operation changes state without navigating.

Sources: [Specifications][c-link-spec], [Accessibility][c-link-a11y], [RAC Link][r-link].

### 16. List

- **Visual contract:** `body-01` at 14/20px or expressive `body-02` at 16/24px, `text-primary`, no default inter-item margin, and 16px nested indentation. Keep ordered numbering and unordered bullets semantically present when styling markers.
- **Behavior / mapping:** native `<ol>`/`<ul>`/`<li>`. Static items have no keyboard behavior or forced focus; embedded links/buttons retain their own behavior. This is content structure, rather than RAC ListBox selection.
- **Minimum:** ordered, unordered, and nested content with correct announcements, wrapping, and marker alignment.
- **Omissions to declare:** custom marker systems, expressive size, and interactive collection selection. A list of commands or selectable options belongs to the relevant Menu/ListBox contract.

Sources: [Specifications][c-list-spec], [Accessibility][c-list-a11y].

### 17. Loading

- **Visual contract:** large 88px and small 16px indicators; active stroke uses `interactive`, and a page-blocking overlay uses `overlay`. Loading has no inherent text typography beyond its associated status/label. Keep reduced-motion output understandable.
- **Behavior / mapping:** labeled indeterminate RAC `ProgressBar` with circular SVG presentation, or an equivalent semantic status/progress region. The indicator is not operable. Carbon documents an assertive live announcement for the loading component; choose and document announcement urgency deliberately, avoiding duplicate live regions. Completion must also be conveyed.
- **Minimum:** labeled small and large loading states, an associated busy region where applicable, and an observable completion transition with sensible focus continuity.
- **Omissions to declare:** full-page blocking overlay, automatic focus movement, delayed appearance, and skeleton placeholders. An overlay that visually blocks controls must also implement the intended interaction restriction.

Sources: [Specifications][c-loading-spec], [Accessibility][c-loading-a11y], [Loading pattern][p-loading], [RAC ProgressBar][r-progressbar].

### 18. Menu

- **Visual contract:** 24/32/40/48px options, 16px text/icon insets, 16px glyphs, 4px separation around divider groups, and subtle rules. Surface is `layer`; text/icons progress from secondary to primary on hover; focus uses `focus`. Danger-hover rows use `support-error` with on-color text/icons. Selected items need visible marks, not only background color.
- **Behavior / mapping:** RAC `MenuTrigger`, `Menu`, `MenuItem`, `MenuSection`, `Separator`, and `SubmenuTrigger` where included. Opening puts focus in the menu; arrows navigate; Enter/Space activates; Escape closes and restores trigger focus. Submenus use horizontal arrows. Checkbox/radio menu items expose the appropriate checked role and maintain selection.
- **Minimum:** working action items, disabled items, sections/dividers, and complete keyboard dismissal/focus return.
- **Omissions to declare:** submenus, selectable/radio groups, context-menu positioning, shortcut execution, and virtualized contents. A shortcut label alone does not implement its shortcut.

Sources: [Specifications][c-menu-spec], [Accessibility][c-menu-a11y], [RAC Menu][r-menu], [Separator][r-separator].

### 19. Menu buttons

- **Visual contract:** menu, combo/split, and overflow triggers reuse Button and Menu tokens; 24/32/40/48px productive sizes and 14px compact type. Keep the split-button separator and independent focus boundaries. An overflow trigger is an icon-only button with a visible tooltip/name.
- **Behavior / mapping:** RAC `MenuTrigger` + Button + positioned Menu; compose a separate primary Button next to the menu trigger for a combo button. The combo has **two Tab stops**, one for the main action and one for additional actions. Enter/Space opens; menu arrows navigate; Escape restores the particular trigger.
- **Minimum:** menu button, named overflow menu, and two-part combo example with different real primary/menu actions.
- **Omissions to declare:** nested menus, selectable items, alternate trigger icons, and v12 `MenuItem` migration compatibility. Never make the entire split button one click target.

Sources: [Specifications][c-menu-buttons-spec], [Accessibility][c-menu-buttons-a11y], [RAC Menu][r-menu], [RAC Button][r-button].

### 20. Modal

- **Visual contract:** `layer` surface, 1px `border-subtle` border, `overlay` backdrop, 20/28px `heading-03`, 14/20px body, 16px top/start padding, 48px close control with 16px icon, and 48px space before the fluid footer. Medium width is documented as 100/84/60/48/48% across sm/md/lg/xlg/max, with an 84% max-height; other sizes have their own breakpoint table. Preserve scrollable content and visible actions at zoom.
- **Behavior / mapping:** RAC `DialogTrigger`, `ModalOverlay`, `Modal`, `Dialog`, and a named heading. Trap focus, make background content unavailable, support Escape and focus return. Carbon initial-focus intent varies: passive→close, confirmation→primary, destructive→cancel, transactional→first input.
- **Minimum:** named dialog with real open/close, correct initial focus, keyboard containment/return, working confirm/cancel actions, and long-content scrolling.
- **Omissions to declare:** all size variants, nested dialogs, fluid three-button footers, and click-outside dismissal. Outside dismissal is an explicit choice for the task, not an assumed default.

Sources: [Specifications][c-modal-spec], [Accessibility][c-modal-a11y], [Dialogs pattern][p-dialogs], [RAC Modal][r-modal].

### 21. Notification

- **Visual contract:** priority check 8: 3px status rail, 48px close control, 48px inline minimum height, 288/352px toast widths, 15px source inline padding, and composed 24px subtitle/caption gap. Use notification-specific low-contrast tokens or high-contrast inverse surfaces with matching status/icon/text tokens.
- **Behavior / mapping:** passive inline/toast→semantic live region plus optional close Button; callout→ordinary persistent content; actionable notification→named alertdialog with explicit initial focus/containment. RAC `UNSTABLE_Toast*` is an optional queue/region layer with its own documented navigation and timing behavior.
- **Minimum:** info/success/warning/error content, inline and toast layout, accessible dismiss control, caller-owned visibility, and appropriately prioritized announcements. Include an actionable example only when its action and focus model work.
- **Omissions to declare:** queue management, auto-dismiss/pause, action-dialog variant, callout, and focus restoration policies not yet implemented. Keep passive content free of embedded actions; the separate dismiss button remains valid.

Sources: [Specifications][c-notification-spec], [Accessibility][c-notification-a11y], [React source][s-notification-react], [browser evidence][cascade-results], [RAC Toast][r-toast].

### 22. Number input

- **Visual contract:** 32/40/48px fields, default 40px, 16px start inset, 1px `border-strong` underline, 8px label gap; fluid is a separate 64px pattern. Use `field`, `text-primary`, `icon-primary` steppers, `field-hover`, 2px focus/invalid outlines, and associated helper/warning/error text. v11 stepper separators and full-height controls differ from flagged v12 styling.
- **Behavior / mapping:** RAC `NumberField`, `Label`, `Group`, `Input`, and Buttons with increment/decrement slots. Carbon’s keyboard model is **one input Tab stop**; steppers are pointer-operable and arrows provide equivalent value changes. Preserve locale-aware parsing, step, bounds, empty input, and submitted values. Steppers need accessible names even when excluded from sequential focus.
- **Minimum:** direct entry and steppers that stay synchronized, min/max/step, controlled state, disabled/read-only/invalid states, and range guidance before an error occurs.
- **Omissions to declare:** currency/percent formatting, unit suffixes, fluid styling, and custom acceleration. Numeric validation must not silently accept a string as a number.

Sources: [Specifications][c-number-input-spec], [Accessibility][c-number-input-a11y], [number-input source][s-number-input], [RAC NumberField][r-numberfield].

### 23. Pagination

- **Visual contract:** toolbar sizes **`xs | sm | md | lg` = 24/32/40/48px** in the React API; Specifications mislabels xs as sm. Use `layer`, 1px `border-subtle` separators, 16px outer insets, 14px compact text, and 16px chevrons. Pagination-nav uses 32/40/48px controls and a **4px `border-interactive` selected rail** with semibold current-page text.
- **Behavior / mapping:** named `<nav>`, native page/page-size selects, and RAC Buttons or actual page links. Each control is a normal Tab stop. Changing size/page updates the visible range and data; previous/next become disabled at bounds. Mark the current page with `aria-current="page"`; labels must distinguish page, page size, previous, and next.
- **Minimum:** page-size selection, correct item range/total, previous/next, controlled page updates, empty-data behavior, and clamping after count changes.
- **Omissions to declare:** numbered pagination-nav, overflow-page selector, unknown totals, and server data fetching. An ellipsis is only an action when it opens a reachable page selector.

Sources: [Specifications][c-pagination-spec], [Accessibility][c-pagination-a11y], [Pagination API][s-pagination-react], [pagination SCSS][s-pagination].

### 24. Popover

- **Visual contract:** documented maximum width **352px**, 16px content padding, 8px caret, and 4px caret spacing. Surface is contextual `layer` or `background-inverse`; text/focus must match the chosen surface. Keep v11 caret geometry separate from the rounded, caret-free preview.
- **Behavior / mapping:** RAC Button plus a carefully adapted overlay, or an explicitly documented RAC dialog-style Popover. Carbon’s trigger keeps focus on opening; Tab enters interactive contents and leaves/closes at the end; Escape closes. The trigger exposes expanded/controls state. A role string change alone does not change RAC’s modal/focus behavior.
- **Minimum:** real controlled/default open state, named trigger, content positioning, collision handling, outside/Escape dismissal policy, and verified focus entry/exit.
- **Omissions to declare:** exact trigger-retaining Carbon parity until verified, all placements, nested overlays, and portal-layer inheritance if unsupported. Focus behavior belongs in the API documentation.

Sources: [Specifications][c-popover-spec], [Accessibility][c-popover-a11y], [RAC Popover][r-popover], [RAC source][r-popover-source].

### 25. Progress bar

- **Visual contract:** 4px small or 8px big track, square v11 ends, 8px label/helper gaps, 14px compact label and 12px helper. Track uses `border-subtle`; active fill `border-interactive`; success/error fill and icons use `support-success`/`support-error`. Left-aligned labels reserve 16px before the track.
- **Behavior / mapping:** RAC `ProgressBar` with label, value text, custom track/fill, and separate status/help text. Determinate bars expose min/max/current; indeterminate bars omit a fake current value. Neither is a Tab stop. Associate a busy region where applicable and announce important outcome changes without announcing every animation frame.
- **Minimum:** determinate and indeterminate states, bounded value rendering, error/success text, and completion feedback. Keep error and indeterminate helper text available to assistive technology.
- **Omissions to declare:** estimated time, pause/cancel controls, and automatic progress simulation. If pause/cancel exists, it is a real independent button/action.

Sources: [Specifications][c-progress-bar-spec], [Accessibility][c-progress-bar-a11y], [RAC ProgressBar][r-progressbar].

### 26. Progress indicator

- **Visual contract:** documented minimum **128px per step**, 16px status icons, 16px icon/label spacing, 14px compact labels, 12px helper text. Current/complete icons use `interactive`; active connectors `border-interactive`; future connectors `border-subtle`; errors `support-error`. Focus belongs on operable steps and remains distinguishable from current/completed status.
- **Behavior / mapping:** semantic ordered list, links for navigable steps or buttons for in-place workflow changes, with `aria-current="step"` and explicit “complete”, “current”, “not started”, or “error” text. No dedicated RAC stepper is required. Use ordinary Tab/Enter/Space behavior for the chosen control, rather than tablist semantics.
- **Minimum:** working step sequence with current/completed/future/error states, meaningful state labels, and permitted back/forward movement that updates content.
- **Omissions to declare:** vertical layout, overflow/truncated labels, validation orchestration, and persistent multistep data. Future steps may be static until prerequisites are met.

Sources: [Specifications][c-progress-indicator-spec], [Accessibility][c-progress-indicator-a11y], [RAC Button][r-button], [RAC Link][r-link].

### 27. Radio button

- **Visual contract:** documentation gives a 20px icon artboard and 8px dot; source renders an **18px circle**, a half-scale inner content box (approximately 8px dot), optical margins, and a 2px focus outline offset **1.5px**. Border/dot are `icon-primary`, not blue. Group labels are 12/16px, option labels 14/18px; use disabled/read-only/error treatments from the state table.
- **Behavior / mapping:** RAC `RadioGroup`, `Label`, and `Radio` options. One Tab stop enters the group, arrow keys change the mutually exclusive selection, and Tab exits. Expose group labeling/description/required validation. Preserve the selected value in form data.
- **Minimum:** labeled single-choice group, controlled/default selection, no-selection initial state, disabled options/group, validation, and horizontal/vertical presentation.
- **Omissions to declare:** read-only groups, AI decorators, and wrapped multi-column layouts if not verified. Never implement a mutually exclusive choice as independent checkboxes.

Sources: [Specifications][c-radio-button-spec], [Accessibility][c-radio-button-a11y], [radio SCSS][s-radio-button], [RAC RadioGroup][r-radiogroup].

### 28. Search

- **Visual contract:** 24/32/40/48px fields with matching end reservations for the leading search and trailing clear controls; 16px glyphs, `field`, 1px `border-strong` underline, `text-placeholder`, and `icon-secondary` search icon. Filled text/clear icon use primary tokens; focus uses the shared inset field outline. Fluid and expandable forms are distinct variants.
- **Behavior / mapping:** RAC `SearchField`, `Label`, `Input`, and clear Button, within a named search region where it represents a search function. Enter submits; Escape/clear empties the input; clearing retains sensible input focus. Suggestions belong to an Autocomplete/ComboBox composition, not unlabelled divs under the input.
- **Minimum:** actual query state, submit and clear callbacks, an accessible name, disabled state, and a specimen whose results/count/empty state respond to the query.
- **Omissions to declare:** debounce/network search, suggestions, expandable/focus-expanding variants, and fluid styling. Announcing results is application composition work beyond the bare field.

Sources: [Specifications][c-search-spec], [Accessibility][c-search-a11y], [Search pattern][p-search], [RAC SearchField][r-searchfield].

### 29. Select

- **Visual contract:** 24/32/40/48px; 16px start and 48px end padding, 1px underline, 8px label and 4px helper gaps. Use contextual `field`/`field-hover`, `border-strong`, secondary label, primary value, focus/error outlines, and a decorative chevron. The native popup’s rendering is browser/platform-owned. Fluid select is 64px.
- **Behavior / mapping:** native `<label>` + `<select>` + `<option>`/`<optgroup>` and associated help/error. Preserve platform keyboard and typeahead behavior. **RAC Select maps to Carbon Dropdown**, not to this native-select contract. Native select has no `readOnly` attribute; a read-only API needs an explicit value-preserving adaptation.
- **Minimum:** labeled real single selection, disabled options, required/invalid state, form name/value submission, and placeholder handling where needed.
- **Omissions to declare:** read-only adaptation, inline/fluid variants, custom popup styling, and multiple selection. Do not disable a read-only field and silently lose its submitted value.

Sources: [Specifications][c-select-spec], [Accessibility][c-select-a11y], [select SCSS][s-select], [RAC Select comparison][r-select].

### 30. Slider

- **Visual contract:** default **14px thumb growing to 20px active**, 4px track, 8px track-side/label gaps, documented width 200–640px. The range variant uses 16px thumbs that remain 16px active. Thumb is `icon-primary`, filled track `border-inverse`, unfilled track `border-subtle`; active/focused treatment uses `interactive` plus `focus`. Number inputs remain visually/semantically associated.
- **Behavior / mapping:** RAC `Slider`, `SliderTrack`, `SliderFill`, `SliderThumb`, label/output, and synchronized NumberField where exposed. Arrows change one step; Home/End reach bounds; RAC Shift+arrows/Page keys use a range-relative page increment. Give each range thumb an independent name/value.
- **Minimum:** pointer and keyboard value changes, controlled min/max/step, synchronized direct numeric entry, disabled state, and readable value feedback.
- **Omissions to declare:** range mode, custom Carbon `stepMultiplier`, vertical layout, and readonly/validation composition. If range mode ships, preserve logical thumb order and explain corrected out-of-range input.

Sources: [Specifications][c-slider-spec], [Accessibility][c-slider-a11y], [RAC Slider][r-slider], [slider state][r-slider-state].

### 31. Structured list

- **Visual contract:** transparent or `layer` background; primary compact semibold headers and secondary 14/20px row text; 1px `border-subtle` dividers. Documented default rows are 60px, condensed 36px; default cells have 16px top, 24px bottom, 16px horizontal space, and a 500px minimum-width specimen. Selectable rows use `layer-selected`/`layer-selected-hover` and a 16px indicator.
- **Behavior / mapping:** native table semantics for columnar data, or a definition/list structure when the actual information relationship warrants it. A selectable single-choice version requires a clearly labeled radio model, separate from static data presentation. RAC Table would add a grid interaction model.
- **Minimum:** meaningful headers/row relationships, wrapping descriptive content, responsive overflow access, and any advertised row selection functioning with keyboard and assistive technology.
- **Omissions to declare:** selectable version, condensed layout, background variant, sorting, and editing. Document a narrow-screen adaptation rather than allowing the 500px specimen width to overflow the entire page.

Sources: [Specifications][c-structured-list-spec], [Accessibility][c-structured-list-a11y], [RAC RadioGroup][r-radiogroup], [v12 selection changes][s-v12].

### 32. Tabs

- **Visual contract:** line/contained tabs 32/40/48px, default specimen 40px; 16px label insets, 14px regular unselected and semibold selected text. Line tabs use a **2px bottom** `border-interactive` selected rail; contained tabs use a **2px top** rail, `layer-accent` inactive surface and `layer` selected surface. Vertical tabs include 64px and a documented 3px start rail. Keep hover, selected, disabled, and focus treatments distinct.
- **Behavior / mapping:** RAC `Tabs`, `TabList`, `Tab`, `TabPanel`/`TabPanels`; one tablist stop, wrapping arrows, automatic or manual activation, and proper panel associations. Tab enters the panel/content; a noninteractive panel remains focusable for reading/scrolling. Focused tabs stay visible when the strip scrolls.
- **Minimum:** working line and contained tab panels, controlled selection, disabled tabs, keyboard navigation, and meaningful automatic/manual choice.
- **Omissions to declare:** vertical/icon-only tabs, scroll buttons, dismissible tabs, and animated panel transitions. Dismissal must explicitly decide which neighboring tab/panel receives focus.

Sources: [Specifications][c-tabs-spec], [Accessibility][c-tabs-a11y], [RAC Tabs][r-tabs].

### 33. Tag

- **Visual contract:** v11 pill treatment, heights **18/24/32px**, 12px `label-01`, 8px horizontal padding at small/medium and 12px at large, 16px optional icon. Use the tag component token maps for colored tags; selected tags use inverse text/surface. Dismissible focus surrounds the close control; selectable/operational focus surrounds the whole tag.
- **Behavior / mapping:** static span/list item for read-only tags, separate RAC Button for removal, ToggleButton for independent Enter/Space selection, Button/disclosure for operational tags. Carbon uses ordinary individual Tab stops. RAC `TagGroup`/`TagList`/`Tag` is a different grid-style chip collection with selection/removal navigation; expose it as an intentional variant if used.
- **Minimum:** static and dismissible tags, selected/disabled styling where applicable, a remove label containing the tag’s name, actual state updates, and focus recovery after removal.
- **Omissions to declare:** selectable/operational variants, truncation tooltip, all color variants, and RAC collection navigation. Avoid clickable dismissible bodies and nested buttons.

Sources: [Specifications][c-tag-spec], [Accessibility][c-tag-a11y], [tag tokens][s-tag-tokens], [RAC TagGroup][r-taggroup], [`useTagGroup`][r-tag-hook], [ToggleButton][r-togglebutton].

### 34. Text input

- **Visual contract:** priority check 2: 24/32/40/48px fields, 40px default, 16px start inset, 12px labels/help, 8px label and 4px helper gaps, `field` surface and 1px underline. Error/focus outlines are 2px inset. Textarea is multiline content with its own minimum height/resizing; fluid fields are a separate 64px composition. Preserve the source/documented disabled-underline disagreement.
- **Behavior / mapping:** RAC `TextField`, `Label`, `Input` or `TextArea`, description and `FieldError`; a password input adds a named show/hide Button. Preserve ref, autocomplete, input mode, max length, name/value, and native editing. Warning is a separate message/state, not necessarily invalidity.
- **Minimum:** text, password, and multiline entry; controlled/default values; required/invalid/disabled/read-only states; label/error associations; working password visibility and character counter if shown.
- **Omissions to declare:** fluid/inline layout, AI revert, mask/formatting, and automatic select-all-on-focus. Carbon’s accessibility prose describes selection on entry, but the examined TextInput source does not unconditionally call `select()`.

Sources: [Specifications][c-text-input-spec], [Accessibility][c-text-input-a11y], [TextInput source][s-text-input-react], [RAC TextField][r-textfield].

### 35. Tile

- **Visual contract:** at least **128×64px**, 16px content padding, `layer` background, primary text, and contextual hover. Selected border uses `border-inverse`; focus uses `focus`. Select/expand glyphs are 16px; the documented clickable glyph is 20px. Border presence depends on tile variant/feature flag, rather than one universal card border.
- **Behavior / mapping:** semantic container for base tile; Link/Button for a wholly actionable tile; RadioGroup/Checkbox for single/multiple-choice tiles; Disclosure for expandable tiles. Base tiles may contain controls; a whole-tile button/link must not contain another interactive control. Single-select groups use arrow navigation; multiple independent selections use their documented activation model.
- **Minimum:** base, clickable, and expandable tiles with working navigation/disclosure, meaningful names, visible focus, and content-driven height.
- **Omissions to declare:** single/multiselect, AI presence, flagged border styles, and responsive image compositions. RAC input-backed multiselect tiles need the same Enter-key compatibility decision as other button-versus-input mappings.

Sources: [Specifications][c-tile-spec], [Accessibility][c-tile-a11y], [RAC Disclosure][r-disclosure], [Checkbox][r-checkbox], [RadioGroup][r-radiogroup].

### 36. Toggle

- **Visual contract:** priority check 4: 48×24px standard or 32×16px small track, 18/10px thumbs, 3px inset, `toggle-off` and `support-success`, 8px state-text gap, and 16px v11 top-label gap. Keep a constant accessible label with state communicated separately.
- **Behavior / mapping:** current RAC `SwitchField`/`SwitchButton` or still-exported deprecated `Switch`, with an explicit compatibility choice. Carbon’s button-backed switch supports Enter and Space; RAC’s input-backed switch supports Space and excludes Enter toggling. A Carbon adapter must preserve form behavior and avoid duplicate activation.
- **Minimum:** real on/off state, controlled/default change callbacks, label click, disabled/read-only behavior, visible focus, and documented keyboard activation.
- **Omissions to declare:** small size, inline layout, state-text variation, and Carbon Enter parity until tested. An old component-name migration alone does not change the input-backed behavior.

Sources: [Specifications][c-toggle-spec], [Accessibility][c-toggle-a11y], [Toggle source][s-toggle-react], [RAC Switch][r-switch], [Switch declarations][r-switch-types], [Switch implementation][r-switch-source], [`usePress`][r-usepress].

### 37. Toggletip

- **Visual contract:** 16px information trigger icon, 8px gap from its label, **288px maximum width**, 16px content padding, documented 8px top spacing, `background-inverse`/`text-inverse`, and `body-01`. Trigger icon moves from `icon-secondary` to `icon-primary` on hover; focus remains visible while open.
- **Behavior / mapping:** RAC Button plus the same explicitly adapted disclosure surface as Popover. Enter/Space toggles while retaining trigger focus; Tab can enter content, then leave and close; Escape restores focus if it was inside. Interactive content is allowed. Expose expanded/controls relationships.
- **Minimum:** meaningful auxiliary information, a named trigger, real open/close, keyboard access to one sample action/link, and verified dismissal/focus return.
- **Omissions to declare:** all placements, nested tips, and exact nonmodal Carbon behavior until verified. A Tooltip cannot substitute because it is noninteractive and opens on hover/focus. v12 removes the automatic description relationship, while keeping disclosure state.

Sources: [Specifications][c-toggletip-spec], [Accessibility][c-toggletip-a11y], [RAC Popover][r-popover], [v12 migration][s-v12].

### 38. Tooltip

- **Visual contract:** inverse surface/text. Single-line label: 12px type, **208px max width**, 16px horizontal and 2px vertical padding. Multiline: 14/20px body, **288px max**, 16px padding. Definition: **176px max**, 16px horizontal/8px vertical padding and a 1px dotted trigger underline. Documentation gives 4px trigger spacing and 6px caret.
- **Behavior / mapping:** RAC `TooltipTrigger`/`Tooltip`, with a focusable trigger; a definition term needs deliberate focusability rather than false button behavior. Hover and keyboard focus reveal noninteractive text; Escape and focus departure dismiss it. Keep the trigger’s accessible name valid independently of visual tooltip timing.
- **Minimum:** working hover/focus/Escape behavior, correct label or description relationship, named icon-only action example, and collision-aware placement.
- **Omissions to declare:** definition/multiline variants, custom delays, and all placements. Links/buttons belong in a Toggletip/Popover, never inside a tooltip.

Sources: [Specifications][c-tooltip-spec], [Accessibility][c-tooltip-a11y], [RAC Tooltip][r-tooltip].

### 39. Tree view

- **Visual contract:** its Specifications page’s geometry/state material is image-only. Source supplies **32px default / 24px xs minimum rows**, 24px expander, 16px icons, 16px base indent, `body-compact-01`, and a **4px `interactive` active rail**. The source explicitly uses `layer-01`, `layer-hover-01`, `layer-selected-01`, and `layer-selected-hover-01`, with `field-01` disabled surfaces; these are not generic contextual aliases.
- **Behavior / mapping:** Carbon documents `tree`/`treeitem`, one entry Tab stop, up/down through visible nodes, right to expand/enter, left to collapse/parent, and Enter/Space selection. RAC `Tree`/`TreeItem`/`TreeItemContent` supplies hierarchical collection behavior but uses **`treegrid`** semantics. Preserve that as a documented adaptation or implement a verified true-tree adapter; changing only `role` leaves incompatible row/cell structure.
- **Minimum:** nested data, working expand/collapse, controlled selection/expansion, disabled nodes, type/text labels, and keyboard navigation with focus kept on visible nodes.
- **Omissions to declare:** exact tree-role parity, multiselection, drag/drop, lazy loading, and virtualization. `NavigationTree` is a separate route-oriented RAC composition, not evidence of native-tree equivalence.

Sources: [Specifications][c-tree-view-spec], [Accessibility][c-tree-view-a11y], [tree SCSS][s-treeview], [RAC Tree][r-tree], [`useTree`][r-tree-hook], [NavigationTree declarations][r-navigationtree-types].

### 40. UI shell header

- **Visual contract:** **48px header/actions**, 1px bottom rule, 16px product-name start/32px end padding, 16px link insets; product name is 14px semibold and company prefix regular. Use `background`, `background-hover`/`background-active`, primary/secondary text/icons, `border-subtle`, and a selected `border-interactive` treatment. Theme changes are semantic; do not hard-code a permanently black header.
- **Behavior / mapping:** native `<header>`, named navigation, real links, and RAC Buttons/MenuTriggers for actions. A visible-on-focus skip link comes first and targets the main region. Each link/action follows ordinary Tab order; actions that open panels expose expanded/controls state and a meaningful tooltip/name.
- **Minimum:** working home/product link, skip-to-main, navigation, one real panel action, current-page styling, and responsive treatment that keeps all actions reachable.
- **Omissions to declare:** global search, notification center, authentication/profile flows, and full enterprise header navigation. An action icon that opens nothing is not implemented coverage.

Sources: [Specifications][c-ui-shell-header-spec], [Accessibility][c-ui-shell-header-a11y], [Global header pattern][p-global-header], [RAC Menu][r-menu].

### 41. UI shell left panel

- **Visual contract:** **256px width**, 32px links/groups, 16px horizontal padding, 32px nested-link start inset, 16px icons, and a **4px selected rail**. Top-level/group labels use `heading-compact-01`; nested links use regular compact body. Use page-background state tokens, `background-selected`, `border-interactive`, and a distinct focus outline.
- **Behavior / mapping:** named `<nav>` containing nested lists, links, and disclosure Buttons; `Disclosure` can manage groups. Every actionable item remains a normal Tab stop. Current links expose `aria-current="page"`. On narrow screens a header toggle opens/closes the panel; choose and document routing focus and overlay behavior separately from static navigation.
- **Minimum:** nested working routes/groups, current-page state, collapsible sections, keyboard-reachable mobile open/close, and content layout that accounts for persistent panel width.
- **Omissions to declare:** hover/focus-expanding side rail, deep nesting, and automatic route-focus management. RAC Tree/NavigationTree introduces hierarchical collection semantics and should not be substituted silently for the documented list navigation.

Sources: [Specifications][c-ui-shell-left-panel-spec], [Accessibility][c-ui-shell-left-panel-a11y], [RAC Disclosure][r-disclosure], [NavigationTree API comparison][r-navigationtree-types].

### 42. UI shell right panel

- **Visual contract:** **256px panel**, 32px items with 16px insets, 14px semibold text, `layer` surface and subtle side rule. The **48px / 3rem** header trigger uses a 20px icon. Items use `layer-hover`, `layer-active`, and selected `layer-selected`/`text-primary`; source focus is 2px inset. Its TODO about a 3px selection rail is not an implemented rail.
- **Behavior / mapping:** named `<nav>` with `<ul>` links, controlled by a RAC Button in the header. Enter/Space toggles; ordinary Tab/Enter reaches/activates destinations. Link activation closes the panel; Escape closes and restores the switcher trigger. Synchronize expanded state with the trigger’s visible state/name.
- **Minimum:** a real app/site-switching list, open/close and Escape behavior, working destinations, selected item, focus continuity, and narrow-screen fit.
- **Omissions to declare:** live product discovery, cross-application authentication, search, and extra action groups. A right-side modal dialog is a different focus model and should be named accordingly.

Sources: [Specifications][c-ui-shell-right-panel-spec], [Accessibility][c-ui-shell-right-panel-a11y], [switcher SCSS][s-switcher], [RAC Button][r-button].

## Exact crosswalk for Cinder’s 45 catalog entries

The catalog contains **45 entries**, with **39 upstream families having some actual representation**, including partial implementations. As [implementation coverage](coverage.md#what-the-number-45-means) explains, the implementation-based count is **42 − 3 − 1 + 7 = 45**: exclude **AI label, Toggletip, and UI shell right panel**; combine the represented header and left panel into one page; then add seven entries by splitting Text input (+1), Dropdown (+2), Date picker (+2), Notification (+1), and Loading/Skeleton (+1).

The earlier naming-group calculation, **42 − 2 + 7 − 2 = 45**, is equivalent: it first excludes AI label and Toggletip, then groups all three shell names under one reference entry. That final −2 accounts for merging header/left-panel names and including the unimplemented right-panel name only as an upstream reference. **Neither grouping counts a right-panel implementation.** The three unimplemented families leave 39 represented families; the 45-page total is not a Carbon-parity percentage.

Each entry below links the [catalog source](../apps/docs/src/catalog.ts) inspected **before the final correction pass**. The upstream-contract link supplies the detailed specification, accessibility, and source citations. **Anatomy/states are acceptance targets**, including states that the inspected convenience wrapper may not expose. The last column records the implementation shape and adaptations/omissions at that snapshot; references to P1/P2 discrepancies are historical findings, not continuing open-defect claims. The UI shell row links the right-panel contract to document its omission; only header and left panel have implementation representation. Final status belongs in [coverage](coverage.md) and `docs/verification.md`. Shared 32/40/48px field/control geometry, labels/errors, theme/layer rules, and visible focus still apply.

| Cinder catalog entry                                                                  | Upstream contract                                                                                                         | Anatomy and state target                                                                                                                             | Keyboard target and current source boundary                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [01 Button](../apps/docs/src/catalog.ts#L46-L69) — `button`                           | [4. Button](#4-button)                                                                                                    | Action label, optional trailing icon or named icon-only control; primary/secondary/tertiary/ghost/danger, hover, pressed, focus, disabled.           | Tab; Enter/Space activates. [Button](../packages/react/src/buttons.tsx#L15-L48) supplies 32–80px sizes and pending feedback, but no xs/24px size. Ghost and variant focus discrepancies are P1 above; expressive styling is not an exposed variant.                                                                                                                         |
| [02 Link](../apps/docs/src/catalog.ts#L70-L86) — `link`                               | [15. Link](#15-link)                                                                                                      | Navigable text with optional icon; inline/standalone, hover, visited, focus, disabled.                                                               | Tab/Enter and native modified navigation. [Link](../packages/react/src/buttons.tsx#L50-L62) wraps RAC Link with an inline option; hrefs and routing remain caller-owned.                                                                                                                                                                                                    |
| [03 Text input](../apps/docs/src/catalog.ts#L87-L99) — `text-input`                   | [34. Text input](#34-text-input)                                                                                          | Label, input, helper/error; empty/populated, focused, invalid/warning, read-only, disabled; optional password reveal/counter.                        | Native editing and Tab. [TextField](../packages/react/src/fields.tsx#L41-L74) supplies RAC label/input/help anatomy at sm/md/lg. Password reveal, warning icon, counter, fluid and xs treatments are not supplied by its default anatomy.                                                                                                                                   |
| [04 Text area](../apps/docs/src/catalog.ts#L100-L115) — `text-area`                   | [34. Text input](#34-text-input), multiline                                                                               | Label, resizable multiline input, helper/error; empty/populated, focus, invalid, read-only, disabled.                                                | Enter inserts a newline; native editing/Tab. [TextArea](../packages/react/src/fields.tsx#L76-L105) uses four rows by default; it has no convenience `size` prop. Character count and fluid layout need separate composition. Carbon’s canonical family is `text-input`, now reflected in the catalog link.                                                                  |
| [05 Number input](../apps/docs/src/catalog.ts#L116-L137) — `number-input`             | [22. Number input](#22-number-input)                                                                                      | Label, numeric input, steppers, help/error; empty, bounded, invalid, read-only, disabled.                                                            | Carbon baseline is one input Tab stop and arrow-key stepping. [NumberField](../packages/react/src/fields.tsx#L107-L144) composes RAC slots and size-matched buttons; localized parsing/bounds are delegated to RAC. Verify stepper focus, empty input and form submission in the actual wrapper.                                                                            |
| [06 Search](../apps/docs/src/catalog.ts#L138-L150) — `search`                         | [28. Search](#28-search)                                                                                                  | Search icon, named input, clear control; empty/populated, focus, disabled, results/loading/no-results composition.                                   | Enter submits; Escape/clear empties with input focus continuity. [SearchField](../packages/react/src/fields.tsx#L146-L185) supplies the input and clear anatomy; callers own actual query/results, suggestions and debounce.                                                                                                                                                |
| [07 Select](../apps/docs/src/catalog.ts#L151-L166) — `select`                         | [29. Select](#29-select)                                                                                                  | Native label/select/options and help/error; selected, required, invalid, disabled options/control.                                                   | Platform-native arrows, typeahead and selection. [NativeSelect](../packages/react/src/pagination.tsx#L6-L51) preserves native events. Read-only is not a native select attribute and needs an explicit value-preserving design.                                                                                                                                             |
| [08 Dropdown](../apps/docs/src/catalog.ts#L167-L184) — `dropdown`                     | [11. Dropdown](#11-dropdown), single                                                                                      | Label, trigger/value/chevron, popup listbox, help/error; closed/open, selected, focused, invalid, disabled/empty options.                            | Enter/Space/Down opens; arrows navigate; selection closes; Escape cancels. [Select](../packages/react/src/selection.tsx#L145-L182) composes current RAC Select and ListBox; it is correctly distinct from native Select. Popup focus and layer fidelity remain integration checks.                                                                                          |
| [09 Combo box](../apps/docs/src/catalog.ts#L185-L202) — `combo-box`                   | [11. Dropdown](#11-dropdown), editable                                                                                    | Editable input, toggle/clear, filtered listbox, label/help/error; query/no matches, selected/custom value, focus, invalid, disabled.                 | Type filters, arrows navigate, Enter selects; **Space is text**. [ComboBox](../packages/react/src/selection.tsx#L184-L222) retains RAC behavior and optional custom values; default anatomy has a chevron but no Carbon clear button. Carbon groups it under `dropdown`.                                                                                                    |
| [10 Multi-select](../apps/docs/src/catalog.ts#L203-L224) — `multi-select`             | [11. Dropdown](#11-dropdown), multiple                                                                                    | Labeled field, count/clear tag, checkbox-style options; none/one/many selected, open, focus, disabled, invalid.                                      | Arrows and Enter/Space toggle; Escape closes. Carbon additionally clears all with Delete in the collapsed field. [Shared Select](../packages/react/src/selection.tsx#L145-L182) uses `selectionMode="multiple"` and current value arrays; default anatomy does not supply the Carbon count-tag/clear control. Collapsed Delete parity is unverified.                        |
| [11 Checkbox](../apps/docs/src/catalog.ts#L225-L245) — `checkbox`                     | [5. Checkbox](#5-checkbox)                                                                                                | 16px neutral box/mark and label; unchecked/checked/mixed, focus, invalid, read-only, disabled; labeled group when related.                           | Each checkbox is a Tab stop; Space toggles. [Checkbox/Group](../packages/react/src/selection.tsx#L38-L85) supplies mixed marks and RAC label/help/error composition. Parent/child cascade is application logic.                                                                                                                                                             |
| [12 Radio button](../apps/docs/src/catalog.ts#L246-L262) — `radio-button`             | [27. Radio button](#27-radio-button)                                                                                      | Group label/help/error, neutral circles/dots and labels; none/one selected, focus, invalid, disabled.                                                | One group Tab entry; arrows select mutually exclusively. [RadioGroup/Radio](../packages/react/src/selection.tsx#L87-L124) keeps RAC input-backed behavior. Exact painted circle/dot/focus geometry and read-only treatment require comparison with the source, not just the icon artboard.                                                                                  |
| [13 Toggle](../apps/docs/src/catalog.ts#L263-L280) — `toggle`                         | [36. Toggle](#36-toggle)                                                                                                  | Track/thumb and stable setting label; on/off, focus, disabled, read-only; optional distinct state text.                                              | Carbon Enter/Space versus RAC **Space-only toggle** is now explicit in the catalog. [Switch](../packages/react/src/selection.tsx#L126-L143) still wraps deprecated-but-exported RAC Switch. Its side-label composition differs from Carbon’s top-label/state-text anatomy; small thumb/inset are P2 above.                                                                  |
| [14 Slider](../apps/docs/src/catalog.ts#L281-L298) — `slider`                         | [30. Slider](#30-slider)                                                                                                  | Label/output, track/fill/thumb(s), optional synchronized numeric input; current, focused/active, disabled, range bounds.                             | Arrows step; Home/End reach bounds; Page/Shift increments are range-relative in RAC. [Slider](../packages/react/src/selection.tsx#L224-L273) renders one or multiple thumbs with names, but no direct numeric input. Track and active/range thumb geometry differ as P2 records.                                                                                            |
| [15 Date picker](../apps/docs/src/catalog.ts#L299-L317) — `date-picker`               | [10. Date picker](#10-date-picker), single                                                                                | Labeled date input/trigger and calendar header/grid; today, selected, focus, unavailable/disabled, invalid.                                          | RAC segments use arrows/digits; calendar arrows/Page keys navigate, selection commits, Escape closes. [DatePicker](../packages/react/src/dates.tsx#L83-L122) uses a named dialog and structured values. Segmented entry is an explicit classic-Carbon adaptation; selected/focus color and popup geometry remain P1.                                                        |
| [16 Date range picker](../apps/docs/src/catalog.ts#L318-L334) — `date-range-picker`   | [10. Date picker](#10-date-picker), range                                                                                 | Two named endpoints, range calendar, help/error; incomplete/complete range, endpoints/interior, focus, min/max/unavailable, invalid.                 | Edit each segment or choose both dates; Escape dismisses. [DateRangePicker](../packages/react/src/dates.tsx#L124-L165) supplies RAC range anatomy. Range interiors use `highlight`; endpoint colors need the P1 correction. Free-form Flatpickr parsing and multiple-calendar presentation are not the default contract.                                                    |
| [17 Time picker](../apps/docs/src/catalog.ts#L335-L352) — `time-picker`               | [10. Date picker](#10-date-picker), time                                                                                  | Labeled time entry and help/error; empty/value, 12/24-hour, invalid, read-only, disabled. Carbon also describes period/time-zone select composition. | RAC Left/Right moves segments, Up/Down changes values, digits enter directly. [TimeField](../packages/react/src/dates.tsx#L198-L227) is a locale-aware segmented adaptation, not the complete Carbon time-input/period/time-zone composition.                                                                                                                               |
| [18 File uploader](../apps/docs/src/catalog.ts#L353-L375) — `file-uploader`           | [12. File uploader](#12-file-uploader)                                                                                    | Label/help, choose/drop zone, file rows and named remove buttons; accepted/rejected, disabled, uploading/success/error when provided.                | Keyboard choose action and individual remove actions; drop has a keyboard alternative. [FileUploader](../packages/react/src/files.tsx#L24-L128) shares acceptance/size handling and exposes real Files. Network transport and upload-progress state are not supplied by this selection wrapper.                                                                             |
| [19 Form](../apps/docs/src/catalog.ts#L376-L401) — `form`                             | [13. Form](#13-form)                                                                                                      | Real form, named controls, fieldsets/legends, instructions/errors and actions; valid/invalid, submitting/success/error at application level.         | Tab follows fields; Enter submits where native semantics permit; invalid fields receive associated feedback. [Form is a RAC re-export](../packages/react/src/index.ts#L123-L141). Consumers supply submission, FormData handling, layout and any workflow state.                                                                                                            |
| [20 Accordion](../apps/docs/src/catalog.ts#L402-L419) — `accordion`                   | [2. Accordion](#2-accordion)                                                                                              | Disclosure group, heading/button/chevron and panel; expanded/collapsed, focus/hover, disabled.                                                       | Each header is a Tab stop; Enter/Space toggles and hidden content leaves focus order. [Accordion](../packages/react/src/collections.tsx#L69-L107) exposes expansion/heading level, but child Button sizing overrides the requested group size. Flush/responsive panel alignment is not represented by its fixed panel padding.                                              |
| [21 Breadcrumb](../apps/docs/src/catalog.ts#L420-L434) — `breadcrumb`                 | [3. Breadcrumb](#3-breadcrumb)                                                                                            | Ordered hierarchy, slash separators, linked ancestors and current-page indication; link hover/focus/visited.                                         | Tab/Enter follows ancestors. [BreadcrumbItem](../packages/react/src/collections.tsx#L109-L133) always composes Link, including the current item; verify its non-destination announcement and provide a named navigation landmark. Automatic overflow/menu behavior is not supplied.                                                                                         |
| [22 Content switcher](../apps/docs/src/catalog.ts#L435-L450) — `content-switcher`     | [8. Content switcher](#8-content-switcher)                                                                                | Equal-width segments, 4px ends, 1px outline/dividers; selected/unselected, hover, focus, disabled; associated alternate content.                     | Carbon uses tabs with automatic/manual activation. [Cinder](../packages/react/src/buttons.tsx#L64-L92) intentionally uses RAC’s single-selection radio-group ToggleButtonGroup and points consumers to Tabs for panel relationships. Geometry and inherited size still need P1 corrections; naming it Content switcher does not supply Carbon tab semantics.                |
| [23 Tabs](../apps/docs/src/catalog.ts#L451-L468) — `tabs`                             | [32. Tabs](#32-tabs)                                                                                                      | Tablist/tabs and associated panels; line/contained, selected, focus, hover, disabled, automatic/manual activation.                                   | One Tab entry, arrows/Home/End navigate; manual Enter/Space selects; Tab enters panel content. [Tabs](../packages/react/src/collections.tsx#L59-L67) plus [re-exported parts](../packages/react/src/index.ts#L154-L157) supplies the closer Carbon panel model. Overflow/dismissible tab behavior is not a convenience API.                                                 |
| [24 Pagination](../apps/docs/src/catalog.ts#L469-L486) — `pagination`                 | [23. Pagination](#23-pagination)                                                                                          | Named navigation, range/total, optional page-size select and previous/next; start/end disabled, empty data, changed count/size.                      | Ordinary Tab stops and native select behavior. [Pagination](../packages/react/src/pagination.tsx#L54-L139) is controlled and one-based; consumers change displayed data. Numbered navigation, a direct page selector and unknown totals are separate omissions.                                                                                                             |
| [25 Tree view](../apps/docs/src/catalog.ts#L487-L508) — `tree-view`                   | [39. Tree view](#39-tree-view)                                                                                            | Nested items/expanders/icons; expanded/collapsed, selected, focused, disabled, visible-node continuity.                                              | Up/Down traverses, Right expands/enters, Left collapses/returns. [RAC Tree re-exports](../packages/react/src/index.ts#L158-L161) use **treegrid**, explicitly documented in the catalog. Exact Carbon `tree`/`treeitem` semantics are not supplied by changing its name or role alone.                                                                                      |
| [26 UI shell](../apps/docs/src/catalog.ts#L509-L524) — `ui-shell`                     | [40. Header](#40-ui-shell-header), [41. Left panel](#41-ui-shell-left-panel), [42. Right panel](#42-ui-shell-right-panel) | 48px header, named navigation, skip link, 256px panels, current/expanded/focused states and responsive access.                                       | Ordinary Tab/Enter; disclosure buttons use Enter/Space; panels need Escape/return policies. [Layout exports](../packages/react/src/layout.tsx#L54-L77) provide Header/HeaderName/HeaderNav/SideNav structure. They do not inject a skip link, mobile controller, collapsible groups or app-switcher right panel; these remain consumer composition/partial coverage.        |
| [27 Data table](../apps/docs/src/catalog.ts#L525-L547) — `data-table`                 | [9. Data table](#9-data-table)                                                                                            | Named headers/rows/cells and optional sort/selection/expansion; empty, sorted, selected, hover/focus, disabled controls.                             | Carbon uses ordinary table navigation; [Cinder Table/Column](../packages/react/src/collections.tsx#L31-L57) uses the now-declared RAC **interactive grid**. Sort state is forwarded, while consumers must sort/filter/page actual data. Carbon-native table parity and automatic data operations are not implied.                                                           |
| [28 Contained list](../apps/docs/src/catalog.ts#L548-L565) — `contained-list`         | [7. Contained list](#7-contained-list)                                                                                    | Named list/header, rows and sibling actions; empty, hover/focus, disabled actions, optional disclosed header.                                        | Carbon items/actions have normal Tab navigation. [RAC GridList parts](../packages/react/src/index.ts#L162-L163) add arrow-key/grid selection behavior, explicitly declared. Carbon on-page/disclosed header anatomy and native-list navigation are not supplied by this mapping.                                                                                            |
| [29 Structured list](../apps/docs/src/catalog.ts#L566-L580) — `structured-list`       | [31. Structured list](#31-structured-list)                                                                                | Related terms/values or real columnar headers/rows with subtle rules; optional selected/focused/disabled selection variant.                          | Static reading order; embedded controls retain their own keys. [StructuredList](../packages/react/src/content.tsx#L104-L111) is specifically a **definition list**. Appropriate for term/value data; it is not Carbon’s selectable columnar structured-list implementation.                                                                                                 |
| [30 List](../apps/docs/src/catalog.ts#L581-L594) — `list`                             | [16. List](#16-list)                                                                                                      | Ordered/unordered/nested content and markers; no interactive state on static items.                                                                  | Native reading semantics; only embedded links/actions are Tab stops. [List](../packages/react/src/content.tsx#L92-L102) chooses ol/ul. Match source productive line height, indentation and item rhythm; current [CSS:1503–1509](../packages/react/src/styles.css#L1503-L1509) adds 4px item gaps where Carbon’s reference has none.                                        |
| [31 Tag](../apps/docs/src/catalog.ts#L595-L612) — `tag`                               | [33. Tag](#33-tag)                                                                                                        | Colored pill label/optional icon or removal control; passive, dismissible, selected, disabled, focus where operable.                                 | Passive tags have no Tab stop. [Tag](../packages/react/src/content.tsx#L5-L35) supplies ten colors and 18/24px sizes; [FilterTag/TagGroup](../packages/react/src/collections.tsx#L135-L168) supplies declared RAC grid navigation and Delete/Backspace removal. Carbon’s individual-action model, 32px size and operational tags are separate gaps.                         |
| [32 Tile](../apps/docs/src/catalog.ts#L613-L625) — `tile`                             | [35. Tile](#35-tile)                                                                                                      | Layer surface/content; clickable/selectable/expandable variants need their own affordances and selected/expanded/focused/disabled states.            | Static Tile has no Tab stop; children retain native semantics. [Tile](../packages/react/src/content.tsx#L85-L90) is a styled div only. Clickable, choice and disclosure tiles require deliberate composition and cannot be counted as implemented variants from this export.                                                                                                |
| [33 Code snippet](../apps/docs/src/catalog.ts#L626-L642) — `code-snippet`             | [6. Code snippet](#6-code-snippet)                                                                                        | Mono code region and copy control; copy success/failure, keyboard-scrollable overflow; inline/single/multiline variants.                             | Tab to code for scrolling and to copy; Enter/Space invokes copy. [CodeSnippet](../packages/react/src/content.tsx#L37-L83) attempts clipboard writes and reports failure. It supplies a block form, not distinct inline/single-line/show-more anatomy; type/padding differences are P2.                                                                                      |
| [34 Notification](../apps/docs/src/catalog.ts#L643-L660) — `notification`             | [21. Notification](#21-notification), inline                                                                              | Status rail/icon, title/body, optional dismiss; info/success/warning/error, low/high contrast; passive/actionable/callout contracts differ.          | Passive announcement should preserve focus; dismiss is a normal button. [InlineNotification](../packages/react/src/feedback.tsx#L27-L74) additionally permits arbitrary action content in `status`. That is not Carbon’s default actionable alertdialog. Inverse colors/close geometry and explicit contract treatment are P1.                                              |
| [35 Toast](../apps/docs/src/catalog.ts#L661-L687) — `toast`                           | [21. Notification](#21-notification), toast                                                                               | Queued title/description/icon/close; severity, visible/dismissed, optional timeout with pause/focus continuity.                                      | RAC’s region supports F6 navigation and controls within notifications; preserve its documented focus restoration. [ToastProvider](../packages/react/src/feedback.tsx#L195-L242) uses `UNSTABLE_Toast*` and a provider-local queue of three visible messages. Experimental status is declared; caption/actionable variants and Carbon width/close geometry are not supplied. |
| [36 Progress bar](../apps/docs/src/catalog.ts#L688-L705) — `progress-bar`             | [25. Progress bar](#25-progress-bar)                                                                                      | Label/value, track/fill, helper/status text; determinate/indeterminate, active/success/error.                                                        | Read-only progress has no Tab stop; expose real bounds/value and meaningful outcomes. [ProgressBar](../packages/react/src/feedback.tsx#L76-L117) composes RAC and an 8px track. A 4px size is not exposed; source-level label/fill roles at [CSS:1363–1374](../packages/react/src/styles.css#L1363-L1374) need comparison with compact 14px label/`border-interactive`.     |
| [37 Progress indicator](../apps/docs/src/catalog.ts#L706-L722) — `progress-indicator` | [26. Progress indicator](#26-progress-indicator)                                                                          | Ordered steps/markers/labels/help; complete, current, incomplete, invalid and disabled actions; horizontal/vertical.                                 | Static by default; with callback, ordinary button Tab/Enter/Space behavior. [ProgressIndicator](../packages/react/src/content.tsx#L113-L169) exposes `aria-current="step"` and textual state. Consumers own permitted navigation, validation and persistence.                                                                                                               |
| [38 Loading](../apps/docs/src/catalog.ts#L723-L737) — `loading`                       | [17. Loading](#17-loading)                                                                                                | 16/88px decorative spinner plus accessible loading label; active/completed and associated busy region.                                               | Noninteractive; preserve task focus. [Loading](../packages/react/src/feedback.tsx#L142-L158) uses polite `status`, an intentional urgency choice relative to Carbon’s documented assertive announcement. Blocking overlays and completion state are consumer-owned. Reduced-motion CSS leaves a static indicator.                                                           |
| [39 Inline loading](../apps/docs/src/catalog.ts#L738-L752) — `inline-loading`         | [14. Inline loading](#14-inline-loading)                                                                                  | Small spinner/check/error glyph and adjacent status text; inactive/active/finished/error target.                                                     | Noninteractive status; announce outcome without moving focus. [InlineLoading](../packages/react/src/feedback.tsx#L159-L174) exposes **active/success/error**; `success` is its completion name and no inactive variant is supplied. Operation lifecycle remains caller-owned.                                                                                               |
| [40 Skeleton](../apps/docs/src/catalog.ts#L753-L767) — `skeleton`                     | [Loading pattern][p-loading]; family skeleton variants                                                                    | Neutral placeholders that reserve expected content shape; initial loading → content/error, reduced motion.                                           | No controls/Tab stops; parent supplies meaningful loading/busy status. [Skeleton](../packages/react/src/feedback.tsx#L175-L193) is generic line placeholders with `aria-hidden`. This extra catalog entry does not demonstrate every Carbon component’s skeleton anatomy.                                                                                                   |
| [41 Modal](../apps/docs/src/catalog.ts#L768-L785) — `modal`                           | [20. Modal](#20-modal)                                                                                                    | Overlay, named dialog/title, body, close and task actions; open/closed, long content, disabled/pending actions.                                      | Move focus appropriately, contain Tab, Escape/dismiss and return focus. [Modal/Dialog](../packages/react/src/overlays.tsx#L25-L47) composes RAC and carries theme context. Consumers supply headings/actions and task-specific initial focus; xs/sm/md/lg labels do not establish Carbon breakpoint width/height parity.                                                    |
| [42 Menu](../apps/docs/src/catalog.ts#L786-L803) — `menu`                             | [18. Menu](#18-menu)                                                                                                      | Trigger, positioned menu, items/sections/separators, optional submenu/selection; focused, disabled, selected, danger.                                | Open → menu focus; arrows/typeahead; Enter/Space action; Escape returns; horizontal arrows manage submenus. [Menu parts](../packages/react/src/index.ts#L136-L141) are RAC re-exports with Cinder overlay styling. Consumers supply actions, selection and actual shortcut execution.                                                                                       |
| [43 Overflow menu](../apps/docs/src/catalog.ts#L804-L819) — `overflow-menu`           | [19. Menu buttons](#19-menu-buttons)                                                                                      | Named icon-only trigger and Menu; hover/focus/open, disabled items, danger actions.                                                                  | Same Menu contract, with return to the correct trigger. The [catalog example](../apps/docs/src/catalog.ts#L808-L817) is a composition, not a separate OverflowMenu export. Its current Menu link covers the shared surface; **Menu buttons** adds the trigger contract. A split/combo button’s two distinct actions and Tab stops remain separate coverage.                 |
| [44 Popover](../apps/docs/src/catalog.ts#L820-L837) — `popover`                       | [24. Popover](#24-popover)                                                                                                | Named trigger and anchored surface/content; open/closed, placement, focus/hover, portal theme/layer.                                                 | [Popover](../packages/react/src/overlays.tsx#L17-L23) preserves default RAC **dialog/focus containment**; the catalog now states that difference from Carbon’s trigger-retaining disclosure. A Carbon-compatible nonmodal adapter and v11 caret are not supplied by this thin wrapper.                                                                                      |
| [45 Tooltip](../apps/docs/src/catalog.ts#L838-L854) — `tooltip`                       | [38. Tooltip](#38-tooltip)                                                                                                | Noninteractive inverse text surface/caret associated with a named trigger; hover/focus/open, Escape-dismissed.                                       | Focus/hover reveals, Escape/departure dismisses; tooltip content has no Tab stops. [Tooltip](../packages/react/src/overlays.tsx#L49-L68) uses RAC with an 8px arrow and 8px default offset. Distinct label/multiline/definition variants and Carbon’s documented 6px caret/4px spacing need explicit treatment.                                                             |

### Canonical routes, absent families, and scope language

Use the archived official family roots or their acquired `guidelines`, `specifications`, and `accessibility` tabs as evidence. A Cinder slug is not necessarily an upstream route. At the inspected snapshot, the catalog routed Text area to Text input, Combo box/Multi-select to Dropdown, date range/time to Date picker, Toast to Notification, UI shell to Header, and Overflow menu to Menu. Menu buttons provides the more specific overflow/split-trigger contract. The shared helper then appended `usage`, whereas the archive includes canonical roots and `guidelines` destinations; choose a known route rather than deriving it from a Cinder slug. This report does not infer live HTTP failure from absence in the archive.

| Cinder entries                              | Canonical Carbon evidence                                                                               |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Text input; Text area                       | [Text input][c-text-input]                                                                              |
| Dropdown; Combo box; Multi-select           | [Dropdown][c-dropdown]                                                                                  |
| Date picker; Date range picker; Time picker | [Date picker][c-date-picker]                                                                            |
| Notification; Toast                         | [Notification][c-notification]                                                                          |
| Loading; Skeleton                           | [Loading][c-loading] and [Loading pattern][p-loading]; skeletons also occur within individual families  |
| Overflow menu / split-button reference      | [Menu buttons][c-menu-buttons] plus [Menu][c-menu]                                                      |
| UI shell                                    | [Header][c-ui-shell-header], [Left panel][c-ui-shell-left-panel], [Right panel][c-ui-shell-right-panel] |

**AI label, Toggletip, and UI shell right panel have no implementation in the inspected snapshot**, matching [implementation coverage](coverage.md). AI label and Toggletip are absent from the 45-entry catalog and named Cinder exports; the consolidated shell entry represents header and left panel only ([catalog](../apps/docs/src/catalog.ts), [exports](../packages/react/src/index.ts)). Their upstream contracts remain in this report to make the gaps visible. Generic Popover/Tooltip or shell exports do not implement those missing families by implication. Say “45 documented Cinder entries representing parts of 39 upstream families,” with the declared adaptations and omissions. Direct RAC re-exports do not prove that every Carbon visual variant or workflow is implemented.

## Visual evidence actually viewed

The following five official PNGs were fetched successfully (HTTP 200; acquisition recorded during this research at **2026-11-05T23:42:04.129195+00:00**) and actually opened as images. Temporary copies reside outside the repository; the durable references here are their **original official URLs**, also present in the relevant archived page image links. No pixel-diff or browser-state reproduction was performed from these diagrams.

| Viewed official image                                                                                                                                            | What was visible and how it informs the report                                                                                                                                                                                                                                                                          |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Button — ghost structure](https://s3.us-south.cloud-object-storage.appdomain.cloud/cxp-prod-payload-cms/button-style-structure-ghost-1.png)                     | Annotated **16px outer spacing, 8px label/icon gap, 16px icon**. Supports the ghost-specific correction rather than applying the filled-button 64px end reservation to ghost. Border-adjusted CSS values come from the source.                                                                                          |
| [Button — danger-ghost states](https://s3.us-south.cloud-object-storage.appdomain.cloud/cxp-prod-payload-cms/button-style-danger-ghost-interactive-states-1.png) | Red filled Hover/Active examples with light content, transparent Disabled, and a red filled Focus example with a composed ring. Hover/active corroborate the state correction. The Focus fill differs from the examined v11 danger-ghost branch; that disagreement is recorded, not silently resolved from the picture. |
| [Content switcher — text structure](https://s3.us-south.cloud-object-storage.appdomain.cloud/cxp-prod-payload-cms/content-switcher-style-structure-text-1.png)   | **Equal segment widths based on the longest label**, 16px label insets, 1px outside stroke, 4px end corners and a 48px specimen. Supports the source-derived shape/spacing corrections; it does not establish keyboard semantics.                                                                                       |
| [Accordion — sizes](https://s3.us-south.cloud-object-storage.appdomain.cloud/cxp-prod-payload-cms/accordion-style-size.png)                                      | Three labeled examples show **32/40/48px** rows, subtle horizontal rules and trailing chevrons. Confirms the size distinction missing from inherited Cinder trigger sizing. The default size is established by text/source, not by the order of pictures.                                                               |
| [Color — layering model](https://s3.us-south.cloud-object-storage.appdomain.cloud/cxp-prod-payload-cms/color-layering-model.png)                                 | Light surfaces alternate white/gray 10; dark surfaces step gray 100→90→80→70. Supports the visual layering model. Exact token values and the different `border-subtle` index come from token/source data, not sampling image colors.                                                                                    |

Three **existing pre-motion Cinder JPEGs** were also viewed:

| Existing image                                                           | Bounded observation                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [desktop-fold.jpg](../.taste-skill/before-motion/desktop-fold.jpg)       | Oversized editorial headline, four-theme swatch motif, spacious desktop navigation and trailing-icon blue CTA. Evidence for composition and hierarchy, not component state or token measurements.                                     |
| [mobile-fold.jpg](../.taste-skill/before-motion/mobile-fold.jpg)         | The same headline/swatch motif wraps into a narrow stacked layout; navigation is compact and the CTA spans the content width. Evidence of that captured responsive composition, not current mobile interaction or reflow conformance. |
| [desktop-page-02.jpg](../.taste-skill/before-motion/desktop-page-02.jpg) | Montage of the setup/code region and large dark Cinder footer, with duplicated/cropped panels and gray unused space. It is not one continuous viewport or a controlled parity capture.                                                |

These images precede later source/motion edits and have no captured hover, pressed, invalid, keyboard-focus, portal-layer, or assistive-technology matrix. They cannot verify current Cinder component dimensions, interactions, motion, four-theme state coverage, or parity. Other archived image URLs, icon/pictogram artwork, and unlisted screenshots remain unviewed in this record.

## Findings from the rest of the index

### Adoption, tooling, and lifecycle

- **Keep the product boundary clear.** Carbon is an ecosystem: Core, product-specific extensions, Charts, AI, and community-maintained packages share foundations but have different APIs and maturity. This report’s 42 upstream-family contracts follow the Core index; Cinder’s actual 45-entry catalog splits, combines, and omits families as the crosswalk records. Product tearsheets, AI Chat, chart renderers, and Labs components are additional integrations with their own contracts. [About Carbon][g-about], [component overview][g-components], [Labs][g-labs]
- **A specimen is the beginning of a component contract.** Carbon’s definition of done covers design specification, code, tests, documentation, and design-kit work. Its lifecycle distinguishes discovery, delivery/preview, and launch/stable. Apply that distinction to Cinder’s public coverage language: an example should say what works, which variations are supplied, and what remains an adaptation. Carbon’s accessibility badges describe tests on Carbon; they do not transfer to RAC wrappers. [Component checklist][g-checklist], [lifecycle][g-lifecycle], [accessibility-status definitions][g-a11y-status]
- **Learn the composition workflow from the tutorials.** The React tutorial progresses through shell/navigation, grid and static pages, API-backed tables with loading/pagination, custom token-based components, and production output. The Web Components tutorial follows a similar progression with its own imports and events. These are useful examples of observable, connected functionality. Their framework/package-manager instructions are tutorial-specific. [React tutorial][g-react-tutorial], [React data step][g-react-data], [Web Components tutorial][g-wc-tutorial]
- **Use v11 migration material to recognize old examples.** The migration moves React consumers to `@carbon/react`, standalone styles to `@carbon/styles`, adopts Dart Sass modules, renames sizes/tokens, and changes the `bx` prefix to `cds`. Older productive/expressive names map into v11’s unified type vocabulary. The separate current-source v12 guide governs previews described earlier. [v11 migration][g-migration], [developer migration][g-migration-develop], [design migration][g-migration-design]
- **Design resources have different access routes.** The Figma setup distinguishes IBM-internal and external users and combines theme, component, and IBM Design Language libraries. Code Connect, coverage, and design-to-code tools are workflow aids. Figma file contents and IBM-internal resources were not inspected in this research. [Design resources][g-design-resources], [additional tools][g-additional]
- **Treat MCP as a retrieval interface.** The pinned Carbon MCP README advertises five tools: `code_search`, `docs_search`, `get_charts`, `labs_search`, and `code_audit`. It describes a hosted IBM Cloud service, IBMid sign-in, and a builder skill. The builder emphasizes discovering identifiers, querying exact variants, verifying imports, and retrieving omitted example bodies; those are useful retrieval practices. Its Carbon-package setup policies are guidance for its own generation workflow, rather than RAC API contracts. This research used archived pages, npm artifacts, and clone snapshots; it did not exercise the authenticated hosted tools. [MCP README][mcp-readme], [builder source][mcp-builder], [MCP concepts][g-mcp-concepts], [prompting][g-mcp-prompts], [token conservation][g-mcp-tokens]

### Carbon MCP: useful retrieval, separate execution evidence

The documented endpoint is **`https://mcp.carbondesignsystem.com/mcp`**, using Streamable HTTP and IBMid authentication. The clone is a support/documentation and Builder distribution repository; reading it is not invoking the hosted server. Builder **1.3.1** is the examined guidance version. Its prose says “four MCP tools” while enumerating five; the README’s five-tool table and the Builder frontmatter agree. [README:7–12, 38–78, 114–136][mcp-readme], [Builder:1–39][mcp-builder]

| Documented tool | Useful Cinder research task                                                                                                      | Evidence boundary                                                                                                    |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `docs_search`   | Retrieve a component’s specification, accessibility guidance, or a named design-token section; retain `page_url` / `anchor_url`. | A returned chunk is partial text, not full-page or image review.                                                     |
| `code_search`   | Discover a canonical component ID, then retrieve exact variants/imports/props or icon export names.                              | Check the returned package/version and enabled branch against the pinned source; Carbon imports are not RAC imports. |
| `code_audit`    | Obtain Carbon token/component/layout findings for supplied code.                                                                 | An advertised audit tool is not proof that Cinder was audited, nor a browser or assistive-technology test.           |
| `get_charts`    | Retrieve framework/chart-specific examples and data/options structure.                                                           | Charts remain outside Cinder’s core 45-entry component implementation.                                               |
| `labs_search`   | Investigate explicitly requested experimental packages.                                                                          | Labs UIShell is not the stable Core header/left/right-panel family.                                                  |

The efficient documented sequence is **discover → canonicalize → target**: discover identifiers, constrain framework/package and variant, then retrieve the actual omitted code or relevant documentation section. Preserve source URLs and version scope in resulting notes. Hosted results and authentication were not tested in this pass. [Builder capability matrix and protocol:45–108][mcp-builder], [token-conservation guidance][g-mcp-tokens]

### Patterns: composition requirements

These are applications of the indexed guidance to Cinder. Pattern coverage does not imply that a dedicated export exists for every pattern. [Pattern overview][p-overview]

| Indexed pattern                    | Implementation takeaway                                                                                                                                                                      |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Common actions][p-common-actions] | Keep Add, Copy, Clear, Cancel, Close, Remove, Delete, and Reset meanings distinct. Pair an action’s label and danger treatment with what it actually does.                                   |
| [Dialogs][p-dialogs]               | Use a focused, short task; decide modal versus nonmodal access to the underlying page, initial focus, validation, and completion behavior.                                                   |
| [Disabled states][p-disabled]      | Show unavailability with state-specific tokens and actual interaction behavior. Distinguish disabled, read-only, and hidden; hiding an option is a separate information/permission decision. |
| [Disclosures][p-disclosures]       | Keep contextual information close to its trigger. Interactive content needs explicit keyboard entry/exit and dismissal; essential task instructions remain available without opening a tip.  |
| [Empty states][p-empty]            | Distinguish first-use/no data, no matches after an action, and an error preventing data display. Explain the cause and provide a relevant working next action.                               |
| [Filtering][p-filtering]           | Choose immediate or batch application; expose the starting state, applied criteria, and a clear/reset action per category. Clearing returns to the defined default.                          |
| [Fluid styles][p-fluid]            | Treat adjoining fields/buttons as a compound layout whose edges meet its container. The 64px label-inside input is a separate anatomy.                                                       |
| [Forms][p-forms]                   | Use persistent labels, clear required/optional notation, specific validation and recovery, deliberate spacing, and a real form submission contract.                                          |
| [Global header][p-global-header]   | Establish a sense of place and persistent global/local navigation. Source order, skip link, landmarks, and responsive panels are part of the composition.                                    |
| [Loading][p-loading]               | Distinguish initial skeletons, indeterminate activity, measurable progress, and progressive/load-more content. Expose busy, failure, and completion states.                                  |
| [Login][p-login]                   | Present the appropriate sign-in method and helpful errors with keyboard-accessible fields and navigation. Authentication transport and identity policy belong to the consuming application.  |
| [Notifications][p-notifications]   | Choose placement and interruption based on urgency and task relevance. Critical messages must remain available; a transient toast is not the only recovery path.                             |
| [Overflow content][p-overflow]     | Preserve access to full text and hidden actions. Truncation, scrolling, and show-more solve different space constraints; the reveal mechanism must work with a keyboard.                     |
| [Overview][p-overview]             | Patterns combine components to meet a user need and can have several valid implementations; document the chosen composition.                                                                 |
| [Read-only states][p-readonly]     | Preserve readable values and useful navigation/copy behavior while preventing modification. Keep value submission and field naming intentional.                                              |
| [Search][p-search]                 | Specify basic submitted, active filtering, or focused/scoped search. Show results, loading and no-results recovery, and retain an accessible name when omitting a visible label.             |
| [Status indicators][p-status]      | Combine an appropriate severity color with shape/icon and understandable text. Colored tags alone do not establish the intended status semantics.                                            |
| [Text toolbar][p-text-toolbar]     | Group real editing actions, preserve the text selection they act on, and implement toolbar/menu keyboard navigation. A styled row of inert icons is insufficient.                            |

### Data visualization: a separate rendering contract

The ten indexed pages cover chart grammar and selection as well as examples. Cinder can reuse these principles for specimens; chart-library API and accessibility parity need their own implementation verification. No Carbon Charts runtime or interactive chart demo was exercised here.

| Indexed page                | Finding and consequence                                                                                                                                                                                                         |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Overview][v-overview]      | The catalog spans simple, flow, and spatial charts. Choose a chart from the question and data relationship before choosing a visual style.                                                                                      |
| [Chart anatomy][v-anatomy]  | Titles, axes, labels, legends, tooltips, and navigation form a coherent unit. A chart should remain understandable beyond a colored plot area.                                                                                  |
| [Axes and labels][v-axes]   | Numerical axes start at zero for part-to-whole/comparison charts such as bars and areas. Mark unavailable intervals instead of interpolating through them; preserve consistent time increments and make axis breaks explicit.   |
| [Color palettes][v-colors]  | Use categorical palettes for distinct classes and sequential/diverging palettes for ordered values. Alert colors convey status. The page explicitly discourages gradients as a replacement for a sequential scale.              |
| [Dashboards][v-dashboards]  | Presentation dashboards emphasize hierarchy and a limited set of metrics; exploration dashboards support real search/filter/drill-down. Keep category colors, measurement systems, and chart layout consistent.                 |
| [Legends][v-legends]        | Prefer direct labels where practical. Default legend placement is below the chart; overflow guidance starts with two lines and a working View more action. Interactive isolation/highlighting must have accessible controls.    |
| [Simple charts][v-simple]   | Bars compare discrete values; lines communicate change across regular intervals; stacked views show contributions to totals. Several catalog entries are embedded demos rather than complete extracted implementation examples. |
| [Flow charts][v-flow]       | Alluvial, network, parallel-coordinate, and tree diagrams represent different relationships. Their pan, selection, disclosure, and reading models cannot be inferred from the Core Tree view component.                         |
| [Gantt charts][v-gantt]     | Pair task bars with readable task information and hierarchy in adjacent cards. Time, assignment, and progress remain explicit data rather than merely colored geometry.                                                         |
| [Spatial charts][v-spatial] | Heat maps encode matrix values; treemaps/circle packs encode hierarchy; geographic views need a deliberate geographic representation. Mapbox theme links are external resource references, not audited dependencies.            |

Cinder-specific acceptance for a chart specimen should include a readable summary or data alternative, named controls, keyboard-reachable detail, and cues beyond hue. RAC can support surrounding controls; it does not supply the plot’s complete interaction or data-description model. [Accessibility foundation][f-a11y], [dashboard guidance][v-dashboards]

### Universal Experiences: implications for the homepage and documentation

Carbon’s framework names nine recurring journey moments. The following Cinder applications are recommendations informed by the pages, rather than Carbon requirements for an independent library. [Universal Experiences overview][e-overview]

| Journey moment         | Cinder application                                                                                                                                             |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Discover][e-discover] | State the library’s purpose, Carbon alignment, and RAC foundation clearly in the page title and opening content.                                               |
| [Learn][e-learn]       | Explain theme/layer behavior and important semantic adaptations with inspectable examples and source references.                                               |
| [Try][e-try]           | Let visitors use the live specimen immediately: change theme, enter values, open overlays, and see state changes.                                              |
| [Buy][e-buy]           | Make adoption decisions easy by exposing package, license, compatibility, and support information. The research does not propose adding a commercial checkout. |
| [Onboard][e-onboard]   | Give the shortest working install/import/theme example and a clear next component to try.                                                                      |
| [Use][e-use]           | Provide stable component anatomy, props, keyboard behavior, examples, and reliable deep links for repeat use.                                                  |
| [Get help][e-help]     | Place common mistakes and recovery guidance beside the relevant API; make issue reporting easy to find.                                                        |
| [Expand][e-expand]     | Make advanced variants and composition guidance discoverable as users need them, with maturity and limitations visible.                                        |
| [End use][e-end]       | Keep value formats, dependencies, and adaptation decisions transparent so consumers can migrate or replace a component.                                        |

The twelve linked articles/tutorials reinforce a few useful design choices:

- **First value and continued learning:** onboarding begins with a meaningful task and continues as users gain proficiency. Offer a small working start, then deeper component and composition references. The ecosystem article distinguishes embedded Carbon guidance, WalkMe overlays, and IBM Assist Me; those products are contextual examples, not Cinder dependencies. [Introduction][e-intro], [every stage][e-stages], [tools][e-tools]
- **Memorable proof:** a live, coherent interaction can demonstrate value more directly than feature claims. Let the visitor achieve something understandable and preserve the context of their experiment. [Seamless journey][e-journey], [memorable experience][e-memorable]
- **Trial versus established use:** a sandbox with clearly identified sample data supports exploration; advanced guidance should support real ongoing tasks. This is a useful distinction between Cinder’s homepage specimen and its API reference. [Trial onboarding][e-trial], [paid onboarding][e-paid]
- **Personalization:** ask for only the inputs needed to tailor the next step, and keep the resulting guidance relevant. For a library, explicit theme or experience-level choices can be more useful than an onboarding questionnaire. [Personalization article][e-personalize], [first-steps tutorial][e-first-steps]
- **Help and updates:** provide help at the moment of need and make meaningful changes discoverable. Versioned release notes and migration examples are a natural library application. [Help resources][e-help-resources], [What’s new tutorial][e-whats-new]
- **Consistent communication:** the onboarding email article specifies six IBM email types and protected template regions. Its workflow is IBM-specific; Cinder can adopt the clarity of trigger, purpose, and next action without reusing IBM’s email identity. [Onboarding emails][e-emails]

### Support and published test status

The FAQ lists current Edge, Firefox, Chrome, and Safari as supported browsers and explains bug-reporting and telemetry. Its described package telemetry runs on specified IBM/Carbon CI origins and has a `CARBON_TELEMETRY_DISABLED=1` opt-out. These are statements of Carbon’s policy, not a browser or telemetry audit of Cinder. The Contact page directs design, code, and documentation issues to their respective channels. [FAQ][support-faq], [Contact][support-contact]

The acquired accessibility-status page labels its baseline **`@carbon/react` 1.114.0**, while the npm metadata acquired for this report is **1.120.0**. Its tested/partially tested/manually tested/not available/not tested categories must be read with that version and scenario scope. The matrix was sampled through the Data Table rows; it was not fully audited. [Accessibility status][g-a11y-status]

## Disagreement ledger

Use the source that owns the question: enabled, pinned implementation for emitted styles and APIs; design/accessibility guidance for the intended experience; a browser measurement for a disputed composed layout. Record a conflict rather than silently combining two incompatible contracts. A source behavior is evidence, not automatic proof of accessibility conformance.

| Area                            | Disagreement or easily missed distinction                                                                                                                                    | Decision for the v11 reference                                                                                                                                                                                                                                                                                                     |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button spacing                  | Specification describes 16/64px; mixin emits 15/63px plus 1px borders.                                                                                                       | Preserve the **border-box visual inset**, not extra padding on top of the border. [Mixin][s-button-mixins]                                                                                                                                                                                                                         |
| Danger-ghost focus illustration | The viewed official diagram shows a filled red Focus example; the examined v11 danger-ghost branch does not add a focus-specific fill, whereas danger-tertiary does.         | Use the pinned branch for the v11 state recipe; retain this illustration/source disagreement instead of copying the red focus fill indiscriminately. [Viewed diagram](https://s3.us-south.cloud-object-storage.appdomain.cloud/cxp-prod-payload-cms/button-style-danger-ghost-interactive-states-1.png), [SCSS:346–426][s-button]. |
| Disabled text input             | Specification says transparent underline; enabled v11 CSS retains `border-strong`.                                                                                           | Follow pinned source for fidelity. White-theme computed result is 1px solid `rgb(141, 141, 141)`. [Specification][c-text-input-spec], [measurement][cascade-results]                                                                                                                                                               |
| Checkbox focus                  | Specification uses “inset” wording; source uses a 2px outline with 1px outside offset.                                                                                       | Match the component source focus geometry. [Specification][c-checkbox-spec], [SCSS][s-checkbox]                                                                                                                                                                                                                                    |
| Radio geometry                  | A 20px documented artboard is not the 18px source circle; the source dot is half-scaled and the focus offset is 1.5px.                                                       | Retain optical margins and distinguish artboard, painted circle, and interactive hit area. [Specification][c-radio-button-spec], [SCSS][s-radio-button]                                                                                                                                                                            |
| Inline snippet corners          | Specification gives 2px; source has an **unflagged 4px** radius.                                                                                                             | Use 4px for this pinned-source target. This difference is not a v12-only branch. [Specification][c-code-snippet-spec], [SCSS][s-code-snippet]                                                                                                                                                                                      |
| Notification rail               | A helper’s default is 6px, while live inline/toast call sites pass 3px.                                                                                                      | Follow the active call sites; the fixture confirms 3px. [Mixins][s-notification-mixins], [measurement][cascade-results]                                                                                                                                                                                                            |
| Inline notification padding     | Documented 12px versus source/computed 15px top and bottom.                                                                                                                  | Use 15px for source parity; retain 48px minimum height. [Specification][c-notification-spec], [measurement][cascade-results]                                                                                                                                                                                                       |
| Toast caption gap               | Specification assigns 24px to subtitle margin; source composes 16px margin with 8px caption padding.                                                                         | **24px effective gap is confirmed.** Do not add another 8px by copying the property literally. Caption-free layout has a different 32px bottom space in this fixture. [Measurement][cascade-results]                                                                                                                               |
| Calendar state color            | Generic documented `focus` versus classic source `button-primary` for ordinary focused/selected days and `highlight` for range.                                              | Follow classic source and check dark themes; keep selected-day 1px inner outline separate. [Specification][c-date-picker-spec], [SCSS][s-flatpickr]                                                                                                                                                                                |
| Layer lookup                    | Most contextual families start at 01; `border-subtle` starts at 00. `layer-background` names the containing surface.                                                         | Use the explicit lookup table and establish context at portal hosts. `Layer` does not paint by default. [Layer sets][s-layer-sets], [React Layer][s-layer-react]                                                                                                                                                                   |
| Contained list                  | Structure and size tables disagree on disclosed header height; source default row size is lg.                                                                                | **48px default row; 32px disclosed header.** [Specification][c-contained-list-spec], [SCSS][s-contained-list]                                                                                                                                                                                                                      |
| Pagination names                | Specification labels the 24px row “Extra small (sm)”; React declares `xs`, `sm`, `md`, `lg`.                                                                                 | Use `xs` for 24px and the actual API union. [Specification][c-pagination-spec], [React API][s-pagination-react]                                                                                                                                                                                                                    |
| px/rem errors                   | Snippet 40px, toggle 18px, shell trigger 48px, and inline-loading 14px have erroneous rem counterparts in tables.                                                            | At a 16px root: **2.5rem, 1.125rem, 3rem, and 0.875rem**, respectively. [Snippet][c-code-snippet-spec], [Toggle][c-toggle-spec], [right panel][c-ui-shell-right-panel-spec], [Inline loading][c-inline-loading-spec]                                                                                                               |
| Form heading                    | Specification pairs 28px with `heading-03`.                                                                                                                                  | Actual `heading-03` is 20/28px; `heading-04` is 28/36px. Choose the intended size/token together. [Form][c-form-spec], [type source][s-type]                                                                                                                                                                                       |
| Inline-loading status           | Both success and error rows are labeled `status: finished`.                                                                                                                  | Keep `finished` and `error` distinct; use their corresponding success/error tokens. [Specification][c-inline-loading-spec], [SCSS][s-inline-loading]                                                                                                                                                                               |
| Token spelling                  | Documentation has occasional noncanonical names; reversing camelCase generically also drops numeric separators.                                                              | Treat DTCG keys and the pinned resolved export as authoritative. Preserve `syntax-heading-1`…`-6`, AI token names, and sparse component maps. [Formatter][s-token-formatter], [export][reference-tokens]                                                                                                                           |
| Grid column count               | An isolated Spacing sentence refers to 12 columns; the 2x Grid defines 4/8/16 by breakpoint.                                                                                 | Use the explicit 2x Grid breakpoint contract. [Spacing][f-spacing], [Grid][f-grid]                                                                                                                                                                                                                                                 |
| Tree measurements               | Specifications places geometry and state information in images.                                                                                                              | Cite source-derived rows/expander/rail/tokens; do not claim those image measurements were verified. [Specification][c-tree-view-spec], [SCSS][s-treeview]                                                                                                                                                                          |
| Right-panel selection           | A source TODO mentions a 3px rail without implementing it.                                                                                                                   | Report the actual `layer-selected`/`text-primary` state; a comment is not a rendered border. [Switcher source][s-switcher]                                                                                                                                                                                                         |
| Switch keyboard                 | Carbon is button-backed with Enter/Space; current RAC remains input-backed with Space toggling.                                                                              | Declare the adaptation or verify a dedicated Enter-compatible implementation, including forms. [Carbon][s-toggle-react], [RAC press handling][r-usepress]                                                                                                                                                                          |
| Disclosure focus                | Carbon retains trigger focus; default RAC Popover focuses/contains a dialog and makes the outside unavailable.                                                               | Exact Carbon-compatible Popover/Toggletip/AI-label adapters remain an implementation verification task. [Carbon][c-popover-a11y], [RAC source][r-popover-source]                                                                                                                                                                   |
| Collection semantics            | Carbon Data table is a table; Tree is a tree; tags and contained lists have ordinary item/action semantics. RAC Table/GridList/TagGroup use grids, and Tree uses a treegrid. | Use the semantic mappings in the contracts; disclose a grid/treegrid variant explicitly. [Table][c-data-table-a11y], [Tree][c-tree-view-a11y], [Tag][c-tag-a11y], [RAC Tree hook][r-tree-hook], [Tag hook][r-tag-hook]                                                                                                             |
| Slider page increment           | “Ten steps” is an unreliable simplification of RAC acceleration.                                                                                                             | Derive from range/10 snapped to step and bounded to at least one step; verify any Carbon multiplier adaptation. [State source][r-slider-state], [thumb source][r-slider-thumb]                                                                                                                                                     |
| Text selection on focus         | Text input accessibility prose describes selection on entry; examined React input code does not unconditionally invoke `select()`.                                           | Treat auto-selection as an explicit optional behavior, not a default source guarantee. [Accessibility][c-text-input-a11y], [examined source][s-text-input-react]                                                                                                                                                                   |
| Preview date dependencies       | Preview MDX says “zero dependencies”; the v12 migration text describes `temporal-polyfill`.                                                                                  | Record the inconsistency. Do not advertise dependency-free behavior from the MDX; the Temporal preview is separate from classic Flatpickr. [Preview][s-date-preview], [migration][s-v12]                                                                                                                                           |
| Maturity/version labels         | “Stable”, published accessibility badges, npm versions, and current-source preview branches refer to different scopes.                                                       | Keep the pin, enabled flags, and test baseline attached to each claim. [Accessibility status][g-a11y-status], [feature flags][s-flags], [package manifest][package-manifest]                                                                                                                                                       |

Three discovered descendant URLs returned 404: `foundations/color/usage`, `foundations/2x-grid/usage`, and `foundations/typography/Resources` beneath `/building-blocks/`. The working overview/guidelines/code routes were acquired separately. Failed requests remain visible in the manifest and are not counted as reviewed pages. [Acquisition manifest][carbon-manifest]

## Implementation acceptance and remaining gaps

### What a usable Cinder implementation must demonstrate

1. **An honest 45-entry catalog crosswalk to 42 upstream families.** Link each entry to its example/API and identify supported variants, deliberate semantic adaptations, and omissions. The inspected implementation represents parts of **39 families**; **AI label, Toggletip, and UI shell right panel** have no implementation. Apply the minimum contract in this report. A label in navigation, an export name, or an inert visual sample does not establish usable coverage. [Crosswalk](#exact-crosswalk-for-cinders-45-catalog-entries), [implementation coverage](coverage.md), [component checklist][g-checklist]
2. **Four-theme and layer fidelity.** Verify white/g10/g90/g100, three contextual levels, nested fields, overlays rendered through portals, and inverse/on-color text. Compare canonical token names and resolved values with the pinned export. [Themes][f-themes], [reference tokens][reference-tokens], [Layer source][s-layer-react]
3. **Observable behavior.** Every displayed action changes the intended state: copy writes the supplied code; filters/search/pagination change results; form submission exposes valid data and actionable errors; selection, disclosure, dismissal, date/range selection, and file removal work. Mark sample data or simulated transport in the specimen. [Component contracts](#minimum-contracts-for-all-42-component-families)
4. **Correct semantic anatomy and keyboard flow.** Verify accessible names, descriptions/errors, heading levels, selected/expanded/checked state, Tab order, arrow-key models, Escape, initial focus, and focus return. Include disabled and read-only behavior, item removal, empty collections, and background access for overlays. [Accessibility][f-a11y], [developer guidance][f-a11y-dev], [RAC forms][r-forms]
5. **Measured visual states.** Compare border-box dimensions, internal spacing, stroke widths, corners, font metrics, and focus composition for enabled/hover/pressed/selected/focused/disabled/read-only/invalid/warning states where supported. Start with the nine priority checks. Test wrapping/localized labels, narrow layouts, zoom, reduced motion, and forced colors. [Foundations](#foundations), [priority checks](#nine-priority-mismatch-checks)
6. **Integration proof against the actual dependency.** Compile the wrappers and examples against the pinned RAC API; preserve controlled/default state, native form data, refs, and consumer event handlers. Test browser and assistive-technology scenarios on the resulting application. Carbon or RAC upstream testing does not certify the composition. [RAC exports][r-exports], [RAC styling][r-styling], [upstream test-status definitions][g-a11y-status]

### Decisions that need application-level verification

| Decision                                             | Evidence required before claiming parity                                                                                            |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Enter-compatible Toggle                              | Enter/Space/label click each change once; read-only/disabled state and implicit form submission remain correct.                     |
| Trigger-retaining Popover, Toggletip, AI label       | Focus stays on opening trigger, Tab enters/leaves content as documented, Escape/outside dismissal and portal positioning work.      |
| Native Data table/Select/Contained list/Tag mappings | Correct accessibility-tree roles, ordinary Tab behavior, naming, data updates, and form submission; no accidental grid interaction. |
| Tree versus treegrid                                 | A documented RAC adaptation or a separately verified true-tree implementation with matching node semantics and navigation.          |
| Date and range value model                           | Locale entry, leap days/month transitions, min/max/unavailable values, popup focus, and plain-date versus time-zone semantics.      |
| Passive versus actionable notifications              | Appropriate announcement urgency; dismiss button access; alertdialog initial focus/containment only for the actionable contract.    |
| Theme/layer inheritance through portals              | Computed surface/field/border/focus tokens at the overlay’s DOM host match the intended trigger context.                            |
| v11 versus v12 surface choices                       | A coherent declared version boundary, with preview APIs and flags explicitly identified rather than mixed into v11 silently.        |

These are **Cinder integration acceptance conditions identified at the pre-correction snapshot**. Static inspection recorded the specific differences in the prioritized corrections and crosswalk; it did not execute the interactions. Several were already documented adaptations. The final correction pass may resolve individual findings; final resolutions, remaining gaps, and execution results will be recorded in [coverage](coverage.md) and `docs/verification.md`. This snapshot is not a perpetual open-defect list.

### Completed verification and research limits

The **pre-existing** scoped browser result records a pass at **2026-11-05T23:38:18.228872+00:00**, in **Chrome 156.0.8078.80**, at **1280px and 1600px**, with a 16px root font size. It used the unmodified `@carbon/styles@1.119.0` CSS on representative static DOM to settle the disabled-field underline and notification cascade/spacing disagreements. The fixture and stylesheet hashes, measurements, and scope are retained in [the result][cascade-results]; [the script][cascade-script] describes the check. This completion pass read those artifacts and did not rerun the fixture. It was a computed-style/layout check, not a screenshot review, React behavior test, screen-reader test, or Cinder application test.

Coverage has explicit limits:

- All 127 indexed roots were acquired. The 13 original packets provide bounded text review for 125 roots; the two asset-catalog roots were sampled separately. All 42 component Specifications and Accessibility tabs have packet coverage. Complete main-text reads independently established in this completion pass are **Slider Specifications** and **Content switcher, Date picker, and Dropdown Accessibility**. The subsequently available [review receipts](../.research/carbon/review-receipts.json) attest broader earlier reading: all 42 Specifications, 13 Accessibility pages, and 25 supplemental packets. Those are retained attestations, not additional reads performed by this completion pass; the coverage table reports their ledger statuses.
- HTML extraction retains main text, tables, links, and image alt text. Original HTML is preserved in compressed form. Extraction does not inspect images, Figma files, external demos, or client-rendered code that extracted empty. **Five official diagrams and three existing Cinder screenshots were actually viewed**, with their exact scope in the [visual-evidence section](#visual-evidence-actually-viewed); Tree geometry was recovered from source rather than inferred from its unviewed diagrams.
- The icon and pictogram catalogs were sampled, not enumerated asset by asset. Font and icon npm records remain metadata-only; font rendering and individual glyph artwork were not audited.
- Carbon Charts, product extensions, Labs, external onboarding tools, IBM-internal resources, and the live authenticated MCP service were recorded at their documented scope. They were not recursively implemented or tested.
- Artifact integrity and identical-file comparisons establish provenance. They do not establish that every line in an artifact was read or that every source branch is enabled.

Focused completion checks cover this document’s references/local targets, internal anchors, 45 catalog entries, and 127 indexed roots; their results are recorded in the task output. The separate [offline research validation artifact][research-validation] reports per-check outcomes and `input_sha256` values for archive integrity, tokens, citations, coverage, review scopes, and retained browser evidence. Its results apply to its recorded inputs and successful checks, not automatically to a later report revision. The [review ledger][review-ledger] records attested reading scope; neither artifact establishes Cinder runtime conformance.

## Licensing and identity

### Carbon and React Aria

Carbon’s archived license is **Apache-2.0**. It permits use, modification, and redistribution, including derivative works. Redistribution conditions include providing the license, retaining applicable copyright/attribution notices, marking modified files, and carrying forward relevant `NOTICE` content when the upstream work includes it. The license’s trademark section does not grant general permission to use IBM trade names or marks. [Carbon license, §§2–6][license-carbon]

The pinned React Aria Components, React Aria, and React Stately packages declare **Apache-2.0** as well. Keep the appropriate third-party notices with distributed dependency/source material. Reimplementing behavior using RAC does not remove obligations attached to any Carbon code, token files, or assets copied into Cinder. The research token export includes its source pin, copyright, license, and modification description. [RAC license][license-rac], [package metadata][package-manifest], [export provenance][reference-tokens]

### IBM Plex

IBM Plex is under **SIL Open Font License 1.1**, with reserved font name **“Plex”**. The license allows use, embedding, and bundling with software; retain the copyright/license with redistributed fonts. Font software cannot be sold by itself, modified versions cannot use the reserved name without permission, and the font software remains under OFL. Documents and interfaces created using the font are not required to adopt OFL. [Plex license][license-plex]

The acquired `@ibm/plex-sans@1.1.0` record is metadata-only. The license text was separately archived from IBM’s Plex repository and hashed; the exact font binaries used by a future distribution must carry their own accompanying license material. This research did not establish a blanket redistribution license for every externally hosted illustration, Figma file, logo, or onboarding template linked from the Carbon site.

### Carbon MCP and independent identity

The pinned MCP README identifies the Carbon Builder skill as Apache-2.0 and links a separate **hosted-service Terms of Use**, dated **27 October 2026**. Hosted access uses IBMid and does not grant additional rights to the underlying code or datasets. The archive contains four cloned service/support/terms/builder files; the findings here use the README, terms, and Builder guidance. This is not a server implementation audit. [MCP README][mcp-readme], [builder license declaration][mcp-builder], [hosted-service terms][mcp-terms]

Carbon’s Certificate of Originality page is IBM material-tracking information, with v11/v10/v9 records. It is useful provenance for IBM teams; the actual open-source license text governs the permissions summarized above. [Certificate of Originality][support-coo]

A suitable identity statement for the site is:

> Cinder is an independent React component library with Carbon-aligned styling and React Aria interactions. Carbon is IBM’s design system; React Aria is developed by Adobe. Cinder is independently maintained.

Use Cinder’s own name, mark, editorial composition, and specimen design. Credit Carbon, React Aria, and Plex in the project’s third-party attribution material, while retaining the full licenses/notices required by the material actually shipped. This research supplies the license sources; it does not add or change Cinder’s distribution files.

## Provenance and review coverage

### Acquisition versus review

The site acquisition began at [`llms.txt`][carbon-index]. The crawler followed indexed roots and bounded same-topic descendants, including **button-driven tabs recovered from the Next.js payload**. It saved rendered HTML `<main>` as Markdown, original response bytes as gzip, and per-request URLs, redirects, timestamps, hashes, links, and image references. The scope was the indexed content families and their discovered tabs, rather than the entire sitemap or every outbound website. [Crawler][site-archiver], [manifest][carbon-manifest]

| Acquisition measure                                           | Result                                                                                                                                       |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Indexed content roots                                         | **127**, all successfully acquired                                                                                                           |
| Requests including descendants/tabs                           | **338**                                                                                                                                      |
| Successful archived requests                                  | **335**, each with its own Markdown/HTML pair                                                                                                |
| Unique successful final URLs                                  | **305**                                                                                                                                      |
| Unique main-text bodies after the five-line provenance header | **293**                                                                                                                                      |
| Failed descendant requests                                    | **3**, the stale links listed in the disagreement ledger                                                                                     |
| Extracted word count across successful request entries        | **395,277**; includes duplicate/redirect-equivalent bodies                                                                                   |
| Original bounded packets read in this completion pass         | **13**: seven component packets plus foundations, patterns, getting-started, data visualization, experiences, and support/component overview |
| Supplemental packet reads attested by retained receipts       | **25**; earlier-read attestation, not re-read in this completion pass                                                                        |
| Component Specifications text coverage                        | **42 tabs covered by bounded packets**; Slider independently read in full here; ledger attests 42 full-main reads                            |
| Component Accessibility text coverage                         | **42 tabs covered by bounded packets**; three independently read in full here; ledger attests 13 full-main reads                             |
| Official diagrams / existing Cinder images actually viewed    | **5 / 3**, individually listed in the visual-evidence section                                                                                |
| First-party RAC Markdown documents acquired                   | **45**                                                                                                                                       |
| Full npm artifacts/extractions                                | **9**; another **3** packages are metadata-only                                                                                              |
| Immutable local-source files                                  | **116 Carbon + 4 Carbon MCP**                                                                                                                |
| Selected npm/current-source comparisons                       | **92**, all byte-identical                                                                                                                   |

The three full Accessibility reads independently confirmed in this completion pass are **Content switcher (lines 1–89), Date picker (1–75), and Dropdown (1–115)**; Slider Specifications was read at **1–136**. The broader full-main scopes in the coverage table come from the retained [earlier-read receipts](../.research/carbon/review-receipts.json), not from inferring completeness from a packet’s mode name `all`. Every full-text scope excludes embedded images and linked resources unless separately listed.

The current acquisition manifest now links the [review ledger][review-ledger] and records **279 `reviewed-extracts`, 56 `reviewed-full-main`, and three `not-acquired` entries**. The 56 full-main records comprise 42 component Specifications, 13 component Accessibility pages, and Certificate of Originality. The [receipts](../.research/carbon/review-receipts.json), recorded at **2026-11-06T00:22:26.016433+00:00**, attest 13 original and 25 supplemental packet reads plus 77 direct-read records. That timestamp records receipt creation, not the time of each earlier read. These archive attestations extend beyond the reading independently confirmed by this completion pass. Review terms mean:

- **`downloaded-only`** — acquired, with no recorded substantive read of that item.
- **`reviewed-extracts`** — the recorded lines/sections were read; omitted text and images remain outside that assertion. Catalog samples use this status with a sample scope.
- **`reviewed-full-main`** — the archived page’s complete extracted main text is attested as read; images and embedded interactive examples remain separate.
- **`reviewed-full-file`** — a specific source/document file is attested as read in full. A package with selected files reviewed remains partial.
- **`not-acquired`** — a failed request has no archived main text to review.

The original [packet selection][packet-selection] contains **333 records: 291 packet entries and 42 `same_body_as` records**, with line ranges and body hashes. The two large catalogs were handled by explicit samples instead. The [supplemental selection](../.research/carbon/final-evidence/selection.json) is preparation metadata; the separate receipts attest reads, and [the materializer](../.research/carbon/finalize-review.py) propagates those frozen scopes into the ledger. This completion pass inspected that provenance and reconciled its counts without claiming to replay every recorded read. Equivalence supports only the same reviewed text scope after the provenance header, never an automatic full-page status. Preparing packets, downloading artifacts, running the token exporter, and hashing files are not reading evidence.

Source review was targeted to the contracts and disputes cited, not a full read of the cloned repositories or extracted packages. The static review inspected the Cinder catalog and responsible wrappers/CSS/generator **before the final correction pass**; button, switcher, toggle, notification, calendar, layer, and type findings cite their exact upstream rules. Pinned RAC press/toggle, overlay, tree, and tag behavior informed the semantic boundaries. The icon catalog sample is **1–90** and pictogram sample **1–80**, out of **16,494** and **9,482** lines respectively; those are text/name samples, not glyph-image audits.

The Cinder line references were checked against these local source identities (SHA-256 prefixes): `apps/docs/src/catalog.ts` **c65b313364a1805b**, `packages/react/src/styles.css` **c73ac70179fa004e**, `packages/tokens/scripts/generate.ts` **38566aeb278e5335**, and `packages/tokens/src/tokens.css` **c5f30aedd3c67539**. These hashes and line numbers identify the **pre-correction source snapshot**; linked files may subsequently change. Final resolved/gap results belong in [coverage](coverage.md) and `docs/verification.md`, rather than being inferred from these historical findings.

### Archive layout and reproducibility

All paths below are relative to the Cinder repository:

```text
docs/research-carbon.md                 Implementation reference and source links
.research/carbon/
  llms.txt                             Acquired starting index
  manifest.json                        Site requests, hashes, redirects, ledger-linked review fields
  pages/                               Extracted main text
  html/                                Compressed original HTML
  review-packets/                       Deterministic bounded excerpts and selections
  final-evidence/                       Supplemental excerpts and preparation metadata
  review-receipts.json                  Frozen attestations of earlier packet/direct reads
  review-ledger.json                    Read scopes and equivalence derived from those receipts
  rac/                                 First-party RAC Markdown and manifest
  sources/                             Pinned npm artifacts, metadata, licenses, snapshots
  reference-tokens.json                 Canonical four-theme/component-token reference
  checks/                              Static upstream cascade evidence and offline archive validation
```

The local source manifest pins both sibling clones and records their clean worktrees at acquisition. Its snapshot script refuses an established-pin change or a dirty clone before copying. It performs no build, checkout, installation, or write in either sibling repository. The package manifest records npm integrity and acquisition provenance. The [offline validator’s scope](../.research/carbon/checks/verify-research.py) includes **nine retained tarballs**, their npm integrity values, **10,879 extracted file members**, 335 Markdown/HTML pairs, 120 local-source snapshots, and 92 recorded identical-file comparisons. Its per-check results and input hashes identify the validated state. Report maintenance runs formatting before this verifier, sequentially. [Local source manifest][local-manifest], [snapshot script][local-archiver], [package manifest][package-manifest], [validation result][research-validation]

From the Cinder root, reproduce the offline check with:

```sh
python3 .research/carbon/checks/verify-research.py
```

`python3 .research/carbon/finalize-review.py` reproduces the ledger, manifest review fields, and generated report blocks from the frozen receipts. Its one-time `--record-reads` option transcribes the explicitly listed completed reads and refuses to overwrite existing receipts; ordinary runs do not create new read assertions. Re-run the validator after changing the report or evidence. Packet preparation and the token exporter remain separate from review attestation.

The two generated blocks have exact `prettier-ignore-start` / `prettier-ignore-end` boundaries supplied by the materializer. These keep the coverage table and source definitions identical to the generator’s output while the surrounding report follows the repository formatter. Format the report first, then run `prettier --check .` and the research verifier sequentially; concurrent formatting would invalidate the report hash captured by validation.

The canonical export is reproducible with `python3 .research/carbon/export-reference-tokens.py`. New package acquisition should use `archive-pinned-package.py` with an explicit version, preserving existing pins. The original `archive-sources.py` resolves `latest` and should not be used to reproduce this fixed baseline. Site/RAC documentation is a dated, hashed snapshot of mutable upstream pages; its acquisition timestamp is distinct from the report’s baseline date.

### Full 127-root coverage reference

Each row links the original indexed URL and its archived root text. These are **archive-recorded statuses** from the retained [review ledger][review-ledger]: **E** means reviewed extracts; **S** means an explicit catalog text sample; **F** means a complete main-text read attested in the receipts. Component tabs have independent **Spec / A11y** statuses: the ledger records 42 Spec F and 13 A11y F entries. The four complete component-page reads independently confirmed by this completion pass are listed above; other F entries rely on the earlier-read attestations. Packet line ranges and duplicate-body relationships remain in [selection.json][packet-selection] and the ledger. Descendant counts follow each request’s assigned `indexed_root`; they are acquisition counts, not additional review claims.

<!-- BEGIN GENERATED ROOT COVERAGE -->

<!-- prettier-ignore-start -->

| Index group | Indexed root | Archived root / review | Component tabs | Acquired descendants |
| --- | --- | --- | --- | ---: |
| Getting Started | [About Carbon](https://www.carbondesignsystem.com/getting-started/about-carbon) | [E](../.research/carbon/pages/getting-started/about-carbon/_index.md) | — | 1 |
| Getting Started | [Design resources](https://www.carbondesignsystem.com/getting-started/designing/design-resources) | [E](../.research/carbon/pages/getting-started/designing/design-resources/_index.md) | — | 1 |
| Getting Started | [Overview](https://www.carbondesignsystem.com/getting-started/designing/overview) | [E](../.research/carbon/pages/getting-started/designing/overview/_index.md) | — | 0 |
| Getting Started | [Additional resources](https://www.carbondesignsystem.com/getting-started/developing/additional-resources) | [E](../.research/carbon/pages/getting-started/developing/additional-resources/_index.md) | — | 0 |
| Getting Started | [Carbon Core](https://www.carbondesignsystem.com/getting-started/developing/carbon-core) | [E](../.research/carbon/pages/getting-started/developing/carbon-core/_index.md) | — | 2 |
| Getting Started | [Overview](https://www.carbondesignsystem.com/getting-started/developing/overview) | [E](../.research/carbon/pages/getting-started/developing/overview/_index.md) | — | 0 |
| Getting Started | [React tutorial](https://www.carbondesignsystem.com/getting-started/developing/react-tutorial) | [E](../.research/carbon/pages/getting-started/developing/react-tutorial/_index.md) | — | 7 |
| Getting Started | [Web Components tutorial](https://www.carbondesignsystem.com/getting-started/developing/web-components-tutorial) | [E](../.research/carbon/pages/getting-started/developing/web-components-tutorial/_index.md) | — | 5 |
| Getting Started | [Concepts](https://www.carbondesignsystem.com/getting-started/carbon-mcp/concepts) | [E](../.research/carbon/pages/getting-started/carbon-mcp/concepts/_index.md) | — | 0 |
| Getting Started | [Onboarding and setup](https://www.carbondesignsystem.com/getting-started/carbon-mcp/onboarding-and-setup) | [E](../.research/carbon/pages/getting-started/carbon-mcp/onboarding-and-setup/_index.md) | — | 0 |
| Getting Started | [Overview](https://www.carbondesignsystem.com/getting-started/carbon-mcp/overview) | [E](../.research/carbon/pages/getting-started/carbon-mcp/overview/_index.md) | — | 0 |
| Getting Started | [Prompts](https://www.carbondesignsystem.com/getting-started/carbon-mcp/prompts) | [E](../.research/carbon/pages/getting-started/carbon-mcp/prompts/_index.md) | — | 0 |
| Getting Started | [Token conservation](https://www.carbondesignsystem.com/getting-started/carbon-mcp/token-conservation) | [E](../.research/carbon/pages/getting-started/carbon-mcp/token-conservation/_index.md) | — | 0 |
| Getting Started | [Carbon Labs](https://www.carbondesignsystem.com/getting-started/contributing/carbon-labs) | [E](../.research/carbon/pages/getting-started/contributing/carbon-labs/_index.md) | — | 0 |
| Getting Started | [Component checklist](https://www.carbondesignsystem.com/getting-started/contributing/component-checklist) | [E](../.research/carbon/pages/getting-started/contributing/component-checklist/_index.md) | — | 0 |
| Getting Started | [Enhancing components](https://www.carbondesignsystem.com/getting-started/contributing/enhancing-components) | [E](../.research/carbon/pages/getting-started/contributing/enhancing-components/_index.md) | — | 0 |
| Getting Started | [Overview](https://www.carbondesignsystem.com/getting-started/contributing/overview) | [E](../.research/carbon/pages/getting-started/contributing/overview/_index.md) | — | 0 |
| Getting Started | [Product Development Lifecycle](https://www.carbondesignsystem.com/getting-started/contributing/product-development-lifecycle) | [E](../.research/carbon/pages/getting-started/contributing/product-development-lifecycle/_index.md) | — | 0 |
| Getting Started | [FAQs](https://www.carbondesignsystem.com/getting-started/migrating/faqs) | [E](../.research/carbon/pages/getting-started/migrating/faqs/_index.md) | — | 0 |
| Getting Started | [Guide](https://www.carbondesignsystem.com/getting-started/migrating/guide) | [E](../.research/carbon/pages/getting-started/migrating/guide/_index.md) | — | 2 |
| Foundations | [2x Grid](https://www.carbondesignsystem.com/building-blocks/foundations/2x-grid) | [E](../.research/carbon/pages/building-blocks/foundations/2x-grid/_index.md) | — | 2; 1 stale |
| Foundations | [Accessibility](https://www.carbondesignsystem.com/building-blocks/foundations/accessibility) | [E](../.research/carbon/pages/building-blocks/foundations/accessibility/_index.md) | — | 3 |
| Foundations | [Carbon for AI](https://www.carbondesignsystem.com/building-blocks/foundations/carbon-for-ai) | [E](../.research/carbon/pages/building-blocks/foundations/carbon-for-ai/_index.md) | — | 1 |
| Foundations | [Color](https://www.carbondesignsystem.com/building-blocks/foundations/color) | [E](../.research/carbon/pages/building-blocks/foundations/color/_index.md) | — | 3; 1 stale |
| Foundations | [Content](https://www.carbondesignsystem.com/building-blocks/foundations/content) | [E](../.research/carbon/pages/building-blocks/foundations/content/_index.md) | — | 3 |
| Foundations | [Icons](https://www.carbondesignsystem.com/building-blocks/foundations/icons) | [S](../.research/carbon/pages/building-blocks/foundations/icons/_index.md) | — | 2 |
| Foundations | [Motion](https://www.carbondesignsystem.com/building-blocks/foundations/motion) | [E](../.research/carbon/pages/building-blocks/foundations/motion/_index.md) | — | 2 |
| Foundations | [Pictograms](https://www.carbondesignsystem.com/building-blocks/foundations/pictograms) | [S](../.research/carbon/pages/building-blocks/foundations/pictograms/_index.md) | — | 2 |
| Foundations | [Spacing](https://www.carbondesignsystem.com/building-blocks/foundations/spacing) | [E](../.research/carbon/pages/building-blocks/foundations/spacing/_index.md) | — | 1 |
| Foundations | [Themes](https://www.carbondesignsystem.com/building-blocks/foundations/themes) | [E](../.research/carbon/pages/building-blocks/foundations/themes/_index.md) | — | 1 |
| Foundations | [Typography](https://www.carbondesignsystem.com/building-blocks/foundations/typography) | [E](../.research/carbon/pages/building-blocks/foundations/typography/_index.md) | — | 3; 1 stale |
| Components | [AI label](https://www.carbondesignsystem.com/building-blocks/core/components/ai-label) | [E](../.research/carbon/pages/building-blocks/core/components/ai-label/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/ai-label/specifications.md); [A11y F](../.research/carbon/pages/building-blocks/core/components/ai-label/accessibility.md) | 3 |
| Components | [Accordion](https://www.carbondesignsystem.com/building-blocks/core/components/accordion) | [E](../.research/carbon/pages/building-blocks/core/components/accordion/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/accordion/specifications.md); [A11y F](../.research/carbon/pages/building-blocks/core/components/accordion/accessibility.md) | 3 |
| Components | [Breadcrumb](https://www.carbondesignsystem.com/building-blocks/core/components/breadcrumb) | [E](../.research/carbon/pages/building-blocks/core/components/breadcrumb/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/breadcrumb/specifications.md); [A11y E](../.research/carbon/pages/building-blocks/core/components/breadcrumb/accessibility.md) | 3 |
| Components | [Button](https://www.carbondesignsystem.com/building-blocks/core/components/button) | [E](../.research/carbon/pages/building-blocks/core/components/button/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/button/specifications.md); [A11y F](../.research/carbon/pages/building-blocks/core/components/button/accessibility.md) | 4 |
| Components | [Checkbox](https://www.carbondesignsystem.com/building-blocks/core/components/checkbox) | [E](../.research/carbon/pages/building-blocks/core/components/checkbox/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/checkbox/specifications.md); [A11y F](../.research/carbon/pages/building-blocks/core/components/checkbox/accessibility.md) | 3 |
| Components | [Code snippet](https://www.carbondesignsystem.com/building-blocks/core/components/code-snippet) | [E](../.research/carbon/pages/building-blocks/core/components/code-snippet/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/code-snippet/specifications.md); [A11y E](../.research/carbon/pages/building-blocks/core/components/code-snippet/accessibility.md) | 3 |
| Components | [Contained list](https://www.carbondesignsystem.com/building-blocks/core/components/contained-list) | [E](../.research/carbon/pages/building-blocks/core/components/contained-list/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/contained-list/specifications.md); [A11y E](../.research/carbon/pages/building-blocks/core/components/contained-list/accessibility.md) | 3 |
| Components | [Content switcher](https://www.carbondesignsystem.com/building-blocks/core/components/content-switcher) | [E](../.research/carbon/pages/building-blocks/core/components/content-switcher/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/content-switcher/specifications.md); [A11y F](../.research/carbon/pages/building-blocks/core/components/content-switcher/accessibility.md) | 3 |
| Components | [Data table](https://www.carbondesignsystem.com/building-blocks/core/components/data-table) | [E](../.research/carbon/pages/building-blocks/core/components/data-table/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/data-table/specifications.md); [A11y F](../.research/carbon/pages/building-blocks/core/components/data-table/accessibility.md) | 3 |
| Components | [Date picker](https://www.carbondesignsystem.com/building-blocks/core/components/date-picker) | [E](../.research/carbon/pages/building-blocks/core/components/date-picker/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/date-picker/specifications.md); [A11y F](../.research/carbon/pages/building-blocks/core/components/date-picker/accessibility.md) | 3 |
| Components | [Dropdown](https://www.carbondesignsystem.com/building-blocks/core/components/dropdown) | [E](../.research/carbon/pages/building-blocks/core/components/dropdown/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/dropdown/specifications.md); [A11y F](../.research/carbon/pages/building-blocks/core/components/dropdown/accessibility.md) | 4 |
| Components | [File uploader](https://www.carbondesignsystem.com/building-blocks/core/components/file-uploader) | [E](../.research/carbon/pages/building-blocks/core/components/file-uploader/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/file-uploader/specifications.md); [A11y E](../.research/carbon/pages/building-blocks/core/components/file-uploader/accessibility.md) | 3 |
| Components | [Form](https://www.carbondesignsystem.com/building-blocks/core/components/form) | [E](../.research/carbon/pages/building-blocks/core/components/form/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/form/specifications.md); [A11y E](../.research/carbon/pages/building-blocks/core/components/form/accessibility.md) | 3 |
| Components | [Inline loading](https://www.carbondesignsystem.com/building-blocks/core/components/inline-loading) | [E](../.research/carbon/pages/building-blocks/core/components/inline-loading/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/inline-loading/specifications.md); [A11y E](../.research/carbon/pages/building-blocks/core/components/inline-loading/accessibility.md) | 3 |
| Components | [Link](https://www.carbondesignsystem.com/building-blocks/core/components/link) | [E](../.research/carbon/pages/building-blocks/core/components/link/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/link/specifications.md); [A11y E](../.research/carbon/pages/building-blocks/core/components/link/accessibility.md) | 3 |
| Components | [List](https://www.carbondesignsystem.com/building-blocks/core/components/list) | [E](../.research/carbon/pages/building-blocks/core/components/list/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/list/specifications.md); [A11y E](../.research/carbon/pages/building-blocks/core/components/list/accessibility.md) | 3 |
| Components | [Loading](https://www.carbondesignsystem.com/building-blocks/core/components/loading) | [E](../.research/carbon/pages/building-blocks/core/components/loading/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/loading/specifications.md); [A11y E](../.research/carbon/pages/building-blocks/core/components/loading/accessibility.md) | 3 |
| Components | [Menu](https://www.carbondesignsystem.com/building-blocks/core/components/menu) | [E](../.research/carbon/pages/building-blocks/core/components/menu/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/menu/specifications.md); [A11y E](../.research/carbon/pages/building-blocks/core/components/menu/accessibility.md) | 3 |
| Components | [Menu buttons](https://www.carbondesignsystem.com/building-blocks/core/components/menu-buttons) | [E](../.research/carbon/pages/building-blocks/core/components/menu-buttons/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/menu-buttons/specifications.md); [A11y E](../.research/carbon/pages/building-blocks/core/components/menu-buttons/accessibility.md) | 4 |
| Components | [Modal](https://www.carbondesignsystem.com/building-blocks/core/components/modal) | [E](../.research/carbon/pages/building-blocks/core/components/modal/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/modal/specifications.md); [A11y E](../.research/carbon/pages/building-blocks/core/components/modal/accessibility.md) | 3 |
| Components | [Notification](https://www.carbondesignsystem.com/building-blocks/core/components/notification) | [E](../.research/carbon/pages/building-blocks/core/components/notification/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/notification/specifications.md); [A11y F](../.research/carbon/pages/building-blocks/core/components/notification/accessibility.md) | 3 |
| Components | [Number input](https://www.carbondesignsystem.com/building-blocks/core/components/number-input) | [E](../.research/carbon/pages/building-blocks/core/components/number-input/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/number-input/specifications.md); [A11y E](../.research/carbon/pages/building-blocks/core/components/number-input/accessibility.md) | 3 |
| Components | [Overview](https://www.carbondesignsystem.com/building-blocks/core/components/overview) | [E](../.research/carbon/pages/building-blocks/core/components/overview/_index.md) | — | 3 |
| Components | [Pagination](https://www.carbondesignsystem.com/building-blocks/core/components/pagination) | [E](../.research/carbon/pages/building-blocks/core/components/pagination/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/pagination/specifications.md); [A11y E](../.research/carbon/pages/building-blocks/core/components/pagination/accessibility.md) | 3 |
| Components | [Popover](https://www.carbondesignsystem.com/building-blocks/core/components/popover) | [E](../.research/carbon/pages/building-blocks/core/components/popover/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/popover/specifications.md); [A11y F](../.research/carbon/pages/building-blocks/core/components/popover/accessibility.md) | 4 |
| Components | [Progress bar](https://www.carbondesignsystem.com/building-blocks/core/components/progress-bar) | [E](../.research/carbon/pages/building-blocks/core/components/progress-bar/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/progress-bar/specifications.md); [A11y E](../.research/carbon/pages/building-blocks/core/components/progress-bar/accessibility.md) | 4 |
| Components | [Progress indicator](https://www.carbondesignsystem.com/building-blocks/core/components/progress-indicator) | [E](../.research/carbon/pages/building-blocks/core/components/progress-indicator/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/progress-indicator/specifications.md); [A11y E](../.research/carbon/pages/building-blocks/core/components/progress-indicator/accessibility.md) | 3 |
| Components | [Radio button](https://www.carbondesignsystem.com/building-blocks/core/components/radio-button) | [E](../.research/carbon/pages/building-blocks/core/components/radio-button/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/radio-button/specifications.md); [A11y E](../.research/carbon/pages/building-blocks/core/components/radio-button/accessibility.md) | 4 |
| Components | [Search](https://www.carbondesignsystem.com/building-blocks/core/components/search) | [E](../.research/carbon/pages/building-blocks/core/components/search/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/search/specifications.md); [A11y E](../.research/carbon/pages/building-blocks/core/components/search/accessibility.md) | 3 |
| Components | [Select](https://www.carbondesignsystem.com/building-blocks/core/components/select) | [E](../.research/carbon/pages/building-blocks/core/components/select/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/select/specifications.md); [A11y E](../.research/carbon/pages/building-blocks/core/components/select/accessibility.md) | 4 |
| Components | [Slider](https://www.carbondesignsystem.com/building-blocks/core/components/slider) | [E](../.research/carbon/pages/building-blocks/core/components/slider/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/slider/specifications.md); [A11y E](../.research/carbon/pages/building-blocks/core/components/slider/accessibility.md) | 3 |
| Components | [Structured list](https://www.carbondesignsystem.com/building-blocks/core/components/structured-list) | [E](../.research/carbon/pages/building-blocks/core/components/structured-list/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/structured-list/specifications.md); [A11y E](../.research/carbon/pages/building-blocks/core/components/structured-list/accessibility.md) | 3 |
| Components | [Tabs](https://www.carbondesignsystem.com/building-blocks/core/components/tabs) | [E](../.research/carbon/pages/building-blocks/core/components/tabs/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/tabs/specifications.md); [A11y E](../.research/carbon/pages/building-blocks/core/components/tabs/accessibility.md) | 3 |
| Components | [Tag](https://www.carbondesignsystem.com/building-blocks/core/components/tag) | [E](../.research/carbon/pages/building-blocks/core/components/tag/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/tag/specifications.md); [A11y E](../.research/carbon/pages/building-blocks/core/components/tag/accessibility.md) | 4 |
| Components | [Text input](https://www.carbondesignsystem.com/building-blocks/core/components/text-input) | [E](../.research/carbon/pages/building-blocks/core/components/text-input/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/text-input/specifications.md); [A11y F](../.research/carbon/pages/building-blocks/core/components/text-input/accessibility.md) | 4 |
| Components | [Tile](https://www.carbondesignsystem.com/building-blocks/core/components/tile) | [E](../.research/carbon/pages/building-blocks/core/components/tile/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/tile/specifications.md); [A11y E](../.research/carbon/pages/building-blocks/core/components/tile/accessibility.md) | 3 |
| Components | [Toggle](https://www.carbondesignsystem.com/building-blocks/core/components/toggle) | [E](../.research/carbon/pages/building-blocks/core/components/toggle/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/toggle/specifications.md); [A11y F](../.research/carbon/pages/building-blocks/core/components/toggle/accessibility.md) | 3 |
| Components | [Toggletip](https://www.carbondesignsystem.com/building-blocks/core/components/toggletip) | [E](../.research/carbon/pages/building-blocks/core/components/toggletip/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/toggletip/specifications.md); [A11y F](../.research/carbon/pages/building-blocks/core/components/toggletip/accessibility.md) | 3 |
| Components | [Tooltip](https://www.carbondesignsystem.com/building-blocks/core/components/tooltip) | [E](../.research/carbon/pages/building-blocks/core/components/tooltip/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/tooltip/specifications.md); [A11y E](../.research/carbon/pages/building-blocks/core/components/tooltip/accessibility.md) | 3 |
| Components | [Tree view](https://www.carbondesignsystem.com/building-blocks/core/components/tree-view) | [E](../.research/carbon/pages/building-blocks/core/components/tree-view/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/tree-view/specifications.md); [A11y E](../.research/carbon/pages/building-blocks/core/components/tree-view/accessibility.md) | 3 |
| Components | [UI shell header](https://www.carbondesignsystem.com/building-blocks/core/components/ui-shell-header) | [E](../.research/carbon/pages/building-blocks/core/components/ui-shell-header/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/ui-shell-header/specifications.md); [A11y E](../.research/carbon/pages/building-blocks/core/components/ui-shell-header/accessibility.md) | 3 |
| Components | [UI shell left panel](https://www.carbondesignsystem.com/building-blocks/core/components/ui-shell-left-panel) | [E](../.research/carbon/pages/building-blocks/core/components/ui-shell-left-panel/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/ui-shell-left-panel/specifications.md); [A11y E](../.research/carbon/pages/building-blocks/core/components/ui-shell-left-panel/accessibility.md) | 3 |
| Components | [UI shell right panel](https://www.carbondesignsystem.com/building-blocks/core/components/ui-shell-right-panel) | [E](../.research/carbon/pages/building-blocks/core/components/ui-shell-right-panel/_index.md) | [Spec F](../.research/carbon/pages/building-blocks/core/components/ui-shell-right-panel/specifications.md); [A11y E](../.research/carbon/pages/building-blocks/core/components/ui-shell-right-panel/accessibility.md) | 3 |
| Patterns | [Common actions](https://www.carbondesignsystem.com/building-blocks/core/patterns/common-actions) | [E](../.research/carbon/pages/building-blocks/core/patterns/common-actions/_index.md) | — | 1 |
| Patterns | [Dialogs](https://www.carbondesignsystem.com/building-blocks/core/patterns/dialogs) | [E](../.research/carbon/pages/building-blocks/core/patterns/dialogs/_index.md) | — | 1 |
| Patterns | [Disabled states](https://www.carbondesignsystem.com/building-blocks/core/patterns/disabled-states) | [E](../.research/carbon/pages/building-blocks/core/patterns/disabled-states/_index.md) | — | 1 |
| Patterns | [Disclosures](https://www.carbondesignsystem.com/building-blocks/core/patterns/disclosures) | [E](../.research/carbon/pages/building-blocks/core/patterns/disclosures/_index.md) | — | 1 |
| Patterns | [Empty states](https://www.carbondesignsystem.com/building-blocks/core/patterns/empty-states) | [E](../.research/carbon/pages/building-blocks/core/patterns/empty-states/_index.md) | — | 1 |
| Patterns | [Filtering](https://www.carbondesignsystem.com/building-blocks/core/patterns/filtering) | [E](../.research/carbon/pages/building-blocks/core/patterns/filtering/_index.md) | — | 1 |
| Patterns | [Fluid styles](https://www.carbondesignsystem.com/building-blocks/core/patterns/fluid-styles) | [E](../.research/carbon/pages/building-blocks/core/patterns/fluid-styles/_index.md) | — | 1 |
| Patterns | [Forms](https://www.carbondesignsystem.com/building-blocks/core/patterns/forms) | [E](../.research/carbon/pages/building-blocks/core/patterns/forms/_index.md) | — | 1 |
| Patterns | [Global header](https://www.carbondesignsystem.com/building-blocks/core/patterns/global-header) | [E](../.research/carbon/pages/building-blocks/core/patterns/global-header/_index.md) | — | 1 |
| Patterns | [Loading](https://www.carbondesignsystem.com/building-blocks/core/patterns/loading) | [E](../.research/carbon/pages/building-blocks/core/patterns/loading/_index.md) | — | 1 |
| Patterns | [Login](https://www.carbondesignsystem.com/building-blocks/core/patterns/login) | [E](../.research/carbon/pages/building-blocks/core/patterns/login/_index.md) | — | 0 |
| Patterns | [Notifications](https://www.carbondesignsystem.com/building-blocks/core/patterns/notifications) | [E](../.research/carbon/pages/building-blocks/core/patterns/notifications/_index.md) | — | 1 |
| Patterns | [Overflow content](https://www.carbondesignsystem.com/building-blocks/core/patterns/overflow-content) | [E](../.research/carbon/pages/building-blocks/core/patterns/overflow-content/_index.md) | — | 1 |
| Patterns | [Overview](https://www.carbondesignsystem.com/building-blocks/core/patterns/overview) | [E](../.research/carbon/pages/building-blocks/core/patterns/overview/_index.md) | — | 1 |
| Patterns | [Read-only states](https://www.carbondesignsystem.com/building-blocks/core/patterns/read-only-states) | [E](../.research/carbon/pages/building-blocks/core/patterns/read-only-states/_index.md) | — | 1 |
| Patterns | [Search](https://www.carbondesignsystem.com/building-blocks/core/patterns/search) | [E](../.research/carbon/pages/building-blocks/core/patterns/search/_index.md) | — | 1 |
| Patterns | [Status indicators](https://www.carbondesignsystem.com/building-blocks/core/patterns/status-indicators) | [E](../.research/carbon/pages/building-blocks/core/patterns/status-indicators/_index.md) | — | 1 |
| Patterns | [Text toolbar](https://www.carbondesignsystem.com/building-blocks/core/patterns/text-toolbar) | [E](../.research/carbon/pages/building-blocks/core/patterns/text-toolbar/_index.md) | — | 1 |
| Data Visualization | [Axes and labels](https://www.carbondesignsystem.com/building-blocks/data-visualization/axes-and-labels) | [E](../.research/carbon/pages/building-blocks/data-visualization/axes-and-labels/_index.md) | — | 0 |
| Data Visualization | [Chart anatomy](https://www.carbondesignsystem.com/building-blocks/data-visualization/chart-anatomy) | [E](../.research/carbon/pages/building-blocks/data-visualization/chart-anatomy/_index.md) | — | 0 |
| Data Visualization | [Color palettes](https://www.carbondesignsystem.com/building-blocks/data-visualization/color-palettes) | [E](../.research/carbon/pages/building-blocks/data-visualization/color-palettes/_index.md) | — | 0 |
| Data Visualization | [Dashboards](https://www.carbondesignsystem.com/building-blocks/data-visualization/dashboards) | [E](../.research/carbon/pages/building-blocks/data-visualization/dashboards/_index.md) | — | 0 |
| Data Visualization | [Flow charts](https://www.carbondesignsystem.com/building-blocks/data-visualization/flow-charts) | [E](../.research/carbon/pages/building-blocks/data-visualization/flow-charts/_index.md) | — | 0 |
| Data Visualization | [Gantt charts](https://www.carbondesignsystem.com/building-blocks/data-visualization/gantt-charts) | [E](../.research/carbon/pages/building-blocks/data-visualization/gantt-charts/_index.md) | — | 0 |
| Data Visualization | [Legends](https://www.carbondesignsystem.com/building-blocks/data-visualization/legends) | [E](../.research/carbon/pages/building-blocks/data-visualization/legends/_index.md) | — | 0 |
| Data Visualization | [Overview](https://www.carbondesignsystem.com/building-blocks/data-visualization/overview) | [E](../.research/carbon/pages/building-blocks/data-visualization/overview/_index.md) | — | 0 |
| Data Visualization | [Simple charts](https://www.carbondesignsystem.com/building-blocks/data-visualization/simple-charts) | [E](../.research/carbon/pages/building-blocks/data-visualization/simple-charts/_index.md) | — | 0 |
| Data Visualization | [Spatial charts](https://www.carbondesignsystem.com/building-blocks/data-visualization/spatial-charts) | [E](../.research/carbon/pages/building-blocks/data-visualization/spatial-charts/_index.md) | — | 0 |
| Building Experiences | [Buy](https://www.carbondesignsystem.com/building-experiences/buy) | [E](../.research/carbon/pages/building-experiences/buy/_index.md) | — | 0 |
| Building Experiences | [Discover](https://www.carbondesignsystem.com/building-experiences/discover) | [E](../.research/carbon/pages/building-experiences/discover/_index.md) | — | 0 |
| Building Experiences | [End use](https://www.carbondesignsystem.com/building-experiences/end-use) | [E](../.research/carbon/pages/building-experiences/end-use/_index.md) | — | 0 |
| Building Experiences | [Expand](https://www.carbondesignsystem.com/building-experiences/expand) | [E](../.research/carbon/pages/building-experiences/expand/_index.md) | — | 0 |
| Building Experiences | [Get help](https://www.carbondesignsystem.com/building-experiences/get-help) | [E](../.research/carbon/pages/building-experiences/get-help/_index.md) | — | 0 |
| Building Experiences | [Learn](https://www.carbondesignsystem.com/building-experiences/learn) | [E](../.research/carbon/pages/building-experiences/learn/_index.md) | — | 0 |
| Building Experiences | [Onboard](https://www.carbondesignsystem.com/building-experiences/onboard) | [E](../.research/carbon/pages/building-experiences/onboard/_index.md) | — | 12 |
| Building Experiences | [Overview](https://www.carbondesignsystem.com/building-experiences/overview) | [E](../.research/carbon/pages/building-experiences/overview/_index.md) | — | 0 |
| Building Experiences | [Try](https://www.carbondesignsystem.com/building-experiences/try) | [E](../.research/carbon/pages/building-experiences/try/_index.md) | — | 0 |
| Building Experiences | [Use](https://www.carbondesignsystem.com/building-experiences/use) | [E](../.research/carbon/pages/building-experiences/use/_index.md) | — | 0 |
| Building Experiences | [Craft a seamless onboarding journey](https://www.carbondesignsystem.com/articles/craft-a-seamless-onboarding-journey) | [E](../.research/carbon/pages/articles/craft-a-seamless-onboarding-journey/_index.md) | — | 0 |
| Building Experiences | [Create a memorable product experience](https://www.carbondesignsystem.com/articles/create-a-memorable-product-experience) | [E](../.research/carbon/pages/articles/create-a-memorable-product-experience/_index.md) | — | 0 |
| Building Experiences | [Create consistency across onboarding emails](https://www.carbondesignsystem.com/articles/create-consistency-across-onboarding-emails) | [E](../.research/carbon/pages/articles/create-consistency-across-onboarding-emails/_index.md) | — | 0 |
| Building Experiences | [Design a paid onboarding experience](https://www.carbondesignsystem.com/articles/design-a-paid-onboarding-experience) | [E](../.research/carbon/pages/articles/design-a-paid-onboarding-experience/_index.md) | — | 0 |
| Building Experiences | [Design a trial onboarding experience](https://www.carbondesignsystem.com/articles/design-a-trial-onboarding-experience) | [E](../.research/carbon/pages/articles/design-a-trial-onboarding-experience/_index.md) | — | 0 |
| Building Experiences | [Design help resources for seamless problem solving](https://www.carbondesignsystem.com/articles/design-help-resources-for-seamless-problem-solving) | [E](../.research/carbon/pages/articles/design-help-resources-for-seamless-problem-solving/_index.md) | — | 0 |
| Building Experiences | [Introduction to onboarding](https://www.carbondesignsystem.com/articles/introduction-to-onboarding) | [E](../.research/carbon/pages/articles/introduction-to-onboarding/_index.md) | — | 0 |
| Building Experiences | [Onboard for every stage of the user’s journey](https://www.carbondesignsystem.com/articles/onboard-for-every-stage-of-the-users-journey) | [E](../.research/carbon/pages/articles/onboard-for-every-stage-of-the-users-journey/_index.md) | — | 0 |
| Building Experiences | [Personalize your onboarding experience](https://www.carbondesignsystem.com/articles/personalize-your-onboarding-experience) | [E](../.research/carbon/pages/articles/personalize-your-onboarding-experience/_index.md) | — | 0 |
| Building Experiences | [Tools for designing onboarding experiences](https://www.carbondesignsystem.com/articles/tools-for-designing-onboarding-experiences) | [E](../.research/carbon/pages/articles/tools-for-designing-onboarding-experiences/_index.md) | — | 0 |
| Building Experiences | [Show What’s new to maintain user engagement](https://www.carbondesignsystem.com/tutorials/show-whats-new-to-maintain-user-engagement) | [E](../.research/carbon/pages/tutorials/show-whats-new-to-maintain-user-engagement/_index.md) | — | 0 |
| Building Experiences | [Use personalization to tailor a user’s first product steps](https://www.carbondesignsystem.com/tutorials/use-personalization-to-tailor-a-users-first-product-steps) | [E](../.research/carbon/pages/tutorials/use-personalization-to-tailor-a-users-first-product-steps/_index.md) | — | 0 |
| Support | [Certificate of Originality](https://www.carbondesignsystem.com/support/certificate-of-originality) | [F](../.research/carbon/pages/support/certificate-of-originality/_index.md) | — | 0 |
| Support | [Contact us](https://www.carbondesignsystem.com/support/contact-us) | [E](../.research/carbon/pages/support/contact-us/_index.md) | — | 0 |
| Support | [FAQs](https://www.carbondesignsystem.com/support/faqs) | [E](../.research/carbon/pages/support/faqs/_index.md) | — | 0 |

<!-- prettier-ignore-end -->

<!-- END GENERATED ROOT COVERAGE -->

### The five index resource links

These are listed separately from the 127 content roots:

| Resource                                                                    | Research treatment                                                                                             |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| [Carbon MCP endpoint](https://mcp.carbondesignsystem.com/mcp)               | Hosted protocol endpoint recorded; service/setup/terms read from documentation. No authenticated tool session. |
| [IBM Design Language](https://www.ibm.com/design/language/)                 | Referenced by the Carbon foundations; this external site was not recursively crawled.                          |
| [Sitemaps index](https://www.carbondesignsystem.com/pages-sitemap.xml)      | Recorded as an alternate site index; acquisition scope came from `llms.txt` and same-topic descendants.        |
| [Carbon repository](https://github.com/carbon-design-system/carbon)         | Read-only sibling clone with selected immutable source snapshots and npm comparisons.                          |
| [Carbon MCP repository](https://github.com/carbon-design-system/carbon-mcp) | Read-only sibling clone with four selected documentation/terms/builder snapshots.                              |

Reference-style citations resolve to acquired local evidence. Archived site files identify their original and resolved URL; the package/local-source manifests supply versioned upstream locations for implementation files. Inline links also identify current Cinder files and the exact original URLs of the five viewed official diagrams. The coverage table provides direct upstream navigation. A cited file’s existence does not imply that its entire contents were reviewed.

<!-- BEGIN GENERATED SOURCE REFERENCES -->

<!-- prettier-ignore-start -->

[c-accordion-a11y]: ../.research/carbon/pages/building-blocks/core/components/accordion/accessibility.md
[c-accordion-spec]: ../.research/carbon/pages/building-blocks/core/components/accordion/specifications.md
[c-ai-label]: ../.research/carbon/pages/building-blocks/core/components/ai-label/_index.md
[c-ai-label-a11y]: ../.research/carbon/pages/building-blocks/core/components/ai-label/accessibility.md
[c-ai-label-spec]: ../.research/carbon/pages/building-blocks/core/components/ai-label/specifications.md
[c-breadcrumb-a11y]: ../.research/carbon/pages/building-blocks/core/components/breadcrumb/accessibility.md
[c-breadcrumb-spec]: ../.research/carbon/pages/building-blocks/core/components/breadcrumb/specifications.md
[c-button-a11y]: ../.research/carbon/pages/building-blocks/core/components/button/accessibility.md
[c-button-spec]: ../.research/carbon/pages/building-blocks/core/components/button/specifications.md
[c-checkbox-a11y]: ../.research/carbon/pages/building-blocks/core/components/checkbox/accessibility.md
[c-checkbox-spec]: ../.research/carbon/pages/building-blocks/core/components/checkbox/specifications.md
[c-code-snippet-a11y]: ../.research/carbon/pages/building-blocks/core/components/code-snippet/accessibility.md
[c-code-snippet-spec]: ../.research/carbon/pages/building-blocks/core/components/code-snippet/specifications.md
[c-contained-list-a11y]: ../.research/carbon/pages/building-blocks/core/components/contained-list/accessibility.md
[c-contained-list-spec]: ../.research/carbon/pages/building-blocks/core/components/contained-list/specifications.md
[c-content-switcher-a11y]: ../.research/carbon/pages/building-blocks/core/components/content-switcher/accessibility.md
[c-content-switcher-spec]: ../.research/carbon/pages/building-blocks/core/components/content-switcher/specifications.md
[c-data-table-a11y]: ../.research/carbon/pages/building-blocks/core/components/data-table/accessibility.md
[c-data-table-spec]: ../.research/carbon/pages/building-blocks/core/components/data-table/specifications.md
[c-date-picker]: ../.research/carbon/pages/building-blocks/core/components/date-picker/_index.md
[c-date-picker-a11y]: ../.research/carbon/pages/building-blocks/core/components/date-picker/accessibility.md
[c-date-picker-spec]: ../.research/carbon/pages/building-blocks/core/components/date-picker/specifications.md
[c-dropdown]: ../.research/carbon/pages/building-blocks/core/components/dropdown/_index.md
[c-dropdown-a11y]: ../.research/carbon/pages/building-blocks/core/components/dropdown/accessibility.md
[c-dropdown-spec]: ../.research/carbon/pages/building-blocks/core/components/dropdown/specifications.md
[c-file-uploader-a11y]: ../.research/carbon/pages/building-blocks/core/components/file-uploader/accessibility.md
[c-file-uploader-spec]: ../.research/carbon/pages/building-blocks/core/components/file-uploader/specifications.md
[c-form-a11y]: ../.research/carbon/pages/building-blocks/core/components/form/accessibility.md
[c-form-spec]: ../.research/carbon/pages/building-blocks/core/components/form/specifications.md
[c-inline-loading-a11y]: ../.research/carbon/pages/building-blocks/core/components/inline-loading/accessibility.md
[c-inline-loading-spec]: ../.research/carbon/pages/building-blocks/core/components/inline-loading/specifications.md
[c-link-a11y]: ../.research/carbon/pages/building-blocks/core/components/link/accessibility.md
[c-link-spec]: ../.research/carbon/pages/building-blocks/core/components/link/specifications.md
[c-list-a11y]: ../.research/carbon/pages/building-blocks/core/components/list/accessibility.md
[c-list-spec]: ../.research/carbon/pages/building-blocks/core/components/list/specifications.md
[c-loading]: ../.research/carbon/pages/building-blocks/core/components/loading/_index.md
[c-loading-a11y]: ../.research/carbon/pages/building-blocks/core/components/loading/accessibility.md
[c-loading-spec]: ../.research/carbon/pages/building-blocks/core/components/loading/specifications.md
[c-menu]: ../.research/carbon/pages/building-blocks/core/components/menu/_index.md
[c-menu-a11y]: ../.research/carbon/pages/building-blocks/core/components/menu/accessibility.md
[c-menu-buttons]: ../.research/carbon/pages/building-blocks/core/components/menu-buttons/_index.md
[c-menu-buttons-a11y]: ../.research/carbon/pages/building-blocks/core/components/menu-buttons/accessibility.md
[c-menu-buttons-spec]: ../.research/carbon/pages/building-blocks/core/components/menu-buttons/specifications.md
[c-menu-spec]: ../.research/carbon/pages/building-blocks/core/components/menu/specifications.md
[c-modal-a11y]: ../.research/carbon/pages/building-blocks/core/components/modal/accessibility.md
[c-modal-spec]: ../.research/carbon/pages/building-blocks/core/components/modal/specifications.md
[c-notification]: ../.research/carbon/pages/building-blocks/core/components/notification/_index.md
[c-notification-a11y]: ../.research/carbon/pages/building-blocks/core/components/notification/accessibility.md
[c-notification-spec]: ../.research/carbon/pages/building-blocks/core/components/notification/specifications.md
[c-number-input-a11y]: ../.research/carbon/pages/building-blocks/core/components/number-input/accessibility.md
[c-number-input-spec]: ../.research/carbon/pages/building-blocks/core/components/number-input/specifications.md
[c-pagination-a11y]: ../.research/carbon/pages/building-blocks/core/components/pagination/accessibility.md
[c-pagination-spec]: ../.research/carbon/pages/building-blocks/core/components/pagination/specifications.md
[c-popover-a11y]: ../.research/carbon/pages/building-blocks/core/components/popover/accessibility.md
[c-popover-spec]: ../.research/carbon/pages/building-blocks/core/components/popover/specifications.md
[c-progress-bar-a11y]: ../.research/carbon/pages/building-blocks/core/components/progress-bar/accessibility.md
[c-progress-bar-spec]: ../.research/carbon/pages/building-blocks/core/components/progress-bar/specifications.md
[c-progress-indicator-a11y]: ../.research/carbon/pages/building-blocks/core/components/progress-indicator/accessibility.md
[c-progress-indicator-spec]: ../.research/carbon/pages/building-blocks/core/components/progress-indicator/specifications.md
[c-radio-button-a11y]: ../.research/carbon/pages/building-blocks/core/components/radio-button/accessibility.md
[c-radio-button-spec]: ../.research/carbon/pages/building-blocks/core/components/radio-button/specifications.md
[c-search-a11y]: ../.research/carbon/pages/building-blocks/core/components/search/accessibility.md
[c-search-spec]: ../.research/carbon/pages/building-blocks/core/components/search/specifications.md
[c-select-a11y]: ../.research/carbon/pages/building-blocks/core/components/select/accessibility.md
[c-select-spec]: ../.research/carbon/pages/building-blocks/core/components/select/specifications.md
[c-slider-a11y]: ../.research/carbon/pages/building-blocks/core/components/slider/accessibility.md
[c-slider-spec]: ../.research/carbon/pages/building-blocks/core/components/slider/specifications.md
[c-structured-list-a11y]: ../.research/carbon/pages/building-blocks/core/components/structured-list/accessibility.md
[c-structured-list-spec]: ../.research/carbon/pages/building-blocks/core/components/structured-list/specifications.md
[c-tabs-a11y]: ../.research/carbon/pages/building-blocks/core/components/tabs/accessibility.md
[c-tabs-spec]: ../.research/carbon/pages/building-blocks/core/components/tabs/specifications.md
[c-tag-a11y]: ../.research/carbon/pages/building-blocks/core/components/tag/accessibility.md
[c-tag-spec]: ../.research/carbon/pages/building-blocks/core/components/tag/specifications.md
[c-text-input]: ../.research/carbon/pages/building-blocks/core/components/text-input/_index.md
[c-text-input-a11y]: ../.research/carbon/pages/building-blocks/core/components/text-input/accessibility.md
[c-text-input-spec]: ../.research/carbon/pages/building-blocks/core/components/text-input/specifications.md
[c-tile-a11y]: ../.research/carbon/pages/building-blocks/core/components/tile/accessibility.md
[c-tile-spec]: ../.research/carbon/pages/building-blocks/core/components/tile/specifications.md
[c-toggle-a11y]: ../.research/carbon/pages/building-blocks/core/components/toggle/accessibility.md
[c-toggle-spec]: ../.research/carbon/pages/building-blocks/core/components/toggle/specifications.md
[c-toggletip-a11y]: ../.research/carbon/pages/building-blocks/core/components/toggletip/accessibility.md
[c-toggletip-spec]: ../.research/carbon/pages/building-blocks/core/components/toggletip/specifications.md
[c-tooltip-a11y]: ../.research/carbon/pages/building-blocks/core/components/tooltip/accessibility.md
[c-tooltip-spec]: ../.research/carbon/pages/building-blocks/core/components/tooltip/specifications.md
[c-tree-view-a11y]: ../.research/carbon/pages/building-blocks/core/components/tree-view/accessibility.md
[c-tree-view-spec]: ../.research/carbon/pages/building-blocks/core/components/tree-view/specifications.md
[c-ui-shell-header]: ../.research/carbon/pages/building-blocks/core/components/ui-shell-header/_index.md
[c-ui-shell-header-a11y]: ../.research/carbon/pages/building-blocks/core/components/ui-shell-header/accessibility.md
[c-ui-shell-header-spec]: ../.research/carbon/pages/building-blocks/core/components/ui-shell-header/specifications.md
[c-ui-shell-left-panel]: ../.research/carbon/pages/building-blocks/core/components/ui-shell-left-panel/_index.md
[c-ui-shell-left-panel-a11y]: ../.research/carbon/pages/building-blocks/core/components/ui-shell-left-panel/accessibility.md
[c-ui-shell-left-panel-spec]: ../.research/carbon/pages/building-blocks/core/components/ui-shell-left-panel/specifications.md
[c-ui-shell-right-panel]: ../.research/carbon/pages/building-blocks/core/components/ui-shell-right-panel/_index.md
[c-ui-shell-right-panel-a11y]: ../.research/carbon/pages/building-blocks/core/components/ui-shell-right-panel/accessibility.md
[c-ui-shell-right-panel-spec]: ../.research/carbon/pages/building-blocks/core/components/ui-shell-right-panel/specifications.md
[carbon-index]: ../.research/carbon/llms.txt
[carbon-manifest]: ../.research/carbon/manifest.json
[cascade-results]: ../.research/carbon/checks/upstream-cascade-results.json
[cascade-script]: ../.research/carbon/checks/verify-upstream-cascade.py
[e-buy]: ../.research/carbon/pages/building-experiences/buy/_index.md
[e-discover]: ../.research/carbon/pages/building-experiences/discover/_index.md
[e-emails]: ../.research/carbon/pages/articles/create-consistency-across-onboarding-emails/_index.md
[e-end]: ../.research/carbon/pages/building-experiences/end-use/_index.md
[e-expand]: ../.research/carbon/pages/building-experiences/expand/_index.md
[e-first-steps]: ../.research/carbon/pages/tutorials/use-personalization-to-tailor-a-users-first-product-steps/_index.md
[e-help]: ../.research/carbon/pages/building-experiences/get-help/_index.md
[e-help-resources]: ../.research/carbon/pages/articles/design-help-resources-for-seamless-problem-solving/_index.md
[e-intro]: ../.research/carbon/pages/articles/introduction-to-onboarding/_index.md
[e-journey]: ../.research/carbon/pages/articles/craft-a-seamless-onboarding-journey/_index.md
[e-learn]: ../.research/carbon/pages/building-experiences/learn/_index.md
[e-memorable]: ../.research/carbon/pages/articles/create-a-memorable-product-experience/_index.md
[e-onboard]: ../.research/carbon/pages/building-experiences/onboard/_index.md
[e-overview]: ../.research/carbon/pages/building-experiences/overview/_index.md
[e-paid]: ../.research/carbon/pages/articles/design-a-paid-onboarding-experience/_index.md
[e-personalize]: ../.research/carbon/pages/articles/personalize-your-onboarding-experience/_index.md
[e-stages]: ../.research/carbon/pages/articles/onboard-for-every-stage-of-the-users-journey/_index.md
[e-tools]: ../.research/carbon/pages/articles/tools-for-designing-onboarding-experiences/_index.md
[e-trial]: ../.research/carbon/pages/articles/design-a-trial-onboarding-experience/_index.md
[e-try]: ../.research/carbon/pages/building-experiences/try/_index.md
[e-use]: ../.research/carbon/pages/building-experiences/use/_index.md
[e-whats-new]: ../.research/carbon/pages/tutorials/show-whats-new-to-maintain-user-engagement/_index.md
[f-a11y]: ../.research/carbon/pages/building-blocks/foundations/accessibility/_index.md
[f-a11y-dev]: ../.research/carbon/pages/building-blocks/foundations/accessibility/developers.md
[f-ai]: ../.research/carbon/pages/building-blocks/foundations/carbon-for-ai/_index.md
[f-color]: ../.research/carbon/pages/building-blocks/foundations/color/_index.md
[f-color-tokens]: ../.research/carbon/pages/building-blocks/foundations/color/tokens.md
[f-content]: ../.research/carbon/pages/building-blocks/foundations/content/_index.md
[f-grid]: ../.research/carbon/pages/building-blocks/foundations/2x-grid/_index.md
[f-grid-guidelines]: ../.research/carbon/pages/building-blocks/foundations/2x-grid/guidelines.md
[f-icons]: ../.research/carbon/pages/building-blocks/foundations/icons/guidelines.md
[f-motion]: ../.research/carbon/pages/building-blocks/foundations/motion/_index.md
[f-pictograms]: ../.research/carbon/pages/building-blocks/foundations/pictograms/guidelines.md
[f-spacing]: ../.research/carbon/pages/building-blocks/foundations/spacing/_index.md
[f-themes]: ../.research/carbon/pages/building-blocks/foundations/themes/_index.md
[f-type]: ../.research/carbon/pages/building-blocks/foundations/typography/_index.md
[f-type-sets]: ../.research/carbon/pages/building-blocks/foundations/typography/type-sets.md
[g-a11y-status]: ../.research/carbon/pages/building-blocks/core/components/overview/accessibility-status.md
[g-about]: ../.research/carbon/pages/getting-started/about-carbon/_index.md
[g-additional]: ../.research/carbon/pages/getting-started/developing/additional-resources/_index.md
[g-checklist]: ../.research/carbon/pages/getting-started/contributing/component-checklist/_index.md
[g-components]: ../.research/carbon/pages/building-blocks/core/components/overview/_index.md
[g-design-resources]: ../.research/carbon/pages/getting-started/designing/design-resources/_index.md
[g-labs]: ../.research/carbon/pages/getting-started/contributing/carbon-labs/_index.md
[g-lifecycle]: ../.research/carbon/pages/getting-started/contributing/product-development-lifecycle/_index.md
[g-mcp-concepts]: ../.research/carbon/pages/getting-started/carbon-mcp/concepts/_index.md
[g-mcp-prompts]: ../.research/carbon/pages/getting-started/carbon-mcp/prompts/_index.md
[g-mcp-tokens]: ../.research/carbon/pages/getting-started/carbon-mcp/token-conservation/_index.md
[g-migration]: ../.research/carbon/pages/getting-started/migrating/guide/_index.md
[g-migration-design]: ../.research/carbon/pages/getting-started/migrating/guide/design.md
[g-migration-develop]: ../.research/carbon/pages/getting-started/migrating/guide/develop.md
[g-react-data]: ../.research/carbon/pages/getting-started/developing/react-tutorial/step-3.md
[g-react-tutorial]: ../.research/carbon/pages/getting-started/developing/react-tutorial/_index.md
[g-wc-tutorial]: ../.research/carbon/pages/getting-started/developing/web-components-tutorial/_index.md
[license-carbon]: ../.research/carbon/sources/carbon-LICENSE
[license-plex]: ../.research/carbon/sources/plex-LICENSE.txt
[license-rac]: ../.research/carbon/sources/react-aria-components/1.22.1/package/LICENSE
[local-archiver]: ../.research/carbon/archive-local-sources.py
[local-manifest]: ../.research/carbon/sources/local-source-manifest.json
[mcp-builder]: ../.research/carbon/sources/carbon-mcp-git/c8af75506de4/public/skills/carbon-builder/SKILL.md
[mcp-readme]: ../.research/carbon/sources/carbon-mcp-git/c8af75506de4/README.md
[mcp-terms]: ../.research/carbon/sources/carbon-mcp-git/c8af75506de4/TERMS_OF_USE.md
[p-common-actions]: ../.research/carbon/pages/building-blocks/core/patterns/common-actions/_index.md
[p-dialogs]: ../.research/carbon/pages/building-blocks/core/patterns/dialogs/_index.md
[p-disabled]: ../.research/carbon/pages/building-blocks/core/patterns/disabled-states/_index.md
[p-disclosures]: ../.research/carbon/pages/building-blocks/core/patterns/disclosures/_index.md
[p-empty]: ../.research/carbon/pages/building-blocks/core/patterns/empty-states/_index.md
[p-filtering]: ../.research/carbon/pages/building-blocks/core/patterns/filtering/_index.md
[p-fluid]: ../.research/carbon/pages/building-blocks/core/patterns/fluid-styles/_index.md
[p-forms]: ../.research/carbon/pages/building-blocks/core/patterns/forms/_index.md
[p-global-header]: ../.research/carbon/pages/building-blocks/core/patterns/global-header/_index.md
[p-loading]: ../.research/carbon/pages/building-blocks/core/patterns/loading/_index.md
[p-login]: ../.research/carbon/pages/building-blocks/core/patterns/login/_index.md
[p-notifications]: ../.research/carbon/pages/building-blocks/core/patterns/notifications/_index.md
[p-overflow]: ../.research/carbon/pages/building-blocks/core/patterns/overflow-content/_index.md
[p-overview]: ../.research/carbon/pages/building-blocks/core/patterns/overview/_index.md
[p-readonly]: ../.research/carbon/pages/building-blocks/core/patterns/read-only-states/_index.md
[p-search]: ../.research/carbon/pages/building-blocks/core/patterns/search/_index.md
[p-status]: ../.research/carbon/pages/building-blocks/core/patterns/status-indicators/_index.md
[p-text-toolbar]: ../.research/carbon/pages/building-blocks/core/patterns/text-toolbar/_index.md
[package-manifest]: ../.research/carbon/sources/manifest.json
[packet-selection]: ../.research/carbon/review-packets/selection.json
[r-autocomplete]: ../.research/carbon/rac/Autocomplete.md
[r-breadcrumbs]: ../.research/carbon/rac/Breadcrumbs.md
[r-button]: ../.research/carbon/rac/Button.md
[r-calendar]: ../.research/carbon/rac/Calendar.md
[r-checkbox]: ../.research/carbon/rac/Checkbox.md
[r-checkboxgroup]: ../.research/carbon/rac/CheckboxGroup.md
[r-combobox]: ../.research/carbon/rac/ComboBox.md
[r-datefield]: ../.research/carbon/rac/DateField.md
[r-datepicker]: ../.research/carbon/rac/DatePicker.md
[r-daterangepicker]: ../.research/carbon/rac/DateRangePicker.md
[r-disclosure]: ../.research/carbon/rac/Disclosure.md
[r-disclosuregroup]: ../.research/carbon/rac/DisclosureGroup.md
[r-dropzone]: ../.research/carbon/rac/DropZone.md
[r-exports]: ../.research/carbon/sources/react-aria-components/1.22.1/package/dist/types/exports/index.d.ts
[r-filetrigger]: ../.research/carbon/rac/FileTrigger.md
[r-form]: ../.research/carbon/rac/Form.md
[r-forms]: ../.research/carbon/rac/forms.md
[r-gridlist]: ../.research/carbon/rac/GridList.md
[r-link]: ../.research/carbon/rac/Link.md
[r-menu]: ../.research/carbon/rac/Menu.md
[r-modal]: ../.research/carbon/rac/Modal.md
[r-navigationtree-types]: ../.research/carbon/sources/react-aria-components/1.22.1/package/dist/types/src/NavigationTree.d.ts
[r-numberfield]: ../.research/carbon/rac/NumberField.md
[r-popover]: ../.research/carbon/rac/Popover.md
[r-popover-source]: ../.research/carbon/sources/react-aria-components/1.22.1/package/dist/private/Popover.mjs
[r-progressbar]: ../.research/carbon/rac/ProgressBar.md
[r-radiogroup]: ../.research/carbon/rac/RadioGroup.md
[r-searchfield]: ../.research/carbon/rac/SearchField.md
[r-select]: ../.research/carbon/rac/Select.md
[r-select-state]: ../.research/carbon/sources/react-stately/3.51.0/package/dist/types/src/select/useSelectState.d.ts
[r-select-types]: ../.research/carbon/sources/react-aria-components/1.22.1/package/dist/types/src/Select.d.ts
[r-separator]: ../.research/carbon/rac/Separator.md
[r-slider]: ../.research/carbon/rac/Slider.md
[r-slider-state]: ../.research/carbon/sources/react-stately/3.51.0/package/dist/private/slider/useSliderState.mjs
[r-slider-thumb]: ../.research/carbon/sources/react-aria/3.53.1/package/dist/private/slider/useSliderThumb.mjs
[r-styling]: ../.research/carbon/rac/styling.md
[r-switch]: ../.research/carbon/rac/Switch.md
[r-switch-source]: ../.research/carbon/sources/react-aria-components/1.22.1/package/dist/private/Switch.mjs
[r-switch-types]: ../.research/carbon/sources/react-aria-components/1.22.1/package/dist/types/src/Switch.d.ts
[r-table]: ../.research/carbon/rac/Table.md
[r-table-state]: ../.research/carbon/sources/react-stately/3.51.0/package/dist/types/src/table/useTableState.d.ts
[r-tabs]: ../.research/carbon/rac/Tabs.md
[r-tag-hook]: ../.research/carbon/sources/react-aria/3.53.1/package/dist/private/tag/useTagGroup.mjs
[r-taggroup]: ../.research/carbon/rac/TagGroup.md
[r-textfield]: ../.research/carbon/rac/TextField.md
[r-timefield]: ../.research/carbon/rac/TimeField.md
[r-toast]: ../.research/carbon/rac/Toast.md
[r-togglebutton]: ../.research/carbon/rac/ToggleButton.md
[r-tooltip]: ../.research/carbon/rac/Tooltip.md
[r-tree]: ../.research/carbon/rac/Tree.md
[r-tree-hook]: ../.research/carbon/sources/react-aria/3.53.1/package/dist/private/tree/useTree.mjs
[r-usepopover]: ../.research/carbon/sources/react-aria/3.53.1/package/dist/private/overlays/usePopover.mjs
[r-usepress]: ../.research/carbon/sources/react-aria/3.53.1/package/dist/private/interactions/usePress.mjs
[r-usetoggle]: ../.research/carbon/sources/react-aria/3.53.1/package/dist/private/toggle/useToggle.mjs
[rac-manifest]: ../.research/carbon/rac/manifest.json
[reference-tokens]: ../.research/carbon/reference-tokens.json
[research-validation]: ../.research/carbon/checks/research-validation.json
[review-ledger]: ../.research/carbon/review-ledger.json
[s-button]: ../.research/carbon/sources/carbon-styles/1.119.0/package/scss/components/button/_button.scss
[s-button-mixins]: ../.research/carbon/sources/carbon-styles/1.119.0/package/scss/components/button/_mixins.scss
[s-button-radius]: ../.research/carbon/sources/carbon-styles/1.119.0/package/scss/components/button/_radius.scss
[s-button-tokens]: ../.research/carbon/sources/carbon-themes/11.85.0/package/js/generated/component-tokens/button.js
[s-checkbox]: ../.research/carbon/sources/carbon-styles/1.119.0/package/scss/components/checkbox/_checkbox.scss
[s-code-snippet]: ../.research/carbon/sources/carbon-styles/1.119.0/package/scss/components/code-snippet/_code-snippet.scss
[s-contained-list]: ../.research/carbon/sources/carbon-styles/1.119.0/package/scss/components/contained-list/_contained-list.scss
[s-content-switcher]: ../.research/carbon/sources/carbon-styles/1.119.0/package/scss/components/content-switcher/_content-switcher.scss
[s-content-switcher-react]: ../.research/carbon/sources/carbon-git/f8aceaf5583e/packages/react/src/components/ContentSwitcher/ContentSwitcher.tsx
[s-data-table]: ../.research/carbon/sources/carbon-styles/1.119.0/package/scss/components/data-table/_data-table.scss
[s-date-preview]: ../.research/carbon/sources/carbon-git/f8aceaf5583e/packages/react/src/components/DatePicker/next/__stories__/DatePickerV2.mdx
[s-fields-on-layer]: ../.research/carbon/sources/carbon-styles/1.119.0/package/scss/utilities/_update_fields_on_layer.scss
[s-flags]: ../.research/carbon/sources/carbon-git/f8aceaf5583e/packages/feature-flags/index.scss
[s-flatpickr]: ../.research/carbon/sources/carbon-styles/1.119.0/package/scss/components/date-picker/_flatpickr.scss
[s-focus]: ../.research/carbon/sources/carbon-styles/1.119.0/package/scss/utilities/_focus-outline.scss
[s-form]: ../.research/carbon/sources/carbon-styles/1.119.0/package/scss/components/form/_form.scss
[s-inline-loading]: ../.research/carbon/sources/carbon-styles/1.119.0/package/scss/components/inline-loading/_inline-loading.scss
[s-inline-notification]: ../.research/carbon/sources/carbon-styles/1.119.0/package/scss/components/notification/_inline-notification.scss
[s-layer-react]: ../.research/carbon/sources/carbon-git/f8aceaf5583e/packages/react/src/components/Layer/index.tsx
[s-layer-sets]: ../.research/carbon/sources/carbon-styles/1.119.0/package/scss/layer/_layer-sets.scss
[s-layout]: ../.research/carbon/sources/carbon-styles/1.119.0/package/scss/utilities/_layout.scss
[s-motion]: ../.research/carbon/sources/carbon-motion/11.56.0/package/es/index.js
[s-notification-mixins]: ../.research/carbon/sources/carbon-styles/1.119.0/package/scss/components/notification/_mixins.scss
[s-notification-react]: ../.research/carbon/sources/carbon-git/f8aceaf5583e/packages/react/src/components/Notification/Notification.tsx
[s-notification-tokens]: ../.research/carbon/sources/carbon-styles/1.119.0/package/scss/components/notification/_tokens.scss
[s-number-input]: ../.research/carbon/sources/carbon-styles/1.119.0/package/scss/components/number-input/_number-input.scss
[s-pagination]: ../.research/carbon/sources/carbon-styles/1.119.0/package/scss/components/pagination/_pagination.scss
[s-pagination-react]: ../.research/carbon/sources/carbon-git/f8aceaf5583e/packages/react/src/components/Pagination/Pagination.tsx
[s-radio-button]: ../.research/carbon/sources/carbon-styles/1.119.0/package/scss/components/radio-button/_radio-button.scss
[s-select]: ../.research/carbon/sources/carbon-styles/1.119.0/package/scss/components/select/_select.scss
[s-status-tokens]: ../.research/carbon/sources/carbon-styles/1.119.0/package/scss/components/icon-indicator/_tokens.scss
[s-switcher]: ../.research/carbon/sources/carbon-styles/1.119.0/package/scss/components/ui-shell/switcher/_switcher.scss
[s-tag-tokens]: ../.research/carbon/sources/carbon-themes/11.85.0/package/js/generated/component-tokens/tag.js
[s-text-input]: ../.research/carbon/sources/carbon-styles/1.119.0/package/scss/components/text-input/_text-input.scss
[s-text-input-react]: ../.research/carbon/sources/carbon-git/f8aceaf5583e/packages/react/src/components/TextInput/TextInput.tsx
[s-toast-notification]: ../.research/carbon/sources/carbon-styles/1.119.0/package/scss/components/notification/_toast-notification.scss
[s-toggle]: ../.research/carbon/sources/carbon-styles/1.119.0/package/scss/components/toggle/_toggle.scss
[s-toggle-react]: ../.research/carbon/sources/carbon-git/f8aceaf5583e/packages/react/src/components/Toggle/Toggle.tsx
[s-token-formatter]: ../.research/carbon/sources/carbon-themes/11.85.0/package/style-dictionary/formats/js.js
[s-token-readme]: ../.research/carbon/sources/carbon-themes/11.85.0/package/tokens/README.md
[s-treeview]: ../.research/carbon/sources/carbon-styles/1.119.0/package/scss/components/treeview/_treeview.scss
[s-type]: ../.research/carbon/sources/carbon-type/11.71.0/package/scss/_styles.scss
[s-type-js]: ../.research/carbon/sources/carbon-type/11.71.0/package/es/index.js
[s-v12]: ../.research/carbon/sources/carbon-git/f8aceaf5583e/docs/migration/v12.md
[site-archiver]: ../.research/carbon/archive.py
[support-contact]: ../.research/carbon/pages/support/contact-us/_index.md
[support-coo]: ../.research/carbon/pages/support/certificate-of-originality/_index.md
[support-faq]: ../.research/carbon/pages/support/faqs/_index.md
[token-exporter]: ../.research/carbon/export-reference-tokens.py
[v-anatomy]: ../.research/carbon/pages/building-blocks/data-visualization/chart-anatomy/_index.md
[v-axes]: ../.research/carbon/pages/building-blocks/data-visualization/axes-and-labels/_index.md
[v-colors]: ../.research/carbon/pages/building-blocks/data-visualization/color-palettes/_index.md
[v-dashboards]: ../.research/carbon/pages/building-blocks/data-visualization/dashboards/_index.md
[v-flow]: ../.research/carbon/pages/building-blocks/data-visualization/flow-charts/_index.md
[v-gantt]: ../.research/carbon/pages/building-blocks/data-visualization/gantt-charts/_index.md
[v-legends]: ../.research/carbon/pages/building-blocks/data-visualization/legends/_index.md
[v-overview]: ../.research/carbon/pages/building-blocks/data-visualization/overview/_index.md
[v-simple]: ../.research/carbon/pages/building-blocks/data-visualization/simple-charts/_index.md
[v-spatial]: ../.research/carbon/pages/building-blocks/data-visualization/spatial-charts/_index.md

<!-- prettier-ignore-end -->

<!-- END GENERATED SOURCE REFERENCES -->
