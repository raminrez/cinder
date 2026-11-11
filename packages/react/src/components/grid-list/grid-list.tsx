"use client";

import {
  createContext,
  useContext,
  type ReactNode,
  type Ref,
} from "react";
import {
  GridList as RACGridList,
  GridListItem as RACGridListItem,
  GridListLoadMoreItem as RACGridListLoadMoreItem,
  Button as RACButton,
  Checkbox as RACCheckbox,
  type GridListProps as RACGridListProps,
  type GridListItemProps as RACGridListItemProps,
  type GridListLoadMoreItemProps as RACGridListLoadMoreItemProps,
  type GridListRenderProps,
  type GridListItemRenderProps,
  type ButtonProps as RACButtonProps,
  type CheckboxProps as RACCheckboxProps,
  type ButtonRenderProps,
  type CheckboxRenderProps,
} from "react-aria-components";
import { classes, cx, type ControlSize } from "../../utils";
import { Icon } from "../../icons";

export interface GridListContextValue {
  size?: ControlSize;
  variant?: "flat" | "bordered" | "card";
}

export const GridListContext = createContext<GridListContextValue>({});

export interface GridListRootProps<T extends object>
  extends Omit<RACGridListProps<T>, "className"> {
  size?: ControlSize;
  variant?: "flat" | "bordered" | "card";
  className?: string | ((values: GridListRenderProps) => string);
  emptyContent?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

export function GridListRoot<T extends object>({
  size = "md",
  variant = "bordered",
  emptyContent,
  renderEmptyState,
  className,
  children,
  ref,
  ...props
}: GridListRootProps<T>) {
  const resolvedEmptyState = renderEmptyState ?? (emptyContent ? () => (
    <div className="cinder-grid-list-empty-content">{emptyContent}</div>
  ) : undefined);

  return (
    <GridListContext.Provider value={{ size, variant }}>
      <RACGridList
        {...props}
        ref={ref}
        renderEmptyState={resolvedEmptyState}
        data-size={size}
        data-variant={variant}
        className={classes(
          cx(
            "cinder-grid-list",
            `cinder-grid-list--${size}`,
            `cinder-grid-list--${variant}`
          ),
          className
        )}
      >
        {children}
      </RACGridList>
    </GridListContext.Provider>
  );
}

export interface GridListItemProps<T extends object = object>
  extends Omit<RACGridListItemProps<T>, "className"> {
  className?: string | ((values: GridListItemRenderProps) => string);
  ref?: Ref<HTMLDivElement>;
}

export function GridListItem<T extends object = object>({
  className,
  children,
  ref,
  ...props
}: GridListItemProps<T>) {
  const { size, variant } = useContext(GridListContext);

  return (
    <RACGridListItem
      {...props}
      ref={ref}
      data-size={size}
      data-variant={variant}
      className={classes(
        cx(
          "cinder-grid-list-item",
          size && `cinder-grid-list-item--${size}`
        ),
        className
      )}
    >
      {children}
    </RACGridListItem>
  );
}

export interface GridListDragHandleProps extends Omit<RACButtonProps, "className"> {
  "aria-label"?: string;
  className?: string | ((values: ButtonRenderProps) => string);
}

export function GridListDragHandle({
  className,
  "aria-label": ariaLabel = "Reorder item",
  children,
  ...props
}: GridListDragHandleProps) {
  return (
    <RACButton
      slot="drag"
      aria-label={ariaLabel}
      {...props}
      className={classes("cinder-grid-list-drag-handle", className)}
    >
      {children ?? <Icon name="menu" size={16} />}
    </RACButton>
  );
}

export interface GridListCheckboxProps extends Omit<RACCheckboxProps, "className"> {
  className?: string | ((values: CheckboxRenderProps) => string);
}

export function GridListCheckbox({ className, children, ...props }: GridListCheckboxProps) {
  return (
    <RACCheckbox
      slot="selection"
      {...props}
      className={classes("cinder-grid-list-checkbox", className)}
    >
      {children}
    </RACCheckbox>
  );
}

export interface GridListEmptyStateProps {
  children?: ReactNode;
  className?: string;
}

export function GridListEmptyState({
  children,
  className,
}: GridListEmptyStateProps) {
  return (
    <div className={cx("cinder-grid-list-empty-state", className)}>
      {children}
    </div>
  );
}

export interface GridListLoadMoreProps
  extends Omit<RACGridListLoadMoreItemProps, "className" | "children"> {
  id?: string;
  label?: string;
  isError?: boolean;
  errorMessage?: string;
  retryLabel?: string;
  onRetry?: () => void;
  className?: string;
  children?: ReactNode;
}

export function GridListLoadMore({
  isLoading,
  isError = false,
  errorMessage = "Failed to load more items",
  retryLabel = "Retry",
  onRetry,
  label = "Loading more items…",
  className,
  children,
  ...props
}: GridListLoadMoreProps) {
  const isVisible = Boolean(isLoading || isError);

  return (
    <RACGridListLoadMoreItem
      {...props}
      isLoading={isVisible}
      className={cx("cinder-grid-list-load-more", className)}
    >
      {children ?? (
        <div className="cinder-load-more-content" role="status">
          {isError ? (
            <div className="cinder-load-more-error">
              <span className="cinder-load-more-error-message">{errorMessage}</span>
              {onRetry && (
                <button
                  type="button"
                  className="cinder-load-more-retry"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRetry();
                  }}
                >
                  {retryLabel}
                </button>
              )}
            </div>
          ) : (
            <div className="cinder-load-more-loading">
              <span className="cinder-spinner" aria-hidden="true" />
              <span>{label}</span>
            </div>
          )}
        </div>
      )}
    </RACGridListLoadMoreItem>
  );
}

export interface GridListProps<T extends object> extends GridListRootProps<T> {}

function GridListDefault<T extends object>(props: GridListProps<T>) {
  return <GridListRoot {...props} />;
}

export const GridList = Object.assign(GridListDefault, {
  Root: GridListRoot,
  Item: GridListItem,
  DragHandle: GridListDragHandle,
  Checkbox: GridListCheckbox,
  EmptyState: GridListEmptyState,
  LoadMore: GridListLoadMore,
});
