import { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Button,
  Checkbox,
  ComboBox,
  Dialog,
  DialogTrigger,
  FieldError,
  Form,
  Heading,
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
  Tooltip,
  TooltipTrigger,
  type Key,
  type ThemeName,
} from "@cinder/react";

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
          <option>white</option>
          <option>g10</option>
          <option>g90</option>
          <option>g100</option>
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

function App() {
  const portals = new URLSearchParams(location.search).has("portals");
  return (
    <Theme theme="white">
      <main style={{ padding: "2rem", maxWidth: "48rem" }}>
        <h1>Cinder public API contracts</h1>
        {portals ? <PortalContracts /> : <StateContracts />}
      </main>
    </Theme>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
