import { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { themeNames } from "@hashti/tokens";
import {
  Button,
  Checkbox,
  ComboBox,
  Dialog,
  DialogTrigger,
  FieldError,
  Form,
  Heading,
  I18nProvider,
  Input,
  Label,
  Layer,
  ListBoxItem,
  Menu,
  MenuItem,
  MenuTrigger,
  Modal,
  Popover,
  Select,
  Stack,
  TextField,
  Theme,
  ToastProvider,
  Tooltip,
  TooltipTrigger,
  useToast,
  type Key,
  type ThemeName,
} from "@hashti/react";

const items = [
  { id: "alpha", name: "Alpha" },
  { id: "beta", name: "Beta" },
  { id: "gamma", name: "Gamma" },
];

function StateContracts() {
  const actionRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("Initial");
  const [selected, setSelected] = useState(false);
  const [single, setSingle] = useState<Key | null>("alpha");
  const [multiple, setMultiple] = useState<Key[]>(["beta"]);
  const [combo, setCombo] = useState<Key[]>([]);
  return (
    <Stack gap={6}>
      <Button
        ref={actionRef}
        aria-label="Contract action"
        onPress={() => setCount((current) => current + 1)}
        className={({ isPressed }) => (isPressed ? "consumer-pressed" : "consumer-ready")}
        render={(domProps) => <button {...domProps} data-custom-render="true" />}
      >
        {({ isPressed }) => (isPressed ? "Pressing" : "Ready")}
      </Button>
      <output aria-label="Press count">{count}</output>
      <Button onPress={() => actionRef.current?.focus()}>Focus action via ref</Button>
      <TextField label="Controlled name" value={value} onChange={setValue} inputRef={inputRef} />
      <output aria-label="Controlled value">{value}</output>
      <Button onPress={() => inputRef.current?.focus()}>Focus field via ref</Button>
      <Checkbox
        aria-label="Contract option"
        isSelected={selected}
        onChange={setSelected}
        className={({ isSelected }) => (isSelected ? "consumer-selected" : "consumer-unselected")}
      >
        {({ isSelected }) => (isSelected ? "Choice on" : "Choice off")}
      </Checkbox>
      <Select label="Dynamic single" items={items} value={single} onChange={setSingle}>
        {(item) => <ListBoxItem id={item.id}>{item.name}</ListBoxItem>}
      </Select>
      <output aria-label="Single value">{single}</output>
      <Select
        label="Dynamic multiple"
        items={items}
        selectionMode="multiple"
        value={multiple}
        onChange={setMultiple}
      >
        {(item) => <ListBoxItem id={item.id}>{item.name}</ListBoxItem>}
      </Select>
      <output aria-label="Multiple values">{multiple.join(",")}</output>
      <ComboBox
        label="Multiple combobox"
        defaultItems={items}
        selectionMode="multiple"
        value={combo}
        onChange={setCombo}
      >
        {(item) => <ListBoxItem id={item.id}>{item.name}</ListBoxItem>}
      </ComboBox>
      <output aria-label="Combobox values">{combo.join(",")}</output>
      <Form validationErrors={{ account: "This account name is already taken." }}>
        <TextField
          name="account"
          defaultValue="reserved"
          className={({ isInvalid }) => (isInvalid ? "consumer-invalid" : "consumer-valid")}
        >
          {({ isInvalid }) => (
            <>
              <Label>Custom anatomy</Label>
              <Input />
              <FieldError>{({ validationErrors }) => validationErrors.join(" ")}</FieldError>
              <span>{isInvalid ? "Server error" : "Accepted"}</span>
            </>
          )}
        </TextField>
      </Form>
    </Stack>
  );
}

function PortalContracts() {
  const [theme, setTheme] = useState<ThemeName>("g100");
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");
  return (
    <Stack gap={6}>
      <label>
        Contract theme{" "}
        <select
          aria-label="Contract theme"
          value={theme}
          onChange={(event) => setTheme(event.target.value as ThemeName)}
        >
          {themeNames.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
      </label>
      <label>
        Contract direction{" "}
        <select
          aria-label="Contract direction"
          value={direction}
          onChange={(event) => setDirection(event.target.value as "ltr" | "rtl")}
        >
          <option>ltr</option>
          <option>rtl</option>
        </select>
      </label>
      <Theme theme={theme} locale={direction === "rtl" ? "ar-AE" : "en-US"} className="inner-theme">
        <Theme theme="white" className="nested-carbon-theme">
          <Button>Nested Carbon action</Button>
        </Theme>
        <Theme theme={theme} className="inherited-locale">
          <Layer className="first-layer">
            <Layer className="second-layer">
              <Layer className="saturated-layer">
                <Stack gap={6}>
                  <TextField label="Layer field" defaultValue="Third-level field" />
                  <DialogTrigger>
                    <Button>Open contract dialog</Button>
                    <Modal size="sm" isDismissable>
                      <Dialog>
                        <Heading slot="title">Layer dialog</Heading>
                        <TextField label="Inside dialog" autoFocus />
                        <MenuTrigger>
                          <Button>Nested actions</Button>
                          <Popover>
                            <Menu aria-label="Nested actions">
                              <MenuItem id="save">Save</MenuItem>
                              <MenuItem id="copy">Copy</MenuItem>
                            </Menu>
                          </Popover>
                        </MenuTrigger>
                        <Button slot="close">Close layer dialog</Button>
                      </Dialog>
                    </Modal>
                  </DialogTrigger>
                  <TooltipTrigger delay={0}>
                    <Button>Layer hint</Button>
                    <Tooltip>Third-level tooltip</Tooltip>
                  </TooltipTrigger>
                </Stack>
              </Layer>
            </Layer>
          </Layer>
        </Theme>
      </Theme>
    </Stack>
  );
}

function ToastAction() {
  const toast = useToast();
  return (
    <Button onPress={() => toast.add({ title: "Provider-owned toast" })}>
      Show provider toast
    </Button>
  );
}

function AppearanceContracts() {
  const params = new URLSearchParams(location.search);
  const [locale, setLocale] = useState("en-US");
  const [lang, setLang] = useState<string | undefined>(params.get("themeLang") ?? undefined);
  const [appearance, setAppearance] = useState<string>();
  const [theme, setTheme] = useState<ThemeName>();
  const overlayLang = params.get("overlayLang") ?? undefined;
  return (
    <I18nProvider locale={locale}>
      <Theme
        theme="g100"
        lang="it-IT"
        appearanceClassName="brand-a recipe-common"
        className="appearance-parent"
      >
        <Layer level={2}>
          <Theme
            theme={theme}
            lang={lang}
            appearanceClassName={appearance}
            className="appearance-child layout-only"
            id="appearance-root-only"
            data-theme-only="true"
            title="Theme root only"
            style={{ paddingTop: "19px" }}
          >
            <Layer lang="ja-JP" dir="rtl" className="local-language-layer">
              <ToastProvider>
                <Theme appearanceClassName="brand-b" locale="es-MX">
                  <ToastAction />
                </Theme>
                <DialogTrigger>
                  <Button>Open appearance dialog</Button>
                  <Modal lang={overlayLang} dir="rtl" overlayClassName="consumer-overlay">
                    <Dialog>
                      <Heading slot="title">Appearance dialog</Heading>
                      <Select label="Dialog choice" defaultValue="alpha" disabledKeys={["beta"]}>
                        {items.map((item) => (
                          <ListBoxItem key={item.id} id={item.id}>
                            {item.name}
                          </ListBoxItem>
                        ))}
                      </Select>
                      <DialogTrigger>
                        <Button>Open appearance settings</Button>
                        <Popover
                          lang={overlayLang}
                          dir="rtl"
                          className={({ placement }) => `consumer-popover-${placement}`}
                        >
                          <Dialog aria-label="Appearance settings">
                            <Stack gap={3}>
                              <Button onPress={() => setLocale("fr-FR")}>Use French locale</Button>
                              <Button onPress={() => setLocale("ar-AE")}>Use Arabic locale</Button>
                              <Button onPress={() => setLang("de-DE")}>Use German language</Button>
                              <Button onPress={() => setLang("")}>Clear content language</Button>
                              <Button onPress={() => setAppearance("brand-b")}>Use brand B</Button>
                              <Button onPress={() => setAppearance("")}>Clear appearance</Button>
                              <Button onPress={() => setAppearance(undefined)}>
                                Inherit appearance
                              </Button>
                              <Button onPress={() => setTheme("g10")}>Use g10 theme</Button>
                              <TooltipTrigger defaultOpen>
                                <Button>Appearance hint</Button>
                                <Tooltip
                                  lang={overlayLang}
                                  dir="rtl"
                                  className={({ placement }) => `consumer-tooltip-${placement}`}
                                >
                                  {({ state }) => (state.isOpen ? "Live appearance hint" : null)}
                                </Tooltip>
                              </TooltipTrigger>
                            </Stack>
                          </Dialog>
                        </Popover>
                      </DialogTrigger>
                      <Button slot="close">Close appearance dialog</Button>
                    </Dialog>
                  </Modal>
                </DialogTrigger>
              </ToastProvider>
            </Layer>
          </Theme>
        </Layer>
      </Theme>
      <Theme
        theme="g10"
        locale="de-DE"
        appearanceClassName="brand-b"
        className="appearance-sibling"
      >
        <DialogTrigger>
          <Button>Open sibling popover</Button>
          <Popover>
            <Dialog aria-label="Sibling appearance">Independent brand B</Dialog>
          </Popover>
        </DialogTrigger>
      </Theme>
    </I18nProvider>
  );
}

function ModalPartContracts() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [enters, setEnters] = useState(0);
  const [exits, setExits] = useState(0);
  const [changes, setChanges] = useState<string[]>([]);
  return (
    <>
      <Button onPress={() => setOpen(true)}>Open parts dialog</Button>
      <output aria-label="Overlay clicks">{clicks}</output>
      <output aria-label="Modal lifecycle">{`${enters},${exits}`}</output>
      <output aria-label="Modal changes">{changes.join(",")}</output>
      <Modal
        isOpen={open}
        onOpenChange={(next) => {
          setOpen(next);
          setChanges((values) => [...values, String(next)]);
        }}
        isDismissable
        ref={modalRef}
        overlayRef={overlayRef}
        className={({ state }) => (state.isOpen ? "consumer-modal-open" : "consumer-modal-closed")}
        overlayClassName={({ state }) =>
          state.isOpen ? "consumer-overlay-open" : "consumer-overlay-closed"
        }
        style={({ state }) => ({ padding: state.isOpen ? "32px" : "16px" })}
        modalStyle={({ state }) => ({ maxWidth: state.isOpen ? "480px" : "400px" })}
        render={(domProps, { state }) => (
          <div {...domProps} data-custom-overlay={state.isOpen ? "open" : "closed"} />
        )}
        lang="fr-CA"
        data-consumer-part="overlay"
        onClick={() => setClicks((count) => count + 1)}
        onEnter={(element) => {
          element.dataset.enterTarget = "true";
          setEnters((count) => count + 1);
        }}
        onExit={() => setExits((count) => count + 1)}
      >
        {({ state }) => (
          <Dialog>
            <Heading slot="title">Modal parts</Heading>
            <Button
              onPress={() => {
                overlayRef.current?.setAttribute("data-overlay-ref", "true");
                modalRef.current?.setAttribute("data-modal-ref", "true");
              }}
            >
              Inspect part refs
            </Button>
            <Button onPress={() => state.close()}>Close via modal state</Button>
          </Dialog>
        )}
      </Modal>
    </>
  );
}

function UnscopedContracts() {
  return (
    <ToastProvider>
      <ToastAction />
      <DialogTrigger>
        <Button>Open unscoped dialog</Button>
        <Modal>
          <Dialog aria-label="Unscoped dialog">
            <DialogTrigger>
              <Button>Open unscoped popover</Button>
              <Popover>
                <Dialog aria-label="Unscoped popover">
                  <TooltipTrigger isOpen>
                    <Button>Unscoped hint</Button>
                    <Tooltip>Unscoped tooltip</Tooltip>
                  </TooltipTrigger>
                </Dialog>
              </Popover>
            </DialogTrigger>
          </Dialog>
        </Modal>
      </DialogTrigger>
    </ToastProvider>
  );
}

function App() {
  const params = new URLSearchParams(location.search);
  if (params.has("unscoped")) return <UnscopedContracts />;
  return (
    <Theme theme="white">
      <main style={{ padding: "2rem", maxWidth: "48rem" }}>
        <h1>Cinder public API contracts</h1>
        {params.has("portals") ? (
          <PortalContracts />
        ) : params.has("appearance") ? (
          <AppearanceContracts />
        ) : params.has("modal-parts") ? (
          <ModalPartContracts />
        ) : (
          <StateContracts />
        )}
      </main>
    </Theme>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
