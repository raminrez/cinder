"use client";

import { useState, type ReactNode, type Ref } from "react";
import { useAgentSurface } from "@hashti/agent";
import {
  TextField as RACTextField,
  TextFieldContext,
  type TextFieldProps as RACTextFieldProps,
} from "react-aria-components";
import {
  FieldLayout,
  FieldInput,
  FieldTextArea,
  FieldControl,
  useFieldAnatomy,
  fieldClassName,
  fieldParts,
  type FieldContentProps,
  type FieldPresentationProps,
} from "../field";
import { classes, type ControlSize } from "../../utils";

export interface TextFieldRootProps extends RACTextFieldProps, FieldPresentationProps {
  size?: ControlSize;
  ref?: Ref<HTMLDivElement>;
}

function TextFieldRoot({
  size = "md",
  className,
  children,
  status,
  statusVariant,
  isOptional,
  ...props
}: TextFieldRootProps) {
  const anatomy = useFieldAnatomy(
    { ...props, status, statusVariant, isOptional },
    TextFieldContext as Parameters<typeof useFieldAnatomy>[1],
  );
  return (
    <RACTextField
      {...props}
      {...anatomy.props}
      data-size={size}
      className={classes(fieldClassName("text-field"), className)}
    >
      {anatomy.wrap(children, anatomy.slotted?.children as ReactNode)}
    </RACTextField>
  );
}

export interface TextFieldProps extends TextFieldRootProps, FieldContentProps {
  placeholder?: string;
  inputRef?: Ref<HTMLInputElement>;
}

function TextFieldDefault({
  label,
  labelTooltip,
  description,
  errorMessage,
  size = "md",
  placeholder,
  inputRef,
  className,
  children,
  ...props
}: TextFieldProps) {
  const [mirror, setMirror] = useState<string>(
    props.value ?? props.defaultValue ?? "",
  );
  const handleChange = (value: string) => {
    setMirror(value);
    props.onChange?.(value);
  };

  useAgentSurface({
    component: "text-field",
    label: typeof label === "string" ? label : props["aria-label"],
    value: props.value ?? mirror,
    actions: {
      setValue: ([value]) => handleChange(String(value)),
      clear: () => handleChange(""),
    },
  });

  return (
    <TextFieldRoot
      {...props}
      onChange={handleChange}
      size={size}
      className={className}
      data-hashti-input-icon={children == null ? "" : undefined}
    >
      {children ?? (
        <FieldLayout
          inlineIcon
          label={label}
          labelTooltip={labelTooltip}
          description={description}
          errorMessage={errorMessage}
        >
          <FieldInput placeholder={placeholder} ref={inputRef} />
        </FieldLayout>
      )}
    </TextFieldRoot>
  );
}

export const TextField = Object.assign(TextFieldDefault, {
  Root: TextFieldRoot,
  ...fieldParts,
  Input: FieldInput,
  TextArea: FieldTextArea,
  Control: FieldControl,
});

export interface TextAreaRootProps extends RACTextFieldProps, FieldPresentationProps {
  size?: ControlSize;
  ref?: Ref<HTMLDivElement>;
}

function TextAreaRoot({
  size = "md",
  className,
  children,
  status,
  statusVariant,
  isOptional,
  ...props
}: TextAreaRootProps) {
  const anatomy = useFieldAnatomy(
    { ...props, status, statusVariant, isOptional },
    TextFieldContext as Parameters<typeof useFieldAnatomy>[1],
  );
  return (
    <RACTextField
      {...props}
      {...anatomy.props}
      data-size={size}
      className={classes(fieldClassName("text-area"), className)}
    >
      {anatomy.wrap(children, anatomy.slotted?.children as ReactNode)}
    </RACTextField>
  );
}

export interface TextAreaProps extends TextAreaRootProps, FieldContentProps {
  placeholder?: string;
  rows?: number;
  inputRef?: Ref<HTMLTextAreaElement>;
}

function TextAreaDefault({
  label,
  labelTooltip,
  description,
  errorMessage,
  placeholder,
  rows = 4,
  size = "md",
  inputRef,
  className,
  children,
  ...props
}: TextAreaProps) {
  return (
    <TextAreaRoot
      {...props}
      size={size}
      className={className}
      data-hashti-input-icon={children == null ? "" : undefined}
    >
      {children ?? (
        <FieldLayout
          inlineIcon
          label={label}
          labelTooltip={labelTooltip}
          description={description}
          errorMessage={errorMessage}
        >
          <FieldTextArea rows={rows} placeholder={placeholder} ref={inputRef} />
        </FieldLayout>
      )}
    </TextAreaRoot>
  );
}

export const TextArea = Object.assign(TextAreaDefault, {
  Root: TextAreaRoot,
  ...fieldParts,
  Input: FieldTextArea,
  Control: FieldControl,
});
