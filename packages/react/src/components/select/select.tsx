"use client";

import { type ReactNode, type Ref } from "react";
import {
  Select as RACSelect,
  SelectValue,
  SelectContext,
  useSlottedContext,
  ListBox as RACListBox,
  type SelectProps as RACSelectProps,
  type ListBoxProps,
  type SelectValueProps,
} from "react-aria-components";
import { Button, type ButtonProps } from "../button";
import { Popover, type PopoverProps } from "../popover";
import {
  FieldLayout,
  FieldStatusIcon,
  useFieldPresentation,
  fieldParts,
  type FieldContentProps,
  type FieldPresentationProps,
} from "../field";
import { Icon } from "../../icons";
import { classes, type ControlSize } from "../../utils";

type SelectionMode = "single" | "multiple";

export interface SelectRootProps<T = {}, M extends SelectionMode = "single">
  extends RACSelectProps<T, M>, FieldPresentationProps {
  size?: ControlSize;
  ref?: Ref<HTMLDivElement>;
}

function SelectRoot<T, M extends SelectionMode = "single">({
  size = "md",
  className,
  children,
  status,
  statusVariant,
  isOptional,
  ...props
}: SelectRootProps<T, M>) {
  const context = useSlottedContext(SelectContext, props.slot);
  const presentation = useFieldPresentation(
    { ...props, status, statusVariant, isOptional },
    context?.["aria-describedby"],
    "attached",
  );
  return (
    <RACSelect<T, M>
      {...props}
      {...presentation.props}
      data-size={size}
      className={classes("hashti-field hashti-select hashti-field hashti-select", className)}
    >
      {presentation.wrap(children, context?.children)}
    </RACSelect>
  );
}

function SelectTrigger({ className, children, size = "md", ...props }: ButtonProps) {
  return (
    <Button
      variant="ghost"
      {...props}
      size={size}
      className={classes("hashti-field__control hashti-select-trigger hashti-field__control hashti-select-trigger", className)}
    >
      {composeTriggerContent(children)}
    </Button>
  );
}

function composeTriggerContent(children: ReactNode | ((values: any) => ReactNode)) {
  return (
    <>
      {typeof children === "function" ? (values: any) => children(values) : children}
      <FieldStatusIcon />
    </>
  );
}

function SelectValuePart<T>({
  className,
  ...props
}: SelectValueProps<T> & { ref?: Ref<HTMLSpanElement> }) {
  return (
    <SelectValue<T>
      {...props}
      className={classes("hashti-select__value hashti-select__value react-aria-SelectValue", className)}
    />
  );
}

function SelectPopover({ className, offset = 6, ...props }: PopoverProps) {
  return <Popover offset={offset} {...props} className={classes("hashti-select-popover hashti-select-popover", className)} />;
}

function SelectListBox<T extends object>({
  className,
  ...props
}: ListBoxProps<T> & { ref?: Ref<HTMLDivElement> }) {
  return (
    <RACListBox<T>
      {...props}
      className={classes("hashti-select__listbox hashti-select__listbox react-aria-ListBox", className)}
    />
  );
}

export interface SelectProps<T extends object, M extends SelectionMode = "single">
  extends Omit<SelectRootProps<T, M>, "children">, FieldContentProps {
  items?: Iterable<T>;
  children: ListBoxProps<T>["children"];
  placeholder?: string;
  renderValue?: (selectedItems: T[]) => ReactNode;
  multipleDisplay?: "chips" | "badge" | "text";
}

function SelectDefault<T extends object, M extends SelectionMode = "single">({
  label,
  labelTooltip,
  description,
  errorMessage,
  items,
  children,
  className,
  size = "md",
  placeholder,
  renderValue,
  multipleDisplay = "chips",
  ...props
}: SelectProps<T, M>) {
  const isMultiple = props.selectionMode === "multiple";

  return (
    <SelectRoot<T, M> {...props} placeholder={placeholder} size={size} className={className}>
      <FieldLayout
        label={label}
        labelTooltip={labelTooltip}
        description={description}
        errorMessage={errorMessage}
      >
        <SelectTrigger size={size}>
          <SelectValuePart>
            {renderValue
              ? ({ selectedItems }: any) => renderValue(selectedItems as T[])
              : isMultiple
              ? ({ selectedItems, state, defaultChildren }: any) => {
                  const itemsList = selectedItems.filter(Boolean) as any[];
                  if (!itemsList.length) {
                    return defaultChildren;
                  }

                  if (multipleDisplay === "badge") {
                    return (
                      <span className="hashti-select-multi-badge-wrapper hashti-select-multi-badge-wrapper">
                        <span className="hashti-select-multi-first hashti-select-multi-first">
                          {itemsList[0]?.textValue ?? itemsList[0]?.name ?? itemsList[0]?.rendered ?? itemsList[0]?.id ?? "Selected"}
                        </span>
                        <span className="hashti-badge hashti-badge" data-kind="info">
                          +{itemsList.length - 1}
                        </span>
                      </span>
                    );
                  }

                  if (multipleDisplay === "chips") {
                    return (
                      <span className="hashti-select-chips-wrapper hashti-select-chips-wrapper">
                        {itemsList.map((item, idx) => {
                          const text = item?.textValue ?? item?.name ?? item?.rendered ?? String(item?.id ?? item);
                          const key = item?.id ?? item?.key ?? idx;
                          return (
                            <span
                              key={key}
                              className="hashti-tag hashti-tag hashti-select-chip hashti-select-chip"
                              data-size="sm"
                              role="presentation"
                            >
                              <span>{text}</span>
                              <span
                                role="button"
                                tabIndex={-1}
                                aria-label={`Remove ${text}`}
                                className="hashti-select-chip-remove hashti-select-chip-remove"
                                onPointerDown={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    const currentKeys = new Set(state.selectionManager.selectedKeys);
                                    currentKeys.delete(key);
                                    state.selectionManager.setSelectedKeys(currentKeys);
                                  }
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  const currentKeys = new Set(state.selectionManager.selectedKeys);
                                  currentKeys.delete(key);
                                  state.selectionManager.setSelectedKeys(currentKeys);
                                }}
                              >
                                <Icon name="close" size={16} />
                              </span>
                            </span>
                          );
                        })}
                      </span>
                    );
                  }

                  return defaultChildren;
                }
              : undefined}
          </SelectValuePart>
          <Icon name="chevronDown" />
        </SelectTrigger>
      </FieldLayout>
      <SelectPopover>
        <SelectListBox items={items}>{children}</SelectListBox>
      </SelectPopover>
    </SelectRoot>
  );
}

export const Select = Object.assign(SelectDefault, {
  Root: SelectRoot,
  ...fieldParts,
  Trigger: SelectTrigger,
  Value: SelectValuePart,
  Popover: SelectPopover,
  ListBox: SelectListBox,
});
