"use client";

import type { Ref } from "react";
import {
  NumberField as RACNumberField,
  NumberFieldContext,
  useSlottedContext,
  type NumberFieldProps as RACNumberFieldProps,
} from "react-aria-components";
import { Icon } from "../../icons";
import {
  FieldLayout,
  FieldGroupInput,
  FieldButton,
  FieldControl,
  useFieldPresentation,
  fieldParts,
  type FieldContentProps,
  type FieldPresentationProps,
} from "../field";
import { classes, type ControlSize } from "../../utils";

export interface NumberFieldRootProps extends RACNumberFieldProps, FieldPresentationProps {
  size?: ControlSize;
  ref?: Ref<HTMLDivElement>;
}

function NumberFieldRoot({
  size = "md",
  className,
  children,
  status,
  statusVariant,
  isOptional,
  ...props
}: NumberFieldRootProps) {
  const context = useSlottedContext(NumberFieldContext, props.slot);
  const presentation = useFieldPresentation(
    { ...props, status, statusVariant, isOptional },
    context?.["aria-describedby"],
    "attached",
  );
  return (
    <RACNumberField
      {...props}
      {...presentation.props}
      data-size={size}
      className={classes(
        "hashti-field hashti-number-field hashti-field hashti-number-field",
        className,
      )}
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
