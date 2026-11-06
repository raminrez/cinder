import { useEffect, useState } from "react";
import {
  Button,
  CodeSnippet,
  ContentSwitcher,
  Icon,
  Link,
  SearchField,
  Tag,
  ToggleButton,
} from "@cinder/react";
import { themeNames } from "@cinder/tokens";
import { categories, components } from "./catalog";
import { ComponentExample } from "./examples";
import { themeLabels, useThemePreference } from "./site";

export default function ComponentReference() {
  const slug = window.location.pathname.split("/")[2];
  const entry = components.find((item) => item.slug === slug);
  const [query, setQuery] = useState("");
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const { theme, setTheme } = useThemePreference();
  const filtered = components.filter((item) =>
    `${item.name} ${item.category}`.toLowerCase().includes(query.toLowerCase()),
  );
  useEffect(() => {
    document.title = `${entry?.name ?? "Components"} — Cinder`;
  }, [entry]);
  return (
    <div className="reference-layout">
      <aside
        className={navigationOpen ? "reference-sidebar is-open" : "reference-sidebar"}
        aria-label="Component navigation"
      >
        <Link href="/components" className="sidebar-title">
          The components <span>{components.length}</span>
        </Link>
        <SearchField
          size="sm"
          aria-label="Filter components"
          placeholder="Filter components"
          value={query}
          onChange={setQuery}
        />
        <nav aria-label="Component reference">
          {categories.map((category) => {
            const items = filtered.filter((item) => item.category === category);
            if (!items.length) return null;
            return (
              <div className="sidebar-group" key={category}>
                <h2>{category}</h2>
                {items.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/components/${item.slug}`}
                    aria-current={item.slug === slug ? "page" : undefined}
                  >
                    {item.name}
                    {item.status && <span className="experimental-dot" title="Experimental" />}
                  </Link>
                ))}
              </div>
            );
          })}
          {filtered.length === 0 && <p className="sidebar-empty">No matching components.</p>}
        </nav>
        <Link href="/get-started" className="sidebar-setup">
          Set up your workspace <Icon name="arrowRight" />
        </Link>
      </aside>
      <main id="main" className="reference-main">
        <Button
          className="reference-mobile-toggle"
          size="sm"
          variant="ghost"
          aria-expanded={navigationOpen}
          onPress={() => setNavigationOpen((value) => !value)}
        >
          <Icon name="menu" />
          Component navigation
        </Button>
        {entry ? (
          <>
            <div className="reference-heading">
              <div>
                <div className="reference-breadcrumb">
                  <Link href="/components">Components</Link>
                  <span>/</span>
                  <span>{entry.category}</span>
                </div>
                <h1>{entry.name}</h1>
                <p>{entry.description}</p>
              </div>
              {entry.status && <Tag color="blue">{entry.status}</Tag>}
            </div>
            <section className="live-example" aria-labelledby="live-example-title">
              <div className="example-toolbar">
                <h2 id="live-example-title">Live preview</h2>
                <div className="example-toolbar-actions">
                  <ContentSwitcher
                    size="sm"
                    aria-label="Preview theme"
                    selectedKeys={[theme]}
                    onSelectionChange={(keys) => {
                      const next = themeNames.find((name) => keys.has(name));
                      if (next) setTheme(next);
                    }}
                  >
                    {themeNames.map((name) => (
                      <ToggleButton id={name} key={name} aria-label={themeLabels[name]}>
                        {name === "white" ? "White" : name}
                      </ToggleButton>
                    ))}
                  </ContentSwitcher>
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label="Reset example"
                    onPress={() => setResetKey((value) => value + 1)}
                  >
                    Reset
                  </Button>
                </div>
              </div>
              <div
                className={`example-canvas example-${entry.slug}`}
                key={resetKey}
                onFocusCapture={(event) => {
                  const canvas = event.currentTarget;
                  if (canvas.scrollWidth > canvas.clientWidth && canvas.contains(event.target)) {
                    event.target.scrollIntoView({ block: "nearest", inline: "nearest" });
                  }
                }}
              >
                <ComponentExample slug={entry.slug} />
              </div>
              <div className="example-caption">
                <span>Built with @cinder/react</span>
                <span>Try it with your keyboard</span>
              </div>
            </section>
            <section className="reference-section" aria-labelledby="usage-title">
              <h2 id="usage-title">Usage</h2>
              <CodeSnippet label={`${entry.name} usage`} language="tsx">
                {entry.code}
              </CodeSnippet>
            </section>
            <section
              className="reference-section reference-two-column"
              aria-label="Design and interaction"
            >
              <div>
                <h2>Design anatomy</h2>
                <p>{entry.anatomy}</p>
              </div>
              <div>
                <h2>Keyboard behavior</h2>
                <p>{entry.keyboard}</p>
              </div>
            </section>
            <section className="reference-section" aria-labelledby="props-title">
              <h2 id="props-title">Key props</h2>
              <p className="props-note">
                Cinder's types preserve the underlying RAC contracts. These are the most useful
                entry points; the generated TypeScript declarations contain the full API.
              </p>
              <div className="props-table-scroll">
                <table className="props-table" role="table" aria-labelledby="props-title">
                  <thead>
                    <tr>
                      <th scope="col">Prop</th>
                      <th scope="col">Type</th>
                      <th scope="col">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entry.props.map(([name, type, purpose]) => (
                      <tr key={name}>
                        <th scope="row">
                          <code>{name}</code>
                        </th>
                        <td>
                          <code>{type}</code>
                        </td>
                        <td>{purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <section className="reference-section source-section" aria-labelledby="source-title">
              <h2 id="source-title">Follow the source</h2>
              <p>
                Visual rules from Carbon, interaction behavior from RAC, and Cinder's own API and
                styles.
              </p>
              <div>
                <Link href={entry.carbon}>
                  Carbon guidance <Icon name="external" />
                </Link>
                {entry.rac && (
                  <Link href={entry.rac}>
                    RAC documentation <Icon name="external" />
                  </Link>
                )}
                <Link href="/research">
                  Implementation coverage <Icon name="arrowRight" />
                </Link>
              </div>
            </section>
            <div className="reference-next">
              <Link href="/components">All components</Link>
              {components[components.indexOf(entry) + 1] && (
                <Link href={`/components/${components[components.indexOf(entry) + 1]!.slug}`}>
                  Next: {components[components.indexOf(entry) + 1]!.name} <Icon name="arrowRight" />
                </Link>
              )}
            </div>
          </>
        ) : slug ? (
          <div className="reference-heading">
            <h1>Component not found</h1>
            <p>Choose a component from the reference.</p>
            <Link href="/components">Browse all components</Link>
          </div>
        ) : (
          <>
            <div className="reference-heading catalog-heading">
              <h1>Considered components.</h1>
              <p>
                {components.length} component families. Carbon's visual rules, RAC's interaction
                model, and a consistent API ready to compose.
              </p>
            </div>
            <div className="catalog-intro">
              <CodeSnippet label="Component import" language="tsx">
                {'import { Button, TextField, Theme } from "@cinder/react";'}
              </CodeSnippet>
              <p>
                Every example runs the actual library. Switch themes, use the keyboard, and inspect
                the code.
              </p>
            </div>
            {categories.map((category) => (
              <section className="catalog-section" key={category} aria-label={category}>
                <h2>{category}</h2>
                <div className="catalog-grid">
                  {components
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <Link href={`/components/${item.slug}`} key={item.slug}>
                        <span>
                          <strong>{item.name}</strong>
                          <span>{item.description}</span>
                        </span>
                        <Icon name="arrowRight" />
                      </Link>
                    ))}
                </div>
              </section>
            ))}
          </>
        )}
      </main>
    </div>
  );
}
