"use client";

import type { Ref } from "react";
import {
  TextField as RACTextField,
  TextFieldContext,
  useSlottedContext,
  type TextFieldProps as RACTextFieldProps,
} from "react-aria-components";
import {
  FieldLayout,
  FieldInput,
  FieldTextArea,
  FieldControl,
  useFieldPresentation,
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
  const context = useSlottedContext(TextFieldContext, props.slot);
  const presentation = useFieldPresentation(
    { ...props, status, statusVariant, isOptional },
    context?.["aria-describedby"],
    "attached",
  );
  return (
    <RACTextField
      {...props}
      {...presentation.props}
      data-size={size}
      className={classes("hashti-field hashti-text-field hashti-field hashti-text-field", className)}
    >
      {presentation.wrap(children, context?.children)}
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
  return (
    <TextFieldRoot
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
  ref?: Ref<HTMLDivElement>;
}

function TextAreaRoot({
  className,
  children,
  status,
  statusVariant,
  isOptional,
  ...props
}: TextAreaRootProps) {
  const context = useSlottedContext(TextFieldContext, props.slot);
  const presentation = useFieldPresentation(
    { ...props, status, statusVariant, isOptional },
    context?.["aria-describedby"],
    "attached",
  );
  return (
    <RACTextField
      {...props}
      {...presentation.props}
      className={classes("hashti-field hashti-text-area hashti-field hashti-text-area", className)}
    >
      {presentation.wrap(children, context?.children)}
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
  inputRef,
  className,
  children,
  ...props
}: TextAreaProps) {
  return (
    <TextAreaRoot
      {...props}
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
