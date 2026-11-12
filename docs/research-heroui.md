# HeroUI research for an original Cinder design system

- **Research date:** 6 November 2026.
- **Release baseline:** `@heroui/react@3.2.7` and `@heroui/styles@3.2.7`.
- **Source snapshot:** `b2c65a5b5236550526f23d475b1ad0c6e5eab1a2`, captured from HeroUI's `v3` branch.
- **Scope:** public English React documentation, published React/styles packages, and selected core source contracts. Native, translations, and commercial packs are outside the substantive review.
- **Evidence archive:** [`.research/heroui-2026-11-06/`](../.research/heroui-2026-11-06/). Acquisition, reading, source inspection, and runtime sampling are separate evidence classes.
- **Durable reading coverage:** [179-document appendix](research-heroui-coverage.md), with every canonical URL, reviewed path, SHA-256, full-read range and page-specific finding.

## Executive finding

**HeroUI is a useful reference for semantic variants, discoverable compound anatomy, and a CSS-addressable design system over React Aria. It is not evidence that its normal distribution is independent of Tailwind.** Its public customization contract accepts ordinary CSS, CSS Modules, and generated CSS-in-JS classes; its normal stylesheet source still requires Tailwind v4 processing. A separately shipped, precompiled stylesheet renders the bounded specimen without a Tailwind compiler, but the package import recommended for that artifact is blocked by the published export map. [Styling][d-styling], [frameworks][d-frameworks], [published styles manifest][p-styles], [resolver evidence][e-resolution].

The findings most relevant to Cinder are:

1. **Borrow the semantic hierarchy, rather than the visual brand.** HeroUI explicitly credits **Uber Base's button hierarchy** for primary/secondary/tertiary emphasis. That is a design reference; HeroUI's React behavior is built on React Aria, not Base Web. [Design principles][d-principles], [React package][p-react].
2. **Treat CSS-tool freedom as several contracts.** The authoring pipeline, distributed CSS, class/ref forwarding, component parts, and portal theme scope each need proof. Plain CSS and actual CSS Modules passed the local Button checks. Emotion and styled-components are documented and source-supported integration paths, but were not runtime-tested here. [Styling][d-styling], [Button source][s-button], [runtime evidence][e-runtime].
3. **Composition preserves flexibility only when behavior remains connected.** A BEM class gives an element an appearance; it does not give it React Aria's keyboard handling, relationships, state, or focus management. Compound parts and custom renderers must retain those contracts. [Composition][d-composition], [Checkbox source][s-checkbox].
4. **Nested themes need an overlay contract.** In the specimen, default Popover and Modal portals inherited the document theme, losing the nested scope's custom properties. An explicit local Popover portal container retained them. Focus entry, sampled Tab navigation, Escape dismissal, and focus restoration worked at the tested scope. [Popover source][s-popover], [Modal source][s-modal], [runtime evidence][e-runtime].
5. **Current artifacts outrank stale or overly broad guidance.** General composition uses `render` and the semantic accent token is `--accent`, but `Avatar.Image` still explicitly documents `asChild`; a blanket rewrite is unsupported. FieldError's documented ellipsis differs from the wrapping CSS and measured behavior. Patch/minor release notes also contain explicit breaking changes. [Full migration][d-full-migration], [Avatar][d-avatar], [FieldError][d-field-error], [source CSS][s-field-error-css], [3.0.5][d-release-305], [3.2.0][d-release-320].
6. **Pin the license as carefully as the API.** The reviewed v3 packages are **Apache-2.0**. The archived v2/NextUI metadata is **MIT**. The documentation site's Inter font is separately **OFL-1.1**. [Package pins][e-pins], [Apache license][s-license], [Inter license][s-inter-license].

For Cinder, this supports improving the existing RAC/static-CSS foundation's public styling and composition contracts. It does not establish a reason to replace that foundation with HeroUI. The current Cinder facts and Carbon comparison remain in the [baseline audit](research-cinder-baseline.md), [RAC report](research-rac.md), and [Carbon report](research-carbon.md). The opportunities below are research proposals for synthesis, not implementation decisions.

## 1. Coverage and evidence boundary

### 1.1 All 179 canonical document texts read

Research began at the requested [design-principles MDX endpoint][d-principles-mdx]. The English React route sets from `llms.txt`, sitemap `<loc>` entries, and the pinned source agree on **179 canonical documents**. All 179 have valid saved reader output with a canonical URL, title, byte count, SHA-256, acquisition status, and source pointer. [Discovery reconciliation][e-discovery], [document manifest][e-docs].

| Canonical group                         | Acquired | Reused full reads | Additional full reads | Final full reads |
| --------------------------------------- | -------: | ----------------: | --------------------: | ---------------: |
| Getting started, including introduction |       16 |                16 |                     0 |               16 |
| Components, including the index         |       74 |                16 |                    58 |               74 |
| Migration, including the index          |       62 |                 4 |                    58 |               62 |
| Releases, including the index           |       27 |                 5 |                    22 |               27 |
| **Total**                               |  **179** |            **41** |               **138** |          **179** |

**179/179 canonical document texts are now fully read.** The completion pass covered the 57 previously targeted component pages plus the component index, 58 migration pages, and 22 release pages. It read **1,089,103 additional bytes / 35,000 LF-delimited lines**. Together with the 41 recovered prior reads, the reviewed texts total **1,522,291 bytes / 47,131 lines**. The earlier extracts remain historical evidence; they no longer define the final reading status. Seventy-three component pages plus their index is a documentation count, not a count of exported primitives or verified implementations. [Full-reading evidence][e-full-reads], [durable coverage][e-durable].

“Full document text” means every line of the selected saved reader or pinned MDX, including frontmatter/imports where present, inline examples, prose and API tables. The selected texts are **176 pinned MDX files, two expanded browser-reader files (Button and Checkbox), and the original Design Principles reader file**. The exact path and byte hash matter: saved reader acquisitions and pinned MDX are not silently treated as equivalent. All 41 prior deliveries were recovered and matched, rather than repeated. Fourteen disjoint batches supplied the 138 additional reads; retained numbered tool output was independently matched against each file's complete text and ranges. [Reading proof][e-full-reads], [prior-path recovery][e-prior-reads].

A `<ComponentPreview>` or `ComponentsCategory` reference does not establish a read of the linked demo or rendered category output. Only Button and Checkbox have fully read expanded reader examples. Workflow includes were reconciled against the separately read migration index, with unresolved fragment names recorded in section 9; expanded workflow bundles were not reviewed. Native/Pro passages embedded in English release notes were read as inline text, while their linked products, translations and commercial assets remain separate. Document-text coverage does not establish full visual, interaction or assistive-technology coverage.

### 1.2 Reproducible ledgers

| Ledger                                     | Contents and reading boundary                                                                                                                                                                                              |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Document manifest][e-docs]                | All 179 canonical URLs, titles, saved paths, complete SHA-256 hashes, acquisition outcomes, exclusive reading classes, pinned source paths/hashes, and independent demo/runtime flags.                                     |
| [Human-readable coverage ledger][e-ledger] | Every canonical URL/title/hash/status in one table; reviewed source contracts and supplemental/runtime notes.                                                                                                              |
| [Durable coverage appendix][e-durable]     | All 179 URLs, groups, selected paths, full-read ranges/chunks, reader/source hashes, substantive findings and documentation caveats, preserved outside the ignored archive.                                                |
| [Full-reading evidence][e-full-reads]      | Per-page exact-text delivery proof, reader findings, 14 disjoint assignments, transcript hashes, original-read recovery and workflow include reconciliation.                                                               |
| [Source coverage][e-source-coverage]       | **4,611 files** across the acquired source tree and published React/styles packages, each with URL or tarball member, hash, acquisition status, and reading class. Incidental out-of-scope material remains download-only. |
| [Source/package pins][e-pins]              | Exact registry versions, publication times, dependencies/peers, tarball URLs/integrities, and the separate source commit.                                                                                                  |
| [Supplemental acquisition][e-supplemental] | Public React `DESIGN.md`, React LLM indexes/aggregates, supporting metadata, and the pinned Inter license. The large LLM aggregates are download-only.                                                                     |
| [Runtime evidence][e-runtime]              | Commands, observations, and 20 named checks for the isolated Chromium specimen. [Resolver results][e-resolution] and [build results][e-build] are separate.                                                                |

The reconciled source ledger contains **182 full-file reads, 58 targeted-source entries, one document-text-covered entry, 17 byte-equivalent CSS counterparts, one targeted precompiled-CSS scan/runtime entry, and 4,352 download-only entries**. Of the 182 full-file reads, 176 are canonical pinned MDX. Exact recovery identified 38 prior pinned-MDX reads: eleven already had full-file status, and 27 had conservatively lower source classifications. The remaining 138 are the new MDX reads. Reader-only coverage is not promoted to a source-file read. These counts overlap canonical-document coverage and must not be added as unique pages; hashing, downloading, searching or using a dependency still does not count as reading or executing it.

The cancelled first acquisition retained 171 valid pages. Eight canonical pages were recovered; one of those needed a further retry after a browser-daemon startup failure. The final manifest selects that successful retry. Original incomplete files, the intermediate 178-success manifest, malformed initial sitemap requests, and interrupted runtime probes remain in the archive. They neither inflate the 179-document total nor disappear from the audit trail. [Reconciliation script][e-finalize], [acquisition diagnostics][e-acquisition-diagnostics].

The original **41 full / 57 targeted / 81 download-only** checkpoint, report, ledgers, scripts, verification and recovered tool records are preserved under `history/pre-full-reading/`. Acquisition metadata, package/source pins and saved runtime evidence retain their original provenance. Completed reader results that survived transient provider errors were reconciled through their full delivered text, without repeating those pages. [Historical checkpoint][e-history], [full-reading evidence][e-full-reads].

## 2. Exact versions, provenance, and architecture

### 2.1 Released packages and comparison metadata

| Artifact            | Exact version or revision                      | Publication or commit time, UTC | Role / license                                      |
| ------------------- | ---------------------------------------------- | ------------------------------- | --------------------------------------------------- |
| `@heroui/react`     | **3.2.7**                                      | 2026-10-28 19:35:57.743         | Current `latest` at capture; Apache-2.0             |
| `@heroui/styles`    | **3.2.7**                                      | 2026-10-28 19:34:50.875         | Matching styles dependency; Apache-2.0              |
| HeroUI source       | **`b2c65a5b5236550526f23d475b1ad0c6e5eab1a2`** | 2026-10-30 08:00:05             | Pinned `v3` branch snapshot, independently acquired |
| `@heroui/react` v2  | **2.8.10**                                     | 2026-03-07 15:57:54.076         | Historical comparison metadata; MIT                 |
| `@heroui/theme`     | **2.4.26**                                     | 2026-01-29 15:46:36.885         | v2 theme-package comparison metadata; MIT           |
| `@nextui-org/react` | **2.6.11**                                     | 2025-01-05 13:15:38.931         | Earlier namespace comparison metadata; MIT          |

Sources: [complete pins and registry provenance][e-pins]. The v2 and NextUI rows are metadata comparisons, not runtime migrations or source audits of those versions.

The npm HeroUI metadata does **not** supply `gitHead`. The later source commit therefore must not be described as a proven exact release commit. Published artifacts govern released behavior. As a useful bounded equivalence check, **all 96 overlapping stylesheet files are byte-identical** between the published styles package and the pinned source snapshot. That check does not establish equivalence of every React implementation or documentation page. [CSS comparison][e-css-comparison].

The v3 React peers at the published boundary are:

```text
react, react-dom          >=19.0.0
react-aria-components    ^1.22.1
react-aria               ^3.53.1
@react-aria/ssr          ^3.10.1
@react-aria/utils        ^3.34.1
@internationalized/date  ^3.12.4
tailwindcss              >=4.0.0
```

`@heroui/react` depends on `@heroui/styles@3.2.7`, `tailwind-variants@3.3.1`, `input-otp@1.5.0`, `@radix-ui/react-avatar@1.3.1`, `@react-types/color@3.2.0`, `@react-types/shared@3.37.0`, and `@react-stately/utils@3.12.1`. The styles package depends on `tailwind-variants@3.3.1` and `tw-animate-css@1.4.0`, and declares the Tailwind v4 peer. The OTP and Avatar dependencies are reminders that “built on RAC” is not “every part is exclusively RAC.” [Published React metadata][p-react], [published styles manifest][p-styles].

### 2.2 Ownership model

```text
React Aria behavior + selected other primitives
  -> HeroUI React roots, compound parts, contexts, and prop handling
  -> consumer state, events, refs, className/style, and custom rendering

Variant props
  -> @heroui/styles variant functions (tailwind-variants)
  -> BEM class names

Semantic variables + component CSS + state selectors
  -> Tailwind v4 processing in the normal source pipeline
  -> browser CSS
```

This separation makes the visual system reusable with React, other frameworks, or native HTML. It does not transfer React Aria behavior to plain elements. The styles package contains CSS and framework-independent class/variant functions; the React package provides behavior and composition. [Frameworks][d-frameworks], [composition][d-composition], [Button variants][s-button-variants].

v3 is also a meaningful API boundary from v2: compound composition replaces many configuration-heavy patterns, CSS animations replace the earlier Framer Motion requirement, and installation no longer revolves around a mandatory `HeroUIProvider`. That does not remove routing, locale, theme persistence, or motion-policy responsibilities from the application. Migration guidance discusses these changes, but current component declarations and published CSS remain authoritative where guidance drifts. [Full migration][d-full-migration], [incremental migration][d-incremental-migration], [quick start][d-quick-start].

## 3. Design principles worth transferring

The [design-principles page][d-principles] names ten principles: semantic intent, accessibility, composition, progressive disclosure, predictable behavior, type safety, separation of styles and logic, developer experience, complete customization, and openness/extensibility. The useful part for Cinder is how those principles become concrete contracts.

| Principle              | Concrete HeroUI expression                                                                                                                        | Cinder-relevant lesson                                                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Semantic intent        | `primary`, `secondary`, `tertiary` express relative emphasis; additional Button variants include `ghost`, `outline`, `danger`, and `danger-soft`. | Model importance and destructive intent explicitly; document when each emphasis is appropriate. A prop name alone does not enforce good hierarchy. |
| Composition            | Roots and named parts share state and styling context. Shared Label, Description, and FieldError are reused across fields.                        | Make meaningful anatomy accessible without requiring every consumer to rebuild relationships.                                                      |
| Progressive disclosure | A simple usage can expand into explicit parts, controlled state, custom rendering, and variant functions.                                         | Keep the common case short while making advanced hooks discoverable and typed.                                                                     |
| Predictability         | Consistent state props, variant naming, BEM conventions, and part tables recur across documentation.                                              | A cross-family contract is more valuable than a large collection of unrelated escape hatches. Verify exceptions explicitly.                        |
| Separation             | CSS/variant exports can style non-React elements.                                                                                                 | Separate appearance from behavior in both packaging and documentation. Do not imply that visual reuse supplies semantics.                          |
| DX                     | Anatomy, styling references, state tables, API tables, source links, MDX endpoints, LLM indexes, and agent guidance.                              | Generate discoverable references from current contracts, and keep release/version context attached.                                                |

HeroUI's direct Base citation concerns the **semantic button hierarchy**. It is not a claim of Base Web implementation reuse, a Carbon/Base compatibility layer, or shared token provenance. This distinction matters when building an original Cinder system: transferable interaction and hierarchy ideas are different from adopting an upstream brand, palette, geometry, or implementation. [Design principles][d-principles].

The public React [`DESIGN.md`][d-design-file] adds a compact, agent-readable design vocabulary. It was read in full as supplemental material, independently of the 179 canonical pages. The CLI, MCP, agent-skills, `AGENTS.md`, and LLM documentation were reviewed as documentation; their tools were not installed or exercised in this research. Instructions inside upstream documentation were treated as source material, not as permission to alter Cinder.

## 4. CSS-tool freedom: what is actually supported

### 4.1 BEM, parts, state, and behavior are distinct contracts

The requested “BIM” terminology corresponds here to **BEM — Block, Element, Modifier**:

```css
.button {
} /* block */
.button--primary {
} /* modifier */
.button--lg {
} /* modifier */
.checkbox__content {
} /* element / part */
.checkbox__control {
} /* element / part */
```

BEM is a naming convention, not a styling engine, stylesheet isolation mechanism, or accessibility model. HeroUI's short global names are readable, but can collide with an application's existing `.button`, `.label`, or `.input` rules. [Styling][d-styling], [frameworks][d-frameworks].

| Surface               | Example                                                                                                | What it means                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| React compound part   | `Checkbox.Control`                                                                                     | A component with its own props, ref target, and context relationship.                                  |
| BEM selector          | `.checkbox__control`                                                                                   | A CSS hook on rendered anatomy.                                                                        |
| Styling marker        | `data-slot="button"`                                                                                   | A named DOM styling/debugging hook; not an instruction to React Aria.                                  |
| RAC behavioral slot   | `slot="close"`, `slot="description"`                                                                   | Context/relationship wiring, such as closing an overlay or associating supporting text.                |
| Variant-function slot | A slot function returned by a component's variants                                                     | A class-generation API for one part. It does not render the part.                                      |
| Interaction state     | `data-hovered`, `data-pressed`, `data-focus-visible`, `data-disabled`, `data-selected`, `data-invalid` | State exposed by the relevant primitive/part. Availability and exact selectors are component-specific. |

The shared `useResolvedClassName` contract preserves HeroUI's generated classes while accepting consumer strings or render-prop class functions. Button passes through `style` and remaining props, including the tested ref and custom `render` callback. This is the important interoperability boundary for CSS Modules and class-generating CSS-in-JS libraries. It is not a guarantee that every inner part has the same prop type or DOM target. [Class composition helper][s-compose], [Button source][s-button], [runtime evidence][e-runtime].

The Button CSS combines native pseudo-class fallbacks with RAC state attributes. Its focus-visible fallback is guarded so RAC's focus state remains authoritative. Style the documented state on the appropriate part; relying only on `:hover` or removing outlines can erase behavior that the component supplies for keyboard or non-mouse input. [Button CSS][s-button-css].

### 4.2 Source pipeline and cascade layers

The published normal CSS entry begins with:

```css
@layer theme, base, components, utilities;
@import "tailwindcss";
@import "tw-animate-css";
@import "./base/base.css" layer(base);
@import "./base/scrollbar.css" layer(base);
@import "./components/index.css" layer(components);
@import "./themes/default/index.css" layer(theme);
@import "./utilities/index.css";
@import "./variants/index.css";
```

This is the actual [published CSS entry][e-css-entry], not merely an installation example. Component and theme files use processing directives such as `@apply`, `@theme inline`, and `@custom-variant`. A browser cannot execute that authoring pipeline by itself. The file comment “base component structures (unstyled)” does not make the shipped components a behavior-only headless package. [Source CSS entry][s-css-entry], [theme bridge][s-theme-bridge], [variants][s-css-variants].

For normal declarations, the declared order places `utilities` above `components`, and unlayered application styles above layered library rules. The local plain CSS and CSS Module overrides exercised that latter path. Important declarations have different cascade-layer precedence; class order in a JSX string is not a general CSS precedence mechanism.

Consumers should distinguish the raw component stylesheet export from a ready-to-run standalone component stylesheet. Importing `@heroui/styles/components/button.css` is supported by the export map, but that file still depends on the source pipeline and appropriate theme/base context. [Published styles manifest][p-styles], [Button CSS][s-button-css].

### 4.3 Precompiled stylesheet: useful artifact, packaging limitation

The npm tarball also contains `dist/heroui.min.css`:

- **463,765 bytes**, minified but not a compressed-transfer measurement.
- Compiled with **Tailwind 4.3.3**, according to its retained header.
- SHA-256: **`6c29446c65a517b65b0be08ed875713dfc9267a7da8e5fcda81cbb5bea1e8f66`**.
- No remaining Tailwind authoring directives in the inspected artifact.
- The sampled Chromium CSSOM exposes an **anonymous layer**, rather than preserving the source entry's four named layers as an equivalent consumer contract.

The local specimen served this exact file as `/heroui.css` and rendered without running a Tailwind compiler. That establishes a precompiled-CSS runtime path, not a successful package installation/import path. The package still declares Tailwind as a peer. [Artifact source ledger][e-source-coverage], [specimen server][e-server], [runtime evidence][e-runtime].

The frameworks page recommends `import "@heroui/styles/dist/heroui.min.css"`. In **Node 24.21.0**, that specifier fails with **`ERR_PACKAGE_PATH_NOT_EXPORTED`**. The package's `browser` field names the file, but the export map does not expose that explicit subpath. A CDN URL or serving an extracted file bypasses that resolver boundary; success there does not validate the documented import. [Frameworks][d-frameworks], [manifest][p-styles], [resolver evidence][e-resolution].

The theming page similarly describes the bare `@heroui/styles/components` directory import. It also fails the Node export resolver. The explicit `@heroui/styles/components/button.css` export resolves. CSS bundlers can have their own resolution behavior, so this is an exact published export-map/Node finding, not a claim that every bundler fails identically. [Theming][d-theming], [resolver evidence][e-resolution].

Finally, the precompiled artifact is **not a ready-made universe of arbitrary Tailwind utilities**. The specimen supplied `w-32 rounded-none`; neither changed the Button's width/radius. CSSOM searches found none of the sampled `.w-32`, `.rounded-none`, `.flex`, or `.sr-only` selectors. This says nothing about every possible utility; it establishes that consumers cannot assume their chosen class strings have been generated. The initial contrary probe expectation is retained as a failed diagnostic, rather than silently discarded. [Runtime evidence][e-runtime].

### 4.4 Interoperability matrix

| Consumer approach                     | Normal HeroUI source CSS                                                                                     | Precompiled CSS specimen                                             | Evidence strength / limit                                                                                                                               |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Plain CSS                             | Consumer overrides are ordinary CSS; the HeroUI source still needs its Tailwind pipeline.                    | Unlayered class changed Button background and radius.                | **Runtime-tested**, one component and selected declarations.                                                                                            |
| CSS Modules                           | Pass the generated class through `className`; global BEM selectors can be used deliberately for descendants. | An actual Bun-built CSS Module changed Button background and radius. | **Runtime-tested**, not a simulated hand-written hashed class.                                                                                          |
| Emotion `@emotion/css`                | `css` produces a class string, passed via `className`; baseline CSS must still be supplied.                  | Mechanism is compatible with the tested class boundary.              | **Documented + source-inferred**; Emotion itself was not installed/run. This does not establish the separate `@emotion/react` JSX `css`-prop toolchain. |
| styled-components                     | The docs demonstrate `styled(Button)`; forwarding its class is the key boundary.                             | Mechanism is compatible with the tested class boundary.              | **Documented + source-inferred**; styled-components, its SSR setup, prop filtering, and polymorphic rendering were not run.                             |
| Inline `style`                        | Supported at the inspected Button boundary; no selector or pseudo-state syntax in a style object.            | A 7px radius survived custom rendering and ref forwarding.           | **Runtime-tested** for Button.                                                                                                                          |
| Tailwind classes                      | Supported through the normal compiler, theme aliases, and utility generation.                                | The four sampled utility selectors were absent.                      | Source requirements inspected; **no local Tailwind build** was performed.                                                                               |
| Variant functions / BEM on plain HTML | Reuses visual classes across frameworks.                                                                     | The stylesheet supplies class rules independently of React.          | **Documented/source-supported styling path**; no framework-behavior equivalence claim.                                                                  |

Sources: [styling examples][d-styling], [composition][d-composition], [class helper][s-compose], [runtime evidence][e-runtime]. No Emotion or styled-components runtime requirement is imposed on consumers merely by HeroUI documenting those integrations.

A compact illustration of the tested kind of boundary is:

```tsx
<Button className={styles.confirm}>Confirm</Button>
```

```css
/* Ordinary application CSS or a CSS Module, with baseline library CSS loaded. */
.confirm {
  background: var(--application-action-background);
  border-radius: 0.375rem;
}
```

That customization is valid because the component forwards the class. Whether the new colors, focus treatment, disabled state, and motion remain appropriate is a separate design/accessibility obligation.

## 5. Tokens, surfaces, typography, and motion

### 5.1 Semantic variables and theme scope

HeroUI's theme is expressed with CSS custom properties: page background/foreground, surfaces and their foregrounds, overlay colors, accent, default/neutral treatment, status colors, fields, focus, radius, and shadows. A shared `@theme inline` layer maps these to Tailwind-facing names, for example `--accent` to `--color-accent`. The semantic runtime variable and the compiler-facing alias are not interchangeable naming conventions. [Theme variables][s-theme-variables], [theme bridge][s-theme-bridge], [colors][d-colors].

Light/dark selectors include classes and `data-theme` forms. CSS variables make local scoping straightforward inside the DOM tree. `Surface` additionally exposes its variant through React context. That context is an appearance/composition mechanism, not a DOM inheritance bridge for arbitrary custom properties. It does not mean every contained field automatically restyles itself: beta.4 removed automatic surface detection from eleven field components, and current Input guidance explicitly requests `variant="secondary"` on a Surface. [Dark mode][d-dark-mode], [Surface][d-surface], [Surface source][s-surface], [beta.4][d-release-beta4], [Input][d-input].

Popover and Modal reset the inspected `SurfaceContext` at their overlay boundary. Their inspected implementations do not copy the nearest scope's theme classes or computed custom properties into the default portal. In the specimen:

| Observation                | Default Popover / Modal | Explicit local Popover container |
| -------------------------- | ----------------------- | -------------------------------- |
| Inside nested dark element | No                      | Yes                              |
| Inherited `--accent`       | Document blue           | Nested `rgb(198, 42, 76)`        |
| Inherited private marker   | Absent                  | `nested-only`                    |
| Focus moved inside         | Yes                     | Yes                              |

An explicit `UNSTABLE_portalContainer` solved **this inheritance specimen**. It is an upstream unstable API and a consumer decision with layout/stacking implications; it is not evidence that all portal use cases or overlay families are solved. [Popover source][s-popover], [Modal source][s-modal], [runtime evidence][e-runtime], [inspected screenshot][e-screenshot].

### 5.2 Geometry and typography

The default visual language is rounded, with compact controls and strong emphasis contrast. The source Button heights are **36/32px, 40/36px, and 44/40px** for small/medium/large at the mobile/desktop rules respectively. The local desktop default measured **36px height, 24px computed border radius, 16px horizontal padding, and 14px/20px, weight-500 text**. These are Button findings, not a complete dimensional audit of every family. [Button CSS][s-button-css], [runtime evidence][e-runtime].

The documentation site loads **Inter** through `next/font/google` and maps its variable into `--font-sans`. The live Button sample used Inter; the local specimen deliberately used the system stack provided by its environment. A visually close local screenshot therefore is not pixel-identity proof against the deployed documentation. [Docs layout][s-docs-layout], [docs CSS][s-docs-css], [live style capture][e-live-styles].

Typography is customizable independently of component behavior. Cinder can learn from consistent text metrics and semantic foreground pairing without inheriting HeroUI's font or radius. Any adopted metric would need testing with Cinder's actual fonts, language coverage, density, and long content. [Typography][d-typography], [theming][d-theming].

### 5.3 Motion

v3 uses CSS-based motion and documents `prefers-reduced-motion` / `data-reduce-motion` controls. The shared overlay motion source is distinct from the retained `tw-animate-css` consumer utilities. Migration prose about global animation toggles should be reconciled with the current animation page and current CSS. [Animation][d-animation], [overlay motion source][s-overlay-motion], [CSS entry][s-css-entry].

In the bounded reduced-motion probe, Button's computed `transition-property` became **`none`**, while a forced `data-pressed="true"` still produced **`matrix(0.97, 0, 0, 0.97, 0, 0)`**. The state was set directly to inspect CSS; it was not a held physical input event. Thus “reduced motion” here removes that transition but does not remove the pressed scale itself. It is not a blanket animation-disable guarantee across the library. [Button CSS][s-button-css], [runtime evidence][e-runtime].

## 6. Composition and component-family findings

### 6.1 Public composition contract

The common pattern is a callable root with named parts and a `.Root` alias, plus separately exported components and variants. Part props are derived from the underlying primitives and the library's own variant contract. Installed declarations expose compound prop aliases, including forms such as `Button["Props"]`; consumers should use the actual exported types rather than assume every component follows an identical namespace shape. [Button exports][s-button-exports], [composition][d-composition].

At the tested Button boundary:

- Consumer string classes and render-prop classes preserve the `button` BEM hook.
- `style`, a custom `render` callback, and the Button DOM ref survive composition.
- A custom renderer spreading the supplied props onto a native button still activated **once** on Enter.

This proves a useful composition path. It does not establish arbitrary element substitution: changing the semantic element or dropping supplied props/ref can lose the behavior being composed. Applying `buttonVariants()` to a link is visual reuse; the link still needs correct navigation semantics. [Button source][s-button], [runtime evidence][e-runtime].

The exceptions are material. `Avatar.Image` documents `asChild` and requires `src` on that part even when rendering a custom image, so loading/fallback tracking remains connected. ButtonGroup defaults apply only to direct Button children, and a child can override group disabling with `isDisabled={false}`; ToggleButtonGroup also permits that override. TagGroup instead owns size/variant and says they cannot be overridden per tag. A common-looking prop name does not establish uniform inheritance, disabling, or polymorphism rules. [Avatar][d-avatar], [ButtonGroup][d-button-group], [ToggleButtonGroup][d-toggle-button-group], [TagGroup][d-tag-group].

### 6.2 Representative families

| Family           | Important reviewed contract                                                                                                                                                                          | Consequence for a Cinder design                                                                                                                                                            |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Button           | Semantic emphasis, size modifiers, native/RAC state hooks, string/function classes, refs, style, custom `render`.                                                                                    | Publish a small, predictable customization contract and verify it with keyboard input.                                                                                                     |
| Checkbox         | Root uses RAC `CheckboxField`; Content uses `CheckboxButton`; Control is a decorative span. Description and FieldError are siblings of Content.                                                      | A component name does not identify its DOM role. The tested Control ref targets a **span**; the supplied root ID reached the native input. Document each part's target and relationship.   |
| Switch           | Its anatomy differs from Checkbox's field/content split.                                                                                                                                             | Avoid mechanically imposing one compound tree on every selection control.                                                                                                                  |
| TextField / Form | Shared Label/Input/Description/FieldError composition and validation-state propagation.                                                                                                              | Keep helper text, errors, validity, and native form behavior explicit. The local probe used controlled `isInvalid` with `validationBehavior="aria"`, not a native-submit validation audit. |
| Select           | Triggered selection rather than an editable input. Its documented ClearButton is a pointer-only span; Backspace/Delete provide keyboard clearing.                                                    | Judge the complete keyboard path, rather than assuming each visible pointer affordance is independently tabbable. This path was read, not runtime-tested here.                             |
| Autocomplete     | Select-style composition with filtering in the popup.                                                                                                                                                | Do not conflate a filterable select with an editable combobox.                                                                                                                             |
| ComboBox         | Editable input plus suggestion selection.                                                                                                                                                            | Model free typing, filtering, and selection as distinct behaviors in the API and docs.                                                                                                     |
| Table            | `Table.Content` inherits RAC's interactive table/grid model.                                                                                                                                         | A table family needs an explicit keyboard, selection, and interactive-cell contract; styling alone cannot establish it.                                                                    |
| Modal / Popover  | Composed trigger/content/dialog parts, dismiss slots, focus management, portal boundaries.                                                                                                           | Theme inheritance and focus restoration are part of the component contract, not just overlay appearance.                                                                                   |
| Sheet            | Drag/snap behavior; numeric snap points are pixels and full expansion is implicit. The handle has no keyboard dragging; docs require accessible close controls. Drawer remains a separate component. | A gesture needs an accessible alternative and clearly documented units/state. Read-only evidence does not establish touch or pointer-capture correctness.                                  |
| Toast            | Provider/queue composition, variants/actions, dismissal, stack interaction, timer pausing; built on unstable upstream toast APIs.                                                                    | Treat notification timing and queue lifecycle as product behavior, with a deliberate stability boundary.                                                                                   |

Sources: [Button][d-button], [Checkbox][d-checkbox], [Checkbox source][s-checkbox], [Switch source][s-switch], [TextField][d-text-field], [Form][d-form], [Select][d-select], [Autocomplete][d-autocomplete], [ComboBox][d-combo-box], [Table][d-table], [Modal][d-modal], [Popover][d-popover], [Sheet][d-sheet], [Toast][d-toast].

The completed full reads extend this anatomy/state review across every canonical component page, including navigation, collections, date/time, color controls, media, layout, feedback and form primitives, with their inline examples and API tables. They support the documented contracts and family exceptions below; they do not establish runtime parity, complete implementation-source review or accessibility conformance across those families. [Per-page findings][e-durable].

### 6.3 Field feedback: a concrete docs/source/runtime discrepancy

The FieldError page describes truncation with ellipsis. The published CSS instead wraps, and the 230px-wide specimen rendered the long message across **five 16px lines**, with `white-space: normal`, `overflow-wrap: break-word`, and `text-overflow: clip`; its 230px scroll width did not exceed its client width. [FieldError][d-field-error], [FieldError CSS][s-field-error-css], [runtime evidence][e-runtime].

When the TextField became invalid, Description changed to `display: none`, while the input's `aria-describedby` contained both `field-description` and `field-error`, and `aria-invalid` was `true`. These observations establish visual helper-text hiding and the DOM association, not what every screen reader will announce. A Cinder policy should decide whether recovery-critical instructions remain visibly available during errors rather than inherit that choice accidentally. [TextField CSS][s-textfield-css], [runtime evidence][e-runtime].

The broader documentation repeats description hiding for **ColorField, DateField, TimeField, NumberField, and SearchField** when invalid. This extends the documented policy concern; it does not extend the TextField runtime result to those controls. `ErrorMessage` is separately documented as non-form error text, while `FieldError` handles form-validation integration. Keeping those responsibilities distinct is more useful than treating every red text component as interchangeable. [ColorField][d-color-field], [DateField][d-date-field], [TimeField][d-time-field], [NumberField][d-number-field], [SearchField][d-search-field], [ErrorMessage][d-error-message].

### 6.4 Toast has substantial behavior beyond a thin wrapper

The default timeout is **4,000ms**. The source imports `UNSTABLE_Toast*`, extends/adapts the queue, reaches `updateVisibleToasts`, and implements a timer shape compatible with private React Stately behavior to support updates, delayed removal for exits, and pause/resume coordination. The source comments explicitly describe that coupling. [Toast constants][s-toast-constants], [Toast queue][s-toast-queue], [Toast component][s-toast].

This is a meaningful maintenance boundary, not just a different class name. The four-second default also differs from the five-second recommendation captured in Cinder's [RAC research](research-rac.md). That difference is not, by itself, an accessibility-conformance verdict. Notification criticality, actions, persistence, pause behavior, and the time users need to read the content still require a product policy. Toast runtime behavior was not exercised in this specimen.

### 6.5 Migration and release deltas are behavioral contracts

The migration corpus makes several ownership changes explicit:

| Contract                 | Documented change                                                                                                                                                                                                                   | Cinder-relevant consequence                                                                                                                       |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Interaction model        | v2 Autocomplete maps most closely to v3 **ComboBox**; v3 Autocomplete puts its search inside a selection popup.                                                                                                                     | Choose a behavior model before mapping a familiar component name.                                                                                 |
| Identity and values      | React `key`, behavioral `id`, and `textValue` have separate jobs. Select migrates Set-based selection props to `Key \| null` or `Key[]`; ordinary Input/TextArea use DOM change events, while date/color controls use typed values. | Document identity, controlled state, nullability, and callback payloads per family. A shared `onChange` spelling does not imply one payload type. |
| Caller-owned behavior    | Navbar and Image are removed; optional replacement wrappers are application code. Pagination moves page generation/windowing/boundaries to callers; Skeleton replaces `isLoaded` wrapping with conditional rendering.               | Evaluate the behavior and maintenance moved to consumers, not only the smaller library API.                                                       |
| Defaults and composition | Drawer defaults change from right to bottom; ProgressCircle's indeterminate default changes from true to false; Button loses its old minimum widths. Multi-month calendars need both visible duration and offset grids.             | Compatibility review must include defaults, layout and composed state, not just renamed props.                                                    |
| Optional parts           | NumberField's migration summary says steppers “must” be included, while its examples explicitly omit them; ListBox similarly overstates required Description/ItemIndicator parts.                                                   | Do not turn contradictory migration prose into Cinder's mandatory anatomy.                                                                        |

Sources: [Autocomplete migration][d-migrate-autocomplete], [migration index][d-migration], [Select migration][d-migrate-select], [Input][d-input], [TextArea][d-text-area], [DateField][d-date-field], [ColorField][d-color-field], [Navbar migration][d-migrate-navbar], [Image migration][d-migrate-image], [Pagination migration][d-migrate-pagination], [Skeleton migration][d-migrate-skeleton], [Drawer migration][d-migrate-drawer], [ProgressCircle migration][d-migrate-progress-circle], [Button migration][d-migrate-button], [Calendar migration][d-migrate-calendar], [NumberField migration][d-migrate-number-field], [ListBox migration][d-migrate-listbox].

Release history needs the same precision. Alpha.35 required `.Root`, beta.1 restored callable-root shorthand, beta.1 added Link `asChild`, and beta.3 removed it. These are historical transitions, not evidence that the current API is internally inconsistent. Stable releases still carry compatibility work: **3.0.5 explicitly breaks `Text`/`.text` into `Typography`/`.typography`** to avoid `tailwind-merge` collisions; **3.2.0 requires explicit Radio/Checkbox/Switch Content composition**; **3.2.3 changes React Aria packages to peers and requires Node 22+**; **3.2.6 adds the date peer and renames `fieldset__field_group` to `fieldset__field-group`**. These notes support versioned JS, CSS-hook, peer and environment contracts, including patch upgrades. [Alpha.35][d-release-alpha35], [beta.1][d-release-beta1], [beta.3][d-release-beta3], [3.0.5][d-release-305], [3.2.0][d-release-320], [3.2.3][d-release-323], [3.2.6][d-release-326].

Dependency-instance and QA claims also have boundaries. The notes trace externalizing `react-aria` subpaths in 3.2.1, caret ranges in 3.2.2, peers in 3.2.3, and declaration cleanup in 3.2.6. They support deliberate deduplication, not a new claim of a present duplicate-instance defect. The 3.2.4 test harness documents both jsdom and browser projects, but coverage floors apply to jsdom only; this research did not run those upstream suites. The MIT-to-Apache change is explicitly announced in 3.0.3 and independently supported by the current package licenses. [3.2.1][d-release-321], [3.2.2][d-release-322], [3.2.3][d-release-323], [3.2.4][d-release-324], [3.2.6][d-release-326], [3.0.3][d-release-303], [package pins][e-pins].

## 7. Accessibility: evidence and remaining responsibility

HeroUI treats accessibility as foundational and delegates much of its keyboard, focus, labeling, and interaction behavior to React Aria. Its component docs include accessibility guidance. This is a strong architectural starting point, but it is not certification of every composition or custom theme. [Design principles][d-principles], [component reading coverage][e-durable].

The local browser evidence establishes these bounded facts:

- Button remained a native button after the tested custom render and activated once on Enter.
- Checkbox toggled with Space and retained input focus; its accessible name was present in the browser snapshot.
- The invalid TextField exposed `aria-invalid` and a DOM error association, with wrapping error text.
- Default Popover moved focus into its dialog and restored trigger focus after Escape; the explicit local-container path also opened and dismissed successfully.
- Modal moved focus inside, retained it for the sampled backward/forward Tab steps, and restored trigger focus on Escape.
- The sampled reduced-motion Button rule removed transitions while retaining pressed scale.

The complete [runtime record][e-runtime] contains **20 passing checks**, including styling and portal-inheritance checks. Passing a check that demonstrates lost theme scope is a successful observation of a limitation, not a claim that the limitation is desirable.

The application still owns accessible names, meaningful labels, instructions and recovery copy, contrast after token changes, logical DOM order, valid native semantics, and appropriate choices of selection/validation/notification behavior. Custom renderers and wrappers must preserve the supplied relationships, handlers, and refs. The automatic behavior does not compensate for a consumer replacing an interactive root with an unsuitable element or hiding the only useful instruction. [Composition][d-composition], [Form][d-form], [Sheet][d-sheet].

**Not established here:** screen-reader announcements; manual assistive-technology usability; a whole-library WCAG audit; exhaustive focus-cycle coverage; forced-colors/high-contrast behavior; zoom/reflow; RTL/localization; touch/drag/pointer capture; browser differences; SSR/hydration; every disabled, pending, loading, validation, collection, and overlay state. Source and documentation coverage must not be promoted into those claims.

## 8. Licensing and font provenance

| Material                      | Verified boundary                                                                                                                                                             | Consequence                                                                                                                                                                                                                                                       |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| React/styles v3.2.7           | Package metadata and included license are **Apache-2.0**.                                                                                                                     | Reuse/distribution of covered code requires the applicable license and notices; modified files need the required change notices, and any supplied NOTICE obligations must be retained where applicable. Apache's patent terms are distinct from trademark rights. |
| HeroUI v2 / NextUI comparison | Archived package metadata says **MIT** for the exact older versions listed above.                                                                                             | Do not carry the old license assumption into v3. This is metadata evidence, not a complete audit of every historical asset/dependency.                                                                                                                            |
| Documentation font            | Site source loads **Inter**. The archived Inter license is **OFL-1.1**, pinned to Google Fonts commit **`b0928647ba26c8d55548aa19feb2f7aeba622d4a`** for `ofl/inter/OFL.txt`. | Font redistribution/modification follows its own license, including preservation of copyright/license terms and applicable naming conditions. The package code license does not replace the font license.                                                         |
| Commercial packs and branding | Outside this review.                                                                                                                                                          | This report establishes no rights for commercial assets, logos, or third-party brand use.                                                                                                                                                                         |

Sources: [package pins][e-pins], [Apache license][s-license], [pinned Inter OFL][s-inter-license], [docs layout][s-docs-layout].

No font binaries were found in the acquired React/styles packages. The Inter evidence pins the **license file**, not a chosen font binary release. If Cinder chooses a font later, its actual files and version/provenance need their own record. The source tree and npm archives are retained locally; they are not copied into Cinder's product packages by this research.

## 9. Discrepancy and confidence register

| Topic                       | Documentation or tempting inference                                                                                           | Stronger evidence / conclusion                                                                                                                                                                                                                               |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Precompiled CSS import      | The frameworks page recommends `@heroui/styles/dist/heroui.min.css`.                                                          | File exists, but the published export map blocks that subpath in Node. Directly serving it works in the local specimen.                                                                                                                                      |
| Bare component CSS import   | Theming says `@heroui/styles/components` resolves as a directory.                                                             | No matching published bare export; Node rejects it. An explicit exported component `.css` path resolves.                                                                                                                                                     |
| “Any CSS tool”              | Could be read as no Tailwind requirement anywhere.                                                                            | Consumer override freedom is real; the normal HeroUI stylesheet source still requires Tailwind v4 processing.                                                                                                                                                |
| Precompiled utility classes | Could be read as containing any Tailwind class a consumer writes.                                                             | The four sampled utility selectors were absent, and supplied width/radius utilities had no effect.                                                                                                                                                           |
| Layer identity              | Source declares four named layers.                                                                                            | The sampled precompiled CSSOM has an anonymous layer; do not assume identical named-layer override behavior for both distributions.                                                                                                                          |
| Composition API             | Full migration still recommends `asChild`; a blanket removal could seem appropriate.                                          | General composition uses `render`, but Avatar.Image still documents `asChild`. Check the actual part and version.                                                                                                                                            |
| Color variable              | Full migration shows `--color-primary`.                                                                                       | Current semantic accent contract is `--accent`, with compiler aliases in the shared theme.                                                                                                                                                                   |
| Motion                      | Broad migration prose about no global toggle or automatic accessibility.                                                      | Current animation controls need current CSS interpretation; Button reduced motion did not remove pressed scale.                                                                                                                                              |
| FieldError text             | Docs describe ellipsis.                                                                                                       | Source and runtime wrap the tested long error.                                                                                                                                                                                                               |
| Nested themes               | A React context boundary could be mistaken for CSS theme transport.                                                           | Default sampled portals lost nested variables; an explicit local container retained them.                                                                                                                                                                    |
| License                     | Older HeroUI/NextUI familiarity suggests MIT.                                                                                 | Reviewed current v3 packages carry Apache-2.0.                                                                                                                                                                                                               |
| Group inheritance           | A disabled or styled group always controls every descendant uniformly.                                                        | ButtonGroup/ToggleButtonGroup permit child disabled overrides; TagGroup makes size/variant group-owned.                                                                                                                                                      |
| Component styling tables    | Every named CSS variant/state entry is exact.                                                                                 | Accordion lists `outline` CSS against a `default \| surface` API; Disclosure labels `aria-hidden="false"` as “Hidden”; Radio.Control's children table and render-function prose differ. These are documentation discrepancies, not measured runtime defects. |
| Agent migration workflows   | The full/incremental recipes can be applied mechanically.                                                                     | Incremental guidance permits v2-only components yet later removes v2 dependencies/styles; full guidance conflicts on switch/test order. Both workflows include a nonmatching `#step-6-component-migration-reference` fragment.                               |
| Migration API freshness     | The TimeInput guide imports `DateInputGroup` directly; Slider's old `showSteps`/`marks` prop rows can imply missing features. | Beta.7 removes the direct field-group export and the current TimeField page uses namespaced parts. The current Slider page documents optional Steps/Marks composition; removed convenience props do not imply absent rendering features.                     |
| Inline replacement examples | An optional Image wrapper preserves the removed component's complete behavior.                                                | Its loading example lacks error cleanup and spreads trailing props after its internal `onLoad`, allowing that handler to be replaced. This is an inline-example finding, not a tested library defect.                                                        |
| Release labels              | Patch/minor versions imply no migration work.                                                                                 | 3.0.5 and 3.2.0 explicitly announce breaking changes; later patches alter peers, environment requirements and CSS hooks.                                                                                                                                     |

These entries are grounded in the preceding linked docs, source, resolver, and browser evidence. They are release-scoped findings, not claims that the live documentation or future packages will always behave this way.

The additional text-level discrepancies are documented in [Accordion][d-accordion], [Disclosure][d-disclosure], [RadioGroup/Radio][d-radio-group], [full agent workflow][d-agent-full], [incremental agent workflow][d-agent-incremental], and [Image migration][d-migrate-image]. The six literal workflow includes all target the independently full-read migration index; two fragments miss its actual `Component Migration Reference` heading. This reconciles source-text coverage without claiming the expanded workflow bundles resolve or were read. Smaller naming, optional-part and example-boundary issues remain attached to their individual pages in the coverage appendix.

The TimeInput/Slider reconciliation compares [TimeInput migration][d-migrate-timeinput], [beta.7's explicit export change][d-release-beta7], [current TimeField][d-time-field], [Slider migration][d-migrate-slider] and [current Slider][d-slider]. These are cross-document conflicts and distinctions at the pinned snapshot, not new package-resolution or runtime tests.

## 10. Opportunities for Cinder's original system

These are proposals for the main cross-system synthesis, ordered by the problems they solve.

1. **Make the customization contract explicit.** Specify root and part DOM targets, stable namespaced CSS hooks, state hooks, string/function class support, refs, style, and custom-render obligations. HeroUI's BEM/anatomy tables are a strong presentation model. Cinder's [baseline audit](research-cinder-baseline.md) already identifies uneven customization boundaries; reuse the working RAC foundation while resolving those boundaries.
2. **Distribute CSS that matches the promised consumer experience.** A ready-to-use exported stylesheet should work in an external consumer without an undocumented compiler or resolver bypass. If authoring uses a compiler, keep that build-time choice distinct from consumer requirements. Preserve an intentional cascade contract and prove package exports against packed artifacts.
3. **Use semantic emphasis with original visual decisions.** Adopt a coherent primary/secondary/tertiary action hierarchy and clear destructive intent, while deciding Cinder's palette, type, geometry, density, and motion independently. Base's cited hierarchy and Carbon's established guidance are inputs to that decision, not interchangeable implementations.
4. **Keep relationships connected through composition.** Shared labels, descriptions, errors, and compound parts should remain usable without reconstructing IDs, focus behavior, or native form semantics. Publish family exceptions such as Checkbox's decorative Control ref, Select versus ComboBox interaction models, typed event/value payloads, and group inheritance/disabled overrides. Avoid shifting common state and accessible behavior into ad hoc consumer wrappers merely to shrink the library API.
5. **Design theme scope across portals.** Choose and document what crosses an overlay boundary: built-in theme, density/layer/direction, and consumer custom variables. Prove nested-theme overlays in a real browser. Cinder's existing bridge is an asset, but its documented scope should match what it actually carries.
6. **Make content and motion policies deliberate.** Preserve readable errors and recovery instructions; specify reduced-motion behavior by component/state; choose notification timeouts/actions/persistence intentionally. HeroUI supplies useful examples and concrete counterexamples to test against.
7. **Keep agent-facing documentation synchronized with releases.** Anatomy/state tables, current MDX text, source links, and concise design guidance improve DX. Generate or validate them against package contracts, resolve include fragments, and reconcile examples before agents apply them. Treat CSS-hook renames, peer/environment requirements and changed defaults as versioned compatibility surfaces alongside React props; patch/minor labels alone do not prove compatibility.

A focused future acceptance set would include an external packed-CSS consumer; a representative native control, compound field, collection, and portal; plain CSS/CSS Modules plus the CSS-in-JS integrations actually promised; ref/handler preservation; keyboard and manual assistive-technology journeys; nested themes; long validation copy; and reduced motion. These are proposed gates, not tests performed by this research.

## 11. Runtime provenance and precise gaps

The isolated fixture lives entirely in the ignored archive. It uses published HeroUI/styles **3.2.7**, existing read-only **React/React DOM 19.3.1**, **RAC 1.22.1**, **react-aria 3.53.1**, **react-stately 3.51.0**, and **date 3.12.4**, with the exact supporting packages recorded in [package resolution][e-resolution]. Archive-only dependency links were used; no installer was run against Cinder. Bun **1.4.4** built the fixture and CSS Module. Node **24.21.0** supplied the resolver assertions. [Build result][e-build], [fixture preparation][e-prepare].

Browser checks used installed **agent-browser 0.41.2**, the worktree-scoped session **`hashti-heroui-research-ea076105fc74`**, and **Chrome for Testing 157.0.8103.38**, at **1280 × 960 CSS pixels**. The final probe completed with 20/20 named checks passing. The [local screenshot][e-screenshot] was inspected. The earlier live Button capture is supplementary: lazy-loaded blank sections and an upsell overlay limit its visual coverage, and its deployed dependency versions were not independently pinned. [Probe source][e-probe], [live style capture][e-live-styles].

The final [evidence verification record][e-verification] checks all 179 saved acquisitions and selected reviewed texts, complete LF-based ranges and retained delivery proof, the 14 disjoint batches, all 4,611 indexed source/package files, 96 CSS equivalence pairs, tarball integrity, original provenance, durable evidence entries/hashes, local reference targets and both documents' formatting. It reruns the reading reconciliation to prove reproducibility. The existing **20/20** runtime results are checked as unchanged saved evidence; no browser probe, acquisition or Cinder product test was rerun for this completion.

The important remaining gaps are:

- **Canonical document-text coverage is complete.** Most linked demo implementations, rendered/transcluded output, visuals, and upstream implementation/test files remain outside full-reading or runtime coverage.
- **Emotion and styled-components are source/documentation inferences**, not local runtime results. Their own SSR, injection ordering, JSX transforms, and polymorphic behavior were not tested.
- **No local normal Tailwind pipeline build or framework install matrix** was executed. The successful runtime deliberately served the precompiled artifact directly.
- **No SSR/hydration, Firefox/WebKit, screen-reader, complete accessibility, mobile gesture, or whole-library state audit** was performed. Toast, Sheet gestures, Select clearing, collections, and date/color controls have no local runtime proof in this report.
- Published/source CSS equivalence covers **96 files**, not the entire source commit or deployed docs. The source snapshot is pinned independently of npm publication.

The report's claims stop at those boundaries. The acquisition and source ledgers make further work selectable by a specific unanswered question rather than requiring the completed research to be repeated.

## References

Canonical documentation links identify the public page; the [durable coverage appendix][e-durable] supplies its exact selected text path, SHA-256, full-read ranges and immutable source pointer alongside the separate reader acquisition. Source-code references below use immutable commit URLs. Local evidence is ignored by Git, so the essential versions, counts, observations, limitations and per-page reading evidence are preserved in these two research documents.

[d-principles]: https://heroui.com/en/docs/react/getting-started/design-principles
[d-principles-mdx]: https://heroui.com/en/docs/react/getting-started/design-principles.mdx
[d-styling]: https://heroui.com/en/docs/react/getting-started/styling
[d-frameworks]: https://heroui.com/en/docs/react/getting-started/frameworks
[d-composition]: https://heroui.com/en/docs/react/getting-started/composition
[d-theming]: https://heroui.com/en/docs/react/getting-started/theming
[d-colors]: https://heroui.com/en/docs/react/getting-started/colors
[d-dark-mode]: https://heroui.com/en/docs/react/getting-started/dark-mode
[d-animation]: https://heroui.com/en/docs/react/getting-started/animation
[d-quick-start]: https://heroui.com/en/docs/react/getting-started/quick-start
[d-design-file]: https://heroui.com/react/DESIGN.md
[d-full-migration]: https://heroui.com/en/docs/react/migration/full-migration
[d-incremental-migration]: https://heroui.com/en/docs/react/migration/incremental-migration
[d-button]: https://heroui.com/en/docs/react/components/button
[d-checkbox]: https://heroui.com/en/docs/react/components/checkbox
[d-form]: https://heroui.com/en/docs/react/components/form
[d-modal]: https://heroui.com/en/docs/react/components/modal
[d-popover]: https://heroui.com/en/docs/react/components/popover
[d-surface]: https://heroui.com/en/docs/react/components/surface
[d-typography]: https://heroui.com/en/docs/react/components/typography
[d-select]: https://heroui.com/en/docs/react/components/select
[d-autocomplete]: https://heroui.com/en/docs/react/components/autocomplete
[d-combo-box]: https://heroui.com/en/docs/react/components/combo-box
[d-table]: https://heroui.com/en/docs/react/components/table
[d-sheet]: https://heroui.com/en/docs/react/components/sheet
[d-toast]: https://heroui.com/en/docs/react/components/toast
[d-text-field]: https://heroui.com/en/docs/react/components/text-field
[d-field-error]: https://heroui.com/en/docs/react/components/field-error
[d-avatar]: https://heroui.com/en/docs/react/components/avatar
[d-button-group]: https://heroui.com/en/docs/react/components/button-group
[d-toggle-button-group]: https://heroui.com/en/docs/react/components/toggle-button-group
[d-tag-group]: https://heroui.com/en/docs/react/components/tag-group
[d-input]: https://heroui.com/en/docs/react/components/input
[d-text-area]: https://heroui.com/en/docs/react/components/text-area
[d-color-field]: https://heroui.com/en/docs/react/components/color-field
[d-date-field]: https://heroui.com/en/docs/react/components/date-field
[d-time-field]: https://heroui.com/en/docs/react/components/time-field
[d-number-field]: https://heroui.com/en/docs/react/components/number-field
[d-search-field]: https://heroui.com/en/docs/react/components/search-field
[d-error-message]: https://heroui.com/en/docs/react/components/error-message
[d-accordion]: https://heroui.com/en/docs/react/components/accordion
[d-disclosure]: https://heroui.com/en/docs/react/components/disclosure
[d-radio-group]: https://heroui.com/en/docs/react/components/radio-group
[d-migration]: https://heroui.com/en/docs/react/migration
[d-migrate-autocomplete]: https://heroui.com/en/docs/react/migration/autocomplete
[d-migrate-select]: https://heroui.com/en/docs/react/migration/select
[d-migrate-navbar]: https://heroui.com/en/docs/react/migration/navbar
[d-migrate-image]: https://heroui.com/en/docs/react/migration/image
[d-migrate-pagination]: https://heroui.com/en/docs/react/migration/pagination
[d-migrate-skeleton]: https://heroui.com/en/docs/react/migration/skeleton
[d-migrate-drawer]: https://heroui.com/en/docs/react/migration/drawer
[d-migrate-progress-circle]: https://heroui.com/en/docs/react/migration/circular-progress
[d-migrate-button]: https://heroui.com/en/docs/react/migration/button
[d-migrate-calendar]: https://heroui.com/en/docs/react/migration/calendar
[d-migrate-number-field]: https://heroui.com/en/docs/react/migration/numberinput
[d-migrate-listbox]: https://heroui.com/en/docs/react/migration/listbox
[d-migrate-timeinput]: https://heroui.com/en/docs/react/migration/timeinput
[d-migrate-slider]: https://heroui.com/en/docs/react/migration/slider
[d-slider]: https://heroui.com/en/docs/react/components/slider
[d-agent-full]: https://heroui.com/en/docs/react/migration/agent-guide-full
[d-agent-incremental]: https://heroui.com/en/docs/react/migration/agent-guide-incremental
[d-release-alpha35]: https://heroui.com/en/docs/react/releases/v3-0-0-alpha-35
[d-release-beta1]: https://heroui.com/en/docs/react/releases/v3-0-0-beta-1
[d-release-beta3]: https://heroui.com/en/docs/react/releases/v3-0-0-beta-3
[d-release-beta4]: https://heroui.com/en/docs/react/releases/v3-0-0-beta-4
[d-release-beta7]: https://heroui.com/en/docs/react/releases/v3-0-0-beta-7
[d-release-303]: https://heroui.com/en/docs/react/releases/v3-0-3
[d-release-305]: https://heroui.com/en/docs/react/releases/v3-0-5
[d-release-320]: https://heroui.com/en/docs/react/releases/v3-2-0
[d-release-321]: https://heroui.com/en/docs/react/releases/v3-2-1
[d-release-322]: https://heroui.com/en/docs/react/releases/v3-2-2
[d-release-323]: https://heroui.com/en/docs/react/releases/v3-2-3
[d-release-324]: https://heroui.com/en/docs/react/releases/v3-2-4
[d-release-326]: https://heroui.com/en/docs/react/releases/v3-2-6
[p-react]: https://registry.npmjs.org/@heroui/react/3.2.7
[p-styles]: ../.research/heroui-2026-11-06/npm/heroui-styles-3.2.7/package/package.json
[s-button]: https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/packages/react/src/components/button/button.tsx
[s-button-exports]: https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/packages/react/src/components/button/index.ts
[s-button-variants]: https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/packages/styles/src/components/button/button.styles.ts
[s-button-css]: https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/packages/styles/components/button.css
[s-checkbox]: https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/packages/react/src/components/checkbox/checkbox.tsx
[s-switch]: https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/packages/react/src/components/switch/switch.tsx
[s-compose]: https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/packages/react/src/utils/compose.ts
[s-popover]: https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/packages/react/src/components/popover/popover.tsx
[s-modal]: https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/packages/react/src/components/modal/modal.tsx
[s-surface]: https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/packages/react/src/components/surface/surface.tsx
[s-textfield-css]: https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/packages/styles/components/textfield.css
[s-field-error-css]: https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/packages/styles/components/field-error.css
[s-css-entry]: https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/packages/styles/index.css
[s-css-variants]: https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/packages/styles/variants/index.css
[s-theme-variables]: https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/packages/styles/themes/default/variables.css
[s-theme-bridge]: https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/packages/styles/themes/shared/theme.css
[s-overlay-motion]: https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/packages/styles/base/overlay-motion.css
[s-toast]: https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/packages/react/src/components/toast/toast.tsx
[s-toast-queue]: https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/packages/react/src/components/toast/toast-queue.ts
[s-toast-constants]: https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/packages/react/src/components/toast/constants.ts
[s-docs-layout]: https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/src/app/%5Blang%5D/layout.tsx
[s-docs-css]: https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/apps/docs/src/app/global.css
[s-license]: https://github.com/heroui-inc/heroui/blob/b2c65a5b5236550526f23d475b1ad0c6e5eab1a2/LICENSE
[s-inter-license]: https://raw.githubusercontent.com/google/fonts/b0928647ba26c8d55548aa19feb2f7aeba622d4a/ofl/inter/OFL.txt
[e-pins]: ../.research/heroui-2026-11-06/source-pins.json
[e-docs]: ../.research/heroui-2026-11-06/docs-manifest.json
[e-discovery]: ../.research/heroui-2026-11-06/discovery/validated-coverage.json
[e-ledger]: ../.research/heroui-2026-11-06/coverage-ledger.md
[e-source-coverage]: ../.research/heroui-2026-11-06/source-coverage.json
[e-supplemental]: ../.research/heroui-2026-11-06/supplemental-acquisition.json
[e-contract-index]: ../.research/heroui-2026-11-06/reading/component-contracts-index.json
[e-runtime]: ../.research/heroui-2026-11-06/runtime/browser-results.json
[e-resolution]: ../.research/heroui-2026-11-06/runtime/package-resolution.json
[e-build]: ../.research/heroui-2026-11-06/runtime/build-result.json
[e-css-entry]: ../.research/heroui-2026-11-06/npm/heroui-styles-3.2.7/package/dist/index.css
[e-css-comparison]: ../.research/heroui-2026-11-06/source/styles-source-comparison.json
[e-server]: ../.research/heroui-2026-11-06/runtime/server.ts
[e-screenshot]: ../.research/heroui-2026-11-06/runtime/specimen-default-portal.png
[e-live-styles]: ../.research/heroui-2026-11-06/runtime/live-button-styles.json
[e-prepare]: ../.research/heroui-2026-11-06/runtime/prepare.mjs
[e-probe]: ../.research/heroui-2026-11-06/runtime/probe.py
[e-finalize]: ../.research/heroui-2026-11-06/finalize-evidence.py
[e-acquisition-diagnostics]: ../.research/heroui-2026-11-06/discovery/acquisition-diagnostics.json
[e-verification]: ../.research/heroui-2026-11-06/verification.json
[e-durable]: research-heroui-coverage.md
[e-full-reads]: ../.research/heroui-2026-11-06/reading/full-document-reads.json
[e-prior-reads]: ../.research/heroui-2026-11-06/reading/prior-read-path-recovery.json
[e-history]: ../.research/heroui-2026-11-06/history/pre-full-reading/
