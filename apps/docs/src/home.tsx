import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Checkbox,
  CodeSnippet,
  ContentSwitcher,
  Form,
  Icon,
  InlineNotification,
  Layer,
  Link,
  ListBoxItem,
  NumberField,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Tag,
  TextField,
  ToggleButton,
  useToast,
  type ControlSize,
} from "@cinder/react";
import { referenceThemeNames as themeNames } from "./site";
import { components } from "./catalog";
import { WorkspaceTable } from "./workbench";
import { SiteFooter, themeLabels, useThemePreference } from "./site";
import { useHomeMotion } from "./motion";

function ThemeSwatches() {
  return (
    <span className="hero-theme-strip" data-ui aria-hidden="true">
      <span data-cinder-theme="white">Aa</span>
      <span data-cinder-theme="g10">Aa</span>
      <span data-cinder-theme="g90">Aa</span>
      <span data-cinder-theme="g100">Aa</span>
    </span>
  );
}

function WorkspaceSpecimen() {
  const { theme, setTheme } = useThemePreference();
  const [size, setSize] = useState<ControlSize>("md");
  const [helper, setHelper] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [name, setName] = useState("Cinder studio");
  const [seats, setSeats] = useState(8);
  const [saved, setSaved] = useState(false);
  const toast = useToast();
  return (
    <div className="live-workbench" data-ui>
      <div className="workbench-top">
        <span>
          <Icon name="folder" /> Workspace / Settings
        </span>
        <Tag color="gray">Interactive example</Tag>
      </div>
      <div className="workbench-body">
        <Layer className="workbench-sheet">
          <div className="workbench-sheet-heading">
            <h3>A place to begin.</h3>
            <p>Give your next idea a workspace.</p>
          </div>
          <Form
            className="workspace-form"
            onSubmit={(event) => {
              event.preventDefault();
              setSaved(true);
              toast.add({ title: "Workspace saved locally", description: name, kind: "success" });
            }}
          >
            <TextField
              label="Workspace name"
              name="name"
              value={name}
              onChange={(value) => {
                setName(value);
                setSaved(false);
              }}
              isRequired
              isDisabled={disabled}
              size={size}
              description={helper ? "Use a name your team will recognize." : undefined}
            />
            <div className="workbench-form-row">
              <Select label="Environment" defaultValue="preview" size={size} isDisabled={disabled}>
                <ListBoxItem id="development">Development</ListBoxItem>
                <ListBoxItem id="preview">Preview</ListBoxItem>
                <ListBoxItem id="production">Production</ListBoxItem>
              </Select>
              <NumberField
                label="Team seats"
                value={seats}
                onChange={setSeats}
                minValue={1}
                maxValue={50}
                size={size}
                isDisabled={disabled}
              />
            </div>
            <RadioGroup
              label="Visibility"
              defaultValue="team"
              orientation="horizontal"
              isDisabled={disabled}
            >
              <Radio value="private">Private</Radio>
              <Radio value="team">Team</Radio>
            </RadioGroup>
            <Checkbox defaultSelected isDisabled={disabled}>
              Send a weekly summary
            </Checkbox>
            <div className="workbench-form-actions">
              <Button type="submit" size={size} isDisabled={disabled}>
                Save workspace <Icon name="arrowRight" />
              </Button>
              <span role="status">{saved ? "Saved in this preview" : "Local preview only"}</span>
            </div>
          </Form>
        </Layer>
        <aside className="workbench-controls" aria-label="Preview controls">
          <h3>Change the canvas.</h3>
          <p>Same components. Different context.</p>
          <div className="preview-control">
            <span id="canvas-theme-label">Theme</span>
            <ContentSwitcher
              aria-labelledby="canvas-theme-label"
              selectedKeys={[theme]}
              onSelectionChange={(keys) => {
                const value = [...keys][0];
                const match = themeNames.find((name) => name === value);
                if (match) setTheme(match);
              }}
              size="sm"
            >
              {themeNames.map((name) => (
                <ToggleButton key={name} id={name} aria-label={themeLabels[name]}>
                  {name === "white" ? "White" : name}
                </ToggleButton>
              ))}
            </ContentSwitcher>
          </div>
          <div className="preview-control">
            <span id="control-size-label">Control size</span>
            <ContentSwitcher
              aria-labelledby="control-size-label"
              selectedKeys={[size]}
              onSelectionChange={(keys) => {
                const value = [...keys][0];
                if (value === "sm" || value === "md" || value === "lg") setSize(value);
              }}
              size="sm"
            >
              <ToggleButton id="sm">Small</ToggleButton>
              <ToggleButton id="md">Medium</ToggleButton>
              <ToggleButton id="lg">Large</ToggleButton>
            </ContentSwitcher>
          </div>
          <Switch isSelected={helper} onChange={setHelper}>
            Helper text
          </Switch>
          <Switch isSelected={disabled} onChange={setDisabled}>
            Disabled state
          </Switch>
          <div className="canvas-token">
            <span>Canvas token</span>
            <code>--cinder-background</code>
            <span className={`canvas-token-value theme-dot-${theme}`}>{themeLabels[theme]}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onPress={() => {
              setTheme("g10");
              setSize("md");
              setHelper(true);
              setDisabled(false);
              setName("Cinder studio");
              setSeats(8);
              setSaved(false);
            }}
          >
            Reset preview <Icon name="chevronRight" />
          </Button>
        </aside>
      </div>
    </div>
  );
}

export default function Home() {
  useHomeMotion();
  return (
    <>
      <main id="main" className="home-page">
        <section className="hero page-frame" aria-labelledby="hero-title">
          <h1 id="hero-title">
            <span className="hero-line" data-reveal>
              A considered
            </span>
            <span className="hero-line hero-last-line" data-reveal>
              <ThemeSwatches />
              <span>foundation.</span>
            </span>
          </h1>
          <div className="hero-description">
            <p data-reveal>
              Carbon's design language.
              <br />
              React Aria's accessible interactions.
              <br />A component system you can make your own.
            </p>
            <div className="hero-action" data-reveal>
              <Link href="/components/button" className="site-primary-link">
                Explore components <Icon name="arrowRight" size={20} />
              </Link>
              <span>Built with RAC. Powered by Bun.</span>
            </div>
          </div>
        </section>

        <section id="themes" className="specimen-section page-frame" aria-labelledby="themes-title">
          <div className="section-intro">
            <h2 id="themes-title" data-reveal>
              Four themes.
              <br />
              One language.
            </h2>
            <p data-reveal>
              Switch the canvas.
              <br />
              The relationships stay the same.
            </p>
          </div>
          <div className="specimen-reveal" data-reveal>
            <WorkspaceSpecimen />
          </div>
          <div className="specimen-caption" data-reveal>
            <p>Real components. Keyboard, pointer, and touch.</p>
            <Link href="/foundations#themes">
              Understand the theme model <Icon name="arrowRight" />
            </Link>
          </div>
        </section>

        <section className="components-section page-frame" aria-labelledby="components-title">
          <div className="collection-intro">
            <div data-reveal>
              <p>
                {components.length} component families.
                <br />
                One composable system.
              </p>
              <Link href="/components">
                Browse the collection <Icon name="arrowRight" />
              </Link>
            </div>
            <h2 id="components-title" data-reveal>
              Built to
              <br />
              work together.
            </h2>
          </div>
          <article className="feature-row">
            <div className="feature-word" aria-hidden="true" data-reveal>
              Input
            </div>
            <div className="feature-copy" data-reveal>
              <h3>Ask with clarity.</h3>
              <p>Visible labels, connected help, and validation that keeps people moving.</p>
              <Link href="/components/text-input">
                Explore inputs <Icon name="arrowRight" />
              </Link>
            </div>
            <Layer className="feature-specimen form-fragment" data-ui data-reveal>
              <TextField
                label="Project name"
                defaultValue="Something considered"
                description="Every good interface starts somewhere."
              />
              <Select label="Framework" defaultValue="react">
                <ListBoxItem id="react">React</ListBoxItem>
                <ListBoxItem id="next">Next.js</ListBoxItem>
                <ListBoxItem id="astro">Astro</ListBoxItem>
              </Select>
              <Checkbox defaultSelected>Start with the foundations</Checkbox>
            </Layer>
          </article>
          <article className="feature-row feature-row-data">
            <div className="feature-word" aria-hidden="true" data-reveal>
              Organize
            </div>
            <div className="feature-copy" data-reveal>
              <h3>Give data direction.</h3>
              <p>Collections that sort, select, and respond. A steady rhythm for complex work.</p>
              <Link href="/components/data-table">
                Explore collections <Icon name="arrowRight" />
              </Link>
            </div>
            <div className="feature-specimen table-fragment" data-ui data-reveal>
              <WorkspaceTable compact />
            </div>
          </article>
          <article className="feature-row">
            <div className="feature-word" aria-hidden="true" data-reveal>
              Respond
            </div>
            <div className="feature-copy" data-reveal>
              <h3>Keep the context.</h3>
              <p>Useful feedback. Focus that returns. The next action, exactly where it belongs.</p>
              <Link href="/components/notification">
                Explore feedback <Icon name="arrowRight" />
              </Link>
            </div>
            <Layer className="feature-specimen feedback-fragment" data-ui data-reveal>
              <InlineNotification kind="success" title="A shared language">
                Your components follow the same rules.
              </InlineNotification>
              <Accordion>
                <AccordionItem title="Look a little closer" id="details">
                  This is the same library used throughout the documentation. Try it with your
                  keyboard.
                </AccordionItem>
              </Accordion>
            </Layer>
          </article>
        </section>

        <section className="foundations-section page-frame" aria-labelledby="foundations-title">
          <div className="foundation-facts" data-reveal>
            <dl>
              <div>
                <dt>Design language</dt>
                <dd>Carbon</dd>
              </div>
              <div>
                <dt>Interaction foundation</dt>
                <dd>RAC</dd>
              </div>
              <div>
                <dt>Runtime & tooling</dt>
                <dd>Bun</dd>
              </div>
            </dl>
            <Link href="/research">
              Go to the sources <Icon name="arrowRight" />
            </Link>
          </div>
          <div className="foundation-story">
            <h2 id="foundations-title" data-reveal>
              Every detail,
              <br />
              intentional.
            </h2>
            <p data-reveal>
              Not a collection of isolated controls. A system of relationships—between type and
              space, foreground and surface, an action and its response.
            </p>
            <div className="foundation-bottom" data-reveal>
              <div className="type-specimen" data-ui>
                <span className="type-specimen-letters">Aa</span>
                <span>
                  IBM Plex Sans
                  <br />
                  Made for the interface.
                </span>
              </div>
              <div>
                <p>
                  Carbon provides the rules. RAC provides the behavior. Cinder brings them together
                  in an independent implementation.
                </p>
                <Link href="/foundations">
                  Explore the foundations <Icon name="arrowRight" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="setup-section page-frame" aria-labelledby="setup-title">
          <div className="setup-aside" data-reveal>
            <span className="setup-word">Begin.</span>
            <p>
              A small workspace.
              <br />A considered starting point.
            </p>
          </div>
          <div className="setup-column">
            <h2 id="setup-title" data-reveal>
              From source
              <br />
              to something yours.
            </h2>
            <p data-reveal>
              <strong>Start locally.</strong> Inside the Cinder workspace, install the pinned
              dependencies and start Bun's native development server.
            </p>
            <div data-reveal>
              <CodeSnippet label="Workspace setup" language="sh">
                {"bun install --frozen-lockfile\nbun dev"}
              </CodeSnippet>
            </div>
            <p data-reveal>
              <strong>Compose deliberately.</strong> Choose a theme. Add a component. Keep
              accessible interaction and visual consistency from the first line.
            </p>
            <div data-reveal>
              <CodeSnippet label="First component" language="tsx">
                {
                  'import {\n  Button, Theme\n} from "@cinder/react";\nimport "@cinder/react/styles.css";\n\n<Theme theme="g10">\n  <Button onPress={save}>\n    Make it yours\n  </Button>\n</Theme>'
                }
              </CodeSnippet>
            </div>
            <Link href="/get-started" className="setup-guide-link" data-reveal>
              Read the complete setup guide <Icon name="arrowRight" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
