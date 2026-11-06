import { useEffect } from "react";
import { CodeSnippet, Icon, Link } from "@cinder/react";
import { PageIntro, SiteFooter } from "./site";

export default function GetStarted() {
  useEffect(() => {
    document.title = "Get started — Cinder";
  }, []);
  return (
    <>
      <main id="main" className="reading-page page-frame">
        <PageIntro title="A good place to start.">
          Run the workspace, explore the source, and compose your first interface with Cinder.
        </PageIntro>
        <div className="guide-layout">
          <aside>
            <nav aria-label="Setup sections">
              <Link href="#workspace">Run the workspace</Link>
              <Link href="#compose">Compose an interface</Link>
              <Link href="#packages">Use the packages</Link>
              <Link href="#verify">Build & verify</Link>
            </nav>
            <p>
              Bun 1.4.4
              <br />
              React 19.3.1
              <br />
              RAC 1.22.1
            </p>
          </aside>
          <div className="guide-content">
            <section id="workspace">
              <h2>Run the workspace.</h2>
              <p>
                From the Cinder directory, install the pinned workspace dependencies and start the
                native Bun development server.
              </p>
              <CodeSnippet label="Start the workspace" language="sh">
                {"bun install --frozen-lockfile\nbun dev"}
              </CodeSnippet>
              <p>
                Open{" "}
                <Link href="http://localhost:3000" inline>
                  localhost:3000
                </Link>
                . Bun bundles the HTML entry, React, TypeScript, CSS, and local IBM Plex fonts.
                React HMR updates the page while you work.
              </p>
              <p>
                The repo's <code>.bun-version</code>, package manager field, and project-local Bun
                dependency all pin 1.4.4. Your system Bun can launch the workspace.
              </p>
            </section>
            <section id="compose">
              <h2>Compose an interface.</h2>
              <p>
                Import the stylesheet once, choose a theme, and use the components. Visible labels
                and descriptive actions make the intent clear.
              </p>
              <CodeSnippet label="Complete interface example" language="tsx">
                {
                  'import { Button, Form, TextField, Theme } from "@cinder/react";\nimport "@cinder/react/styles.css";\n\nexport function Profile() {\n  return (\n    <Theme theme="g10" locale="en-US">\n      <Form onSubmit={(event) => {\n        event.preventDefault();\n        const data = new FormData(event.currentTarget);\n        console.log(data.get("email"));\n      }}>\n        <TextField name="email" label="Email"\n          type="email" isRequired />\n        <Button type="submit">Save profile</Button>\n      </Form>\n    </Theme>\n  );\n}'
                }
              </CodeSnippet>
              <p>
                Use <code>onPress</code> for actions, <code>onChange</code> for field values, and
                RAC's render props for state-aware customization. The wrappers preserve refs and the
                underlying RAC types.
              </p>
              <Link href="/components/form">
                Try the complete form <Icon name="arrowRight" />
              </Link>
            </section>
            <section id="packages">
              <h2>Use the packages.</h2>
              <p>
                <code>@cinder/react</code> and <code>@cinder/tokens</code> are local packages. Build
                and pack them in Cinder, then install both archives together in your React
                application. Packing resolves workspace and catalog references to concrete versions.
              </p>
              <CodeSnippet label="Pack and install the packages" language="sh">
                {
                  "bun run pack\n\n# In another React application:\nbun add /absolute/path/to/cinder/dist/packages/cinder-react-0.1.0.tgz \\\n  /absolute/path/to/cinder/dist/packages/cinder-tokens-0.1.0.tgz \\\n  react@19.3.1 react-dom@19.3.1 react-aria-components@1.22.1"
                }
              </CodeSnippet>
              <p>
                The React package ships ESM, TypeScript declarations, and a single stylesheet that
                includes the tokens. React and RAC stay external peer dependencies. Token CSS and
                JSON are also available separately.
              </p>
              <p>
                Load IBM Plex in your application. The documentation uses locally bundled Fontsource
                files; the component CSS supplies a fallback font stack.
              </p>
              <CodeSnippet label="Install IBM Plex" language="sh">
                {"bun add @fontsource/ibm-plex-sans@5.3.0 @fontsource/ibm-plex-mono@5.3.0"}
              </CodeSnippet>
              <CodeSnippet label="Load IBM Plex fonts" language="tsx">
                {
                  'import "@fontsource/ibm-plex-sans/latin-400.css";\nimport "@fontsource/ibm-plex-sans/latin-500.css";\nimport "@fontsource/ibm-plex-sans/latin-600.css";\nimport "@fontsource/ibm-plex-mono/latin-400.css";'
                }
              </CodeSnippet>
              <p>
                If your bundler does not provide CSS import types, add{" "}
                <code>{'declare module "*.css";'}</code> to an included <code>env.d.ts</code>. For
                JSON token imports, enable <code>resolveJsonModule</code> in TypeScript.
              </p>
            </section>
            <section id="verify">
              <h2>Build & verify.</h2>
              <p>
                The build regenerates Carbon-derived tokens, bundles both libraries, emits their
                declarations, and creates the production site.
              </p>
              <CodeSnippet label="Verification commands" language="sh">
                {"bun run check\n\n# Serve the built site:\nbun start"}
              </CodeSnippet>
              <p>
                The check runs formatting, Oxlint, types, unit and browser tests, and an isolated
                tarball consumer. Run <code>bun run lint</code> for linting alone or{" "}
                <code>bun run lint:fix</code> to apply safe automatic fixes. Browser checks use
                Playwright and installed Google Chrome, including keyboard interactions and
                automated accessibility checks. Install Chrome with{" "}
                <code>bunx playwright install chrome</code> if needed. The consumer verifies the
                distributed declarations, CSS, fonts, and interactions outside this workspace.
              </p>
              <Link href="/research">
                Read the implementation notes <Icon name="arrowRight" />
              </Link>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter compact />
    </>
  );
}
