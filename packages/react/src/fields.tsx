import type { ReactNode, Ref } from "react";
import {
  TextField as RACTextField,
  NumberField as RACNumberField,
  SearchField as RACSearchField,
  Label,
  Input,
  TextArea as RACTextArea,
  Group,
  Text,
  FieldError,
  type TextFieldProps as RACTextFieldProps,
  type NumberFieldProps as RACNumberFieldProps,
  type SearchFieldProps as RACSearchFieldProps,
  type FieldErrorProps,
  type InputProps,
} from "react-aria-components";
import { Button } from "./buttons";
import { Icon } from "./icons";
import { classes, type ControlSize } from "./utils";

export interface FieldContentProps {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: FieldErrorProps["children"];
}

export function FieldLabel({ label }: Pick<FieldContentProps, "label">) {
  return label != null ? <Label>{label}</Label> : null;
}

export function FieldHelp({ description, errorMessage }: Omit<FieldContentProps, "label">) {
  return <>{description != null && <Text slot="description">{description}</Text>}<FieldError>{errorMessage}</FieldError></>;
}

export interface TextFieldProps extends RACTextFieldProps, FieldContentProps {
  size?: ControlSize;
  placeholder?: string;
  inputRef?: Ref<HTMLInputElement>;
  ref?: Ref<HTMLDivElement>;
}

export function TextField({ label, description, errorMessage, size = "md", placeholder, inputRef, className, children, ...props }: TextFieldProps) {
  return <RACTextField {...props} data-size={size} className={classes("cinder-field cinder-text-field", className)}>
    {children ?? <><FieldLabel label={label} /><Input placeholder={placeholder} ref={inputRef} /><FieldHelp description={description} errorMessage={errorMessage} /></>}
  </RACTextField>;
}

export interface TextAreaProps extends RACTextFieldProps, FieldContentProps {
  placeholder?: string;
  rows?: number;
  inputRef?: Ref<HTMLTextAreaElement>;
  ref?: Ref<HTMLDivElement>;
}

export function TextArea({ label, description, errorMessage, placeholder, rows = 4, inputRef, className, children, ...props }: TextAreaProps) {
  return <RACTextField {...props} className={classes("cinder-field cinder-text-area", className)}>
    {children ?? <><FieldLabel label={label} /><RACTextArea rows={rows} placeholder={placeholder} ref={inputRef} /><FieldHelp description={description} errorMessage={errorMessage} /></>}
  </RACTextField>;
}

export interface NumberFieldProps extends RACNumberFieldProps, FieldContentProps {
  size?: ControlSize;
  ref?: Ref<HTMLDivElement>;
}

export function NumberField({ label, description, errorMessage, size = "md", className, children, ...props }: NumberFieldProps) {
  return <RACNumberField {...props} data-size={size} className={classes("cinder-field cinder-number-field", className)}>
    {children ?? <><FieldLabel label={label} /><Group className="cinder-input-group"><Input /><Button slot="decrement" variant="ghost" size={size} iconOnly><Icon name="minus" /></Button><Button slot="increment" variant="ghost" size={size} iconOnly><Icon name="plus" /></Button></Group><FieldHelp description={description} errorMessage={errorMessage} /></>}
  </RACNumberField>;
}

export interface SearchFieldProps extends RACSearchFieldProps, FieldContentProps {
  size?: ControlSize;
  placeholder?: string;
  ref?: Ref<HTMLDivElement>;
  inputProps?: InputProps;
}

export function SearchField({ label, description, errorMessage, size = "md", placeholder = "Search", inputProps, className, children, ...props }: SearchFieldProps) {
  return <RACSearchField {...props} data-size={size} className={classes("cinder-field cinder-search-field", className)}>
    {children ?? <><FieldLabel label={label} /><Group className="cinder-input-group"><Icon name="search" /><Input placeholder={placeholder} {...inputProps} /><Button variant="ghost" size={size} iconOnly><Icon name="close" /></Button></Group><FieldHelp description={description} errorMessage={errorMessage} /></>}
  </RACSearchField>;
}
