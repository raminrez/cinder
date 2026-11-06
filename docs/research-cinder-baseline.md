# Cinder baseline audit for an original design system

- **Research date:** 6 November 2026.
- **Source snapshot:** `ddcb8672a2ed39597c0db94ec47da6b6ac466744`, branch
  `research/base-heroui-cinder`.
- **Scope:** current Cinder and its pinned Carbon foundation. This is the baseline input to the
  future Carbon / Uber Base / HeroUI synthesis. All future changes and acceptance gates below are
  **unapproved proposals**.

This is a historical audit: “current” below refers to the recorded source snapshot.
The later Relay implementation is documented in the [Relay specification](relay.md)
and [Relay verification](verification.md#relay-follow-up).

## Executive finding

**Cinder is a useful, already functioning static-CSS and RAC foundation. Its main limitation for
a more freely customizable system is the uneven public customization contract.** There is no
styling-engine runtime dependency to remove: component CSS is authored explicitly, tokens are
generated ahead of time, and RAC supplies interaction behavior. However, public classes mix
Cinder wrappers with raw RAC defaults; some wrappers allow full anatomy replacement while others
fix important parts; theme context only bridges a small set of attributes into overlays. These
are concrete differences between current implementation and a broad promise of CSS freedom.
Sources: [package dependencies](../packages/react/package.json#L23-L37),
[CSS entry](../packages/react/src/styles.css#L1-L50),
[exports](../packages/react/src/index.ts#L123-L186),
[selection anatomy](../packages/react/src/selection.tsx#L145-L222), and
[theme bridge](../packages/react/src/theme.tsx#L5-L75).

The baseline is stronger than its early Carbon discrepancy report suggests. The latest saved
aggregate passed formatting, Oxlint, type checking, 12 unit tests / 129 assertions, 92 browser
tests, build, packing, and an external tarball consumer. This audit compared the current bytes
of all 70 files named in that aggregate with their recorded hashes: none were missing or
different. That establishes continuity with those saved results, not a fresh test run or proof
of every possible composition. Sources: [latest record](../test-results/check-oxlint.json#L1-L102),
[gate summary](verification.md#L17-L45), and
[audit inventory](../.research/cinder-baseline-2026-11-06/inventory.json#L1-L21).

The most consequential findings for synthesis are:

1. **Preserve the working behavior and evidence.** Controlled values, selected refs/render props,
   native validation, keyboard journeys, and built-in theme/layer portals already have targeted
   proof. The declared Bun 1.4.4, Oxlint, React/RAC, and Carbon v11 decisions are the current
   baseline. [Contracts](../tests/browser/contracts.test.ts#L48-L176),
   [tooling](../package.json#L6-L51).
2. **Make customization predictable before promising it universally.** Root props, inner parts,
   raw default classes, cascade layers, and portalled surfaces need an explicit consumer-facing
   contract. A successful custom Button does not establish equivalent Select, Toast, or Modal
   customization. [Class helper](../packages/react/src/utils.ts#L1-L6),
   [Modal](../packages/react/src/overlays.tsx#L25-L37),
   [Toast](../packages/react/src/feedback.tsx#L196-L242).
3. **Treat original branding as a new design decision.** The present brief fixes Carbon's palette
   and typography. Existing token names, theme names, geometry, and type data expose that choice
   to consumers. [Brief](design-direction.md#L10-L21),
   [constraint](design-direction.md#L75-L85),
   [token API](../packages/tokens/src/index.ts#L3-L18).
4. **Do not turn inventory into parity or accessibility certification.** There are 45 reference
   entries, representing portions of 39 Carbon families. Automated results are substantial but
   do not cover manual assistive technology, every state, every browser, or every locale.
   [Crosswalk arithmetic](coverage.md#L7-L29),
   [verification limits](verification.md#L313-L323).

## 1. Evidence, authority, and reading inventory

### What governs this report

Current source is authoritative for what Cinder exposes. Saved assertions and their dated results
are authoritative for what was exercised. The Carbon archive supplies upstream comparison
material; the earlier research report is not a perpetual list of current defects. Cinder's
coverage document explicitly records the corrected button, compound-size, notification,
calendar, toggle/slider, and typography findings at their measured scope.
[Correction record](coverage.md#L126-L139).

Source links below retain the snapshot's inclusive line ranges using GitHub's
`#Lstart-Lend` notation. Relative links open working-tree files, whose lines may have shifted;
use `git show ddcb8672:<repository-relative-path>` to read a tracked target at the cited revision.
Short **API**, **CSS**, and test labels in the family matrix resolve to those paths.
Archived `.research/` material and `test-results/` are local supporting evidence and are
ignored by Git; the important conclusions and counts are restated here.
[Ignore rules](../.gitignore#L1-L8).

| Evidence inspected                     | Reading and verification boundary                                                                                                                                                                                                                                                                                                                                                    |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| All 16 files in `packages/react/src/`  | Implementations, public barrel, helpers, icons, themes, and the complete 1,988-line stylesheet were read. The retained file list is in the [inventory](../.research/cinder-baseline-2026-11-06/inventory.json#L109-L126).                                                                                                                                                            |
| Token package                          | Generator and typed API were read; generated CSS/JSON structure, counts, contextual aliases, and selected upstream comparisons were inspected. This is not a new exhaustive comparison of every upstream value. [Generator](../packages/tokens/scripts/generate.ts#L1-L155), [tests](../tests/unit/tokens.test.ts#L24-L119).                                                         |
| Catalog and live examples              | All 45 catalog slugs have exactly one matching switch case, with no missing or extra cases. Rendered examples and published code strings remain separate implementations. [Inventory](../.research/cinder-baseline-2026-11-06/inventory.json#L22-L76), [rendering](../apps/docs/src/reference.tsx#L126-L147).                                                                        |
| Browser and unit assertions            | All four browser files and both unit suites were read, together with the contract, fidelity, and external-consumer fixtures. Test titles were checked against actual assertions. The [test inventory](../.research/cinder-baseline-2026-11-06/inventory.json#L127-L142) identifies the retained files.                                                                               |
| Distribution                           | Build, pack, consumer-verification, and license assembly code; package manifests and READMEs; saved package results; both tarballs inspected through archive members without extraction. [Build](../scripts/build.ts#L11-L66), [packing](../scripts/pack.ts#L9-L33), [consumer](../scripts/verify-package.ts#L27-L108).                                                              |
| Existing Cinder research and decisions | Coverage, design direction, RAC research, verification, and Carbon's foundations, crosswalk, adoption, disagreement, acceptance, licensing, and provenance sections. These distinguish source decisions from unperformed validation. [Coverage](coverage.md), [RAC](research-rac.md), [Carbon](research-carbon.md), [verification](verification.md).                                 |
| Carbon primary-source archive          | About Carbon, contribution overview, component checklist, and lifecycle pages; targeted migration/source sections behind the pinned comparison. The earlier archive's 335 page pairs and 10,879 extracted package files are acquisition counts, not this audit's reading count. [Archive inventory](verification.md#L291-L303), [Carbon provenance](research-carbon.md#L1005-L1080). |
| Standards                              | Official W3C target-size guidance, automated-evaluation limits, and CSS cascade-layer rules. These clarify acceptance language; they are not new Cinder conformance results. [AA target size][wcag-minimum], [enhanced target size][wcag-enhanced], [evaluation limits][w3c-evaluation], [cascade][css-cascade].                                                                     |

The read-only inventory was captured at **09:54:19 UTC**. It records a clean worktree before this
deliverable, 143 tracked paths, the requested branch/HEAD, matching source hashes, token counts,
negative filename searches, and package checks. Hash comparison covers only the 70 recorded
files; it does not certify every documentation file, ignored artifact, or external dependency.
[Inventory](../.research/cinder-baseline-2026-11-06/inventory.json#L1-L21).

No product checks were executed for this audit. The product results cited below are retained
results, reconciled with current source bytes. The audit's final checks concern this document's
format, links, citations, family inventory, and diff.

### Exact catalog boundary

The count is **42 − 3 − 1 + 7 = 45**, rather than a coverage percentage:

- Three absent Carbon families: **AI label, Toggletip, UI shell right panel**.
- One consolidation: shell header and left panel share `ui-shell`.
- Seven additional pages from splits: Text area; Combo box and Multi-select; Date range picker
  and Time picker; Toast; Skeleton.
- Carbon Menu buttons is represented by the Overflow menu composition.

Consequently, **39 upstream families have some representation**, sometimes only a small subset.
Theme, Layer, Grid, Stack, Meter, Calendar, RangeCalendar, DateField, and raw composition parts
are extra exports, not extra catalog families. [Coverage](coverage.md#L7-L29).

## 2. Architecture and version boundaries

### Current ownership

```text
Pinned Carbon packages
  -> token generator -> CSS variables + JSON -> typed token exports

React Aria Components
  -> Cinder wrappers and direct composition exports
  -> consumer-controlled values, refs, slots, and render props

Theme / Layer React context
  -> DOM theme/layer/direction attributes
  -> selected attributes copied to Cinder overlay roots

Static component CSS + generated token CSS
  -> public stylesheet -> Bun-built package artifacts

Catalog metadata + separate live examples
  -> Cinder documentation and browser fixtures
```

This division is visible in the [generator](../packages/tokens/scripts/generate.ts#L24-L56),
[token exports](../packages/tokens/src/index.ts#L1-L28),
[React exports](../packages/react/src/index.ts#L1-L207),
[theme bridge](../packages/react/src/theme.tsx#L18-L75),
[build](../scripts/build.ts#L11-L45), and
[reference renderer](../apps/docs/src/reference.tsx#L97-L211).

| Boundary          | Current pin or public promise                                                                    | Implication                                                                                                                                                                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Workspace tooling | Bun **1.4.4**, Oxlint **1.91.0**, TypeScript **7.0.2**                                           | Stable Bun handles package/build/test/native-format/native-check work; Oxlint supplies lint. These decisions already have saved verification. [Manifest](../package.json#L6-L51), [verification](verification.md#L17-L81).                                              |
| React runtime     | React / React DOM **19.3.1**, RAC **1.22.1**, date **3.12.4**                                    | These are the tested catalog values. The wider React `>=19 <20` and RAC `>=1.22 <2` peer ranges are not a tested compatibility matrix. [Pins](../package.json#L15-L21), [peers](../packages/react/package.json#L23-L37), [README](../packages/react/README.md#L16-L23). |
| Carbon generation | Themes **11.85.0**, layout **11.63.0**, type **11.71.0**, motion **11.56.0**, colors **11.62.0** | Carbon packages are development inputs in the token workspace, not a Carbon React runtime dependency. [Manifest](../packages/tokens/package.json#L24-L30).                                                                                                              |
| Carbon comparison | Styles **1.119.0**; clone `f8aceaf5583e0bec00e0883fe06760da9283e213`                             | Published v11-default styles and targeted source snapshots are the comparison boundary. Flagged v12 rounding, caret, spacing, and date APIs are separate choices. [Version ledger](research-carbon.md#L139-L182).                                                       |
| Package surface   | Provisional `@cinder/react` / `@cinder/tokens` **0.1.0**                                         | ESM and declarations; explicit CSS/JSON exports; CSS marked as side-effectful. No public per-component CSS or separate unstyled entry is declared. [React manifest](../packages/react/package.json#L1-L22), [tokens manifest](../packages/tokens/package.json#L1-L23).  |
| Client boundary   | React barrel and built React bundle use `"use client"`                                           | This identifies a client component surface; it is not proof of SSR/hydration or every React server-framework integration. [Barrel](../packages/react/src/index.ts#L1-L4), [build](../scripts/build.ts#L15-L28), [limits](verification.md#L313-L320).                    |
| Toast stability   | RAC `UNSTABLE_Toast*` APIs                                                                       | The experimental label is warranted even though visibility/dismissal and selected geometry pass. [Implementation](../packages/react/src/feedback.tsx#L14-L20), [public boundary](../packages/react/README.md#L74-L79).                                                  |

The token package exposes **313 entries per theme**: 234 semantic colors, one color-scheme
metadata entry, and 78 component tokens. There are **191 scalar foundations** and **36 selected
complete type definitions**. The latter retain sparse breakpoint overrides; scalar CSS
variables contain base values and do not implement responsive interpolation. Some component
token values are CSS-variable references, so the JSON is not uniformly a set of resolved colors.
[Token documentation](../packages/tokens/README.md#L33-L54),
[generation](../packages/tokens/scripts/generate.ts#L44-L89),
[inventory](../.research/cinder-baseline-2026-11-06/inventory.json#L77-L86).

The small built-in Icon component uses a finite set of structural SVG paths on a 16px grid and
defaults to decorative semantics. It is not the Carbon icon catalog; enclosing controls need
their own accessible names. [Icon source](../packages/react/src/icons.tsx#L3-L55).

## 3. CSS freedom and composition: what exists today

### 3.1 Static CSS is already the styling model

There is no runtime style engine in the React package's dependencies. Consumers explicitly
import the stylesheet, which includes generated token CSS. Most RAC-backed wrappers preserve
their base class through `classes()`, including state-driven class functions. This is a good
starting point for ordinary application styles and class-based tooling.
[Dependencies](../packages/react/package.json#L23-L37),
[installation contract](../packages/react/README.md#L21-L27),
[class composition](../packages/react/src/utils.ts#L1-L6).

| Consumer technique                     | Existing route                                                                                  | What is actually established                                                                                                                                                                                                                                                                                                                       |
| -------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Plain application CSS                  | Add `className`, use `--cinder-*`, target documented DOM/state hooks                            | Static classes and state-class composition are source-visible; a custom Button and Checkbox class are browser-asserted. This is representative proof. [Contract assertions](../tests/browser/contracts.test.ts#L48-L74).                                                                                                                           |
| CSS Modules                            | Pass a generated class string; use global selectors for existing internal hooks where necessary | The class route exists. No retained CSS Modules integration fixture was found; inner-part reachability remains wrapper-specific. [Path search](../.research/cinder-baseline-2026-11-06/inventory.json#L102-L107), [Select anatomy](../packages/react/src/selection.tsx#L155-L221).                                                                 |
| Tailwind or another utility stylesheet | Pass utility classes to reachable parts and establish cascade precedence                        | No retained Tailwind integration fixture establishes import order, layer order, preflight interaction, or arbitrary variant behavior. The absence of a config alone would not establish lack of support. [CSS layer](../packages/react/src/styles.css#L1-L50), [test inventory](../.research/cinder-baseline-2026-11-06/inventory.json#L127-L142). |
| CSS-in-JS                              | Pass an emitted class or use supported `style`/`render` props                                   | No package dependency forces a particular engine. Actual integration, prop forwarding, and injection-order behavior have not been independently verified. [Public props](../packages/react/src/buttons.tsx#L17-L47), [Modal exception](../packages/react/src/overlays.tsx#L25-L37).                                                                |
| Fully replaced anatomy                 | Supply custom children to wrappers that use `children ?? …`, or compose RAC parts               | Proven for a custom TextField; not a universal wrapper contract. Some needed raw parts require importing RAC directly. [Custom field assertions](../tests/browser/contracts.test.ts#L70-L74), [fields](../packages/react/src/fields.tsx#L41-L104), [barrel](../packages/react/src/index.ts#L123-L186).                                             |

These interoperability paths are **plausible from source, not certified integrations**. There is
also no single public `unstyled` switch. Omitting the component stylesheet changes the visual
and hidden-content behavior of convenience compositions, so it should not be advertised as an
equivalent supported mode without its own contract. [Stylesheet entry and hidden utility](../packages/react/src/styles.css#L1-L61),
[fixed pending indicator](../packages/react/src/buttons.tsx#L40-L45).

### 3.2 Selectors, layers, and override precedence

1. **The namespace is useful but not complete.** Hooks are kebab-case block/part names such as
   `.cinder-button`, `.cinder-input-group`, and `.cinder-notification-content`, combined with
   data-state attributes. This is BEM-like anatomy, not strict BEM `block__element--modifier`
   syntax. Raw RAC parts use `.react-aria-*`. The public convention therefore includes two class
   families. [Fields](../packages/react/src/fields.tsx#L60-L71),
   [notification](../packages/react/src/feedback.tsx#L49-L71),
   [menu CSS](../packages/react/src/styles.css#L770-L848).
2. **Component rules are layered; tokens are not.** Component CSS is inside `@layer cinder`.
   Generated tokens are ordinary unlayered `:root` and theme/layer attribute rules. At the same
   cascade origin and importance, unlayered application rules can override normal layered
   component rules regardless of selector specificity. Conversely, a token override placed in
   an application layer can lose to an unlayered generated declaration on the same element.
   Import order alone is not a complete customization recipe. [Component layer](../packages/react/src/styles.css#L1-L6),
   [token emission](../packages/tokens/scripts/generate.ts#L125-L138), [CSS cascade][css-cascade].
3. **Some rules can reach unrelated UI.** `[data-size]` and `[data-kind]` selectors are not
   restricted to a Cinder component. Several `.react-aria-*` selectors are global. A Theme
   applies box-sizing, form-control font, SVG, and hidden-content rules throughout its DOM
   subtree, including non-Cinder descendants. These are source-confirmed scope effects; the
   audit did not measure a collision in a mixed-library application.
   [Theme and size rules](../packages/react/src/styles.css#L6-L50),
   [kind rules](../packages/react/src/styles.css#L1433-L1451),
   [raw collection rules](../packages/react/src/styles.css#L1167-L1230).
4. **Internal custom properties are not consistently namespaced.** `--control-height`,
   `--button-*`, `--tag-*`, `--notification-*`, `--stack-gap`, and `--grid-*` coexist with the
   public `--cinder-*` tokens. They are usable implementation hooks, but no separate stability
   contract identifies which consumers may depend on. Some are set inline, so a stylesheet
   override of the same property on the same element needs appropriate cascade treatment.
   [Button properties](../packages/react/src/styles.css#L63-L150),
   [Tag inline properties](../packages/react/src/content.tsx#L20-L32),
   [layout inline properties](../packages/react/src/layout.tsx#L8-L50).
5. **Ordinary classes cannot override every rule.** Important declarations protect hidden
   content, remove inner input outlines in grouped fields, fix Select/Accordion text color,
   and disable motion. Their purposes differ; overriding the focus arrangement or hidden
   semantics can damage behavior. The reduced-motion rule also affects non-Cinder descendants
   of a theme. [Hidden content](../packages/react/src/styles.css#L30-L31),
   [group focus](../packages/react/src/styles.css#L374-L387),
   [Select](../packages/react/src/styles.css#L413-L430),
   [Accordion](../packages/react/src/styles.css#L1014-L1019),
   [reduced motion](../packages/react/src/styles.css#L1948-L1958).
6. **Not all geometry is token-driven or stylesheet-only.** CSS contains fixed dimensions,
   breakpoint rules, and descendant relationships. Progress fill width, Skeleton dimensions,
   CodeSnippet maximum height, and layout variables are assigned inline. RAC also owns
   positioning/value geometry. A color-token replacement alone is not a complete new visual
   system. [Progress/Skeleton](../packages/react/src/feedback.tsx#L97-L191),
   [snippet](../packages/react/src/content.tsx#L63-L77),
   [responsive geometry](../packages/react/src/styles.css#L1858-L1899),
   [Slider composition](../packages/react/src/selection.tsx#L242-L268).

### 3.3 Public composition and ref asymmetries

| Contract                | Actual behavior                                                                                                                                  | Consequence for a future uniform API                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cinder class merging    | RAC wrappers using `classes()` retain their base hooks; string-only wrappers concatenate them explicitly                                         | Preserve this behavior or document a deliberate migration. [Helper](../packages/react/src/utils.ts#L1-L6), [Breadcrumbs](../packages/react/src/collections.tsx#L114-L123).                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Raw RAC class merging   | A custom `className` replaces the default `.react-aria-*` class                                                                                  | Consumers must retain `defaultClassName` or include the literal hook. A utility class can otherwise remove Cinder styling from a part. [Public guidance](../packages/react/README.md#L53-L56), [RAC findings](research-rac.md#L77-L99).                                                                                                                                                                                                                                                                                                                                                        |
| Replaceable defaults    | Text/number/search fields, date/time fields, calendars, Slider, ProgressBar, and Meter accept replacement children                               | Replacement owns the omitted label/input/help/slot relationships; convenience props no longer recreate them. [Fields](../packages/react/src/fields.tsx#L48-L183), [dates](../packages/react/src/dates.tsx#L55-L225), [feedback](../packages/react/src/feedback.tsx#L77-L140).                                                                                                                                                                                                                                                                                                                  |
| Augmented children      | Button, Checkbox, Radio, Switch, Column, and FilterTag add fixed visual pieces around state-driven content                                       | Render-prop content does not necessarily replace the complete anatomy. [Button](../packages/react/src/buttons.tsx#L40-L45), [selection](../packages/react/src/selection.tsx#L41-L142), [Column/FilterTag](../packages/react/src/collections.tsx#L42-L56).                                                                                                                                                                                                                                                                                                                                      |
| Fixed outer anatomy     | Select/ComboBox children describe options; TagGroup children belong to TagList; AccordionItem supplies heading/trigger/panel                     | No uniform slot-prop API exposes each generated control, label, icon, popover, or help row. [Select/ComboBox](../packages/react/src/selection.tsx#L145-L221), [Accordion/TagGroup](../packages/react/src/collections.tsx#L87-L152).                                                                                                                                                                                                                                                                                                                                                            |
| Modal root              | `style`, `render`, and most inherited props reach ModalOverlay; `className`, `size`, and `ref` reach the inner Modal                             | A consumer cannot assume class, style, and ref identify one DOM node. There is no separate overlay class prop in this wrapper. [Modal](../packages/react/src/overlays.tsx#L25-L37).                                                                                                                                                                                                                                                                                                                                                                                                            |
| NativeSelect root       | `className` reaches the field wrapper; native style, ref, event props, and children reach `<select>`                                             | This deliberate native API differs from RAC Select and from a uniform root-prop convention. [NativeSelect](../packages/react/src/pagination.tsx#L6-L51).                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Narrow convenience APIs | BreadcrumbItem lacks class/style/ref; InlineLoading and ProgressIndicator lack generic root class/style/ref; ToastProvider accepts only children | External descendant selectors or a new composition are currently required for changes beyond the exposed props. Loading, CodeSnippet, FileUploader, and Pagination accept a class but have narrower APIs than native/RAC roots. [BreadcrumbItem](../packages/react/src/collections.tsx#L125-L137), [loading/toast](../packages/react/src/feedback.tsx#L143-L242), [content](../packages/react/src/content.tsx#L37-L44), [progress](../packages/react/src/content.tsx#L113-L168), [files](../packages/react/src/files.tsx#L24-L34), [pagination](../packages/react/src/pagination.tsx#L69-L78). |

The barrel is substantial but not a complete raw-parts facade. For example, the internal RAC
TextArea, Breadcrumb, TagList, CalendarGridHeader/Body, CalendarHeaderCell, and OverlayArrow are
not all re-exported. Consumers replacing the corresponding anatomy may need direct RAC imports.
That is feasible because RAC is a peer, but it makes RAC's versioned part contracts part of the
consumer's integration. [Internal imports](../packages/react/src/dates.tsx#L1-L26),
[collection imports](../packages/react/src/collections.tsx#L1-L26),
[barrel](../packages/react/src/index.ts#L123-L186).

Refs are equally specific: TextField/TextArea have root refs and separate default-control
`inputRef`; Checkbox/Radio/Switch root refs identify labels; Modal identifies the inner modal;
Table/Column allow RAC's table/div element unions. The browser proof covers selected examples,
not every ref on every export. [Ref ledger](research-rac.md#L115-L128),
[assertions](../tests/browser/contracts.test.ts#L48-L74).

### 3.4 Themes, portals, and locale

`Theme` wraps RAC's I18nProvider, inherits its locale when none is supplied, sets `lang` and
locale-derived `dir`, and resets layer context to zero. `Layer` advances the context to 1 and 2,
then saturates, and paints the containing surface. Most aliases select suffixes 01/02/03;
`border-subtle` deliberately selects 00/01/02. The typed ThemeName union is the four built-in
themes, not an arbitrary consumer theme object.
[Theme](../packages/react/src/theme.tsx#L5-L64),
[layer aliases](../packages/tokens/scripts/generate.ts#L97-L138),
[typed names](../packages/tokens/src/index.ts#L3-L5).

**The overlay bridge copies only theme name, layer number, and direction.** It does not copy
`lang`, a custom class, inline style, or consumer-local custom-property values from the Theme
element. Built-in theme tokens can be reconstructed from the copied attributes; a DOM-scoped
brand override on an ancestor is a different case. React locale context may still reach the RAC
components, while the portal's DOM language inheritance differs. These two mechanisms should
not be conflated. [Bridge](../packages/react/src/theme.tsx#L71-L75),
[overlay use](../packages/react/src/overlays.tsx#L20-L66),
[Toast region](../packages/react/src/feedback.tsx#L208-L235).

Current portal contracts check all four themes, inherited RTL locale on nested Theme roots,
layer saturation, contextual colors, modal and nested popover attributes, tooltip attributes,
and focus return. They do **not** check arbitrary scoped brand variables, spoken language on a
detached portal, custom portal containers, or contradictory nested locale providers.
[Exact assertions](../tests/browser/contracts.test.ts#L109-L176).

An application using only a non-Cinder I18nProvider around overlays also needs scrutiny: the
overlay attribute bridge reads Cinder's ThemeContext, whose fallback direction is LTR. A future
locale contract must say which provider owns formatting, keyboard direction, and DOM direction.
This is a source-derived integration concern, not a newly reproduced browser failure.
[Context defaults](../packages/react/src/theme.tsx#L5-L10),
[I18n integration](../packages/react/src/theme.tsx#L18-L38),
[bridge](../packages/react/src/theme.tsx#L71-L75).

## 4. Complete 45-family customization and evidence matrix

### Reading the matrix

- **B** applies to every row: catalog example rendering, whole-page axe in g10, scoped example
  axe in white/g90/g100, and document overflow checks at 1440/768/390px. It does not cover every
  state or every viewport/theme combination. [Assertions](../tests/browser/docs.test.ts#L134-L155).
- **I** identifies an actual interaction assertion, **C** a consumer-contract assertion,
  **F** a focused fidelity assertion, **U** a unit assertion, and **P** a packed-consumer
  assertion. Linked ranges identify the exact scope. These are saved passing tests, not tests
  rerun during this audit.
- **W** means a Cinder RAC wrapper with retained base classes and inherited root props, subject
  to the stated anatomy/ref exceptions. **R** means direct RAC composition, whose custom class
  replaces its default hook. **N** means native-element props. **Limited** means the declared
  convenience props only. These labels describe API access, not accessibility grades.
- Hooks listed are the important roots/parts; the linked CSS gives their full state selectors.
  A named state is implemented or inherited behavior, not necessarily a separately tested state.
  The existing [Carbon crosswalk](coverage.md#L57-L104) supplies the wider variant boundary.

### Actions, fields, and selection — entries 1–19

| Entry                   | CSS hooks                                                                                                                                                                                                  | Composition and customization access                                                                                                                                               | State and accessibility contract                                                                                                                                      | Actual additional proof / boundary                                                                                                                                                                                                                                                                                                                                       |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1. `button`             | `.cinder-button`, `.cinder-spinner`; variant/size/icon-only and RAC state attributes. [CSS](../packages/react/src/styles.css#L63-L225)                                                                     | **W**: class/style/render/ref, state children; pending spinner is added. Seven variants, five sizes. [API](../packages/react/src/buttons.tsx#L15-L47)                              | `onPress`; disabled and pending distinction; icon-only controls require a name; keyboard focus states.                                                                | **I** Enter/Space, disabled attribute, pending press suppression; **C/P** ref and render props; **F** selected colors/focus. [I](../tests/browser/interactions.test.ts#L65-L78), [C](../tests/browser/contracts.test.ts#L48-L59), [F](../tests/browser/fidelity.test.ts#L191-L248), [P](../scripts/verify-package.ts#L136-L140). No 24px Carbon xs/fluid/button-set API. |
| 2. `link`               | `.cinder-link`, `[data-inline]`, hover/focus/disabled. [CSS](../packages/react/src/styles.css#L228-L250)                                                                                                   | **W**: RAC Link props, anchor ref, inline option. [API](../packages/react/src/buttons.tsx#L50-L62)                                                                                 | Navigation semantics and disabled behavior remain RAC-owned; real links need meaningful destinations.                                                                 | **I** exercised within documentation navigation, not a complete Link-specific state contract. [I](../tests/browser/interactions.test.ts#L454-L478).                                                                                                                                                                                                                      |
| 3. `text-input`         | `.cinder-field.cinder-text-field`, `.react-aria-Input`, `.cinder-field-help`. [CSS](../packages/react/src/styles.css#L252-L365)                                                                            | **W**: replacement children; root ref plus `inputRef`; label/help/error and three sizes. [API](../packages/react/src/fields.tsx#L41-L74)                                           | Controlled/default text, native or ARIA validation, required/invalid/disabled/read-only states; label and description relationships.                                  | **C** controlled value, input ref, custom invalid anatomy; **I/P** form submission. [C](../tests/browser/contracts.test.ts#L60-L74), [I](../tests/browser/interactions.test.ts#L121-L136), [P](../scripts/verify-package.ts#L141-L150). No packaged counter/password-visibility/fluid composition.                                                                       |
| 4. `text-area`          | `.cinder-field.cinder-text-area`, `.react-aria-TextArea`, help row. [CSS](../packages/react/src/styles.css#L252-L365)                                                                                      | **W**: root ref and textarea `inputRef`; replacement children; rows/placeholder. No `size` prop. [API](../packages/react/src/fields.tsx#L76-L104)                                  | TextField validation relationships with a resizable multiline control.                                                                                                | **B**; no dedicated textarea interaction/ref assertion identified. Shared TextField tests do not prove this wrapper's full contract.                                                                                                                                                                                                                                     |
| 5. `number-input`       | `.cinder-number-field`, `.cinder-input-group`, `.react-aria-Input`, slot buttons. [CSS](../packages/react/src/styles.css#L252-L391)                                                                        | **W**: replacement children, root ref, three sizes; generated increment/decrement controls otherwise fixed. [API](../packages/react/src/fields.tsx#L107-L144)                      | Localized numeric values, step/bounds, validation; native editable element is queried as a textbox in this baseline.                                                  | **I** increment, End, and upper-bound clamping. [I](../tests/browser/interactions.test.ts#L183-L192). Broad locale parsing and custom anatomy are unverified.                                                                                                                                                                                                            |
| 6. `search`             | `.cinder-search-field`, input group; `[data-empty]` hides clear action. [CSS](../packages/react/src/styles.css#L366-L397)                                                                                  | **W**: replacement children, root ref, `inputProps`, label/help/error. [API](../packages/react/src/fields.tsx#L146-L184)                                                           | Named searchbox, clear action, controlled/default text; generated placeholder defaults to English.                                                                    | **I** actual filtering, empty state, Escape clear. [I](../tests/browser/interactions.test.ts#L109-L119). Expandable/fluid/backend search is outside the wrapper.                                                                                                                                                                                                         |
| 7. `select`             | `.cinder-native-select`, `.cinder-native-select-control`, native `select`. [CSS](../packages/react/src/styles.css#L269-L284), [CSS](../packages/react/src/styles.css#L398-L411)                            | **N, split target**: wrapper class; native style/ref/events/options; native `disabled` and `onChange`. [API](../packages/react/src/pagination.tsx#L6-L51)                          | Label association; composed description/error IDs; native option behavior and explicit `aria-invalid`.                                                                | **B**. Pagination uses it, but the retained table journey does not change page size. Contract theme controls are plain `<select>`, so they do not independently verify this wrapper. [Table journey](../tests/browser/interactions.test.ts#L230-L258), [fixture](../tests/fixtures/contracts.tsx#L119-L142).                                                             |
| 8. `dropdown`           | `.cinder-select`, `.cinder-select-trigger`, `.cinder-select-popover`, RAC ListBox/Item. [CSS](../packages/react/src/styles.css#L413-L434), [CSS](../packages/react/src/styles.css#L749-L848)               | **W with fixed anatomy**: generic items/options; root class/style/ref; children render options, not outer parts. [API](../packages/react/src/selection.tsx#L145-L182)              | Single `value` / `onChange`, label/help/error, disabled options, listbox opening and focus return.                                                                    | **I** Enter/End/Enter selection and focus return; **C** dynamic single values; **P** selection. [I](../tests/browser/interactions.test.ts#L138-L150), [C](../tests/browser/contracts.test.ts#L76-L81), [P](../scripts/verify-package.ts#L144-L146). Typed typeahead is not asserted.                                                                                     |
| 9. `combo-box`          | `.cinder-combobox`, `.cinder-input-group`, `.cinder-combobox-values`, select popover and RAC options. [CSS](../packages/react/src/styles.css#L366-L439), [CSS](../packages/react/src/styles.css#L749-L848) | **W with fixed anatomy**: generic option children; root ref/style/class; no generated-input or popover prop bag. [API](../packages/react/src/selection.tsx#L184-L222)              | Input text and selected keys are distinct channels; filtering/custom-value policy is RAC-owned. Multiple mode renders ComboBoxValue.                                  | **I** filtering, keyboard selection, unknown-value reversion; **C** dynamic multiple selection/active descendant. [I](../tests/browser/interactions.test.ts#L168-L181), [C](../tests/browser/contracts.test.ts#L88-L106). Async, IME, and large collections are unverified.                                                                                              |
| 10. `multi-select`      | Same Select/ListBox hooks as Dropdown. [CSS](../packages/react/src/styles.css#L413-L434), [CSS](../packages/react/src/styles.css#L770-L848)                                                                | Same Select wrapper with `selectionMode="multiple"`; key-array values; fixed summary/trigger anatomy. [API](../packages/react/src/selection.tsx#L145-L182)                         | Multiple selected options, disabled items, Escape dismissal; not Carbon's full chip/selection-summary API.                                                            | **I** selection and disabled option; **C** dynamic key-array update. [I](../tests/browser/interactions.test.ts#L152-L166), [C](../tests/browser/contracts.test.ts#L82-L87).                                                                                                                                                                                              |
| 11. `checkbox`          | `.cinder-checkbox`, `-control`, `.cinder-checkbox-group`; selected/indeterminate/invalid/disabled/focus states. [CSS](../packages/react/src/styles.css#L440-L504)                                          | **W**: state children augmented by a fixed control; group adds label/help. Root ref targets label; group ref targets div. [API](../packages/react/src/selection.tsx#L38-L85)       | Native checkbox semantics, mixed state, controlled values, group validation.                                                                                          | **I** Space and mixed state; **C** class/content render props. [I](../tests/browser/interactions.test.ts#L80-L87), [C](../tests/browser/contracts.test.ts#L67-L69). The 16px glyph alone does not define its target size.                                                                                                                                                |
| 12. `radio-button`      | `.cinder-radio`, `-control`, `-group`, `-options`; horizontal orientation and state selectors. [CSS](../packages/react/src/styles.css#L440-L532)                                                           | **W**: root props/ref; Radio adds fixed visual control; RadioGroup fixes options wrapper plus label/help. [API](../packages/react/src/selection.tsx#L87-L124)                      | Roving keyboard choice, group label/value/validation, disabled and invalid styling.                                                                                   | **I** ArrowDown changes selection. [I](../tests/browser/interactions.test.ts#L89-L93). No focused four-theme radio geometry comparison or group-anatomy replacement proof.                                                                                                                                                                                               |
| 13. `toggle`            | `.cinder-switch`, `-track`, `-thumb`; size, selected, disabled, focus, RTL. [CSS](../packages/react/src/styles.css#L533-L592)                                                                              | **W**: controlled/default state and state children; track/thumb are fixed; two sizes. [API](../packages/react/src/selection.tsx#L126-L143)                                         | RAC Switch uses **Space**. Enter is not a toggle shortcut and can submit a containing form.                                                                           | **I** Space selection; **F** both sizes and LTR/RTL geometry. [I](../tests/browser/interactions.test.ts#L95-L98), [F](../tests/browser/fidelity.test.ts#L103-L141), [behavior boundary](../packages/react/README.md#L74-L79).                                                                                                                                            |
| 14. `slider`            | `.cinder-slider`, `-label`, RAC SliderTrack/Fill/Thumb/Output. [CSS](../packages/react/src/styles.css#L676-L747)                                                                                           | **W**: scalar/array generic, replacement children, thumb labels; default anatomy is horizontal. [API](../packages/react/src/selection.tsx#L224-L273)                               | Bounds/step, named thumbs, formatted value output, disabled/focus/dragging; range thumbs do not cross in the tested case.                                             | **I** Home/End bounds and range limit; **F** painted track and pointer-down active geometry, not value-changing drag travel. [I](../tests/browser/interactions.test.ts#L194-L205), [F](../tests/browser/fidelity.test.ts#L143-L173). No paired editable number field or dedicated vertical styling.                                                                      |
| 15. `date-picker`       | `.cinder-date-picker`, `.cinder-date-popover`, input group, RAC DateInput/Segment and Calendar parts. [CSS](../packages/react/src/styles.css#L1232-L1366)                                                  | **W**: generic DateValue, root props/ref, replacement children; Calendar also has replaceable defaults. [API](../packages/react/src/dates.tsx#L33-L122)                            | Segmented editing; bounded/unavailable dates via RAC; named dialog, one-month default, keyboard calendar selection.                                                   | **I** selected date reaches the segment; **F** single-calendar selection/focus geometry. [I](../tests/browser/interactions.test.ts#L260-L272), [F](../tests/browser/fidelity.test.ts#L291-L313). Built-in dialog label is English; alternate calendars/time zones are unverified.                                                                                        |
| 16. `date-range-picker` | `.cinder-date-range-picker`, shared date popover, `.cinder-range-calendar`; selection start/end/interior. [CSS](../packages/react/src/styles.css#L1232-L1366)                                              | **W**: replacement children; default start/end DateInput slots and RangeCalendar. [API](../packages/react/src/dates.tsx#L65-L81), [API](../packages/react/src/dates.tsx#L124-L165) | Segmented range, endpoint relationships, range selection; English default dialog label.                                                                               | **I** actual endpoints; **F** range endpoints/interior/focus. [I](../tests/browser/interactions.test.ts#L274-L285), [F](../tests/browser/fidelity.test.ts#L314-L334). Full invalid/unavailable-range and locale combinations are unverified.                                                                                                                             |
| 17. `time-picker`       | `.cinder-field.cinder-date-field`, RAC DateInput/Segment; shared date-field styling. [CSS](../packages/react/src/styles.css#L1232-L1270)                                                                   | **W**: generic TimeValue, root ref, replacement children and three sizes. [API](../packages/react/src/dates.tsx#L198-L227)                                                         | Locale-aware segmented time and validation through RAC; no separate clock-face UI.                                                                                    | **I** ArrowUp updates the 24-hour example's hour. [I](../tests/browser/interactions.test.ts#L287-L292). Time zones, 12-hour variants, and broader locale semantics are unverified.                                                                                                                                                                                       |
| 18. `file-uploader`     | `.cinder-file-uploader`, `-label`, `-list`, RAC DropZone/drop-target/focus; error message. [CSS](../packages/react/src/styles.css#L1747-L1786)                                                             | **Limited**: class, label/description, accept/size/multiple, files callback, disabled; fixed chooser/list/remove anatomy. [API](../packages/react/src/files.tsx#L24-L127)          | Local file selection; same validation for chooser/drop; accepted files survive rejected batches; errors announce via alert.                                           | **U** extension/MIME/size boundaries; **I** chooser, native mixed drop, removal. [U](../tests/unit/bounds.test.ts#L5-L23), [I](../tests/browser/interactions.test.ts#L294-L351). Transfer, retry, server validation, and upload lifecycle are application work.                                                                                                          |
| 19. `form`              | No Cinder form block; direct RAC Form plus field/help/error and layout hooks. [Exports](../packages/react/src/index.ts#L123-L131), [CSS](../packages/react/src/styles.css#L252-L365)                       | **R**: full composed children, native form contract and RAC validation props; Stack/Grid supply layout.                                                                            | Native validation by default; ARIA mode delegates submission gating to the application; names and slots preserve relationships. [Contract](research-rac.md#L206-L216) | **I/P** invalid focus and corrected submission; **C** custom server-invalid field anatomy. [I](../tests/browser/interactions.test.ts#L121-L136), [P](../scripts/verify-package.ts#L141-L150), [C](../tests/browser/contracts.test.ts#L70-L74).                                                                                                                           |

### Navigation and data display — entries 20–32

| Entry                  | CSS hooks                                                                                                                                                                                               | Composition and customization access                                                                                                                                                                                                                    | State and accessibility contract                                                                                       | Actual additional proof / boundary                                                                                                                                                                                                                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 20. `accordion`        | `.cinder-accordion`, `-item`, `-trigger`, RAC Heading/DisclosurePanel; expanded state. [CSS](../packages/react/src/styles.css#L1005-L1029)                                                              | **W** group; item has title/content/heading level and root props, but fixed trigger/panel anatomy. Private context propagates density. [API](../packages/react/src/collections.tsx#L69-L112)                                                            | Controlled/multiple expansion and disabled items from Disclosure; heading/trigger/panel relationships.                 | **I** Space opens and Enter closes; **F** 32/40/48px triggers. [I](../tests/browser/interactions.test.ts#L216-L228), [F](../tests/browser/fidelity.test.ts#L58-L69). Disabled activation is not asserted.                                                                                                                      |
| 21. `breadcrumb`       | `.cinder-breadcrumbs`, direct `li`, current-link attribute; generated separators. [CSS](../packages/react/src/styles.css#L1030-L1050)                                                                   | Root retains class/native-style/ref and RAC collections. **Limited item**: children, href, isCurrent only. [API](../packages/react/src/collections.tsx#L114-L138)                                                                                       | Ordered breadcrumb links and current-page semantics through RAC.                                                       | **B**. No overflow-collapse or full item-level class/style/ref API; no dedicated interaction assertion.                                                                                                                                                                                                                        |
| 22. `content-switcher` | `.cinder-content-switcher`, `.cinder-toggle-button`; direct-child boundaries, size/selected/focus/disabled. [CSS](../packages/react/src/styles.css#L593-L674)                                           | **W** group and buttons; inherited size; single required selection defaults can be overridden through RAC props. [API](../packages/react/src/buttons.tsx#L64-L97)                                                                                       | Default radio-group semantics; arrows move focus, **Space selects**. Use Tabs for panel relationships.                 | **I/F** focus/selection and equal-width density geometry. [I](../tests/browser/interactions.test.ts#L100-L106), [F](../tests/browser/fidelity.test.ts#L58-L101). This is a deliberate Carbon adaptation.                                                                                                                       |
| 23. `tabs`             | `.cinder-tabs`, RAC TabList/Tab/TabPanel; line/contained, orientation, selected/focus/disabled. [CSS](../packages/react/src/styles.css#L943-L1004)                                                      | **W** root and **R** parts; arbitrary panel composition; root ref and variant. [API](../packages/react/src/collections.tsx#L59-L67), [parts](../packages/react/src/index.ts#L154-L157)                                                                  | Tab/panel relationships, controlled key, automatic/manual activation from RAC.                                         | **I** disabled skipping and linked panels in the example. [I](../tests/browser/interactions.test.ts#L207-L214). No packaged overflow controls or closable tabs; manual/vertical combinations are not separately asserted.                                                                                                      |
| 24. `pagination`       | `.cinder-pagination`, `-count`, `-actions`; nested NativeSelect and Buttons; responsive rules. [CSS](../packages/react/src/styles.css#L1131-L1165), [CSS](../packages/react/src/styles.css#L1884-L1893) | **Limited**: controlled page/page-size callbacks, options, label/class; fixed text/actions. [API](../packages/react/src/pagination.tsx#L54-L139)                                                                                                        | Named navigation, normalized empty/stale values, disabled boundaries, polite count; English labels/counts.             | **U** normalization; **I** table next/previous boundaries and filtered counts. [U](../tests/unit/bounds.test.ts#L26-L75), [I](../tests/browser/interactions.test.ts#L230-L258). No page-number/cursor API; page-size interaction is not directly asserted.                                                                     |
| 25. `tree-view`        | RAC Tree/TreeItem; selection/focus/disabled/expanded; Cinder Button `slot="chevron"`. [CSS](../packages/react/src/styles.css#L1167-L1202)                                                               | **R** Tree, TreeItem, TreeItemContent, TreeSection; caller composes chevron/content and keeps raw class hooks. [Exports](../packages/react/src/index.ts#L158-L161)                                                                                      | RAC treegrid navigation, selection, expansion; not NavigationTree.                                                     | **I** ArrowLeft/Right collapse/expand. [I](../tests/browser/interactions.test.ts#L444-L452). Reorder, virtualization, and full selection combinations are unverified.                                                                                                                                                          |
| 26. `ui-shell`         | `.cinder-header`, `-header-name`, `-header-nav`, `-side-nav`; current-link rails. [CSS](../packages/react/src/styles.css#L1810-L1856)                                                                   | **N** Header/Nav/SideNav; HeaderName composes Link; children provide structure. [API](../packages/react/src/layout.tsx#L54-L77)                                                                                                                         | Semantic header/navigation and real links; application owns panel state/focus management.                              | **B**. The site's mobile navigation test is not proof of a packaged responsive shell. Full global actions, collapsed rail, switcher, and right panel are absent. [Boundary](coverage.md#L102-L104).                                                                                                                            |
| 27. `data-table`       | `.cinder-table`, `.cinder-column`, `-sort-icon`; RAC rows/cells/resizer; size/state hooks. [CSS](../packages/react/src/styles.css#L1052-L1129)                                                          | **W** Table/Column, **R** collection parts; controlled selection/sort descriptor; column adds indicator; element-union refs. [API](../packages/react/src/collections.tsx#L31-L57), [parts](../packages/react/src/index.ts#L147-L153)                    | Interactive grid navigation and row/column relationships; consumer must implement actual sorting/filtering/pagination. | **I** sample search, sort, selection, pagination, empty state. [I](../tests/browser/interactions.test.ts#L230-L258). Batch actions/expansion/sticky/virtualized behavior are not packaged; exported resizer/DnD parts lack completed dedicated proof.                                                                          |
| 28. `contained-list`   | RAC GridList/GridListItem; hover/selected/focus. [CSS](../packages/react/src/styles.css#L1203-L1225)                                                                                                    | **R** dynamic collection/content and empty-state composition; raw class preservation needed. [Exports](../packages/react/src/index.ts#L162-L163), [example](../apps/docs/src/examples.tsx#L889-L905)                                                    | Interactive grid semantics, not a claim of Carbon's entire contained-list kind/size/action model.                      | **B**. Dedicated selection/action/empty-state journeys are not retained for this page.                                                                                                                                                                                                                                         |
| 29. `structured-list`  | `.cinder-structured-list`, direct `div`, `dt`, `dd`. [CSS](../packages/react/src/styles.css#L1668-L1683)                                                                                                | **N** `dl` props/ref and arbitrary children; styles expect grouped term/value rows. [API](../packages/react/src/content.tsx#L104-L111)                                                                                                                  | Semantic description list, not Carbon's selectable row/cell model.                                                     | **B**. The semantic adaptation is explicit; no selection contract is supplied.                                                                                                                                                                                                                                                 |
| 30. `list`             | `.cinder-list`, list items and sibling rhythm. [CSS](../packages/react/src/styles.css#L1660-L1667)                                                                                                      | **N** discriminated ordered/unordered props and correct native ref types; `start`/`reversed` pass through for ordered lists. [API](../packages/react/src/content.tsx#L92-L102)                                                                          | Native list semantics; caller provides items/nesting.                                                                  | **B** plus source-visible type contract. Coverage mentions a native-prop type fixture, but this audit does not elevate that note to an independently retained test beyond the identified test files. [Coverage note](coverage.md#L78-L78), [test inventory](../.research/cinder-baseline-2026-11-06/inventory.json#L127-L142). |
| 31. `tag`              | `.cinder-tag`, `.cinder-tag-group`, `.cinder-filter-tag`, RAC TagList; size/selected/focus; inline tag variables. [CSS](../packages/react/src/styles.css#L1368-L1422)                                   | **N** static span with ten colors/two sizes; group fixes Label/TagList; **W** FilterTag augments content with remove Button. [Static API](../packages/react/src/content.tsx#L5-L35), [interactive API](../packages/react/src/collections.tsx#L140-L173) | Static text versus RAC removable grid collection; selection/removal distinct.                                          | **I** Delete removes focused tag. [I](../tests/browser/interactions.test.ts#L437-L442). Carbon's complete operational/selectable/dismissible variants are not equivalent to these APIs.                                                                                                                                        |
| 32. `tile`             | `.cinder-tile`. [CSS](../packages/react/src/styles.css#L1655-L1659)                                                                                                                                     | **N** div props/ref, class/style, arbitrary content. [API](../packages/react/src/content.tsx#L85-L90)                                                                                                                                                   | Static container; no built-in interactive role or keyboard behavior.                                                   | **B**. Clickable, expandable, radio, and multiselect tile contracts are absent.                                                                                                                                                                                                                                                |

### Content and feedback — entries 33–40

| Entry                    | CSS hooks                                                                                                                                              | Composition and customization access                                                                                                                                                          | State and accessibility contract                                                                                                                | Actual additional proof / boundary                                                                                                                                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 33. `code-snippet`       | `.cinder-code-snippet`, `pre`, `code`, copy Button and hidden status. [CSS](../packages/react/src/styles.css#L1624-L1653)                              | **Limited**: source string, label/language/copyable/class/maxHeight; fixed code/copy/status anatomy. [API](../packages/react/src/content.tsx#L37-L83)                                         | Focusable/selectable scrollable code; clipboard result announced without replacing the source; English feedback.                                | **I** exact clipboard content and denial; **F** 12/16px code and padding. [I](../tests/browser/interactions.test.ts#L353-L375), [F](../tests/browser/fidelity.test.ts#L175-L189). No syntax-highlighting, inline, or expandable Carbon API.                                      |
| 34. `notification`       | `.cinder-notification`, `-content`, kind/low-contrast, icon and dismiss Button. [CSS](../packages/react/src/styles.css#L1424-L1501)                    | **N** div props/ref with title/content/action/dismiss props; fixed generated icon/content/close arrangement. [API](../packages/react/src/feedback.tsx#L27-L75)                                | Four kinds; `status` role by default, overrideable; optional action does not create Carbon's focus-managing actionable alertdialog.             | **F** four-theme kind/contrast colors, text insets, dismiss targets/focus. [F](../tests/browser/fidelity.test.ts#L250-L278). No dedicated manual announcement/action-focus proof.                                                                                                |
| 35. `toast`              | `.cinder-toast-region`, `.cinder-toast`, RAC ToastContent, title/description slots. [CSS](../packages/react/src/styles.css#L1576-L1622)                | **Limited** provider: children only; `useToast().add/close`; title/description strings, kind and RAC options; fixed region/content/close. [API](../packages/react/src/feedback.tsx#L196-L242) | Experimental RAC queue with three visible toasts; close and live-region behavior rely on upstream components; dismissal label fixed in English. | **I** visibility/dismissal and axe; **F** width/dismiss-height observations. [I](../tests/browser/interactions.test.ts#L429-L435), [F](../tests/browser/fidelity.test.ts#L279-L289). Queue pressure, timing/pause, focus navigation, and manual announcements remain unverified. |
| 36. `progress-bar`       | `.cinder-progress`, `-label`, `-track`, `-fill`; status/indeterminate. [CSS](../packages/react/src/styles.css#L1502-L1529)                             | **W** replacement children, root ref, label/helper/status; default fill width inline. Meter shares the visual parts. [API](../packages/react/src/feedback.tsx#L77-L140)                       | RAC determinate/indeterminate value semantics and formatted text; active/success/error styling.                                                 | **B**. No dedicated dynamic progress/status assertion; full Carbon size/icon/status anatomy is not exposed.                                                                                                                                                                      |
| 37. `progress-indicator` | `.cinder-progress-indicator`, `.cinder-step-marker`, item status/orientation and optional Buttons. [CSS](../packages/react/src/styles.css#L1684-L1745) | **Limited** data-driven steps, callback/orientation/accessible name; no root class/style/ref or item renderer. [API](../packages/react/src/content.tsx#L113-L169)                             | Ordered steps, `aria-current="step"`, hidden state text, disabled step buttons; app owns workflow/validation.                                   | **B**. No dedicated step-change/disabled/announcement test; target geometry and fixed English states need further review.                                                                                                                                                        |
| 38. `loading`            | `.cinder-loading`, `.cinder-spinner`; small/large. [CSS](../packages/react/src/styles.css#L1530-L1548)                                                 | **Limited** label/size/class; no generic style/ref/native props. [API](../packages/react/src/feedback.tsx#L143-L159)                                                                          | `role="status"`, decorative spinner, configurable hidden label.                                                                                 | **B**. Reduced-motion rules exist; standalone status lifecycle and manual announcements are unverified.                                                                                                                                                                          |
| 39. `inline-loading`     | `.cinder-inline-loading`, spinner or status icon; active/success/error. [CSS](../packages/react/src/styles.css#L1549-L1560)                            | **Limited** children and status only; fixed anatomy and no generic root customization. [API](../packages/react/src/feedback.tsx#L160-L175)                                                    | Noninteractive status text; default English loading text can be replaced through children.                                                      | **B**. No inactive-state API or managed timed lifecycle; no dedicated transition/announcement test.                                                                                                                                                                              |
| 40. `skeleton`           | `.cinder-skeleton`, child spans and last-line treatment. [CSS](../packages/react/src/styles.css#L1561-L1575)                                           | **N** root props/ref/style/class with width/height/line count; line spans and dimensions generated. [API](../packages/react/src/feedback.tsx#L176-L194)                                       | Always hidden from accessibility tree; application supplies meaningful loading/content state separately.                                        | **B**. No exhaustive component-specific skeleton compositions or loading-to-content transition test.                                                                                                                                                                             |

### Overlays — entries 41–45

| Entry               | CSS hooks                                                                                                                                                                                                             | Composition and customization access                                                                                                                                       | State and accessibility contract                                                                                                                                                                                    | Actual additional proof / boundary                                                                                                                                                                                                                                                                              |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 41. `modal`         | `.cinder-modal-overlay`, `.cinder-modal`, `.cinder-dialog`, title/close/footer; size/transition states. [CSS](../packages/react/src/styles.css#L850-L918), [mobile CSS](../packages/react/src/styles.css#L1875-L1883) | **Split target** ModalOverlay props versus inner Modal class/ref; Dialog/Heading/Button compose content; four sizes. [API](../packages/react/src/overlays.tsx#L25-L47)     | Named modal dialog, controlled open state/dismissability, focus containment/return, contextual portal attributes.                                                                                                   | **I** save/Escape/focus; **C** four-theme nested RTL/layers; **P** packaged dialog. [I](../tests/browser/interactions.test.ts#L377-L396), [C](../tests/browser/contracts.test.ts#L109-L170), [P](../scripts/verify-package.ts#L151-L156). Full Carbon modal variants and breakpoint parity are not established. |
| 42. `menu`          | RAC Menu/MenuItem/MenuSection/Separator/Keyboard; selected/focused/disabled/submenu states. [CSS](../packages/react/src/styles.css#L770-L848)                                                                         | **R** trigger, menu, items, sections, submenus; Cinder Popover supplies styled surface/theme. [Exports](../packages/react/src/index.ts#L134-L141)                          | Action/selection and keyboard focus through RAC; maintain IDs/textValue and default classes.                                                                                                                        | **I** End/Enter chooses enabled Archive and restores trigger focus. [I](../tests/browser/interactions.test.ts#L398-L408). Full arrow-skipping, submenu, context-menu, and selection combinations are unverified.                                                                                                |
| 43. `overflow-menu` | Icon-only `.cinder-button` plus menu/popover hooks; no separate overflow component block. [Composition](../apps/docs/src/examples.tsx#L650-L684)                                                                      | A labeled Button + MenuTrigger + Popover + Menu recipe, not an exported OverflowMenu wrapper.                                                                              | Same RAC menu semantics; icon-only trigger supplies a name.                                                                                                                                                         | **B**. Shares implementation with the tested Menu example, but its icon-trigger route has no separate retained interaction assertion. No split/combo-button API.                                                                                                                                                |
| 44. `popover`       | `.cinder-popover`; entering/exiting; placement/offset through RAC. [CSS](../packages/react/src/styles.css#L749-L768)                                                                                                  | **W** RAC positioning/open props, class/style/ref/children; theme attributes supplied by bridge. [API](../packages/react/src/overlays.tsx#L17-L23)                         | Demonstrated DialogTrigger/Popover/Dialog is modal by default; it is not Carbon's generic presentational layer. [Example](../apps/docs/src/examples.tsx#L686-L704), [boundary](../packages/react/README.md#L74-L79) | **I** contained setting change/Escape/focus return; **C** nested theme/RTL portal. [I](../tests/browser/interactions.test.ts#L410-L418), [C](../tests/browser/contracts.test.ts#L160-L170). Nonmodal variants/custom containers require their own proof.                                                        |
| 45. `tooltip`       | `.cinder-tooltip`, RAC OverlayArrow with generated SVG, placement-specific rotation. [CSS](../packages/react/src/styles.css#L920-L941)                                                                                | **W** root props/ref and state content; fixed generated arrow; default offset 8 can be overridden; separate RAC trigger. [API](../packages/react/src/overlays.tsx#L49-L68) | Noninteractive description on hover/focus; trigger owns delay; theme/layer/direction forwarded.                                                                                                                     | **I** keyboard focus/Escape and axe; **C** portal attributes. [I](../tests/browser/interactions.test.ts#L420-L427), [C](../tests/browser/contracts.test.ts#L171-L176). Caret/offset fidelity and manual description timing are unverified.                                                                      |

## 5. Accessibility and verification: strength and limits

### 5.1 What the saved results support

The saved browser total is **52 documentation + 18 interaction + 6 contract + 16 fidelity = 92**.
Tests drive Chrome 156 through Playwright in the recorded environment. Most interaction flows
use g100 and reduced motion; built-in portal tests include `ar-AE`. Whole-page g10 and scoped
other-theme axe runs use supported WCAG A/AA rule tags. This is meaningful regression evidence
for those examples, not all combinations of props, states, content, or browsers.
[Environment](verification.md#L83-L96),
[scope](verification.md#L144-L169).

The saved 320px follow-up adds **180 prop-table observations** across four widths and focused
date-canvas keyboard scrolling checks. Its outcome addresses the observed documentation layout
issue. It is not equivalent to browser zoom, text-only zoom, long translated content, or a
general small-screen audit of every open overlay.
[Follow-up](verification.md#L171-L198).

Important assertion-level qualifications:

- The Dropdown test title says typeahead, but the actual single-select sequence is
  **Enter → End → Enter**, with selection/focus assertions. It does not type a search prefix.
  [Assertion](../tests/browser/interactions.test.ts#L138-L150).
- Accordion's journey checks expansion/collapse. It does not attempt to activate the disabled
  example. [Assertion](../tests/browser/interactions.test.ts#L216-L228).
- The Menu journey uses End to focus Archive. It does not walk arrows past every disabled item.
  [Assertion](../tests/browser/interactions.test.ts#L398-L408).
- Slider fidelity presses the pointer on the thumb and checks dragging-state geometry. It does
  not move the pointer across the track and assert a changed value. Keyboard bounds are checked
  separately. [Fidelity](../tests/browser/fidelity.test.ts#L143-L173),
  [keyboard](../tests/browser/interactions.test.ts#L194-L205).
- Contract theme/direction pickers are plain native selects, not NativeSelect wrapper fixtures.
  [Fixture](../tests/fixtures/contracts.tsx#L119-L142).

These are evidence-description qualifications, not newly discovered failures of the controls.
The family matrix uses the narrower descriptions even where existing coverage shorthand or
test titles are broader. [Existing shorthand](coverage.md#L64-L101).

The 46 old `a11y-*.json` artifacts are failure-only historical snapshots. Passing runs do not
delete them. The dated successful aggregate, its matching source hashes, and current assertions
govern the present result. [Artifact explanation](verification.md#L261-L289).

### 5.2 Target size: minimum versus recommendation

**WCAG 2.2 SC 2.5.8, Level AA, uses a 24×24 CSS-pixel minimum**, subject to its spacing,
equivalent-target, inline, user-agent-controlled, and essential exceptions. For an undersized
target, the spacing exception concerns a 24px-diameter circle centered on its bounding box and
overlap with other targets or corresponding circles. It is not a universal requirement for
24px of padding or separation. [W3C minimum guidance][wcag-minimum].

**44×44 CSS pixels is the stronger SC 2.5.5 Level AAA target and a useful touch recommendation**,
with its own exceptions. A future system can choose 44px as a product target, but should not
mislabel it as the WCAG 2.2 AA threshold. [W3C enhanced guidance][wcag-enhanced].

Measure the interactive target, its spacing, and its actual DOM/hit area, not just the icon:

| Current evidence                                                                                                                                   | Correct conclusion                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Checkbox graphic is 16px; default label has padding and a 32px minimum height. [CSS](../packages/react/src/styles.css#L440-L467)                   | Graphic size alone does not establish a target-size failure or success.                                                     |
| Table checkbox padding and minimum height are reduced. [CSS](../packages/react/src/styles.css#L1107-L1110)                                         | The table's actual interactive target and spacing deserve measurement independently of the standalone checkbox.             |
| FilterTag close is styled to a 24px box. [CSS](../packages/react/src/styles.css#L1409-L1414)                                                       | Do not call it a 16px target because its SVG is small; the rendered target still needs contextual checking.                 |
| Progress-step buttons remove minimum height and padding. [CSS](../packages/react/src/styles.css#L1733-L1737)                                       | Measure text-box height, target spacing, and applicable exceptions before declaring conformance.                            |
| Notification dismiss targets measured 48×48px; calendar navigation measured 40px height. [Assertions](../tests/browser/fidelity.test.ts#L268-L299) | These prove named fixture dimensions. They do not prove every interactive target or the full stronger touch recommendation. |
| Slider thumbs paint at 14/20px or 16px. [Assertions](../tests/browser/fidelity.test.ts#L143-L173)                                                  | Painted thumb geometry is not a complete hit-target or alternative-input assessment.                                        |

No new target-size conformance result was produced by this read-only audit.

### 5.3 Localization and manual accessibility gaps

RAC's locale support does not translate Cinder-authored strings. Current fixed English includes:

- Date-picker dialog names: “Choose a date” and “Choose a date range”.
  [Source](../packages/react/src/dates.tsx#L103-L160).
- Inline notification and toast dismissal names.
  [Source](../packages/react/src/feedback.tsx#L62-L70),
  [source](../packages/react/src/feedback.tsx#L224-L232).
- Slider's fallback “Minimum” / “Maximum” names, replaceable through `thumbLabels`.
  [Source](../packages/react/src/selection.tsx#L256-L264).
- File chooser prompt, validation errors, removal names, and “KB”; number formatting uses
  `Intl.NumberFormat(undefined)`, not the Theme locale explicitly.
  [Validation](../packages/react/src/files.tsx#L6-L21),
  [UI](../packages/react/src/files.tsx#L91-L119).
- Pagination labels/counts, clipboard feedback, and ProgressIndicator's hidden status words.
  [Pagination](../packages/react/src/pagination.tsx#L86-L135),
  [clipboard](../packages/react/src/content.tsx#L53-L80),
  [progress](../packages/react/src/content.tsx#L126-L163).

Some strings already have escape routes through label/content props or replacement children;
others, such as Toast's close label and FileUploader's generated prompts, do not. A future
globalization contract must cover both visible and accessible text, pluralization, number/date
formatting, and portalled DOM language.

Forced-colors CSS **does exist**, including system colors and selected/disabled treatments.
Reduced-motion rules also exist. Execution in forced-colors mode is unverified; the presence of
those rules must not be confused with either absence of support or proof of usable contrast and
state differentiation. [CSS](../packages/react/src/styles.css#L1948-L1987),
[verification limits](verification.md#L313-L320).

Manual screen-reader work, Firefox/WebKit, physical touch devices, broad zoom/locale/calendar
coverage, and SSR hydration remain unperformed. Status/alert/toast timing, grid/treegrid reading
and interaction, and focus under customized anatomy particularly need human evaluation. W3C
explicitly states that tools assist evaluation but cannot determine accessibility without
human judgment. [Current scope](verification.md#L313-L320), [W3C][w3c-evaluation].

## 6. Carbon fidelity and the originality boundary

### Resolved at the measured scope

| Area                        | Current evidence to retain                                                                                                                                                                                                                                                                                                                               |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Buttons                     | Ghost spacing, danger/ghost state colors, variant focus, and ghost icon treatment are corrected; all four themes have focused assertions. [Record](coverage.md#L134-L134), [assertions](../tests/browser/fidelity.test.ts#L191-L248).                                                                                                                    |
| Accordion / ContentSwitcher | Density propagates through private contexts; switcher widths/boundaries/end corners are measured. Radio-group behavior remains deliberate. [Record](coverage.md#L135-L135), [assertions](../tests/browser/fidelity.test.ts#L58-L101).                                                                                                                    |
| Notifications               | Inverse support pairs, close targets, text padding/focus, and toast widths are measured. Action content still does not implement ActionableNotification's alertdialog model. [Record](coverage.md#L136-L136), [assertions](../tests/browser/fidelity.test.ts#L250-L289).                                                                                 |
| Calendars                   | Selection/focus colors, width/padding/navigation, and range interior/endpoints are measured. Segmented editing and the one-month default remain adaptations. [Record](coverage.md#L137-L137), [assertions](../tests/browser/fidelity.test.ts#L291-L334).                                                                                                 |
| Toggle / Slider             | Compact toggle dimensions and RTL travel; slider track/thumb active geometry are measured, alongside separate keyboard bounds. [Record](coverage.md#L138-L138), [assertions](../tests/browser/fidelity.test.ts#L103-L173).                                                                                                                               |
| Typography                  | Selected complete structured type objects, compact roles, supporting-text tracking, code metrics/padding, and Mono date-input styling are present. Responsive interpolation remains consumer-owned. [Record](coverage.md#L139-L139), [unit proof](../tests/unit/tokens.test.ts#L100-L110), [browser proof](../tests/browser/fidelity.test.ts#L175-L189). |

### Remaining boundaries

The catalog deliberately diverges from Carbon React in selection value shapes, Switch keys,
ContentSwitcher semantics, grid/treegrid collections, segmented dates, description-list
StructuredList, and modal-default dialog Popover. Missing variants include AI label, Toggletip,
right shell panel, interactive tiles, advanced table patterns, and many fluid/AI-specific
controls. These are **declared scope boundaries**, not regressions created by this audit.
[Coverage](coverage.md#L61-L104), [RAC value models](research-rac.md#L130-L152).

Residual visual topics such as disabled field borders, radio dot/focus geometry, list rhythm,
progress typography/token roles, tree/shell rails, tooltip caret/offset, and modal breakpoints
remain comparison candidates. Source contains the relevant decisions, but this audit did not
produce new paired Carbon/Cinder measurements for them. They must not be presented as newly
verified defects merely because an older crosswalk points at them.
[Fields/radio](../packages/react/src/styles.css#L349-L364),
[radio geometry](../packages/react/src/styles.css#L505-L523),
[list/progress](../packages/react/src/styles.css#L1660-L1745),
[tree](../packages/react/src/styles.css#L1167-L1202),
[shell](../packages/react/src/styles.css#L1810-L1856),
[tooltip](../packages/react/src/overlays.tsx#L49-L65),
[modal](../packages/react/src/styles.css#L850-L889),
[upstream disagreement ledger](research-carbon.md#L903-L937).

For a new original system, a Carbon mismatch is not automatically something to “fix.” The
approved visual contract would first need to say which foundations, density, radius, typography,
and interaction patterns are retained or replaced. Carbon itself describes its system as an
expression of IBM's brand; Cinder's current brief intentionally uses that foundation. A future
independent visual language needs its own coherent decisions and validation rather than an
unexamined mixture of v11, v12 preview, and other systems.
[Carbon identity](../.research/carbon/pages/getting-started/about-carbon/_index.md#L14-L36),
[Cinder constraint](design-direction.md#L75-L85),
[version boundary](research-carbon.md#L161-L182).

## 7. Distribution, licensing, documentation, and governance

### Distribution is already more than a workspace demo

Both libraries have package exports, complete declaration graphs, README/LICENSE/NOTICE files,
and SHA-256-addressed local tarballs. The build externalizes package dependencies, bundles the
component CSS, copies token CSS/JSON, and adds `"use client"` to the React bundle. Packing uses
Bun's package command and records archive bytes/hashes. The external consumer installs outside
the workspace without source aliases and checks declarations with `skipLibCheck=false`.
[Build](../scripts/build.ts#L11-L45), [pack](../scripts/pack.ts#L9-L33),
[consumer isolation](../scripts/verify-package.ts#L61-L108).

| Archive                   | Bytes  | SHA-256                                                            |
| ------------------------- | ------ | ------------------------------------------------------------------ |
| `cinder-tokens-0.1.0.tgz` | 29,624 | `5f810ded6705b6c436d084306bf93e609624801755923d62a785dff051dd67cb` |
| `cinder-react-0.1.0.tgz`  | 64,860 | `de1192fc87291163f06ca594c5abf944a0ca2aa00eb45424987e0e5e68390962` |

The audit's member-level reads confirmed these hashes against the manifest, resolved
workspace/catalog protocols, exported paths, legal files, absence of font binaries, and retention
of `@layer cinder` in the distributed React CSS.
[Audit archive record](../.research/cinder-baseline-2026-11-06/inventory.json#L143-L181).
The saved consumer result additionally records production bundling, token/type metadata,
representative controls, portals, fonts, and no browser errors.
[Saved consumer result](../test-results/package-consumer.json#L1-L52).

Consumers provide fonts; the documentation site bundles Plex separately. Current artifacts are
local, not evidence of registry publication, hosted deployment, CommonJS support, other bundlers,
or server-framework hydration. Broader peer ranges are declarations, not independent runtime
results. [Font/setup contract](../packages/react/README.md#L85-L102),
[distribution scope](verification.md#L313-L323).

### Licensing and independent identity

Cinder's Apache-2.0 NOTICE attributes Carbon-derived tokens, namespace/serialization/layer
changes, Cinder's implementation of Carbon visual rules, external RAC/runtime packages, and
Plex's separate font license. It explicitly identifies Cinder as independent and its naming as
provisional. [NOTICE](../NOTICE#L1-L38).

For redistributed Apache-covered material, the current license requires a license copy,
prominent modified-file notices, retention of applicable source notices, and relevant upstream
NOTICE attribution. It permits additional terms for modifications subject to those conditions.
Its contribution provision does not supply a maintainer/review process, and its trademark clause
does not grant general permission to use upstream marks.
[Redistribution](../LICENSE#L89-L128), [contributions](../LICENSE#L130-L136),
[trademarks](../LICENSE#L138-L141).

Plex carries SIL OFL 1.1 obligations separately, including the reserved name described in the
pinned license research. Site font/runtime licenses are assembled into the site's third-party
license file; package tarballs contain no font binaries. Original branding does not erase the
provenance of retained code, tokens, or assets. Any future imported Uber Base or HeroUI material
needs its own source/version/license accounting in the synthesis; this report establishes only
the Cinder/Carbon baseline.
[Plex provenance](research-carbon.md#L987-L991),
[distribution notices](../NOTICE#L26-L38),
[site legal output](../scripts/build.ts#L63-L66).

### Documentation and Storybook

The existing reference is useful: a live four-theme preview and Reset, anatomy, keyboard notes,
focused prop tables, usage snippets, source links, plus foundations, setup, and research pages.
It also has responsive prop-table and keyboard-scroll follow-ups. The catalog's prop table is
curated data, not generated full API documentation. The code string shown to the reader is
separate from the live ComponentExample implementation, so catalog rendering does not prove
every displayed snippet compiles or stays synchronized.
[Reference](../apps/docs/src/reference.tsx#L97-L211),
[catalog schema](../apps/docs/src/catalog.ts#L3-L15),
[foundations](../apps/docs/src/foundations.tsx#L16-L168),
[responsive proof](verification.md#L171-L198).

The snapshot's targeted tracked-path search found no Storybook configuration or story files.
It also found no `.github/workflows`, CONTRIBUTING/GOVERNANCE/CODEOWNERS/CHANGELOG documents,
`.changeset`, or `adr`/`adrs` directories under the recorded patterns. This is a repository-file
observation, not evidence that the project has no external CI, private governance, or discussions.
Recent history records library/docs completion followed by native Bun tooling and Oxlint.
[Search patterns/results](../.research/cinder-baseline-2026-11-06/inventory.json#L87-L108),
[history](../.research/cinder-baseline-2026-11-06/inventory.json#L8-L12).

Carbon's archived checklist makes useful **reference criteria**, not automatically adopted
Cinder policy:

- Logical component composition, configurable strings, compatibility, deprecation before
  removal, and migration assistance.
  [Checklist](../.research/carbon/pages/getting-started/contributing/component-checklist/_index.md#L48-L56).
- Default and playground Storybook stories, long-form documentation, visual checks, complex-state
  accessibility checks, and manual JAWS/VoiceOver/NVDA testing.
  [Checklist](../.research/carbon/pages/getting-started/contributing/component-checklist/_index.md#L53-L67).
- Explicit draft/preview/stable progression with code, design, documentation, and review
  requirements; naming maintainers and identifying real reuse needs.
  [Lifecycle](../.research/carbon/pages/getting-started/contributing/product-development-lifecycle/_index.md#L36-L114),
  [maintainers](../.research/carbon/pages/getting-started/about-carbon/_index.md#L44-L52).

The transferable lesson is to publish maturity and evidence per component. It does not require
replacing Cinder's Bun/Oxlint/browser tooling with Carbon's Jest/Percy tools, adopting IBM's
internal process, or claiming Carbon's accessibility status transfers to Cinder.
[Carbon's own testing/tool choices](../.research/carbon/pages/getting-started/contributing/component-checklist/_index.md#L58-L67),
[current Cinder gates](../package.json#L24-L38).

## 8. Public compatibility implications

These are consequences to account for **if future changes are approved**, not permission to make
them. The source surfaces and their present verification are established in Sections 2–7.

| Potential change                                             | Consumer-visible contract at stake                                                                                           | Minimum compatibility treatment proposed                                                                                                                          |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rename the package, CSS classes, tokens, or theme attributes | Imports, CSS selectors, JSON keys, `token()` calls, ThemeName values, and embedded documentation links                       | Explicit old-to-new map, migration examples, and an intentional alias/deprecation policy. CSS names are an API even when TypeScript cannot detect their use.      |
| Replace Carbon token values or density/radius/type scales    | Existing semantic meaning, contrast pairs, layouts, truncation, focus rings, hit targets, and fixture geometry               | Approve a complete state/contrast/geometry contract. Preserve roles or document changed meaning; do not use token renaming as a substitute for design validation. |
| Make tokens/layers more overrideable                         | Present unlayered token precedence, contextual resets, `border-subtle` offset, Layer painting and saturation                 | Consumer fixture covering old behavior and new precedence; declare import/layer order and whether custom themes inherit or replace values.                        |
| Add slots or revise anatomy                                  | Labels, help/error associations, native inputs, RAC named slots, collection registration, CSS descendant selectors, and refs | Specify root/part ownership and merge semantics. Prove label/error/focus/ref behavior before changing DOM or replacing generated parts.                           |
| Normalize Modal or NativeSelect root props                   | Current class/style/ref targets are split                                                                                    | Treat retargeting existing props as a behavioral change. Prefer an explicit migration over silently moving a consumer's style or ref.                             |
| Change selection APIs or collection semantics                | Select/ComboBox key arrays, Tabs singular keys, collection sets/`"all"`, controlled/default state, and form values           | Preserve RAC's current contracts or provide a clearly versioned adapter/migration. Do not unify different value models merely for naming consistency.             |
| Expand portal/theming APIs                                   | Named built-in themes currently reconstruct in overlays; scoped custom values and DOM language do not automatically transfer | Define what is inherited, copied, and intentionally overridden, including a consumer-selected container if supported. Test nested themes and focus return.        |
| Upgrade RAC or stabilize Toast                               | Broad peer range plus direct raw exports and experimental Toast dependencies                                                 | Test the promised version range and unstable API boundary; record changed props, DOM, data states, and accessibility behavior.                                    |
| Claim additional bundler/SSR/CSS-tool support                | Current proof is a pinned Bun browser consumer                                                                               | Verify packed artifacts in each newly promised environment, including stylesheet delivery and hydration where claimed.                                            |
| Introduce Storybook or governance                            | Separate example/code implementations, current Experimental flag, and absence of retained story/release-policy files         | Reuse canonical examples, keep user-facing docs, publish maturity/evidence requirements, and avoid an unsynchronized second catalog.                              |

A future original system can keep RAC behavior and static CSS while changing visual foundations.
It still needs a public decision on how much composition and styling freedom is promised. “Any
CSS tool can supply a class” is a narrower claim than “every meaningful part can be independently
restyled or replaced without losing behavior.” The current source supports the former route in
many places and only selected examples of the latter.
[Class contract](../packages/react/README.md#L43-L66),
[anatomy ledger](research-rac.md#L101-L128).

## 9. Proposed acceptance gates — unapproved

The following are research recommendations for evaluating a future candidate. They are not
implementation tasks accepted by this audit, and they do not amend the current design brief.
Each gate needs an approved scope and retained evidence before a broader public claim is made.

### G1. Declare the system and compatibility contract

**Proposed pass condition:** record the original visual direction, retained behavior, supported
families/variants, package/version policy, and which Carbon v11 decisions intentionally change.
List absent and experimental patterns. Account for every existing public export, class/token
family, theme name, value model, and ref target affected by the candidate. A visual resemblance
to an upstream component is not the acceptance criterion.

**Evidence:** approved decision and migration matrix; updated per-family scope; source/version
and license provenance for borrowed material. Baseline inputs are the current
[brief](design-direction.md#L75-L85), [crosswalk](coverage.md#L57-L104), and
[public barrel](../packages/react/src/index.ts#L1-L207).

### G2. Prove CSS-tool interoperability and containment

**Proposed pass condition:** consume packed artifacts from independent fixtures using plain CSS,
CSS Modules, a utility stylesheet such as Tailwind, and a selected CSS-in-JS approach if those
are promised integrations. Change a root, a state, an inner part, and a portalled surface in
each. Document raw RAC class preservation, cascade/import order, and which inline or important
rules are intentional. Verify that unrelated `[data-size]`, `[data-kind]`, and raw RAC components
do not receive unexpected styles under the approved scoping contract.

**Evidence:** computed-style and interaction assertions against packed CSS, plus readable
consumer examples. Include token overrides on the same theme root and inside nested themes;
passing a custom Button class alone is insufficient. Existing constraints are in
[CSS scope](../packages/react/src/styles.css#L6-L50),
[token emission](../packages/tokens/scripts/generate.ts#L125-L138), and
[class guidance](../packages/react/README.md#L53-L56).

### G3. Make root and part customization consistent

**Proposed pass condition:** every claimed customizable component documents where class, style,
ref, render, and children land; every meaningful generated part is either reachable through the
approved API or explicitly fixed. Test representative difficult cases: TextField help/error,
Select trigger/value/popover, Modal overlay/content, TagGroup removal, Toast region/close, and
ProgressIndicator steps. Preserve RAC props, events, slots, labels, and native element identity.

**Evidence:** public types, anatomy documentation, and focused keyboard/ref/accessible-name
checks. Tests should exercise consumer-authored compositions rather than only default wrappers.
The existing [custom field proof](../tests/browser/contracts.test.ts#L48-L74) is a starting point;
the [fixed and split wrappers](research-rac.md#L101-L128) identify the gaps.

### G4. Define original tokens, responsive type, and density

**Proposed pass condition:** distinguish public semantic tokens, component tokens, and private
implementation variables; define the candidate's brand and contrast pairs in all supported
themes. State whether responsive type is generated CSS, structured data for consumers, or both.
Document sparse-breakpoint application and allowed density/target-size combinations. Approve
each changed visual role rather than mechanically substituting another palette.

**Evidence:** token schema/API and migration table, selected complete-object parity where
upstream data is retained, computed responsive type/geometry checks, and contrast/state review.
The baseline has [313/191/36 entries](../packages/tokens/README.md#L33-L54), not a ready-made
multi-brand theme contract.

### G5. Carry theme and locale through real compositions

**Proposed pass condition:** nested themes, saturated layers, RTL, custom scoped tokens, fonts,
and the approved DOM-language behavior remain correct in Modal, nested Popover, Tooltip, date
popover, and Toast. Localize every Cinder-authored visible and accessible string through the
chosen contract. Test number/file-size/date formatting against that locale and exercise long
translations. Define behavior for mixed providers and custom portal containers if supported.

**Evidence:** computed styles and DOM attributes in detached roots, controlled value assertions,
focus-return tests, and manual language/announcement checks. Retain the existing four-theme
[portal assertions](../tests/browser/contracts.test.ts#L109-L176) while extending their scope.

### G6. Verify accessibility beyond initial axe scans

**Proposed pass condition:** retain automated checks and add the candidate's documented
hover/focus/pressed/selected/mixed/disabled/read-only/invalid/pending/open/empty/loading states
where applicable. Exercise keyboard traversal and escape routes, actual pointer value changes,
touch input, focus visibility/obscuring, forced colors, reduced motion, zoom/reflow, long content,
and required locales. Measure SC 2.5.8 targets and any claimed exceptions; record the stronger
44px touch policy separately if adopted.

**Evidence:** named browser/device/AT combinations, dated manual results, measurements, and
known exceptions. Manual VoiceOver/Safari and NVDA/Firefox or Chrome are useful candidate
pairings; add JAWS or other combinations when included in the support promise. At minimum,
include validation, grid/treegrid, dialog nesting, tooltip descriptions, and live/toast
announcements. These are proposed pairings, not tests already performed.
[W3C minimum][wcag-minimum], [enhanced][wcag-enhanced],
[manual evaluation requirement][w3c-evaluation].

### G7. Establish intentional visual regression coverage

**Proposed pass condition:** an approved spec or candidate baseline identifies expected geometry,
type, state precedence, theme/layer combinations, responsive behavior, and target sizes. Retained
Carbon behavior continues to pass its focused checks; intentional departures receive new
expectations with a documented rationale. Resolve upstream page/source/version disagreements
before using them as an oracle.

**Evidence:** focused measurements and reviewed visual comparisons for the affected families,
including the residual candidates in Section 6. Broad screenshot coverage is useful only when
the expected design and review ownership are clear. Existing
[fidelity assertions](../tests/browser/fidelity.test.ts#L58-L335) supply regression anchors.

### G8. Publish reproducible examples and honest maturity

**Proposed pass condition:** all 45 retained families have a default example, meaningful states,
composition/customization examples, accessible naming/keyboard guidance, full API access, and
explicit scope/status. Verify displayed snippets, not just the separate live implementation.
If Storybook is adopted, provide default/playground and important-state stories from shared
examples; retain the website's long-form usage and source context.

**Evidence:** example/slug parity, snippet compilation, linked source/type references, story or
equivalent state inventory, and dated automated/manual evidence. Distinguish “implemented,”
“automatically checked,” “manually checked,” and “experimental.” The current
[catalog schema](../apps/docs/src/catalog.ts#L3-L15) and
[reference renderer](../apps/docs/src/reference.tsx#L136-L211) make the synchronization need clear.

### G9. Retain package and supported-runtime proof

**Proposed pass condition:** regenerate/build/pack through the established stable Bun/Oxlint
pipeline when implementation work is approved; install archives independently, resolve all
package protocols and declaration paths, load CSS/tokens/fonts, and exercise representative
behavior. Test any newly promised peer, bundler, SSR/hydration, or CSS-tool combination. Explicitly
track the experimental Toast upstream dependency.

**Evidence:** immutable source/archive hashes, strict external-consumer results, stylesheet
layer/export inspection, and a named compatibility matrix. Preserve the useful guarantees in
the [existing consumer check](../scripts/verify-package.ts#L27-L181); do not replace package proof
with source-alias-only fixtures.

### G10. Define maintenance, releases, and provenance

**Proposed pass condition:** name component/contract owners, contribution and review expectations,
release/deprecation rules, migration responsibilities, and the distinction between draft,
preview, and stable. Changes to public CSS/DOM/token contracts need release communication as
well as TypeScript API changes. Retain license/NOTICE and modification provenance for shipped
materials and preserve separate font obligations.

**Evidence:** a lightweight published policy, review/release records, migration examples, and
archive-level legal-file checks. Carbon's
[composition/stability checklist](../.research/carbon/pages/getting-started/contributing/component-checklist/_index.md#L48-L67)
and [lifecycle](../.research/carbon/pages/getting-started/contributing/product-development-lifecycle/_index.md#L122-L153)
are references; adopting a Cinder-specific process remains unapproved.

## 10. Handoff to synthesis

The baseline supports retaining **RAC behavior, explicit static CSS, semantic token generation,
contextual layers, and isolated package verification**. It supplies 45 real documented examples
and concrete interaction/fidelity anchors. A future design-system proposal should concentrate
on the public styling/part contract, original token and visual decisions, locale/portal
inheritance, and evidence-backed maturity rather than assuming those capabilities follow from
the catalog count.

The decisions still needed from synthesis are:

1. How much of Carbon's current visual identity is retained, and which changes define the new
   original system?
2. Does “CSS freedom” promise class attachment only, stable part-level styling, full anatomy
   replacement, or a supported unstyled mode? Which integrations are actually promised?
3. Which names, values, DOM/ref targets, and behaviors require backward compatibility with
   provisional Cinder 0.1.0 consumers?
4. What custom-theme, portal-container, locale, responsive-type, and density contracts belong in
   the public API?
5. Which families and variants are required for the first candidate, and what browser/device/AT
   evidence is required before each is called stable?

**Audit boundary:** source inspection, archived primary sources, saved-result reconciliation,
and tarball member inspection establish this report. CSS-tool interoperability, broader
browser/AT/locale coverage, SSR hydration, and residual paired visual comparisons remain
unverified. The report does not approve or implement the proposed redesign.

[wcag-minimum]: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
[wcag-enhanced]: https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html
[w3c-evaluation]: https://www.w3.org/WAI/test-evaluate/tools/selecting/#cannot
[css-cascade]: https://www.w3.org/TR/css-cascade-5/
