import { useState } from "react";
import { Button, Icon, Switch } from "@cinder/react";
import { directions, directionOrder, type Direction } from "./data";
import { referenceImages } from "./references";

type Example = "form" | "queue" | "dialog";
type Observation = { choice: string; reason: string; tradeoff: string };

const examples: Record<
  Example,
  {
    label: string;
    title: string;
    question: string;
    lesson: string;
    relation: string;
    candidates: Record<Direction, Observation>;
    carbon: string;
    heroui: string;
  }
> = {
  form: {
    label: "Fill in a form",
    title: "Set the reply-to email",
    question:
      "Compare the fields and Save button. Then show an invalid email and look for the instructions.",
    lesson:
      "All three Cinder forms use the same field order and validation behavior. Field and Index both use 40px controls here. Relay uses 48px controls. The form comparison is mostly about shape, emphasis, and space.",
    relation:
      "Field keeps a structured form with modest rounding. Index is closer to Carbon’s square geometry, but uses full field outlines. Relay is softer, like HeroUI, yet its 48px button is larger than HeroUI’s 36px desktop default.",
    candidates: {
      field: {
        choice: "The fields and button are 40px high, with 4px corners and a green primary action.",
        reason: "This gives a product with both forms and tables a familiar middle ground.",
        tradeoff:
          "The quiet styling gives instructions more work to do. Important choices need clear labels.",
      },
      relay: {
        choice:
          "The fields and button are 48px high, with 8px corners and a strong neutral action.",
        reason: "This gives each entry and the next action more room and emphasis.",
        tradeoff: "Longer forms take more vertical space and more scrolling.",
      },
      index: {
        choice: "The form keeps 40px controls, square corners, and a blue primary action.",
        reason: "The form stays precise while leaving enough space for typing.",
        tradeoff: "Its compact character is clearer in the review queue than in this form.",
      },
    },
    carbon:
      "The published TextInput uses a filled field with an underline and a 12px label. This default input is 40px high; the ordinary primary button is 48px. In the invalid capture, the error replaces the helper text.",
    heroui:
      "The published TextField has softer field edges and a pill-shaped primary button. The desktop default button is 36px high. In the invalid capture, the description is hidden and the error takes its place.",
  },
  queue: {
    label: "Choose a review",
    title: "Decide what to review next",
    question:
      "Would you rather scan the whole queue, follow a suggested next action, or inspect one record in context?",
    lesson:
      "This is the largest difference between the proposals. Field prioritizes an overview. Relay prioritizes the next task. Index prioritizes the relationship between a list and its selected record.",
    relation:
      "Carbon and HeroUI both supply tables. Neither library decides that a product needs Relay’s next-task panel or Index’s persistent detail pane. Those are workflow choices made by the application.",
    candidates: {
      field: {
        choice: "A continuous table keeps review names and statuses aligned.",
        reason:
          "The alignment makes it easier to compare several records and assign them together.",
        tradeoff: "The table gives less guidance about which task to start with.",
      },
      relay: {
        choice: "The next review gets its own prominent action above the remaining queue.",
        reason: "This answers “What should I do next?” before asking you to scan a list.",
        tradeoff: "The emphasis takes space away from comparing many records at once.",
      },
      index: {
        choice:
          "Compact rows sit near the selected record’s details. The full wide workspace places those details beside the table.",
        reason: "Frequent users can inspect a record without losing their place in the list.",
        tradeoff:
          "There is more information to read at once. Narrow screens use a separate detail view.",
      },
    },
    carbon:
      "The published table has a strong header band and continuous rows. Its alignment makes the columns easy to compare. The two-column arrangement and review-status tags here are choices made for this specimen.",
    heroui:
      "The published table uses a softer enclosing surface and rounded status chips in this specimen. The data and two columns match the Carbon example. Selection, filtering, and next-task guidance still need application decisions.",
  },
  dialog: {
    label: "Edit in a dialog",
    title: "Change the reviewer and status",
    question:
      "Look at the field grouping and the separation between Cancel and Save. Open a working version to try the dropdown and Escape key.",
    lesson:
      "The three Cinder dialogs have the same controls and dismissal behavior. Their differences are the size of the controls, the corners, and the emphasis of the actions. Open a dropdown, press Escape once, then press it again.",
    relation:
      "Carbon’s action footer spans the dialog edge. HeroUI uses separate rounded actions inside the surface. The Cinder proposals keep separate actions and vary the surface geometry. Corner shape does not determine keyboard behavior.",
    candidates: {
      field: {
        choice: "40px controls sit inside a dialog with 16px corners.",
        reason: "The temporary editing surface is softer than the small controls inside it.",
        tradeoff:
          "The relationship between the two corner sizes needs to stay consistent across other overlays.",
      },
      relay: {
        choice: "48px controls and 20px dialog corners give the task more room.",
        reason: "The extra room makes the editing step feel distinct from the surrounding queue.",
        tradeoff: "The same task needs a taller dialog, especially with longer notes.",
      },
      index: {
        choice: "32px controls and 6px dialog corners keep desktop editing compact.",
        reason: "The smaller surface supports frequent, short edits.",
        tradeoff:
          "Targets are tighter on desktop. The working prototype expands controls on narrow screens.",
      },
    },
    carbon:
      "The published modal is square and has a full-width action footer. That footer uses 64px buttons in this configuration, rather than the ordinary 48px button shown in the form. The footer makes the commitment visually prominent.",
    heroui:
      "The published modal has rounded edges, a compact close control, and separate Cancel and Save buttons. The 36px desktop primary button is smaller than Field’s or Relay’s action. This capture shows the default closed dropdowns.",
  },
};

const purposes: Record<Direction, string> = {
  field: "Keep the whole workspace understandable.",
  relay: "Make the next action obvious.",
  index: "Keep a record and its context close.",
};

const referenceDocs = {
  carbon: {
    form: "https://carbondesignsystem.com/components/text-input/usage/",
    queue: "https://carbondesignsystem.com/components/data-table/usage/",
    dialog: "https://carbondesignsystem.com/components/modal/usage/",
  },
  heroui: {
    form: "https://heroui.com/en/docs/react/components/text-field",
    queue: "https://heroui.com/en/docs/react/components/table",
    dialog: "https://heroui.com/en/docs/react/components/modal",
  },
};

export function ComparisonGuide({
  mode,
  onTry,
}: {
  mode: "light" | "dark";
  onTry: (variant: Direction, example: Example) => void;
}) {
  const [example, setExample] = useState<Example>("form");
  const [invalid, setInvalid] = useState(false);
  const current = examples[example];
  const imageKey = example === "form" && invalid ? "error" : example;

  function specimen(system: keyof typeof referenceImages, name: string) {
    const images = referenceImages[system];
    return (
      <figure className="comparison-specimen">
        <a
          href={images[mode][imageKey]}
          target="_blank"
          rel="noreferrer"
          aria-label={`Enlarge ${name}: ${current.label.toLowerCase()}${imageKey === "error" ? ", invalid email" : ""} (opens in a new tab)`}
        >
          <img
            src={images[mode][imageKey]}
            width={380}
            height={images.heights[imageKey]}
            loading="lazy"
            alt={`${name}, ${mode} theme: ${current.title.toLowerCase()}${imageKey === "error" ? ". The email is invalid" : ""}.`}
          />
        </a>
        <figcaption>Select this desktop capture to enlarge it.</figcaption>
      </figure>
    );
  }

  return (
    <div className="comparison-guide">
      <header className="comparison-intro">
        <h1>Compare the designs</h1>
        <p>
          Field, Relay, and Index are three proposed Cinder designs. See how each handles the same
          job, then compare it with Carbon and HeroUI.
        </p>
      </header>

      <div className="comparison-controls" role="group" aria-label="Choose a comparison task">
        {(["form", "queue", "dialog"] as const).map((key) => (
          <Button
            key={key}
            variant="ghost"
            aria-pressed={example === key}
            aria-controls="comparison-examples"
            onPress={() => setExample(key)}
          >
            {examples[key].label}
          </Button>
        ))}
      </div>

      <section id="comparison-examples" aria-labelledby="comparison-task-title">
        <header className="comparison-task">
          <div>
            <h2 id="comparison-task-title">{current.title}</h2>
            <p>{current.question}</p>
          </div>
          {example === "form" ? (
            <Switch isSelected={invalid} onChange={setInvalid}>
              Show an invalid email
            </Switch>
          ) : null}
        </header>
        <div className="comparison-candidates">
          {directionOrder.map((variant) => {
            const observation = current.candidates[variant];
            return (
              <article
                className="comparison-candidate"
                key={variant}
                aria-labelledby={`comparison-${variant}`}
              >
                <header>
                  <h3 id={`comparison-${variant}`}>{directions[variant].name}</h3>
                  <p>{purposes[variant]}</p>
                </header>
                {specimen(variant, directions[variant].name)}
                <div className="comparison-reading">
                  <dl className="comparison-observations">
                    <div>
                      <dt>The choice</dt>
                      <dd>{observation.choice}</dd>
                    </div>
                    <div>
                      <dt>Why it helps</dt>
                      <dd>{observation.reason}</dd>
                    </div>
                    <div>
                      <dt>The tradeoff</dt>
                      <dd>{observation.tradeoff}</dd>
                    </div>
                  </dl>
                  <Button variant="tertiary" onPress={() => onTry(variant, example)}>
                    Try {directions[variant].name}{" "}
                    {example === "form" ? "settings" : example === "queue" ? "workspace" : "dialog"}
                    <Icon name="arrowRight" />
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
        <div className="comparison-lesson">
          <h3>What to learn from this example</h3>
          <p>{current.lesson}</p>
          {example === "form" ? (
            <p>
              In every Cinder proposal, help remains visible with the error. The working settings
              form reserves error space so Save stays in place when validation appears.
            </p>
          ) : null}
        </div>
      </section>

      <section className="comparison-references" aria-labelledby="published-references-title">
        <header className="comparison-section-heading">
          <h2 id="published-references-title">Compare with the published systems</h2>
          <p>
            These are captures of actual Carbon and HeroUI components, assembled into the same small
            tasks. They show the versions below.
          </p>
        </header>
        <div className="comparison-reference-grid">
          {(["carbon", "heroui"] as const).map((system) => {
            const name = system === "carbon" ? "Carbon v11" : "HeroUI v3";
            return (
              <article className="comparison-reference" key={system}>
                <header>
                  <h3>{name}</h3>
                  <p>
                    {system === "carbon"
                      ? "React 1.120.0 · Styles 1.119.0"
                      : "React and Styles 3.2.7"}
                  </p>
                </header>
                {specimen(system, name)}
                <div className="comparison-reading">
                  <p>{current[system]}</p>
                  <a href={referenceDocs[system][example]} target="_blank" rel="noreferrer">
                    Read the {name} component docs
                    <Icon name="external" />
                  </a>
                </div>
              </article>
            );
          })}
          <aside className="comparison-relationship">
            <h3>How the choices relate</h3>
            <p>{current.relation}</p>
            <h4>The engineering takeaway</h4>
            <p>
              The research favors keeping Cinder’s React Aria behavior and prebuilt CSS, while
              making styling hooks more consistent. Choosing a visual direction does not adopt a new
              component library or public API.
            </p>
            <a href="/research" target="_blank" rel="noreferrer">
              Read the research reports
              <Icon name="external" />
            </a>
          </aside>
        </div>
      </section>

      <section className="comparison-decision" aria-labelledby="comparison-decision-title">
        <div>
          <h2 id="comparison-decision-title">Preferred direction: Relay</h2>
          <p>
            Relay is the preferred starting point for the next design pass. Its larger controls,
            softer corners, and clear next-review action set the direction. The main tradeoff is
            more vertical space and fewer records on screen.
          </p>
        </div>
        <div>
          <h3>Useful feedback names the part</h3>
          <p>
            For example: “I prefer Field’s form, Relay’s next-review action, and Index’s persistent
            details.” You can choose those parts independently before deciding on a final identity.
          </p>
        </div>
      </section>

      <details className="comparison-method">
        <summary>How to read these examples</summary>
        <ul>
          <li>
            The pictures are static, reduced specimens. Use the “Try” buttons for working Cinder
            forms, search, selection, editing, and recovery states.
          </li>
          <li>
            Every specimen is 380px wide, captured at a 1200px desktop viewport on 6 November 2026.
            They shrink to fit a narrow page. The lists use the same three fictional records; the
            working workspace has twelve.
          </li>
          <li>
            The specimen composition is ours. Carbon and HeroUI provide their published component
            styling. Cinder uses the existing prototype stylesheet. Dialog widths are constrained to
            the common specimen width.
          </li>
          <li>
            Cinder and Carbon use IBM Plex Sans. HeroUI uses the local system font in these
            captures; its documentation site uses Inter.
          </li>
          <li>
            Use the theme button at the top to compare light and dark captures. In the working
            Cinder prototypes, narrow screens use a 44px form-control size and change the layout;
            Index’s 32px desktop controls are not its mobile target size.
          </li>
          <li>
            All Cinder edits stay in the current tab until reload or “Reset demo”. No design,
            palette, or component interface has been adopted.
          </li>
        </ul>
      </details>
    </div>
  );
}
