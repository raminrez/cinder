# Cinder Storybook

Private React/Vite component workbench. Run from the repository root:

```sh
bun run storybook             # http://localhost:6006
bun run build:storybook       # dist/storybook
bun run typecheck:storybook   # config, stories, and public declarations
```

Each command first builds `@cinder/tokens` and `@cinder/react` with the existing
package builder. `bun run typecheck` includes the Storybook check. Its TypeScript
configuration clears source aliases, so stories consume the same public `dist`
exports as applications. Config and stories use the repository's strict settings
and `skipLibCheck`; a separate React-only consumer check validates the public
declaration graph with `skipLibCheck: false`. This avoids unrelated Storybook
tooling declaration conflicts with TypeScript 7 and Bun/Vite globals.

During development, Vite watches the package source directories and token
generator. Changes trigger a serialized package rebuild, including declarations,
generated tokens, JS, and CSS. Edits during a build queue another pass. The preview
reloads after the final successful pass; generated outputs cannot trigger a loop.
Rebuild failures appear in the terminal and the next source edit retries. This is
a full preview reload, so local story state resets. Restart after dependency or
build-configuration changes.

The rebuild queue's focused check is
`bun test ./apps/storybook/.storybook/watch-packages.test.ts`; it also runs with
`bun run test`. The normal `bun run check` includes the static Storybook build.

Stories live in `stories/**/*.stories.ts` or `.tsx`, import components from
`@cinder/react`, use `Meta`/`StoryObj` from `@storybook/react-vite`, and use
interaction helpers from `storybook/test`. The preview imports
`@cinder/react/styles.css` once and wraps every story with the public `Theme`.
The standard toolbar selects `frame-light` or `frame-dark` through `globals.theme`.
The Accessibility panel reports axe results, including incomplete checks for
manual review; static builds alone do not execute interaction/accessibility tests.

Development dependencies are pinned to Storybook/React-Vite/a11y **10.6.6** and
Vite **8.3.6**, checked against the npm registry and the
[React/Vite setup](https://storybook.js.org/docs/get-started/frameworks/react-vite).
React and React DOM reuse the workspace catalog; Vite deduplicates both.
The existing full build still produces the packages and documentation website.
