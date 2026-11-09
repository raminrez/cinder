import type { ComponentProps, ReactNode, Ref } from "react";
import {
  Checkbox as RACCheckbox,
  CheckboxGroup as RACCheckboxGroup,
  RadioGroup as RACRadioGroup,
  Radio as RACRadio,
  Switch as RACSwitch,
  Select as RACSelect,
  SelectValue,
  ComboBox as RACComboBox,
  ComboBoxValue,
  CheckboxGroupContext,
  RadioGroupContext,
  SelectContext,
  ComboBoxContext,
  useSlottedContext,
  ListBox,
  Slider as RACSlider,
  SliderOutput,
  SliderTrack,
  SliderFill,
  SliderThumb,
  Label,
  composeRenderProps,
  type CheckboxProps as RACCheckboxProps,
  type CheckboxGroupProps as RACCheckboxGroupProps,
  type RadioProps as RACRadioProps,
  type RadioGroupProps as RACRadioGroupProps,
  type SwitchProps as RACSwitchProps,
  type SelectProps as RACSelectProps,
  type ComboBoxProps as RACComboBoxProps,
  type ListBoxProps,
  type SelectValueProps,
  type ComboBoxValueProps,
  type SliderProps as RACSliderProps,
} from "react-aria-components";
import { Button, type ButtonProps } from "./buttons";
import { Popover, type PopoverProps } from "./overlays";
import { FieldLayout, type FieldContentProps } from "./fields";
import {
  FieldControl,
  FieldGroupInput,
  FieldButton,
  FieldStatusIcon,
  useFieldPresentation,
  type FieldPresentationProps,
  fieldParts,
} from "./field-parts";
import { Icon } from "./icons";
import { classes, type ControlSize } from "./utils";

export interface CheckboxProps extends RACCheckboxProps {
  ref?: Ref<HTMLLabelElement>;
}
export function Checkbox({ children, className, ...props }: CheckboxProps) {
  return (
    <RACCheckbox {...props} className={classes("cinder-checkbox", className)}>
      {composeRenderProps(children, (content, state) => (
        <>
          <span className="cinder-checkbox-control" aria-hidden="true">
            {state.isIndeterminate ? (
              <Icon name="minus" />
            ) : state.isSelected ? (
              <Icon name="check" />
            ) : null}
          </span>
          {content != null && <span>{content}</span>}
        </>
      ))}
    </RACCheckbox>
  );
}

export interface CheckboxGroupRootProps extends RACCheckboxGroupProps, FieldPresentationProps {
  ref?: Ref<HTMLDivElement>;
}

function CheckboxGroupRoot({
  className,
  children,
  status,
  isOptional,
  ...props
}: CheckboxGroupRootProps) {
  const context = useSlottedContext(CheckboxGroupContext, props.slot);
  const presentation = useFieldPresentation(
    { ...props, status, isOptional },
    context?.["aria-describedby"],
  );
  return (
    <RACCheckboxGroup
      {...props}
      {...presentation.props}
      className={classes("cinder-field cinder-checkbox-group", className)}
    >
      {presentation.wrap(children, context?.children)}
    </RACCheckboxGroup>
  );
}

export interface CheckboxGroupProps extends CheckboxGroupRootProps, FieldContentProps {}

function CheckboxGroupDefault({
  label,
  labelTooltip,
  description,
  errorMessage,
  className,
  children,
  ...props
}: CheckboxGroupProps) {
  return (
    <CheckboxGroupRoot {...props} className={className}>
      {composeRenderProps(children, (content) => (
        <FieldLayout
          label={label}
          labelTooltip={labelTooltip}
          description={description}
          errorMessage={errorMessage}
        >
          {content}
        </FieldLayout>
      ))}
    </CheckboxGroupRoot>
  );
}

export const CheckboxGroup = Object.assign(CheckboxGroupDefault, {
  Root: CheckboxGroupRoot,
  ...fieldParts,
  Checkbox,
});

export interface RadioGroupRootProps extends RACRadioGroupProps, FieldPresentationProps {
  ref?: Ref<HTMLDivElement>;
}

function RadioGroupRoot({
  className,
  children,
  status,
  isOptional,
  ...props
}: RadioGroupRootProps) {
  const context = useSlottedContext(RadioGroupContext, props.slot);
  const presentation = useFieldPresentation(
    { ...props, status, isOptional },
    context?.["aria-describedby"],
  );
  return (
    <RACRadioGroup
      {...props}
      {...presentation.props}
      className={classes("cinder-field cinder-radio-group", className)}
    >
      {presentation.wrap(children, context?.children)}
    </RACRadioGroup>
  );
}

function RadioOptions({ className, ...props }: ComponentProps<"div">) {
  return (
    <div {...props} className={["cinder-radio-options", className].filter(Boolean).join(" ")} />
  );
}

export interface RadioGroupProps extends RadioGroupRootProps, FieldContentProps {}

function RadioGroupDefault({
  label,
  labelTooltip,
  description,
  errorMessage,
  className,
  children,
  ...props
}: RadioGroupProps) {
  return (
    <RadioGroupRoot {...props} className={className}>
      {composeRenderProps(children, (content) => (
        <FieldLayout
          label={label}
          labelTooltip={labelTooltip}
          description={description}
          errorMessage={errorMessage}
        >
          <RadioOptions>{content}</RadioOptions>
        </FieldLayout>
      ))}
    </RadioGroupRoot>
  );
}
export interface RadioProps extends RACRadioProps {
  ref?: Ref<HTMLLabelElement>;
}
export function Radio({ className, children, ...props }: RadioProps) {
  return (
    <RACRadio {...props} className={classes("cinder-radio", className)}>
      {composeRenderProps(children, (content) => (
        <>
          <span className="cinder-radio-control" aria-hidden="true" />
          <span>{content}</span>
        </>
      ))}
    </RACRadio>
  );
}

export const RadioGroup = Object.assign(RadioGroupDefault, {
  Root: RadioGroupRoot,
  ...fieldParts,
  Radio,
  Options: RadioOptions,
});

export interface SwitchProps extends RACSwitchProps {
  size?: "sm" | "md";
  ref?: Ref<HTMLLabelElement>;
}
export function Switch({ className, children, size = "md", ...props }: SwitchProps) {
  return (
    <RACSwitch {...props} data-size={size} className={classes("cinder-switch", className)}>
      {composeRenderProps(children, (content) => (
        <>
          <span className="cinder-switch-track" aria-hidden="true">
            <span className="cinder-switch-thumb" />
          </span>
          <span>{content}</span>
        </>
      ))}
    </RACSwitch>
  );
}

type SelectionMode = "single" | "multiple";

export interface SelectRootProps<T = {}, M extends SelectionMode = "single">
  extends RACSelectProps<T, M>, FieldPresentationProps {
  size?: ControlSize;
  ref?: Ref<HTMLDivElement>;
}

function SelectRoot<T, M extends SelectionMode = "single">({
  size = "md",
  className,
  children,
  status,
  isOptional,
  ...props
}: SelectRootProps<T, M>) {
  const context = useSlottedContext(SelectContext, props.slot);
  const presentation = useFieldPresentation(
    { ...props, status, isOptional },
    context?.["aria-describedby"],
  );
  return (
    <RACSelect<T, M>
      {...props}
      {...presentation.props}
      data-size={size}
      className={classes("cinder-field cinder-select", className)}
    >
      {presentation.wrap(children, context?.children)}
    </RACSelect>
  );
}

function SelectTrigger({ className, children, size = "md", ...props }: ButtonProps) {
  return (
    <Button
      variant="ghost"
      {...props}
      size={size}
      className={classes("cinder-field__control cinder-select-trigger", className)}
    >
      {composeRenderProps(children, (content) => (
        <>
          {content}
          <FieldStatusIcon />
        </>
      ))}
    </Button>
  );
}

function SelectValuePart<T>({
  className,
  ...props
}: SelectValueProps<T> & { ref?: Ref<HTMLSpanElement> }) {
  return (
    <SelectValue<T>
      {...props}
      className={classes("cinder-select__value react-aria-SelectValue", className)}
    />
  );
}

function SelectPopover({ className, offset = 6, ...props }: PopoverProps) {
  return <Popover offset={offset} {...props} className={classes("cinder-select-popover", className)} />;
}

function SelectListBox<T>({
  className,
  ...props
}: ListBoxProps<T> & { ref?: Ref<HTMLDivElement> }) {
  return (
    <ListBox<T>
      {...props}
      className={classes("cinder-select__listbox react-aria-ListBox", className)}
    />
  );
}

export interface SelectProps<T extends object, M extends SelectionMode = "single">
  extends Omit<SelectRootProps<T, M>, "children">, FieldContentProps {
  items?: Iterable<T>;
  children: ListBoxProps<T>["children"];
  placeholder?: string;
  renderValue?: (selectedItems: T[]) => ReactNode;
}

/** Carbon's dropdown and multi-select share RAC's Select model. */
function SelectDefault<T extends object, M extends SelectionMode = "single">({
  label,
  labelTooltip,
  description,
  errorMessage,
  items,
  children,
  className,
  size = "md",
  placeholder,
  renderValue,
  ...props
}: SelectProps<T, M>) {
  return (
    <SelectRoot<T, M> {...props} size={size} className={className}>
      <FieldLayout
        label={label}
        labelTooltip={labelTooltip}
        description={description}
        errorMessage={errorMessage}
      >
        <SelectTrigger size={size}>
          <SelectValuePart>
            {renderValue
              ? ({ selectedItems }) => renderValue(selectedItems as T[])
              : undefined}
          </SelectValuePart>
          <Icon name="chevronDown" />
        </SelectTrigger>
      </FieldLayout>
      <SelectPopover>
        <SelectListBox items={items}>{children}</SelectListBox>
      </SelectPopover>
    </SelectRoot>
  );
}

export const Select = Object.assign(SelectDefault, {
  Root: SelectRoot,
  ...fieldParts,
  Trigger: SelectTrigger,
  Value: SelectValuePart,
  Popover: SelectPopover,
  ListBox: SelectListBox,
});

export interface ComboBoxRootProps<T, M extends SelectionMode = "single">
  extends RACComboBoxProps<T, M>, FieldPresentationProps {
  size?: ControlSize;
  ref?: Ref<HTMLDivElement>;
}

function ComboBoxRoot<T, M extends SelectionMode = "single">({
  size = "md",
  className,
  children,
  status,
  isOptional,
  ...props
}: ComboBoxRootProps<T, M>) {
  const context = useSlottedContext(ComboBoxContext, props.slot);
  const presentation = useFieldPresentation(
    { ...props, status, isOptional },
    context?.["aria-describedby"],
  );
  return (
    <RACComboBox<T, M>
      {...props}
      {...presentation.props}
      data-size={size}
      className={classes("cinder-field cinder-combobox", className)}
    >
      {presentation.wrap(children, context?.children)}
    </RACComboBox>
  );
}

function ComboBoxValuePart<T>({
  className,
  ...props
}: ComboBoxValueProps<T> & { ref?: Ref<HTMLDivElement> }) {
  return (
    <ComboBoxValue<T>
      {...props}
      className={classes("cinder-combobox-values react-aria-ComboBoxValue", className)}
    />
  );
}

export interface ComboBoxProps<T extends object, M extends SelectionMode = "single">
  extends Omit<ComboBoxRootProps<T, M>, "children">, FieldContentProps {
  children: ListBoxProps<T>["children"];
  placeholder?: string;
}

function ComboBoxDefault<T extends object, M extends SelectionMode = "single">({
  label,
  labelTooltip,
  description,
  errorMessage,
  children,
  className,
  placeholder,
  size = "md",
  ...props
}: ComboBoxProps<T, M>) {
  return (
    <ComboBoxRoot<T, M> {...props} size={size} className={className}>
      <FieldLayout
        label={label}
        labelTooltip={labelTooltip}
        description={description}
        errorMessage={errorMessage}
      >
        <FieldControl>
          <FieldGroupInput placeholder={placeholder} />
          <FieldButton size={size}>
            <Icon name="chevronDown" />
          </FieldButton>
        </FieldControl>
        {props.selectionMode === "multiple" && <ComboBoxValuePart />}
      </FieldLayout>
      <SelectPopover>
        <SelectListBox>{children}</SelectListBox>
      </SelectPopover>
    </ComboBoxRoot>
  );
}

export const ComboBox = Object.assign(ComboBoxDefault, {
  Root: ComboBoxRoot,
  ...fieldParts,
  Input: FieldGroupInput,
  Control: FieldControl,
  Trigger: FieldButton,
  Value: ComboBoxValuePart,
  Popover: SelectPopover,
  ListBox: SelectListBox,
});

export interface SliderProps<T extends number | number[] = number> extends RACSliderProps<T> {
  label?: ReactNode;
  thumbLabels?: string[];
  ref?: Ref<HTMLDivElement>;
}
export function Slider<T extends number | number[] = number>({
  label,
  thumbLabels,
  children,
  className,
  ...props
}: SliderProps<T>) {
  return (
    <RACSlider<T>
      {...props}
      aria-disabled={props.isDisabled || undefined}
      className={classes("cinder-slider", className)}
    >
      {children ?? (
        <>
          <div className="cinder-slider-label">
            <Label>{label}</Label>
            <SliderOutput>
              {({ state }) =>
                state.values.map((_, index) => state.getThumbValueLabel(index)).join(" – ")
              }
            </SliderOutput>
          </div>
          <SliderTrack>
            {({ state }) => (
              <>
                <SliderFill />
                {state.values.map((_, index) => (
                  <SliderThumb
                    key={index}
                    index={index}
                    aria-label={
                      thumbLabels?.[index] ??
                      (state.values.length > 1 ? (index === 0 ? "Minimum" : "Maximum") : undefined)
                    }
                  />
                ))}
              </>
            )}
          </SliderTrack>
        </>
      )}
    </RACSlider>
  );
}
