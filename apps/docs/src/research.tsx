import { useEffect } from "react";
import { Icon, Link, Tag } from "@cinder/react";
import { components } from "./catalog";
import { PageIntro, SiteFooter } from "./site";

export default function Research() {
  useEffect(() => {
    document.title = "Research & coverage — Cinder";
  }, []);
  return (
    <>
      <main id="main" className="reading-page page-frame">
        <PageIntro title="Every decision has a source.">
          Cinder brings Carbon's visual system and RAC's accessible behavior together. The
          implementation, research, and remaining gaps are recorded alongside the code.
        </PageIntro>
        <div className="research-sources">
          <section>
            <h2>Carbon</h2>
            <p>
              The source of semantic colors, themes, layers, spacing, geometry, typography, and
              motion. Cinder generates its values from the official packages and checks component
              rules against the documentation and source.
            </p>
            <dl>
              <div>
                <dt>Themes</dt>
                <dd>11.85.0</dd>
              </div>
              <div>
                <dt>Layout</dt>
                <dd>11.63.0</dd>
              </div>
              <div>
                <dt>Typography</dt>
                <dd>11.71.0</dd>
              </div>
              <div>
                <dt>Motion</dt>
                <dd>11.56.0</dd>
              </div>
            </dl>
            <Link href="https://carbondesignsystem.com/llms.txt">
              Documentation index <Icon name="external" />
            </Link>
          </section>
          <section>
            <h2>RAC</h2>
            <p>
              The interaction foundation. React Aria Components supplies keyboard and pointer
              behavior, focus management, ARIA relationships, internationalization, and form
              validation.
            </p>
            <dl>
              <div>
                <dt>React Aria Components</dt>
                <dd>1.22.1</dd>
              </div>
              <div>
                <dt>React</dt>
                <dd>19.3.1</dd>
              </div>
              <div>
                <dt>Internationalized Date</dt>
                <dd>3.12.4</dd>
              </div>
            </dl>
            <Link href="https://react-aria.adobe.com/llms.txt">
              Documentation index <Icon name="external" />
            </Link>
          </section>
          <section>
            <h2>Bun</h2>
            <p>
              The workspace runtime, package manager, development server, test runner, and
              production bundler. The project uses native HTML entry points, isolated installs, and
              shared dependency catalogs.
            </p>
            <dl>
              <div>
                <dt>Bun</dt>
                <dd>1.4.4</dd>
              </div>
              <div>
                <dt>TypeScript</dt>
                <dd>7.0.2</dd>
              </div>
              <div>
                <dt>Workspace linker</dt>
                <dd>Isolated</dd>
              </div>
            </dl>
            <Link href="https://bun.com/llms.txt">
              Documentation index <Icon name="external" />
            </Link>
          </section>
        </div>
        <section className="research-coverage" aria-labelledby="coverage-heading">
          <h2 id="coverage-heading">Implementation coverage.</h2>
          <p>
            {components.length} documented component families have working examples. Most are built
            on RAC; presentational content and simple navigation structure use semantic HTML. This
            is an independent implementation with an initial API, rather than a drop-in replacement
            for Carbon React.
          </p>
          <div className="coverage-facts" data-ui>
            <div>
              <h3>Implemented</h3>
              <ul>
                <li>Four themes and contextual layers</li>
                <li>Core inputs, selection, collections, and overlays</li>
                <li>Validation, sorting, filtering, pagination, and file selection</li>
                <li>Theme-aware portalled menus and dialogs</li>
                <li>Responsive reference and working examples</li>
              </ul>
            </div>
            <div>
              <h3>Explicit limitations</h3>
              <ul>
                <li>RAC toast remains experimental</li>
                <li>Full Carbon React API compatibility is not claimed</li>
                <li>AI label and toggletip are not implemented</li>
                <li>Advanced charts and domain experiences are separate systems</li>
                <li>Selectable tiles, advanced table tools, and shell panels are incomplete</li>
                <li>Manual screen-reader and cross-browser audits remain outstanding</li>
              </ul>
            </div>
          </div>
          <h3>RAC adaptations.</h3>
          <p>
            Switch toggles with Space. ContentSwitcher uses radio-group semantics; Tabs supplies
            tab-to-panel relationships. Table, GridList, and TagGroup use grid navigation, while
            Tree uses a treegrid. Dates use locale-aware segments. Dialog popovers move and contain
            focus by default. NativeSelect is available when the native select model is required.
            Each reference page describes its keyboard contract.
          </p>
          <div className="coverage-links">
            {components.map((item) => (
              <Link key={item.slug} href={`/components/${item.slug}`}>
                <span>{item.name}</span>
                <Tag color={item.status ? "blue" : "gray"}>{item.status ?? "Live example"}</Tag>
              </Link>
            ))}
          </div>
        </section>
        <section className="research-notes" aria-labelledby="notes-heading">
          <h2 id="notes-heading">Research lives with the work.</h2>
          <p>
            The <code>docs/</code> directory contains the Bun, Carbon, and RAC findings, a design
            direction, implementation plan, coverage matrix, and verification notes. Downloaded
            source material is stored in the ignored <code>.research/</code> directory. Reports
            distinguish pages read from pages only archived.
          </p>
          <p>
            The user-provided Carbon and Carbon MCP source repositories are read-only references.
            Component examples contain labeled sample data; local actions demonstrate behavior
            without sending data to a service.
          </p>
          <h3>Attribution</h3>
          <p>
            Carbon Design System is an IBM project. React Aria is an Adobe project. Carbon-derived
            tokens and source references retain Apache-2.0 attribution. IBM Plex is distributed
            under the SIL Open Font License. Cinder is a working name for this independent library.
          </p>
          <p>
            The production build includes{" "}
            <Link href="/NOTICE.txt" inline>
              project attribution
            </Link>{" "}
            and the complete{" "}
            <Link href="/THIRD_PARTY_LICENSES.txt" inline>
              dependency and font licenses
            </Link>
            .
          </p>
        </section>
      </main>
      <SiteFooter compact />
    </>
  );
}
