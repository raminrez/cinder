import type { ReactNode, Ref } from "react";
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
  ListBox,
  Input,
  Group,
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
  type SliderProps as RACSliderProps,
} from "react-aria-components";
import { Button } from "./buttons";
import { Popover } from "./overlays";
import { FieldLabel, FieldHelp, type FieldContentProps } from "./fields";
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

export interface CheckboxGroupProps extends RACCheckboxGroupProps, FieldContentProps {
  ref?: Ref<HTMLDivElement>;
}
export function CheckboxGroup({
  label,
  description,
  errorMessage,
  className,
  children,
  ...props
}: CheckboxGroupProps) {
  return (
    <RACCheckboxGroup
      {...props}
      className={classes("cinder-field cinder-checkbox-group", className)}
    >
      {composeRenderProps(children, (content) => (
        <>
          <FieldLabel label={label} />
          {content}
          <FieldHelp description={description} errorMessage={errorMessage} />
        </>
      ))}
    </RACCheckboxGroup>
  );
}

export interface RadioGroupProps extends RACRadioGroupProps, FieldContentProps {
  ref?: Ref<HTMLDivElement>;
}
export function RadioGroup({
  label,
  description,
  errorMessage,
  className,
  children,
  ...props
}: RadioGroupProps) {
  return (
    <RACRadioGroup {...props} className={classes("cinder-field cinder-radio-group", className)}>
      {composeRenderProps(children, (content) => (
        <>
          <FieldLabel label={label} />
          <div className="cinder-radio-options">{content}</div>
          <FieldHelp description={description} errorMessage={errorMessage} />
        </>
      ))}
    </RACRadioGroup>
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
export interface SelectProps<T extends object, M extends SelectionMode = "single">
  extends Omit<RACSelectProps<T, M>, "children">, FieldContentProps {
  items?: Iterable<T>;
  children: ListBoxProps<T>["children"];
  size?: ControlSize;
  ref?: Ref<HTMLDivElement>;
}

/** Carbon's dropdown and multi-select share RAC's Select model. */
export function Select<T extends object, M extends SelectionMode = "single">({
  label,
  description,
  errorMessage,
  items,
  children,
  className,
  size = "md",
  ...props
}: SelectProps<T, M>) {
  return (
    <RACSelect<T, M>
      {...props}
      data-size={size}
      className={classes("cinder-field cinder-select", className)}
    >
      <FieldLabel label={label} />
      <Button className="cinder-select-trigger" variant="ghost" size={size}>
        <SelectValue />
        <Icon name="chevronDown" />
      </Button>
      <FieldHelp description={description} errorMessage={errorMessage} />
      <Popover className="cinder-select-popover" offset={0}>
        <ListBox items={items}>{children}</ListBox>
      </Popover>
    </RACSelect>
  );
}

export interface ComboBoxProps<T extends object, M extends SelectionMode = "single">
  extends Omit<RACComboBoxProps<T, M>, "children">, FieldContentProps {
  children: ListBoxProps<T>["children"];
  size?: ControlSize;
  placeholder?: string;
  ref?: Ref<HTMLDivElement>;
}

export function ComboBox<T extends object, M extends SelectionMode = "single">({
  label,
  description,
  errorMessage,
  children,
  className,
  placeholder,
  size = "md",
  ...props
}: ComboBoxProps<T, M>) {
  return (
    <RACComboBox<T, M>
      {...props}
      data-size={size}
      className={classes("cinder-field cinder-combobox", className)}
    >
      <FieldLabel label={label} />
      <Group className="cinder-input-group">
        <Input placeholder={placeholder} />
        <Button variant="ghost" size={size} iconOnly>
          <Icon name="chevronDown" />
        </Button>
      </Group>
      {props.selectionMode === "multiple" && <ComboBoxValue className="cinder-combobox-values" />}
      <FieldHelp description={description} errorMessage={errorMessage} />
      <Popover className="cinder-select-popover" offset={0}>
        <ListBox>{children}</ListBox>
      </Popover>
    </RACComboBox>
  );
}

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
