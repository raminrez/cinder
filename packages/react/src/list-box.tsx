"use client";

import {
  createContext,
  useContext,
  type ComponentPropsWithRef,
  type ReactNode,
  type Ref,
} from "react";
import {
  ListBox as RACListBox,
  ListBoxItem as RACListBoxItem,
  ListBoxSection as RACListBoxSection,
  Header as RACHeader,
  Button as RACButton,
  Checkbox as RACCheckbox,
  type ListBoxProps as RACListBoxProps,
  type ListBoxItemProps as RACListBoxItemProps,
  type ListBoxSectionProps as RACListBoxSectionProps,
  type ListBoxRenderProps,
  type ListBoxItemRenderProps,
  type ButtonProps as RACButtonProps,
  type CheckboxProps as RACCheckboxProps,
  type ButtonRenderProps,
  type CheckboxRenderProps,
} from "react-aria-components";
import { classes, cx, type ControlSize } from "./utils";
import { Icon } from "./icons";

export interface ListBoxContextValue {
  size?: ControlSize;
  variant?: "flat" | "bordered" | "card";
}

export const ListBoxContext = createContext<ListBoxContextValue>({});

export interface ListBoxRootProps<T extends object>
  extends Omit<RACListBoxProps<T>, "className"> {
  size?: ControlSize;
  variant?: "flat" | "bordered" | "card";
  emptyContent?: ReactNode;
  className?: string | ((values: ListBoxRenderProps) => string);
  ref?: Ref<HTMLDivElement>;
}

export function ListBoxRoot<T extends object>({
  size = "md",
  variant = "bordered",
  emptyContent,
  renderEmptyState,
  className,
  children,
  ref,
  ...props
}: ListBoxRootProps<T>) {
  const resolvedEmptyState = renderEmptyState ?? (emptyContent ? () => (
    <div className="cinder-listbox-empty-content">{emptyContent}</div>
  ) : undefined);

  return (
    <ListBoxContext.Provider value={{ size, variant }}>
      <RACListBox
        {...props}
        ref={ref}
        renderEmptyState={resolvedEmptyState}
        data-size={size}
        data-variant={variant}
        className={classes(
          cx(
            "cinder-listbox",
            `cinder-listbox--${size}`,
            `cinder-listbox--${variant}`
          ),
          className
        )}
      >
        {children as any}
      </RACListBox>
    </ListBoxContext.Provider>
  );
}

export interface ListBoxItemProps<T extends object = object>
  extends Omit<RACListBoxItemProps<T>, "className"> {
  className?: string | ((values: ListBoxItemRenderProps) => string);
  ref?: Ref<HTMLDivElement>;
}

export function ListBoxItem<T extends object = object>({
  className,
  children,
  ref,
  ...props
}: ListBoxItemProps<T>) {
  const { size, variant } = useContext(ListBoxContext);

  return (
    <RACListBoxItem
      {...props}
      ref={ref}
      data-size={size}
      data-variant={variant}
      className={classes(
        cx(
          "cinder-listbox-item",
          size && `cinder-listbox-item--${size}`
        ),
        className
      )}
    >
      {children as any}
    </RACListBoxItem>
  );
}

export interface ListBoxSectionProps<T extends object = object>
  extends RACListBoxSectionProps<T> {
  title?: ReactNode;
}

export function ListBoxSection<T extends object = object>({
  className,
  title,
  children,
  ...props
}: ListBoxSectionProps<T>) {
  return (
    <RACListBoxSection {...props} className={cx("cinder-listbox-section", className)}>
      {title && <RACHeader className="cinder-listbox-header">{title}</RACHeader>}
      {children as any}
    </RACListBoxSection>
  );
}

export interface ListBoxHeaderProps extends ComponentPropsWithRef<typeof RACHeader> {}

export function ListBoxHeader({ className, children, ...props }: ListBoxHeaderProps) {
  return (
    <RACHeader {...props} className={cx("cinder-listbox-header", className)}>
      {children as any}
    </RACHeader>
  );
}

export interface ListBoxDragHandleProps extends Omit<RACButtonProps, "className"> {
  "aria-label"?: string;
  className?: string | ((values: ButtonRenderProps) => string);
}

export function ListBoxDragHandle({
  className,
  "aria-label": ariaLabel = "Reorder item",
  children,
  ...props
}: ListBoxDragHandleProps) {
  return (
    <RACButton
      slot="drag"
      aria-label={ariaLabel}
      {...props}
      className={classes("cinder-listbox-drag-handle", className)}
    >
      {children ?? <Icon name="menu" size={16} />}
    </RACButton>
  );
}

export interface ListBoxCheckboxProps extends Omit<RACCheckboxProps, "className"> {
  className?: string | ((values: CheckboxRenderProps) => string);
}

export function ListBoxCheckbox({ className, children, ...props }: ListBoxCheckboxProps) {
  return (
    <RACCheckbox
      slot="selection"
      {...props}
      className={classes("cinder-listbox-checkbox", className)}
    >
      {children as any}
    </RACCheckbox>
  );
}

export interface ListBoxEmptyStateProps {
  children?: ReactNode;
  className?: string;
}

export function ListBoxEmptyState({
  children,
  className,
}: ListBoxEmptyStateProps) {
  return (
    <div className={cx("cinder-listbox-empty-state", className)}>
      {children as any}
    </div>
  );
}

export interface ListBoxProps<T extends object> extends ListBoxRootProps<T> {}

function ListBoxDefault<T extends object>(props: ListBoxProps<T>) {
  return <ListBoxRoot {...props} />;
}

export const ListBox = Object.assign(ListBoxDefault, {
  Root: ListBoxRoot,
  Item: ListBoxItem,
  Section: ListBoxSection,
  Header: ListBoxHeader,
  DragHandle: ListBoxDragHandle,
  Checkbox: ListBoxCheckbox,
  EmptyState: ListBoxEmptyState,
});
