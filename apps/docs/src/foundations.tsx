import { useEffect } from "react";
import {
  Button,
  CodeSnippet,
  ContentSwitcher,
  Icon,
  Layer,
  Link,
  TextField,
  Theme,
  ToggleButton,
} from "@cinder/react";
import { breakpoints, themeNames, themes } from "@cinder/tokens";
import { PageIntro, SiteFooter, themeLabels, useThemePreference } from "./site";

export default function Foundations() {
  const { theme, setTheme } = useThemePreference();
  useEffect(() => {
    document.title = "Foundations — Cinder";
  }, []);
  const semanticNames = [
    "background",
    "layer-01",
    "layer-02",
    "text-primary",
    "text-secondary",
    "interactive",
    "focus",
    "support-success",
    "support-error",
  ] as const;
  return (
    <>
      <main id="main" className="reading-page page-frame">
        <PageIntro title="The rules behind the work.">
          A shared set of decisions for color, type, space, and movement. Derived from Carbon's
          official token packages.
        </PageIntro>
        <nav className="reading-toc" aria-label="Foundation sections">
          <Link href="#themes">Themes & layers</Link>
          <Link href="#color">Color</Link>
          <Link href="#typography">Typography</Link>
          <Link href="#spacing">Space & grid</Link>
          <Link href="#motion">Motion</Link>
        </nav>
        <section id="themes" className="foundation-detail" aria-labelledby="theme-heading">
          <div>
            <h2 id="theme-heading">
              Four themes.
              <br />
              Three layers.
            </h2>
            <p>
              Theme names describe the canvas. Layer tokens describe the relationship between a
              surface and the next control placed on it.
            </p>
            <p>
              A new Theme resets the layer context. Layer advances it, up to Carbon's third
              contextual level. Menus and dialogs carry the same theme through React portals.
            </p>
            <Link href="https://carbondesignsystem.com/building-blocks/foundations/color/overview/">
              Carbon color guidance <Icon name="external" />
            </Link>
          </div>
          <div className="theme-foundation-demo" data-ui>
            <ContentSwitcher
              aria-label="Foundation theme"
              selectedKeys={[theme]}
              onSelectionChange={(keys) => {
                const next = themeNames.find((name) => keys.has(name));
                if (next) setTheme(next);
              }}
            >
              {themeNames.map((name) => (
                <ToggleButton id={name} key={name}>
                  {themeLabels[name]}
                </ToggleButton>
              ))}
            </ContentSwitcher>
            <Theme theme={theme} className="layer-demo">
              <span>Canvas — {themeLabels[theme]}</span>
              <TextField label="Field on the canvas" placeholder="Layer 01" />
              <Layer>
                <span>First layer</span>
                <TextField label="Field on the first layer" placeholder="Layer 02" />
                <Layer>
                  <span>Second layer</span>
                  <TextField label="Field on the second layer" placeholder="Layer 03" />
                  <Button size="sm">An action</Button>
                </Layer>
              </Layer>
            </Theme>
          </div>
        </section>
        <section id="color" className="foundation-detail" aria-labelledby="color-heading">
          <div>
            <h2 id="color-heading">Roles before values.</h2>
            <p>
              A token says what a color does. The theme supplies its value. Components use semantic
              roles rather than a palette color chosen in isolation.
            </p>
            <CodeSnippet label="Semantic token" language="css">
              {
                ".surface {\n  background: var(--cinder-layer);\n  color: var(--cinder-text-primary);\n}"
              }
            </CodeSnippet>
          </div>
          <div className="token-list" data-ui>
            {semanticNames.map((name) => (
              <div key={name}>
                <span className="token-swatch" style={{ background: themes[theme][name] }} />
                <code>{name}</code>
                <span>{themes[theme][name]}</span>
              </div>
            ))}
          </div>
        </section>
        <section id="typography" className="foundation-detail" aria-labelledby="type-heading">
          <div>
            <h2 id="type-heading">Type with a purpose.</h2>
            <p>
              IBM Plex Sans sets the interface. IBM Plex Mono sets actual code. Productive styles
              prioritize efficient reading; expressive styles give the public site its voice.
            </p>
            <p>
              Labels: 12/16. Productive body: 14/20. Reading text: 16/24. The site uses a larger
              expressive scale for its titles.
            </p>
            <p>
              The tokens package exports complete typeStyles definitions with sparse breakpoint
              overrides. Its scalar CSS variables are base values; applications apply responsive
              changes and fluid interpolation explicitly.
            </p>
            <Link href="https://carbondesignsystem.com/building-blocks/foundations/typography/overview/">
              Carbon typography guidance <Icon name="external" />
            </Link>
          </div>
          <div className="type-scale" data-ui>
            <span className="type-scale-display">Aa Bb Cc</span>
            <span className="type-scale-heading">A clear hierarchy.</span>
            <p>
              Design is in the details. A familiar label, a comfortable line length, the space to
              understand what comes next.
            </p>
            <label>Workspace name</label>
            <code>const considered = true;</code>
          </div>
        </section>
        <section id="spacing" className="foundation-detail" aria-labelledby="spacing-heading">
          <div>
            <h2 id="spacing-heading">Space that adds up.</h2>
            <p>
              Carbon's 2x grid grows from an eight-pixel mini-unit. The spacing scale begins at two
              pixels and supports both dense interfaces and expressive layouts.
            </p>
            <p>
              Four columns on small screens, eight at medium, sixteen at large. Cinder's Grid and
              GridColumn expose these same breakpoints.
            </p>
            <div className="breakpoint-list">
              {Object.entries(breakpoints).map(([name, breakpoint]) => (
                <div key={name}>
                  <span>{name}</span>
                  <code>{breakpoint.width}</code>
                  <span>{breakpoint.columns} columns</span>
                </div>
              ))}
            </div>
          </div>
          <div className="spacing-scale" data-ui>
            {[2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96].map((size, index) => (
              <div key={size}>
                <code>spacing-{String(index + 1).padStart(2, "0")}</code>
                <span style={{ width: `${size * 2}px` }} />
                <span>{size} px</span>
              </div>
            ))}
          </div>
        </section>
        <section id="motion" className="foundation-detail" aria-labelledby="motion-heading">
          <div>
            <h2 id="motion-heading">Movement that explains.</h2>
            <p>
              Short productive transitions keep controls responsive. Expressive movement is reserved
              for the public site's introduction and section entrances.
            </p>
            <p>
              All components honor reduced-motion preferences. Status remains readable when
              animation is removed.
            </p>
          </div>
          <div data-ui>
            <table className="props-table">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Duration</th>
                  <th>Use</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Fast 01</td>
                  <td>70 ms</td>
                  <td>Micro feedback</td>
                </tr>
                <tr>
                  <td>Fast 02</td>
                  <td>110 ms</td>
                  <td>Small transitions</td>
                </tr>
                <tr>
                  <td>Moderate 01</td>
                  <td>150 ms</td>
                  <td>Expansion</td>
                </tr>
                <tr>
                  <td>Moderate 02</td>
                  <td>240 ms</td>
                  <td>Dialogs</td>
                </tr>
                <tr>
                  <td>Slow 01</td>
                  <td>400 ms</td>
                  <td>Large transitions</td>
                </tr>
                <tr>
                  <td>Slow 02</td>
                  <td>700 ms</td>
                  <td>Expressive entrance</td>
                </tr>
              </tbody>
            </table>
            <CodeSnippet label="Productive motion curve" language="css">
              {
                "transition: transform\n  var(--cinder-duration-fast-02)\n  var(--cinder-ease-standard-productive);"
              }
            </CodeSnippet>
          </div>
        </section>
      </main>
      <SiteFooter compact />
    </>
  );
}
