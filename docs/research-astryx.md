# Astryx — fields, themes, APIs, and inclusion findings for Cinder

**Research date: 6 November 2026.** Research for the fourth original comparison
prototype, using Cinder's existing React Aria Components (RAC) foundation.
**Astryx snapshot:** `ec84130f57b3c3c3f51a82ef5103d7d3eb357647`.
**Cinder baseline:** `8481028917e43d78615a3fa7784a97b5379029e2`, the implemented
[Relay 0.1.0 contract](relay.md#api-and-customization).

## Finding in brief

**Borrow Astryx's explicit anatomy, behavior contracts, and evidence discipline;
keep RAC as Cinder's interaction owner and make customization easier to predict.**
Astryx is the leading visual reference, with HeroUI v3 also informing the direction. Carbon chiefly informs UX
reasoning, accessibility, layout, component coverage, and AI content/components.

Astryx documents component ownership, consumer-input targets, and evidence limits.
Important exceptions include field-specific styling rules, component-specific
cancellation, partial translations, and recorded accessibility debt.
[API contract][api], [field parts][parts], [Selector handlers][selector-api], [known debt][selector-debt].

## 1. Scope and source authority

| Evidence                                   | Treatment in this report                                                               |
| ------------------------------------------ | -------------------------------------------------------------------------------------- |
| Consumer `.doc.mjs` and shipped CLI guides | Builder-facing promises and examples; not proof that every path implements them        |
| Current architecture/component contracts   | Intended ownership and invariants; recorded gaps remain gaps                           |
| TypeScript/JavaScript implementation       | Source-observed behavior at the pinned snapshot                                        |
| Test bodies and bindings                   | Assertions present in the repository; no upstream test execution claimed               |
| Catalog inventory                          | Read-only JSON/key-set calculation; not a translation-quality review                   |
| Cinder source and verification document    | Current Relay comparison; previously recorded results distinguished from this research |

Coverage: Button, Field/TextInput, Selector, Dialog, NumberInput, DateInput,
shared interactions, localization, theme/color resolution, and relevant CLI
docs/customization paths. Local core declares **0.7.10**; the public Field docs
displayed **0.7.9** during the visual capture. These are separate evidence surfaces.
[Core manifest][core-package], [capture provenance](../apps/docs/src/prototypes/references/README.md).
Astryx itself states that consumer docs explain the exported contract rather than
create it, and that narrower component/family contracts own local behavior. [API][api-model]

## 2. Component APIs and developer experience

### Predictability is the useful design-system feature

The current API contract requires deliberate event composition, React 19 refs,
preserved supported DOM/ARIA inputs, and complete styling triplets for named parts.
It admits family exceptions and protects released behavior during migration. [API][api]
Use this checklist to clarify Cinder's established RAC props.

| Representative component | Source-observed contract                                                                                                                                                                                 | Useful Cinder lesson                                                                              |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Button                   | Required string `label`; `children` can replace visible text; `href`/`as` select link rendering; `clickAction` adds pending behavior. [Types][button-api]                                                | State clearly whether content, accessible name, and DOM/ref type have one owner.                  |
| TextInput                | Required controlled `value: string`; excludes `defaultValue`; value-first `onChange`; ref reaches the native input. [Types][text-api], [render][text-paths]                                              | Preserve Cinder's controlled/uncontrolled support and document its wrapper ref versus `inputRef`. |
| Field-composed inputs    | Root `xstyle`/`className`/`style` are forbidden; `container*` styles the Field box and `control*` the visual control box, never the native input. [Owner][parts]                                         | Name the actual target of every customization input.                                              |
| Selector                 | Trigger-button ref; `hasClear` discriminates string versus nullable values; adaptive presentation changes popup semantics. [Ref][selector-api], [values][selector-values], [contract][selector-contract] | Show clear-value types and the focus/role consequences of each presentation.                      |
| Dialog                   | Native modal lifecycle, controlled opening, explicit focus work, and purpose-derived Escape/backdrop behavior. [Runtime][dialog-runtime]                                                                 | Document modal ownership and focus outcomes alongside the composition example.                    |
| NumberInput / DateInput  | NumberInput owns typed drafts and numeric commits; DateInput's shared owner parses and displays calendar-localized text around ISO date values. [Number][number-edit], [date][date-edit]                 | Document value representation, validation timing, and submission boundaries.                      |

The field exception is material: `container*` has no effect inside InputGroup or
horizontal-label FormLayout because no Field box exists there. The shared resolver
strips unsupported root styling and warns about ineffective container styling.
That is precise ownership, but also a customization constraint a short demo can hide. [Parts][parts]

### Specific API edges worth retaining in the comparison

- **Cancellation is local.** TextInput calls `onChange` before a cancellable
  `changeAction`, but calls `onEnter` before consumer `onKeyDown`. Selector documents
  that consumer click cancellation does not prevent opening, and handled keyboard
  events can skip its consumer handler. [TextInput][text-paths], [Selector][selector-api]
- **Clear is a separate path.** TextInput's clear handler sends `('', null)` despite
  the declared non-null change-event type, and does not invoke `changeAction`.
  A checked-in test expects that null event. [Types][text-api], [handler][text-paths], [test][text-clear]
- **Polymorphic refs need scrutiny.** Button declares `Ref<HTMLButtonElement>` but
  casts it to an anchor ref in the link branch; a truly disabled link-button changes
  back to a button. Cinder already exposes separate Button and Link wrappers.
  [Types][button-api], [branch policy][button-action], [render][button-render],
  [Cinder](../packages/react/src/buttons.tsx#L18-L67).
- **A label prop is not label-in-name proof.** Custom Button children can differ
  from `label`, which then supplies `aria-label`. A consumer can therefore create
  disagreement between visible and accessible wording. [Render][button-render]

### Documentation as a maintained component interface

Typed component records carry usage, examples, playground configuration, and anatomy.
Button's record ties accessibility requirements to states and parts. The CLI docs API
supports topic, index, section, and depth-limited reads. [Doc types][doc-types], [Button doc][button-doc], [docs API][docs-api]
**Recommendation:** give Cinder each component's value model, anatomy, ref targets,
composition example, owned strings, and customization example in its existing docs.
Keep those examples aligned with exported types and actual DOM targets.

The API architecture records warning-only passthrough lint and an incomplete
source-to-doc completeness matcher. [Recorded gaps][api-gaps]
Its swizzle path rewrites escaping imports to package subpaths; swizzled StyleX
source also needs a compiler. Its upgrade API migrates an already-installed target
version from an explicit prior version. [Rewrite][swizzle], [build requirement][swizzle-build], [upgrade][upgrade]
For the fourth Cinder prototype, prioritize existing RAC composition and documented
CSS/part customization; source ejection and a parallel CLI have higher maintenance cost.

## 3. Accessibility architecture and actual assertions

### What the implementation owns

- **Busy versus disabled:** Button uses a synchronous in-flight guard for ordinary
  async actions, retains focusability while busy, and exposes translated loading
  through a persistent polite region. [Action path][button-action], [render][button-render]
- **Disabled fields:** TextInput deliberately stays tabbable using `aria-disabled`
  plus read-only/handler guards, and removes its form name. This differs from simply
  using native `disabled`; it is a policy choice to evaluate explicitly. [TextInput][text-paths]
- **Field relationships:** Field's contract separates label, description, status,
  and caller-owned control semantics. A custom control's caller wires description
  IDs. The contract itself records an attached-status default gap for ineligible
  custom controls. [Field contract][field-contract]
- **Modal lifecycle:** Dialog calls `showModal()` before requested focus work,
  restores focus on close/removal, and joins a shared topmost-layer dismissal stack.
  [Runtime][dialog-runtime]
- **IME commands:** the shared predicate checks both `isComposing` and key code 229.
  TextInput suppresses `onEnter` during composition; Selector's search input guards
  its selection/navigation commands. [Predicate][ime], [TextInput][text-paths], [Selector][selector-search-keys]

RAC should remain Cinder's owner for press, focus, collections, and overlays while
the fourth prototype explores its own visual treatment.

### Tests inspected: presence is not a passing run

| Inspected evidence      | What its assertions actually address                                                                                                                                                                       | Boundary                                                        |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Button DOM binding      | Role exclusions and explicit `unrunLayers` for accessibility-tree/real-browser checks. [Test][button-dom]                                                                                                  | jsdom cannot establish native browser behavior.                 |
| Button Chromium binding | Reads rendered labels and compares declared applicability with computed disabled/description state and actual Tab reachability. [Test][button-browser]                                                     | Inspected source; no Chromium run here.                         |
| TextInput IME cases     | Both composition signals suppress `onEnter`; normal Enter still calls it; raw `onKeyDown` still receives composing events. [Tests][text-ime]                                                               | Synthetic key events, not a real IME/OS session.                |
| Selector combobox debt  | Exact sheet-open failure: `aria-controls` names the inner listbox while popup semantics name a dialog. [Ledger][selector-debt]                                                                             | Known upstream debt, not newly reproduced here.                 |
| Dialog Chromium binding | Verifies native `:modal`, records whether focus entered after modality, binds related focus/background targets, and rejects unrun layers. [Test][dialog-browser]                                           | Binding code is evidence of intended checks, not their results. |
| NumberInput DOM binding | Exercises the Spinbutton contract and explicitly leaves browser-owned disabled/focus checks unrun. [Test][number-a11y]                                                                                     | Separates state declarations from browser exposure.             |
| Numeric/date tests      | Numeric locale/rejection corpus; localized calendar input, ISO callbacks, incomplete drafts, errors, and absent-Temporal fallback. [Numbers][number-tests], [dates][date-tests], [fallback][date-fallback] | Unit/DOM assertions; runtime/browser assumptions are bounded.   |

The transferable practice is **contract → observable outcome → capable evidence
layer**. Astryx rejects test volume as a coverage measure and calls for assertions
sensitive to broken behavior, reusing sufficient tests. [Sufficiency contract][test-contract]
For Cinder, extend the existing evidence only for a new obligation introduced by the
prototype or a demonstrated wrapper defect; retain known exceptions with exact scope.

## 4. Internationalization: four separate responsibilities

### Strings and fallback

InternationalizationProvider supplies locale, catalogs, overrides, direction, and an
explicit calendar through context. It renders no wrapper and sets neither DOM
`lang` nor `dir`. Nested providers replace the parent context. [Provider][provider], [contract][i18n-contract]
Lookup order is all exact-to-parent overrides, then all exact-to-parent supplied
catalogs, then registered shipped English. Thus a parent-language override can beat
an exact-region catalog. Missing translations fall back silently; a key missing
everywhere warns and is rendered visibly. [Resolver][resolver], [precedence tests][resolve-tests]

Two integration limits matter: a supplied application `en` catalog is not a
cross-locale fallback unless the active chain includes English; the supported
translator contract is string-based. The resolver casts ICU output to `string`
rather than runtime-validating that result. Product-rich messages remain a separate
application concern. [Provider contract][i18n-contract], [resolver][resolver]

**Measured catalog inventory:** a read-only JSON/key-set scan of the pinned checkout
found 30 authored catalogs: English has **614 keys**; every one of the 29 non-English
files has **365**, missing **249** English keys and adding none. This follows the
generator's authored-file boundary (`*.json`, excluding `pseudo.json`).
[Inventory boundary][catalog-generator], [English][catalog-en], [Arabic sample][catalog-ar], [German sample][catalog-de]
These counts establish key availability only. They do not establish translation
quality, complete localized journeys, or which catalogs an application has loaded.
The inventory includes no authored `fa-IR` catalog, although numeric/calendar tests
exercise that locale; formatting support and translated interface coverage differ.
[Numeric tests][number-tests], [calendar tests][date-tests]

### Direction, language, and portals

Astryx's corrective portal host stays near the intended DOM location and inside
the nearest native dialog. The writing-context helper copies differing computed
`direction` and `writingMode`; that helper has no language-attribute propagation.
This identifies a language-inheritance question, not proof that every overlay loses
its language. [Portal host][layer-host], [writing context][layer-writing]
Treat locale context, visual direction, DOM language, and the portal's actual DOM
ancestry as separate checks. A mirrored screenshot does not establish all four.

### Numbers, dates, and search

NumberInput parses typed drafts with the provider locale and resolves them on
blur/Enter through shared clear/revert/clamp decisions. Its resting default is
`String(value)` unless `formatValue` is supplied; editable formatting localizes only
the decimal separator, retaining Latin digits.
[Editing][number-edit], [commit policy][number-commit], [formatter][number-format], [assertions][number-tests]
Its test corpus makes ambiguity concrete: `1,234` has different meanings in `en-US`
and `de-DE`; malformed grouping, units, and percentages have rejection cases.
Use such inputs as questions for Cinder's existing RAC NumberField. [Corpus][number-tests]

DateInput separates Gregorian ISO values from localized calendar display, format
hints, and errors. The provider defaults to `gregory` independently of locale,
including locale calendar extensions. Some calendars require Temporal and fall
back to Gregorian when unavailable; the no-Temporal tests explicitly stub browser
facilities, so they do not prove Safari behavior. [Date owner][date-edit], [provider][provider], [fallback test][date-fallback]
Calendar tests assert an ISO callback for `fa-IR` input and preserve some rejected
drafts on blur, while incomplete input remains silent. These are valuable acceptance
examples without replacing RAC's date model. [Tests][date-tests]

Shared typeahead folds case, selected Latin marks/stroked letters, and Turkish I
variants independently of locale. Selector uses lowercase substring matching.
Cinder should document each collection's matching policy; these implementations
do not establish suitability for every language. [Typeahead owner][typeahead], [Selector filter][selector-filter]

## 5. Theme architecture and the visual lesson

### A theme is more than a color seed

Astryx authors component styles with StyleX and exposes prebuilt `astryx.css`.
Its core manifest declares MIT, React/React DOM `>=19.0.0`, a
`@stylexjs/stylex ^0.19.0` peer, and runtime `intl-messageformat ^11.2.9`.
Those are source-manifest declarations, not a clean-install result.
[Exports][core-package], [build and dependencies][core-build].

`defineTheme` normalizes an optional base, generated axes, explicit tokens,
component overrides, inverted surfaces, icons, and ordered adaptations. Runtime
and prebuilt distribution are documented paths. Within a resolved layer, the
order is **base seed → generated axes → explicit tokens**; a child's generated
axis can therefore replace an explicit value inherited from its base. Explicit
tokens win within their own layer, not over every later adaptation or child.
[Construction][theme-construction], [resolution][theme-resolution], [distribution][theme-modes].

The HCT color helper derives accent and neutral roles from one seed or a
`[light, dark]` pair; status colors and categorical hues are outside that seed's
scope. In particular, overriding only `--color-accent` does not recompute the
contrast-derived `--color-on-accent`. A custom palette needs coherent foreground/
background pairs, not just a new brand hex value. [Color input][theme-color],
[generator][color-expansion].

The public theme folders are **Neutral, Butter, Chocolate, Matcha, Stone, Gothic,
and Y2K**. Only Neutral's descriptor sets `maintained: true`; the other six set
false, and the separate probe package is private. Treat that metadata as an
upstream maintenance distinction rather than a visual-quality ranking.
[Theme inventory][theme-family], [Neutral descriptor][neutral-doc].

Neutral illustrates the useful separation: a neutral primary action, distinct
information/status roles, foregrounds for strong and pale fills, and authored
light/dark values. It uses Figtree and explicitly sets 10px element corners
(`0.625rem` at a 16px root), 12px container corners, and 28px page corners. Its
theme-local status-accent token remains for released compatibility while current
status painting uses portable roles. **Frame borrows the separation of roles and
the field anatomy, not Neutral's whole token map.**
[Type and surfaces][neutral-foundation], [semantic roles and geometry][neutral-roles].

### Reconcile architecture notes with current source

Some “accepted but unshipped” paragraphs lag behind the same pinned checkout.
The source takes precedence for these implementation observations:

| Architecture note                                                                                   | What the pinned source actually contains                                                                                                                                                                                                                                                                                                 | Evidence boundary                                                                                             |
| --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Prefix-independent local-token names are unshipped. [Note][theme-authoring-gaps]                    | The public input accepts arbitrary custom-property names; the core validator checks CSS-name validity and records exact ownership, collision, cycle, and lineage information without requiring the theme-name prefix. [Input][theme-local-input], [validator][theme-local-validation]                                                    | Core source inspection; no CLI build/parity run.                                                              |
| Declaration-boundary refusal and a warnings collector are unshipped. [Note][theme-compilation-gaps] | `joinDeclarations` calls the name/value boundary checks, drops refused entries, and reports through a warnings array or runtime console sink. [Generator][theme-declarations]                                                                                                                                                            | A present implementation path, not a reproduced adversarial CSS test.                                         |
| No spring reads the motion knobs yet. [Note][theme-authoring-gaps]                                  | `resolveMotion` reads the theme tempo and scales default springs. `resolveThemeMotion` returns knobs, durations, and easings, not the proposed unified role tables; theme-controlled `reducedMotion: 'always'` is still absent from the public knobs. [Spring path][theme-springs], [resolved shape][theme-motion], [knobs][theme-knobs] | Partial implementation matters; do not turn one landed path into a claim that all motion obligations shipped. |

The compilation contract also records private-variable authoring, nested-pseudo
lowering, and guaranteed-property coverage gaps. Those remain **recorded upstream
gaps** here; this pass did not independently reproduce them.
[Compilation ledger][theme-compilation-debt].

### What Frame implements

The fourth prototype uses Cinder's existing RAC behavior and prototype-local CSS:

- Guidance above each input, with attached icon-and-text recovery below it.
- Cool neutrals and neutral primary actions; blue focus/selection remains distinct
  from red validation, warm warnings, and save confirmation.
- 44px controls with 10px corners, 14px work-area corners, and 18px dialog corners.
- Reserved validation space and a single settings reading column beside its summary.
- The shared table workspace, review editing, and nested dropdown interactions.

The comparison includes Astryx's actual light/dark Field documentation crop next
to an explanation of what carries over. Its dimensions and content differ from
the common 380px task specimens; it establishes anatomy rather than a controlled
size comparison. Frame was selected as the preferred visual direction after the
comparison; its current implementation is prototype-local.
[Working guide](prototypes-guide.md), [Frame styles](../apps/docs/src/prototypes/frame.css),
[capture provenance](../apps/docs/src/prototypes/references/README.md).

## 6. Cinder comparison and recommendations

| Current Relay/Cinder evidence                                                                                                                                                                         | Recommendation for this direction                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| RAC `onPress`, controlled/uncontrolled values, retained wrapper classes, wrapper/input refs, and differing `children` meanings are documented. [Relay](relay.md#L158-L188)                            | Preserve those APIs while the fourth prototype establishes its own appearance; show real state changes and composed examples.         |
| TextField's convenience anatomy is replaceable; SearchField separately exposes `inputProps`. [Fields](../packages/react/src/fields.tsx#L41-L74), [Search](../packages/react/src/fields.tsx#L146-L185) | Publish a per-family anatomy/ref table; extend an existing part seam only when the prototype demonstrates a concrete need.            |
| Button owns the English default `Pending`; SearchField owns `Search`. [Button](../packages/react/src/buttons.tsx#L18-L49), [Search](../packages/react/src/fields.tsx#L153-L175)                       | Next library slice: one small library-message owner using the existing locale, with component overrides for product wording.          |
| Date dialogs own English names; range thumbs default to `Minimum`/`Maximum`. [Dates](../packages/react/src/dates.tsx#L103-L159), [Slider](../packages/react/src/selection.tsx#L256-L263)              | Include assistive labels in that inventory; translated RAC internals cannot translate these Cinder literals.                          |
| Theme writes `lang`/`dir`; `useOverlayTheme` forwards direction but not language. [Theme](../packages/react/src/theme.tsx#L18-L43), [overlay metadata](../packages/react/src/theme.tsx#L71-L75)       | Check actual portal language, nested locale changes, and explicit `lang` overrides before choosing a fix.                             |
| Portal tests assert wrapper language and overlay direction/focus, but not overlay language. [Contracts](../tests/browser/contracts.test.ts#L110-L183)                                                 | Add a language assertion when addressing that specific boundary; do not describe current RTL evidence as complete localization proof. |

For the prototype, show a working RAC composition with documented root/part
targets and ordinary CSS overrides whose effects remain understandable.
Exercise stable pending labels, field error/recovery, keyboard selection, and
nested-overlay focus using existing fixtures. Subsequent library work should
prioritize owned strings and targeted language/IME/locale evidence.

Cinder already records **14 unit tests / 792 expects and 106 browser cases**, with
bounded axe, accessibility-tree, contrast, responsive, and nested-focus evidence.
These are prior Relay results, not reruns here or proof for the fourth prototype.
[Aggregate record](verification.md#L20-L38), [bounded evidence](verification.md#L40-L61).

## 7. Verification limits and compact reading inventory

Performed: local snapshot/source inspection, targeted test-body reads, all-authored-
catalog and theme-descriptor inventories, inspection of saved CLI failures, public
Field-documentation captures, and report citation/scope checks. The seven CLI
bootstrap commands all exited 1; the saved output names
missing `commander`. Consumer docs were read directly from source instead.
Evidence: `.research/astryx-2026-11-06/cli-bootstrap.json` and `cli-help.txt:5`.
No Astryx dependency install, upstream test execution, or source build was performed.
The public-documentation browser capture establishes the displayed field states only.
Cinder's separate Frame interaction results are recorded in the
[prototype guide](prototypes-guide.md#verification). Manual assistive-technology,
real IME, and translation-quality verification remain unperformed.
Accessibility requirements, source code, and checked-in tests are not certification.

| Reading area          | Inventory                                                                                                                                                                                                                                                                                |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Component/API owners  | Button implementation/doc; Field and field-part owner; TextInput; targeted Selector implementation/contract; Dialog lifecycle                                                                                                                                                            |
| Interaction evidence  | Button DOM/Chromium bindings; TextInput IME/clear assertions; Selector exact debt; Dialog Chromium; NumberInput binding/corpus; DateInput calendar/fallback assertions                                                                                                                   |
| Internationalization  | Provider/resolver/context/direction helpers; current provider/i18n contracts; typed-date and number owners; typeahead/filter and portal-writing paths                                                                                                                                    |
| Authored catalogs     | `af-ZA`, `ar-SA`, `ca-ES`, `cs-CZ`, `da-DK`, `de-DE`, `el-GR`, `en`, `es-ES`, `fi-FI`, `fr-FR`, `he-IL`, `hu-HU`, `it-IT`, `ja-JP`, `ko-KR`, `nl-NL`, `no-NO`, `pl-PL`, `pt-BR`, `pt-PT`, `ro-RO`, `ru-RU`, `sr-SP`, `sv-SE`, `tr-TR`, `uk-UA`, `vi-VN`, `zh-CN`, `zh-TW`; key sets only |
| Documentation/tooling | Typed component records; docs dispatcher; internationalization namespace; swizzle import rewriting/build requirement; upgrade entry point; recorded API/test-sufficiency gaps                                                                                                            |
| Themes and color      | Core manifest; `defineTheme`, value resolution and HCT expansion; Neutral semantic roles and all seven theme descriptors; local-token/declaration boundaries; motion knobs and spring-tempo path; architecture/source reconciliation                                                     |
| Cinder baseline       | `docs/relay.md`; relevant `packages/react/src/` wrappers; `tests/browser/contracts.test.ts`; recorded `docs/verification.md` results                                                                                                                                                     |

### Pinned upstream references

[api-model]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/docs/architecture/public-component-api.md#L70-L98
[api]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/docs/architecture/public-component-api.md#L100-L186
[api-gaps]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/docs/architecture/public-component-api.md#L432-L484
[parts]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/Field/fieldParts.ts#L27-L174
[field-contract]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/docs/specs/components/Field/Field.spec.md#L63-L138
[button-api]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/Button/Button.tsx#L335-L453
[button-action]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/Button/Button.tsx#L692-L805
[button-render]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/Button/Button.tsx#L865-L1008
[text-api]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/TextInput/TextInput.tsx#L148-L278
[text-paths]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/TextInput/TextInput.tsx#L440-L570
[text-clear]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/TextInput/TextInput.test.tsx#L1022-L1029
[selector-api]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/Selector/Selector.tsx#L634-L705
[selector-values]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/Selector/Selector.tsx#L912-L940
[selector-contract]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/docs/specs/components/Selector/Selector.spec.md#L134-L237
[dialog-runtime]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/Dialog/Dialog.tsx#L596-L744
[doc-types]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/cli/authoring/doctypes/component/type.ts#L145-L196
[button-doc]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/Button/Button.doc.mjs#L3-L98
[docs-api]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/cli/api/docs/docs.mjs#L73-L133
[swizzle]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/cli/api/swizzle/copy/copy.mjs#L38-L97
[swizzle-build]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/cli/clients/cli/commands/swizzle.mjs#L80-L119
[upgrade]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/cli/api/upgrade/upgrade.mjs#L99-L139
[ime]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/utils/ime.ts#L13-L41
[selector-search-keys]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/Selector/Selector.tsx#L1733-L1792
[button-dom]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/Button/__tests__/Button.a11y.test.tsx#L102-L154
[button-browser]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/Button/__tests__/Button.a11y.chromium.spec.ts#L137-L264
[text-ime]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/TextInput/TextInput.test.tsx#L881-L924
[selector-debt]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/Selector/__tests__/Combobox.a11y.known-failures.ts#L12-L27
[dialog-browser]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/Dialog/__tests__/Dialog.a11y.chromium.spec.ts#L95-L202
[number-a11y]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/NumberInput/__tests__/NumberInput.a11y.test.tsx#L65-L131
[test-contract]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/docs/architecture/component-test-sufficiency.md#L58-L129
[provider]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/i18n/InternationalizationProvider.tsx#L60-L167
[i18n-contract]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/docs/specs/components/i18n/InternationalizationProvider.spec.md#L80-L175
[resolver]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/i18n/resolve.ts#L66-L153
[resolve-tests]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/i18n/__tests__/resolve.test.ts#L197-L258
[catalog-generator]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/scripts/generate-i18n-runtime.mjs#L106-L122
[catalog-en]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/locales/en.json#L1-L2458
[catalog-ar]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/locales/ar-SA.json#L1-L1462
[catalog-de]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/locales/de-DE.json#L1-L1462
[layer-host]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/Layer/layerHost.ts#L102-L148
[layer-writing]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/Layer/useLayer.tsx#L903-L928
[number-edit]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/NumberInput/NumberInput.tsx#L716-L854
[number-commit]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/NumberInput/numberInputCommit.ts#L31-L103
[number-format]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/NumberInput/numberParser.ts#L356-L365
[number-tests]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/NumberInput/numberParser.test.ts#L15-L221
[date-edit]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/DateInput/useTypedDate.ts#L111-L240
[date-tests]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/DateInput/DateInput.calendar.test.tsx#L29-L204
[date-fallback]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/DateInput/DateInput.noTemporal.test.tsx#L24-L129
[typeahead]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/utils/typeaheadMatch.ts#L18-L142
[selector-filter]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/Selector/Selector.tsx#L1066-L1093
[core-package]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/package.json#L1-L54
[core-build]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/package.json#L889-L928
[theme-modes]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/theme/defineTheme.ts#L3-L17
[theme-construction]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/theme/defineTheme.ts#L783-L917
[theme-resolution]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/theme/resolveThemeValues.ts#L283-L367
[theme-color]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/theme/defineTheme.ts#L345-L382
[color-expansion]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/theme/expandColorScale.ts#L3-L53
[theme-family]: https://github.com/meta/astryx/tree/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/themes
[neutral-doc]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/themes/neutral/src/neutralTheme.doc.mjs#L3-L11
[neutral-foundation]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/themes/neutral/src/neutralTheme.ts#L35-L97
[neutral-roles]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/themes/neutral/src/neutralTheme.ts#L117-L236
[theme-authoring-gaps]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/docs/architecture/theme-authoring-contract.md#L310-L328
[theme-compilation-gaps]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/docs/architecture/theme-compilation.md#L353-L371
[theme-local-input]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/theme/defineTheme.ts#L383-L389
[theme-local-validation]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/theme/localTokens.ts#L250-L327
[theme-declarations]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/theme/generateThemeRules.ts#L386-L462
[theme-springs]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/motion/resolveMotion.ts#L60-L145
[theme-motion]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/theme/themeMotion.ts#L176-L239
[theme-knobs]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/packages/core/src/theme/motionKnobs.ts#L19-L83
[theme-compilation-debt]: https://github.com/meta/astryx/blob/ec84130f57b3c3c3f51a82ef5103d7d3eb357647/docs/architecture/theme-compilation.md#L373-L399
