# A guide to the Cinder prototypes

Field, Relay, Index, and Frame are four proposed designs for Cinder. They use the same
components and fictional review data. Their names describe different choices about
layout, emphasis, and spacing.

**Start with the [visual comparison](http://127.0.0.1:3000/prototypes).** Choose a
task, compare the pictures, and use a “Try” button to open a working example. Each
picture has an explanation of the choice, why it might help, and its tradeoff.

**The current exploration is [Frame settings](http://127.0.0.1:3000/prototypes?variant=frame&view=settings).**
Astryx leads its visual direction: instructions above the input, attached recovery
below it, and a focus outline distinct from the error border.

Run `bun run dev` from the repository root if the local site is not running. The
comparison is the default `/prototypes` view on the research branch.

**Relay now has a reusable [component gallery](http://127.0.0.1:3000/relay).** It
shows the actual package components, states, sizes, light/dark tokens, and API
guidance, and is included in production builds. The [Relay specification](relay.md)
records these later library decisions; the comparisons below remain prototype evidence.

## The main difference

| Design    | What it puts first                         | When that helps                                                       | What you give up                                                              |
| --------- | ------------------------------------------ | --------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **Field** | The whole workspace stays easy to scan.    | You alternate between forms, settings, and reviewing several records. | The table gives less guidance about the next task.                            |
| **Relay** | The next review gets a prominent action.   | People usually complete one task at a time.                           | Larger controls and more space mean fewer records on screen.                  |
| **Index** | A selected record stays close to its list. | People repeatedly inspect and compare structured records.             | More information competes for attention, and the desktop targets are tighter. |
| **Frame** | Instructions, input, and recovery read as one unit. | People need clear forms and familiar table-based work. | Reserving validation space makes valid forms taller. |

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

| Proposal | Desktop controls | Dialog corners | Reason for the choice                                                 |
| -------- | ---------------- | -------------- | --------------------------------------------------------------------- |
| Field    | 40px             | 16px           | The temporary editing surface is softer than its small controls.      |
| Relay    | 48px             | 20px           | More room makes the editing step distinct from the surrounding queue. |
| Index    | 32px             | 6px            | A compact surface suits frequent, short edits.                        |
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
| Review table             | A strong header band and continuous rows emphasize alignment.                         | A softer table surface and rounded chips give a different visual treatment. | Field, Index, and Frame emphasize the list; Relay adds explicit next-task guidance.                |

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

## Current exploration: Frame

**Frame is the current exploration**, following the Astryx-led reference choice.
Evaluate whether its guidance and recovery are easier to understand, and whether
the reserved space is worth the extra scrolling. Relay's earlier reusable slice
remains documented in [the component specification](relay.md).

Useful feedback names the part and the task. For example:

> I prefer Frame's guidance because I can read it before typing, Relay's next-review
> action because I know where to start, and Index's persistent details because I
> can compare records without reopening a dialog.

That feedback can guide the next design iteration without treating each proposal
as an indivisible package. These examples have not been tested with representative
users, and they do not establish a winning design or a new public component API.

## Verification

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
