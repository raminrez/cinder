"use client";

import type { Ref } from "react";
import {
  DateField as RACDateField,
  TimeField as RACTimeField,
  DateSegment,
  DateFieldContext,
  TimeFieldContext,
  useSlottedContext,
  type DateFieldProps as RACDateFieldProps,
  type TimeFieldProps as RACTimeFieldProps,
  type DateValue,
  type TimeValue,
} from "react-aria-components";
import {
  FieldLayout,
  FieldDateInput,
  useFieldPresentation,
  fieldParts,
  type FieldContentProps,
  type FieldPresentationProps,
} from "../field";
import { classes, type ControlSize } from "../../utils";

export interface DateFieldRootProps<T extends DateValue>
  extends RACDateFieldProps<T>, FieldPresentationProps {
  size?: ControlSize;
  ref?: Ref<HTMLDivElement>;
}

function DateFieldRoot<T extends DateValue>({
  size = "md",
  className,
  children,
  status,
  statusVariant,
  isOptional,
  ...props
}: DateFieldRootProps<T>) {
  const context = useSlottedContext(DateFieldContext, props.slot);
  const presentation = useFieldPresentation(
    { ...props, status, statusVariant, isOptional },
    context?.["aria-describedby"],
    "attached",
  );
  return (
    <RACDateField<T>
      {...props}
      {...presentation.props}
      data-size={size}
      className={classes("hashti-field hashti-date-field cinder-field cinder-date-field", className)}
    >
      {presentation.wrap(children, context?.children)}
    </RACDateField>
  );
}

export interface DateFieldProps<T extends DateValue>
  extends DateFieldRootProps<T>, FieldContentProps {}

function DateFieldDefault<T extends DateValue>({
  label,
  labelTooltip,
  description,
  errorMessage,
  className,
  children,
  size = "md",
  ...props
}: DateFieldProps<T>) {
  return (
    <DateFieldRoot<T>
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
          <FieldDateInput>{(segment) => <DateSegment segment={segment} />}</FieldDateInput>
        </FieldLayout>
      )}
    </DateFieldRoot>
  );
}

export const DateField = Object.assign(DateFieldDefault, {
  Root: DateFieldRoot,
  ...fieldParts,
  Input: FieldDateInput,
  Segment: DateSegment,
});

export interface TimeFieldRootProps<T extends TimeValue>
  extends RACTimeFieldProps<T>, FieldPresentationProps {
  size?: ControlSize;
  ref?: Ref<HTMLDivElement>;
}

function TimeFieldRoot<T extends TimeValue>({
  size = "md",
  className,
  children,
  status,
  statusVariant,
  isOptional,
  ...props
}: TimeFieldRootProps<T>) {
  const context = useSlottedContext(TimeFieldContext, props.slot);
  const presentation = useFieldPresentation(
    { ...props, status, statusVariant, isOptional },
    context?.["aria-describedby"],
    "attached",
  );
  return (
    <RACTimeField<T>
      {...props}
      {...presentation.props}
      data-size={size}
      className={classes("hashti-field hashti-time-field cinder-field cinder-date-field", className)}
    >
      {presentation.wrap(children, context?.children)}
    </RACTimeField>
  );
}

export interface TimeFieldProps<T extends TimeValue>
  extends TimeFieldRootProps<T>, FieldContentProps {}

function TimeFieldDefault<T extends TimeValue>({
  label,
  labelTooltip,
  description,
  errorMessage,
  className,
  children,
  size = "md",
  ...props
}: TimeFieldProps<T>) {
  return (
    <TimeFieldRoot<T>
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
          <FieldDateInput>{(segment) => <DateSegment segment={segment} />}</FieldDateInput>
        </FieldLayout>
      )}
    </TimeFieldRoot>
  );
}

export const TimeField = Object.assign(TimeFieldDefault, {
  Root: TimeFieldRoot,
  ...fieldParts,
  Input: FieldDateInput,
  Segment: DateSegment,
});
