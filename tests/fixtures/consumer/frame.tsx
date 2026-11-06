import { useRef, useState, type CSSProperties } from "react";
import {
  Button as AriaButton,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
} from "react-aria-components";
import {
  Button,
  Dialog,
  DialogTrigger,
  FieldError,
  Form,
  Heading,
  I18nProvider,
  Icon,
  Input,
  Label,
  Layer,
  Link,
  ListBoxItem,
  Modal,
  Select,
  Text,
  TextField,
  Theme,
  type Key,
} from "@cinder/react";
import { isThemeName, themeNames, themes, token } from "@cinder/tokens";
import tokenData from "@cinder/tokens/tokens.json";
import moduleBrand from "./brand.module.css";
import "./frame.css";

const frameThemes = ["frame-light", "frame-dark"] as const;
type FrameTheme = (typeof frameThemes)[number];
const roles = [
  { id: "viewer", label: "Viewer", description: "Can read and comment" },
  { id: "owner", label: "Owner", description: "Managed by the account administrator" },
  { id: "editor", label: "Editor", description: "Can edit and publish" },
];
const plainBrand = {
  appearance: "plain-appearance",
  field: "plain-field",
  control: "plain-control",
  label: "plain-label",
  description: "plain-description",
  error: "plain-error",
  action: "plain-action",
  overlay: "plain-overlay",
  modal: "plain-modal",
  dialog: "plain-dialog",
  option: "plain-option",
};

function Brand({ kind, theme }: { kind: "plain" | "module"; theme: FrameTheme }) {
  const recipe = kind === "plain" ? plainBrand : moduleBrand;
  const label = kind === "plain" ? "Plain CSS" : "CSS Modules";
  const [name, setName] = useState("Studio North");
  const [saved, setSaved] = useState("");
  const [role, setRole] = useState<Key | null>("viewer");
  const [appearance, setAppearance] = useState<string | undefined>();
  const [fieldRefs, setFieldRefs] = useState("");
  const [modalRefs, setModalRefs] = useState("");
  const field = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const modal = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);

  return (
    <Theme
      theme={theme}
      appearanceClassName={recipe.appearance}
      className="fixture-brand fixture-stack"
      data-testid={`${kind}-brand`}
    >
      <h2 className="fixture-heading">{label}</h2>
      <TextField
        label={`${label} workspace`}
        description="This name appears in invitations."
        name={`${kind}-workspace`}
        value={name}
        onChange={setName}
        ref={field}
        inputRef={input}
        className={recipe.field}
        style={{ maxWidth: "30rem" }}
        data-testid={`${kind}-default-field`}
      />
      <Button
        variant="secondary"
        className={recipe.action}
        onPress={() => {
          input.current?.focus();
          setFieldRefs(
            JSON.stringify({
              root: field.current?.tagName,
              input: input.current?.tagName,
              contains: field.current?.contains(input.current),
            }),
          );
        }}
      >
        Focus {label} workspace
      </Button>
      <output aria-label={`${label} controlled value`}>{name}</output>
      <output aria-label={`${label} field refs`}>{fieldRefs}</output>
      <Form
        className="fixture-stack"
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(String(new FormData(event.currentTarget).get("team")));
        }}
      >
        <TextField
          name="team"
          defaultValue=""
          isRequired
          minLength={3}
          validationBehavior="native"
          className={() => recipe.field}
          data-testid={`${kind}-composed-field`}
        >
          <Label className={`react-aria-Label cinder-field__label ${recipe.label}`}>
            {label} team (required)
          </Label>
          <Text
            slot="description"
            className={`react-aria-Text cinder-field__description ${recipe.description}`}
          >
            Use at least three characters.
          </Text>
          <Input
            className={`react-aria-Input cinder-field__control ${recipe.control}`}
            style={{ textAlign: "start" }}
          />
          <div className="cinder-field__help cinder-field-help">
            <FieldError className={`react-aria-FieldError cinder-field__error ${recipe.error}`}>
              Enter at least 3 characters.
            </FieldError>
          </div>
        </TextField>
        <Button type="submit" className={recipe.action}>
          Validate {label} team
        </Button>
      </Form>
      <output aria-label={`${label} validated team`}>{saved || "Nothing validated"}</output>
      {kind === "plain" && (
        <div className="fixture-actions" role="group" aria-label="Nested appearance">
          <Button
            variant="ghost"
            onPress={() => setAppearance(undefined)}
            data-testid="inherit-recipe"
          >
            Inherit appearance
          </Button>
          <Button
            variant="ghost"
            onPress={() => setAppearance(moduleBrand.appearance)}
            data-testid="replace-recipe"
          >
            Use module appearance
          </Button>
          <Button variant="ghost" onPress={() => setAppearance("")} data-testid="clear-recipe">
            Clear appearance
          </Button>
        </div>
      )}
      <Theme
        theme={theme}
        appearanceClassName={appearance}
        id={`${kind}-portal-source`}
        className="fixture-portal-layout"
        style={{ "--fixture-root-only": "not-portable" } as CSSProperties}
        data-testid={`${kind}-portal-source`}
      >
        <Layer>
          <DialogTrigger>
            <Button data-testid={`${kind}-open-dialog`}>Open {label} invitation</Button>
            <Modal
              ref={modal}
              overlayRef={overlay}
              className={recipe.modal}
              overlayClassName={recipe.overlay}
              style={{ paddingInline: "24px" }}
              modalStyle={{ maxWidth: "34rem" }}
              lang={kind === "module" ? "fr-CA" : undefined}
            >
              <Dialog className={`${recipe.dialog} fixture-stack`}>
                <Heading slot="title">{label} invitation</Heading>
                <p>Preview a teammate’s access. No invitation is sent.</p>
                <Select
                  label={`${label} review role`}
                  description="Choose the access this teammate needs."
                  items={roles}
                  disabledKeys={["owner"]}
                  value={role}
                  onChange={setRole}
                  data-testid={`${kind}-role`}
                >
                  {(item) => (
                    <ListBoxItem
                      id={item.id}
                      textValue={item.label}
                      className={`react-aria-ListBoxItem ${recipe.option}`}
                    >
                      <Text slot="label">{item.label}</Text>
                      <Text slot="description">{item.description}</Text>
                    </ListBoxItem>
                  )}
                </Select>
                <output aria-label={`${label} selected role`}>{role}</output>
                <Button
                  variant="ghost"
                  onPress={() =>
                    setModalRefs(
                      JSON.stringify({
                        outer: overlay.current?.classList.contains("cinder-modal-overlay"),
                        inner: modal.current?.classList.contains("cinder-modal"),
                        distinct: overlay.current !== modal.current,
                        contains: overlay.current?.contains(modal.current),
                      }),
                    )
                  }
                >
                  Inspect {label} modal refs
                </Button>
                <output aria-label={`${label} modal refs`}>{modalRefs}</output>
                <Button
                  slot="close"
                  variant="ghost"
                  iconOnly
                  aria-label={`Close ${label} invitation`}
                >
                  <Icon name="close" />
                </Button>
              </Dialog>
            </Modal>
          </DialogTrigger>
        </Layer>
      </Theme>
    </Theme>
  );
}

export function FrameConsumer({ integration }: { integration: "native" | "tailwind" }) {
  const [theme, setTheme] = useState<FrameTheme>("frame-light");
  const [locale, setLocale] = useState("en-US");
  return (
    <I18nProvider locale={locale}>
      <main className="frame-consumer" data-integration={integration}>
        <h1 className="fixture-title">Frame installed-package proof</h1>
        <p>
          {integration === "native" ? "Native prebuilt CSS" : "Tailwind CSS 4.3.5"} · illustrative
          workspace settings
        </p>
        <Theme theme={theme} className="fixture-section fixture-stack" data-testid="frame-baseline">
          <div className="fixture-actions">
            <Button onPress={() => setTheme("frame-light")} data-testid="use-frame-light">
              Use Frame light
            </Button>
            <Button onPress={() => setTheme("frame-dark")} data-testid="use-frame-dark">
              Use Frame dark
            </Button>
            <Button
              variant="secondary"
              onPress={() => setLocale("en-US")}
              data-testid="use-english"
            >
              Use English locale
            </Button>
            <Button variant="secondary" onPress={() => setLocale("he-IL")} data-testid="use-hebrew">
              Use Hebrew locale
            </Button>
          </div>
          <div className="fixture-actions">
            <Link href="#consumer-sizes">Review control sizes</Link>
            <Link href="#unavailable-export" isDisabled>
              Unavailable export
            </Link>
          </div>
          <h2 id="consumer-sizes" tabIndex={-1} className="fixture-heading">
            Default and explicit sizes
          </h2>
          <div className="fixture-matrix">
            {([undefined, "sm", "md", "lg"] as const).map((size) => {
              const name = size ?? "default";
              return (
                <div className="fixture-stack" key={name}>
                  <Button size={size} data-testid={`size-${name}-button`}>
                    {name} action
                  </Button>
                  <TextField
                    size={size}
                    label={`${name} field`}
                    data-testid={`size-${name}-field`}
                  />
                  <Select
                    size={size}
                    label={`${name} choice`}
                    defaultValue="viewer"
                    data-testid={`size-${name}-select`}
                  >
                    <ListBoxItem id="viewer">Viewer</ListBoxItem>
                    <ListBoxItem id="editor">Editor</ListBoxItem>
                  </Select>
                </div>
              );
            })}
          </div>
          <Button className="rounded-none px-6" data-testid="utility-action">
            Utility override
          </Button>
          <Theme
            theme="g90"
            appearanceClassName=""
            className="fixture-section fixture-stack"
            data-testid="nested-carbon"
          >
            <h2 className="fixture-heading">Carbon inside Frame</h2>
            <Button data-testid="carbon-button">Carbon default action</Button>
            <TextField label="Carbon default field" />
            <Theme
              theme={theme}
              className="fixture-section fixture-stack"
              data-testid="nested-frame"
            >
              <Button data-testid="nested-frame-button">Frame inside Carbon</Button>
              <TextField label="Nested Frame field" />
            </Theme>
          </Theme>
        </Theme>
        <div className="fixture-brand-grid">
          <Brand kind="plain" theme={theme} />
          <Brand kind="module" theme={theme} />
        </div>
        <section className="fixture-host" aria-label="Unrelated host controls">
          <h2 data-testid="preflight-heading">Host defaults</h2>
          <AriaButton data-testid="raw-default">Raw default</AriaButton>
          <AriaButton data-size="sm" data-kind="error" data-testid="raw-small">
            Raw small
          </AriaButton>
          <AriaListBox
            aria-label="Host choices"
            selectionMode="single"
            defaultSelectedKeys={["one"]}
          >
            <AriaListBoxItem id="one">Host option one</AriaListBoxItem>
            <AriaListBoxItem id="two">Host option two</AriaListBoxItem>
          </AriaListBox>
        </section>
        <details>
          <summary>Public Frame token exports</summary>
          <pre aria-label="Frame token exports">
            {JSON.stringify(
              {
                names: themeNames,
                cssRadius: token("control-radius"),
                frames: Object.fromEntries(
                  frameThemes.map((name) => [
                    name,
                    {
                      accepted: isThemeName(name),
                      js: {
                        background: themes[name].background,
                        radius: themes[name]["control-radius"],
                        font: themes[name]["font-sans"],
                      },
                      json: {
                        background: tokenData.themes[name].background,
                        radius: tokenData.themes[name]["control-radius"],
                        font: tokenData.themes[name]["font-sans"],
                      },
                    },
                  ]),
                ),
              },
              null,
              2,
            )}
          </pre>
        </details>
      </main>
    </I18nProvider>
  );
}
