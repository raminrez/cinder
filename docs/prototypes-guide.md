# A guide to the Cinder prototypes

Field, Relay, Index, and Frame are four design studies for Cinder. They use the same
components and fictional review data. Their names describe different choices about
layout, emphasis, and spacing.

**Start with the [visual comparison](http://127.0.0.1:3000/prototypes).** Choose a
task, compare the pictures, and use a “Try” button to open a working example. Each
picture has an explanation of the choice, why it might help, and its tradeoff.

**The preferred direction is [Frame settings](http://127.0.0.1:3000/prototypes?variant=frame&view=settings).**
Astryx leads its visual direction: instructions above the input, attached recovery
below it, and a focus outline distinct from the error border.

Run `bun run dev` from the repository root if the local site is not running. The
comparison is the default `/prototypes` view on the research branch.

**Relay now has a reusable [component gallery](http://127.0.0.1:3000/relay).** It
shows the actual package components, states, sizes, light/dark tokens, and API
guidance, and is included in production builds. The [Relay specification](relay.md)
records these later library decisions; the comparisons below remain prototype evidence.

## The main difference

| Design    | What it puts first                                  | When that helps                                                       | What you give up                                                              |
| --------- | --------------------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **Field** | The whole workspace stays easy to scan.             | You alternate between forms, settings, and reviewing several records. | The table gives less guidance about the next task.                            |
| **Relay** | The next review gets a prominent action.            | People usually complete one task at a time.                           | Larger controls and more space mean fewer records on screen.                  |
| **Index** | A selected record stays close to its list.          | People repeatedly inspect and compare structured records.             | More information competes for attention, and the desktop targets are tighter. |
| **Frame** | Instructions, input, and recovery read as one unit. | People need clear forms and familiar table-based work.                | Reserving validation space makes valid forms taller.                          |

The queue makes the first three layout choices easiest to see. Frame's distinction
is clearest in settings; it shares Field's table workflow with a horizontal shell.

## Compare the same three tasks

### Fill in a form

Choose **Fill in a form**. Each picture shows the same workspace name and reply-to
address. Look at the height of the controls, the corners, and the Save button.

- **Field** uses 40px controls with 4px corners and a green primary action. This is
  a restrained starting point for a product with both forms and tables.
- **Relay** uses 48px controls with 8px corners and a strong neutral primary action.
  Each entry has more room, but the same form becomes taller.
- **Index** keeps 40px controls in settings, with square corners and a blue primary
  action. Its 32px desktop treatment applies to tools and dialog controls, not every
  field in the product.
- **Frame** uses 44px controls with 10px corners and neutral primary actions.
  Guidance precedes the input; an icon and recovery message join its lower edge.

Turn on **Show an invalid email**. In all four proposals, the instructions remain
visible alongside the error. The working settings form reserves space for the
error so the Save button stays under the pointer when validation appears.

Use a **Try … settings** button to
test this yourself: clear the workspace name, enter `not-an-email` as the reply
address, and press **Save changes**. Both errors should appear, and keyboard focus
should move to the workspace name.

The small pictures do not show the whole settings page. In the working examples,
Field uses section explanations beside the fields, Relay gives the form more room,
and Index uses a more compact arrangement. Frame puts section explanations above
a single field column, with the summary beside it on wider screens. Each has the
same summary content.

### Choose a review

Choose **Choose a review**, then compare how each design answers “What should I do
next?”

- **Field** aligns names and statuses in a continuous table. This makes comparisons
  and group assignments easier, while leaving more of the next-task decision to you.
- **Relay** places the next review above the remaining records in the small example.
  In the wide working workspace, it occupies a prominent column beside the queue.
  This gives people a clear place to start.
- **Index** keeps details close to the selected review. The small picture places
  details below the table; the wide working workspace places them beside it. This
  lets people inspect a record while keeping the list in view.
- **Frame** uses an aligned table, 44px filters, and explicit status labels. It
  carries the form's control and feedback language into the existing overview.

The Carbon and HeroUI references also use tables. A component library supplies
table controls and styling; the application chooses whether to add a next-task
panel or a persistent detail pane.

Use a working workspace to search for `dialog`, change the status filter, sort the
records, or select two reviews and choose **Assign selected**. The full example has
twelve fictional reviews. “Select all” applies to the current six-record page.

### Edit in a dialog

Choose **Edit in a dialog**. Each design shows the same reviewer, status, note, and
Cancel and Save actions.

| Proposal | Desktop controls | Dialog corners | Reason for the choice                                                  |
| -------- | ---------------- | -------------- | ---------------------------------------------------------------------- |
| Field    | 40px             | 16px           | The temporary editing surface is softer than its small controls.       |
| Relay    | 48px             | 20px           | More room makes the editing step distinct from the surrounding queue.  |
| Index    | 32px             | 6px            | A compact surface suits frequent, short edits.                         |
| Frame    | 44px             | 18px           | The temporary editing step keeps the same field treatment as settings. |

Use a **Try … dialog** button to open the working dialog over the comparison.
Open **Reviewer**, then press Escape twice. The first press closes the dropdown
and returns focus to its trigger. The second closes the dialog and returns focus
to the button that opened it. These behaviors are shared by all four proposals.

## How Astryx, HeroUI, and Carbon inform the proposals

**Astryx is the primary visual reference.** Its Field documentation crop shows
error, warning, and success messages attached to their controls. The comparison
includes both themes, captured from the public documentation displaying **0.7.9**.
The inspected source is separately pinned at core **0.7.10**.

Frame takes the field grouping and distinct focus treatment as its starting point,
then uses Cinder's own palette, dimensions, reserved error space, and RAC behavior.
Save confirmation communicates success for the working form. The Astryx crop is
252px wide and uses its own example content; it is an anatomy reference rather than
another common-sized task specimen. [Research and limits](research-astryx.md).

The HeroUI and Carbon task pictures are captures of real components assembled into
these small tasks. They use **Carbon React 1.120.0 / Styles 1.119.0** and
**HeroUI React / Styles 3.2.7**.

| Detail in these captures | Carbon v11                                                                            | HeroUI v3                                                                   | What it helps explain about Cinder                                                         |
| ------------------------ | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Fields                   | The filled field has an underline and a small label. The captured input is 40px high. | The field has softer edges. The captured input is 36px high.                | Cinder's proposals use full field outlines. Shape and control size are separate decisions. |
| Primary action           | The ordinary button is 48px high and square.                                          | The desktop default button is 36px high and pill-shaped.                    | Relay is softer than Index, but its 48px action is larger than HeroUI's default.           |
| Invalid field            | The error replaces the helper text in the captured TextInput.                         | The error replaces the visible description in the captured TextField.       | These Cinder prototypes retain both, at the cost of more vertical space.                   |
| Dialog actions           | A full-width footer uses 64px buttons in this configuration.                          | Separate rounded buttons sit inside the dialog.                             | The Cinder proposals keep separate actions and vary control size and surface corners.      |
| Review table             | A strong header band and continuous rows emphasize alignment.                         | A softer table surface and rounded chips give a different visual treatment. | Field, Index, and Frame emphasize the list; Relay adds explicit next-task guidance.        |

These are observations about the displayed versions and configurations. They are
not a claim that either library supports only one size, layout, or error treatment.
Field, Relay, Index, and Carbon use IBM Plex Sans in the captures. Frame and the
HeroUI fixture use the local system font; Astryx's documentation uses Figtree.

The architectural recommendation is to keep Cinder's React Aria behavior and
ready-to-use CSS, while making styling hooks more consistent. HeroUI's named parts
are a useful reference for customization. Astryx's anatomy and explicit ownership
contracts help make those hooks predictable. Carbon informs UX, accessibility,
layout, component coverage, and AI guidance. A visual preference does not require
adopting another component library.

## Try the full examples

| Design | Workspace                                                                     | Settings                                                                      |
| ------ | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Field  | [Open reviews](http://127.0.0.1:3000/prototypes?variant=field&view=workspace) | [Open settings](http://127.0.0.1:3000/prototypes?variant=field&view=settings) |
| Relay  | [Open reviews](http://127.0.0.1:3000/prototypes?variant=relay&view=workspace) | [Open settings](http://127.0.0.1:3000/prototypes?variant=relay&view=settings) |
| Index  | [Open reviews](http://127.0.0.1:3000/prototypes?variant=index&view=workspace) | [Open settings](http://127.0.0.1:3000/prototypes?variant=index&view=settings) |
| Frame  | [Open reviews](http://127.0.0.1:3000/prototypes?variant=frame&view=workspace) | [Open settings](http://127.0.0.1:3000/prototypes?variant=frame&view=settings) |

- Use the bottom bar to switch designs. Review edits, settings, search, and current
  selection carry across the layouts.
- Use the theme button at the top for light and dark mode. You can also add
  `&mode=dark` to a working-example URL.
- Use **Try a state** for empty results, loading, a failed load, or a failed save.
  A failed save preserves the entered values so you can retry.
- Use **Compare** to return to the task comparison. The explicit `view=guide` URL
  remains available.
- Reload or choose **Reset demo** to restore the sample. There is no server-side
  persistence or synchronization between tabs.

On narrow screens the working forms use a 44px control size, tables become readable
lists, and Index opens details as a separate view. The comparison pictures remain
desktop captures, scaled to fit the page. They do not demonstrate mobile targets.

## Preferred direction: Frame

**Frame was selected as the preferred visual direction on 6 November 2026.**
Its guidance above the input, attached recovery, cool-neutral surfaces, and
44px controls establish the next visual baseline. The reserved validation space
is an accepted tradeoff for a stable Save action. [DESIGN.md](../DESIGN.md)
records the implemented rules and their prototype scope. Relay's earlier reusable
slice remains documented in [the component specification](relay.md).

The [design-system specification](design-system.md) and
[ordered library plan](component-library-plan.md) define the next code-based work.
Figma is the final handoff from the completed library, tokens, and documentation.

Useful feedback names the part and the task. For example:

> I prefer Frame's guidance because I can read it before typing, Relay's next-review
> action because I know where to start, and Index's persistent details because I
> can compare records without reopening a dialog.

That feedback can refine the selected direction without treating each proposal
as an indivisible package. The choice records a visual preference; these examples
have not been tested with representative users and do not establish a new public
component API.

## Verification

### Frame and the four-direction comparison

The following Chromium passes completed on **6 November 2026**, using
`agent-browser` and its bundled axe-core **4.12.1**. Every recorded assertion
passed; the scans reported no violations. The passes overlap, and the settings
follow-up refreshed captures from the first run.

| Pass                      | Checks | Axe scans | Captures | Scope                                                                                                          |
| ------------------------- | -----: | --------: | -------: | -------------------------------------------------------------------------------------------------------------- |
| Frame introduction        |    153 |        16 |       36 | Settings, workspace, dialog, and nested Select at 1440, 768, 390, and 320px in both themes                     |
| Settings follow-up        |     93 |         4 |       16 | Single-column summary, validation, Save placement, recovery, and the keyboard path                             |
| Four-direction comparison |     83 |        14 |       14 | All 50 reference images, all 13 Try actions, four dialog focus-return paths, and narrow layouts                |
| Workflow follow-up        |     42 |         3 |        5 | Filtering, sorting, selection, edits, copying, dependencies, recovery, preserved state, and text/layout stress |

The settings checks establish separate error and focus treatments, persistent
helper text, first-invalid focus, corrected submission, and unchanged Save
coordinates for the example's expected errors. An eight-control keyboard path
remains visible above the development switcher. The reserved space is a budget
for these messages; longer errors must be allowed to grow.

The workflow pass covered trimmed, case-insensitive search combined with a status
filter; sorting; six-record page selection; bulk assignment; saved and cancelled
edits; failed-load recovery; a copyable but noneditable workspace ID; dependent
summary settings; pending repeat prevention; failed-save retry; and state carried
across all four directions. The settings, invalid states, comparison, and workflow
captures were visually inspected alongside the geometry and keyboard evidence.

**Reviewed automated-scan limitation:** axe could not infer the background behind
`.review-modal-context` in the 390px dark bulk-assignment dialog because it reported
an overlap. A follow-up viewport capture and text-line hit testing showed the
paragraph unobscured on the dialog surface. Computed `#b1b6c3` text on `#22242a`
has **7.644:1** contrast. This resolves that specific incomplete result; it does
not turn the automated scans into a complete accessibility assessment.

The two other original incomplete results concerned the ascending sort arrow in
the 1440px workspace: axe could not classify the non-text character. The visible
indicator uses `#606674` on `#eef1f6` in light mode (**5.082:1**) and `#b1b6c3` on
`#2c2f38` in dark mode (**6.588:1**), exceeding the 3:1 non-text requirement.
Viewport hit testing and reviewed captures confirm it is unobscured. The header
exposes `aria-sort="ascending"`; the matching arrow is `aria-hidden="true"` to avoid
duplicating that information. These bounded reviews resolve the three incomplete
results recorded across the Frame passes.

The structured local evidence is in
`.research/astryx-2026-11-06/{frame-ui-checks,frame-settings-checks,comparison-checks,flow-checks}.json`;
review captures are in `.impeccable/review/`. Both directories are ignored working
evidence. The comparison's committed images and source/version boundaries are
documented in [capture provenance](../apps/docs/src/prototypes/references/README.md).

### Written system, previews, and report delivery

The final specification checks cover YAML/JSON structure, component references,
narrative synchronization, all **38 Frame color values**, inherited motion,
recipe breakpoints, and local links/anchors across the eight core design and
guide documents. The plan assigns all **45 catalog entries exactly once** in
groups of **14 + 11 + 9 + 11**. All fifteen static check groups pass.

The eight [Impeccable previews](../.impeccable/design.json) passed **27 checks**, four
axe scans, and six reviewed captures. Each snippet was rendered in an isolated
shadow root at 1440px and 320px in both themes. Checks include seven keyboard
targets, visible focus, label/help/error relationships, attached recovery,
geometry, text containment, and live inherited/scoped token changes. A 390px
fallback pass used no project stylesheet or inherited tokens. These are visual
snippets; their native controls do not establish the reusable RAC library contract.

The final page pass completed **27 checks**, four axe scans, and six reviewed
captures. It covered the sort-indicator reviews above, selected-direction copy,
the working **Try Frame settings** entry, and `/research` in development and the
production preview at 1440px/Gray 10 and 320px/Gray 100. The research-page and
preview scans have no reported violations or incomplete results; the final pages
have no reported runtime errors.

All three Markdown reports were downloaded through the actual browser links in
both environments: **six downloads matched their current source bytes exactly**.
A further mounted-page check confirmed that saving an edited report immediately
changes its downloaded bytes. This caught a Bun 1.4.4 hot-reload issue that changed
file-asserted Markdown imports into rendered HTML. Downloads now use explicit
`/reports/` file routes in development and copied source files in production,
sharing the finite filename list in `apps/docs/reports.ts`.

`bun run build`, `bun run lint`, and `bun run typecheck` passed; type checking
covered 52 files. The two prototype data tests passed with six assertions.
Formatting and local-link checks cover the touched deliverables. The production
build still uses `apps/docs/index.html`; the Frame comparison remains available
through the development entry.

Local evidence under `.research/astryx-2026-11-06/` is recorded in
`design-docs-checks.json`, `design-preview-checks.json`, `final-docs-checks.json`,
`development-download-checks.json`, `production-download-checks.json`, and
`report-save-check.json`. Screenshots and download bytes are retained with the
ignored working evidence.

### Localization and remaining evaluation

The prototype's provider is fixed to `locale="en-US"`. The workflow checks preserve
accented and Japanese text, exercise long values, and apply synthetic RTL at
320px. That DOM-only RTL injection does not change RAC's locale or the original
writing context of detached overlays. It proves a bounded layout case, not RTL
keyboard behavior or complete localization.

Manual screen-reader tasks, Firefox/WebKit, physical touch devices, real IME,
translation quality, non-default locale/calendar behavior, 200% text resizing,
400% zoom/reflow, and representative-user evaluation remain incomplete. The
[library plan](component-library-plan.md) assigns those checks to the reusable
slices before support is claimed. Automated scans do not inspect text inside
reference images.

### Earlier three-direction baseline

Before Frame, the 6 November 2026 Chromium run passed **137 checks** and **31 automated
accessibility scans**, with no reported violations or runtime errors. It covered
all forty captures, all nine working-example links, validation and save recovery,
nested dropdown focus, state preservation, and layouts at 1440, 768, 390, and 320px.
Type checking, lint, formatting, and the two prototype data tests also passed.

The visual review covered all eight desktop task/theme combinations and the
tablet and phone comparison layouts. The Impeccable scan retains one reviewed
warning for Index's current-record marker, which connects the inspected row to
its detail pane. Other browsers, physical devices, screen readers, and
representative-user sessions were not tested. Automated scans do not evaluate
text inside the captured images.

## Sources and scope

- [Capture provenance and limitations](../apps/docs/src/prototypes/references/README.md)
  records the component versions, framing, typography, and author-chosen layouts.
- [Cinder direction research](research-cinder-direction.md) contains the earlier
  proposal and architectural reasoning. This guide records the later prototypes.
- [Astryx research](research-astryx.md), [Carbon research](research-carbon.md), [HeroUI research](research-heroui.md),
  [Base research](research-base.md), and the [Cinder baseline audit](research-cinder-baseline.md)
  provide the detailed findings and primary sources.

The examples belong to the development-only `apps/docs/prototypes.html` entry.
The production build uses `apps/docs/index.html`. The comparison loads local image
assets; the vendor capture dependencies live in the isolated research fixtures.
