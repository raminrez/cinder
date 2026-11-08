# Cinder component-library implementation plan

**8 November 2026 · approved code-first sequence.** Frame foundations and Phase 2's
Storybook/actions and field/form batches are complete at their recorded verification scope.
The field-status extension has passed its code, retained visual, and exact README
consumer gates. Checkbox, Radio, and Switch have passed code, Storybook, and installed
gates; their rendered acceptance is being closed before Select and overlay/task work.
Complete the remaining components and their **Storybook** stories, extend them
through the catalog, then develop the **documentation website**. **Figma is the
final step**, derived from the implemented library and documentation.

Visual authority: [DESIGN.md](../DESIGN.md). Behavior, inclusion, and customization
requirements: [design-system.md](design-system.md). Current package scope:
[coverage.md](coverage.md). [Phase 1 evidence](verification.md#frame-phase-1) records
the completed foundation scope; [first-batch evidence](verification.md#frame-actions--phase-2-first-batch)
records Storybook, Button, and Link; [second-batch evidence](verification.md#frame-fields--phase-2-second-batch)
records shared field composition and bounded field/form recovery. The
[field-status extension](verification.md#frame-field-status--phase-2-extension)
records appearance-only feedback, inline icons, and label help; the
[choice batch](verification.md#frame-choices--phase-2-third-batch) records native
choices, labeled targets, and group recovery. The phases below
complete the component library.

## Outcome and sequence

The result is a reusable React Aria-based Cinder library with Frame light/dark
themes, dependable defaults, documented root/part/state styling, coherent locale
and portal behavior, working examples, and evidence from installed packages.

**Current state:** Phases 0 and 1 are complete. Phase 2's Storybook/actions first
batch and bounded field/form second batch passed acceptance. Its field-status
extension adds eight stories to the preserved 54-story workbench and has passed
bounded acceptance. Choice controls add 18 stories, bringing the workbench to 80;
their code and installed gates passed, with rendered acceptance being closed.
Select and overlay/task compositions follow. The full fourteen-entry phase remains
in progress. Delivery order:
**components + Storybook (2–5) → documentation website and release proof (6) →
Figma (7)**. Component README/API contracts and evidence accompany each batch.

| Phase | Deliverable                             | Depends on                     | Completion condition                                                                                                              |
| ----- | --------------------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| 0     | Selected direction and written system   | Completed prototype comparison | DESIGN.md, system specification, evidence boundaries, and this plan agree                                                         |
| 1     | Foundation and public styling contracts | 0                              | Frame theme/size proposal resolved; tokens, scope, parts, locale, and representative consumer proof agree                         |
| 2     | First complete Frame slice + Storybook  | 1                              | Fourteen entries have working stories; settings and nested-dialog tasks use packaged components with verified states and behavior |
| 3     | Selection and navigation + stories      | 2                              | Eleven additional catalog entries and their stories meet the same contract                                                        |
| 4     | Data and structure + stories            | 2; relevant choices from 3     | Nine additional entries and their stories preserve data, selection, responsive, and focus semantics                               |
| 5     | Dates, files, and feedback + stories    | 2; shared contracts from 3–4   | Eleven additional entries and their stories have specialized value, locale, and lifecycle evidence                                |
| 6     | Documentation website and release proof | 2–5                            | Website, coverage, supported integrations, package installation, and migration guidance agree with the verified components        |
| 7     | Final Figma handoff                     | 6                              | Design assets match the settled token, anatomy, state, and package versions                                                       |

The phases are dependency order, not calendar estimates. A phase may contain
several small changes, each with its own meaningful proof. No family becomes
verified simply because its colors inherit from the new theme.

## Working boundaries

- Reuse `@cinder/react`, `@cinder/tokens`, the Bun workspace, existing React Aria
  primitives, current catalog, and independent package verification.
- Keep the four Carbon themes and Relay available with their existing defaults.
  Frame is additive before any separately planned default-theme migration.
- Keep business data, request state, authorization, routing, and persistence in
  consuming applications. Prototype review models remain examples.
- Extend fitting helpers and meaningful parts. Avoid a second theme provider,
  styling-engine adapters, or a universal component configuration language.
- Keep source and license attribution. Follow actual pinned upstream APIs and
  verify generic types, controlled values, refs, and collections at their boundaries.

## Phase 0 — Direction and specification

**Deliverables:** [PRODUCT.md](../PRODUCT.md), [DESIGN.md](../DESIGN.md),
[Impeccable sidecar](../.impeccable/design.json), [system specification](design-system.md),
and the [prototype verification record](prototypes-guide.md#verification).

Frame is selected. The user approved the Phase 1 contract bundle on
6 November 2026: native prebuilt CSS, additive Frame themes, the 44px ordinary
default, and portable appearance through Theme. Keep the prototype as a dated
visual and behavioral reference; its task-specific CSS is not the package contract.

## Phase 1 — Foundations, scope, and customization contracts

### 1.1 Resolve the small set of public choices

**Complete, 6 November 2026.** Decisions, implementation, and representative
installed-consumer proof agree; see [verification](verification.md#frame-phase-1).

| Choice              | Approved contract                                                                                     | Required proof                                                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Styling             | Native prebuilt CSS + semantic variables + stable BEM-style hooks + RAC states                        | One stylesheet import and no consumer compiler requirement                                                                   |
| Theme names         | Add `frame-light` and `frame-dark` to the existing typed theme model                                  | Additive exports and `isThemeName` coverage; keep existing six names                                                         |
| Default size        | Frame ordinary controls use 44px when size is omitted; explicit `sm/md/lg` map to 32/44/48px          | Distinguish omitted from explicit size; preserve all older-theme defaults and explicit large Button sizes                    |
| Custom theme recipe | `Theme appearanceClassName`, repeated on its four portal-root families                                | Omitted inherits, string replaces, empty string clears; two-brand nested overlays; ordinary root props remain local          |
| Meaningful parts    | Extend existing RAC composition and Cinder hooks                                                      | Add an exported part only for independently rendered/styled/referenced anatomy; verify upstream type and collection behavior |
| CSS order           | One documented top-level `cinder` layer with internal token/reset/component/theme/accessibility order | Prove normal overrides, preflight, nested scopes, and forced-color precedence before changing the distributed cascade        |

Theme-specific defaults belong to the appearance owner. Button retains its
resolved `data-size="lg"` for compatibility and privately distinguishes omission;
fields retain their existing `md` default. The Frame recipe resolves the public
geometry without conditional sizing in application examples.

### 1.2 Author and generate Frame foundations

Owners: `packages/tokens/src/frame.ts`, `packages/tokens/scripts/generate.ts`, and
`packages/tokens/src/index.ts`.

1. Map measured Frame roles onto existing semantic names. Add a paired status
   surface or geometry role only where the current vocabulary cannot express it.
2. Define complete defaults for the first slice: rest/hover/pressed/disabled,
   selected/focused, invalid/focused, contextual surfaces, font roles, corners,
   scalable minimum sizes, and focus. Record any inherited baseline roles that
   belong to later families.
3. Generate CSS and JSON through the existing generator. Update typed names and
   token-key inference to include each authored theme's semantic keys.
4. Preserve structured Carbon typography exports. Frame's working scale must not
   accidentally replace the baseline's public type definitions or imply that a
   scalar variable implements responsive interpolation.
5. Publish the exact mapping and examples alongside generated values. Reconcile
   DESIGN.md and its sidecar against the authored source after promotion.

**Proof:** generator determinism, key completeness, all CSS variable references,
selected semantic values/contrast pairs, layer saturation, and no changed values
in the existing six themes. Compare the actual computed Frame type and geometry
with the selected specimens.

### 1.3 Establish scope and portal ownership

Owners: `packages/react/src/theme.tsx`, `overlays.tsx`, `styles.css`, theme CSS,
and the token generator's declaration/alias placement.

1. Carry the effective language through Theme context and `useOverlayTheme`,
   alongside theme/layer/direction. Resolve inherited locale and explicit language
   consistently at ordinary and detached roots.
2. Add the agreed portable appearance recipe without copying unrelated layout,
   IDs, event props, or arbitrary computed styles. Let theme changes update open
   overlays rather than freezing a snapshot at open time.
3. Maintain nested Theme boundaries, including a Carbon subtree inside Frame and
   a Frame subtree inside another theme. Keep Layer's contextual aliases intact.
4. Consolidate cascade order as one explicit compatibility change. Keep component
   selectors contained; avoid generic host-element and `data-size` leakage.
5. Record the browser requirement for native nesting, layers, and `@scope`. Verify
   the intended support matrix before advertising it.

**Proof:** light/dark; two differently branded siblings; nested Theme/Layer;
dialog → Select popover; theme and locale changes while open; language and direction
on all detached roots; custom font/token behavior; focus/dismissal/scrolling; and
an unrelated neighboring RAC control that keeps its own styles.

### 1.4 Stabilize the first slice's root/part/state surface

Owners: `utils.ts`'s existing class composition, `fields.tsx`, `selection.tsx`,
`overlays.tsx`, and `index.ts`; affected caller and type fixtures.

1. Inventory the actual element/ref/class/style targets and `children` semantics
   before changing shared helpers. Enumerate every `FieldLabel` / `FieldHelp`
   caller, including dates and grouped selection.
2. Keep useful `cinder-*` hooks. Add stable namespaced field/label/control/help/error
   hooks where absent, retaining existing hooks as compatibility aliases.
3. For direct RAC parts used by the slice, either preserve the documented raw
   contract or wrap them with exact upstream types and tested class merging.
   Verify render functions, refs, and collection registration before promoting a
   wrapped part. Do not silently promise merging for all raw re-exports.
4. Preserve TextField/TextArea's wrapper ref and `inputRef`, SearchField's existing
   `inputProps`, and Select's option-children contract. Add independent part access
   only for a demonstrated use case; keep default composition concise.
5. Resolve Modal's split class/ref versus style targets through additive, named
   part access: `overlayClassName` and `overlayRef` for the backdrop, `modalStyle`
   for the inner surface. Existing class/ref remain inner; style/render remain outer.
6. Document which part owns each actual state attribute. Keep appearance hooks
   distinct from RAC relationship slots and behavior-owned geometry.

**Proof:** a default and custom-composed field; root and inner-part classes/styles;
refs to both root and control; controlled/uncontrolled values; rich Select options;
collection generics; and old examples that still typecheck and behave correctly.

### Phase 1 exit

A small packed-consumer fixture demonstrates Button, TextField, and a Select
inside a dialog using the new foundations. Plain CSS and CSS Modules have working
root/part/state/portal examples. A pinned Tailwind fixture proves its actual
preflight and layer integration before Tailwind support is advertised. This is
the point to settle contract problems, before repeating them across the catalog.

**Exit passed.** Native CSS, compiled CSS Modules, and pinned Tailwind 4.3.5
consumers pass strict types, production builds, and browser contracts. The final
rendered review covers both themes at 1440/768/390/320px, validation recovery,
nested overlays, keyboard/focus, RTL, and reviewed axe results.

## Phase 2 — First complete Frame slice

**Catalog entries (14):** `button`, `link`, `text-input`, `text-area`, `number-input`,
`search`, `checkbox`, `radio-button`, `toggle`, `dropdown`, `form`, `modal`,
`popover`, `tooltip`. Theme, Layer, Icon, ListBox/options, and field/overlay parts
are supporting primitives, not extra catalog entries.

### First batch — Storybook and actions

**Acceptance passed, 7 November 2026.** The private workbench and 21 Button/Link
stories pass all 42 theme gates; native input, retained rendered review, the full
workspace aggregate, and installed-package/README consumers pass. See the
[bounded acceptance evidence](verification.md#frame-actions--phase-2-first-batch).
This completes only the first batch, not the fourteen-entry phase or later
documentation website and Figma work.

Create a private `apps/storybook` workspace using Storybook's standard React setup,
with development and static-build commands. Stories consume the public
`@cinder/react` exports, import `@cinder/react/styles.css` once, and use the existing
`Theme` for Frame light/dark previews. Storybook dependencies stay in the development
workspace. Package exports target `dist`, so the workflow must rebuild the package
output before starting or building Storybook and show component edits reliably.

Complete **Button and Link** in their existing package owners, with the action
states in item 1 below. This batch is done when their stories typecheck and build,
keyboard/pointer/focus and pending behavior have focused evidence, and the public
API contracts agree. Then move directly to shared field anatomy and form recovery.
The full phase still requires all fourteen entries.

### Second batch — Shared fields and form recovery

**Bounded acceptance passed, 7 November 2026.** TextField, TextArea, NumberField,
SearchField, and Form recipes add **33 stories** to the preserved 21 action stories.
All **108 story/theme cases** pass in the final **280-test browser suite**. Strict
types, the complete workspace check, both installed consumers, exact README
installation, **74 reviewed captures**, and **28 native-input observations** agree;
see the [second-batch evidence](verification.md#frame-fields--phase-2-second-batch).

Twelve callable field namespaces expose RAC-compatible roots and independently
composable parts without a Cinder Form engine. Existing convenience calls, raw RAC
exports, refs, classes, slots, collections, eight themes, and seven Button variants
remain compatible. Frame defaults now keep label → persistent guidance → control →
recovery; Carbon/Relay and custom-child contracts retain their prior ownership.

Form examples preserve drafts through native submission, retain focus while pending,
guard duplicate requests in application code, and demonstrate local failure/retry
and returned field errors. Their documented 58px/78px recovery minimums stabilize
the expected copy; longer errors grow rather than clip. Native copying includes
actual clipboard readback, not fabricated selection or value state.

The shared API reaches CheckboxGroup, RadioGroup, Select, ComboBox, and date/time
fields, with contract and installed smoke evidence only. It does not complete their
later-family Frame stories or acceptance. Choice/toggle, settings and nested-overlay
tasks, required manual assistive-technology/device/IME/zoom work, the documentation
website, and Figma remain outside this completed batch.

### Field status extension — Status, icons, and label help

**Bounded acceptance passed, 8 November 2026.**
Twelve field namespaces accept appearance-only warning/error/success status,
localized required/optional wording, and independently operable label help. Actual
RAC/native/server validation remains authoritative and suppresses presentation
status. Default and compound anatomy preserve mounted description associations,
drafts, native controls, refs, and the existing eight themes.

Frame feedback attaches beneath bordered controls; CheckboxGroup and RadioGroup
feedback remains detached at group level. Label help uses a Tooltip and a named
dialog Popover, not a field action. The workbench now has **62 stories** and
**132 passing story/theme/motion cases**. The frozen aggregate passes **41
unit/watcher tests and 341 browser tests**, including both installed consumers.
All **52 retained captures / 16 scenes** have a separate visual disposition;
historical raw evidence is unchanged. All **13 accepted README checks** pass against
the matching archives, including the three installation workflows and both verbatim
status examples. This extension is closed before choice implementation proceeds.

This shared extension does not complete Checkbox/Radio/Switch, selection/date
families, overlay task stories, or manual assistive-technology/device/zoom work.
See the [public status contract](../packages/react/README.md#field-status-necessity-and-label-help)
and [bounded evidence](verification.md#frame-field-status--phase-2-extension).

### Third batch — Checkbox, Radio, and Switch

**Code, Storybook, and installed-package gates passed, 8 November 2026; rendered
acceptance is being closed.** Six stories per family cover native values, actual
keyboard/label input, controlled/default state, refs/render callbacks, long labels,
and real Persian/Arabic/German locale scopes. Checkbox mixed/select-all state is
derived from member selections. CheckboxGroup uses `FormData.getAll()`; RadioGroup
submits one value. Checked read-only choices stay immutable and submitted; disabled
choices are omitted. Switch supports selected/read-only/disabled and sm/md, not
required/invalid/validation/mixed state.

Existing CSS owners implement Frame's 44px ordinary label minimum, blue selection,
18px Checkbox marks with 5px corners, and neutral/blue group marks during detached
error recovery. Standalone invalid Checkbox stays red during hover, disabled paint
wins, and compact table selection keeps its 16px mark and 18px target. Shared
wrapping, read-only cursors, disabled-mixed paint, and forced colors apply across
themes; normal Frame paint/geometry stays scoped. `selection.tsx` is unchanged.

The static workbench has **80 stories / 178 indexed cases**. Focused final execution
passes **32 source cases / 113 filtered** and **46 choice story/theme/motion cases /
132 filtered**, with no failures; preserved full-status acceptance is reused, not
rerun. Both installed consumers pass. The final renderer retains **62 PNGs**;
visual and axe-incomplete dispositions accompany the
[dated choice evidence](verification.md#frame-choices--phase-2-third-batch).
This batch does not complete Select/overlays, settings/nested-edit tasks, manual
AT/device/IME/zoom work, the documentation website, or Figma.

### Implementation order

1. **Actions:** present four core Button choices: `primary`, `secondary`, `ghost`,
   and `danger`, retaining Frame's palette and corners. Keep the three existing
   additional variants compatible. Cover icon-only, disabled,
   pending, true hover/press/focus, and explicit sizes. Keep action names stable and
   localize pending feedback. Preserve Link semantics.
2. **Field anatomy:** make label → guidance → control → recovery the Frame default
   reading sequence. Preserve all shared helper callers and other-theme contracts.
   Keep helper/error associations, required state, input refs, and custom composition.
3. **Text, number, search:** full border/focus/error/read-only/disabled treatment;
   controls that grow; native form data; numeric bounds/formatting; clear behavior;
   clipboard, autofill, and IME-compatible editing. Treat embedded button targets
   deliberately rather than counting the group boundary as their hit target.
4. **Choice:** selected/mixed/invalid/read-only/disabled combinations where supported,
   labeled targets, keyboard behavior, and the correct group-level error treatment.
5. **Select and overlays:** rich/long/disabled options, trigger/value/popup targets,
   menu focus/selection distinction, named dialog, scroll/reflow, inner-first Escape,
   focus restoration, and portal appearance/language.
6. **Composition stories:** implement settings and nested editing in Storybook using
   public package imports. Replace prototype-only required/error presentation with the shared
   anatomy. Use a checkbox for a deferred-save preference, or clearly document
   draft behavior. Use focus-retaining pending submission and preserve draft recovery.

Owners: existing `packages/react/src/{buttons,fields,selection,overlays,theme}.tsx`,
the component styles and exports, and `apps/storybook`. Keep
prototype-specific review logic out of the package. Remove duplicate styling from
an example only after the replacement is verified and all its uses are accounted for.

### Required slice evidence

- A valid submission, first-invalid focus, simultaneous errors with helper text
  retained, corrected submission, pending repeat prevention, failed save and retry.
- Stable Save placement for the documented error budget, with longer errors allowed
  to grow. Read-only text stays copyable and cannot be edited.
- Real pointer and keyboard states, choice dependencies, native form values, and
  controlled/uncontrolled examples. No fake state attributes as behavioral proof.
- Dialog → Select: keyboard traversal, disabled option skip, Escape order, dismissal,
  focus return, page scrolling, theme/locale change while open, and custom recipe.
- Light/dark at 1440, 768, 390, and 320px for representative compositions; additional
  checks at their actual breakpoint boundaries. Inspect screenshots, not only bounds.
- 200% text resizing, 400% zoom/reflow, text spacing, long text, a real RTL provider,
  mixed-direction values, one expanding Latin locale, and a real IME pass.
- Forced colors, reduced motion, touch-sized targets, axe with incomplete results
  reviewed, and manual keyboard plus screen-reader tasks.
- Strict types, Storybook static build, package production build, packed installation,
  and unchanged baseline-theme journeys. Every completed family gets typed stories,
  anatomy/state/customization examples, and accompanying README/API contracts.

**Stop condition:** the settings and nested-dialog compositions are complete and
usable in Storybook and from an installed package, with stories and documented
scope for all fourteen entries.
Remaining families retain their honest baseline status until their own phase.

## Phase 3 — Selection and navigation

**Catalog entries (11):** `select`, `combo-box`, `multi-select`, `slider`,
`content-switcher`, `tabs`, `accordion`, `menu`, `overflow-menu`, `breadcrumb`, `tag`.

Work in the existing selection, collection, content, and export owners:

- NativeSelect keeps native value/event/ref semantics and resolves its split part
  targets explicitly. It remains distinct from the RAC Select used by `dropdown`.
- ComboBox and multiple selection preserve input text versus selected-key ownership,
  filtering/custom-value policy, tokens/removal, long options, and empty results.
- Slider preserves formatted output, thumb naming, bounds, range order, pointer
  cancellation, and a task-appropriate precise-entry alternative.
- Tabs, switcher, accordion, and menus retain their actual keyboard models, disabled
  skipping, headings, and panel/collection relationships. Test nested menus and
  the applicable activation modes rather than assuming shared styling proves them.
- Tags distinguish static status, removable items, and selection. Breadcrumbs
  retain current-page and destination semantics through overflow decisions.

**Exit:** each family has real-state, composition, type/ref, localization, and
customization evidence; expanded menus and collections work inside a Frame dialog.

## Phase 4 — Data and structure

**Catalog entries (9):** `data-table`, `pagination`, `contained-list`, `tree-view`,
`structured-list`, `list`, `tile`, `ui-shell`, `code-snippet`.

- Complete the existing review-workspace recipe with query/filter/sort ownership,
  page-scoped selection, bulk actions, pagination, empty/loading/failure recovery,
  and preserved edits. Package only repeated generic parts with the same intent.
- Specify table versus grid/treegrid semantics, stable keys, row/cell action focus,
  selection/current/focus distinctions, and how sorting changes are communicated.
- Prove the responsive table/list transformation preserves critical values and
  actions. Large/virtualized data, resizing, drag/drop, expansion, and sticky
  columns need separate evidence before being listed as supported features.
- Verify pagination normalization and accessible counts for real locale rules.
- Preserve semantic HTML for lists and term/value data. A static Tile remains
  static unless a specific interactive variant has its own behavior contract.
- Complete shell landmarks, skip path, current location, responsive navigation,
  opening/closing focus, and keyboard access as a recipe built from existing parts.
- Code remains selectable and scrollable; copy announces both success and denial,
  uses exact source bytes, and exposes localizable strings.

**Exit:** the working review task and representative data structures are accessible
under the declared keyboard model, responsive, themeable, and demonstrated from
public imports. No unverified advanced table feature inherits maturity by association.

## Phase 5 — Dates, files, and feedback

**Catalog entries (11):** `date-picker`, `date-range-picker`, `time-picker`,
`file-uploader`, `notification`, `toast`, `progress-bar`, `progress-indicator`,
`loading`, `inline-loading`, `skeleton`.

- Dates: typed values and locale-aware segments; min/max and unavailable values;
  range boundaries; calendar/time-zone policy; keyboard and nested-popover focus;
  genuine non-default locale/calendar evidence for each support claim.
- Files: chooser and keyboard-accessible drop path, extension/MIME/size errors,
  mixed-batch acceptance, removal, localizable errors, and preservation of accepted
  items. Network transfer stays application-owned unless separately scoped.
- Feedback: passive versus urgent announcements, persistent actionable failures,
  queue/timing/dismissal behavior, meaningful progress, and reduced motion. Preserve
  the experimental label around RAC's unstable Toast APIs until that dependency
  and its behavior are deliberately stabilized.
- Progress steps describe current/completed/invalid status without becoming a
  second workflow engine. Skeletons preserve expected layout and remain decorative
  to assistive technology.

**Exit:** specialized value/lifecycle behavior is verified, and feedback remains
usable with screen readers, zoom, long translations, and motion reduction.

## Phase 6 — Documentation, integration, and release proof

1. Reconcile all **45 existing entries** against the phases above. Track actual
   Frame scope per family, including any deliberately experimental or incomplete
   variant. Extra primitives and generated AI tokens are not additional complete
   component families.
2. Build the documentation website in the existing `apps/docs` from the verified
   components and Storybook examples. Include canonical examples, anatomy/ref/part
   tables, state matrices, keyboard guidance, localization strings, theme/portal
   recipes, and migration notes that agree with the exported package.
3. Add the Frame reference experience to production routing and build/preview
   coverage, reusing the finished components and established examples.
   `/prototypes` remains a development-only comparison.
4. Run the normal aggregate checks and external tarball consumer. Validate plain
   CSS, CSS Modules, and the pinned Tailwind recipe actually supported by this
   release. Test other styling integrations before advertising them. Add SSR and
   hydration proof before an SSR support claim.
5. Complete the declared Chromium/Firefox/WebKit and assistive-technology matrix,
   physical touch-device and IME checks, and representative task evaluation.
   Record versions, dated results, and concrete remaining limits.
6. Compare package/CSS size, startup, and interaction costs against the baseline.
   Investigate material regressions; avoid adding an engine or runtime service to
   solve a problem the existing CSS and component architecture already owns.
7. Publish migration notes for any default, token, selector, ref, or cascade change.
   Rehearse reverting package and stylesheet together; keep compatible older
   themes and attribution available. Publishing/deployment remains a separate
   authorized release action.

**Exit:** code, documentation, coverage, distribution, and the declared support
matrix agree. This completes the web-system work before design-tool handoff.

## Phase 7 — Figma, last

Derive editable variables, component anatomy/states, and a small set of composition
examples from the settled authored tokens and public library. Link every asset to
the corresponding package/documentation version and check visual parity. Figma
reflects the completed system; design decisions and verification continue to be
owned by the code and documentation.

## Verification commands and ownership

Use the smallest relevant check while developing; run the full release gate at
slice/release boundaries or when a shared contract changes broadly.

```sh
bun run build:tokens
bun run typecheck
bun test tests/unit
bun test --timeout 60000 tests/browser/contracts.test.ts
bun run build
bun scripts/pack.ts
bun run test:package
```

Add focused Frame browser tests beside `tests/browser/relay.test.ts`, with meaningful
behavior assertions and screenshot inspection. The full existing gate is
`bun run check`; prototype data checks are separately available through
`bun test apps/docs/src/prototypes/data.test.ts`.

Each change identifies affected callers, exported types, tokens/styles, docs,
fixtures, and consumers before editing. Shared-ownership changes must preserve
surrounding validation and error handling. Update [coverage](coverage.md) only
with the specific completed scope and evidence.

Use parallel, narrowly scoped subagents with Caveman/Ponytail guidance. Assign
shared component/anatomy ownership explicitly; integrate and verify their work
before advancing the batch.

## Next implementation unit

Close choice rendered acceptance, then continue **Phase 2: Select, Modal/Dialog,
Popover, Tooltip, and settings/nested editing**. Reuse existing RAC value, focus,
dismissal, and portal behavior. Complete rich/long/disabled options, meaningful
part targets, focus versus selection, named dialogs, reflow/scrolling, inner-first
Escape, focus return, and live appearance/locale. Select must not gain a fake
read-only API; application request and summary state stays outside the package.
Finish the fourteen-entry slice and its stories before broadening the catalog.
