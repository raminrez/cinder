import { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { CalendarDate, Time } from "@internationalized/date";
import { isThemeName } from "@cinder/tokens";
import {
  Accordion,
  AccordionItem,
  Button,
  Calendar,
  Checkbox,
  CheckboxGroup,
  CodeSnippet,
  ComboBox,
  ContentSwitcher,
  DateField,
  DatePicker,
  DateRangePicker,
  FieldError,
  Form,
  Group,
  Icon,
  Input,
  InlineNotification,
  Label,
  ListBoxItem,
  NumberField,
  Radio,
  RadioGroup,
  RangeCalendar,
  SearchField,
  Select,
  Slider,
  Stack,
  Switch,
  Text,
  TextArea,
  TextField,
  Theme,
  TimeField,
  ToastProvider,
  ToggleButton,
  useToast,
  type ButtonVariant,
  type Key,
} from "@cinder/react";

const variants: ButtonVariant[] = [
  "primary",
  "secondary",
  "tertiary",
  "ghost",
  "danger",
  "danger-tertiary",
  "danger-ghost",
];
const date = new CalendarDate(2026, 11, 12);
const fieldContent = {
  description: "Field guidance",
  errorMessage: "Field recovery",
  isInvalid: true,
};
const choices = [
  { id: 1, name: "Reader", description: "Can view records" },
  { id: 2, name: "Writer", description: "Can edit records" },
];

function InactiveButtonContracts() {
  const [presses, setPresses] = useState(0);
  return (
    <Stack gap={4}>
      {(["disabled", "pending"] as const).map((state) => (
        <div
          key={state}
          data-fixture={`${state}-buttons`}
          style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
        >
          {variants.map((variant) => (
            <Button
              key={variant}
              variant={variant}
              aria-label={`${state} variant ${variant}`}
              isDisabled={state === "disabled"}
              isPending={state === "pending"}
              pendingLabel={`Pending ${variant}`}
              onPress={() => setPresses((count) => count + 1)}
            >
              <span>Action</span>
              <Icon name="arrowRight" />
            </Button>
          ))}
        </div>
      ))}
      <output aria-label="Inactive button presses">{presses}</output>
    </Stack>
  );
}

function FieldPartContracts() {
  const textRoot = useRef<HTMLDivElement>(null);
  const textInput = useRef<HTMLInputElement>(null);
  const areaRoot = useRef<HTMLDivElement>(null);
  const areaInput = useRef<HTMLTextAreaElement>(null);
  const action = useRef<HTMLButtonElement>(null);
  const [refTargets, setRefTargets] = useState("");
  const [text, setText] = useState("Initial text");
  const [search, setSearch] = useState("");
  const [single, setSingle] = useState<Key | null>(1);
  const [multiple, setMultiple] = useState<Key[]>([1]);
  const [submission, setSubmission] = useState("");
  const [presses, setPresses] = useState(0);
  const [pending, setPending] = useState(false);
  return (
    <Stack gap={6}>
      <section data-fixture="default-field-parts" style={{ display: "grid", gap: "1rem" }}>
        <TextField
          {...fieldContent}
          data-field="text"
          label={0}
          description={0}
          ref={textRoot}
          inputRef={textInput}
          value={text}
          onChange={setText}
          className={({ isInvalid }) => (isInvalid ? "consumer-invalid" : "consumer-valid")}
          style={{ maxWidth: 320 }}
        />
        <TextArea
          {...fieldContent}
          data-field="area"
          label="Part area"
          ref={areaRoot}
          inputRef={areaInput}
          defaultValue="Initial note"
          className="consumer-area"
          style={{ maxWidth: 336 }}
        />
        <NumberField {...fieldContent} data-field="number" label="Part number" defaultValue={3} />
        <SearchField
          {...fieldContent}
          data-field="search"
          label="Part search"
          placeholder="Parent placeholder"
          value={search}
          onChange={setSearch}
          inputProps={{
            placeholder: "Input placeholder",
            className: "consumer-search",
            style: { paddingInlineStart: 17 },
          }}
        />
        <CheckboxGroup {...fieldContent} data-field="checkbox" label="Part checkboxes">
          <Checkbox value="one">One choice</Checkbox>
        </CheckboxGroup>
        <RadioGroup {...fieldContent} data-field="radio" label="Part radios">
          <Radio value="one">One option</Radio>
        </RadioGroup>
        <Select
          {...fieldContent}
          data-field="select"
          label="Part select"
          items={choices}
          value={single}
          onChange={setSingle}
        >
          {(item) => (
            <ListBoxItem id={item.id} textValue={item.name}>
              <Text slot="label">{item.name}</Text>
              <Text slot="description">{item.description}</Text>
            </ListBoxItem>
          )}
        </Select>
        <ComboBox
          {...fieldContent}
          data-field="combobox"
          label="Part combobox"
          defaultItems={choices}
        >
          {(item) => <ListBoxItem id={item.id}>{item.name}</ListBoxItem>}
        </ComboBox>
        <DatePicker {...fieldContent} data-field="date-picker" label="Part date picker" />
        <DateRangePicker {...fieldContent} data-field="date-range" label="Part date range" />
        <DateField {...fieldContent} data-field="date" label="Part date" defaultValue={date} />
        <TimeField
          {...fieldContent}
          data-field="time"
          label="Part time"
          defaultValue={new Time(10, 30)}
        />
      </section>
      <Checkbox isInvalid data-fixture="standalone-invalid-checkbox">
        Standalone invalid choice
      </Checkbox>
      <CheckboxGroup isInvalid isDisabled aria-label="Disabled invalid choices">
        <Checkbox value="one" data-fixture="disabled-invalid-checkbox">
          Disabled choice
        </Checkbox>
      </CheckboxGroup>
      <RadioGroup isInvalid isDisabled aria-label="Disabled invalid options">
        <Radio value="one" data-fixture="disabled-invalid-radio">
          Disabled option
        </Radio>
      </RadioGroup>
      <Button
        onPress={() => {
          setRefTargets(
            [
              textRoot.current?.tagName,
              textInput.current?.tagName,
              textRoot.current === textInput.current?.parentElement,
              areaRoot.current?.tagName,
              areaInput.current?.tagName,
              areaRoot.current === areaInput.current?.parentElement,
            ].join(","),
          );
          textInput.current?.focus();
        }}
      >
        Check field refs
      </Button>
      <Button onPress={() => areaInput.current?.focus()}>Focus area control</Button>
      <output aria-label="Field ref targets">{refTargets}</output>
      <output aria-label="Controlled text">{text}</output>
      <output aria-label="Controlled search">{search}</output>
      <output aria-label="Numeric single value">{`${typeof single}:${single}`}</output>
      <Select<(typeof choices)[number], "multiple">
        label="Numeric multiple"
        items={choices}
        selectionMode="multiple"
        value={multiple}
        onChange={setMultiple}
      >
        {(item) => <ListBoxItem id={item.id}>{item.name}</ListBoxItem>}
      </Select>
      <output aria-label="Numeric multiple values">
        {multiple.map((key) => `${typeof key}:${key}`).join(",")}
      </output>
      <TextField
        data-fixture="custom-field"
        label="Unused label"
        description="Unused guidance"
        errorMessage="Unused recovery"
        isInvalid
      >
        {({ isInvalid }) => (
          <>
            <Label className="consumer-label">
              {isInvalid ? "Custom invalid field" : "Custom field"}
            </Label>
            <Input className="consumer-input" />
            <Text className="consumer-description" slot="description">
              Consumer guidance
            </Text>
            <FieldError className="consumer-error">Consumer recovery</FieldError>
          </>
        )}
      </TextField>
      <NumberField aria-label="Legacy composed number" isInvalid defaultValue={1}>
        <Group className="cinder-input-group">
          <Input />
        </Group>
      </NumberField>
      <TextField isDisabled defaultValue="Unavailable" data-fixture="legacy-disabled-field">
        <Label>Legacy disabled field</Label>
        <Input />
        <Text slot="description">Workspace owners can change this value.</Text>
      </TextField>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmission([...new FormData(event.currentTarget).values()].join("|"));
        }}
      >
        <TextField label="Native required" name="native" description="Native guidance" isRequired />
        <TextArea
          label="Custom required"
          name="custom"
          description="Custom guidance"
          isRequired
          errorMessage={({ validationDetails }) =>
            validationDetails.valueMissing ? "Add a note." : "Check the note."
          }
        />
        <Button type="submit">Validate fields</Button>
        <output aria-label="Submitted fields">{submission}</output>
      </Form>
      <div
        data-fixture="button-sizes"
        style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "1rem" }}
      >
        <Button
          ref={action}
          aria-label="Omitted size"
          isPending={pending}
          pendingLabel="Saving contract"
          className={({ isPending }) => (isPending ? "consumer-pending" : "consumer-ready")}
          render={(domProps) => <button {...domProps} data-custom-render="true" />}
          onPress={() => {
            setPresses((count) => count + 1);
            setPending(true);
          }}
        >
          {({ isPending }) => (isPending ? "Working" : "Run action")}
        </Button>
        <Button size={undefined}>Undefined size</Button>
        {(["sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
          <Button key={size} size={size}>
            {size}
          </Button>
        ))}
      </div>
      <Button onPress={() => action.current?.focus()}>Focus omitted action</Button>
      <output aria-label="Pending press count">{presses}</output>
    </Stack>
  );
}

function ToastExample() {
  const toast = useToast();
  return (
    <Button
      onPress={() =>
        toast.add({
          title: "Visual contract toast",
          description: "Saved locally.",
          kind: "success",
        })
      }
    >
      Show contract toast
    </Button>
  );
}

function App() {
  const parameters = new URLSearchParams(location.search);
  const requested = parameters.get("theme");
  const theme = isThemeName(requested) ? requested : "white";
  if (parameters.has("field-parts")) {
    return (
      <Theme theme={theme} locale="en-US">
        <main style={{ padding: "2rem", maxWidth: "52rem" }}>
          <h1>Cinder field part contracts</h1>
          <FieldPartContracts />
        </main>
      </Theme>
    );
  }
  return (
    <Theme theme={theme} locale="en-US">
      <ToastProvider>
        <main style={{ padding: "2rem", maxWidth: "52rem" }}>
          <h1>Cinder visual contracts</h1>
          <Stack gap={7}>
            <div
              data-fixture="ready-buttons"
              style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
            >
              {variants.map((variant) => (
                <Button key={variant} variant={variant} aria-label={variant}>
                  <span>Action</span>
                  <Icon name="arrowRight" />
                </Button>
              ))}
              <Button variant="ghost" iconOnly aria-label="Icon ghost">
                <Icon name="plus" />
              </Button>
              <Button variant="ghost" isDisabled>
                Disabled ghost
              </Button>
            </div>
            <InactiveButtonContracts />
            {(["sm", "md", "lg"] as const).map((size) => (
              <section key={size} data-density={size}>
                <Accordion size={size} defaultExpandedKeys={["first"]}>
                  <AccordionItem id="first" title={`${size} first item`}>
                    Panel content
                  </AccordionItem>
                  <AccordionItem id="second" title={`${size} second item`}>
                    Other content
                  </AccordionItem>
                </Accordion>
                <ContentSwitcher
                  size={size}
                  aria-label={`${size} view`}
                  defaultSelectedKeys={["first"]}
                  style={{ width: "360px" }}
                >
                  <ToggleButton id="first">A</ToggleButton>
                  <ToggleButton id="second">A longer label</ToggleButton>
                  <ToggleButton id="third">Last</ToggleButton>
                </ContentSwitcher>
              </section>
            ))}
            <ToggleButton aria-label="Standalone toggle">Standalone</ToggleButton>
            {(["ltr", "rtl"] as const).map((direction) => (
              <Theme key={direction} theme={theme} locale={direction === "rtl" ? "ar-AE" : "en-US"}>
                {(["sm", "md"] as const).map((size) => (
                  <Switch key={size} size={size} data-fixture={`toggle-${size}-${direction}`}>
                    {size} {direction} toggle
                  </Switch>
                ))}
              </Theme>
            ))}
            <Slider label="Single geometry" defaultValue={50} />
            <Slider
              label="Range geometry"
              defaultValue={[25, 75]}
              thumbLabels={["Lower geometry", "Upper geometry"]}
            />
            <TextField label="Type label" description="Type helper" />
            <CodeSnippet label="Type specimen" copyable={false}>
              {"const cinder = true;"}
            </CodeSnippet>
            {(["info", "success", "warning", "error"] as const).map((kind) => (
              <section key={kind}>
                <InlineNotification kind={kind} title={`${kind} low`} onDismiss={() => {}} />
                <InlineNotification
                  kind={kind}
                  title={`${kind} inverse`}
                  lowContrast={false}
                  onDismiss={() => {}}
                />
              </section>
            ))}
            <ToastExample />
            <Calendar aria-label="Single contract date" defaultValue={date} />
            <RangeCalendar
              aria-label="Range contract dates"
              defaultValue={{ start: date, end: new CalendarDate(2026, 11, 16) }}
            />
          </Stack>
        </main>
      </ToastProvider>
    </Theme>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
