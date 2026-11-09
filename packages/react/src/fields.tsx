import type { ReactNode, Ref } from "react";
import {
  TextField as RACTextField,
  NumberField as RACNumberField,
  SearchField as RACSearchField,
  TextFieldContext,
  NumberFieldContext,
  SearchFieldContext,
  useSlottedContext,
  Input,
  type TextFieldProps as RACTextFieldProps,
  type NumberFieldProps as RACNumberFieldProps,
  type SearchFieldProps as RACSearchFieldProps,
  type FieldErrorProps,
  type InputProps,
} from "react-aria-components";
import { Icon } from "./icons";
import {
  FieldLabel,
  FieldDescription,
  FieldErrorMessage,
  FieldHelp,
  FieldInput,
  FieldGroupInput,
  FieldTextArea,
  FieldControl,
  FieldButton,
  FieldStatusMessage,
  FieldStatusIcon,
  useFieldPresentation,
  type FieldPresentationProps,
  fieldParts,
} from "./field-parts";
import { useTheme } from "./theme";
import { classes, type ControlSize } from "./utils";

export interface FieldContentProps {
  label?: ReactNode;
  labelTooltip?: ReactNode;
  description?: ReactNode;
  errorMessage?: FieldErrorProps["children"];
}

export function FieldLayout({
  label,
  labelTooltip,
  description,
  errorMessage,
  children,
  inlineIcon,
}: FieldContentProps & { children: ReactNode; inlineIcon?: boolean }) {
  const { theme } = useTheme();
  const isFrame = theme === "frame-light" || theme === "frame-dark";
  return (
    <>
      {label != null && <FieldLabel labelTooltip={labelTooltip}>{label}</FieldLabel>}
      {isFrame && description != null && <FieldDescription>{description}</FieldDescription>}
      {children}
      {inlineIcon && <FieldStatusIcon />}
      <FieldHelp>
        {!isFrame && description != null && <FieldDescription>{description}</FieldDescription>}
        <FieldErrorMessage>{errorMessage}</FieldErrorMessage>
        <FieldStatusMessage />
      </FieldHelp>
    </>
  );
}

export interface TextFieldRootProps extends RACTextFieldProps, FieldPresentationProps {
  size?: ControlSize;
  ref?: Ref<HTMLDivElement>;
}

function TextFieldRoot({
  size = "md",
  className,
  children,
  status,
  isOptional,
  ...props
}: TextFieldRootProps) {
  const context = useSlottedContext(TextFieldContext, props.slot);
  const presentation = useFieldPresentation(
    { ...props, status, isOptional },
    context?.["aria-describedby"],
  );
  return (
    <RACTextField
      {...props}
      {...presentation.props}
      data-size={size}
      className={classes("cinder-field cinder-text-field", className)}
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
      data-cinder-input-icon={children == null ? "" : undefined}
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

function TextAreaRoot({ className, children, status, isOptional, ...props }: TextAreaRootProps) {
  const context = useSlottedContext(TextFieldContext, props.slot);
  const presentation = useFieldPresentation(
    { ...props, status, isOptional },
    context?.["aria-describedby"],
  );
  return (
    <RACTextField
      {...props}
      {...presentation.props}
      className={classes("cinder-field cinder-text-area", className)}
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
      data-cinder-input-icon={children == null ? "" : undefined}
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

export interface NumberFieldRootProps extends RACNumberFieldProps, FieldPresentationProps {
  size?: ControlSize;
  ref?: Ref<HTMLDivElement>;
}

function NumberFieldRoot({
  size = "md",
  className,
  children,
  status,
  isOptional,
  ...props
}: NumberFieldRootProps) {
  const context = useSlottedContext(NumberFieldContext, props.slot);
  const presentation = useFieldPresentation(
    { ...props, status, isOptional },
    context?.["aria-describedby"],
  );
  return (
    <RACNumberField
      {...props}
      {...presentation.props}
      data-size={size}
      className={classes("cinder-field cinder-number-field", className)}
    >
      {presentation.wrap(children, context?.children)}
    </RACNumberField>
  );
}

export interface NumberFieldProps extends NumberFieldRootProps, FieldContentProps {}

function NumberFieldDefault({
  label,
  labelTooltip,
  description,
  errorMessage,
  size = "md",
  className,
  children,
  ...props
}: NumberFieldProps) {
  return (
    <NumberFieldRoot {...props} size={size} className={className}>
      {children ?? (
        <FieldLayout
          label={label}
          labelTooltip={labelTooltip}
          description={description}
          errorMessage={errorMessage}
        >
          <FieldControl>
            <FieldGroupInput />
            <FieldButton slot="decrement" size={size}>
              <Icon name="minus" />
            </FieldButton>
            <FieldButton slot="increment" size={size}>
              <Icon name="plus" />
            </FieldButton>
          </FieldControl>
        </FieldLayout>
      )}
    </NumberFieldRoot>
  );
}

export const NumberField = Object.assign(NumberFieldDefault, {
  Root: NumberFieldRoot,
  ...fieldParts,
  Input: FieldGroupInput,
  Control: FieldControl,
  Button: FieldButton,
});

export interface SearchFieldRootProps extends RACSearchFieldProps, FieldPresentationProps {
  size?: ControlSize;
  ref?: Ref<HTMLDivElement>;
}

function SearchFieldRoot({
  size = "md",
  className,
  children,
  status,
  isOptional,
  ...props
}: SearchFieldRootProps) {
  const context = useSlottedContext(SearchFieldContext, props.slot);
  const presentation = useFieldPresentation(
    { ...props, status, isOptional },
    context?.["aria-describedby"],
  );
  return (
    <RACSearchField
      {...props}
      {...presentation.props}
      data-size={size}
      className={classes("cinder-field cinder-search-field", className)}
    >
      {presentation.wrap(children, context?.children)}
    </RACSearchField>
  );
}

export interface SearchFieldProps extends SearchFieldRootProps, FieldContentProps {
  placeholder?: string;
  inputProps?: InputProps;
}

function SearchFieldDefault({
  label,
  labelTooltip,
  description,
  errorMessage,
  size = "md",
  placeholder = "Search",
  inputProps,
  className,
  children,
  ...props
}: SearchFieldProps) {
  return (
    <SearchFieldRoot {...props} size={size} className={className}>
      {children ?? (
        <FieldLayout
          label={label}
          labelTooltip={labelTooltip}
          description={description}
          errorMessage={errorMessage}
        >
          <FieldControl>
            <Icon name="search" />
            <Input placeholder={placeholder} {...inputProps} />
            <FieldButton size={size}>
              <Icon name="close" />
            </FieldButton>
          </FieldControl>
        </FieldLayout>
      )}
    </SearchFieldRoot>
  );
}

export const SearchField = Object.assign(SearchFieldDefault, {
  Root: SearchFieldRoot,
  ...fieldParts,
  Input: FieldGroupInput,
  Control: FieldControl,
  ClearButton: FieldButton,
});
