# Cinder — final visual review

**Reviewed 6 November 2026.** The final production homepage inspection was captured
at **01:43:55 UTC** and the final reference inspection at **01:45:05 UTC**, after the
passing 01:40–01:42 aggregate. All **seven homepage and six reference screenshots**
listed below were opened and inspected.

The homepage reports **0 FAIL / 5 WARN**. The reference reports **0 FAIL / 1 WARN**
with one explicitly verified inactive-control contrast exception. The original
unfiltered reference report is retained. These measurements support the visual
assessment; the [verification report](verification.md) describes functional scope.

## Direction and provenance

| Surface             | Direction                      | Seed         | Signature                                                                                              |
| ------------------- | ------------------------------ | ------------ | ------------------------------------------------------------------------------------------------------ |
| Homepage            | **The sentence is the layout** | `1403602033` | Four theme swatches interrupt the two-line sentence; the same themes become an operable specimen below |
| Workbench/reference | **Framed sheet**               | `352885001`  | A quiet gray shell surrounds the white working surface; selection and actual controls carry the color  |

The retained [homepage draw](../.taste-skill/direction.json),
[direction sheet](../.taste-skill/page-direction.md),
[app draw](../.taste-skill/app/direction.json), and
[project direction](design-direction.md) establish the choices. IBM Plex Sans
supplies display and interface type; IBM Plex Mono is reserved for code and actual
technical values. Carbon's palette, control geometry, and four-theme relationships
are fixed foundations. Cinder supplies the composition and identity.

Three recorded redraws made the direction fit the brief:

1. The showcase became **live controls**, making interaction the proof.
2. The about section became **side facts and a wide paragraph**, describing a system.
3. Setup became a **reading column**, preserving selectable installation commands.

The selected imagery mode is the library's **real interface**. Forms, a working
table, feedback, swatches, and type specimens provide the visual material. The
decorative swatches use shutter motion; section parts have one-shot Web Animations
entrances. Content has a visible fallback, and reduced motion and focus cancel
entrances. The browser suite verifies production timing and reduced-motion settling.

### The questions each inspected surface answers

- **Homepage:** What is Cinder, and what can I compose with it?
- **Theme workbench:** How do these same controls change with theme, size, and state?
- **Component reference:** How do I use and operate this control, and where do its
  visual and interaction rules come from?

## Rendered measurements and dispositions

| Finding                     | Measured result                                                             | Disposition                                                                                                                                                                               |
| --------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Homepage `size-count`       | 13 sizes at desktop, from 12px supporting text to the 400px footer wordmark | Retained: expressive site type and productive component specimens share this page. The count is real; the type hierarchy remains visibly ordered.                                         |
| Homepage `no-real-pictures` | Zero photographs or clips                                                   | Retained: live library UI is the brief's imagery. The photographic-image cap is still applied to the marketing-page design score below.                                                   |
| Homepage `no-footage`       | No video                                                                    | Retained: the visitor can operate the actual specimen. Motion comes from controls and the swatch/entrance treatments.                                                                     |
| Homepage `off-centre`       | Inspector reports text bounds of 32px left / 56px right                     | The dedicated frame probe measures symmetric `.page-frame` content insets: 32.4px each at 1440px, 20px each at 768/390px. The inspector's text-bound heuristic measures a different edge. |
| Homepage `still-page`       | Nine detected moving elements                                               | Retained: bounded, focus-cancelable motion leaves long-form reading and controls stable. This is below the marketing inspector's motion floor.                                            |
| Reference `app-title-size`  | 64px desktop title, 40px tablet/mobile                                      | Retained: the large title identifies the documentation entry before its specimen. A denser reference could reduce it; the current hierarchy is deliberate.                                |
| Reference raw `contrast`    | “Unavailable,” 1.9:1, `#8d8d8d` on `#c6c6c6`, at all three widths           | Verified native disabled button; the inactive-component exception in WCAG 1.4.3 applies. See the evidence below.                                                                          |

The reported three-line homepage “heading” is the large **paragraph** beginning
“Not a collection of isolated controls,” classified by the inspector as a
statement. It is a `<p>`, not a three-line title. The inspected hero remains a
two-line composition. Its measured display fragment is approximately 138px at
1440px, 71px at 768px, and 41px at 390px.

The reference's [unfiltered report](../.taste-skill/delivery/final/reference-raw-report.json)
contains exactly one contrast finding. At each viewport, its only low-contrast
entry is “Unavailable.” A [fresh DOM check](../test-results/disabled-contrast.json)
confirms a native `<button disabled>`, `:disabled` matching, inability to take
focus, and the reported computed colors. Only then was the reference inspector
rerun with `--allow contrast`. That switch filters the whole inspector rule on
this run; the retained raw report and DOM evidence establish the narrower actual
exception. Enabled content remains covered by the unfiltered report and axe scans.

## Screenshot inventory

Contact sheets contain viewport captures arranged into tiles. Gray unused sheet
cells and joins between tiles are inspector output, not page content.

| Route / viewport         | Viewed files                                                                                                                                                                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home, 1440px             | [Fold](../.taste-skill/delivery/final/home/desktop-fold.jpg), [sheet 1](../.taste-skill/delivery/final/home/desktop-page-01.jpg), [sheet 2](../.taste-skill/delivery/final/home/desktop-page-02.jpg) |
| Home, 768px              | [Fold](../.taste-skill/delivery/final/home/tablet-fold.jpg), [sheet](../.taste-skill/delivery/final/home/tablet-page-01.jpg)                                                                         |
| Home, 390px              | [Fold](../.taste-skill/delivery/final/home/mobile-fold.jpg), [sheet](../.taste-skill/delivery/final/home/mobile-page-01.jpg)                                                                         |
| Button reference, 1440px | [Fold](../.taste-skill/delivery/final/reference/desktop-fold.jpg), [sheet](../.taste-skill/delivery/final/reference/desktop-page-01.jpg)                                                             |
| Button reference, 768px  | [Fold](../.taste-skill/delivery/final/reference/tablet-fold.jpg), [sheet](../.taste-skill/delivery/final/reference/tablet-page-01.jpg)                                                               |
| Button reference, 390px  | [Fold](../.taste-skill/delivery/final/reference/mobile-fold.jpg), [sheet](../.taste-skill/delivery/final/reference/mobile-page-01.jpg)                                                               |

Machine-readable inspections: [homepage](../.taste-skill/delivery/final/home/report.json)
and [reference](../.taste-skill/delivery/final/reference/report.json). The final
[artifact reconciliation](../test-results/final-artifacts.json) records their
hashes alongside the screenshots and built site files.

The later byte-level delivery check found a stale HTML response length in the
long-running preview, confined to trailing `<noscript>` text. The CSS, JavaScript,
and favicon used by these JavaScript-enabled captures matched the final build.
Restarting the preview restored complete HTML bytes; the
[before/after record](../test-results/preview-rebuild.json) preserves that distinction.

### What changed after the earlier screenshots

The [pre-adjustment reference captures](../.taste-skill/delivery/before-props-layout/)
exposed API names breaking across lines and descriptions pushed sideways on narrow
screens. The final table stacks name, type, and purpose at widths up to 60rem.
The updated tablet/mobile sheets show complete prop names and readable descriptions.
The focused [1440px](../.taste-skill/delivery/final/details/props-1440.png),
[768px](../.taste-skill/delivery/final/details/props-768.png), and
[390px](../.taste-skill/delivery/final/details/props-390.png) table captures were also
opened during that fix.

The [layout probe](../test-results/props-layout.json) extends this evidence to all
45 entries at four widths, including 320px, and checks retained table/header roles.
The two fixed-width date previews use local horizontal scrolling at the narrowest
width; focused dates and the range-calendar trigger are kept in view. This is a
scoped overflow treatment for those specimens.

Theme-toolbar segments now have room for their labels: 60px desktop/tablet and
52px mobile. At 320px, Reset wraps onto a second row. The final mobile reference
fold shows the resulting readable theme selector.

## Screenshot critique

This is the first scored written critique of the final delivery captures. Earlier
iterations and the responsive corrections above are retained as visual evidence.
Scores describe this reviewer's judgment of these renders.

### ROUND 1 — final homepage captures

- **Seen in one second:** “A considered foundation,” with four gray theme swatches.
- **Idea (one sentence):** A system's four themes become punctuation inside a
  sentence, then turn into controls the visitor can operate.
- **Live thing:** Theme, density, helper/disabled states, form values, and example
  interactions change actual Cinder components.
- **Layout words by section:** hero=sentence / showcase=workbench / components=rows /
  foundations=side-facts / setup=reading-column / footer=wordmark.
- **Scores:** design **6.5** · usability **8** · creativity **7** · content **8** →
  overall **7.2/10** (unrounded weighted result 7.15).
- **Caps applied:** design ≤6.5 for fewer than four photographic assets; design
  ≤7 for the inspector's low-motion result; creativity ≤7 because another
  Carbon-based library could use the same broad theme/specimen concept. The
  photographic cap is the tighter design cap. The score remains below 7.5.
- **Top three remaining refinements, most visible first:**
  1. The supporting copy leaves “own.” on a line by itself at tablet and mobile
     widths ([tablet fold](../.taste-skill/delivery/final/home/tablet-fold.jpg),
     [mobile fold](../.taste-skill/delivery/final/home/mobile-fold.jpg)). A later
     copy pass could shorten that sentence to improve the final line.
  2. Three middle-page feature rows settle into the same text/specimen arrangement
     ([desktop sheet 1](../.taste-skill/delivery/final/home/desktop-page-01.jpg)).
     A future composition pass could give the collection specimen a wider role
     while retaining the shared alignment.
  3. On a phone the workbench controls follow the entire form
     ([mobile sheet](../.taste-skill/delivery/final/home/mobile-page-01.jpg)).
     Moving the theme control before the form in a future mobile pass would make
     the first comparison quicker; the current sequence remains operable.

The strongest screen is the opening: decisive type, a visibly specific four-theme
motif, direct supporting copy, and a clear blue action. The real specimen supplies
substance. The middle is coherent but more conventional, and the restrained motion
and interface-only imagery limit its score under the marketing-page rubric.

### Reference and workbench assessment

The reference is evaluated as a working documentation surface. The app-screen
direction has no photographic or entrance-motion floor.

- **Task clarity: 8/10.** Title, component navigation, theme controls, example,
  usage, anatomy, keyboard behavior, props, and sources form a clear sequence.
- **Hierarchy and density: 7/10.** The white sheet and compact gray sidebar make
  orientation easy. The oversized title and generous preview give a small API
  entry considerable vertical length.
- **Responsive readability: 8/10.** Navigation folds away on phones; example
  controls wrap; the corrected prop records are readable without sideways table
  scrolling. The longer stacked prop section is the deliberate density tradeoff.
- **Visual consistency: 8/10.** Carbon colors, Plex, square control geometry,
  focus outlines, and surface steps remain coherent with the homepage specimen.

The tablet sidebar's filter placeholder truncates while its accessible label and
function remain available. Code/type text is compact at 12px and long code lines
scroll locally. These are visible density compromises. This review establishes
the appearance of the pictured default state; four-theme geometry/color checks
and the broader catalog routes are covered by the automated evidence.

## Sample content and credits

The form's **Cinder studio**, environment, and seat count are local example values
in [`home.tsx`](../apps/docs/src/home.tsx). The six workspaces **Atlas, Fieldnotes,
Meridian, Studio, Workshop, and Sandbox**, their teams/statuses/member counts, and
the table's local actions are in [`workbench.tsx`](../apps/docs/src/workbench.tsx).
Additional named people, dates, files, and action messages live in
[`examples.tsx`](../apps/docs/src/examples.tsx). The interface labels the workspace
table as sample data and form submission as a local preview.

Carbon, RAC, and IBM Plex are credited in the site and [NOTICE](../NOTICE).
The imagery is Cinder's rendered interface and type; the site ships the associated
runtime and font licenses with its production assets.
