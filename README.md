# Cinder

A Carbon-aligned design system built with React Aria Components (RAC) and Bun.

**Working name:** Cinder. The name and package scope are provisional.

## Direction

Carbon supplies the design language: semantic tokens, the 2x grid, IBM Plex,
four themes, component geometry, state treatment, and content guidance. RAC
supplies accessible interaction, focus management, collections, and forms.
Cinder owns the component API, CSS, documentation, examples, and visual identity.

The documentation is also the working prototype: every example uses the library.

## Research

Primary-source findings and the design direction live in `docs/`.
Locally downloaded source material lives in `.research/` and is not shipped.

## Project layout

- `packages/tokens` — Carbon-derived semantic tokens and theme generation.
- `packages/react` — styled RAC components and Carbon patterns.
- `apps/docs` — the Cinder website and interactive component reference.
- `scripts` — Bun-native development, build, and documentation tooling.
- `tests` — behavioral and browser verification.

Implementation status and setup instructions are maintained here as the project develops.
