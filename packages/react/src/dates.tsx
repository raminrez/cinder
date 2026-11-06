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
  DateInput,
  DateSegment,
  Group,
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
import { Popover, Dialog } from "./overlays";
import { FieldLabel, FieldHelp, type FieldContentProps } from "./fields";
import { classes, type ControlSize } from "./utils";

function CalendarContent() {
  return (
    <>
      <header className="cinder-calendar-header">
        <Button variant="ghost" iconOnly size="md" slot="previous">
          <Icon name="chevronLeft" />
        </Button>
        <Heading />
        <Button variant="ghost" iconOnly size="md" slot="next">
          <Icon name="chevronRight" />
        </Button>
      </header>
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

export interface DatePickerProps<T extends DateValue>
  extends RACDatePickerProps<T>, FieldContentProps {
  size?: ControlSize;
  ref?: Ref<HTMLDivElement>;
}
export function DatePicker<T extends DateValue>({
  label,
  description,
  errorMessage,
  children,
  className,
  size = "md",
  ...props
}: DatePickerProps<T>) {
  return (
    <RACDatePicker
      {...props}
      data-size={size}
      className={classes("cinder-field cinder-date-picker", className)}
    >
      {children ?? (
        <>
          <FieldLabel label={label} />
          <Group className="cinder-input-group">
            <DateInput>{(segment) => <DateSegment segment={segment} />}</DateInput>
            <Button variant="ghost" size={size} iconOnly>
              <Icon name="calendar" />
            </Button>
          </Group>
          <FieldHelp description={description} errorMessage={errorMessage} />
          <Popover className="cinder-date-popover">
            <Dialog aria-label="Choose a date">
              <Calendar />
            </Dialog>
          </Popover>
        </>
      )}
    </RACDatePicker>
  );
}

export interface DateRangePickerProps<T extends DateValue>
  extends RACDateRangePickerProps<T>, FieldContentProps {
  size?: ControlSize;
  ref?: Ref<HTMLDivElement>;
}
export function DateRangePicker<T extends DateValue>({
  label,
  description,
  errorMessage,
  children,
  className,
  size = "md",
  ...props
}: DateRangePickerProps<T>) {
  return (
    <RACDateRangePicker
      {...props}
      data-size={size}
      className={classes("cinder-field cinder-date-range-picker", className)}
    >
      {children ?? (
        <>
          <FieldLabel label={label} />
          <Group className="cinder-input-group">
            <DateInput slot="start">{(segment) => <DateSegment segment={segment} />}</DateInput>
            <span aria-hidden="true">–</span>
            <DateInput slot="end">{(segment) => <DateSegment segment={segment} />}</DateInput>
            <Button variant="ghost" size={size} iconOnly>
              <Icon name="calendar" />
            </Button>
          </Group>
          <FieldHelp description={description} errorMessage={errorMessage} />
          <Popover className="cinder-date-popover">
            <Dialog aria-label="Choose a date range">
              <RangeCalendar />
            </Dialog>
          </Popover>
        </>
      )}
    </RACDateRangePicker>
  );
}

export interface DateFieldProps<T extends DateValue>
  extends RACDateFieldProps<T>, FieldContentProps {
  size?: ControlSize;
  ref?: Ref<HTMLDivElement>;
}
export function DateField<T extends DateValue>({
  label,
  description,
  errorMessage,
  className,
  children,
  size = "md",
  ...props
}: DateFieldProps<T>) {
  return (
    <RACDateField
      {...props}
      data-size={size}
      className={classes("cinder-field cinder-date-field", className)}
    >
      {children ?? (
        <>
          <FieldLabel label={label} />
          <DateInput>{(segment) => <DateSegment segment={segment} />}</DateInput>
          <FieldHelp description={description} errorMessage={errorMessage} />
        </>
      )}
    </RACDateField>
  );
}

export interface TimeFieldProps<T extends TimeValue>
  extends RACTimeFieldProps<T>, FieldContentProps {
  size?: ControlSize;
  ref?: Ref<HTMLDivElement>;
}
export function TimeField<T extends TimeValue>({
  label,
  description,
  errorMessage,
  className,
  children,
  size = "md",
  ...props
}: TimeFieldProps<T>) {
  return (
    <RACTimeField
      {...props}
      data-size={size}
      className={classes("cinder-field cinder-date-field", className)}
    >
      {children ?? (
        <>
          <FieldLabel label={label} />
          <DateInput>{(segment) => <DateSegment segment={segment} />}</DateInput>
          <FieldHelp description={description} errorMessage={errorMessage} />
        </>
      )}
    </RACTimeField>
  );
}
