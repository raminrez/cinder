import { useRef, useState, type ChangeEvent, type ComponentProps, type Ref } from "react";
import { CalendarDate, Time } from "@internationalized/date";
import {
  DateInput as AriaDateInput,
  FieldError as AriaFieldError,
  Group as AriaGroup,
  Input as AriaInput,
  Label as AriaLabel,
  TextArea as AriaTextArea,
  TextFieldContext,
  type InputProps as AriaInputProps,
  type TextFieldProps as AriaTextFieldProps,
} from "react-aria-components";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  ComboBox,
  DateField,
  DatePicker,
  DateRangePicker,
  Dialog,
  FieldError,
  Form,
  Icon,
  Input,
  Label,
  ListBoxItem,
  NumberField,
  Radio,
  RadioGroup,
  SearchField,
  Select,
  Text,
  TextArea,
  TextField,
  Theme,
  TimeField,
  type ComboBoxRootProps,
  type FieldDateInputProps,
  type FieldInputProps,
  type Key,
  type SelectRootProps,
} from "@cinder/react";

interface Choice {
  id: number;
  name: string;
  description: string;
}

const choices: Choice[] = [
  { id: 1, name: "Reader", description: "Can view records" },
  { id: 2, name: "Writer", description: "Can edit records" },
];
const initialDate = new CalendarDate(2026, 11, 12);
const initialRange = { start: initialDate, end: new CalendarDate(2026, 11, 16) };

function renderChoice(item: Choice) {
  return (
    <ListBoxItem
      id={item.id}
      textValue={item.name}
      className={({ isSelected }) =>
        `react-aria-ListBoxItem ${isSelected ? "consumer-selected" : "consumer-option"}`
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
}

export function CompositionConsumer({
  theme = "frame-light",
}: { theme?: "frame-light" | "frame-dark" } = {}) {
  const [text, setText] = useState("Workspace");
  const [amount, setAmount] = useState(1.5);
  const [search, setSearch] = useState("");
  const [channels, setChannels] = useState<string[]>([]);
  const [delivery, setDelivery] = useState("immediate");
  const [single, setSingle] = useState<Key | null>(1);
  const [multiple, setMultiple] = useState<Key[]>([1]);
  const [comboSingle, setComboSingle] = useState<Key | null>(1);
  const [comboMultiple, setComboMultiple] = useState<Key[]>([1]);
  const [query, setQuery] = useState("Reader");
  const [date, setDate] = useState<CalendarDate | null>(initialDate);
  const [time, setTime] = useState<Time | null>(new Time(10, 30));
  const [range, setRange] = useState<{
    start: CalendarDate;
    end: CalendarDate;
  } | null>(initialRange);
  const [nativeInput, setNativeInput] = useState("");
  const [saved, setSaved] = useState("");
  const [refs, setRefs] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const area = useRef<HTMLTextAreaElement>(null);
  const label = useRef<HTMLLabelElement>(null);
  const description = useRef<HTMLElement>(null);
  const help = useRef<HTMLDivElement>(null);
  const error = useRef<HTMLElement>(null);
  const numberControl = useRef<HTMLDivElement>(null);
  const numberButton = useRef<HTMLButtonElement>(null);
  const checkboxLabel = useRef<HTMLLabelElement>(null);
  const checkboxInput = useRef<HTMLInputElement>(null);
  const radioLabel = useRef<HTMLLabelElement>(null);
  const radioInput = useRef<HTMLInputElement>(null);
  const radioOptions = useRef<HTMLDivElement>(null);
  const selectTrigger = useRef<HTMLButtonElement>(null);
  const selectValue = useRef<HTMLSpanElement>(null);
  const selectList = useRef<HTMLDivElement>(null);
  const selectPopover = useRef<HTMLDivElement>(null);
  const comboInput = useRef<HTMLInputElement>(null);
  const comboControl = useRef<HTMLDivElement>(null);
  const comboValue = useRef<HTMLDivElement>(null);
  const dateRoot = useRef<HTMLDivElement>(null);
  const dateInput = useRef<HTMLDivElement>(null);
  const dateSegment = useRef<HTMLSpanElement>(null);
  const pickerInput = useRef<HTMLDivElement>(null);
  const pickerTrigger = useRef<HTMLButtonElement>(null);
  const rangeStart = useRef<HTMLDivElement>(null);
  const rangeEnd = useRef<HTMLDivElement>(null);

  const rootProps: AriaTextFieldProps = {
    name: "workspace",
    value: text,
    onChange: setText,
    minLength: 3,
    isRequired: true,
    validationBehavior: "aria",
    isInvalid: text.length < 3,
    onFocus: (event) => setNativeInput(event.currentTarget.tagName),
  };
  const inputProps: AriaInputProps = {
    slot: "consumer-input",
    placeholder: "Workspace name",
    spellCheck: false,
    inputMode: "text",
    onChange: (event) => setNativeInput(event.currentTarget.value),
    onInput: (event) => setNativeInput(event.currentTarget.value),
    className: ({ isFocused }) => (isFocused ? "consumer-focused" : "consumer-resting"),
    style: ({ isFocused }) => ({ paddingInlineStart: isFocused ? 20 : 16 }),
    render: (domProps, { isFocused }) => (
      <input {...domProps} data-consumer-focus={isFocused ? "focused" : "resting"} />
    ),
  };

  return (
    <Theme theme={theme} locale="en-US">
      <Form
        validationBehavior="native"
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(JSON.stringify([...new FormData(event.currentTarget)]));
        }}
      >
        <TextField.Root
          {...rootProps}
          ref={root}
          size="sm"
          className={({ isInvalid }) => (isInvalid ? "consumer-invalid" : "consumer-valid")}
          style={({ isInvalid }) => ({ maxWidth: isInvalid ? 320 : 336 })}
          onClick={(event) => setNativeInput(event.currentTarget.tagName)}
          render={(domProps, { isInvalid }) => (
            <div {...domProps} data-consumer-validation={isInvalid ? "invalid" : "valid"} />
          )}
        >
          {({ isInvalid, isRequired }) => (
            <>
              <TextField.Label
                ref={label}
                className="consumer-label"
                render={(domProps) => <label {...domProps} htmlFor={domProps.htmlFor} />}
              >
                Workspace {isRequired ? "(required)" : ""}
              </TextField.Label>
              <TextField.Input {...inputProps} ref={input} />
              <TextField.Help ref={help} title="Workspace guidance" className="consumer-help">
                <TextField.Description
                  ref={description}
                  elementType="p"
                  className="consumer-description"
                  style={{ marginBlock: 0 }}
                >
                  This name appears in invitations.
                </TextField.Description>
                <TextField.ErrorMessage
                  ref={error}
                  elementType="div"
                  className={({ isInvalid }) => (isInvalid ? "consumer-error" : "consumer-valid")}
                  style={({ isInvalid }) => ({ letterSpacing: isInvalid ? "0.5px" : "0px" })}
                  render={(domProps) => <div {...domProps} />}
                >
                  {({ validationDetails, validationErrors }) =>
                    validationDetails.tooShort
                      ? "Use at least three characters."
                      : validationErrors.join(" ")
                  }
                </TextField.ErrorMessage>
              </TextField.Help>
              <output>{isInvalid ? "Needs attention" : "Ready"}</output>
            </>
          )}
        </TextField.Root>
        <TextFieldContext.Provider value={{ isDisabled: true, value: "Parent-owned value" }}>
          <TextField.Root slot={null} defaultValue="Independent value">
            <TextField.Label>Independent root</TextField.Label>
            <TextField.Control
              className={({ isFocusWithin }) =>
                isFocusWithin ? "consumer-focus" : "consumer-control"
              }
              style={({ isFocusWithin }) => ({ outlineOffset: isFocusWithin ? 4 : 2 })}
              render={(domProps) => <div {...domProps} />}
            >
              <Input slot="native-input" />
            </TextField.Control>
            <TextField.Help>
              <TextField.Description slot="description">Local context only.</TextField.Description>
              <TextField.ErrorMessage />
            </TextField.Help>
          </TextField.Root>
        </TextFieldContext.Provider>

        <TextArea.Root
          name="notes"
          defaultValue="Initial note"
          className={({ isInvalid }) => (isInvalid ? "consumer-invalid" : "consumer-area")}
        >
          <TextArea.Label>{0}</TextArea.Label>
          <TextArea.Description>{0}</TextArea.Description>
          <TextArea.Input
            ref={area}
            slot="native-area"
            rows={3}
            wrap="soft"
            onInput={(event) => setNativeInput(event.currentTarget.value)}
            className={({ isFocused }) => (isFocused ? "consumer-focused" : "consumer-area-input")}
            style={({ isFocused }) => ({ minHeight: isFocused ? 96 : 80 })}
            render={(domProps) => <textarea {...domProps} />}
          />
          <TextArea.Help>
            {0}
            <TextArea.ErrorMessage />
          </TextArea.Help>
        </TextArea.Root>

        <NumberField.Root
          name="amount"
          value={amount}
          onChange={setAmount}
          minValue={0}
          maxValue={10}
          step={0.5}
          formatOptions={{ style: "currency", currency: "USD" }}
          size="md"
        >
          <NumberField.Label>Amount</NumberField.Label>
          <NumberField.Description>Half-dollar steps</NumberField.Description>
          <NumberField.Control
            ref={numberControl}
            className={({ isFocusWithin }) =>
              isFocusWithin ? "consumer-focus" : "consumer-control"
            }
          >
            <NumberField.Input onChange={(event) => setNativeInput(event.currentTarget.value)} />
            <NumberField.Button slot="decrement" aria-label="Decrease amount">
              −
            </NumberField.Button>
            <NumberField.Button ref={numberButton} slot="increment" aria-label="Increase amount">
              +
            </NumberField.Button>
          </NumberField.Control>
          <NumberField.Help>
            <NumberField.ErrorMessage />
          </NumberField.Help>
        </NumberField.Root>

        <SearchField.Root
          name="search"
          value={search}
          onChange={setSearch}
          onClear={() => setNativeInput("cleared")}
        >
          {({ isEmpty }) => (
            <>
              <SearchField.Label>Search</SearchField.Label>
              <SearchField.Control>
                <SearchField.Input
                  placeholder="Filter workspaces"
                  onInput={(event) => setNativeInput(event.currentTarget.value)}
                />
                <SearchField.ClearButton
                  aria-label="Clear search"
                  onPress={(event) => setNativeInput(event.pointerType)}
                >
                  <Icon name="close" />
                </SearchField.ClearButton>
              </SearchField.Control>
              <SearchField.Help>
                <SearchField.Description>Escape clears the query.</SearchField.Description>
                <SearchField.ErrorMessage />
              </SearchField.Help>
              <output>{isEmpty ? "No query" : search}</output>
            </>
          )}
        </SearchField.Root>

        <TextField.Root name="native" isRequired validationBehavior="native">
          <TextField.Label>Native required text</TextField.Label>
          <TextField.Description>Required text guidance stays visible.</TextField.Description>
          <TextField.Input />
          <TextField.Help>
            <TextField.ErrorMessage>Enter the required text.</TextField.ErrorMessage>
          </TextField.Help>
        </TextField.Root>

        <CheckboxGroup.Root name="channels" isRequired value={channels} onChange={setChannels}>
          {({ isInvalid }) => (
            <>
              <CheckboxGroup.Label>Channels</CheckboxGroup.Label>
              <CheckboxGroup.Description>Choose at least one channel.</CheckboxGroup.Description>
              <CheckboxGroup.Checkbox
                ref={checkboxLabel}
                inputRef={checkboxInput}
                value="email"
                className={({ isSelected }) =>
                  isSelected ? "consumer-selected" : "consumer-option"
                }
              >
                {({ isSelected }) => (isSelected ? "Email enabled" : "Email")}
              </CheckboxGroup.Checkbox>
              <CheckboxGroup.Checkbox value="sms">SMS</CheckboxGroup.Checkbox>
              <CheckboxGroup.Help>
                <CheckboxGroup.ErrorMessage>
                  {({ validationErrors }) => validationErrors.join(" ")}
                </CheckboxGroup.ErrorMessage>
              </CheckboxGroup.Help>
              <output>{isInvalid ? "Choose a channel" : "Ready"}</output>
            </>
          )}
        </CheckboxGroup.Root>
        <RadioGroup.Root
          name="delivery"
          isRequired
          value={delivery}
          onChange={setDelivery}
          orientation="horizontal"
        >
          <RadioGroup.Label>Delivery</RadioGroup.Label>
          <RadioGroup.Description>Choose one mode.</RadioGroup.Description>
          <RadioGroup.Options
            ref={radioOptions}
            className="consumer-options"
            onClick={(event) => setNativeInput(event.currentTarget.tagName)}
          >
            <RadioGroup.Radio ref={radioLabel} inputRef={radioInput} value="immediate">
              {({ isSelected }) => (isSelected ? "Immediate selected" : "Immediate")}
            </RadioGroup.Radio>
            <RadioGroup.Radio value="quiet">Quiet</RadioGroup.Radio>
          </RadioGroup.Options>
          <RadioGroup.Help>
            <RadioGroup.ErrorMessage />
          </RadioGroup.Help>
        </RadioGroup.Root>

        <Select.Root<Choice> name="single" value={single} onChange={setSingle} disabledKeys={[2]}>
          {({ isOpen }) => (
            <>
              <Select.Label>Single role</Select.Label>
              <Select.Description>One role per workspace.</Select.Description>
              <Select.Trigger ref={selectTrigger}>
                <Select.Value<Choice>
                  ref={selectValue}
                  className={({ isPlaceholder }) =>
                    isPlaceholder ? "consumer-placeholder" : "consumer-value"
                  }
                  style={({ isPlaceholder }) => ({ opacity: isPlaceholder ? 0.7 : 1 })}
                  render={(domProps) => <span {...domProps} />}
                >
                  {({ selectedItems, selectedText }) => (
                    <span title={selectedItems[0]?.description}>{selectedText}</span>
                  )}
                </Select.Value>
                <Icon name="chevronDown" />
              </Select.Trigger>
              <Select.Help>
                <Select.ErrorMessage />
              </Select.Help>
              <Select.Popover
                ref={selectPopover}
                className={({ placement }) => `consumer-popover-${placement}`}
              >
                <Select.ListBox<Choice>
                  ref={selectList}
                  items={choices}
                  className={({ isEmpty }) => (isEmpty ? "consumer-empty" : "consumer-listbox")}
                >
                  {renderChoice}
                </Select.ListBox>
              </Select.Popover>
              <output>{isOpen ? "Open" : "Closed"}</output>
            </>
          )}
        </Select.Root>
        <Select.Root<Choice, "multiple">
          name="multiple"
          selectionMode="multiple"
          value={multiple}
          onChange={setMultiple}
        >
          <Select.Label>Multiple roles</Select.Label>
          <Select.Trigger>
            <Select.Value<Choice>>
              {({ selectedItems }) => selectedItems.map((item) => item?.name).join(", ")}
            </Select.Value>
            <Icon name="chevronDown" />
          </Select.Trigger>
          <Select.Help>
            <Select.Description>More than one role is allowed.</Select.Description>
            <Select.ErrorMessage />
          </Select.Help>
          <Select.Popover>
            <Select.ListBox<Choice> items={choices}>{renderChoice}</Select.ListBox>
          </Select.Popover>
        </Select.Root>

        <ComboBox.Root<Choice>
          name="combo-single"
          defaultItems={choices}
          value={comboSingle}
          onChange={(key) => {
            setComboSingle(key);
            setQuery(choices.find((choice) => choice.id === key)?.name ?? "");
          }}
          inputValue={query}
          onInputChange={(value) => {
            setQuery(value);
            if (value === "") setComboSingle(null);
          }}
          formValue="key"
          menuTrigger="focus"
        >
          <ComboBox.Label>Searchable role</ComboBox.Label>
          <ComboBox.Description>Type to filter.</ComboBox.Description>
          <ComboBox.Control ref={comboControl}>
            <ComboBox.Input
              ref={comboInput}
              placeholder="Search roles"
              onChange={(event) => setNativeInput(event.currentTarget.value)}
            />
            <ComboBox.Trigger aria-label="Show roles">
              <Icon name="chevronDown" />
            </ComboBox.Trigger>
          </ComboBox.Control>
          <ComboBox.Help>
            <ComboBox.ErrorMessage />
          </ComboBox.Help>
          <ComboBox.Popover>
            <ComboBox.ListBox<Choice>>{renderChoice}</ComboBox.ListBox>
          </ComboBox.Popover>
        </ComboBox.Root>
        <ComboBox.Root<Choice, "multiple">
          name="combo-multiple"
          selectionMode="multiple"
          defaultItems={choices}
          value={comboMultiple}
          onChange={setComboMultiple}
        >
          {({ isOpen }) => (
            <>
              <ComboBox.Label>Searchable roles</ComboBox.Label>
              <ComboBox.Control>
                <ComboBox.Input />
                <ComboBox.Trigger aria-label="Show multiple roles">
                  <Icon name="chevronDown" />
                </ComboBox.Trigger>
              </ComboBox.Control>
              <ComboBox.Value<Choice>
                ref={comboValue}
                className={({ isPlaceholder }) =>
                  isPlaceholder ? "consumer-placeholder" : "consumer-values"
                }
                render={(domProps) => <div {...domProps} />}
              >
                {({ selectedItems, selectedText }) => (
                  <div title={selectedItems.map((item) => item?.description).join("; ")}>
                    {selectedText}
                  </div>
                )}
              </ComboBox.Value>
              <ComboBox.Help>
                <ComboBox.Description>Choose multiple roles.</ComboBox.Description>
                <ComboBox.ErrorMessage />
              </ComboBox.Help>
              <ComboBox.Popover>
                <ComboBox.ListBox<Choice>>{renderChoice}</ComboBox.ListBox>
              </ComboBox.Popover>
              <output>{isOpen ? "Open" : "Closed"}</output>
            </>
          )}
        </ComboBox.Root>

        <DateField.Root<CalendarDate>
          ref={dateRoot}
          name="date"
          value={date}
          onChange={setDate}
          minValue={new CalendarDate(2026, 1, 1)}
        >
          {({ state }) => (
            <>
              <DateField.Label>Date</DateField.Label>
              <DateField.Description>Use a date in 2026.</DateField.Description>
              <DateField.Input
                ref={dateInput}
                className={({ isFocusWithin }) =>
                  isFocusWithin ? "consumer-focus" : "consumer-date"
                }
                style={({ isFocusWithin }) => ({ outlineOffset: isFocusWithin ? 4 : 2 })}
              >
                {(segment) => (
                  <DateField.Segment
                    ref={segment.type === "day" ? dateSegment : undefined}
                    segment={segment}
                    className={({ type, isFocused }) =>
                      `react-aria-DateSegment consumer-${type}${isFocused ? " consumer-focus" : ""}`
                    }
                  >
                    {({ text, isPlaceholder }) => (
                      <span title={isPlaceholder ? "Enter a value" : undefined}>{text}</span>
                    )}
                  </DateField.Segment>
                )}
              </DateField.Input>
              <DateField.Help>
                <DateField.ErrorMessage />
              </DateField.Help>
              <output>{state.value?.toString()}</output>
            </>
          )}
        </DateField.Root>
        <TimeField.Root<Time>
          name="time"
          value={time}
          onChange={setTime}
          hourCycle={24}
          granularity="minute"
        >
          <TimeField.Label>Time</TimeField.Label>
          <TimeField.Input>
            {(segment) => (
              <TimeField.Segment segment={segment}>{({ text }) => <b>{text}</b>}</TimeField.Segment>
            )}
          </TimeField.Input>
          <TimeField.Help>
            <TimeField.Description>24-hour time</TimeField.Description>
            <TimeField.ErrorMessage />
          </TimeField.Help>
        </TimeField.Root>
        <DatePicker.Root<CalendarDate>
          name="picker"
          value={date}
          onChange={setDate}
          shouldCloseOnSelect
        >
          {({ isOpen }) => (
            <>
              <DatePicker.Label>Pick a date</DatePicker.Label>
              <DatePicker.Description>
                Calendar and keyboard input share the same value.
              </DatePicker.Description>
              <DatePicker.Control>
                <DatePicker.Input ref={pickerInput}>
                  {(segment) => <DatePicker.Segment segment={segment} />}
                </DatePicker.Input>
                <DatePicker.Trigger ref={pickerTrigger} aria-label="Open date calendar">
                  <Icon name="calendar" />
                </DatePicker.Trigger>
              </DatePicker.Control>
              <DatePicker.Help>
                <DatePicker.ErrorMessage />
              </DatePicker.Help>
              <DatePicker.Popover>
                <Dialog aria-label="Date calendar">
                  <DatePicker.Calendar<CalendarDate> />
                </Dialog>
              </DatePicker.Popover>
              <output>{isOpen ? "Open" : "Closed"}</output>
            </>
          )}
        </DatePicker.Root>
        <DateRangePicker.Root<CalendarDate>
          startName="start"
          endName="end"
          value={range}
          onChange={setRange}
        >
          <DateRangePicker.Label>Date range</DateRangePicker.Label>
          <DateRangePicker.Description>Independent start and end slots</DateRangePicker.Description>
          <DateRangePicker.Control>
            <DateRangePicker.Input ref={rangeStart} slot="start">
              {(segment) => <DateRangePicker.Segment segment={segment} />}
            </DateRangePicker.Input>
            <span aria-hidden="true">–</span>
            <DateRangePicker.Input ref={rangeEnd} slot="end">
              {(segment) => (
                <DateRangePicker.Segment segment={segment}>
                  {({ text }) => <b>{text}</b>}
                </DateRangePicker.Segment>
              )}
            </DateRangePicker.Input>
            <DateRangePicker.Trigger aria-label="Open range calendar">
              <Icon name="calendar" />
            </DateRangePicker.Trigger>
          </DateRangePicker.Control>
          <DateRangePicker.Help>
            <DateRangePicker.ErrorMessage />
          </DateRangePicker.Help>
          <DateRangePicker.Popover>
            <Dialog aria-label="Range calendar">
              <DateRangePicker.Calendar<CalendarDate> />
            </Dialog>
          </DateRangePicker.Popover>
        </DateRangePicker.Root>
        <Button type="submit">Save composed values</Button>
        <Button
          type="button"
          onPress={() => {
            setRefs(
              JSON.stringify({
                root: root.current?.tagName ?? null,
                input: input.current?.tagName ?? null,
                label: label.current?.tagName ?? null,
                description: description.current?.tagName ?? null,
                help: help.current?.tagName ?? null,
                error: error.current?.tagName ?? null,
                area: area.current?.tagName ?? null,
                numberControl: numberControl.current?.tagName ?? null,
                numberButton: numberButton.current?.tagName ?? null,
                checkboxLabel: checkboxLabel.current?.tagName ?? null,
                checkboxInput: checkboxInput.current?.tagName ?? null,
                radioLabel: radioLabel.current?.tagName ?? null,
                radioInput: radioInput.current?.tagName ?? null,
                radioOptions: radioOptions.current?.tagName ?? null,
                selectTrigger: selectTrigger.current?.tagName ?? null,
                selectValue: selectValue.current?.tagName ?? null,
                selectList: selectList.current?.tagName ?? null,
                selectPopover: selectPopover.current?.tagName ?? null,
                comboInput: comboInput.current?.tagName ?? null,
                comboControl: comboControl.current?.tagName ?? null,
                comboValue: comboValue.current?.tagName ?? null,
                dateRoot: dateRoot.current?.tagName ?? null,
                dateInput: dateInput.current?.tagName ?? null,
                dateSegment: dateSegment.current?.tagName ?? null,
                pickerInput: pickerInput.current?.tagName ?? null,
                pickerTrigger: pickerTrigger.current?.tagName ?? null,
                rangeStart: rangeStart.current?.tagName ?? null,
                rangeEnd: rangeEnd.current?.tagName ?? null,
                rootContainsInput: root.current?.contains(input.current) ?? false,
                helpContainsDescription: help.current?.contains(description.current) ?? false,
                helpContainsError: help.current?.contains(error.current) ?? false,
                controlContainsButton:
                  numberControl.current?.contains(numberButton.current) ?? false,
                checkboxLabelContainsInput:
                  checkboxLabel.current?.contains(checkboxInput.current) ?? false,
                radioLabelContainsInput: radioLabel.current?.contains(radioInput.current) ?? false,
                radioOptionsContainsLabel:
                  radioOptions.current?.contains(radioLabel.current) ?? false,
                selectTriggerContainsValue:
                  selectTrigger.current?.contains(selectValue.current) ?? false,
                selectPopoverContainsList:
                  selectPopover.current?.contains(selectList.current) ?? false,
                comboControlContainsInput:
                  comboControl.current?.contains(comboInput.current) ?? false,
                dateRootContainsInput: dateRoot.current?.contains(dateInput.current) ?? false,
                dateInputContainsSegment: dateInput.current?.contains(dateSegment.current) ?? false,
              }),
            );
          }}
        >
          Inspect consumer refs
        </Button>
        <output aria-label="Consumer native input">{nativeInput}</output>
        <output aria-label="Consumer FormData">{saved}</output>
        <output aria-label="Consumer ref targets">{refs}</output>
      </Form>

      <section aria-label="Callable shorthand compatibility">
        <TextField label="Shorthand text" description="Still callable" defaultValue="Text" />
        <TextArea label={0} description={0} rows={2} defaultValue="Notes" />
        <NumberField label="Shorthand number" defaultValue={2} minValue={0} step={0.5} />
        <SearchField
          label="Shorthand search"
          placeholder="Parent placeholder"
          inputProps={{
            placeholder: "Native override",
            className: "consumer-raw-input",
            onChange: (event) => setNativeInput(event.currentTarget.value),
          }}
        />
        <CheckboxGroup label="Shorthand channels">
          <Checkbox value="email">Email</Checkbox>
        </CheckboxGroup>
        <RadioGroup label="Shorthand delivery">
          <Radio value="quiet">Quiet</Radio>
        </RadioGroup>
        <Select<Choice> label="Shorthand role" items={choices} value={single} onChange={setSingle}>
          {renderChoice}
        </Select>
        <Select<Choice, "multiple">
          label="Shorthand roles"
          items={choices}
          selectionMode="multiple"
          value={multiple}
          onChange={setMultiple}
        >
          {renderChoice}
        </Select>
        <ComboBox<Choice>
          label="Shorthand searchable role"
          defaultItems={choices}
          value={comboSingle}
          onChange={setComboSingle}
        >
          {renderChoice}
        </ComboBox>
        <ComboBox<Choice, "multiple">
          label="Shorthand searchable roles"
          defaultItems={choices}
          selectionMode="multiple"
          value={comboMultiple}
          onChange={setComboMultiple}
        >
          {renderChoice}
        </ComboBox>
        <DateField<CalendarDate> label="Shorthand date" defaultValue={initialDate} />
        <TimeField<Time> label="Shorthand time" defaultValue={new Time(10, 30)} />
        <DatePicker<CalendarDate> label="Shorthand picker" defaultValue={initialDate} />
        <DateRangePicker<CalendarDate> label="Shorthand range" defaultValue={initialRange} />
        <TextField defaultValue="Raw composition" isInvalid validationBehavior="aria">
          <Label>Raw RAC exports</Label>
          <Input />
          <FieldError>Raw recovery</FieldError>
        </TextField>
      </section>
    </Theme>
  );
}

type Accepts<T, U extends T> = U;
type RacInputIsAccepted = Accepts<FieldInputProps, ComponentProps<typeof AriaInput>>;
type RacAreaIsAccepted = Accepts<
  ComponentProps<typeof TextArea.Input>,
  ComponentProps<typeof AriaTextArea>
>;
type RacControlIsAccepted = Accepts<
  ComponentProps<typeof TextArea.Control>,
  ComponentProps<typeof AriaGroup>
>;
type RacDateInputIsAccepted = Accepts<FieldDateInputProps, ComponentProps<typeof AriaDateInput>>;
type RawLabelIsPreserved = Accepts<typeof AriaLabel, typeof Label>;
type RawInputIsPreserved = Accepts<typeof AriaInput, typeof Input>;
type RawErrorIsPreserved = Accepts<typeof AriaFieldError, typeof FieldError>;
type PrimitiveSelectRootIsAccepted = ComponentProps<typeof Select.Root<number>>;
type PrimitiveComboBoxRootIsAccepted = ComponentProps<typeof ComboBox.Root<number>>;

type RootRejectsNativeChange = Accepts<
  ComponentProps<typeof TextField.Root>,
  // @ts-expect-error Root changes receive string values, not native change events.
  { onChange: (event: ChangeEvent<HTMLInputElement>) => void }
>;
// @ts-expect-error Input changes receive native events, not string values.
type InputRejectsValueChange = Accepts<FieldInputProps, { onChange: (value: string) => void }>;
// @ts-expect-error An input ref must target an input, not a textarea.
type InputRejectsAreaRef = Accepts<FieldInputProps, { ref: Ref<HTMLTextAreaElement> }>;
// @ts-expect-error Single selection accepts a key or null, not a key array.
type SingleSelectRejectsArray = Accepts<SelectRootProps<Choice>, { value: Key[] }>;
// @ts-expect-error Multiple selection accepts a key array, not a scalar key.
type MultipleSelectRejectsKey = Accepts<SelectRootProps<Choice, "multiple">, { value: number }>;
// @ts-expect-error Multiple ComboBox selection also requires a key array.
type MultipleComboBoxRejectsKey = Accepts<ComboBoxRootProps<Choice, "multiple">, { value: number }>;
// @ts-expect-error DateInput children must be a segment renderer, not static content.
type DateInputRejectsStaticChildren = Accepts<FieldDateInputProps, { children: string }>;

export type CompositionConsumerProofs = readonly [
  racInputProps: RacInputIsAccepted,
  racTextAreaProps: RacAreaIsAccepted,
  racControlProps: RacControlIsAccepted,
  racDateInputProps: RacDateInputIsAccepted,
  rawLabel: RawLabelIsPreserved,
  rawInput: RawInputIsPreserved,
  rawFieldError: RawErrorIsPreserved,
  unrestrictedSelectRoot: PrimitiveSelectRootIsAccepted,
  unrestrictedComboBoxRoot: PrimitiveComboBoxRootIsAccepted,
  rootRejectsNativeChange: RootRejectsNativeChange,
  inputRejectsValueChange: InputRejectsValueChange,
  inputRejectsTextAreaRef: InputRejectsAreaRef,
  singleSelectRejectsArray: SingleSelectRejectsArray,
  multipleSelectRejectsKey: MultipleSelectRejectsKey,
  multipleComboBoxRejectsKey: MultipleComboBoxRejectsKey,
  dateInputRejectsStaticChildren: DateInputRejectsStaticChildren,
];
