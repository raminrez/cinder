---
version: 1
slug: "apps-docs-src-prototypes-main-tsx"
primary_target: "apps/docs/src/prototypes/main.tsx"
related_targets: ["apps/docs/src/prototypes/frame.css","apps/docs/src/prototypes/comparison.tsx"]
---

# Fourth Cinder prototype

Target: `apps/docs/src/prototypes/main.tsx`, `/prototypes?variant=frame`.
Mode: Operate. The comparison guide is Read.

The task is to evaluate a field-centered direction against the existing three
prototypes. The user has pinned Astryx as the primary visual reference, with HeroUI
v3 secondary. Use existing RAC behavior, fictional review data, and local CSS.

## Direction contract

**THESIS:** Frame makes a field's purpose, instructions, value, and recovery read as
one unit. Form clarity carries the direction rather than a larger next-task card.

**OWN-WORLD:** Cool neutral surfaces, ink-colored primary actions, blue focus and
selection, 44px controls with 10px corners, and attached red validation bands.
Warning and success feedback have their own paired foreground/background colors.

**STORY:** Open settings, understand the guidance before typing, correct an invalid
entry, and save. Search the same reviews and edit an assignment in a dialog to
check how the language carries into data and overlays.

**FIRST VIEWPORT:** A compact horizontal workspace header precedes a readable main
area. Settings place a single reading column of fields beside a live summary;
the review view places filters directly above an aligned table. Narrow screens
stack the summary and use the existing readable review list.

**FORM:** User-pinned Astryx field clarity, interpreted in Cinder's existing
application. Code-led; no randomized direction or image comp. Seed: none
(user-pinned). The signature is guidance above, attached recovery below, and a
separate focus outline that remains legible on an invalid field.

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the
finish review, the verdict, DESIGN.md, and every shipping raster carrying its
provenance.

Acceptance: fourth route and comparison, working validation and save recovery,
search/filter/select/edit, nested Escape and focus return, light/dark and narrow
layouts, and bounded evidence recorded with the result.
