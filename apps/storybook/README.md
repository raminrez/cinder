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
Vite observes built files to invalidate resolver caches and defers their HMR to
that final reload. Rebuild failures appear in the terminal and the next source
edit retries. This is a full preview reload, so local story state resets. Restart
after dependency or build-configuration changes.

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

The first action batch contains 12 Button and 9 Link stories. Button recommends
four core choices (`primary`, `secondary`, `ghost`, `danger`); all seven variants
remain supported, with `tertiary`, `danger-tertiary`, and `danger-ghost` in the
compatibility story. Both families include Persian and Arabic examples through
real `Theme locale` scopes. Existing action evidence remains in the
[verification record](../../docs/verification.md), separate from this batch's
authored field/form coverage.

## Field/form batch

| Story file                                                   | Authored coverage                                                                                                                                                                                                   |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`TextField.stories.tsx`](stories/TextField.stories.tsx)     | Convenience and compound composition, native refs/events/render callbacks, controlled/default values, sizes, read-only copying, validation, long content, and real locale scopes                                    |
| [`TextArea.stories.tsx`](stories/TextArea.stories.tsx)       | Native multiline editing and rows, textarea refs, controlled/default values, read-only copying, rich recovery, long content, and locale scopes                                                                      |
| [`SearchField.stories.tsx`](stories/SearchField.stories.tsx) | Grouped Input/ClearButton anatomy, query submission, clear/Escape focus, native FormData, sizes, values, recovery, and locale scopes                                                                                |
| [`NumberField.stories.tsx`](stories/NumberField.stories.tsx) | Grouped Input/Button anatomy, decrement/increment slots, bounds and steps, committed values, localized formatting, raw numeric FormData, sizes, and recovery                                                        |
| [`Form.stories.tsx`](stories/Form.stories.tsx)               | Native first-invalid focus, persistent guidance, application-owned pending/failure/retry, duplicate-submission protection, returned `validationErrors`, long recovery, and localized required/pending/error wording |

The callable field APIs remain shorthand over additive compound parts. `.Root`
retains RAC's original props and whole-tree children, including state render
functions; the [package guide](../../packages/react/README.md#additive-compound-namespaces)
maps the exported parts, native/RAC refs, and slots. Native Input slots remain
string-only; roots accept `null`. Existing raw replacement children and SearchField
`inputProps.className` complete overrides remain supported. Convenience Select and
ComboBox children still supply options; their `.Root`s own the whole RAC tree.

Frame defaults follow label → persistent guidance → control → recovery. The
library reserves a bounded one-line recovery minimum; `forms.css` applies **58px**
required-field Help minimums and **78px** at or below a `24rem` container, at a 16px
root. Long messages grow beyond those minimums instead of clipping; optional fields
are not given blanket invalid styling. The six Carbon/Relay theme defaults remain
unchanged. Grouped, collection, and date compounds were added for shared anatomy
and API compatibility, not completed later-family Frame review. Form and raw RAC
exports keep upstream validation ownership.

Run `bun test --timeout 60000 tests/browser/storybook.test.ts` after the static build
to execute the indexed stories in both Frame themes and require successful play
and a11y reporting. This README lists authored coverage, not new acceptance counts
or passing results; rendered, package, browser, and manual evidence is recorded
separately in the verification record.

Development dependencies are pinned to Storybook/React-Vite/a11y **10.6.6** and
Vite **8.3.6**, checked against the npm registry and the
[React/Vite setup](https://storybook.js.org/docs/get-started/frameworks/react-vite).
React and React DOM reuse the workspace catalog; Vite deduplicates both.
The existing full build still produces the packages and documentation website.
