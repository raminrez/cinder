# Cinder — an original system informed by Carbon, Base, and HeroUI

**Research date: 6 November 2026.** Historical design and architecture proposal,
written before the four-direction comparison and the later Astryx research.
**Frame is now the selected direction**; [DESIGN.md](../DESIGN.md), the
[system specification](design-system.md), and [library plan](component-library-plan.md)
record the current visual authority and next work. The candidate values and APIs
below remain the original proposals, not current package contracts. The Carbon-led
brief is retained for the existing baseline surfaces in [design direction](design-direction.md).

## Recommendation

**Evolve Cinder's existing RAC behavior and static CSS into a system with precise
layout, approachable controls, clear action hierarchy, and a dependable public
styling interface.** Carbon supplies useful dimensional and state discipline;
Base supplies contextual choices, proportional geometry, and content guidance;
HeroUI supplies a useful model for discoverable anatomy and progressive composition.

The highest-value change would be consistency at the consumer interface: knowing
where a class or ref lands, how an inner part can be styled, which state owns an
attribute, and how a custom theme reaches an overlay. A new palette alone would
leave those problems intact.

Original recommended sequence, subsequently carried into the prototype comparison:

1. Compare the **Field** visual candidate below with the current Cinder baseline
   using a form, a data workspace, and a nested-overlay task.
2. Prove one styling interface across plain CSS, CSS Modules, Tailwind, Emotion,
   and styled-components before advertising support for all five.
3. Extend that proven contract through the existing catalog; attach behavioral,
   visual, accessibility, and compatibility evidence to each family's maturity.

Evidence: [current Cinder audit][cinder], [Base findings][base], and
[HeroUI findings][hero]. Those reports link to primary documentation, pinned source,
package metadata, and the precise scope of saved or newly observed behavior.

## 1. What each source can contribute

| Input                         | Useful contribution                                                                                                                                     | Adoption judgment                                                                                                                                                |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Carbon v11 and current Cinder | Semantic colors, contextual surface tokens, type/spacing discipline, complete state recipes, documented behavior, existing package checks               | Retain the rigor and working invariants. Treat Carbon-branded values and square geometry as explicit design choices                                              |
| Base design documentation     | Action/selection/navigation distinctions, row and dock composition, footprint-related corners, content hierarchy, feedback selection, inclusive writing | Transfer the reasoning. Base 1.0/2.0, native/web, public/private, and intended/shipped rules require version and platform qualifications                         |
| Base Web implementation       | Named override parts, theme organization, practical table/localization distinctions                                                                     | Learn from reach and discoverability. A Styletron engine and unrestricted nested replacement interface add obligations Cinder does not need for ordinary styling |
| HeroUI v3.2.7                 | Semantic emphasis, compound anatomy, state/part tables, class composition, CSS-addressable appearance, machine-readable documentation                   | Reuse the interface lessons. Its normal source CSS requires Tailwind v4; its precompiled artifact has a documented-import/export-map discrepancy                 |
| RAC and the browser           | Interaction state, controlled values, focus/label relationships, native semantics, form and locale behavior                                             | Keep behavior with its established owner; custom appearance and composition must preserve its contract                                                           |

Sources: [Carbon foundations](research-carbon.md#foundations),
[Cinder's corrected baseline](research-cinder-baseline.md#6-carbon-fidelity-and-the-originality-boundary),
[Base controls](research-base.md#3-controls-share-composition-preserve-meaning),
[Base Web](research-base.md#8-base-web-implementation-and-maintenance),
[HeroUI design principles](research-heroui.md#3-design-principles-worth-transferring),
[RAC research](research-rac.md).

**Originality should come from a coherent set of relationships.** A useful signature
could be crisp content alignment, subtly softened interaction surfaces, consistent
spacing around grouped tasks, and a recognizable action/selection language. That
is more defensible than combining Carbon's colors, Uber's font, and HeroUI's button
shape without a common rationale.

### Why evolve Cinder

Cinder already supplies 45 catalog entries representing portions of 39 Carbon
families, explicit prebuilt CSS, generated tokens, controlled-value composition,
and isolated package-consumer verification. Its latest saved aggregate contains
12 unit tests / 129 assertions and 92 browser tests; the audit reconciled the
current bytes of all 70 recorded files. These are historical results, not fresh
executions or complete accessibility certification.
[Baseline and evidence](research-cinder-baseline.md#executive-finding).

Replacing Cinder with HeroUI would keep much of the same RAC foundation while
changing composition, CSS distribution, names, themes, and compatibility work.
Adopting Base Web would introduce Styletron/provider requirements and a different
behavior/override implementation. The reviewed evidence establishes no need for
either replacement to achieve this brief. Evolving Cinder has the clearest fit;
its remaining customization and accessibility work still needs to be done.

## 2. Proposed design principles

These are Cinder proposals, derived from the cited research rather than copied
upstream rules.

1. **Structure communicates relationships.** Align labels, values, actions, and
   surfaces to a shared rhythm. Group through proximity and hierarchy before
   adding another container.
2. **Emphasis follows the task.** Identify the primary action within each decision
   context. Destructive intent remains understandable at any emphasis. Selection,
   current location, focus, and validation are different states.
3. **Softness follows scale.** Small controls can be precise; large temporary
   surfaces can be more rounded. Nested corners, inset, and border thickness form
   one relationship. Tables and continuous lists need not become rounded cards.
4. **Meaning survives customization.** Custom colors, classes, children, or
   renderers preserve names, native inputs, state, focus, and keyboard operation.
5. **CSS is a public interface.** Stable hooks, semantic variables, cascade order,
   root/part targets, and overlay scope are documented and versioned.
6. **Content completes the interaction.** Labels, instructions, progress, errors,
   and recovery are part of the design. Long content and localization are ordinary
   cases, not exceptional screenshots.
7. **Evidence travels with the claim.** Intended, implemented, automatically
   checked, and manually evaluated behavior are distinguishable in the docs.

Research rationale: [Base visual relationships](research-base.md#2-visual-foundations-relationships-before-decoration),
[content/inclusion](research-base.md#6-content-inclusion-and-localization),
[HeroUI composition](research-heroui.md#6-composition-and-component-family-findings),
and [Cinder customization gaps](research-cinder-baseline.md#3-css-freedom-and-composition-what-exists-today).

## 3. Three original visual candidates

**These are comparison briefs, not validated token sets.** Colors below are starting
swatches; complete foreground/background/state combinations still need contrast checks.
Dimensions are candidate minimums at the default font scale, not fixed clipping
heights. No candidate has been rendered or user-tested in this research.

| Decision                 | A. Field — recommended comparison                                                                    | B. Relay                                                                          | C. Index                                                                                   |
| ------------------------ | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Character                | Precise workspace with approachable touchpoints                                                      | Open, service-oriented, task-focused                                              | Editorial instrument for information-dense work                                            |
| Signature                | Strong alignment rails; restrained rounded controls; clearly bounded task overlays                   | Large action groups, generous spacing, bold monochrome emphasis                   | Continuous rows, square geometry, expressive headings outside dense work areas             |
| Light starting swatches  | Chalk `#F6F7F4`, white surface, ink `#1F2823`, pine accent `#235E49`                                 | Canvas `#F5F5F5`, white surface, ink/action `#171717`, link indigo `#3346A8`      | Paper `#F5F6F8`, white surface, ink `#222B38`, cobalt `#254E9A`                            |
| Dark starting swatches   | Canvas `#151B18`, surface `#202B24`, text `#E9F0EB`, accent `#82CBA1`                                | Canvas `#151515`, surface `#242424`, text/action `#F4F4F4`, link `#B3BEFF`        | Canvas `#151A23`, surface `#222B38`, text `#ECF0F7`, accent `#AFC9FF`                      |
| Initial geometry         | 4px controls, 8px grouped surfaces, 16px large overlays; square continuous tables                    | 8px controls, 12px groups, 20px overlays; pill shape reserved for a clear use     | 0–2px controls, 6px overlays; thin dividing rules                                          |
| Initial density          | 32/40/48px control minimums; 40px default; larger touch targets where needed                         | 40/48/56px control minimums; 48px default                                         | 32/40/48px minimums; compact rows with readable content and deliberate targets             |
| Typography comparison    | Existing Plex Sans/Mono first; 14/20 dense UI, 16/24 forms, 20/28 sections                           | Existing Plex first; more 16/24 content and fewer competing text levels           | Existing Plex first; 14/20 working UI, strong section hierarchy, Mono for technical values |
| Strongest context        | Mixed forms, settings, and operational data                                                          | Consumer/service tasks and less dense tools                                       | Developer tools, structured records, analytical reading                                    |
| Main tradeoff to inspect | Accent must distinguish action and selection from success; softness must stay coherent in dense rows | Space consumption and pill-heavy treatment can weaken dense information hierarchy | Greater continuity with Carbon, but less approachable at large task surfaces               |

Plex is the existing licensed baseline, not a new identity decision. Keeping it for
the initial geometry comparison limits uncontrolled variables. Final font selection
must cover actual languages, weights, numerals, fallback metrics, and distribution
rights. Uber Move usage on Base's site establishes no font redistribution rights;
HeroUI's documentation uses separately licensed Inter.
[Font provenance](research-cinder-baseline.md#licensing-and-independent-identity),
[HeroUI font findings](research-heroui.md#8-licensing-and-font-provenance).

### Initial swatch contrast

Calculated with WCAG's sRGB relative-luminance formula for opaque colors. All 12
sample pairs exceed **4.5:1**; values are rounded to two decimal places. The
calculation's self-checks produced 21:1 for black/white and 1:1 for identical colors.
[Contrast method and criterion][wcag-contrast].

| Candidate | Light text / canvas | Light accent pairing         | Dark text / surface | Dark accent pairing                       |
| --------- | ------------------: | ---------------------------- | ------------------: | ----------------------------------------- |
| Field     |             14.09:1 | White on pine: 7.58:1        |             12.66:1 | Dark canvas color on accent: 9.16:1       |
| Relay     |             16.44:1 | Indigo link on white: 8.13:1 |             14.11:1 | Light indigo link on dark surface: 8.67:1 |
| Index     |             13.21:1 | White on cobalt: 7.97:1      |             12.49:1 | Dark canvas color on accent: 10.48:1      |

This is color-pair arithmetic, not a rendered-theme result. Muted text, control
boundaries, focus, status colors, interaction states, transparency, and combinations
on other surfaces still need evaluation. The ratios do not establish typography,
target-size, or complete accessibility conformance.

### Candidate A: a more concrete specification

- **Hierarchy:** a quiet page canvas, ordinary content surfaces, and a distinct
  temporary task surface. Preserve Cinder's contextual color relationships while
  evaluating the new values. Shadow indicates lift; it does not substitute for
  content grouping.
- **Actions:** strong fill for the principal commitment, lower emphasis for
  alternatives, restrained text treatment for incidental actions. Destructive
  wording and treatment remain explicit. Multiple independent task regions can
  each have a primary action.
- **Selection:** use a stable indicator plus a surface/border change where useful;
  reserve space so selecting does not move content. Keyboard focus remains visible
  over selected and invalid states. A green brand accent must not be the only
  differentiator between an action, selection, and a success message.
- **Fields:** shared label/control/help rhythm, a clear focus treatment, persistent
  recovery information, and content-growing sizes. A validation error can coexist
  with instructions that still matter.
- **Geometry:** evaluate 4/8/16px assignments as a system. For nested rounded
  shapes, check the actual inset and inner curve; avoid forcing every nested
  relationship to fit a nominal radius number.
- **Motion:** direct response to input, short state transitions, spatial movement
  only when it explains a relationship. Reduced motion preserves the state cue
  without requiring scale or travel. Notification reading time is independent.
- **Surfaces:** opaque defaults make contrast predictable. A translucent map or
  media recipe would be a separate contextual design with its own proof.

This candidate combines documented reasoning with new assignments. Base 2.0's
actual radius ramp is **6/8/12/16/24/32/full**, and it discourages component-radius
overrides. Candidate A deliberately proposes a different default policy suited to
the requested customization freedom. [Base radius/elevation findings](research-base.md#geometry-and-layout).

### Comparison specimens

Use the same realistic sample data and tasks for all candidates and the current
baseline. The specimens are proposed validation artifacts, not an expansion of
the first-release feature list.

| Specimen       | Composition and task                                                                                      | What the comparison should answer                                                                                         |
| -------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Settings form  | Text and number fields, selection, read-only value, helper text, server-style error, save/pending/success | Can a user understand what to change and recover without losing instructions? Do long labels and errors fit?              |
| Data workspace | Navigation, search, filter, sortable/selectable records, pagination, empty results, a contextual action   | Does density preserve scanability, target separation, selected/current/focused distinction, and complete critical values? |
| Nested task    | Open a dialog; open a select or date popover inside it; cancel/confirm; show feedback                     | Does visual hierarchy match focus, stacking, scroll, theme, language, and dismissal behavior?                             |

Include light/dark, nested surfaces, compact/comfortable treatment, 320px-wide
reflow where applicable, browser zoom, long translations, RTL, forced colors, and
reduced motion in the meaningful states. Reuse existing Cinder flows where they
exercise the required question. Decide the winning direction using task clarity,
legibility, interaction correctness, visual coherence, and ease of customization.
Do not assign numerical usability scores before evaluation.

## 4. CSS freedom: define the promise precisely

The HeroUI term corresponding to the user's “BIM” is **BEM: Block, Element,
Modifier**. It is a class-naming convention such as `.button`,
`.button__label`, and `.button--primary`. It does not compile CSS, isolate global
styles, or implement keyboard behavior. HeroUI's documentation confirms BEM;
Cinder currently uses namespaced, BEM-like hyphenated hooks rather than strict
double-underscore/double-hyphen syntax.
[HeroUI terminology](research-heroui.md#41-bem-parts-state-and-behavior-are-distinct-contracts),
[Cinder selectors](research-cinder-baseline.md#32-selectors-layers-and-override-precedence).

**Recommendation: retain the `hashti-` namespace and stabilize existing useful
hooks.** Renaming every selector into strict BEM syntax creates migration work
without making customization inherently better. Document block, part, variant,
and state meaning consistently, including the present raw RAC exceptions.

### Five distinct promises

| Promise                                  | Required contract                                                                       | Current Cinder evidence                                                                           |
| ---------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Use the library without a style compiler | Export ready browser CSS with an ordinary package import                                | Already supplied by `@cinder/react/styles.css`; saved external-consumer proof                     |
| Restyle a root                           | Forward and merge class/style with a documented DOM/ref target                          | Works for many wrappers; Modal and NativeSelect split targets; some convenience APIs are narrower |
| Restyle inner anatomy and states         | Stable part selectors or named parts; documented state owner and precedence             | Available unevenly; raw RAC classes can be replaced when a custom class is supplied               |
| Replace meaningful anatomy               | Composition preserves native controls, context, labels, handlers, refs, and collections | Several replaceable field compositions; several fixed wrappers; no uniform promise                |
| Use a behavior-only/headless mode        | A separate supported behavior/essential-CSS contract                                    | No current public unstyled mode; dropping the stylesheet can also remove hidden-content styling   |

Sources: [Cinder distribution](research-cinder-baseline.md#distribution-is-already-more-than-a-workspace-demo),
[styling/composition audit](research-cinder-baseline.md#3-css-freedom-and-composition-what-exists-today).

The proposed initial promise is **prebuilt CSS plus stable root/part/state
customization and deliberate composition**. A headless distribution would be a
separate product commitment. CSS on plain HTML can reuse appearance, but behavior
must still come from suitable native elements or an appropriate implementation.

### Consumer-tool matrix

These are proposed Cinder integration contracts. The vendor documentation explains
the mechanisms; it is not a Cinder runtime certification.

| Tool              | How it should consume Cinder                                                                                                                   | Important condition                                                                                                                                          | Proof still needed                                                                                                                |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| Plain CSS         | Import Cinder CSS once; attach an application class; use semantic variables and documented states/parts                                        | Cascade and theme scope must be predictable; functional inline geometry is not an aesthetic override                                                         | Root, compound field, selected/invalid state, nested theme, overlay, and unrelated-neighbor containment                           |
| CSS Modules       | Pass a generated class string; use explicit global Cinder hooks only for intended descendants                                                  | A CSS Module does not automatically expose or isolate library internals                                                                                      | Actual module compilation plus inner-part/portal examples; HeroUI's bounded Button probe already demonstrates its own class route |
| Tailwind          | Generate utilities in the consuming application; pass them to reachable roots/parts; optionally map semantic variables with v4 `@theme inline` | Utilities need to exist in generated CSS; preflight and layer order affect results; dynamically constructed class names need an explicit generation strategy | Packed Cinder with a pinned Tailwind version, preflight interaction, ordinary/state utilities, token aliases, and portalled parts |
| Emotion           | Use `@emotion/css` class strings or `@emotion/styled` around class-forwarding modules; preserve the chosen package's setup                     | `@emotion/react`'s JSX `css` prop is a distinct integration; generated classes do not move themselves to inner parts                                         | Actual selected Emotion package, prop/ref/generic forwarding, style insertion, theme coexistence, and SSR if promised             |
| styled-components | Wrap a class-forwarding module with `styled(...)` or style a public part                                                                       | Preserve functional props and refs; inspect polymorphic `as` behavior; define CSS precedence                                                                 | Actual pinned version, prop filtering, client insertion and SSR/hydration if promised, plus compound/portal cases                 |

Primary vendor references: [Tailwind theme variables][tw-theme],
[Tailwind Preflight][tw-preflight], [class detection][tw-detection],
[Emotion styled][emotion-styled], [Emotion class-string API][emotion-css],
[styled-components existing CSS][sc-existing], [styled-components SSR][sc-ssr].
These are documentation sources consulted for interface design; no local execution
of Emotion, styled-components, or a normal Tailwind build is claimed here.

#### A small shared example

The root styling mechanism can remain familiar. This illustrates existing class
attachment, not a newly verified five-engine consumer fixture:

```tsx
import { Button } from "@cinder/react";
import "@cinder/react/styles.css";

<Button className="product-confirm">Save changes</Button>;
```

```css
.product-confirm {
  border-radius: 0.375rem;
}
```

A CSS Module or `@emotion/css` can supply a generated class instead. Tailwind
supplies generated utility classes; styled wrappers supply their own class. The
library's responsibility is to retain its base hooks, preserve behavior, and make
the target obvious. The consumer still owns the appropriateness of the result.
Styling this Button says nothing about a fixed Select trigger or detached popup.

## 5. Proposed styling architecture

### Keep the ownership model small

```text
Versioned foundations and semantic roles
  -> generated CSS variables and existing typed/JSON exports

RAC + native platform behavior
  -> Cinder defaults and meaningful composable parts
  -> stable root/part/state styling interface

Static component rules + tokens
  -> one documented prebuilt stylesheet
  -> consumer CSS, utilities, or generated classes

Declared theme/locale scope
  -> ordinary DOM roots and explicitly themed portal roots

Canonical examples + public contracts + evidence
  -> human documentation and machine-readable references
```

The seam belongs at the rendered class/part/state interface and the semantic
variable contract. A new styling-engine adapter for each tool would add a second
theme representation and maintenance surface without helping ordinary class-based
consumers. These tools already emit CSS the browser understands.

### Tokens and defaults

1. **Foundations:** spacing, type metrics, radii, motion, and raw palette data.
   Keep a small coherent vocabulary; current Cinder already exports typed/JSON
   foundation data.
2. **Semantic roles:** page/content/overlay surfaces with foregrounds, action and
   selection treatment, borders, focus, and status roles. A role remains meaningful
   as its value changes across themes.
3. **Component recipes:** use semantic roles and expose component variables where
   a real customization need warrants them. Avoid publishing every intermediate
   calculation or inline mechanics variable as a stable token.

Defaults should live where they are owned. Define brand/theme values at explicit
scope roots; define contextual surface aliases at surface roots. Avoid repeatedly
resetting consumer theme values inside every leaf. A directly declared value on a
child beats inheritance from its parent, regardless of the parent's selector
specificity or layer order.

For responsive typography, select and document one supported delivery contract:
generated responsive CSS or the existing complete type objects that applications
apply. Today's scalar variables contain base values only. A new visual system
cannot assume that changing a `fluid-*` scalar adds interpolation.
[Current token structure](research-cinder-baseline.md#2-architecture-and-version-boundaries),
[token README](../packages/tokens/README.md#typography-and-responsive-data).

### Cascade: one predictable library position

**Proposed direction:** retain a top-level `cinder` layer and give its token,
limited reset, and component rules deliberate internal ordering. Put generated
token defaults in that documented cascade contract as well. Current generated
tokens are unlayered, while component rules use `@layer hashti`; changing this is
a compatibility change requiring consumer proof.
[Current layer mismatch](research-cinder-baseline.md#32-selectors-layers-and-override-precedence).

A future Tailwind consumer could establish the following top-level order before
imports, after Cinder's token-layer contract is implemented and verified:

```css
/* Proposed integration order; not a certification of current token overrides. */
@layer theme, base, cinder, components, utilities;
@import "tailwindcss";
@import "@cinder/react/styles.css";
```

Within Cinder, an internal order such as tokens → scoped reset → components keeps
the library at one predictable position. Normal consumer component/utility rules
then have a declared place above it. Consumers using plain CSS need no Tailwind
layer names; ordinary unlayered application rules outrank normal layered rules.

Important qualifications:

- For ordinary author declarations, layer order is considered before specificity;
  source order resolves later ties. Class order in JSX does not set CSS priority.
- Important declarations reverse layer priority. Inline declarations, transitions,
  and animations have additional cascade rules. Avoid using `!important` as a
  routine styling escape hatch.
- Generated themes, nested surface aliases, and resets can declare values on
  different elements. Cascade precedence on one element does not solve inheritance
  across those elements or across a portal.
- Scope component variants to Cinder roots/parts. Today's broad `[data-size]`,
  `[data-kind]`, raw RAC, and Theme-subtree rules need a declared containment policy.
- Keep layout-independent accessibility essentials intact when changing visual
  styles. Hidden inputs/content, focus treatment, and reduced-motion behavior need
  focused review, rather than indiscriminate removal of important declarations.

Sources: [CSS cascade][css-cascade], [cascade-layer ordering][css-layers],
[Tailwind customization][tw-theme], and
[Cinder selectors and inline rules](research-cinder-baseline.md#32-selectors-layers-and-override-precedence).

### Root, part, and state contracts

| Interface               | Proposed rule                                                                                                       | Existing case to resolve                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Root class/style/ref    | Each public part documents its DOM target; matching prop names should usually identify the same target              | Modal class/ref reach inner content while style reaches overlay; NativeSelect splits wrapper and native select      |
| Class merging           | Consumer classes retain stable Cinder hooks; support upstream state functions where the underlying part does        | Raw RAC exports replace their default class; do not silently claim uniform merging                                  |
| Meaningful anatomy      | Use existing RAC composition and named public parts for regions consumers need to render/style/ref independently    | Select trigger/value/popover, field help/error, dialog backdrop/content, toast close/region                         |
| Convenience composition | Defaults compose the same meaningful parts; common tasks remain concise                                             | `children` currently means replacement anatomy in some families and collection items or augmented content in others |
| Behavior slots          | Preserve RAC relationship slots and collection registration                                                         | A styling `data-part` marker or BEM name is not equivalent to `slot="description"` or `slot="close"`                |
| State                   | Document actual state attributes and the element that owns them                                                     | Focus, hover, press, selected, mixed, current, invalid, pending, and disabled vary by family                        |
| Custom rendering        | Preserve supplied props, handlers, native semantics, and refs using the primitive's supported composition mechanism | Arbitrary element substitution can lose the behavior even if it retains the class                                   |
| Mechanics               | Runtime value/position geometry remains owned by the appropriate behavior module                                    | Progress fill, slider position, and overlay placement cannot become arbitrary visual overrides without consequences |

Sources: [Cinder composition/ref matrix](research-cinder-baseline.md#33-public-composition-and-ref-asymmetries),
[HeroUI part/state distinctions](research-heroui.md#41-bem-parts-state-and-behavior-are-distinct-contracts),
[Base Web override tradeoffs](research-base.md#styling-and-overrides).

The completed HeroUI reading reinforces the need to document family exceptions.
General composition uses `render`, while `Avatar.Image` still documents `asChild`.
ButtonGroup and ToggleButtonGroup permit child disabled overrides; TagGroup owns
size and variant at the group. Likewise, identity keys, behavioral IDs, text values,
DOM change events, and typed value callbacks are distinct contracts. Cinder should
make these decisions explicit instead of inferring uniform behavior from a shared
prop name. [Composition exceptions](research-heroui.md#61-public-composition-contract),
[value and migration contracts](research-heroui.md#65-migration-and-release-deltas-are-behavioral-contracts).

This increases depth by hiding repeated relationship work behind useful defaults
while exposing the real seams. A universal nested `overrides` object, a second
slot-prop dialect, and a compound interface should not all be introduced for the
same job. Extend the existing composition model where customization actually needs
it; stable selectors can cover purely visual internal regions.

## 6. Theme, locale, and portals need one declared policy

React context survives a portal; DOM inheritance follows the portal's physical
parent. These are different mechanisms. Cinder currently copies built-in theme,
layer, and direction to overlay roots, but not `lang` or arbitrary scoped custom
properties. HeroUI's bounded runtime sample lost nested variables in default
Popover/Modal portals; a local Popover container retained them.
[Cinder bridge](research-cinder-baseline.md#34-themes-portals-and-locale),
[HeroUI observations](research-heroui.md#51-semantic-variables-and-theme-scope),
[React portal reference][react-portals].

**Recommended default: explicit, portable theme recipes.** Extend Cinder's existing
scope-to-overlay mechanism around declared appearance and locale information,
rather than promising transparent transport of every inherited CSS value.

| Scope concern                           | Proposed contract                                                                                                                       |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Built-in or registered CSS theme recipe | The same declared theme selector/appearance identity applies at the ordinary root and detached overlay root                             |
| Surface level                           | The overlay receives the intended contextual surface treatment; containment depth, stacking order, and shadow strength remain separate  |
| Locale                                  | Formatting context, DOM `lang`, and `dir` agree at detached roots; the policy for nested providers is explicit                          |
| Density, if made contextual             | Its declared value crosses the same seam, instead of depending only on DOM ancestry                                                     |
| Arbitrary ambient CSS override          | Use an explicitly selected in-scope portal host when inheritance is required, or redeclare the relevant appearance on the portal recipe |
| One-off root class/style                | Do not silently copy layout, positioning, IDs, event props, or every class from a Theme wrapper onto an overlay                         |

A portable appearance hook should identify a reusable CSS recipe; it is different
from blindly forwarding a wrapper's whole `className`. A local host can preserve
ambient variables, fonts, and selectors, but may encounter clipping, transformed
containing blocks, stacking contexts, and modal background-hiding interactions.
The host must sit in a location consistent with the focus/inertness implementation.
Container control and upstream unstable portal APIs need explicit compatibility
and nested-overlay tests before becoming a stable Cinder promise.

Copying all computed styles on each open is a poor default: it turns live CSS into
a snapshot, adds synchronization questions for theme changes, and blurs ownership.
Start with declared recipes and a deliberate inheritance path. Demonstrate changing
the theme while an overlay is open, nested dialogs/popovers, custom fonts, RTL,
language, and focus return before choosing the final public scope interface.

## 7. UX and accessibility ownership

| Owner               | Responsibility                                                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| RAC/native platform | Primitive interaction, state, relationships, focus and keyboard mechanics within the supported composition                                                               |
| Cinder              | Correct default composition, visible focus, state differentiation, target geometry, scoped styles, strings and locale hooks, overlay integration, reliable defaults      |
| Application         | Domain meaning, valid content, authorization and server validation, transfer/query lifecycle, routing, destructive confirmation, criticality and persistence of feedback |
| Shared validation   | Actual complete tasks under customization, real content, browsers, devices, zoom, assistive technology, and the published support matrix                                 |

Keeping those responsibilities explicit prevents appearance from accidentally
changing semantics. Relevant decisions from the research:

- **Actions and choices:** use navigation links for destinations, buttons for
  actions, selection controls for values, and tab-panel semantics for actual
  related panels. Preserve RAC value shapes; selected keys, text input, and
  collection sets are not interchangeable.
- **Density and targets:** 32px-high dense rows are not automatically inaccessible,
  and 16px icons are not automatically the full target. Measure interactive bounds
  and spacing. WCAG 2.2 AA target minimum is 24×24 CSS px with exceptions; 44×44 is
  the enhanced AAA criterion and a useful stronger touch goal.
- **Focus and state:** focused content must not be entirely obscured at AA. Check
  sticky headers, banners, clipping, selected/invalid combinations, and nested
  overlays. Preserve a readable focus indication under forced colors.
- **Forms:** keep visible labels, complete critical values, relevant instructions,
  associated errors, and recovery. Distinguish required, invalid, pending,
  read-only, and disabled. Preserve paste/autofill/password-manager assistance.
- **Notifications:** keep important errors/recovery persistent and associated with
  their task. Timed acknowledgment needs a reading/pause policy; avoid routine
  focus stealing. Cinder's and HeroUI's Toast implementations use unstable RAC
  APIs, so stability and queue behavior need specific evidence.
- **Data:** distinguish a semantic table from a keyboard-interactive grid. Define
  select-all scope, sorting/query ownership, empty/loading/error states, and
  accessible access to row actions and data values.
- **Gestures:** drag or swipe needs a usable alternative where required. Reading
  a native gesture recipe does not establish web pointer, touch, or keyboard proof.
- **Localization:** localize complete messages and all library-authored accessible
  strings. Apply locale-aware number/date/plural formatting and logical layout;
  do not concatenate fragments whose grammar cannot travel.

Sources: [Base interaction and feedback](research-base.md#4-surfaces-navigation-and-feedback),
[data contracts](research-base.md#5-tables-and-charts-preserve-the-analytical-contract),
[qualified WCAG guidance](research-base.md#7-accessibility-useful-intent-qualified-evidence),
[Cinder localization gaps](research-cinder-baseline.md#53-localization-and-manual-accessibility-gaps),
and [HeroUI accessibility scope](research-heroui.md#7-accessibility-evidence-and-remaining-responsibility).

Automated accessibility checks are valuable regression evidence. They do not
decide screen-reader usability, meaningful wording, all contrast combinations,
or whole-product conformance. Preserve the distinction between source rules,
simulated state probes, real interactions, and manual evaluation.

## 8. Documentation, Storybook, and history

The phrase “history books” is ambiguous. **Storybook** would address interactive
component exploration; **decision/change history** would explain why the system
evolves. Both needs can be described now; a new documentation tool has not been
selected. Cinder already has a live reference with anatomy, keyboard notes, source,
and four-theme examples.
[Current docs baseline](research-cinder-baseline.md#documentation-and-storybook).

### A useful component page

1. **Purpose and choice:** what problem it solves, when to choose a related control,
   and which platform/variant is supported.
2. **Live canonical example:** a real task with code from the same source, plus
   reset and relevant theme/density/state controls.
3. **Anatomy and interface:** root/part names, actual elements/ref targets, props,
   events, slots, classes, state attributes, and semantic variables.
4. **Behavior and content:** keyboard/pointer/touch model, focus/announcements,
   validation/recovery, wrapping, empty/loading/error states, and localization.
5. **Customization:** ordinary CSS first; a part/state/theme/portal example and
   the supported tool recipes. Call out functional styles and composition limits.
6. **Evidence and maturity:** source/package version, implemented variants, dated
   automatic/manual checks, known gaps, and compatibility notes.
7. **History:** design rationale and migration notes for consumer-visible changes.

Base is strongest at choice/content/platform guidance; HeroUI is strong at
discoverable anatomy, state tables, composition, and machine-readable endpoints.
Carbon supplies useful contribution and maturity criteria. Cinder can combine
those strengths in the existing reference before adding another catalog runtime.
[Base documentation lessons](research-base.md#9-documentation-and-system-building-lessons),
[HeroUI DX](research-heroui.md#3-design-principles-worth-transferring),
[Carbon lifecycle input](research-cinder-baseline.md#documentation-and-storybook).

### One example source; multiple views if useful

The current rendered examples and displayed code strings are maintained separately.
Synchronizing them, linking complete public types, and compiling displayed examples
has a more immediate payoff than adding Storybook alone. If Storybook is chosen,
reuse the canonical examples for default, playground, meaningful states, and
interaction stories. Keep long-form guidance in the public reference.

Decision history can start with short dated records: context, decision, alternatives
actually considered, effect on consumers, and proof. Release notes should include
public CSS/DOM/token/ref changes as well as TypeScript changes. Every deprecated
contract needs a versioned replacement example and intentional removal policy.
Draft/preview/stable should reflect evidence and maintenance readiness, not a badge
derived from the number of demos.

HeroUI's release history makes that compatibility scope concrete: 3.0.5 renames
`Text`/`.text`, 3.2.0 requires explicit selection-control Content composition, and
later patches change peers, environment requirements, and CSS hooks. Cinder's
release proof should therefore cover dependencies, defaults, and caller-owned
behavior as well as types. A patch/minor label alone is insufficient evidence of
compatibility. [Release and migration findings](research-heroui.md#65-migration-and-release-deltas-are-behavioral-contracts).

For agent-readable docs, reuse release-scoped MDX/Markdown, public types, part/state
tables, runnable examples, and a compact index. HeroUI's completed migration review
found two nonmatching include fragments and incremental guidance that permits
remaining v2-only components before removing their dependencies/styles. Validate
include targets, migration ordering, and examples against the actual release.
[Workflow discrepancies](research-heroui.md#9-discrepancy-and-confidence-register).
A new MCP server or agent package is unnecessary until ordinary discoverable
documentation leaves a demonstrated gap.

## 9. Staged validation and stop conditions

This is a proposal for later work. The detailed [G1–G10 baseline gates](research-cinder-baseline.md#9-proposed-acceptance-gates--unapproved)
remain available; the sequence below groups them into manageable decisions.

| Stage                                | Deliverable                                                                                   | Pass / stop condition                                                                                                                                            |
| ------------------------------------ | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Choose the contract               | Visual comparison brief, required first-release families, compatibility expectations          | A direction and supported scope are chosen; changed names, values, refs, behavior, and theme assumptions are identified                                          |
| 2. Prove the core seams              | One root control, one compound field, one collection, one nested overlay; packed-CSS consumer | Default and custom styling work through every promised CSS tool; parts/refs/handlers/labels survive; theme and locale reach overlays; unrelated UI is unaffected |
| 3. Validate real tasks               | The three comparison specimens with representative content/states                             | Task completion, recovery, responsive readability, target/focus behavior, and declared browser/AT combinations have retained evidence                            |
| 4. Apply across the existing catalog | Family-by-family contracts, intentional visual baselines, synchronized examples               | Every retained family has explicit supported variants and evidence; gaps remain honestly preview/experimental rather than inflating parity                       |
| 5. Release deliberately              | Independently installed tarballs, export/declaration/CSS checks, notices, migration notes     | Promised consumer environments work with actual packaged artifacts; the release and support contract match the evidence                                          |

For Stage 2, a minimal sufficient styling specimen changes **a root, an inner part,
a behavioral state, a semantic token, and a portalled surface**. Check both default
and consumer-authored anatomy. Use actual CSS-engine packages where support is
claimed; matching a generated-looking class name is not an integration test.

For Stage 3, choose manual browser/assistive-technology combinations according to
the intended audience. VoiceOver/Safari and NVDA with a supported browser are useful
starting candidates. Include native validation, grids/treegrids, dialog nesting,
tooltip descriptions, and live notifications. A narrow viewport alone does not
prove browser zoom or text resizing, and a screenshot does not prove interaction.

Preserve current behavior tests where the contract stays the same. Approve new
expectations where the visual or interaction contract intentionally changes. Use
controlled, equivalent production specimens before making bundle-size or speed
comparisons: a minified all-components stylesheet, a package tarball, and a
compressed application bundle are different measurements.

## 10. Compatibility and provenance decisions

The meaningful decisions before implementation are:

- Which candidate foundations replace the current Carbon palette/type/geometry,
  and which current themes or semantic roles remain supported?
- Is compatibility required for provisional 0.1.0 consumers' classes, tokens,
  theme names, part DOM, refs, and controlled-value shapes? If so, define the
  migration and deprecation policy before changing them.
- Does first-release styling freedom include stable part styling and composition
  only, or a separately supported headless distribution?
- What theme-recipe, ambient-CSS portal-host, language, and density behavior becomes
  part of the public interface?
- Which browser/device/AT and CSS-tool environments will be promised, and what
  evidence is required before each family is stable?

The proposal recommends prebuilt CSS, meaningful part access, portable theme
recipes, preservation of RAC value models, and incremental validation. Those
recommendations narrow the design work without adopting a new public contract.

Keep provenance attached to any material actually reused. Cinder/Carbon-derived
material and HeroUI v3 use Apache-2.0 obligations; reviewed Base Web code is MIT;
fonts and artwork have separate terms. An original appearance does not erase the
notices for retained code or tokens. No Uber font/artwork rights follow from its
code license. [Cinder](research-cinder-baseline.md#licensing-and-independent-identity),
[HeroUI](research-heroui.md#8-licensing-and-font-provenance),
[Base Web](research-base.md#localization-and-governance).

## 11. Evidence map and completion boundary

| Report                                         | Use it for                                                                                                        |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [Base findings][base]                          | Foundations, interaction/content patterns, contradictions, sampled visuals, and focused Base Web source findings  |
| [Base coverage](research-base-coverage.md)     | All 189 discovered targets: 121 full-text public reads, 51 SSO-private, one legacy sign-in, 16 stale redirects    |
| [HeroUI findings][hero]                        | v3.2.7 CSS/parts/composition, package/runtime findings, versions, licensing, and exact test limits                |
| [HeroUI coverage](research-heroui-coverage.md) | All 179 canonical English React documents fully read; exact paths, hashes, ranges, and page findings              |
| [Current Cinder baseline][cinder]              | All 45 catalog families, actual styling/ref/state/portal interfaces, saved-test continuity, and proposed gates    |
| [Existing Carbon research](research-carbon.md) | Upstream contracts and earlier snapshot; use current coverage/baseline for subsequently corrected Cinder findings |
| [Current verification](verification.md)        | Historical product checks and their environment/scope                                                             |

Full reading covers **300 documents: 179 HeroUI + 121 public Base documents**.
Base discovery is complete for the public documents found through its navigation,
cross-links, and supplemental routes. Private bodies and obsolete originals remain
unavailable. HeroUI's canonical English React review uses 176 pinned MDX texts, two
expanded browser-reader texts, and the original Design Principles reader text.
Native documentation, translated copies, commercial packs, most linked demo sources,
expanded workflow bundles, and most implementation files remain distinct limits.
The appendices preserve exact reading outcomes; reading a document is not equivalent
to testing its component.

New runtime evidence belongs to the isolated HeroUI specimen: 20 bounded Chromium
checks, including observations of limitations. Cinder's existing aggregate was
reconciled by hashes rather than rerun. Base/Base Web have documentation, source,
and sampled visual evidence, not a runtime conformance audit. Emotion,
styled-components, a normal Tailwind build, SSR/hydration, and broad manual AT
coverage remain unverified.

**Research outcome:** a sourced direction and a concrete validation path. No new
Cinder visual prototype, package dependency, product implementation, or adopted
design decision results from this report.

[cinder]: research-cinder-baseline.md
[base]: research-base.md
[hero]: research-heroui.md
[tw-theme]: https://tailwindcss.com/docs/theme
[tw-preflight]: https://tailwindcss.com/docs/preflight
[tw-detection]: https://tailwindcss.com/docs/detecting-classes-in-source-files
[emotion-styled]: https://emotion.sh/docs/styled
[emotion-css]: https://emotion.sh/docs/@emotion/css
[sc-existing]: https://styled-components.com/docs/advanced#existing-css
[sc-ssr]: https://styled-components.com/docs/advanced#server-side-rendering
[css-cascade]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Cascade
[css-layers]: https://www.w3.org/TR/css-cascade-5/#layer-ordering
[react-portals]: https://react.dev/reference/react-dom/createPortal
[wcag-contrast]: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
