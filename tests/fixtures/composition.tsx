import { useRef, useState, type ReactElement } from "react";
import { createRoot } from "react-dom/client";
import { CalendarDate, Time } from "@internationalized/date";
import { isThemeName } from "@cinder/tokens";
import {
  Button,
  CheckboxGroup,
  ComboBox,
  DateField,
  DatePicker,
  DateRangePicker,
  Dialog,
  Form,
  Icon,
  Input,
  ListBoxItem,
  NumberField,
  RadioGroup,
  SearchField,
  Select,
  Stack,
  Text,
  TextArea,
  TextField,
  Theme,
  TimeField,
  type Key,
} from "@cinder/react";

const choices = [
  { id: 1, name: "Reader", description: "Can view records" },
  { id: 2, name: "Writer", description: "Can edit records" },
  { id: 3, name: "Owner", description: "Managed by an administrator" },
];
type Choice = (typeof choices)[number];
const date = new CalendarDate(2026, 11, 12);
const range = { start: date, end: new CalendarDate(2026, 11, 16) };

function TextComposition() {
  const root = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const label = useRef<HTMLLabelElement>(null);
  const description = useRef<HTMLElement>(null);
  const help = useRef<HTMLDivElement>(null);
  const error = useRef<HTMLElement>(null);
  const [value, setValue] = useState("ab");
  const [events, setEvents] = useState<Record<string, string>>({});
  const [refs, setRefs] = useState("");
  const [saved, setSaved] = useState("");
  const record = (name: string, value: string) =>
    setEvents((current) => ({ ...current, [name]: value }));
  return (
    <Stack gap={5}>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(JSON.stringify([...new FormData(event.currentTarget)]));
        }}
      >
        <TextField.Root
          data-testid="composed-text"
          ref={root}
          slot="consumer-field"
          name="text"
          size="md"
          value={value}
          isInvalid={value.length < 3}
          validationBehavior="aria"
          onChange={(next) => {
            setValue(next);
            record("rootChange", `${typeof next}:${next}`);
          }}
          onFocus={(event) => record("rootFocus", event.currentTarget.tagName)}
          onClick={(event) => record("rootClick", event.currentTarget.tagName)}
          className={({ isInvalid }) => (isInvalid ? "consumer-invalid" : "consumer-valid")}
          style={({ isInvalid }) => ({ maxWidth: isInvalid ? 320 : 336 })}
          render={(domProps, { isInvalid }) => (
            <div {...domProps} data-custom-root={isInvalid ? "invalid" : "valid"} />
          )}
        >
          {({ isInvalid }) => (
            <>
              <TextField.Label ref={label} className="consumer-label">
                Composed text
              </TextField.Label>
              <TextField.Input
                ref={input}
                slot="consumer-input"
                data-testid="composed-text-input"
                data-leaf-only="input"
                placeholder="Leaf placeholder"
                spellCheck={false}
                className={({ isFocused }) => (isFocused ? "consumer-focused" : "consumer-resting")}
                style={({ isFocused }) => ({ paddingInlineStart: isFocused ? 19 : 13 })}
                onChange={(event) =>
                  record(
                    "leafChange",
                    `${event.currentTarget.tagName}:${event.currentTarget.value}`,
                  )
                }
                onInput={(event) =>
                  record("leafInput", `${event.currentTarget.tagName}:${event.currentTarget.value}`)
                }
                onFocus={(event) => record("leafFocus", event.currentTarget.tagName)}
                onClick={(event) => record("leafClick", event.currentTarget.tagName)}
                render={(domProps, { isFocused }) => (
                  <input {...domProps} data-custom-input={isFocused ? "focused" : "resting"} />
                )}
              />
              <TextField.Help ref={help} className="consumer-help" title="Native help wrapper">
                <TextField.Description ref={description} className="consumer-description">
                  Text guidance
                </TextField.Description>
                <TextField.ErrorMessage
                  ref={error}
                  elementType="div"
                  className={({ isInvalid }) =>
                    isInvalid ? "consumer-recovery" : "consumer-no-error"
                  }
                  style={({ isInvalid }) => ({ letterSpacing: isInvalid ? "0.5px" : "0px" })}
                  render={(domProps) => <div {...domProps} data-custom-error="true" />}
                >
                  {({ isInvalid }) => (isInvalid ? "Use at least three characters." : null)}
                </TextField.ErrorMessage>
              </TextField.Help>
              <output aria-label="Text child callback">{isInvalid ? "invalid" : "valid"}</output>
            </>
          )}
        </TextField.Root>
        <TextField.Input
          slot="consumer-leaf"
          aria-label="Detached leaf"
          name="detached"
          defaultValue="Local leaf"
          data-testid="detached-leaf"
        />
        <TextField.Root aria-label="Description slot override" isInvalid validationBehavior="aria">
          <TextField.Input />
          <TextField.Description slot="errorMessage" data-testid="overridden-description">
            Explicit error slot
          </TextField.Description>
        </TextField.Root>
        <TextField.Root slot={null} defaultValue="Independent root" data-testid="null-slot-root">
          <TextField.Label>Null-slot root</TextField.Label>
          <TextField.Control data-testid="text-control">
            <Input />
          </TextField.Control>
        </TextField.Root>
        <Button type="submit">Submit text composition</Button>
      </Form>
      <TextField
        label="Default text"
        description="Default text guidance"
        defaultValue="Default value"
        data-testid="default-text"
      />
      <Button
        onPress={() => {
          setRefs(
            JSON.stringify({
              root: root.current?.tagName,
              input: input.current?.tagName,
              label: label.current?.tagName,
              description: description.current?.tagName,
              help: help.current?.tagName,
              error: error.current?.tagName,
              containsInput: root.current?.contains(input.current),
              containsError: help.current?.contains(error.current),
            }),
          );
          input.current?.focus();
        }}
      >
        Inspect text refs
      </Button>
      <output aria-label="Text ref targets">{refs}</output>
      <output aria-label="Text events">{JSON.stringify(events)}</output>
      <output aria-label="Text value">{value}</output>
      <output aria-label="Text FormData">{saved}</output>
    </Stack>
  );
}

function AreaComposition() {
  const root = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const help = useRef<HTMLDivElement>(null);
  const [refs, setRefs] = useState("");
  const [native, setNative] = useState("");
  const [saved, setSaved] = useState("");
  return (
    <Stack gap={5}>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(JSON.stringify([...new FormData(event.currentTarget)]));
        }}
      >
        <TextArea.Root
          ref={root}
          name="note"
          defaultValue="Initial note"
          data-testid="composed-area"
        >
          <TextArea.Label>{0}</TextArea.Label>
          <TextArea.Description>{0}</TextArea.Description>
          <TextArea.Input
            ref={input}
            rows={2}
            className="consumer-area-input"
            onInput={(event) =>
              setNative(`${event.currentTarget.tagName}:${event.currentTarget.value}`)
            }
          />
          <TextArea.Help ref={help} data-testid="zero-help">
            {0}
            <TextArea.ErrorMessage />
          </TextArea.Help>
        </TextArea.Root>
        <Button type="submit">Submit area composition</Button>
      </Form>
      <TextArea label={0} description={0} defaultValue="Default note" data-testid="default-area" />
      <Button
        onPress={() => {
          setRefs(
            [
              root.current?.tagName,
              input.current?.tagName,
              help.current?.tagName,
              root.current?.contains(input.current),
            ].join(","),
          );
          input.current?.focus();
        }}
      >
        Inspect area refs
      </Button>
      <output aria-label="Area ref targets">{refs}</output>
      <output aria-label="Area native input">{native}</output>
      <output aria-label="Area FormData">{saved}</output>
    </Stack>
  );
}

function NumberComposition() {
  const root = useRef<HTMLDivElement>(null);
  const control = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const increment = useRef<HTMLButtonElement>(null);
  const [value, setValue] = useState(1.5);
  const [refs, setRefs] = useState("");
  const [saved, setSaved] = useState("");
  return (
    <Stack gap={5}>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(JSON.stringify([...new FormData(event.currentTarget)]));
        }}
      >
        <NumberField.Root
          ref={root}
          name="amount"
          minValue={1.25}
          maxValue={2}
          step={0.25}
          value={value}
          onChange={setValue}
          formatOptions={{ style: "currency", currency: "USD" }}
          size="sm"
          data-testid="composed-number"
        >
          <NumberField.Label>Composed amount</NumberField.Label>
          <NumberField.Description>Quarter-dollar steps</NumberField.Description>
          <NumberField.Control
            ref={control}
            data-testid="number-control"
            className={({ isFocusWithin }) =>
              isFocusWithin ? "consumer-control-focused" : "consumer-control-resting"
            }
          >
            <NumberField.Input ref={input} className="consumer-number-input" />
            <NumberField.Button slot="decrement" size="sm" aria-label="Decrease amount">
              −
            </NumberField.Button>
            <NumberField.Button
              ref={increment}
              slot="increment"
              size="sm"
              aria-label="Increase amount"
            >
              +
            </NumberField.Button>
          </NumberField.Control>
          <NumberField.Help>
            <NumberField.ErrorMessage />
          </NumberField.Help>
        </NumberField.Root>
        <Button type="submit">Submit amount composition</Button>
      </Form>
      <NumberField label="Default amount" defaultValue={2} data-testid="default-number" />
      <Button
        onPress={() => {
          setRefs(
            [
              root.current?.tagName,
              control.current?.tagName,
              input.current?.tagName,
              increment.current?.tagName,
              control.current?.contains(input.current),
              root.current?.contains(control.current),
            ].join(","),
          );
          input.current?.focus();
        }}
      >
        Inspect amount refs
      </Button>
      <output aria-label="Number ref targets">{refs}</output>
      <output aria-label="Number value">{`${typeof value}:${value}`}</output>
      <output aria-label="Number FormData">{saved}</output>
    </Stack>
  );
}

function SearchComposition() {
  const [value, setValue] = useState("Find me");
  const [clears, setClears] = useState(0);
  const [presses, setPresses] = useState(0);
  const [saved, setSaved] = useState("");
  return (
    <Stack gap={5}>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(JSON.stringify([...new FormData(event.currentTarget)]));
        }}
      >
        <SearchField.Root
          name="query"
          value={value}
          onChange={setValue}
          onClear={() => setClears((count) => count + 1)}
          data-testid="composed-search"
          className={({ isEmpty }) => (isEmpty ? "consumer-empty" : "consumer-query")}
        >
          <SearchField.Label>Composed search</SearchField.Label>
          <SearchField.Control data-testid="search-control">
            <Icon name="search" />
            <SearchField.Input
              placeholder="Leaf search placeholder"
              className="consumer-search-input"
            />
            <SearchField.ClearButton
              aria-label="Clear composed search"
              data-testid="search-clear"
              onPress={() => setPresses((count) => count + 1)}
            >
              <Icon name="close" />
            </SearchField.ClearButton>
          </SearchField.Control>
          <SearchField.Help>
            <SearchField.Description>Escape also clears the query.</SearchField.Description>
            <SearchField.ErrorMessage />
          </SearchField.Help>
        </SearchField.Root>
        <Button type="submit">Submit search composition</Button>
      </Form>
      <SearchField
        label="Default search"
        placeholder="Parent placeholder"
        inputProps={{ placeholder: "Raw override", className: "consumer-raw-search" }}
        data-testid="default-search"
      />
      <output aria-label="Search value">{value}</output>
      <output aria-label="Search clears">{clears}</output>
      <output aria-label="Clear button presses">{presses}</output>
      <output aria-label="Search FormData">{saved}</output>
    </Stack>
  );
}

function CollectionComposition() {
  const [single, setSingle] = useState<Key | null>(1);
  const [multiple, setMultiple] = useState<Key[]>([1]);
  const [combo, setCombo] = useState<Key[]>([1]);
  const [saved, setSaved] = useState("");
  const renderItem = (item: Choice) => (
    <ListBoxItem
      id={item.id}
      textValue={item.name}
      className={({ isSelected }) =>
        `react-aria-ListBoxItem ${isSelected ? "consumer-selected" : "consumer-unselected"}`
      }
    >
      {({ isSelected }) => (
        <>
          <Text slot="label">{item.name}</Text>
          <Text slot="description">{item.description}</Text>
          <span aria-hidden="true">{isSelected ? "Selected" : "Available"}</span>
        </>
      )}
    </ListBoxItem>
  );
  return (
    <Stack gap={5}>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(JSON.stringify([...new FormData(event.currentTarget)]));
        }}
      >
        <Select.Root<Choice>
          name="single"
          value={single}
          onChange={setSingle}
          disabledKeys={[3]}
          data-testid="composed-select"
          className={({ isOpen }) => (isOpen ? "consumer-open" : "consumer-closed")}
        >
          {({ isOpen }) => (
            <>
              <Select.Label>Composed role</Select.Label>
              <Select.Description>Choose access</Select.Description>
              <Select.Trigger data-testid="single-trigger">
                <Select.Value<Choice>>
                  {({ selectedText, selectedItems }) => (
                    <>
                      <span>{selectedText}</span>
                      <span aria-hidden="true" data-testid="single-value-items">
                        {JSON.stringify(selectedItems)}
                      </span>
                    </>
                  )}
                </Select.Value>
                <Icon name="chevronDown" />
              </Select.Trigger>
              <Select.Help>
                <Select.ErrorMessage />
              </Select.Help>
              <Select.Popover data-testid="single-popover">
                <Select.ListBox<Choice> items={choices} className={() => "consumer-listbox"}>
                  {renderItem}
                </Select.ListBox>
              </Select.Popover>
              <output aria-label="Select child callback">{isOpen ? "open" : "closed"}</output>
            </>
          )}
        </Select.Root>
        <Select.Root<Choice, "multiple">
          name="multiple"
          selectionMode="multiple"
          value={multiple}
          onChange={setMultiple}
          data-testid="composed-multiple-select"
        >
          <Select.Label>Composed multiple roles</Select.Label>
          <Select.Trigger data-testid="multiple-trigger">
            <Select.Value<Choice> />
            <Icon name="chevronDown" />
          </Select.Trigger>
          <Select.Help>
            <Select.Description>More than one role is allowed.</Select.Description>
            <Select.ErrorMessage />
          </Select.Help>
          <Select.Popover>
            <Select.ListBox<Choice> items={choices}>{renderItem}</Select.ListBox>
          </Select.Popover>
        </Select.Root>
        <ComboBox.Root<Choice, "multiple">
          name="combo"
          selectionMode="multiple"
          defaultItems={choices}
          value={combo}
          onChange={setCombo}
          disabledKeys={[3]}
          data-testid="composed-combo"
        >
          {({ isOpen }) => (
            <>
              <ComboBox.Label>Composed searchable roles</ComboBox.Label>
              <ComboBox.Description>Type to filter roles</ComboBox.Description>
              <ComboBox.Control>
                <ComboBox.Input className="consumer-combo-input" />
                <ComboBox.Trigger aria-label="Open searchable roles">
                  <Icon name="chevronDown" />
                </ComboBox.Trigger>
              </ComboBox.Control>
              <ComboBox.Value<Choice>>
                {({ selectedItems, selectedText }) => (
                  <>
                    <span>{selectedText}</span>
                    <span aria-hidden="true" data-testid="combo-value-items">
                      {JSON.stringify(selectedItems)}
                    </span>
                  </>
                )}
              </ComboBox.Value>
              <ComboBox.Help>
                <ComboBox.ErrorMessage />
              </ComboBox.Help>
              <ComboBox.Popover data-testid="combo-popover">
                <ComboBox.ListBox<Choice>>{renderItem}</ComboBox.ListBox>
              </ComboBox.Popover>
              <output aria-label="ComboBox child callback">{isOpen ? "open" : "closed"}</output>
            </>
          )}
        </ComboBox.Root>
        <Button type="submit">Submit collection composition</Button>
      </Form>
      <output aria-label="Single key">{`${typeof single}:${single}`}</output>
      <output aria-label="Multiple keys">
        {multiple.map((key) => `${typeof key}:${key}`).join(",")}
      </output>
      <output aria-label="ComboBox keys">
        {combo.map((key) => `${typeof key}:${key}`).join(",")}
      </output>
      <output aria-label="Collection FormData">{saved}</output>
    </Stack>
  );
}

function ValidationComposition() {
  const [saved, setSaved] = useState("");
  return (
    <Form
      validationBehavior="native"
      onSubmit={(event) => {
        event.preventDefault();
        setSaved(JSON.stringify([...new FormData(event.currentTarget)]));
      }}
    >
      <Stack gap={5}>
        <TextField.Root name="first" isRequired data-testid="native-first">
          <TextField.Label>First required field</TextField.Label>
          <TextField.Description>Text guidance stays visible.</TextField.Description>
          <TextField.Input />
          <TextField.Help>
            <TextField.ErrorMessage>
              {({ validationDetails, validationErrors }) =>
                validationDetails.valueMissing
                  ? "Enter the first field."
                  : validationErrors.join(" ")
              }
            </TextField.ErrorMessage>
          </TextField.Help>
        </TextField.Root>
        <CheckboxGroup.Root
          name="channels"
          isRequired
          data-testid="native-checkbox-group"
          style={{ maxWidth: 320 }}
        >
          {({ isInvalid }) => (
            <>
              <CheckboxGroup.Label>Notification channels</CheckboxGroup.Label>
              <CheckboxGroup.Description>Channel guidance stays visible.</CheckboxGroup.Description>
              <CheckboxGroup.Checkbox value="email">
                {({ isSelected }) => (
                  <>
                    <span>Email alerts</span>
                    <span aria-hidden="true">{isSelected ? "Enabled" : "Off"}</span>
                  </>
                )}
              </CheckboxGroup.Checkbox>
              <CheckboxGroup.Checkbox value="sms">SMS alerts</CheckboxGroup.Checkbox>
              <CheckboxGroup.Help>
                <CheckboxGroup.ErrorMessage elementType="div">
                  {({ validationErrors }) =>
                    `Choose at least one channel. Your workspace needs a notification route so that important changes can reach the team without requiring every individual option to be selected. ${validationErrors.join(" ")}`
                  }
                </CheckboxGroup.ErrorMessage>
              </CheckboxGroup.Help>
              <output aria-label="CheckboxGroup child callback">
                {isInvalid ? "invalid" : "valid"}
              </output>
            </>
          )}
        </CheckboxGroup.Root>
        <RadioGroup.Root
          name="delivery"
          isRequired
          data-testid="native-radio-group"
          style={{ maxWidth: 320 }}
        >
          <RadioGroup.Label>Delivery mode</RadioGroup.Label>
          <RadioGroup.Description>Delivery guidance stays visible.</RadioGroup.Description>
          <RadioGroup.Options className="consumer-options" data-testid="radio-options">
            <RadioGroup.Radio value="immediate">Immediate delivery</RadioGroup.Radio>
            <RadioGroup.Radio value="quiet">Quiet delivery</RadioGroup.Radio>
          </RadioGroup.Options>
          <RadioGroup.Help>
            <RadioGroup.ErrorMessage elementType="div">
              {({ validationErrors }) =>
                `Choose one delivery mode. The choice applies to the group, not to every option, and this longer recovery message must remain visible without clipping or a fixed error height. ${validationErrors.join(" ")}`
              }
            </RadioGroup.ErrorMessage>
          </RadioGroup.Help>
        </RadioGroup.Root>
        <Button type="submit">Validate composed groups</Button>
        <output aria-label="Validation FormData">{saved}</output>
      </Stack>
    </Form>
  );
}

function DateComposition() {
  const root = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLDivElement>(null);
  const day = useRef<HTMLSpanElement>(null);
  const [refs, setRefs] = useState("");
  const [saved, setSaved] = useState("");
  return (
    <Stack gap={5}>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(JSON.stringify([...new FormData(event.currentTarget)]));
        }}
      >
        <DateField
          label="Default date"
          name="default-date"
          defaultValue={date}
          data-testid="default-date"
        />
        <TimeField
          label="Default time"
          name="default-time"
          hourCycle={24}
          defaultValue={new Time(10, 30)}
          data-testid="default-time"
        />
        <DatePicker
          label="Default picker"
          name="default-picker"
          defaultValue={date}
          data-testid="default-picker"
        />
        <DateRangePicker
          label="Default range"
          startName="default-start"
          endName="default-end"
          defaultValue={range}
          data-testid="default-range"
        />
        <DateField.Root<CalendarDate>
          ref={root}
          name="date"
          defaultValue={date}
          data-testid="composed-date"
        >
          {({ state }) => (
            <>
              <DateField.Label>Composed date</DateField.Label>
              <DateField.Description>Date guidance</DateField.Description>
              <DateField.Input
                ref={input}
                className={({ isFocusWithin }) =>
                  isFocusWithin ? "consumer-date-focused" : "consumer-date-resting"
                }
              >
                {(segment) => (
                  <DateField.Segment
                    ref={segment.type === "day" ? day : undefined}
                    segment={segment}
                    className={`react-aria-DateSegment consumer-segment-${segment.type}`}
                  >
                    {({ text }) => <b>{text}</b>}
                  </DateField.Segment>
                )}
              </DateField.Input>
              <DateField.Help>
                <DateField.ErrorMessage />
              </DateField.Help>
              <output aria-label="Date child callback">{state.value?.toString()}</output>
            </>
          )}
        </DateField.Root>
        <TimeField.Root<Time>
          name="time"
          hourCycle={24}
          defaultValue={new Time(10, 30)}
          data-testid="composed-time"
        >
          <TimeField.Label>Composed time</TimeField.Label>
          <TimeField.Input>
            {(segment) => (
              <TimeField.Segment segment={segment}>{({ text }) => <b>{text}</b>}</TimeField.Segment>
            )}
          </TimeField.Input>
          <TimeField.Help>
            <TimeField.Description>Time guidance</TimeField.Description>
            <TimeField.ErrorMessage />
          </TimeField.Help>
        </TimeField.Root>
        <DatePicker.Root<CalendarDate>
          name="picker"
          defaultValue={date}
          data-testid="composed-picker"
        >
          {({ isOpen }) => (
            <>
              <DatePicker.Label>Composed picker</DatePicker.Label>
              <DatePicker.Description>Picker guidance</DatePicker.Description>
              <DatePicker.Control data-testid="picker-control">
                <DatePicker.Input className="consumer-picker-input">
                  {(segment) => <DatePicker.Segment segment={segment} />}
                </DatePicker.Input>
                <DatePicker.Trigger aria-label="Open composed date">
                  <Icon name="calendar" />
                </DatePicker.Trigger>
              </DatePicker.Control>
              <DatePicker.Help>
                <DatePicker.ErrorMessage />
              </DatePicker.Help>
              <DatePicker.Popover data-testid="date-popover">
                <Dialog aria-label="Composed date calendar">
                  <DatePicker.Calendar />
                </Dialog>
              </DatePicker.Popover>
              <output aria-label="Picker child callback">{isOpen ? "open" : "closed"}</output>
            </>
          )}
        </DatePicker.Root>
        <DateRangePicker.Root<CalendarDate>
          startName="start"
          endName="end"
          defaultValue={range}
          data-testid="composed-range"
        >
          <DateRangePicker.Label>Composed range</DateRangePicker.Label>
          <DateRangePicker.Description>Range guidance</DateRangePicker.Description>
          <DateRangePicker.Control data-testid="range-control">
            <DateRangePicker.Input slot="start" className="consumer-range-start">
              {(segment) => (
                <DateRangePicker.Segment segment={segment}>
                  {({ text }) => <b>{text}</b>}
                </DateRangePicker.Segment>
              )}
            </DateRangePicker.Input>
            <span aria-hidden="true">–</span>
            <DateRangePicker.Input slot="end" className="consumer-range-end">
              {(segment) => <DateRangePicker.Segment segment={segment} />}
            </DateRangePicker.Input>
            <DateRangePicker.Trigger aria-label="Open composed range">
              <Icon name="calendar" />
            </DateRangePicker.Trigger>
          </DateRangePicker.Control>
          <DateRangePicker.Help>
            <DateRangePicker.ErrorMessage />
          </DateRangePicker.Help>
          <DateRangePicker.Popover data-testid="range-popover">
            <Dialog aria-label="Composed range calendar">
              <DateRangePicker.Calendar />
            </Dialog>
          </DateRangePicker.Popover>
        </DateRangePicker.Root>
        <Button type="submit">Submit date composition</Button>
      </Form>
      <DatePicker.Root<CalendarDate>
        aria-label="Picker context owner"
        isDisabled
        defaultValue={date}
        data-testid="date-context-owner"
      >
        <DateField.Root<CalendarDate>
          defaultValue={new CalendarDate(2026, 11, 7)}
          data-testid="inherited-date-root"
        >
          <DateField.Label>Inherited date root</DateField.Label>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Root>
        <DateField.Root<CalendarDate>
          slot={null}
          defaultValue={new CalendarDate(2026, 11, 7)}
          data-testid="null-slot-date-root"
        >
          <DateField.Label>Independent date root</DateField.Label>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Root>
      </DatePicker.Root>
      <Button
        onPress={() => {
          setRefs(
            [
              root.current?.tagName,
              input.current?.tagName,
              day.current?.tagName,
              root.current?.contains(input.current),
              input.current?.contains(day.current),
            ].join(","),
          );
          day.current?.focus();
        }}
      >
        Inspect date refs
      </Button>
      <output aria-label="Date ref targets">{refs}</output>
      <output aria-label="Date FormData">{saved}</output>
    </Stack>
  );
}

const fixtures: Record<string, () => ReactElement> = {
  text: TextComposition,
  area: AreaComposition,
  number: NumberComposition,
  search: SearchComposition,
  collections: CollectionComposition,
  validation: ValidationComposition,
  dates: DateComposition,
};

function App() {
  const parameters = new URLSearchParams(location.search);
  const requested = parameters.get("theme");
  const theme = isThemeName(requested) ? requested : "frame-light";
  const Fixture = fixtures[parameters.get("case") ?? "text"] ?? TextComposition;
  return (
    <Theme theme={theme} locale="en-US">
      <main style={{ padding: "2rem", maxWidth: "52rem", minHeight: "100vh" }}>
        <h1>Cinder composed fields</h1>
        <Fixture />
      </main>
    </Theme>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
