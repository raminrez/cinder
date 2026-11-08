Focus on bringing new components for Cinder component library Phase 2 Batch 4 (Select and Overlays), resolving the failing play test in `Select.stories.tsx`, addressing React Aria Components (RAC) documentation access, and completing the batch while leaving Storybook RTL styling investigation to the primary agent.

Working directory: /Users/ramin/Documents/Projects/Personal/cinder
Integrity mode: development

## Requirements

### R1. Fix failing Select story play test

Resolve the `Unable to find role="option" and name /Disaster recovery/` error in `Select.stories.tsx` so that `rich-options-and-sections` and all 6 Select stories pass play tests and accessibility checks in both `frame-light` and `frame-dark` themes.

### R2. Verify Phase 2 Batch 4 component and overlay stories

Ensure all Batch 4 components (`Select`, `Modal`, `Popover`, `Tooltip`) with Frame styling and Storybook stories pass all play tests and accessibility checks in both `frame-light` and `frame-dark` themes.

### R3. Provide guidance on RAC official documentation access

Confirm access to official React Aria Components (RAC) documentation and provide references/tools for consulting upstream RAC specifications during component implementation.

### R4. Scope boundary: Storybook RTL styling

Do not modify or refactor Storybook RTL styling; RTL styling investigation and adjustments are handled outside this task.

## Acceptance Criteria

### Select & Overlays Verification

- [ ] `Select.stories.tsx` `rich-options-and-sections` story passes its play test in both `frame-light` and `frame-dark` themes.
- [ ] All stories in `Select.stories.tsx`, `Modal.stories.tsx`, `Popover.stories.tsx`, and `Tooltip.stories.tsx` pass their play tests and accessibility checks in both `frame-light` and `frame-dark` themes.
- [ ] The repository's standard Storybook play test suite runs with zero failures across Batch 4 stories.

### RAC Documentation Guidance

- [ ] Direct references and documentation access methods for official React Aria Components (RAC) are documented.

### Boundary Enforcement

- [ ] No changes are made to Storybook RTL theme/locale styling configuration.

## Verification Resources

- Storybook play test suite in `apps/storybook` executed via standard project test runner.
