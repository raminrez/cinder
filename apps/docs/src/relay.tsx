import { useEffect, useState, type CSSProperties } from "react";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  CodeSnippet,
  ContentSwitcher,
  Dialog,
  DialogTrigger,
  FieldError,
  Form,
  Heading,
  Icon,
  Input,
  Label,
  Link,
  ListBoxItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Text,
  TextField,
  ToggleButton,
  type ButtonVariant,
  type ControlSize,
} from "@cinder/react";
import { foundations, themes } from "@cinder/tokens";
import { useThemePreference } from "./site";

const variants: { id: ButtonVariant; name: string; use: string }[] = [
  { id: "primary", name: "Primary", use: "The main action in a group." },
  { id: "secondary", name: "Secondary", use: "A supporting action with a quiet fill." },
  { id: "tertiary", name: "Tertiary", use: "An outlined alternative, such as Cancel." },
  { id: "ghost", name: "Ghost", use: "Low-emphasis actions in a toolbar." },
  { id: "danger", name: "Danger", use: "Confirm a destructive action." },
  { id: "danger-tertiary", name: "Danger tertiary", use: "An outlined destructive alternative." },
  { id: "danger-ghost", name: "Danger ghost", use: "A destructive action in a list or toolbar." },
];
const buttonStates = ["Default", "Hover", "Pressed", "Focus", "Disabled", "Pending"] as const;
const fieldStates = ["Default", "Hover", "Focus", "Invalid", "Read-only", "Disabled"] as const;
const sizes = ["sm", "md", "lg"] as const;
const roles = [
  { id: "viewer", name: "Viewer", description: "Can view and comment" },
  { id: "editor", name: "Editor", description: "Can edit workspace content" },
  { id: "owner", name: "Owner", description: "Only an owner can grant this role" },
];

function SizeControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: ControlSize;
  onChange: (size: ControlSize) => void;
}) {
  return (
    <ContentSwitcher
      aria-label={label}
      size="sm"
      selectedKeys={[value]}
      onSelectionChange={(keys) => {
        const next = sizes.find((size) => keys.has(size));
        if (next) onChange(next);
      }}
    >
      {sizes.map((size) => (
        <ToggleButton id={size} key={size}>
          {size} · {Number.parseFloat(foundations[`size-${size}`]) * 16}
        </ToggleButton>
      ))}
    </ContentSwitcher>
  );
}

function ButtonPlayground() {
  const [variant, setVariant] = useState<ButtonVariant>("primary");
  const [size, setSize] = useState<ControlSize>("lg");
  const [disabled, setDisabled] = useState(false);
  const [iconOnly, setIconOnly] = useState(false);
  const [pending, setPending] = useState(false);
  const [saves, setSaves] = useState(0);
  useEffect(() => {
    if (!pending) return;
    const timeout = window.setTimeout(() => {
      setPending(false);
      setSaves((count) => count + 1);
    }, 1500);
    return () => window.clearTimeout(timeout);
  }, [pending]);
  return (
    <div className="relay-playground" aria-label="Live button example">
      <div className="relay-playground-controls">
        <Select
          label="Button variant"
          size="sm"
          value={variant}
          items={variants}
          onChange={(value) => {
            const next = variants.find((item) => item.id === value);
            if (next) setVariant(next.id);
          }}
        >
          {(item) => <ListBoxItem id={item.id}>{item.name}</ListBoxItem>}
        </Select>
        <div className="relay-control-setting">
          <span>Button size</span>
          <SizeControl label="Live button size" value={size} onChange={setSize} />
        </div>
        <div className="relay-control-options">
          <Checkbox isSelected={iconOnly} onChange={setIconOnly}>
            Icon only
          </Checkbox>
          <Checkbox isSelected={disabled} onChange={setDisabled}>
            Disabled
          </Checkbox>
        </div>
      </div>
      <div className="relay-button-stage">
        <Button
          variant={variant}
          size={size}
          iconOnly={iconOnly}
          aria-label={iconOnly ? "Save changes" : undefined}
          isDisabled={disabled}
          isPending={pending}
          pendingLabel="Saving"
          onPress={() => setPending(true)}
          data-testid="relay-live-button"
        >
          {!iconOnly && "Save changes"}
          <Icon name="check" />
        </Button>
        <output aria-label="Button preview status">
          {pending
            ? "Saving in this preview…"
            : saves
              ? `${saves} preview ${saves === 1 ? "save" : "saves"}. Nothing is sent.`
              : "Press to try the pending state. Mouse, Space, and Enter all work."}
        </output>
      </div>
    </div>
  );
}

function ButtonMatrix() {
  return (
    <div
      className="relay-table-scroll"
      tabIndex={0}
      role="region"
      aria-label="Button state comparison, scroll horizontally on small screens"
    >
      <table className="relay-state-table">
        <caption>
          Pinned appearances use the library’s state styles. Try real interactions in the live
          example above.
        </caption>
        <thead>
          <tr>
            <th scope="col">Variant</th>
            {buttonStates.map((state) => (
              <th scope="col" key={state}>
                {state}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {variants.map((variant) => (
            <tr key={variant.id}>
              <th scope="row">
                <code>{variant.id}</code>
                <span>{variant.use}</span>
              </th>
              {buttonStates.map((state) => (
                <td key={state}>
                  <div inert className="relay-pinned">
                    <Button
                      variant={variant.id}
                      size="md"
                      isDisabled={state === "Disabled"}
                      isPending={state === "Pending"}
                      pendingLabel="Saving"
                      render={(props) => (
                        <button
                          {...props}
                          data-hovered={state === "Hover" || undefined}
                          data-pressed={state === "Pressed" || undefined}
                          data-focus-visible={state === "Focus" || undefined}
                          tabIndex={-1}
                        />
                      )}
                    >
                      {variant.id.startsWith("danger") ? "Delete" : "Continue"}
                    </Button>
                  </div>
                  <span className="cinder-visually-hidden">
                    {variant.name}, {state.toLowerCase()} appearance
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FieldPlayground() {
  const [name, setName] = useState("Atlas design");
  const [size, setSize] = useState<ControlSize>("lg");
  const [validated, setValidated] = useState("");
  return (
    <div className="relay-playground" aria-label="Live text field example">
      <div className="relay-playground-controls">
        <div className="relay-control-setting">
          <span>Field size</span>
          <SizeControl label="Live field size" value={size} onChange={setSize} />
        </div>
        <p>Clear the name and submit to see validation. The message explains how to fix it.</p>
      </div>
      <Form
        className="relay-field-stage"
        onSubmit={(event) => {
          event.preventDefault();
          setValidated(name.trim());
        }}
      >
        <TextField
          label="Workspace name"
          name="workspace"
          description="Use at least 3 characters. Teammates will see this name."
          placeholder="e.g. Atlas design"
          value={name}
          onChange={(value) => {
            setName(value);
            setValidated("");
          }}
          isRequired
          validate={(value) =>
            value.trim().length < 3 ? "Use at least 3 characters for the workspace name." : null
          }
          errorMessage="Use at least 3 characters for the workspace name."
          size={size}
        />
        <TextField
          label="Workspace ID"
          defaultValue="WS-1042"
          description="Assigned by the system. You can select and copy it."
          isReadOnly
          size={size}
        />
        <div className="relay-inline-actions">
          <Button type="submit" size={size}>
            Validate name
          </Button>
          <Button
            variant="ghost"
            size={size}
            onPress={() => {
              setName("");
              setValidated("");
            }}
          >
            Clear name
          </Button>
        </div>
        <output aria-label="Field preview status">
          {validated
            ? `“${validated}” is valid. Nothing is saved.`
            : "This is a controlled field: the preview owns its value."}
        </output>
      </Form>
    </div>
  );
}

function FieldMatrix() {
  return (
    <div className="relay-field-matrix">
      {fieldStates.map((state) => (
        <div key={state} className="relay-field-specimen">
          <h3>{state}</h3>
          <div inert>
            <TextField
              size="lg"
              defaultValue={state === "Invalid" ? "A" : "Atlas design"}
              isInvalid={state === "Invalid"}
              validationBehavior="aria"
              isReadOnly={state === "Read-only"}
              isDisabled={state === "Disabled"}
            >
              <Label>Workspace name</Label>
              <Input
                render={(props) => (
                  <input
                    {...props}
                    data-hovered={state === "Hover" || undefined}
                    data-focused={state === "Focus" || undefined}
                    tabIndex={-1}
                  />
                )}
              />
              <div className="cinder-field-help">
                <Text slot="description">Visible to everyone in the workspace.</Text>
                <FieldError>Use at least 3 characters.</FieldError>
              </div>
            </TextField>
          </div>
          <p>
            {state === "Invalid"
              ? "An error border and a useful message; focus still gets its own ring."
              : state === "Read-only"
                ? "Readable, focusable, and copyable. Its value cannot be edited."
                : state === "Disabled"
                  ? "Unavailable. Removed from the tab order and from form submission."
                  : state === "Focus"
                    ? "A 2 px ring sits outside the border without moving the field."
                    : state === "Hover"
                      ? "The surface and border respond. No change in dimensions."
                      : "A persistent label, a full border, and help below the value."}
          </p>
        </div>
      ))}
    </div>
  );
}

function InvitationExample() {
  const [preview, setPreview] = useState("");
  return (
    <div className="relay-dialog-example">
      <div>
        <h3>Invite a teammate</h3>
        <p>
          A complete form inside a dialog, with a Select menu in a second portal. Try Tab, the arrow
          keys, and Escape.
        </p>
      </div>
      <DialogTrigger>
        <Button size="lg">
          Open invitation dialog <Icon name="arrowRight" />
        </Button>
        <Modal size="sm" isDismissable>
          <Dialog>
            {({ close }) => (
              <>
                <Heading slot="title">Invite a teammate</Heading>
                <Button
                  slot="close"
                  variant="ghost"
                  size="md"
                  iconOnly
                  aria-label="Close invitation dialog"
                >
                  <Icon name="close" />
                </Button>
                <p>Preview an invitation to the Atlas workspace. No email will be sent.</p>
                <Form
                  className="relay-invitation-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    const data = new FormData(event.currentTarget);
                    const role = roles.find((item) => item.id === data.get("role"));
                    setPreview(
                      `Invitation preview: ${data.get("email")} · ${role?.name ?? "Viewer"}. No email sent.`,
                    );
                    close();
                  }}
                >
                  <TextField
                    autoFocus
                    label="Email address"
                    name="email"
                    type="email"
                    isRequired
                    placeholder="alex@example.com"
                    description="Use your teammate’s work email."
                    errorMessage="Enter a valid email address, such as alex@example.com."
                    size="lg"
                  />
                  <Select
                    label="Workspace role"
                    name="role"
                    items={roles}
                    defaultValue="viewer"
                    disabledKeys={["owner"]}
                    description="Owners manage access. Viewers can comment."
                    size="lg"
                  >
                    {(item) => (
                      <ListBoxItem id={item.id} textValue={item.name}>
                        <Text slot="label">{item.name}</Text>
                        <Text slot="description">{item.description}</Text>
                      </ListBoxItem>
                    )}
                  </Select>
                  <Checkbox name="notify" defaultSelected>
                    Notify me when they join
                  </Checkbox>
                  <div className="cinder-dialog-footer">
                    <Button variant="tertiary" size="lg" onPress={close}>
                      Cancel
                    </Button>
                    <Button type="submit" size="lg">
                      Preview invitation
                    </Button>
                  </div>
                </Form>
              </>
            )}
          </Dialog>
        </Modal>
      </DialogTrigger>
      <output aria-label="Invitation preview status">
        {preview || "The dialog returns focus to its trigger when closed."}
      </output>
    </div>
  );
}

function SelectionExamples() {
  const [confirmation, setConfirmation] = useState<string[]>([]);
  return (
    <div className="relay-selection-examples">
      <div>
        <h3>Checkbox</h3>
        <CheckboxGroup
          label="Include in the review"
          defaultValue={["design"]}
          description="Choose any that apply."
        >
          <Checkbox value="design">Design changes</Checkbox>
          <Checkbox value="content">Content changes</Checkbox>
          <Checkbox value="billing" isDisabled>
            Billing changes (unavailable)
          </Checkbox>
        </CheckboxGroup>
        <Checkbox isIndeterminate>Some tasks selected</Checkbox>
        <Checkbox isSelected isReadOnly>
          Audit log (read-only)
        </Checkbox>
        <Checkbox isSelected isDisabled>
          Archived review (disabled)
        </Checkbox>
        <CheckboxGroup
          label="Required confirmation"
          value={confirmation}
          onChange={setConfirmation}
          isInvalid={confirmation.length === 0}
          isRequired
          errorMessage="Confirm that the review is complete."
          validationBehavior="aria"
        >
          <Checkbox value="confirmed">Review is complete</Checkbox>
        </CheckboxGroup>
      </div>
      <div>
        <h3>Radio</h3>
        <RadioGroup
          label="Review visibility"
          defaultValue="team"
          description="Choose one audience."
        >
          <Radio value="private">Only me</Radio>
          <Radio value="team">Workspace team</Radio>
          <Radio value="public" isDisabled>
            Public (unavailable)
          </Radio>
        </RadioGroup>
      </div>
      <div>
        <h3>Switch</h3>
        <Switch defaultSelected>Weekly summary</Switch>
        <Switch>Desktop notifications</Switch>
        <Switch size="sm" defaultSelected>
          Compact switch
        </Switch>
        <Switch isSelected isDisabled>
          Managed by your team
        </Switch>
        <p>
          A switch applies immediately. Use a checkbox for a choice that is submitted with a form.
        </p>
      </div>
    </div>
  );
}

const colorRoles = [
  ["background", "Page canvas"],
  ["layer-01", "Surface and dialog"],
  ["text-primary", "Labels and values"],
  ["text-secondary", "Help and secondary text"],
  ["field-01", "Field surface, layer 0"],
  ["border-strong-01", "Interactive control border"],
  ["border-subtle-00", "Surface divider, layer 0"],
  ["button-primary", "Primary action"],
  ["button-primary-hover", "Primary hover"],
  ["button-primary-active", "Primary pressed"],
  ["text-on-color", "Text on filled primary and danger actions"],
  ["button-secondary", "Supporting action"],
  ["focus", "Keyboard focus; also used for links"],
  ["support-error", "Invalid border"],
  ["button-danger-primary", "Destructive action"],
] as const;

function TokenExamples() {
  const [radius, setRadius] = useState("8");
  const style: CSSProperties & { "--cinder-control-radius": string } = {
    "--cinder-control-radius": `${radius}px`,
  };
  return (
    <>
      <div
        className="relay-table-scroll"
        tabIndex={0}
        role="region"
        aria-label="Relay color tokens"
      >
        <table className="relay-token-table">
          <caption>
            Values come directly from @cinder/tokens. Both themes use the same semantic names.
          </caption>
          <thead>
            <tr>
              <th scope="col">Role</th>
              <th scope="col">CSS variable</th>
              <th scope="col">Light</th>
              <th scope="col">Dark</th>
            </tr>
          </thead>
          <tbody>
            {colorRoles.map(([name, role]) => (
              <tr key={name}>
                <th scope="row">{role}</th>
                <td>
                  <code>--cinder-{name}</code>
                </td>
                {(["relay-light", "relay-dark"] as const).map((theme) => (
                  <td key={theme}>
                    <span
                      className="relay-swatch"
                      aria-hidden="true"
                      style={{ background: themes[theme][name] }}
                    />
                    <code>{themes[theme][name]}</code>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="relay-token-notes">
        <div>
          <h3>One scale, a few clear roles</h3>
          <dl className="relay-measurements">
            <div>
              <dt>Controls</dt>
              <dd>
                <code>--cinder-size-sm / md / lg</code>
                <span>32 / 40 / 48 px. Buttons also support 64 and 80 px.</span>
              </dd>
            </div>
            <div>
              <dt>Corners</dt>
              <dd>
                <code>--cinder-control-radius / popover-radius / overlay-radius</code>
                <span>8 / 12 / 20 px. Larger surfaces receive larger corners.</span>
              </dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>
                <span>
                  IBM Plex Sans. Values and labels 14/20 px; labels and buttons weight 500. Help and
                  errors 12/16 px. IBM Plex Mono for code.
                </span>
              </dd>
            </div>
            <div>
              <dt>Spacing</dt>
              <dd>
                <code>--cinder-spacing-03 / 05 / 06</code>
                <span>
                  8 px label gap, 16 px control inset, 24 px dialog padding. Borders are included in
                  the size.
                </span>
              </dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>
                <code>--cinder-focus-width / focus-offset</code>
                <span>2 px ring, 2 px outside. Error borders remain visible inside it.</span>
              </dd>
            </div>
            <div>
              <dt>Motion</dt>
              <dd>
                <code>--cinder-duration-fast-02: {foundations["duration-fast-02"]}</code>
                <span>
                  Short color transitions. Dialogs use {foundations["duration-moderate-02"]}.
                  Reduced motion removes transitions and animation.
                </span>
              </dd>
            </div>
          </dl>
        </div>
        <div>
          <h3>Change a token, see the result</h3>
          <p>This local override affects both controls. The component markup stays the same.</p>
          <ContentSwitcher
            aria-label="Custom control corners"
            size="sm"
            selectedKeys={[radius]}
            onSelectionChange={(keys) => {
              const next = ["0", "8", "16"].find((value) => keys.has(value));
              if (next) setRadius(next);
            }}
          >
            <ToggleButton id="0">0 px</ToggleButton>
            <ToggleButton id="8">8 px</ToggleButton>
            <ToggleButton id="16">16 px</ToggleButton>
          </ContentSwitcher>
          <div className="relay-token-preview" style={style}>
            <TextField label="Custom corner preview" defaultValue="Atlas design" size="lg" />
            <Button size="lg" onPress={() => setRadius("8")}>
              Restore Relay corners
            </Button>
          </div>
          <CodeSnippet
            label="Local token override"
            language="css"
          >{`.my-controls {\n  --cinder-control-radius: ${radius}px;\n}`}</CodeSnippet>
        </div>
      </div>
      <p className="relay-note">
        <code>--cinder-field</code> resolves to <code>field-01</code>, <code>field-02</code>, or{" "}
        <code>field-03</code> through <code>Layer</code>. Theme and layer names cross portals
        automatically. Arbitrary inline token overrides follow DOM inheritance; put overlay
        overrides on the actual <code>Popover</code> or theme selector.
      </p>
    </>
  );
}

function ApiGuidance() {
  return (
    <>
      <CodeSnippet
        label="Use the Relay theme"
        language="tsx"
      >{`import { Button, TextField, Theme } from "@cinder/react";
import "@cinder/react/styles.css";

<Theme theme="relay-light"> {/* or relay-dark */}
  <TextField label="Workspace name" defaultValue="Atlas design" size="lg" />
  <Button size="lg">Save changes</Button>
</Theme>`}</CodeSnippet>
      <div
        className="relay-table-scroll"
        tabIndex={0}
        role="region"
        aria-label="Component prop conventions"
      >
        <table className="relay-api-table">
          <thead>
            <tr>
              <th scope="col">Purpose</th>
              <th scope="col">Use</th>
              <th scope="col">What it means</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Size</th>
              <td>
                <code>size="sm" | "md" | "lg"</code>
              </td>
              <td>
                Button, TextField, and Select share 32/40/48 px. Button defaults to lg; fields to
                md. Switch has its own sm/md geometry. Checkbox and Radio have no size prop.
              </td>
            </tr>
            <tr>
              <th scope="row">Emphasis</th>
              <td>
                <code>variant</code>
              </td>
              <td>
                A Button choice. Fields use validation and interaction states rather than a
                button-like variant.
              </td>
            </tr>
            <tr>
              <th scope="row">Unavailable</th>
              <td>
                <code>isDisabled</code>
              </td>
              <td>
                Prevents interaction. Use a visible explanation when the reason is not obvious.
              </td>
            </tr>
            <tr>
              <th scope="row">In progress</th>
              <td>
                <code>isPending</code>, <code>pendingLabel</code>
              </td>
              <td>
                Button only. Keeps focus and prevents repeated activation. The default progress
                label is “Pending”; localize it with the action, such as “Saving”.
              </td>
            </tr>
            <tr>
              <th scope="row">Validation</th>
              <td>
                <code>isRequired</code>, <code>validate</code>, <code>isInvalid</code>,{" "}
                <code>errorMessage</code>
              </td>
              <td>
                Native validation is the default. Use validationBehavior="aria" for app-owned
                timing. Connect the error to its field and keep its label.
              </td>
            </tr>
            <tr>
              <th scope="row">Read-only</th>
              <td>
                <code>isReadOnly</code>
              </td>
              <td>
                Supported by editable fields and Checkbox. Text remains focusable and copyable.
                Select does not expose this prop.
              </td>
            </tr>
            <tr>
              <th scope="row">Events</th>
              <td>
                <code>onPress</code>, <code>onChange</code>
              </td>
              <td>
                Button uses onPress across input devices. TextField returns a string; Select returns
                a key or null (an array in multiple mode); Checkbox and Switch return a boolean.
              </td>
            </tr>
            <tr>
              <th scope="row">Selection</th>
              <td>
                <code>isSelected / defaultSelected</code>
              </td>
              <td>
                Checkbox and Switch. RadioGroup uses value/defaultValue. ContentSwitcher uses
                selectedKeys/defaultSelectedKeys and onSelectionChange.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="relay-guidance-columns">
        <div>
          <h3>Who owns the value?</h3>
          <p>
            Use a controlled value when another part of your app needs it. Use a default value when
            the field can own its state. A Form can read either through its <code>name</code>.
          </p>
          <CodeSnippet
            label="Controlled and uncontrolled fields"
            language="tsx"
          >{`const [name, setName] = useState("Atlas design");

// Controlled: React state owns the current value.
<TextField label="Workspace" value={name} onChange={setName} />

// Uncontrolled: the field owns its current value.
<TextField label="Workspace" name="workspace" defaultValue="Atlas design" />`}</CodeSnippet>
        </div>
        <div>
          <h3>Style and anatomy</h3>
          <p>
            <code>className</code> and <code>style</code> target the root and support React Aria
            render-state functions. Cinder’s root class is retained. Button’s <code>ref</code>{" "}
            targets the button; TextField’s <code>ref</code> targets its wrapper and{" "}
            <code>inputRef</code> targets its input.
          </p>
          <p>
            TextField’s <code>children</code> replaces its default anatomy. Keep React Aria’s parts
            to preserve labeling and validation. Select’s children are options, not a replacement
            trigger.
          </p>
          <CodeSnippet
            label="Composed field anatomy"
            language="tsx"
          >{`<TextField name="workspace" isRequired>
  <Label>Workspace name (required)</Label>
  <Input placeholder="e.g. Atlas design" />
  <Text slot="description">Visible to teammates.</Text>
  <FieldError>Enter a workspace name.</FieldError>
</TextField>`}</CodeSnippet>
        </div>
      </div>
      <div className="relay-guidance-columns relay-dos">
        <div>
          <h3>Good defaults</h3>
          <ul>
            <li>Choose one primary action for a decision.</li>
            <li>
              Use 48 px controls for a comfortable form; use 32 or 40 px where density matters.
            </li>
            <li>Keep labels visible and write an error that tells people how to recover.</li>
            <li>
              Use <code>aria-label</code> on icon-only buttons.
            </li>
            <li>Keep action text stable while pending so the button does not change width.</li>
          </ul>
        </div>
        <div>
          <h3>Avoid</h3>
          <ul>
            <li>Using red just to draw attention. It means destructive or invalid.</li>
            <li>Using a placeholder as the only label.</li>
            <li>Disabling a value that people should still be able to copy.</li>
            <li>
              Passing hover, focus, or pressed as application props. React Aria owns those states.
            </li>
            <li>Replacing inner parts with plain markup that loses accessible associations.</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default function Relay() {
  const { theme, setTheme } = useThemePreference();
  useEffect(() => {
    document.title = "Relay components — Cinder";
  }, []);
  return (
    <main id="main" className="relay-page page-frame">
      <header className="relay-page-heading">
        <div>
          <h1>Relay components</h1>
          <p>
            Quiet surfaces. Clear actions. Buttons and fields you can inspect, try, and use in an
            application.
          </p>
        </div>
        <ContentSwitcher
          aria-label="Relay theme"
          size="md"
          selectedKeys={[theme]}
          onSelectionChange={(keys) => {
            const next = (["relay-light", "relay-dark"] as const).find((name) => keys.has(name));
            if (next) setTheme(next);
          }}
        >
          <ToggleButton id="relay-light">
            <Icon name="sun" /> Light
          </ToggleButton>
          <ToggleButton id="relay-dark">
            <Icon name="moon" /> Dark
          </ToggleButton>
        </ContentSwitcher>
      </header>
      <nav className="relay-toc" aria-label="Relay sections">
        <Link href="#buttons">Buttons</Link>
        <Link href="#fields">Text fields</Link>
        <Link href="#composition">Selection & dialogs</Link>
        <Link href="#tokens">Tokens</Link>
        <Link href="#api">API & guidance</Link>
      </nav>
      <section id="buttons" className="relay-section" aria-labelledby="relay-buttons-title">
        <div className="relay-section-heading">
          <h2 id="relay-buttons-title">Buttons</h2>
          <p>
            Neutral emphasis keeps routine actions calm. Red is reserved for destructive actions;
            blue identifies focus.
          </p>
        </div>
        <ButtonPlayground />
        <ButtonMatrix />
        <h3 className="relay-subheading">The size scale</h3>
        <div className="relay-size-scale">
          {(["sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
            <div key={size}>
              <div inert>
                <Button size={size}>Continue</Button>
              </div>
              <code>
                {size} · {Number.parseFloat(foundations[`size-${size}`]) * 16} px
              </code>
              <span>
                {size === "sm"
                  ? "Dense tools"
                  : size === "md"
                    ? "Everyday controls"
                    : size === "lg"
                      ? "Comfortable forms"
                      : size === "xl"
                        ? "Prominent actions"
                        : "Expressive layouts"}
              </span>
            </div>
          ))}
        </div>
      </section>
      <section id="fields" className="relay-section" aria-labelledby="relay-fields-title">
        <div className="relay-section-heading">
          <h2 id="relay-fields-title">Text fields</h2>
          <p>
            A label above, a value inside, and one helpful message below. The border carries
            validation; the outer ring carries focus.
          </p>
        </div>
        <FieldPlayground />
        <p className="relay-matrix-caption">
          Pinned field appearances, all shown at 48 px. The form above demonstrates real focus,
          editing, and validation.
        </p>
        <FieldMatrix />
      </section>
      <section id="composition" className="relay-section" aria-labelledby="relay-composition-title">
        <div className="relay-section-heading">
          <h2 id="relay-composition-title">Selection & dialogs</h2>
          <p>
            The same neutral selection, error color, and focus treatment work together. These
            controls are live.
          </p>
        </div>
        <SelectionExamples />
        <InvitationExample />
      </section>
      <section id="tokens" className="relay-section" aria-labelledby="relay-tokens-title">
        <div className="relay-section-heading">
          <h2 id="relay-tokens-title">The decisions behind the pixels</h2>
          <p>
            Semantic tokens describe a job, not a particular color. Switching themes changes their
            values, not your components.
          </p>
        </div>
        <TokenExamples />
      </section>
      <section id="api" className="relay-section" aria-labelledby="relay-api-title">
        <div className="relay-section-heading">
          <h2 id="relay-api-title">Use the existing API</h2>
          <p>
            React Aria supplies interaction and accessibility. Cinder supplies the composition,
            tokens, and static CSS.
          </p>
        </div>
        <ApiGuidance />
      </section>
      <footer className="relay-page-footer">
        <span>First Relay slice · Button, TextField, Select, selection controls, and Dialog.</span>
        <Link href="/components">
          Explore the full Cinder catalog <Icon name="arrowRight" />
        </Link>
      </footer>
    </main>
  );
}
