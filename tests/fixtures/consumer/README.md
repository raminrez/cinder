# Installed-package consumers

`scripts/verify-package.ts` copies these fixtures into two isolated temporary
directories and installs the packed tarballs. Neither consumer uses repository
aliases or symlinked Cinder workspaces. Both typecheck with `strict: true` and
`skipLibCheck: false`.

- `index.html` / `main.tsx`: the existing Carbon and Relay consumer.
- `frame.html`: Frame with one prebuilt library stylesheet import.
- `tailwind.html`: the same Frame component with Tailwind CSS and its CLI pinned
  to **4.3.5**, installed only in this second consumer's generated devDependencies.
  The CLI compiles `tailwind.css`; the entrypoint imports that generated CSS instead
  of importing the library stylesheet again.
- `brand.module.css`: a real Bun CSS Module, alongside the plain-CSS recipe in
  `frame.css`.

Build and verify the package consumers:

```sh
bun run build
bun scripts/pack.ts
bun run test:package
```

For rendered review, retain the apps after a successful verification:

```sh
CINDER_KEEP_TEST_APP=1 bun run test:package
```

This test-harness option runs every assertion and prints both temporary directories
and the built-output directory. Serve that output directory with a static server;
it contains `index.html`, `frame.html`, and `tailwind.html` plus their bundled assets.
The Frame page includes light/dark and locale controls, two sibling brand recipes,
and inheritance/replacement/clearing controls for the plain-CSS dialog's appearance.
Its links exercise native pointer/Enter navigation and disabled-link tab skipping
in both Frame themes and both integrations.
Its seven Frame Button treatments are imported from the installed package and
checked for distinct appearance and the ordinary 44px minimum in both themes.
Its custom field reserves a feedback row so validation recovery does not move the
submit action during a pointer click. The unrelated host buttons own their minimum
target size; Cinder supplies neither their appearance nor size variables.

Successful runs clean up by default. Failed runs always retain both directories for
diagnosis. Remove retained directories after review.
