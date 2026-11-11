import { useEffect, useRef, useState } from "react";
import { CalendarDate, Time } from "@internationalized/date";
import {
  DEFAULT_SLOT,
  GroupContext,
  LabelContext,
  TextFieldContext,
  useSlottedContext,
} from "react-aria-components";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  ComboBox,
  DateField,
  DatePicker,
  DateRangePicker,
  Form,
  Input,
  Label,
  ListBoxItem,
  NumberField,
  Radio,
  RadioGroup,
  SearchField,
  Select,
  TextArea,
  TextField,
  Theme,
  TimeField,
  type FieldStatus,
  type ThemeName,
} from "@hashti/react";

const date = new CalendarDate(2026, 11, 8);
const statusTypes = ["warning", "error", "success"] as const;
const statusMessage = "Review this value before saving.";
const clearedGuidance = { "aria-describedby": "" };
const localized = {
  "en-US": { label: "Project name", help: "Use the name your team recognizes." },
  "fa-IR": { label: "نام پروژه", help: "نامی را وارد کنید که اعضای تیم می‌شناسند." },
  "ar-EG": { label: "اسم المشروع", help: "أدخل الاسم الذي يعرفه أعضاء الفريق." },
  "de-DE": { label: "Projektname", help: "Verwenden Sie den Namen, den Ihr Team kennt." },
};

function InheritedStatusParts({ showStatus }: { showStatus: boolean }) {
  const label = useSlottedContext(LabelContext);
  const control = useSlottedContext(GroupContext);
  return (
    <>
      <LabelContext.Provider value={{ ...label, children: "Context-part name" }}>
        <TextField.Label labelTooltip="Help for the inherited label and control." />
      </LabelContext.Provider>
      <TextField.Description>Part-context guidance.</TextField.Description>
      <GroupContext.Provider value={{ ...control, children: <Input /> }}>
        <TextField.Control />
      </GroupContext.Provider>
      <TextField.Help>{showStatus && <TextField.Status />}</TextField.Help>
    </>
  );
}

export function StatusConsumer({
  theme = "frame-light",
  locale = "en-US",
}: { theme?: ThemeName; locale?: string } = {}) {
  const [status, setStatus] = useState<FieldStatus | undefined>({
    type: "warning",
    message: statusMessage,
  });
  const [showStatus, setShowStatus] = useState(false);
  const [saved, setSaved] = useState("");
  const [emailSaved, setEmailSaved] = useState(0);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [refResult, setRefResult] = useState("");
  const [contextChanges, setContextChanges] = useState(0);
  const [partChanges, setPartChanges] = useState(0);
  const [fieldsInvalid, setFieldsInvalid] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const copy = localized[locale as keyof typeof localized] ?? localized["en-US"];
  const invalidProps = {
    isInvalid: fieldsInvalid,
    errorMessage: "Correct this field before saving.",
  };

  useEffect(() => {
    const form = formRef.current;
    function onKeyDown(event: KeyboardEvent) {
      if (event.altKey && event.key.toLowerCase() === "s") {
        event.preventDefault();
        setStatus((current) => {
          const next = statusTypes[current ? statusTypes.indexOf(current.type) + 1 : 0];
          return next ? { type: next, message: statusMessage } : undefined;
        });
      }
    }
    form?.addEventListener("keydown", onKeyDown);
    return () => form?.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <Theme theme={theme} locale={locale} style={{ minHeight: "100vh", padding: "16px" }}>
      <main style={{ maxWidth: "560px", marginInline: "auto" }}>
        <h1>Field status contracts</h1>
        <p>Alt+S cycles appearance while the input keeps focus.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBlockEnd: "24px" }}>
          {statusTypes.map((type) => (
            <Button key={type} onPress={() => setStatus({ type, message: statusMessage })}>
              Show {type}
            </Button>
          ))}
          <Button onPress={() => setStatus(undefined)}>Clear status</Button>
          <Button onPress={() => setFieldsInvalid((current) => !current)}>
            Toggle actual invalidity
          </Button>
        </div>
        <Form
          ref={formRef}
          aria-label="Appearance-only form"
          onSubmit={(event) => {
            event.preventDefault();
            setSaved(JSON.stringify([...new FormData(event.currentTarget)]));
          }}
          style={{ display: "grid", gap: "24px" }}
        >
          <TextField
            data-status-field="text"
            label="Display name"
            labelTooltip="This name appears beside your work."
            description="Use a name your team recognizes."
            name="text"
            defaultValue="Draft name"
            isRequired
            {...invalidProps}
            status={status}
          />
          <TextArea
            data-status-field="area"
            label="Review notes"
            labelTooltip="Notes remain editable until you save."
            description="Keep relevant details in the draft."
            name="area"
            defaultValue="Draft notes"
            isRequired
            {...invalidProps}
            status={status}
          />
          <NumberField
            data-status-field="number"
            label="Seats"
            labelTooltip="Changing this value does not purchase seats."
            description="Choose between one and ten."
            name="number"
            defaultValue={3}
            minValue={1}
            maxValue={10}
            isRequired
            {...invalidProps}
            status={status}
          />
          <SearchField
            data-status-field="search"
            label="Find records"
            labelTooltip="Search help must not clear the query."
            description="Search by title."
            name="search"
            defaultValue="Draft query"
            isRequired
            {...invalidProps}
            status={status}
          />
          <CheckboxGroup
            data-status-field="checkbox"
            label="Notifications"
            labelTooltip="These choices are saved with the form."
            description="Choose at least one channel."
            name="checkbox"
            defaultValue={["email"]}
            isRequired
            {...invalidProps}
            status={status}
          >
            <Checkbox value="email">Email</Checkbox>
            <Checkbox value="sms">Text message</Checkbox>
          </CheckboxGroup>
          <RadioGroup
            data-status-field="radio"
            label="Delivery"
            labelTooltip="Choose when to send the summary."
            description="Choose one delivery schedule."
            name="radio"
            defaultValue="daily"
            isRequired
            {...invalidProps}
            status={status}
          >
            <Radio value="daily">Daily</Radio>
            <Radio value="weekly">Weekly</Radio>
          </RadioGroup>
          <Select
            data-status-field="select"
            label="Access level"
            labelTooltip="Help must not open the option list."
            description="Choose an access level."
            name="select"
            defaultValue="reader"
            isRequired
            {...invalidProps}
            status={status}
          >
            <ListBoxItem id="reader">Reader</ListBoxItem>
            <ListBoxItem id="writer">Writer</ListBoxItem>
          </Select>
          <ComboBox
            data-status-field="combo"
            label="Assignee"
            labelTooltip="Help must not change the selected assignee."
            description="Find a team member."
            name="combo"
            defaultValue="sam"
            isRequired
            {...invalidProps}
            status={status}
          >
            <ListBoxItem id="sam">Sam</ListBoxItem>
            <ListBoxItem id="alex">Alex</ListBoxItem>
          </ComboBox>
          <DateField
            data-status-field="date"
            label="Review date"
            labelTooltip="Enter the review date using the date segments."
            description="The date stays in the draft until saved."
            name="date"
            defaultValue={date}
            isRequired
            {...invalidProps}
            status={status}
          />
          <TimeField
            data-status-field="time"
            label="Review time"
            labelTooltip="Enter the review time using the time segments."
            description="Use your local review time."
            name="time"
            defaultValue={new Time(10, 30)}
            isRequired
            {...invalidProps}
            status={status}
          />
          <DatePicker
            data-status-field="picker"
            label="Start date"
            labelTooltip="Help must not open the calendar."
            description="Choose the first day."
            name="picker"
            defaultValue={date}
            isRequired
            {...invalidProps}
            status={status}
          />
          <DateRangePicker
            data-status-field="range"
            label="Review window"
            labelTooltip="Help must not open the range calendar."
            description="Choose the first and last days."
            startName="range-start"
            endName="range-end"
            defaultValue={{ start: date, end: date.add({ days: 3 }) }}
            isRequired
            {...invalidProps}
            status={status}
          />
          <Button type="submit">Save appearance-only form</Button>
          <output aria-label="Status FormData">{saved}</output>
        </Form>
        <section style={{ marginBlockStart: "32px", display: "grid", gap: "16px" }}>
          <h2>Validation has precedence</h2>
          <Form
            aria-label="Validation form"
            validationErrors={validationErrors}
            onSubmit={(event) => {
              event.preventDefault();
              setEmailSaved((count) => count + 1);
            }}
            style={{ display: "grid", gap: "16px" }}
          >
            <TextField
              data-testid="status-validation"
              label="Email address"
              description="Enter an address you can receive mail at."
              name="email"
              type="email"
              isRequired
              status={{ type: "success", message: "Address lookup completed." }}
            />
            <Button type="submit">Submit email</Button>
            <output aria-label="Email submit count">{emailSaved}</output>
          </Form>
          <Button onPress={() => setValidationErrors({ email: "This address cannot be used." })}>
            Reject email
          </Button>
          <Button onPress={() => setValidationErrors({})}>Clear server rejection</Button>
        </section>
        <section style={{ marginBlockStart: "32px", display: "grid", gap: "16px" }}>
          <h2>Composed status</h2>
          <p id="external-status-guidance">External instructions remain associated.</p>
          <TextField.Root
            data-testid="status-composed"
            status={{ type: "warning", message: "Composed status is mounted." }}
            aria-describedby="external-status-guidance"
            defaultValue="Composed draft"
          >
            {({ isRequired }) => (
              <>
                <TextField.Label labelTooltip="This uses the shared label help.">
                  Composed name
                </TextField.Label>
                <TextField.Input
                  ref={inputRef}
                  className={({ isFocused }) => (isFocused ? "consumer-focused" : "consumer-idle")}
                  render={(domProps) => <input {...domProps} data-consumer-input="true" />}
                />
                <TextField.Help>
                  <TextField.Description>Composed guidance.</TextField.Description>
                  {showStatus && (
                    <TextField.Status
                      ref={statusRef}
                      className="consumer-status"
                      render={(domProps) => <span {...domProps} data-consumer-status="true" />}
                    />
                  )}
                </TextField.Help>
                <output aria-label="Composed required state">{String(isRequired)}</output>
              </>
            )}
          </TextField.Root>
          <Button onPress={() => setShowStatus((current) => !current)}>
            Toggle composed status
          </Button>
          <Button
            onPress={() => {
              inputRef.current?.focus();
              setRefResult(statusRef.current?.tagName ?? "unmounted");
            }}
          >
            Inspect status ref
          </Button>
          <output aria-label="Status ref target">{refResult}</output>
        </section>
        <section style={{ marginBlockStart: "32px", display: "grid", gap: "16px" }}>
          <h2>Localized labels</h2>
          <TextField
            data-testid="status-localized"
            label={copy.label}
            labelTooltip={copy.help}
            defaultValue="Cinder"
            isRequired
            isOptional
            status={{ type: "warning" }}
          />
          <TextField data-testid="status-optional" label={copy.label} isOptional />
          <TextField.Root data-testid="status-raw-label" isRequired defaultValue="Raw">
            <Label>Authored required marker</Label>
            <Input />
          </TextField.Root>
        </section>
        <section style={{ marginBlockStart: "32px", display: "grid", gap: "16px" }}>
          <h2>Inherited RAC presentation contracts</h2>
          <p id="inherited-status-guidance">Inherited external guidance.</p>
          <p id="explicit-status-guidance">Explicit external guidance.</p>
          <Form aria-label="Inherited context form">
            <TextFieldContext.Provider
              value={{
                slots: {
                  [DEFAULT_SLOT]: {
                    name: "inherited-draft",
                    defaultValue: "Inherited draft",
                    isRequired: true,
                    "aria-describedby": "inherited-status-guidance",
                    onChange: () => setContextChanges((count) => count + 1),
                    children: ({ isRequired }) => (
                      <>
                        <TextField.Label>Inherited name</TextField.Label>
                        <TextField.Input />
                        <TextField.Description>Local guidance.</TextField.Description>
                        {showStatus && <TextField.Status />}
                        <output aria-label="Inherited required state">{String(isRequired)}</output>
                      </>
                    ),
                  },
                  named: {
                    "aria-label": "Slotted inherited name",
                    "aria-describedby": "inherited-status-guidance",
                    children: (
                      <>
                        <TextField.Input />
                        {showStatus && <TextField.Status />}
                      </>
                    ),
                  },
                },
              }}
            >
              <TextField.Root
                data-testid="status-inherited"
                status={{ type: "warning", message: "Mounted status." }}
              />
              <TextField.Root
                data-testid="status-slotted"
                slot="named"
                status={{ type: "success", message: "Slotted status." }}
              />
              <TextField.Root
                data-testid="status-explicit"
                slot="named"
                aria-label="Explicit name"
                aria-describedby="explicit-status-guidance"
                status={{ type: "success", message: "Explicit status." }}
              >
                <Input />
                {showStatus && <TextField.Status />}
              </TextField.Root>
              <TextField.Root
                data-testid="status-cleared-guidance"
                slot="named"
                aria-label="No inherited guidance"
                {...clearedGuidance}
                status={{ type: "success", message: "Cleared guidance status." }}
              >
                <Input />
                {showStatus && <TextField.Status />}
              </TextField.Root>
              <TextField.Root data-testid="status-bypass" slot={null} aria-label="Context bypass">
                <Input />
              </TextField.Root>
            </TextFieldContext.Provider>
            <TextField.Root
              data-testid="status-inherited-parts"
              name="inherited-parts"
              defaultValue="Part draft"
              onChange={() => setPartChanges((count) => count + 1)}
              status={{ type: "warning", message: "Inherited parts status." }}
            >
              <InheritedStatusParts showStatus={showStatus} />
            </TextField.Root>
          </Form>
          <output aria-label="Inherited context change count">{contextChanges}</output>
          <output aria-label="Part context change count">{partChanges}</output>
          <TextField
            data-testid="status-disabled-help"
            label="Disabled with help"
            labelTooltip="This field is unavailable."
            isDisabled
          />
        </section>
      </main>
    </Theme>
  );
}
