# Cinder 0.1.0 — verification

**Latest aggregate: passed, 6 November 2026, 09:03:25–09:05:29 UTC.**
The [Oxlint follow-up](#oxlint-follow-up) adds linting to the stable Bun pipeline.

**Implementation baseline: passed, 6 November 2026, 01:40:02–01:42:01 UTC.**
`bun run check` completed formatting, TypeScript, **12 unit tests with 129 expect
calls**, the production build, **92 browser tests**, package packing, and an
isolated tarball consumer. All **69 recorded source/configuration files** retained
their SHA-256 values throughout the run.

The local production preview is **http://127.0.0.1:3000**. The source and packages
are Cinder's provisional **0.1.0**, with the working package scope `@cinder`.
See [implementation coverage](coverage.md) for the family-by-family boundaries
and [visual review](visual-review.md) for the screenshot assessment.

## Oxlint follow-up

The workspace pins **Oxlint 1.91.0** on stable **Bun 1.4.4**. `bun run lint` checks
source files, `bun run lint:fix` applies safe fixes, and the aggregate runs lint
between formatting and type checking. The [tooling notes](research-bun.md#oxlint-on-stable-bun)
explain the rules, exclusions, and intentional accessibility settings.

- The [aggregate record](../test-results/check-oxlint.json) and
  [output](../test-results/check-oxlint.log) show formatting, lint, **42-file native
  type checking**, **12 unit tests / 129 expect calls**, **92 browser tests**, the
  build, packing, and the external consumer passing. All **70 recorded
  source/configuration hashes**, including `.oxlintrc.json`, stayed stable during
  the run. Both package archives match the implementation baseline.
- The [lint proof](../test-results/oxlint.json) records **44 files / 162 rules**
  with zero findings. Temporary fixtures verified that both hook rules, unused
  variables, unassociated labels, autofocus outside dialogs, and inappropriate
  tabindex/role attributes are rejected. Dialog focus, keyboard-scroll targets,
  responsive table roles, rest-prop omission, and status regions are accepted.
- A deliberate lint error stopped the aggregate before type checking. A warning
  alone also caused failure, and `lint:fix` corrected a safely fixable regex.
  All temporary fixtures were removed. Frozen installation checked **54 installs
  across 100 packages**, with no changes and identical lockfile bytes.
- The [README installation check](../test-results/readme-install.json),
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
  stayed stable during this run, and both tarballs match the baseline hashes below.
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

| Item                      | Verified value                                                               |
| ------------------------- | ---------------------------------------------------------------------------- |
| Platform                  | macOS 27.2, arm64                                                            |
| Bun                       | 1.4.4, revision `38afee6c8`                                                  |
| TypeScript                | 7.0.2                                                                        |
| Oxlint                    | 1.91.0, added in the Oxlint follow-up                                        |
| React / React DOM         | 19.3.1                                                                       |
| RAC                       | 1.22.1                                                                       |
| `@internationalized/date` | 3.12.4                                                                       |
| Browser                   | Chrome 156.0.8078.80, driven through Playwright                              |
| Standard browser locale   | `en-US`; dedicated portal/direction cases use `ar-AE`                        |
| Temporary external apps   | `CINDER_TEST_TMPDIR` under the harness-approved OpenCode temporary directory |

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
| `bun run test:browser`                  | 92 passed               | Four files; browser scope is detailed below                                                                                                                 |
| `bun scripts/pack.ts`                   | Passed                  | Two local archives and [SHA-256 manifest](../dist/packages/manifest.json)                                                                                   |
| `bun run test:package`                  | Passed                  | Strict external consumer, production bundle, decoded fonts, and browser contracts                                                                           |
| `bun .research/verify-readme.ts`        | Passed at 01:46:36 UTC  | Exact README installation commands and verbatim TSX snippets in another external app                                                                        |
| `python3 .research/verify-doc-links.py` | Passed                  | Root/package READMEs, all `docs/` Markdown, and the artifact guide; [targets and anchors](../test-results/doc-links.json)                                   |
| Catalog source-link audit               | 67 distinct URLs passed | [Response records](../.research/catalog-links.json), captured at 00:26:19 UTC                                                                               |
| Final rendered inspections              | Completed               | Seven homepage and six reference images opened and reviewed; [results and exceptions](visual-review.md)                                                     |

The documented package commands can be repeated with `bun run pack`. The complete
aggregate can be repeated with `bun run check`; Chrome is the browser-suite default,
and `PLAYWRIGHT_CHANNEL` selects an installed alternative channel.

## What the tests prove

### Unit and type checks

[Unit tests](../tests/unit/) cover selected official Carbon semantic/component
colors in all four themes, consistent token key sets, spacing/type/motion samples,
layer saturation, theme-name validation, literal CSS variable references,
structured typography serialization, pagination normalization, and file acceptance.
The structured-type assertions compare full selected objects, including sparse
breakpoint overrides, with the pinned Carbon package.

There are **313 entries per theme**, **191 scalar foundations**, and **36 selected
structured type definitions**. The scalar values are base values. Responsive type
changes and fluid interpolation remain application-owned. The tests sample
upstream values and selected structured objects; the catalog count does not imply
an exhaustive pixel comparison.

### Browser tests: 52 + 18 + 6 + 16 = 92

| File                                                     | Tests | Exercised behavior                                                                                                                                                                                                                       |
| -------------------------------------------------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Documentation](../tests/browser/docs.test.ts)           | 52    | Five principal routes, production motion/reduced motion, preview-server behavior, and every one of the 45 catalog entries                                                                                                                |
| [Interactions](../tests/browser/interactions.test.ts)    | 18    | Keyboard activation/selection, invalid and corrected form submission, search, collections, bounded values, date/time changes, clipboard success/denial, file selection/native mixed-file drop, overlays, navigation, and persisted theme |
| [Consumer contracts](../tests/browser/contracts.test.ts) | 6     | Refs, custom DOM rendering, render props, controlled fields, generic single/multiple collections, and four theme/RTL/nested-portal cases                                                                                                 |
| [Carbon fidelity](../tests/browser/fidelity.test.ts)     | 16    | Compound sizes, switcher boundaries, toggle/slider geometry, supporting typography, and button/notification/calendar states in four themes                                                                                               |

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

| Archive                                                               | Bytes  | SHA-256                                                            |
| --------------------------------------------------------------------- | ------ | ------------------------------------------------------------------ |
| [`cinder-tokens-0.1.0.tgz`](../dist/packages/cinder-tokens-0.1.0.tgz) | 29,624 | `5f810ded6705b6c436d084306bf93e609624801755923d62a785dff051dd67cb` |
| [`cinder-react-0.1.0.tgz`](../dist/packages/cinder-react-0.1.0.tgz)   | 64,860 | `de1192fc87291163f06ca594c5abf944a0ca2aa00eb45424987e0e5e68390962` |

The manifest, actual archive bytes, package-consumer record, and README-install
record agree on these hashes. `@cinder/tokens@0.1.0` is an explicit React-package
peer; workspace development retains `workspace:*`. Library consumers supply their
fonts. The README demonstrates the pinned Fontsource packages and imports.

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
checks, forced colors, broad zoom/locale/calendar combinations, SSR hydration,
and comprehensive Carbon pixel comparisons remain unperformed. Automated axe,
keyboard, type, and focused fidelity results establish the specific coverage above.
The tested dependency combination is the pinned one. Toasts use experimental RAC
APIs, and examples use labeled local sample data and local state.

The delivery is a local workspace, preview, and two tarballs. The completed
verification does not represent registry publication or hosted deployment.
