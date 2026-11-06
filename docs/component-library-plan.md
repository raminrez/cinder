# Cinder component-library implementation plan

**6 November 2026 · approved code-first sequence.** Build the selected Frame
direction into the existing code-based system, prove a small complete slice, then
extend the same contracts through the catalog. **Figma is the final step**, derived
from the implemented library and documentation.

Visual authority: [DESIGN.md](../DESIGN.md). Behavior, inclusion, and customization
requirements: [design-system.md](design-system.md). Current package scope:
[coverage.md](coverage.md). This plan describes work to perform; checked prototype
behavior does not mean the reusable Frame implementation is complete.

## Outcome and sequence

The result is a reusable React Aria-based Cinder library with Frame light/dark
themes, dependable defaults, documented root/part/state styling, coherent locale
and portal behavior, working examples, and evidence from installed packages.

| Phase | Deliverable                                   | Depends on                     | Completion condition                                                                                                          |
| ----- | --------------------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| 0     | Selected direction and written system         | Completed prototype comparison | DESIGN.md, system specification, evidence boundaries, and this plan agree                                                     |
| 1     | Foundation and public styling contracts       | 0                              | Frame theme/size proposal resolved; tokens, scope, parts, locale, and representative consumer proof agree                     |
| 2     | First complete Frame slice                    | 1                              | Settings and nested-dialog tasks use packaged components with documented states and verified behavior                         |
| 3     | Selection and navigation expansion            | 2                              | Eleven additional catalog entries meet the same contract                                                                      |
| 4     | Data and structure expansion                  | 2; relevant choices from 3     | Nine additional entries preserve data, selection, responsive, and focus semantics                                             |
| 5     | Dates, files, and feedback expansion          | 2; shared contracts from 3–4   | Eleven additional entries have their specialized value, locale, and lifecycle evidence                                        |
| 6     | Whole-library documentation and release proof | 2–5                            | Coverage is reconciled, supported integrations are demonstrated, packages install cleanly, and migration guidance is complete |
| 7     | Final Figma handoff                           | 6                              | Design assets match the settled token, anatomy, state, and package versions                                                   |

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

**Decisions resolved; implementation and consumer proof in progress.**

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

Owners: `packages/tokens/src/relay.ts` as the existing pattern, a corresponding
Frame value source, `packages/tokens/scripts/generate.ts`, and
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

## Phase 2 — First complete Frame slice

**Catalog entries (14):** `button`, `link`, `text-input`, `text-area`, `number-input`,
`search`, `checkbox`, `radio-button`, `toggle`, `dropdown`, `form`, `modal`,
`popover`, `tooltip`. Theme, Layer, Icon, ListBox/options, and field/overlay parts
are supporting primitives, not extra catalog entries.

### Implementation order

1. **Actions:** carry the existing seven Button variants through Frame, including
   icon-only, disabled, pending, true hover/press/focus, and explicit sizes. Keep
   action names stable and localize pending feedback. Preserve Link semantics.
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
6. **Canonical examples:** implement settings and nested editing using public package
   imports. Replace prototype-only required/error presentation with the shared
   anatomy. Use a checkbox for a deferred-save preference, or clearly document
   draft behavior. Use focus-retaining pending submission and preserve draft recovery.

Owners: existing `packages/react/src/{buttons,fields,selection,overlays,theme}.tsx`,
the component styles and exports, and the current docs/example structure. Keep
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
- Strict types, production build, packed installation, and unchanged baseline-theme
  journeys. Every completed family gets its anatomy/state/customization page.

**Stop condition:** the settings and nested-dialog compositions are complete and
usable from an installed package, with the fourteen entries' scope documented.
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
2. Make the canonical examples, anatomy/ref/part tables, state matrices, keyboard
   guidance, localization strings, theme/portal recipes, and migration notes agree
   with the actual exported package. Use the current docs site and source examples.
3. Promote the intended Frame gallery into production routing and build/preview
   coverage; `/prototypes` currently remains a development-only comparison.
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

## Next implementation unit

Start with **phase 1's Frame foundation and portal contract**, using Button,
TextField, and nested Select/Dialog as the bounded proof. Resolve the styling,
size-default, and portable appearance-hook decisions there. Then finish the
fourteen-entry slice before broadening the catalog.
