# Cinder — design direction

## Current exploration: Frame

**Astryx now leads Cinder's visual exploration**, especially its clear fields,
instructions, and validation. HeroUI v3 remains a visual and developer-experience
reference. Carbon chiefly informs UX reasoning, accessibility, layout, coverage,
and AI-related guidance.

The fourth proposal, **Frame**, is available at
[`/prototypes?variant=frame&view=settings`](http://127.0.0.1:3000/prototypes?variant=frame&view=settings).
It puts guidance above inputs and attaches recovery below them. Cool neutrals,
neutral actions, blue focus/selection, 44px controls, and 10/14/18px corners make
the direction concrete. The cost is more vertical space for persistent guidance
and reserved validation messages.

Frame uses the existing React Aria behavior and shared review flows. Its CSS is
prototype-local; adopting a new reusable theme remains a decision after evaluation.
See the [prototype guide](prototypes-guide.md), [Astryx findings](research-astryx.md),
and the scoped visual rules in [DESIGN.md](../DESIGN.md).

## Implemented library slice: Relay

Relay's first reusable web slice is available at
[`/relay`](http://127.0.0.1:3000/relay): neutral actions, full field borders,
8/12/20px corners, comfortable control sizes, and authored light/dark palettes.
The [Relay specification](relay.md) records the implemented tokens, APIs, states,
and composition rules.

The main website and `/components` catalog retain the Carbon reference identity
described below. Those pages document the baseline rather than imply that all 45
families have completed the Relay treatment.

## Original Carbon reference brief

The remainder records the original homepage and component-catalog brief. Its
palette and typography constraints apply to those baseline surfaces, not to Frame
or future Cinder proposals. [PRODUCT.md](../PRODUCT.md) records the current goals.

Build a reusable React component library that implements Carbon's design rules
using RAC behavior, with a distinctive public website and useful live documentation.
Use Bun for package management, development, builds, and tests. Check current
upstream documentation rather than assuming APIs from older versions.

## Subject inventory

- Carbon's 2x grid and multiples-of-two geometry.
- Four named themes: white, g10, g90, and g100.
- IBM Plex Sans for the interface; IBM Plex Mono for actual code.
- Productive and expressive typography serving different contexts.
- Square controls, generous right-hand button space, and precise alignment.
- Semantic colors whose values change while their roles stay the same.
- Layer tokens that step with nested surfaces.
- Keyboard, touch, pointer, and assistive-technology interaction from RAC.
- A component's anatomy, states, and source shown together.
- Cinder: material formed from carbon, a provisional identity for a new implementation.

## Page argument

1. A familiar design language with a new implementation — prove it with a working component composition.
2. One system across four themes — prove it with a live theme selector.
3. Components ready to compose — prove it with real, keyboard-operable examples.
4. Every decision has a source — show foundations, upstream references, and explicit implementation coverage.
5. Start locally with Bun — give working setup commands and a minimal import example.

## Concept

On this page, **Carbon's four themes and layered component anatomy** become
**a living specimen that moves from expressive brand typography to productive UI**.

The live interaction is a four-theme switcher. It changes the actual components,
including nested layers and overlays. The page remains readable before interaction.

## Copy deck

### Hero

**A considered foundation.**

Carbon's design language. React Aria's accessible interactions. A component system
you can make your own.

Primary action: Explore components.

### Theme specimen

**Four themes. One language.**

Switch the canvas. The relationships stay the same.

### Component collection

**Built to work together.**

From the first input to the final confirmation, familiar patterns share one set of rules.

### Foundations

**Every detail, intentional.**

Spacing, type, color, and motion follow Carbon's foundations, with source references
beside the implementation.

### Start

**Make something considered.**

Run the workspace, explore the source, and compose your first interface.

## Constraints

Use Carbon's palette and typography as the fixed brand foundation. Distinction
comes from editorial composition and the live specimen. Use real library UI as
visual material. Product examples contain clearly identified sample data.

## Verification

Check types, the library build, meaningful interaction tests, and the website in a
real browser at desktop, tablet, and mobile sizes. Maintain a coverage matrix;
do not equate a rendered example with complete Carbon parity or an accessibility audit.
