# Cinder 0.1.0 — verification

**Latest work: [Frame Phase 1](#frame-phase-1), passed, 6 November 2026.**
The foundation, compatibility, installed-package, and rendered-review gates pass.
The results below combine scoped runs; the latest aggregate remains the Relay run.

**Latest aggregate: passed, 6 November 2026, 16:31:13–16:33:38 UTC.**
The historical [Relay follow-up](#relay-follow-up) verifies its first light/dark
component slice, production gallery, and distributed packages.

**Implementation baseline: passed, 6 November 2026, 01:40:02–01:42:01 UTC.**
`bun run check` completed formatting, TypeScript, **12 unit tests with 129 expect
calls**, the production build, **92 browser tests**, package packing, and an
isolated tarball consumer. All **69 recorded source/configuration files** retained
their SHA-256 values throughout the run.

The local site is **http://127.0.0.1:3000**, with Relay at **/relay**. The source and packages
are Cinder's provisional **0.1.0**, with the working package scope `@cinder`.
See [implementation coverage](coverage.md) for the family-by-family boundaries
and [visual review](visual-review.md) for the screenshot assessment.

## Frame actions — Phase 2 first batch

This batch covers the private Storybook workspace, Button, and Link. Its scope is
documented in [coverage](coverage.md#frame-actions--phase-2-first-batch) and the
[public action contract](../packages/react/README.md#button-and-link).
The full fourteen-entry Frame slice remains in progress.

The component examples use four core Button choices and the three existing
compatibility values. RTL examples use Persian (`fa-IR`) and Arabic (`ar`) through
real locale providers. The packed-consumer locale-change case uses Persian.

Final integrated builds, browser execution, and rendered review are in progress.

### Repairs and retained history

The [original Storybook gate](../test-results/frame-actions-storybook-tests.log)
recorded **34 passes and 8 failures**: four play functions failed in both themes.
The repairs are confined to story assertions and input state, not the packaged
Button/Link implementation or appearance:

- Every action play uses Storybook's supplied stateful `userEvent`, retaining held
  keys and pointer buttons across calls. Assertions check no premature activation,
  activation on release, and restored pressed classes/styles.
- Link Enter navigation is proved by a fresh fragment change and destination
  focus. Native fragment focus can cancel RAC's keyup press callback; an
  unconditional second `onPress` count is not the navigation contract. Pointer
  callback counting remains checked separately.
- Link's customization checks the authored `0.3em` inline offset and its computed
  pixel value separately. At the rendered 14px font size, the correct value is
  **4.2px**, not the literal `0.3em` string expected by the original matcher.

The [watcher diagnosis](../test-results/frame-actions-watcher-repair-2026-11-07.json)
found that macOS's `/var` alias and Vite's canonical `/private/var` root disagreed
with the fixture filesystem allowlist. Canonicalizing only the temporary fixture
root preserves strict filesystem access, the exact missing-stylesheet assertion,
and the stylesheet-restoration check. Three focused repetitions passed **3 tests /
17 assertions** each; three aggregate repetitions passed **25 tests / 1,976
assertions** each. The production watcher is unchanged.

The native runner scopes action queries to `#storybook-root`, rather than
Storybook's hidden controls. In agent-browser **0.41.2**, integer mouse coordinates
and a literal space produce the intended native input; fractional coordinates
are rejected and the `Space` alias emits an empty key. The
[expanded pre-rebuild pass](../test-results/frame-actions-native-expanded-before-static-rebuild-2026-11-07.json)
is retained separately from the final-build proof.

The [original rendered report](../test-results/frame-actions-render-2026-11-06/report.json)
and all **48 captures** remain unchanged, including their original pending review
markers and two disabled-Link measurement failures. RAC's disabled
`<span role="link" aria-disabled="true">` may retain an inert `href`; requiring
its absence was a harness error. The
[supplemental validator replay](../test-results/frame-actions-render-reconciliation-2026-11-07.json)
passes all 48 retained observations and six negative semantics checks, without
rewriting the report. Native blocked activation and skipped Tab order are proved
separately.

## Frame Phase 1

Phase 1 implements reusable Frame foundations and public styling contracts. The
representative installed composition is **Button, TextField, and Select inside a
Dialog**. The complete fourteen-entry Frame slice and its default guidance/recovery
anatomy remain [Phase 2](component-library-plan.md#phase-2--first-complete-frame-slice).

### Executed gates

| Gate                      | Result and scope                                                                                                                                                 |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tokens                    | Eight generated themes; deterministic output; all six legacy theme maps, 191 global foundations, and 36 structured typography definitions unchanged              |
| Unit tests                | **22 passed, 1,945 assertions** across two files                                                                                                                 |
| Focused browser contracts | **44 passed**: 17 consumer contracts and 27 fidelity cases                                                                                                       |
| Full browser suite        | **126 passed** across five files, including existing Carbon and Relay coverage                                                                                   |
| Workspace types and lint  | **53 files** typechecked; [typecheck output](../test-results/frame-phase1-typecheck.log) and [Oxlint output](../test-results/frame-phase1-lint.log) passed       |
| Formatting and whitespace | Final workspace formatting and `git diff --check` passed; [scoped completion record](../test-results/frame-phase1-final.json) includes local documentation links |
| Production build          | Both packages, declarations, generated CSS/JSON, and the documentation build passed                                                                              |
| Installed consumers       | Native CSS, compiled Bun CSS Modules, and pinned Tailwind **4.3.5** passed installation, strict declaration checking, production bundling, and browser contracts |
| README installation       | Exact tarball commands, both optional font commands, and all three TSX snippets passed strict declaration checking and bundling in another isolated app          |

The six legacy hashes are asserted directly in
[`tests/unit/tokens.test.ts`](../tests/unit/tokens.test.ts); the regression tests
do not depend on an ignored research capture. Both Frame maps contain **343
entries**, including **25 Frame-owned foundation overrides**. Frame's scalable
default is 44px for ordinary controls; explicit `sm/md/lg` is 32/44/48px and
Button `xl/2xl` remains 64/80px. The public mapping is documented in the
[token package](../packages/tokens/README.md#working-typography-font-scope-and-geometry).

### Installed styling and behavior

The [consumer record](../test-results/frame-phase1-package-consumer.json), completed at
**21:20:03 UTC**, and
[final command output](../test-results/frame-phase1-package.log) identify the
archives and executed checks. The
[fixture guide](../tests/fixtures/consumer/README.md) documents repeatable commands.
The two apps are installed outside the repository, with no Cinder workspace links
or TypeScript path aliases; both use `strict: true` and `skipLibCheck: false`.

- Plain CSS and a real CSS Module exercise root, part, state, font, token, and
  detached-overlay overrides. Default and custom-composed fields retain native
  values, accessible relationships, class callbacks, and root/control refs.
- The Tailwind app installs both `tailwindcss` and `@tailwindcss/cli` at **4.3.5**.
  Real preflight runs before Cinder; generated utilities run after it. A corner
  utility and padding utility beat normal Cinder rules. Tailwind remains confined
  to the consumer's build dependencies.
- Light/dark and nested Frame → Carbon → Frame boundaries preserve their type and
  size owners. Document-level font, size, and type overrides reach Carbon while
  Frame retains its own defaults. Direct appearance recipes win on their roots.
- Dialog → Select carries theme, layer, language, direction, and portable
  appearance. Live theme/locale changes and inherited/replaced/cleared recipes
  update open portals. Ordinary root classes, styles, and IDs remain local.
- Modal's outer/inner classes, styles, and refs reach their documented elements.
  Rich Select options retain names/descriptions, disabled-option skipping, selected
  keys, inner-first Escape, and focus return.
- Unrelated raw RAC controls outside a Cinder boundary retain their host-owned
  styling. Frame action/focus precedence passes Chromium-emulated forced colors.

Integration found and resolved two product-level defects: Bun had inlined theme
rules before the layer-order declaration, and raw-part disabled labels missed the
Frame disabled override. The first imported `layers.css` now establishes order;
raw and default-owned field parts receive consistent disabled treatment. Frame
typography rules consume their public weight, size, and tracking variables.

The custom consumer's validation recovery also exposed a fixture layout shift:
removing an error on blur moved the submit button between pointer-down and
pointer-up. Its concise error now occupies a reserved feedback row. The verifier
still requires a real corrected pointer submission. The forced-color probe now
inherits the tested Theme's color scheme, and Tailwind verification checks emitted
utilities and browser precedence rather than an optimizer-specific layer string.

### Rendered review

The [rendered record](../test-results/frame-phase1-rendered.json) and
[output](../test-results/frame-phase1-rendered.log), completed at **21:26:23 UTC**,
cover the retained final native/CSS Modules and Tailwind builds. Tooling:
**agent-browser 0.41.2**, **Chrome for Testing 157.0.8103.38**, and its embedded
**axe 4.12.1**. Font readiness and reduced motion were set before capture.

All **42 captures were inspected**, including full-resolution sections of the tall
narrow pages. No material visual defects remained in the reviewed composition:

- **16 page captures:** both integrations and both Frame themes at **1440×1000,
  768×1000, 390×844, and 320×844**. Both plain-CSS and CSS-Module recipes appear in
  each page. Controls stack cleanly, labels and values remain readable, and nested
  Frame/Carbon boundaries retain their intended type and geometry.
- **22 overlay captures:** the plain-CSS dialog and nested Select at 1440 and 320px
  in both integrations/themes; the CSS-Module dialog/Select at 320px in both themes;
  and a dark, 320px Hebrew-provider RTL dialog/Select. Dialogs and menus fit the
  viewport, longer option descriptions remain visible, and focus stays distinct
  from borders and selection. The RTL check uses the real provider with English
  fixture copy; it does not establish translation quality.
- **4 invalid-field captures:** both custom recipes at 320px in light/dark. Guidance,
  invalid state, focus, and recovery remain readable together. Across all sizes and
  integrations, **32 corrected pointer submissions passed with 0px submit-action
  movement**. Tab remained inside the dialog; selection, inner-first Escape, and
  focus return passed. The record contains 106 observations and no browser errors.

Representative images: [narrow invalid field](../test-results/frame-phase1-native-320-light-plain-invalid.png),
[CSS-Module Select](../test-results/frame-phase1-native-320-dark-module-select.png),
[Tailwind tablet](../test-results/frame-phase1-tailwind-768-dark-page.png), and
[RTL nested Select](../test-results/frame-phase1-native-320-dark-rtl-select.png).

All **42 axe audits reported zero violations**. Eleven dialog audits retained a
`color-contrast` incomplete result, covering **20 reported node occurrences**;
axe could not determine the background because of overlapping elements. Every
target was reviewed in its rendered state. The
[contrast follow-up](../test-results/frame-phase1-contrast-review.json) confirms
unobscured text rectangles, an opaque modal background, and no intervening opacity,
image, blend, or filter effects. All 20 text pairs exceed 4.5:1; the lowest is
**5.08:1**. The original incomplete results remain in the raw evidence.

The initial fixture scan also led to a named `group` for appearance controls and
host-owned 24px minimum targets for unrelated raw buttons. These fixes are included
in the final installed-consumer pass. Screenshot, keyboard, and automated checks
establish this specific foundation scope; the remaining human/device checks are
listed below.

### Distribution cost and boundary

| Distributed React CSS  |                      Size |
| ---------------------- | ------------------------: |
| Before Phase 1         |             173,342 bytes |
| With Frame foundations |         **225,620 bytes** |
| Increase               | **52,278 bytes / 30.16%** |
| Current gzip           |          **22,041 bytes** |

CSS SHA-256:
`c8c1dc98141a028a36a13ec579fd1019dc824a5eb965fffb22792a25d37c10d5`.
The added theme maps, boundary aliases, and appearance rules stay in the same
prebuilt stylesheet. No styling engine or runtime dependency was added.

This proof covers foundation contracts, not complete Frame catalog parity.
Manual screen-reader work, Firefox/WebKit, physical devices, real IME and
translation, representative-user evaluation, text resizing, zoom/reflow, and SSR/hydration
remain outstanding. Figma follows the completed library and release proof in
[Phase 7](component-library-plan.md#phase-7--figma-last).

## Relay follow-up

The [aggregate record](../test-results/check-relay.json) and
[output](../test-results/check-relay.log) record the complete `bun run check`:

| Gate                          | Result                                                                                         |
| ----------------------------- | ---------------------------------------------------------------------------------------------- |
| Formatting and Oxlint         | Passed; 95 formatted files, no lint findings                                                   |
| Native type checking          | Passed; 50 files                                                                               |
| Unit tests                    | 14 passed, 792 expect calls                                                                    |
| Production build              | Both libraries, declarations, CSS/JSON, and 15 documentation assets                            |
| Browser tests                 | 106 passed across five files, including 11 Relay cases                                         |
| Packing and isolated consumer | Passed for both tarballs; strict declarations, production bundle, fonts, and browser contracts |

The [Relay specification](relay.md) defines the implemented family scope. The new
browser cases exercise seven Button variants, pointer/keyboard states, three core
heights, pending repeat prevention and stable geometry, field validation/recovery,
read-only selection, selection controls, and a Dialog with a nested Select portal.
Theme, layer, locale, and nested-theme boundaries are checked by the expanded
consumer-contract suite. Existing Carbon documentation, interaction, and fidelity
checks also pass after the shared CSS changes.

### Accessibility and responsive evidence

- Whole-page axe scans run in both Relay themes at 1440 and 390px. The invalid
  dialog and its open Select receive desktop scans; dialog and Select are also
  scanned at 390px. The configured tags cover supported WCAG 2/2.1/2.2 A/AA rules.
- The described Select options retain separate accessible names and descriptions.
  Axe 4.14 reports `label-content-name-mismatch` for this RAC pattern. The helper
  first asserts each option's exact name and description, then filters only that
  rule when **every reported target** is an exact ID selector for one of those
  verified options. All other rules and targets remain enforced.
- Pending names use Chrome's `Accessibility.getFullAXTree`, which includes the
  embedded progress label: **“Save changes Saving”**. The progressbar is separately
  named “Saving”. The DOM-based name calculation omits that embedded label.
- Document overflow is checked at 1440, 768, 390, and 320px in both themes. Open
  dialog and Select bounds fit at 768, 390, and 320px. Escape closes the Select
  before the dialog and restores focus at each step; Tab remains trapped in the
  dialog. Reduced-motion and Chromium-emulated forced-colors cases pass.
- The [computed-state contrast probe](../test-results/relay-contrast.json) passed
  **132 observations**, including the inert specimens omitted from axe's tree.
  Enabled text is checked against 4.5:1; progress, focus, and interactive field
  borders against 3:1. Disabled controls are exempt. The lowest text ratio is
  **5.77:1**, progress **5.97:1**, focus **7.46:1**, and field border **3.43:1**.

### Rendered review and installation

All **24 fresh captures** were opened and reviewed: page, fields, dialog, and
described Select at **1440×1000, 768×1000, and 390×844**, in light and dark.
The [capture log](../test-results/relay-visual-capture.log) records font readiness
and reduced motion. Files use `relay-{desktop,tablet,mobile}-{light,dark}.png`
and the same names with `fields-`, `dialog-`, or `select-` before the theme.
The [mobile fields](../test-results/relay-mobile-fields-light.png),
[tablet dialog](../test-results/relay-tablet-dialog-dark.png), and
[mobile Select](../test-results/relay-mobile-select-dark.png) show the responsive
stacking, preserved focus treatment, and distinct option labels/descriptions.
Comparison tables scroll locally; the mobile Select opens above its trigger.
No further visual defects were found in these captures. Impeccable's mechanical
scan of the Relay gallery, both Relay stylesheets, and Button source returned no
findings.

The installed-package consumer in the [Relay aggregate](../test-results/check-relay.log), completed
at **16:33:37 UTC**, verifies both Relay themes, corner tokens, pending labels,
Plex faces including weight 500, and Select inside a themed dialog. The separate
[README installation check](../test-results/readme-install-before-frame.json) and
[output](../test-results/readme-install-relay.log) also pass using the exact
tarball/font commands and every root README TSX snippet. Final documentation
formatting and local links are recorded in
[the documentation check](../test-results/docs-relay.json).

## Oxlint follow-up

**Passed, 6 November 2026, 09:03:25–09:05:29 UTC**, before the Relay slice.

The workspace pins **Oxlint 1.91.0** on stable **Bun 1.4.4**. `bun run lint` checks
source files, `bun run lint:fix` applies safe fixes, and the aggregate runs lint
between formatting and type checking. The [tooling notes](research-bun.md#oxlint-on-stable-bun)
explain the rules, exclusions, and intentional accessibility settings.

- The [aggregate record](../test-results/check-oxlint.json) and
  [output](../test-results/check-oxlint.log) show formatting, lint, **42-file native
  type checking**, **12 unit tests / 129 expect calls**, **92 browser tests**, the
  build, packing, and the external consumer passing. All **70 recorded
  source/configuration hashes**, including `.oxlintrc.json`, stayed stable during
  the run. Both package archives matched the implementation baseline.
- The [lint proof](../test-results/oxlint.json) records **44 files / 162 rules**
  with zero findings. Temporary fixtures verified that both hook rules, unused
  variables, unassociated labels, autofocus outside dialogs, and inappropriate
  tabindex/role attributes are rejected. Dialog focus, keyboard-scroll targets,
  responsive table roles, rest-prop omission, and status regions are accepted.
- A deliberate lint error stopped the aggregate before type checking. A warning
  alone also caused failure, and `lint:fix` corrected a safely fixable regex.
  All temporary fixtures were removed. Frozen installation checked **54 installs
  across 100 packages**, with no changes and identical lockfile bytes.
- The [README installation check](../test-results/readme-install-before-relay.json),
  [fresh preview check](../test-results/preview-oxlint.json), and
  [documentation check](../test-results/docs-oxlint.json) capture the updated
  instructions, built-file delivery, formatting, and local links.

Oxlint's type-aware mode is not enabled. This lint pass complements the existing
type and browser checks; manual audit scope remains listed below.

## Stable native-tooling follow-up

**Passed, 6 November 2026, 08:36:49–08:38:52 UTC**, before Oxlint was added.

The workspace uses stable **Bun 1.4.4**. `format` runs `bun fmt`, `format:check`
runs `bun fmt --check`, and `typecheck` runs
`bun check --no-script -p tsconfig.json`. The formatter options and exclusions are
in `bunfig.toml`; the Prettier dependency and separate config files were removed.
TypeScript supplies declaration emission and independent consumer checks.

- The [aggregate record](../test-results/check-native-tooling.json) and
  [output](../test-results/check-native-tooling.log) show **12 unit tests / 129
  expect calls**, **92 browser tests**, the production build, packing, and the
  external consumer passing. All **69 recorded source/configuration hashes**
  stayed stable during this run. Both tarballs matched the implementation-baseline
  hashes in the [retained consumer record](../test-results/package-consumer-before-native-tooling.json).
- The [migration proof](../test-results/native-tooling.json) verifies the original
  formatter options, ignore patterns, two generated Carbon blocks, and unchanged
  hashes for 125 application/evidence files. `bun fmt --doctor` reports **70 native
  files**; formatting changed zero files and `--debug-check` passed.
- Native type checking passed on **42 files**. Both it and `tsc` rejected the same
  deliberate `TS2322` in an included temporary file, which was removed afterward.
- Frozen installation passed with **52 installs across 80 packages** and an
  unchanged lockfile. The Carbon offline provenance validator also passed after
  updating its formatter instructions.
- The [README installation check](../test-results/readme-install-before-oxlint.json) passed at
  **08:39:32 UTC**, using the updated README's exact commands and TSX snippets.
- The [preview delivery check](../test-results/preview-native-tooling.json) compares
  the restarted preview's routes and all site assets with the build. The
  [documentation check](../test-results/docs-native-tooling.json) records final
  formatting and local-link verification after these notes were updated.

This earlier run did not include linting. Native `bun lint` worked in the tested
canary but was unavailable in stable 1.4.4; the
[Bun notes](research-bun.md#native-lint-availability) retain that availability probe.
The later Oxlint follow-up above supplies the workspace lint gate.

## Environment and evidence identity

| Item                            | Verified value                                                               |
| ------------------------------- | ---------------------------------------------------------------------------- |
| Platform                        | macOS 27.2, arm64                                                            |
| Bun                             | 1.4.4, revision `38afee6c8`                                                  |
| TypeScript                      | 7.0.2                                                                        |
| Oxlint                          | 1.91.0, added in the Oxlint follow-up                                        |
| React / React DOM               | 19.3.1                                                                       |
| RAC                             | 1.22.1                                                                       |
| `@internationalized/date`       | 3.12.4                                                                       |
| Implementation-baseline browser | Chrome 156.0.8078.80, driven through Playwright                              |
| Standard browser locale         | `en-US`; dedicated portal/direction cases use `ar-AE`                        |
| Temporary external apps         | `CINDER_TEST_TMPDIR` under the harness-approved OpenCode temporary directory |

The [implementation-baseline record](../test-results/check.json) contains the command, timestamps,
exit status, platform, source hashes, and an empty `sourcesChangedDuringRun` list.
The [captured output](../test-results/check.log) records the executed gates.
[Baseline delivery reconciliation](../test-results/final-artifacts.json) ties that snapshot's
sources, tarballs, emitted site files, screenshots, and final documents to their
hashes. The final reports were added after the aggregate; their formatting and
local links have a separate [documentation check](../test-results/final-docs-check.json).

## Implementation-baseline gates

| Command or check                        | Result                  | Evidence / scope                                                                                                                                            |
| --------------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bun install --frozen-lockfile`         | Passed                  | [Record](../test-results/frozen-install.json), [output](../test-results/frozen-install.log); 53 installs across 81 packages, no changes, unchanged lockfile |
| `bun run format:check`                  | Passed                  | Aggregate plus the final documentation check                                                                                                                |
| `bun run typecheck`                     | Passed                  | Strict workspace `tsc --noEmit`, including API type fixtures                                                                                                |
| `bun run test`                          | 12 passed               | Two unit files, 129 expect calls                                                                                                                            |
| `bun run build`                         | Passed                  | Both ESM libraries, declaration graphs, CSS/token JSON, and 13 emitted documentation assets; three legal files are copied separately                        |
| `bun run test:browser`                  | 92 passed               | Four files; the current expanded browser scope is detailed below                                                                                            |
| `bun scripts/pack.ts`                   | Passed                  | Two local archives; [retained baseline hashes](../test-results/package-consumer-before-native-tooling.json)                                                 |
| `bun run test:package`                  | Passed                  | Strict external consumer, production bundle, decoded fonts, and browser contracts                                                                           |
| `bun .research/verify-readme.ts`        | Passed at 01:46:36 UTC  | Exact README installation commands and verbatim TSX snippets in another external app                                                                        |
| `python3 .research/verify-doc-links.py` | Passed                  | Root/package READMEs, all `docs/` Markdown, and the artifact guide; [saved baseline result](../test-results/final-docs-check.json)                          |
| Catalog source-link audit               | 67 distinct URLs passed | [Response records](../.research/catalog-links.json), captured at 00:26:19 UTC                                                                               |
| Final rendered inspections              | Completed               | Seven homepage and six reference images opened and reviewed; [results and exceptions](visual-review.md)                                                     |

The documented package commands can be repeated with `bun run pack`. The complete
aggregate can be repeated with `bun run check`; Chrome is the browser-suite default,
and `PLAYWRIGHT_CHANNEL` selects an installed alternative channel.

## What the tests prove

### Unit and type checks

[Unit tests](../tests/unit/) cover selected official Carbon semantic/component
colors in all four Carbon themes, Relay and Frame contracts and selected contrast
pairs, unchanged legacy hashes, scoped Frame foundations, consistent token key
sets, spacing/type/motion samples,
layer saturation, theme-name validation, literal CSS variable references,
structured typography serialization, pagination normalization, and file acceptance.
The structured-type assertions compare full selected objects, including sparse
breakpoint overrides, with the pinned Carbon package.

There are **313 entries per Carbon theme**, **318 per Relay theme**, **343 per Frame
theme**, **191 scalar foundations**, and **36 selected structured type definitions**.
Relay adds five geometry/focus roles; Frame also owns 25 foundation overrides.
The scalar values are base values. Responsive type
changes and fluid interpolation remain application-owned. The tests sample
upstream values and selected structured objects; the catalog count does not imply
an exhaustive pixel comparison.

### Browser tests: 53 + 18 + 17 + 27 + 11 = 126

| File                                                     | Tests | Exercised behavior                                                                                                                                                                                                                       |
| -------------------------------------------------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Documentation](../tests/browser/docs.test.ts)           | 53    | Six principal routes, production motion/reduced motion, preview-server behavior, and every one of the 45 catalog entries                                                                                                                 |
| [Interactions](../tests/browser/interactions.test.ts)    | 18    | Keyboard activation/selection, invalid and corrected form submission, search, collections, bounded values, date/time changes, clipboard success/denial, file selection/native mixed-file drop, overlays, navigation, and persisted theme |
| [Consumer contracts](../tests/browser/contracts.test.ts) | 17    | Refs/render props, controlled fields and collections, eight themes, live appearance/language on four portal families, nested boundaries, and Modal part targets                                                                          |
| [Fidelity](../tests/browser/fidelity.test.ts)            | 27    | Shared field anatomy, values/refs, Carbon size/state contracts, Frame default/explicit sizes, typography overrides, raw disabled/invalid fields, and forced colors                                                                       |
| [Relay](../tests/browser/relay.test.ts)                  | 11    | Button/field states and sizes, selection, validation/recovery, nested overlays, accessible names, token overrides, responsive bounds, reduced motion, forced colors, and route theme preferences                                         |

Documentation and interaction tests drive the built site. Contract and fidelity
tests use focused browser fixtures. The documentation suite checks route responses,
deep links, immutable asset headers, HEAD responses, and genuine missing-file/method
errors. Each browser file rejects uncaught page errors in its exercised flows.

The catalog's automated accessibility scope is explicit:

- Every reference page receives a whole-page axe scan in **g10** at the initial
  desktop viewport.
- The same example receives a scoped `.example-canvas` scan in **white, g90, and
  g100**. The configured tags cover WCAG 2/2.1/2.2 A/AA rules supported by axe.
- Document overflow is checked at **1440, 768, and 390px** after theme switching.
  This is not every viewport × theme × state combination.
- Other route tests scan their rendered page after the responsive sequence. Most
  interaction tests use the g100 example state and reduced motion.
- Fidelity assertions measure named geometry/color/type contracts. They do not
  compare all components against upstream Carbon screenshots.

### Responsive reference follow-up

The [API-layout record](../test-results/props-layout.json) contains **180 observations:
45 tables × 1440/768/390/320px**. Prop names stay on one line, descriptions fit,
the table does not overflow, and named table, columnheader, and rowheader roles
remain queryable. At widths up to 60rem, each prop becomes a stacked record with
its type and purpose; the accessible table headers remain available.

The extended 320px probe also found document widths of 324px and 329px in the
date-picker and date-range-picker examples. Their narrow canvases now scroll
locally. A focus-capture handler brings contained keyboard targets into view when
the canvas overflows. Eight focused date-preview rechecks passed. At 320px:

- Six ArrowRight presses across a calendar row caused **30px** of local scrolling
  and kept the focused date visible.
- Tab from the range's end-year segment to its calendar trigger caused **35px** of
  local scrolling and kept the trigger visible.

The combined record reuses the other 43 entries' measurements and replaces the
two date entries with those scoped rechecks. It records no remaining document
overflow across the 180 observations. The original findings are retained in
[`props-layout-before-calendar.json`](../test-results/props-layout-before-calendar.json).
The layout record's source hashes match the implementation-baseline aggregate.

The earlier [toolbar probe](../test-results/final-layout.json) verifies 60px theme
segments on desktop/tablet, 52px on mobile, Reset wrapping at 320px, logical LTR/RTL
corners, and a visible keyboard focus outline. RTL probes pair `lang="ar-AE"` with
`dir="rtl"`, matching `Theme locale` and Bun's lowered logical-corner selectors.

## Distribution and installation

Both archives were installed outside the workspace, with no source-path aliases.
The [baseline package consumer](../test-results/package-consumer-before-native-tooling.json), completed at
**01:42:00 UTC**, checks the archive hashes, resolved package protocols,
LICENSE/NOTICE, ESM/CSS/JSON exports, strict declarations with `skipLibCheck=false`,
structured type metadata, theme/layer portals, refs/render props, keyboard state,
form validation/submission, selection, loaded Plex faces, and browser errors.

The current Frame-foundation archives are identified by the
[manifest](../dist/packages/manifest.json),
[package-consumer record](../test-results/package-consumer.json), and
[README-install record](../test-results/readme-install.json):

| Archive                                                               | Bytes  | SHA-256                                                            |
| --------------------------------------------------------------------- | ------ | ------------------------------------------------------------------ |
| [`cinder-tokens-0.1.0.tgz`](../dist/packages/cinder-tokens-0.1.0.tgz) | 46,331 | `ec741687d4fad05c440b56d2b5028b30b05ba0be628770990405f8488a263841` |
| [`cinder-react-0.1.0.tgz`](../dist/packages/cinder-react-0.1.0.tgz)   | 81,833 | `9b33628ba5a84f0a1ef7b9a7b4680bd502bff37e94d4be98b1413a12d33afd61` |

The [identity check](../test-results/frame-phase1-identities.json) confirms that
the manifest, actual archive bytes, package-consumer record, and README-install
record agree on these hashes, and that the checked README is current.
`@cinder/tokens@0.1.0` is an explicit React-package
peer; workspace development retains `workspace:*`. Library consumers supply their
fonts when needed; Frame uses the system sans-serif stack. The README demonstrates
separate optional pinned Plex Sans and Mono installs. Its
[current installation output](../test-results/frame-phase1-readme.log) checks the
tarball commands and all three TSX snippets verbatim in another isolated app.

The [baseline README installation check](../test-results/readme-install-before-native-tooling.json) independently
runs its exact tarball/font commands, adds the TypeScript tooling, copies every
README TSX snippet verbatim, and typechecks and bundles the result. It records
README SHA-256:

```text
d6392bab807087499a871836ab635c511c7cb10f89ec9993f4d9ee2d612e729e
```

The site includes `LICENSE.txt`, `NOTICE.txt`, and `THIRD_PARTY_LICENSES.txt`.
The latter contains the runtime and font licenses assembled by
[`scripts/licenses.ts`](../scripts/licenses.ts). Cinder is an independent
Apache-2.0 implementation; upstream attribution is retained in [NOTICE](../NOTICE).

## Actual Bun development workflow

The [development experiment](../test-results/dev-workflow.json) used the real
command **`PORT=3419 bun dev`**, completing at **00:30:24 UTC**. A TSX edit and a
token-CSS edit updated the browser while preserving the workspace-name and
team-seat state. It recorded **zero document reloads**, successful keyboard
submission after refresh, loaded Plex faces, legal-route responses, and no page or
console errors. Temporary source edits were restored and their hashes recorded.

This experiment predates the final reference-layout refinements. It verifies the
native development/HMR path; the later aggregate verifies the final production
source. The [Bun research report](research-bun.md) explains the HTML-server,
workspace, bundling, environment, and declaration-emission decisions.

### Production preview lifecycle

The final byte-for-byte delivery check found that the long-running preview sent
only 1,215 bytes of a rebuilt 1,327-byte `index.html`. Its response was the exact
prefix of the current file, with truncation in the trailing `<noscript>` fallback.
The linked CSS, JavaScript, and favicon already matched their built files.

Restarting `bun start` after the completed build resolved the stale response
length. At **01:56:17 UTC**, the served HTML and on-disk file matched exactly at
1,327 bytes. The [before/after evidence](../test-results/preview-rebuild.json)
retains the response headers and hashes. Build first, then start the production
preview; restart it after another production build. Use `bun dev` for HMR.
Delivery reconciliation also verifies the fresh preview's routes and asset bytes.

## Diagnoses and retained history

Two earlier aggregate failures are retained alongside the final pass:

1. **00:54–00:56 UTC:** 12 unit and 92 browser tests passed. The new external
   consumer assertion then timed out because it searched for a nested `<pre>`
   below an element that was already the labeled `<pre>`. The corrected locator
   reads that element directly. [Record](../test-results/check-initial-failure.json),
   [output](../test-results/check-initial-failure.log).
2. **01:03–01:05 UTC:** 91 browser tests passed. The dynamic multiple-combobox test
   sent ArrowDown before automatic filtered opening had settled. A manual open
   could expose all items and focus Alpha. The contract now waits for the single
   filtered Gamma option, then for its active-descendant ID, before Enter. The
   actual corrected contract passed **20 consecutive repetitions**, followed by
   both complete aggregate passes. [Failure](../test-results/check-collection-failure.json),
   [repetition record](../test-results/combo-regression.json),
   [output](../test-results/combo-regression.log), and
   [diagnostic harness](../.research/diagnostics/combo-selection.ts).

The successful **01:18–01:20 UTC** aggregate is preserved as
[`check-before-props-layout`](../test-results/check-before-props-layout.json).
The final **01:40–01:42 UTC** aggregate includes the table, date-preview, and
focus-capture changes.

The **46 `a11y-*.json` files from 5 November, 23:30–23:36 UTC** are historical
failing snapshots. The test writer only emits these files on failure, so passing
scans leave them intact. Their retention supports the research's earlier findings;
the timestamped final aggregate describes the current test result. The
[artifact guide](../test-results/README.md) identifies current and historical evidence.

## Research and implementation scope

The research starts from the official Bun, Carbon, and RAC `llms.txt` indexes and
records acquisition separately from reading:

- [Bun](research-bun.md): **365 successful archived downloads** and **seven upstream
  404s**, plus release/package/environment evidence and focused executable probes.
- [Carbon](research-carbon.md): **127 indexed roots**, **42 family contracts**,
  **335 saved page pairs**, and **nine package tarballs / 10,879 extracted files**;
  the supplied Carbon and Carbon MCP clones are retained as source evidence.
- [RAC](research-rac.md): **213 archived documents**; the conservative reading
  ledger records **15 full source reads, seven targeted reads, and one release-index
  scan**. Download coverage does not imply that every page was read.

Cinder has **45 local reference entries**, representing parts of **39 upstream
families**. The crosswalk is **42 − 3 − 1 + 7 = 45**: omissions, combined shell
entries, and split input/date/notification entries account for the difference.
AI label, Toggletip, and UI shell right panel are outside this implementation.
The [coverage matrix](coverage.md) names partial variants and deliberate RAC
adaptations, including switch keys, collection roles, segmented dates, and
modal-default dialog popovers.

## Remaining verification scope

Manual assistive-technology testing, Firefox/WebKit and physical mobile-device
checks, full-catalog forced colors, broad zoom/locale/calendar combinations, SSR hydration,
and comprehensive Carbon pixel comparisons remain unperformed. Automated axe,
keyboard, type, and focused fidelity results establish the specific coverage above.
The tested dependency combination is the pinned one. Toasts use experimental RAC
APIs, and examples use labeled local sample data and local state.

The delivery is a local workspace, preview, and two tarballs. The completed
verification does not represent registry publication or hosted deployment.
