import type { Ref } from "react";
import {
  Calendar as RACCalendar,
  RangeCalendar as RACRangeCalendar,
  CalendarGrid,
  CalendarGridHeader,
  CalendarGridBody,
  CalendarHeaderCell,
  CalendarCell,
  Heading,
  DatePicker as RACDatePicker,
  DateRangePicker as RACDateRangePicker,
  DateField as RACDateField,
  TimeField as RACTimeField,
  DateSegment,
  DatePickerContext,
  DateRangePickerContext,
  DateFieldContext,
  TimeFieldContext,
  useSlottedContext,
  type CalendarProps as RACCalendarProps,
  type RangeCalendarProps as RACRangeCalendarProps,
  type DatePickerProps as RACDatePickerProps,
  type DateRangePickerProps as RACDateRangePickerProps,
  type DateFieldProps as RACDateFieldProps,
  type TimeFieldProps as RACTimeFieldProps,
  type DateValue,
  type TimeValue,
} from "react-aria-components";
import { Button } from "./buttons";
import { Icon } from "./icons";
import { Popover, Dialog, type PopoverProps } from "./overlays";
import { FieldLayout, type FieldContentProps } from "./fields";
import {
  FieldControl,
  FieldButton,
  FieldDateInput,
  FieldGroupDateInput,
  useFieldPresentation,
  type FieldPresentationProps,
  fieldParts,
} from "./field-parts";
import { classes, type ControlSize } from "./utils";

function CalendarContent() {
  return (
    <>
      <div className="cinder-calendar-header">
        <Button variant="ghost" iconOnly size="md" slot="previous">
          <Icon name="chevronLeft" />
        </Button>
        <Heading />
        <Button variant="ghost" iconOnly size="md" slot="next">
          <Icon name="chevronRight" />
        </Button>
      </div>
      <CalendarGrid>
        <CalendarGridHeader>
          {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
        </CalendarGridHeader>
        <CalendarGridBody>{(date) => <CalendarCell date={date} />}</CalendarGridBody>
      </CalendarGrid>
    </>
  );
}

export interface CalendarProps<T extends DateValue> extends RACCalendarProps<T> {
  ref?: Ref<HTMLDivElement>;
}
export function Calendar<T extends DateValue>({ className, children, ...props }: CalendarProps<T>) {
  return (
    <RACCalendar {...props} className={classes("cinder-calendar", className)}>
      {children ?? <CalendarContent />}
    </RACCalendar>
  );
}
export interface RangeCalendarProps<T extends DateValue> extends RACRangeCalendarProps<T> {
  ref?: Ref<HTMLDivElement>;
}
export function RangeCalendar<T extends DateValue>({
  className,
  children,
  ...props
}: RangeCalendarProps<T>) {
  return (
    <RACRangeCalendar
      {...props}
      className={classes("cinder-calendar cinder-range-calendar", className)}
    >
      {children ?? <CalendarContent />}
    </RACRangeCalendar>
  );
}

function DatePopover({ className, ...props }: PopoverProps) {
  return <Popover {...props} className={classes("cinder-date-popover", className)} />;
}

export interface DatePickerRootProps<T extends DateValue>
  extends RACDatePickerProps<T>, FieldPresentationProps {
  size?: ControlSize;
  ref?: Ref<HTMLDivElement>;
}

function DatePickerRoot<T extends DateValue>({
  size = "md",
  className,
  children,
  status,
  isOptional,
  ...props
}: DatePickerRootProps<T>) {
  const context = useSlottedContext(DatePickerContext, props.slot);
  const presentation = useFieldPresentation(
    { ...props, status, isOptional },
    context?.["aria-describedby"],
  );
  return (
    <RACDatePicker<T>
      {...props}
      {...presentation.props}
      data-size={size}
      className={classes("cinder-field cinder-date-picker", className)}
    >
      {presentation.wrap(children, context?.children)}
    </RACDatePicker>
  );
}

export interface DatePickerProps<T extends DateValue>
  extends DatePickerRootProps<T>, FieldContentProps {}

function DatePickerDefault<T extends DateValue>({
  label,
  labelTooltip,
  description,
  errorMessage,
  children,
  className,
  size = "md",
  ...props
}: DatePickerProps<T>) {
  return (
    <DatePickerRoot<T> {...props} size={size} className={className}>
      {children ?? (
        <>
          <FieldLayout
            label={label}
            labelTooltip={labelTooltip}
            description={description}
            errorMessage={errorMessage}
          >
            <FieldControl>
              <FieldGroupDateInput>
                {(segment) => <DateSegment segment={segment} />}
              </FieldGroupDateInput>
              <FieldButton size={size}>
                <Icon name="calendar" />
              </FieldButton>
            </FieldControl>
          </FieldLayout>
          <DatePopover>
            <Dialog aria-label="Choose a date">
              <Calendar />
            </Dialog>
          </DatePopover>
        </>
      )}
    </DatePickerRoot>
  );
}

export const DatePicker = Object.assign(DatePickerDefault, {
  Root: DatePickerRoot,
  ...fieldParts,
  Input: FieldGroupDateInput,
  Segment: DateSegment,
  Control: FieldControl,
  Trigger: FieldButton,
  Popover: DatePopover,
  Calendar,
});

export interface DateRangePickerRootProps<T extends DateValue>
  extends RACDateRangePickerProps<T>, FieldPresentationProps {
  size?: ControlSize;
  ref?: Ref<HTMLDivElement>;
}

function DateRangePickerRoot<T extends DateValue>({
  size = "md",
  className,
  children,
  status,
  isOptional,
  ...props
}: DateRangePickerRootProps<T>) {
  const context = useSlottedContext(DateRangePickerContext, props.slot);
  const presentation = useFieldPresentation(
    { ...props, status, isOptional },
    context?.["aria-describedby"],
  );
  return (
    <RACDateRangePicker<T>
      {...props}
      {...presentation.props}
      data-size={size}
      className={classes("cinder-field cinder-date-range-picker", className)}
    >
      {presentation.wrap(children, context?.children)}
    </RACDateRangePicker>
  );
}

export interface DateRangePickerProps<T extends DateValue>
  extends DateRangePickerRootProps<T>, FieldContentProps {}

function DateRangePickerDefault<T extends DateValue>({
  label,
  labelTooltip,
  description,
  errorMessage,
  children,
  className,
  size = "md",
  ...props
}: DateRangePickerProps<T>) {
  return (
    <DateRangePickerRoot<T> {...props} size={size} className={className}>
      {children ?? (
        <>
          <FieldLayout
            label={label}
            labelTooltip={labelTooltip}
            description={description}
            errorMessage={errorMessage}
          >
            <FieldControl>
              <FieldGroupDateInput slot="start">
                {(segment) => <DateSegment segment={segment} />}
              </FieldGroupDateInput>
              <span aria-hidden="true">–</span>
              <FieldGroupDateInput slot="end">
                {(segment) => <DateSegment segment={segment} />}
              </FieldGroupDateInput>
              <FieldButton size={size}>
                <Icon name="calendar" />
              </FieldButton>
            </FieldControl>
          </FieldLayout>
          <DatePopover>
            <Dialog aria-label="Choose a date range">
              <RangeCalendar />
            </Dialog>
          </DatePopover>
        </>
      )}
    </DateRangePickerRoot>
  );
}

export const DateRangePicker = Object.assign(DateRangePickerDefault, {
  Root: DateRangePickerRoot,
  ...fieldParts,
  Input: FieldGroupDateInput,
  Segment: DateSegment,
  Control: FieldControl,
  Trigger: FieldButton,
  Popover: DatePopover,
  Calendar: RangeCalendar,
});

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
  isOptional,
  ...props
}: DateFieldRootProps<T>) {
  const context = useSlottedContext(DateFieldContext, props.slot);
  const presentation = useFieldPresentation(
    { ...props, status, isOptional },
    context?.["aria-describedby"],
  );
  return (
    <RACDateField<T>
      {...props}
      {...presentation.props}
      data-size={size}
      className={classes("cinder-field cinder-date-field", className)}
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
  isOptional,
  ...props
}: TimeFieldRootProps<T>) {
  const context = useSlottedContext(TimeFieldContext, props.slot);
  const presentation = useFieldPresentation(
    { ...props, status, isOptional },
    context?.["aria-describedby"],
  );
  return (
    <RACTimeField<T>
      {...props}
      {...presentation.props}
      data-size={size}
      className={classes("cinder-field cinder-date-field", className)}
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
