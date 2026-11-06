# Uber Base — findings for an original Cinder system

**Research date: 6 November 2026.** Research and design recommendations; no Cinder
implementation or replacement visual direction is approved by this report.

## Finding in brief

**Borrow Base's reasoning about hierarchy, composition, and user intent. Retain
Cinder's RAC behavior and static-CSS foundation, then make its customization
interface consistent.** Base is especially useful at explaining why a control,
surface, or message belongs in a context. Its proportional geometry, content
alignment, restrained containment, and strong selection cues are promising inputs
to an original design language.

Three qualifications shape that recommendation:

1. **Base 2.0 is partially available.** Several public foundations describe a
   rollout in progress; its overview, current color/typography, and design-token
   pages require SSO. Public Base Web source and npm releases are separate evidence.
2. **The documents mix platforms and generations.** Detailed native speech,
   gestures, Figma settings, legacy React designs, and future features cannot be
   treated as one shipped web contract.
3. **Customization needs a stable interface.** Base Web offers powerful nested
   overrides through Styletron. Cinder already has a lighter class/CSS-variable
   route, but inner parts, refs, token precedence, and portal inheritance are uneven.

Sources: [Corner radius 2.0][radius2], [Elevation 2.0][elevation2],
[Base Web provenance](#8-base-web-implementation-and-maintenance), and the
[current Cinder audit](research-cinder-baseline.md#3-css-freedom-and-composition-what-exists-today).
The cross-system recommendation is developed in
[Cinder direction](research-cinder-direction.md).

## 1. Coverage and source authority

| Evidence              | Result                                        | What it establishes                                                                                            |
| --------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Base discovery        | **189 distinct targets**                      | Cover/navigation, document cross-links, and supplemental rendered/versioned discovery                          |
| Public documentation  | **121/121 full-text reads**                   | Every line of each discovered public archive, including exported tabs, examples, tables, and resource sections |
| Access restrictions   | **51 SSO-private + 1 legacy sign-in**         | Access outcomes; no knowledge of the gated bodies                                                              |
| Obsolete destinations | **16 redirects to the cover**                 | Former contents unavailable; excluded from the 121 reads                                                       |
| Archive integrity     | **121 original/readable hash pairs matched**  | Acquisitions and reading records reconciled; readable copies total 1,797,256 bytes                             |
| Visual inspection     | Targeted samples                              | Corners, elevation, material, and one writing-example pair; no exhaustive component-image or motion review     |
| Base Web              | Focused official docs/source and npm metadata | Styling, providers, overrides, Button, tables, localization, provenance, and maintenance policy                |
| Cinder                | Separate source and saved-evidence audit      | All 45 catalog families; source hashes reconciled with historical checks                                       |

The [complete coverage appendix](research-base-coverage.md) preserves all IDs,
source links, access classifications, and public reading ranges. Original responses,
normalized text, review ledgers, and inspected assets are retained separately under
`.research/base-2026-11-06/`, which is Git-ignored. Discovery completeness concerns
the public documents found by that crawl, not undisclosed URLs or private descendants.

The cover promoted **Base 2.0** and displayed **10.30.26** as its update date.
That does not date every component specification. In this report, a **Base finding**
means documented guidance; **observed image** means inspected pixels;
**source finding** means inspected code; **recommendation** means a Cinder judgment.
No Base or Base Web runtime accessibility/conformance result is claimed.
[Cover](https://base.uber.com/6d2425e9f/p/294ab4-base-design-system).

## 2. Visual foundations: relationships before decoration

### Geometry and layout

Base connects dimensional discipline to relationships between content. Dimensions
uses a root-of-four rhythm; Layout grids describes responsive columns, margins,
gutters, and alignment. The useful transfer is a coherent spatial grammar, rather
than applying every example breakpoint or exported Figma frame size as a token.
[Dimensions](https://base.uber.com/6d2425e9f/p/598458), “Usage”;
[Layout grids](https://base.uber.com/6d2425e9f/p/785d5f).

| Foundation             | Documented rule                                                                          | Cinder implication                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Corner radius 1.0      | Earlier 4/8/12/16 family relates treatment to footprint and containment                  | Preserve its version; do not combine its values with 2.0 as one ramp                                        |
| Corner radius 2.0      | **6, 8, 12, 16, 24, 32, full**; larger surfaces generally use larger radii               | Explore proportional softness while retaining dense, precise information layout                             |
| Radius ownership       | 2.0 rejects semantic radius tokens and discourages component-radius overrides            | This is Base's consistency policy; Cinder's requested styling freedom needs its own explicit policy         |
| Nested corners         | Fit padding to a fixed radius ramp to maintain concentric relationships                  | Evaluate inner radius, outer radius, and inset together rather than rounding every nested rectangle equally |
| Responsive composition | Narrow action docks stack; groups may cluster; row/card layout follows space and content | Treat breakpoints as composition changes, with long-label and zoom behavior specified                       |

Sources: [Corner radius 1.0](https://base.uber.com/6d2425e9f/p/652959),
[Corner radius 2.0][radius2], “Scale,” “Concentric corner radius”;
[Button dock](https://base.uber.com/6d2425e9f/p/46ed03), “Button placement framework”;
[Button group](https://base.uber.com/6d2425e9f/p/83b31b), “Clustering,” “Breakpoints.”

**Recommendation:** define Cinder's own default radius assignments and a documented
override path. A configurable recipe can preserve coherent defaults without
requiring every product to inherit Uber's component-radius restriction. Any
departure from Cinder's current square Carbon-led controls remains a design decision.

### Typography, content hierarchy, and density

Typography 1.0 distinguishes display, heading, paragraph, and label roles; fewer
purposeful styles, alignment, and spacing establish grouping. Typography 2.0 was
private, so the earlier document cannot substantiate a current 2.0 type scale.
One spacing formula reverses the subtraction described in its prose; do not copy
the formula without resolving the intended relationship.
[Typography 1.0](https://base.uber.com/6d2425e9f/p/976582).

The component pages repeatedly separate text hierarchy from available space:

- Text field lists **36/48/56 px** Small/Medium/Large heights and **8/12/16 px**
  vertical padding, with **16 px** horizontal padding. These are field metrics,
  not a universal density scale.
- Standard List item has **64 px** minimum height. Compact's Metrics says **48 px
  minimum and 8 px vertical padding**, while Alignment says **12 px** padding.
- Table separates content size from density; its specialized analytical sibling
  has different fixed-height constraints.
- Check/Radio labels, tiles, links, headings, and several message surfaces explicitly
  wrap. Editorial brevity does not remove the need to support expanded content.

Sources: [Text field](https://base.uber.com/6d2425e9f/p/51073e), “Metrics”;
[List item][list-item], “Alignment,” “Minimum height”; [Table][table];
[Check](https://base.uber.com/6d2425e9f/p/83ffb9), “Wrapping and truncation”;
[Section heading](https://base.uber.com/6d2425e9f/p/5587b7), “Behavior.”

**Recommendation:** keep type role, content scale, and spacing density intelligible.
Use content-growing minimum sizes and explicit interaction targets. Dense data
should gain usable capacity through alignment and spacing, not by shrinking every
label, clipping values, or turning all surfaces into cards. Uber Move's use in
documentation does not establish rights to ship that font in Cinder.

### Elevation, stacking, and material

Base distinguishes **functional stacking** from its **five-step shadow ramp**.
The inspected diagram shows Map → Content → Nav → Non-blocking overlay → Blocking
overlay. The shadow-token image explains composite key and ambient shadows; it
does not provide a numeric table of all five levels. Ordinary content containment
uses color or borders rather than ornamental shadows.
[Elevation 2.0][elevation2], “Layering system,” “Shadow ramp”;
[Elevation 1.0](https://base.uber.com/6d2425e9f/p/595594).

In dark mode, temporary/floating overlays can use a lighter **dark-elevated** surface
alongside shadow. The inspected comparison makes that separation visible; it is
not evidence that every nested surface should become lighter. Platform rollout is
marked pending. [Elevation 2.0][elevation2], “Dark elevated theme,” “Availability.”

Material is documented as **transparency without blur**. The inspected map example
combines a pale floating panel, pill filters, a strong title, aligned rows, trailing
photographs, thin dividers, and textual Open/Closed status. The visual strength comes
from that hierarchy as well as translucency. A flattened image cannot independently
verify blur implementation or contrast over arbitrary moving backgrounds.
[Material](https://base.uber.com/6d2425e9f/p/84bf33).

There is an unresolved source conflict: Material's body requires a border, a token
entry calls it optional, and Elevation discourages additional strokes on elevated
surfaces. **Recommendation:** start Cinder's default overlays with predictable
opaque surfaces; explore translucency only as a contextual recipe with explicit
contrast and edge-separation proof. Stacking, modality, containment depth, and
shadow strength should remain distinct concepts.

### Motion

Base's motion vocabulary describes relationships: context changes, hierarchical
drill, lateral movement, and entry/exit. Transitions explicitly says these patterns
are not yet available in code. Motion mentions 500 ms movement, quicker direct
dismissal, and a 100 ms reduced-motion crossfade; these are contextual guidance,
not universal web-control durations. Timing also mislabels a linear curve as
“Quintic EaseOut.” [Transitions](https://base.uber.com/6d2425e9f/p/312fab),
[Motion](https://base.uber.com/6d2425e9f/p/116184),
[Timing](https://base.uber.com/6d2425e9f/p/77fcaf).

**Recommendation:** let motion explain state or spatial change; retain information
when motion is reduced. Validate duration against task speed and input feedback.
Keep an operation's lifetime, a notification's reading time, and its transition
duration as separate quantities.

## 3. Controls: share composition, preserve meaning

Base's strongest component lesson is that similar visual anatomy can serve
different user intentions. The correct interaction owner matters more than the
silhouette.

| Area                        | Source-backed finding                                                                                                                                                                        | Recommendation for Cinder                                                                                                              |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Actions                     | Button separates emphasis and danger intent; primary actions are scoped to a context. Docks organize existing actions                                                                        | Clear action hierarchy and responsive action layouts; preserve native button/link meaning                                              |
| Selection                   | Check usually defers commitment; Switch applies an independent binary change immediately; Radio is exclusive and must not navigate. Immediate web checkbox filters are an explicit exception | Choose by value and commitment model. Keep checked, mixed, selected, and current states distinct                                       |
| Groups and segments         | Button group includes action and selection uses; segmented control expresses one active choice                                                                                               | Reuse visual treatment without forcing actions, radio choices, and tab panels into one role or value model                             |
| Rows, tiles, cards          | A single-target row uses its whole area; independent trailing actions get separate affordances                                                                                               | Shared alignment/content regions with explicit interaction targets; no nested buttons or duplicate targets for one action              |
| Fields                      | Completion differs from validity; read-only differs from disabled; enhancers are compositional                                                                                               | Value, validation, pending work, editability, and presentation need separate state ownership                                           |
| PIN and time                | PIN is one string despite visual slots; Time picker covers clock times and durations                                                                                                         | Preserve paste/autofill and full-string validation; distinguish time, duration, timezone, and locale rather than relying on appearance |
| Slider and stepper          | Slider names range values and discusses direction; Stepper edits discrete numeric values                                                                                                     | Keep supplied bounds/step/value semantics; preserve complete critical values and alternative input where appropriate                   |
| File upload                 | Picker/drop zone, per-file state, feedback, and removal compose a workflow                                                                                                                   | Reuse control anatomy; application owns transfer, validation policy, persistence, and recovery                                         |
| Avatar and badge            | Avatar has no selection state of its own; Badge's parent/feature owns interaction and dismissal                                                                                              | Put meaning and lifecycle with their actual owner; avoid decorative content acquiring accidental behavior                              |
| Empty, pending, promotional | Empty state is resolved absence; Placeholder is interim loading; Message card is promotional and warns of banner blindness                                                                   | Distinguish loading, empty, no-results, failure, completion, and campaign content                                                      |

Sources and relevant headings: [Button](https://base.uber.com/6d2425e9f/p/756216),
“Type,” “Variant,” “Primary buttons”; [Switch](https://base.uber.com/6d2425e9f/p/005456),
“Switch versus check?”; [Radio](https://base.uber.com/6d2425e9f/p/0982fd), “Behavior”;
[Button group](https://base.uber.com/6d2425e9f/p/83b31b), “Use cases”;
[Tile](https://base.uber.com/6d2425e9f/p/433759), “Selection tiles and action tiles”;
[List item][list-item], “Tap targets”; [Text field](https://base.uber.com/6d2425e9f/p/51073e),
“Error/Success versus Incomplete/Complete?,” “Disabled versus Read-only?”;
[PIN](https://base.uber.com/6d2425e9f/p/75bf86), “Error and Success handling”;
[Time picker](https://base.uber.com/6d2425e9f/p/96a4c2), “Usage”;
[Slider](https://base.uber.com/6d2425e9f/p/30cac1), “Behavior,” “Screen readers”;
[Stepper](https://base.uber.com/6d2425e9f/p/53dd73);
[File upload](https://base.uber.com/6d2425e9f/p/5555b5), “Anatomy”;
[Avatar](https://base.uber.com/6d2425e9f/p/572f13), “States”;
[Badge](https://base.uber.com/6d2425e9f/p/554ab6), “Manage badge dismissal logic”;
[Empty state](https://base.uber.com/6d2425e9f/p/402ac7),
[Placeholder](https://base.uber.com/6d2425e9f/p/48ea86), and
[Message card](https://base.uber.com/6d2425e9f/p/480a1e), “Usage,” “Behavior.”

### State clarity is a system concern

Base's newer Selection framework combines border, fill, weight, and icon cues;
the older States page uses different selected treatments. The newer page is not
widely available, makes dense-layout exceptions, and also contains a stronger
“always” combination that conflicts with those qualifications.
[Selection](https://base.uber.com/6d2425e9f/p/464328), “Visual affordances,” “Accessibility”;
[States](https://base.uber.com/6d2425e9f/p/65ae6d).

**Recommendation:** specify Cinder's coexisting states deliberately. Focus must
remain recognizable over selected, invalid, inverse, and image-backed treatments.
Reserve border/indicator space so selection does not move content. Redundant cues
should fit the control; every selected item need not acquire every possible cue.
State attributes represent actual behavior, not merely decorative CSS switches.

## 4. Surfaces, navigation, and feedback

### Modality and surface geometry

Base distinguishes a focused Dialog task, contextual Sheet, self-contained Modal
full screen flow, and content Card. Its Modality pattern defines blocked prior
context and an eventual return. Both Dialog and Sheet also describe non-modal
presentations: geometry alone does not determine modality.
[Modality](https://base.uber.com/6d2425e9f/p/729bdf);
[Dialog][dialog], “Dialog versus sheet?”; [Sheet][sheet], “Usage”;
[Modal full screen](https://base.uber.com/6d2425e9f/p/81b842), “Usage”;
[Card](https://base.uber.com/6d2425e9f/p/02338d), “Layer cake.”

Dialog has useful explicit web guidance: naming, focus entry/containment/return,
Escape, dismissal, and scroll management. Its modal-only bullets need qualification
for non-modal use, and its opening availability note conflicts with its React
resource link. Sheet describes native snap points and height controls, but mobile
web differs; wide push/overlap and internal navigation are marked unsupported.
[Dialog][dialog], “Web accessibility,” “Status & resources”;
[Sheet][sheet], “Mobile web,” “Wide breakpoints,” “Navigating through sheets.”

**Recommendation:** retain a single appropriate focus/dismissal owner using RAC.
Define topmost interaction, background access, scroll behavior, and focus return
independently from radius and placement. Initial focus should suit the task;
an irreversible action should not automatically receive it because it is first.
Application state owns submit/discard decisions across all dismissal routes.

### Navigation expresses different relationships

| Relationship          | Base material              | Cinder design contract                                                                    |
| --------------------- | -------------------------- | ----------------------------------------------------------------------------------------- |
| Destination           | Bottom/side/top navigation | Router links and current location; retain section state intentionally                     |
| Related peer views    | Tabs                       | Actual tab-panel semantics and keyboard/activation policy when these are panels           |
| Information hierarchy | Breadcrumbs                | Parent links and current page, rather than a reconstruction of browser history            |
| Result position       | Pagination                 | Addressable links or in-place actions; page/total context and loading/focus policy        |
| Carousel position     | Page controls              | Named position and usable navigation; dots alone do not describe destinations             |
| Nested exploration    | Tree view                  | Full tree interaction only when warranted; ordinary nested navigation can use disclosures |
| Task milestones       | Progress steps             | Progress reporting or genuine navigable steps, with current/completed state               |

Sources: [Bottom navigation](https://base.uber.com/6d2425e9f/p/1413a0),
[Side navigation](https://base.uber.com/6d2425e9f/p/917574),
[Top navigation](https://base.uber.com/6d2425e9f/p/495709),
[Tabs](https://base.uber.com/6d2425e9f/p/2345e5),
[Breadcrumbs](https://base.uber.com/6d2425e9f/p/335df2),
[Pagination](https://base.uber.com/6d2425e9f/p/60dee2),
[Page controls](https://base.uber.com/6d2425e9f/p/717eef),
[Tree view](https://base.uber.com/6d2425e9f/p/730380),
[Progress steps](https://base.uber.com/6d2425e9f/p/82716e).

These pages vary greatly in depth. Top navigation contains resource links only;
Side navigation and Tree view provide no substantial web keyboard contract.
Native tab/adjustable speech examples do not prescribe web tab or slider roles
for routes and carousels.

### Feedback selection is a particularly useful pattern

Base separates page/feature state (Banner), rare global system state (System
banner), action acknowledgment (Snackbar/Toast), supplemental help (Tooltip), and
an interruptive decision (Dialog). Scope, initiation, urgency, persistence, and
recovery offer a better selection framework than color alone.
[Feedback & status](https://base.uber.com/6d2425e9f/p/48c92c),
[Banner](https://base.uber.com/6d2425e9f/p/199f68),
[System banner](https://base.uber.com/6d2425e9f/p/9522f7),
[Snackbar](https://base.uber.com/6d2425e9f/p/72a605),
[Toast](https://base.uber.com/6d2425e9f/p/87b3d6).

**Recommendations:**

- Give field errors a persistent, associated location and useful recovery. A toast
  should not be the only evidence of invalid data.
- Consolidate overlapping ephemeral-notification mechanics. These documents do not
  establish a crisp web division requiring separate Snackbar and Toast systems.
- Keep web notifications non-disruptive by default; native actionable-snackbar focus
  movement is not a general instruction to steal web focus.
- Define reading lifetime separately from animation; pause expiry during interaction
  and retain essential recovery paths. Base's 3/5/7-second reading guidance and
  separate 1000 ms motion entry are insufficient as one timer specification.
- Keep ordinary focus/hover tooltips supplemental. Interactive coachmarks need an
  appropriate interactive surface and focus contract. Base puts both under Tooltip.
- Treat dismissal of a message and resolution of its underlying condition separately.

Sources: [Snackbar](https://base.uber.com/6d2425e9f/p/72a605), “Behavior,” “Screen readers”;
[Tooltip](https://base.uber.com/6d2425e9f/p/63fdd3), “Usage,” “Behavior”;
[Messages](https://base.uber.com/6d2425e9f/p/000786), “Errors.”

Progress similarly distinguishes unknown-duration work, measurable completion,
and milestones. Explain waiting and completion; avoid invented percentages or
announcements on every animation frame. A minimum of three documented Progress
steps and two stepped-bar segments are separate product choices, not reasons to
invent unnecessary task stages. [Progress bar](https://base.uber.com/6d2425e9f/p/6799d2),
[Progress circle](https://base.uber.com/6d2425e9f/p/6945cd),
[Progress steps](https://base.uber.com/6d2425e9f/p/82716e).

## 5. Tables and charts: preserve the analytical contract

**Table and Data table are different documented products.** Table emphasizes
configurable cells, wrapping, dividers, and independent content-size/density axes.
Data table emphasizes large-dataset exploration with strict schemas, fixed-height
presentation, search/filter/sort/selection, and no style overrides or dynamic row
height. Base Web's Tables guide independently documents this distinction.
[Table][table], “Usage,” “Specs”; [Data table][data-table], “When to Use,” “Behavior”;
[Base Web Tables][bw-tables].

Specific analytical choices deserve qualification: Data table quotes **36 px cell
height, 12 px padding, and 12 pt type**; cycles descending → ascending → unsorted;
excludes string sorting; and selects “visible rows” from its header checkbox.
Those mixed units and product choices are not Cinder defaults. “Visible” also needs
clarification before use with virtualization, filtering, or destructive batch actions.
[Data table][data-table], “Data types,” “Behavior.”

**Recommendations:** keep semantic table rendering separate from application query
execution and domain actions. Declare selection scope—current page, loaded rows,
all filtered results—and preserve understandable selection across data changes.
Provide focus/touch access to row actions; reserve sort-indicator space. Sorting
and checkboxes alone do not require an ARIA grid keyboard model.

Charts organizes visualization by analytical question, variables, and time. Useful
guidance includes bubble magnitude by area, horizontal bars for long category
labels, avoiding smoothing that distorts lines, honest part-to-whole comparisons,
and distinct qualitative/sequential/diverging color meanings.
[Charts](https://base.uber.com/6d2425e9f/p/61b6c1), “Charts by concepts,” “Chart colors.”

The archive also contains repeated/mislabeled chart descriptions, empty Ranking
headings, and a repeated image reference for two color-vision examples. Palette
pixels were not inspected. A perceptual-distance claim does not prove contrast or
accessible interpretation. **Recommendation:** validate data meaning and provide
equivalent structured information; preserve category identity, units, labels, and
keyboard-accessible inspection before selecting decorative chart recipes.

## 6. Content, inclusion, and localization

Base treats content as a foundation. Its quality model covers task, voice,
substance, and presentation; component content tabs connect microcopy with actual
usage. Stable voice differs from situational tone. Errors, consent, and payments
favor direct, matter-of-fact wording; errors explain recovery without blame.
[Content heuristics](https://base.uber.com/6d2425e9f/p/757b7d), “Lenses”;
[Product voice](https://base.uber.com/6d2425e9f/p/040a13);
[Product tone](https://base.uber.com/6d2425e9f/p/136623), “Tone by component”;
[Messages](https://base.uber.com/6d2425e9f/p/000786).

Global writing addresses expansion, grammatical dependencies, translator context,
and whole-message localization. Its reorderable color/make/model example uses one
message rather than concatenated fragments. The inspected syntax pair prefers
“Choose a date range” over “Date is:” above choices. A suggested 40% expansion is
planning guidance, not an upper bound for all languages.
[Global writing](https://base.uber.com/6d2425e9f/p/4360d6), “Be careful with syntax,”
“Sending content for translation.”

Inclusion guidance values actual outcomes and people with varied permanent,
temporary, and situational needs. A reported destination-entry case illustrates
why an extra step can reduce an accessibility barrier. The transferable lesson is
to assess total task effort and exclusion, not optimize click count in isolation.
The study materials were not independently audited here.
[Understanding disability](https://base.uber.com/6d2425e9f/p/90f91f), “Before destination input”;
[Principles](https://base.uber.com/6d2425e9f/p/434f39);
[A11y first process](https://base.uber.com/6d2425e9f/p/4462ce).

**Recommendations for Cinder:**

- Make all library-authored visible and accessible strings replaceable/localizable;
  RAC locale context alone does not translate Cinder's English labels.
- Use complete messages with plural/number/date formatting, logical layout, and
  correct DOM language, including detached overlays.
- Preserve full critical values and recovery instructions under expansion; do not
  turn editorial word limits into clipping rules.
- Document names, roles, states, reading order, grouping, announcements, and focus
  alongside appearance. Translate native annotation intent to web semantics.
- Adopt a clear Cinder voice. Base's FOMO recommendation and Uber-specific marketing,
  legal, transport, and naming conventions are separate product choices.

Sources: [Screen reader content](https://base.uber.com/6d2425e9f/p/29d15f),
[Annotations](https://base.uber.com/6d2425e9f/p/74ace1),
[Inclusive content](https://base.uber.com/6d2425e9f/p/0461e9),
[Cinder string inventory](research-cinder-baseline.md#53-localization-and-manual-accessibility-gaps).

## 7. Accessibility: useful intent, qualified evidence

Base's native VoiceOver/TalkBack recipes frequently describe labels, values,
roles, grouping, custom actions, and focus. They are useful design handoffs, but
native traits, volume-key adjustments, long-press dragging, and platform speech
examples do not establish web keyboard or ARIA behavior. Some pages contain copied
state/index mistakes or incomplete accessibility sections.
[VoiceOver](https://base.uber.com/6d2425e9f/p/72ae38),
[TalkBack](https://base.uber.com/6d2425e9f/p/519906),
[Mobile screen readers](https://base.uber.com/6d2425e9f/p/40613e).

Use W3C for normative web thresholds and preserve their qualifications:

| Concern          | Correct web interpretation                                                                                                                                                    | Research consequence                                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Pointer targets  | WCAG 2.2 **2.5.8 AA: 24×24 CSS px**, with spacing, equivalent, inline, user-agent, and essential exceptions                                                                   | Measure interactive bounds and spacing, not just an icon. The spacing exception is not “24 px padding”                   |
| Enhanced targets | **2.5.5 AAA: 44×44 CSS px**, with its own exceptions                                                                                                                          | A useful stronger product goal; Base's 44/48 recommendations are not the AA minimum                                      |
| Focus obscuring  | **2.4.11 AA:** a keyboard-focused item must not be entirely hidden by author-created content                                                                                  | Sticky headers, banners, and overlays need contextual checks; stricter full visibility can be a Cinder design goal       |
| Text and reflow  | **1.4.4:** text resizing to 200% with stated exceptions; **1.4.10:** reflow at the specified 320 CSS-pixel width/256 height, with essential two-dimensional-layout exceptions | A narrow screenshot or Figma Dynamic Type simulation does not prove browser zoom/reflow                                  |
| Authentication   | **3.3.8 AA:** cognitive-function tests need a permitted alternative, assistance mechanism, or applicable exception                                                            | Preserve password-manager and paste/autofill support; Base's blanket password advice is not a modern browser requirement |
| Evaluation       | Automated tools support evaluation but cannot decide conformance alone                                                                                                        | Combine automated state checks with manual keyboard, browser/device, and assistive-technology review                     |

Sources: [W3C target minimum][wcag-target], [enhanced targets][wcag-enhanced],
[focus not obscured][wcag-focus], [resize text][wcag-resize], [reflow][wcag-reflow],
[accessible authentication][wcag-auth], [evaluation limits][w3c-evaluation].
Base source context: [A11y first process](https://base.uber.com/6d2425e9f/p/4462ce),
[Text resizing](https://base.uber.com/6d2425e9f/p/14427a),
[Input & forms](https://base.uber.com/6d2425e9f/p/764ae2).

These corrections matter because Base's prose includes a literal “4:5” contrast
entry, ambiguous type-size units, an incorrect target criterion label, and reflow
wording that cannot replace the standard. Named tokens, accessible primitive
dependencies, and Figma annotations each contribute evidence; none alone certifies
a finished Cinder composition.

## 8. Base Web implementation and maintenance

### Version pins

| Source                   | Observed pin                                                                                             |
| ------------------------ | -------------------------------------------------------------------------------------------------------- |
| Official source checkout | `ed21081e33f7db2770922b4e04d16dcf5bbdfa85`, 25 September 2026; source package version 18.2.0             |
| npm `latest`             | `baseui@18.2.0`, published 2 July 2026; `gitHead` `3adb0478c96569dc4e593ab39c24f36dc59e39f5`             |
| npm `next`               | `0.0.0-next-61fd16b8b`, published 4 September 2026; `gitHead` `61fd16b8b33f0b875fd8a124e484147bea21ac35` |
| npm peers                | React/React DOM `>=18`, `styletron-react >=6`                                                            |
| Setup recommendation     | Current inspected README installs `baseui@next`, Styletron React, and the monolithic engine              |

Sources: [pinned repository][bw-root], [README][bw-readme],
[npm registry](https://registry.npmjs.org/baseui).
Exact metadata, tarball integrity strings, and observation time are retained in
`.research/baseweb-2026-11-06/source-pins.json`. Tarballs were not installed or
treated as byte-equivalent to source HEAD. A shared version string does not prove
the source checkout matches the npm release or implements every Base 2.0 page.

### Styling and overrides

Base Web requires Styletron's provider/engine and a BaseProvider theme in its
documented setup. Themes centralize styling values and are available through its
styling utilities. The Overrides system exposes named subcomponents with **style,
props, or component replacement**, including nested overrides and state-aware
functions. It is a powerful escape hatch and a substantial interface for callers.
[README][bw-readme], [Theming][bw-theming], [Understanding overrides][bw-overrides].

Material tradeoffs for Cinder:

- **Reach:** consumers can customize deep parts without forking an entire module.
  Named parts are more discoverable than guessing internal DOM descendants.
- **Coupling:** callers learn internal component names and nested relationships;
  those become upgrade-sensitive contracts. The guide itself warns about future
  changes when replacing subcomponents.
- **CSS semantics:** Styletron expects longhand override properties; the guide
  warns that mixing shorthand and longhand can behave unexpectedly.
- **Uneven universality:** Data table explicitly lacks ordinary overrides. Button
  supports both `BaseButton` and `Root` override names, while its loading internals
  include an intentionally non-overridable portion. “Everything is replaceable”
  would overstate the actual interface.
- **Behavior remains involved:** Button source coordinates focus, hover, pressed,
  loading, anchor/button choice, and ARIA state. Replacing rendered subcomponents
  requires preserving their contract, not merely forwarding a style object.

Sources: [Overrides guide][bw-overrides], [Tables guide][bw-tables],
[Button source][bw-button]. These are source/document findings; no benchmark of
Styletron cost or cross-engine runtime comparison was performed.

**Recommendation:** borrow named, documented customization seams. Cinder can expose
ordinary classes, semantic variables, state selectors, and useful composable parts
without adopting Styletron or recreating an arbitrary nested override engine.
Plain CSS, Tailwind, Emotion, and styled-components should consume that same
interface; integration proof belongs in focused consumer fixtures.

### Localization and governance

Base Web's LocaleProvider configures component strings; its guide explicitly leaves
pluralization, currency, and list formatting to other tools such as Intl and treats
date formatting separately. RTL setup requires both DOM direction and theme
direction. This usefully demonstrates that a theme object, locale dictionary,
formatting policy, and DOM direction are related but different concerns.
[Internationalization][bw-i18n], [Bidirectionality][bw-rtl].

The README says public engagement is limited while internal work is mirrored. Its
engagement statement says internal development does not track breaking changes in
the same public-versioning workflow; next builds may contain unannounced or
undocumented breaking changes. The existence of a later stable npm release does
not erase that maintenance policy. This is relevant when choosing a dependency or
borrowing a release model. [README][bw-readme], [Open source engagement][bw-engagement].

The code is MIT-licensed. That license does not establish permission to redistribute
Uber Move fonts, trademarks, website illustrations, or all linked design assets.
Original Cinder work should retain applicable code/token/font notices according
to the actual material reused. [Base Web license][bw-license];
[Cinder provenance](research-cinder-baseline.md#licensing-and-independent-identity).

## 9. Documentation and system-building lessons

Base's reusable page structure—choice guidance, anatomy, behavior, content, visual
states, responsive treatment, accessibility, platform differences, and resources—is
one of its strongest contributions. It makes a component easier to select and use
correctly. Its extension overview and playbook also emphasize audit, ownership,
reusable patterns, documentation, and maintenance; detailed playbook chapters were
mostly private. [Components](https://base.uber.com/6d2425e9f/p/556814),
[Extension library](https://base.uber.com/6d2425e9f/p/283068),
[Playbook](https://base.uber.com/6d2425e9f/p/434226).

**Recommendation:** add explicit evidence and maturity to that structure. A Cinder
page should distinguish intended design, implemented behavior, supported public
props/parts, automated checks, manual checks, and known limits. Examples should
compile from the same source that renders them. Current Cinder already has a live
reference; its curated prop tables and separately maintained snippets need this
synchronization before another documentation runtime is introduced.
[Cinder documentation baseline](research-cinder-baseline.md#documentation-and-storybook).

Base's AI, Maps, and other extension hubs show how domain guidance can sit above
core foundations. Public AI framework/component/pattern hubs are sparse; the Base
skills/MCP/building pages require SSO. They do not substantiate an AI evaluation
framework or tool behavior to reproduce. An initial Cinder design system does not
need every upstream extension to be coherent.
[AI](https://base.uber.com/6d2425e9f/p/896004),
[Framework](https://base.uber.com/6d2425e9f/p/44684e),
[Maps](https://base.uber.com/6d2425e9f/p/65f6bf),
[Base AI](https://base.uber.com/6d2425e9f/p/75d4bd).

## 10. Contradictions and adoption decisions

These are conflicts or limits in the reviewed documents, not demonstrated runtime
defects. Resolve the intended Cinder rule rather than averaging incompatible values.

| Issue                                     | Evidence                                                                                                                                                                                                                          | Adoption decision                                                                   |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Radius generations and rollout            | [1.0](https://base.uber.com/6d2425e9f/p/652959), [2.0][radius2]                                                                                                                                                                   | Choose an original coherent scale and assignment policy                             |
| Material borders versus elevation strokes | [Material](https://base.uber.com/6d2425e9f/p/84bf33), [Elevation][elevation2]                                                                                                                                                     | Define contextual separation and prove contrast                                     |
| Typography spacing arithmetic             | [Typography 1.0](https://base.uber.com/6d2425e9f/p/976582)                                                                                                                                                                        | Resolve the intended spatial relationship before using the formula                  |
| Easing label                              | [Timing](https://base.uber.com/6d2425e9f/p/77fcaf)                                                                                                                                                                                | Use verified curve values and contextual durations                                  |
| Timed action minimum                      | [Timed button](https://base.uber.com/6d2425e9f/p/81070d), “Timing presets”: 8 s custom minimum versus 15 s absolute minimum, plus other advice                                                                                    | Product-owned timing/accessibility policy                                           |
| Modal/non-modal focus                     | [Popover](https://base.uber.com/6d2425e9f/p/752768), [Dialog][dialog]                                                                                                                                                             | Containment and `aria-modal` only for actual modality                               |
| Segmented choice count                    | [Button group](https://base.uber.com/6d2425e9f/p/83b31b): three; [Segmented control](https://base.uber.com/6d2425e9f/p/05421e): five                                                                                              | Fit, readability, and meaningful selection drive the limit                          |
| Compact row padding                       | [List item][list-item]: 8 versus 12                                                                                                                                                                                               | One deliberate density recipe                                                       |
| Badge icon size                           | [Badge](https://base.uber.com/6d2425e9f/p/554ab6): 10/12 versus 16/20                                                                                                                                                             | Distinguish container and artwork dimensions; verify the chosen recipe              |
| Other visual tables                       | [Link](https://base.uber.com/6d2425e9f/p/407fe0), [Stepper](https://base.uber.com/6d2425e9f/p/53dd73), [Message card](https://base.uber.com/6d2425e9f/p/480a1e), [Avatar](https://base.uber.com/6d2425e9f/p/572f13)               | State colors, border widths, overlays, and avatar color labels need qualification   |
| Web availability                          | [Accordion](https://base.uber.com/6d2425e9f/p/83c5d1), [Popover](https://base.uber.com/6d2425e9f/p/752768), [Dialog][dialog], [Sheet][sheet]                                                                                      | Separate intended design, legacy behavior, and unsupported features                 |
| Overlay ordering                          | [System banner](https://base.uber.com/6d2425e9f/p/9522f7), “Behavior,” pending investigation                                                                                                                                      | Do not place global UI over modal interaction without a coherent focus/access model |
| Notification/help overlap                 | [Toast](https://base.uber.com/6d2425e9f/p/87b3d6), [Snackbar](https://base.uber.com/6d2425e9f/p/72a605), [Tooltip](https://base.uber.com/6d2425e9f/p/63fdd3)                                                                      | One intentional web vocabulary and lifetime/focus policy                            |
| Table constraints and chart defects       | [Table][table], [Data table][data-table], [Charts](https://base.uber.com/6d2425e9f/p/61b6c1)                                                                                                                                      | Preserve data semantics and verify analytical recipes                               |
| Thin specifications                       | [Drawer](https://base.uber.com/6d2425e9f/p/43156e), [Draggable list](https://base.uber.com/6d2425e9f/p/3736ac), [Top navigation](https://base.uber.com/6d2425e9f/p/495709), [Tree view](https://base.uber.com/6d2425e9f/p/730380) | Full reading records what is present; additional contracts would still be needed    |

## 11. Recommended next validation

Use the [cross-system proposal](research-cinder-direction.md) to compare original
visual candidates on a real form, data workspace, and nested overlay flow. Before
expanding the catalog, prove consistent root/part customization, token precedence,
portal/locale inheritance, and the intended CSS-tool combinations. Keep each
behavioral assertion tied to a named environment and example.

**Evidence limits:** private bodies, obsolete originals, most image/video/Figma
resources, full Base Web runtime behavior, and exhaustive visual/assistive-technology
review remain unavailable or unverified. Current Cinder's saved 12 unit tests /
129 assertions and 92 browser tests are historical baseline evidence, not newly
executed results from this research. No new Cinder prototype was implemented.

[radius2]: https://base.uber.com/6d2425e9f/p/4420d2
[elevation2]: https://base.uber.com/6d2425e9f/p/5483ad
[list-item]: https://base.uber.com/6d2425e9f/p/96ccc3
[dialog]: https://base.uber.com/6d2425e9f/p/775209
[sheet]: https://base.uber.com/6d2425e9f/p/033e0d
[table]: https://base.uber.com/6d2425e9f/p/24d2e9
[data-table]: https://base.uber.com/6d2425e9f/p/901301
[bw-root]: https://github.com/uber/baseweb/tree/ed21081e33f7db2770922b4e04d16dcf5bbdfa85
[bw-readme]: https://github.com/uber/baseweb/blob/ed21081e33f7db2770922b4e04d16dcf5bbdfa85/README.md
[bw-theming]: https://github.com/uber/baseweb/blob/ed21081e33f7db2770922b4e04d16dcf5bbdfa85/documentation-site/pages/guides/theming.mdx
[bw-overrides]: https://github.com/uber/baseweb/blob/ed21081e33f7db2770922b4e04d16dcf5bbdfa85/documentation-site/pages/guides/understanding-overrides.mdx
[bw-tables]: https://github.com/uber/baseweb/blob/ed21081e33f7db2770922b4e04d16dcf5bbdfa85/documentation-site/pages/guides/tables.mdx
[bw-button]: https://github.com/uber/baseweb/blob/ed21081e33f7db2770922b4e04d16dcf5bbdfa85/src/button/button.tsx
[bw-i18n]: https://github.com/uber/baseweb/blob/ed21081e33f7db2770922b4e04d16dcf5bbdfa85/documentation-site/pages/guides/internationalization.mdx
[bw-rtl]: https://github.com/uber/baseweb/blob/ed21081e33f7db2770922b4e04d16dcf5bbdfa85/documentation-site/pages/guides/bidirectionality.mdx
[bw-engagement]: https://github.com/uber/baseweb/blob/ed21081e33f7db2770922b4e04d16dcf5bbdfa85/documentation-site/pages/blog/open-source-engagement/index.mdx
[bw-license]: https://github.com/uber/baseweb/blob/ed21081e33f7db2770922b4e04d16dcf5bbdfa85/LICENSE
[wcag-target]: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
[wcag-enhanced]: https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html
[wcag-focus]: https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html
[wcag-resize]: https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html
[wcag-reflow]: https://www.w3.org/WAI/WCAG22/Understanding/reflow.html
[wcag-auth]: https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html
[w3c-evaluation]: https://www.w3.org/WAI/test-evaluate/tools/selecting/#cannot
