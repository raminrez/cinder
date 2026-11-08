import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import {
  CheckboxGroupContext,
  ComboBoxContext,
  DateFieldContext,
  DatePickerContext,
  DateRangePickerContext,
  DEFAULT_SLOT,
  GroupContext,
  LabelContext,
  NumberFieldContext,
  RadioGroupContext,
  SearchFieldContext,
  SelectContext,
  TextFieldContext,
  TimeFieldContext,
} from "react-aria-components";
import {
  CheckboxGroup,
  ComboBox,
  DateField,
  DatePicker,
  DateRangePicker,
  Input,
  NumberField,
  RadioGroup,
  SearchField,
  Select,
  TextArea,
  TextField,
  TimeField,
} from "@cinder/react";

const inherited = {
  "aria-label": "Inherited field",
  children: <span data-inherited-child="true">Inherited children</span>,
};

for (const [name, tree] of [
  [
    "TextField",
    <TextFieldContext.Provider key="TextField" value={inherited}>
      <TextField.Root />
    </TextFieldContext.Provider>,
  ],
  [
    "TextArea",
    <TextFieldContext.Provider key="TextArea" value={inherited}>
      <TextArea.Root />
    </TextFieldContext.Provider>,
  ],
  [
    "NumberField",
    <NumberFieldContext.Provider key="NumberField" value={inherited}>
      <NumberField.Root />
    </NumberFieldContext.Provider>,
  ],
  [
    "SearchField",
    <SearchFieldContext.Provider key="SearchField" value={inherited}>
      <SearchField.Root />
    </SearchFieldContext.Provider>,
  ],
  [
    "CheckboxGroup",
    <CheckboxGroupContext.Provider key="CheckboxGroup" value={inherited}>
      <CheckboxGroup.Root />
    </CheckboxGroupContext.Provider>,
  ],
  [
    "RadioGroup",
    <RadioGroupContext.Provider key="RadioGroup" value={inherited}>
      <RadioGroup.Root />
    </RadioGroupContext.Provider>,
  ],
  [
    "Select",
    <SelectContext.Provider key="Select" value={inherited}>
      <Select.Root />
    </SelectContext.Provider>,
  ],
  [
    "ComboBox",
    <ComboBoxContext.Provider key="ComboBox" value={inherited}>
      <ComboBox.Root />
    </ComboBoxContext.Provider>,
  ],
  [
    "DateField",
    <DateFieldContext.Provider key="DateField" value={inherited}>
      <DateField.Root />
    </DateFieldContext.Provider>,
  ],
  [
    "TimeField",
    <TimeFieldContext.Provider key="TimeField" value={inherited}>
      <TimeField.Root />
    </TimeFieldContext.Provider>,
  ],
  [
    "DatePicker",
    <DatePickerContext.Provider key="DatePicker" value={inherited}>
      <DatePicker.Root />
    </DatePickerContext.Provider>,
  ],
  [
    "DateRangePicker",
    <DateRangePickerContext.Provider key="DateRangePicker" value={inherited}>
      <DateRangePicker.Root />
    </DateRangePickerContext.Provider>,
  ],
] as const) {
  test(`${name}.Root preserves RAC context children without status`, () => {
    expect(renderToStaticMarkup(tree)).toContain('data-inherited-child="true"');
  });
}

test("field context children preserve render state, slots, and explicit overrides", () => {
  const html = renderToStaticMarkup(
    <TextFieldContext.Provider
      value={{
        slots: {
          [DEFAULT_SLOT]: {
            isRequired: true,
            children: ({ isRequired }) => <Input aria-label={`Inherited required ${isRequired}`} />,
          },
          named: { children: <Input aria-label="Named child" /> },
        },
      }}
    >
      <TextField.Root />
      <TextField.Root slot="named" />
      <TextField.Root>
        <Input aria-label="Explicit child" />
      </TextField.Root>
      <TextField.Root>{null}</TextField.Root>
      <TextField.Root slot={null}>
        <Input aria-label="Context bypass" />
      </TextField.Root>
    </TextFieldContext.Provider>,
  );
  expect(html.match(/<input\b/g)).toHaveLength(4);
  for (const label of [
    "Inherited required true",
    "Named child",
    "Explicit child",
    "Context bypass",
  ])
    expect(html).toContain(`aria-label="${label}"`);
});

test("an explicit empty field description clears inherited RAC guidance", () => {
  const clearedGuidance = { "aria-describedby": "" };
  const html = renderToStaticMarkup(
    <TextFieldContext.Provider value={{ "aria-describedby": "inherited-guidance" }}>
      <TextField.Root {...clearedGuidance}>
        <Input aria-label="No inherited guidance" />
      </TextField.Root>
    </TextFieldContext.Provider>,
  );
  expect(html).not.toContain("inherited-guidance");
});

test("field labels preserve context children, slots, and explicit empty overrides", () => {
  const html = renderToStaticMarkup(
    <LabelContext.Provider
      value={{
        slots: {
          [DEFAULT_SLOT]: { children: "Inherited label" },
          named: { children: "Named label" },
        },
      }}
    >
      <TextField.Label labelTooltip="Inherited help" isRequired />
      <TextField.Label slot="named" />
      <TextField.Label>Explicit label</TextField.Label>
      <TextField.Label>{0}</TextField.Label>
      <TextField.Label>{""}</TextField.Label>
      <TextField.Label>{null}</TextField.Label>
    </LabelContext.Provider>,
  );
  expect(html.match(/Inherited label/g)).toHaveLength(1);
  expect(html).toContain("Named label");
  expect(html).toContain("Explicit label");
  expect(html).toMatch(/>0<\/label>/);
  expect(html.match(/<label\b[^>]*><\/label>/g)).toHaveLength(2);
  expect(html.match(/\(required\)/g)).toHaveLength(1);
});

test("field controls preserve context children and render state without replacing explicit children", () => {
  const html = renderToStaticMarkup(
    <GroupContext.Provider
      value={{
        slots: {
          [DEFAULT_SLOT]: {
            isDisabled: true,
            children: ({ isDisabled }) => <Input aria-label={`Inherited disabled ${isDisabled}`} />,
          },
          named: { children: <Input aria-label="Named control" /> },
        },
      }}
    >
      <TextField.Control />
      <TextField.Control slot="named" />
      <TextField.Control>
        <Input aria-label="Explicit control" />
      </TextField.Control>
      <TextField.Control>{null}</TextField.Control>
      <TextField.Control slot={null}>
        <Input aria-label="Independent control" />
      </TextField.Control>
    </GroupContext.Provider>,
  );
  expect(html.match(/<input\b/g)).toHaveLength(4);
  for (const label of [
    "Inherited disabled true",
    "Named control",
    "Explicit control",
    "Independent control",
  ])
    expect(html).toContain(`aria-label="${label}"`);
});
