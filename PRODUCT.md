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
- Editable Figma assets are a later phase.

## Brand Commitments

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

## Open Decisions

The fourth prototype is an evaluation of field clarity, not an adopted library API
or final brand. Styling-engine changes, complete component coverage, and the Figma
handoff remain separate decisions.
