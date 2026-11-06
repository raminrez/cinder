# Cinder

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Developers and designers building reusable product interfaces. People using those
interfaces need clear controls, useful feedback, and predictable interaction.

## Product Purpose

An original, broadly reusable design system with a good developer experience.
Working examples let the team evaluate a design before adopting it in the library.

## Capabilities and Constraints

- The current implementation uses React Aria Components, semantic tokens, and
  prebuilt CSS in a Bun workspace.
- `/prototypes` compares designs using shared, fictional review data. Edits last
  only for the current demo session.
- `/relay` demonstrates the first reusable Relay component slice.
- Build the packaged components and their Storybook stories first. Develop the
  documentation website after the component work; editable Figma assets are the
  final handoff, derived from the completed library and documentation.

## Brand Commitments

- Frame is the preferred visual direction, selected after the fourth prototype
  comparison on 6 November 2026. Its working field treatment is the visual baseline
  for the next Cinder design work.
- Astryx is the leading visual reference, especially field anatomy and validation.
- HeroUI v3 remains a visual and developer-experience reference.
- Carbon informs UX reasoning, accessibility, layout, coverage, and AI-related
  guidance. Its visual identity is not a constraint on the new Cinder proposals.
- Use plain language. Keep Cinder original, maintainable, and easy to customize.

## Accessibility & Inclusion

Accessibility and internationalization are core requirements. Preserve meaningful
labels, instructions, keyboard behavior, focus, error recovery, and adaptable
layouts. A visual resemblance or automated scan alone does not prove accessibility.

## Evidence on Hand

Research reports live in `docs/`. The comparison at `/prototypes` includes working
forms, review data, and nested overlays. Reference captures identify their sources
and versions in `apps/docs/src/prototypes/references/README.md`.

## Implementation Decisions

Frame's visual direction is selected. The specification is in `docs/design-system.md`;
`docs/component-library-plan.md` orders the reusable library work.

The user approved the Phase 1 contract bundle on 6 November 2026: native prebuilt
CSS with one stylesheet import, semantic variables and stable BEM-style hooks;
additive `frame-light` / `frame-dark` themes; Frame controls at 44px by default and
32/44/48px for explicit `sm` / `md` / `lg`; and `Theme appearanceClassName` for
portable appearance on ordinary and detached roots. Preserve existing theme
defaults and APIs. Phase 1 foundations and representative consumer proof are
complete; see [verification](docs/verification.md#frame-phase-1).

The user clarified the delivery order on 6 November 2026: components and Storybook,
then the documentation website, then Figma. Phase 2 starts with a Storybook
workspace and finished Button/Link coverage, followed by the shared Frame field
anatomy and the rest of the fourteen-entry slice. README/API contracts accompany
the components throughout.

Button's recommended Frame variants are `primary`, `secondary`, `ghost`, and
`danger`: a compact emphasis hierarchy informed by Base, HeroUI, and Astryx, as
requested by the user. Existing additional variants remain compatible.

Figma follows the completed web system as the final step.
