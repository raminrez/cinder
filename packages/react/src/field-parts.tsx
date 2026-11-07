import type { ComponentProps } from "react";
import { Label, Text, FieldError, Input, TextArea, Group, DateInput } from "react-aria-components";
import { Button, type ButtonProps } from "./buttons";
import { classes } from "./utils";

export type FieldLabelProps = ComponentProps<typeof Label>;
export function FieldLabel({ className, ...props }: FieldLabelProps) {
  return (
    <Label
      {...props}
      className={["cinder-field__label react-aria-Label", className].filter(Boolean).join(" ")}
    />
  );
}

export type FieldDescriptionProps = ComponentProps<typeof Text>;
export function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return (
    <Text
      slot="description"
      {...props}
      className={["cinder-field__description react-aria-Text", className].filter(Boolean).join(" ")}
    />
  );
}

export type FieldErrorMessageProps = ComponentProps<typeof FieldError>;
export function FieldErrorMessage({ className, ...props }: FieldErrorMessageProps) {
  return (
    <FieldError
      {...props}
      className={classes("cinder-field__error react-aria-FieldError", className)}
    />
  );
}

export type FieldHelpProps = ComponentProps<"div">;
export function FieldHelp({ className, ...props }: FieldHelpProps) {
  return (
    <div
      {...props}
      className={["cinder-field__help cinder-field-help", className].filter(Boolean).join(" ")}
    />
  );
}

export type FieldInputProps = ComponentProps<typeof Input>;
export function FieldInput({ className, ...props }: FieldInputProps) {
  return (
    <Input {...props} className={classes("cinder-field__control react-aria-Input", className)} />
  );
}

export function FieldGroupInput({ className, ...props }: FieldInputProps) {
  return <Input {...props} className={classes("react-aria-Input", className)} />;
}

export type FieldTextAreaProps = ComponentProps<typeof TextArea>;
export function FieldTextArea({ className, ...props }: FieldTextAreaProps) {
  return (
    <TextArea
      {...props}
      className={classes("cinder-field__control react-aria-TextArea", className)}
    />
  );
}

export type FieldControlProps = ComponentProps<typeof Group>;
export function FieldControl({ className, ...props }: FieldControlProps) {
  return (
    <Group {...props} className={classes("cinder-field__control cinder-input-group", className)} />
  );
}

export function FieldButton({ size = "md", ...props }: ButtonProps) {
  return <Button variant="ghost" iconOnly {...props} size={size} />;
}

export type FieldDateInputProps = ComponentProps<typeof DateInput>;
export function FieldDateInput({ className, ...props }: FieldDateInputProps) {
  return (
    <DateInput
      {...props}
      className={classes("cinder-field__control react-aria-DateInput", className)}
    />
  );
}

export function FieldGroupDateInput({ className, ...props }: FieldDateInputProps) {
  return <DateInput {...props} className={classes("react-aria-DateInput", className)} />;
}

export const fieldParts = {
  Label: FieldLabel,
  Description: FieldDescription,
  Help: FieldHelp,
  ErrorMessage: FieldErrorMessage,
};
