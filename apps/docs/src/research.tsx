import { useEffect } from "react";
import { Icon, Link, Tag } from "@cinder/react";
import { components } from "./catalog";
import { PageIntro, SiteFooter } from "./site";
import astryxReport from "../../../docs/research-astryx.md" with { type: "file" };
import herouiReport from "../../../docs/research-heroui.md" with { type: "file" };
import directionReport from "../../../docs/research-cinder-direction.md" with { type: "file" };

export default function Research() {
  useEffect(() => {
    document.title = "Research & coverage — Cinder";
  }, []);
  return (
    <>
      <main id="main" className="reading-page page-frame">
        <PageIntro title="Every decision has a source.">
          Frame is the preferred visual direction, led by Astryx alongside HeroUI v3. Carbon informs UX,
          accessibility, layout, and coverage. React Aria Components supplies the interaction
          foundation. The findings and their limits live with the code.
        </PageIntro>
        <div className="research-sources">
          <section aria-labelledby="astryx-heading">
            <h2 id="astryx-heading">Astryx</h2>
            <p>
              Frame draws on its field anatomy: guidance before the input, attached recovery, and
              distinct focus. Source research also covers theme ownership, API exceptions, and
              localization gaps.
            </p>
            <dl>
              <div>
                <dt>Inspected core</dt>
                <dd>0.7.10</dd>
              </div>
              <div>
                <dt>Captured public docs</dt>
                <dd>0.7.9</dd>
              </div>
              <div>
                <dt>Research date</dt>
                <dd>6 November 2026</dd>
              </div>
            </dl>
            <p>
              <Link href={astryxReport} download="research-astryx.md">
                Astryx findings (Markdown)
              </Link>
            </p>
            <Link href="https://astryx.atmeta.com/components/Field">
              Field documentation <Icon name="external" />
            </Link>
          </section>
          <section aria-labelledby="heroui-heading">
            <h2 id="heroui-heading">HeroUI v3</h2>
            <p>
              A reference for softer controls, composition, and customization. The comparison uses
              real HeroUI components in shared tasks. The report distinguishes its React Aria
              behavior from its Tailwind-based styling setup.
            </p>
            <dl>
              <div>
                <dt>React and Styles</dt>
                <dd>3.2.7</dd>
              </div>
              <div>
                <dt>Compared tasks</dt>
                <dd>Forms, tables, dialogs</dd>
              </div>
              <div>
                <dt>Research date</dt>
                <dd>6 November 2026</dd>
              </div>
            </dl>
            <p>
              <Link href={herouiReport} download="research-heroui.md">
                HeroUI findings (Markdown)
              </Link>
            </p>
            <Link href="https://heroui.com/en/docs/react/components/text-field">
              TextField documentation <Icon name="external" />
            </Link>
          </section>
          <section>
            <h2>Carbon</h2>
            <p>
              The original baseline's tokens, typography, and geometry come from Carbon. Its
              guidance continues to inform UX, accessibility, layout, component coverage, and AI
              patterns as Cinder explores its own visual identity.
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
                <li>Four Carbon baseline themes, Relay, and contextual layers</li>
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
            The <code>docs/</code> directory contains Astryx, HeroUI, Carbon, RAC, and Bun findings,
            design decisions, coverage, and verification notes. Reports distinguish source
            inspection, executed checks, and public-documentation captures. Downloaded material is
            stored in the ignored <code>.research/</code> directory.
          </p>
          <p>
            <Link href={directionReport} download="research-cinder-direction.md" inline>
              Download the architecture comparison (Markdown)
            </Link>
            . It records the earlier assessment of Base design documentation, Base Web, HeroUI, and
            Cinder; the Astryx report adds the current field and theme findings. Frame is a prototype;
            the reusable Relay slice is available in its <Link href="/relay" inline>component gallery</Link>.
          </p>
          <p>
            The upstream checkouts are read-only references. Component examples contain labeled
            sample data; local actions demonstrate behavior without sending data to a service.
          </p>
          <h3>Attribution</h3>
          <p>
            Astryx is a Meta project; its inspected core declares MIT. HeroUI is a NextUI Inc.
            project; its inspected v3.2.7 React and Styles packages declare Apache-2.0. Carbon Design
            System is an IBM project, and React Aria is an Adobe project.
            Carbon-derived tokens and source references retain Apache-2.0 attribution. IBM Plex is
            distributed under the SIL Open Font License. Cinder is a working name for this
            independent library.
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
