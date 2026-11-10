import {
  Children,
  createContext,
  isValidElement,
  useContext,
  type ComponentProps,
  type ReactNode,
  type Ref,
} from "react";
import {
  Table as RACTable,
  TableLoadMoreItem as RACTableLoadMoreItem,
  Column as RACColumn,
  Tabs as RACTabs,
  DisclosureGroup,
  Disclosure,
  DisclosurePanel,
  Heading,
  Breadcrumbs as RACBreadcrumbs,
  Breadcrumb,
  TagGroup as RACTagGroup,
  TagList,
  Tag as RACTag,
  Label,
  composeRenderProps,
  type TableProps as RACTableProps,
  type TableLoadMoreItemProps as RACTableLoadMoreItemProps,
  type ColumnProps as RACColumnProps,
  type TabsProps as RACTabsProps,
  type DisclosureGroupProps,
  type DisclosureProps,
  type BreadcrumbsProps as RACBreadcrumbsProps,
  type TagGroupProps as RACTagGroupProps,
  type TagListProps,
  type TagProps as RACTagProps,
} from "react-aria-components";
import { Button, Link } from "./buttons";
import { Icon } from "./icons";
import { classes, cx, type ControlSize } from "./utils";

export interface TableProps extends RACTableProps {
  size?: ControlSize | "xl";
  ref?: Ref<HTMLDivElement | HTMLTableElement>;
}
function TableDefault({ className, size = "lg", ...props }: TableProps) {
  return <RACTable {...props} data-size={size} className={classes("cinder-table", className)} />;
}

export interface TableLoadMoreProps
  extends Omit<RACTableLoadMoreItemProps, "className" | "children"> {
  id?: string;
  label?: string;
  isError?: boolean;
  errorMessage?: string;
  retryLabel?: string;
  onRetry?: () => void;
  className?: string;
  children?: ReactNode;
}

export function TableLoadMore({
  isLoading,
  isError = false,
  errorMessage = "Failed to load more rows",
  retryLabel = "Retry",
  onRetry,
  label = "Loading more rows…",
  className,
  children,
  ...props
}: TableLoadMoreProps) {
  const isVisible = Boolean(isLoading || isError);

  return (
    <RACTableLoadMoreItem
      {...props}
      isLoading={isVisible}
      className={cx("cinder-table-load-more", className)}
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
    </RACTableLoadMoreItem>
  );
}

export const Table = Object.assign(TableDefault, {
  LoadMore: TableLoadMore,
});

export interface ColumnProps extends RACColumnProps {
  ref?: Ref<HTMLTableCellElement | HTMLDivElement>;
}
export function Column({ className, children, id, ...props }: ColumnProps) {
  const derivedId = id ?? (typeof children === "string" ? children : undefined);
  return (
    <RACColumn {...props} id={derivedId} className={classes("cinder-column", className)}>
      {composeRenderProps(children, (content, { allowsSorting, sortDirection }) => (
        <>
          {content}
          {allowsSorting && (
            <span className="cinder-sort-icon" aria-hidden="true" data-direction={sortDirection}>
              {sortDirection === "ascending" ? "↑" : "↓"}
            </span>
          )}
        </>
      ))}
    </RACColumn>
  );
}

export interface TabsProps extends RACTabsProps {
  variant?: "line" | "contained";
  ref?: Ref<HTMLDivElement>;
}
export function Tabs({ variant = "line", className, ...props }: TabsProps) {
  return (
    <RACTabs {...props} data-variant={variant} className={classes("cinder-tabs", className)} />
  );
}

export interface AccordionProps extends DisclosureGroupProps {
  size?: ControlSize;
  ref?: Ref<HTMLDivElement>;
}
const AccordionSizeContext = createContext<ControlSize>("md");

export function Accordion({ size = "md", className, ...props }: AccordionProps) {
  return (
    <AccordionSizeContext.Provider value={size}>
      <DisclosureGroup
        {...props}
        data-size={size}
        className={classes("cinder-accordion", className)}
      />
    </AccordionSizeContext.Provider>
  );
}

export interface AccordionItemProps extends Omit<DisclosureProps, "children"> {
  title: ReactNode;
  children: ReactNode;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  ref?: Ref<HTMLDivElement>;
}
export function AccordionItem({
  title,
  children,
  headingLevel = 3,
  className,
  ...props
}: AccordionItemProps) {
  const size = useContext(AccordionSizeContext);
  return (
    <Disclosure {...props} className={classes("cinder-accordion-item", className)}>
      <Heading level={headingLevel}>
        <Button slot="trigger" variant="ghost" size={size} className="cinder-accordion-trigger">
          <Icon name="chevronRight" />
          <span>{title}</span>
        </Button>
      </Heading>
      <DisclosurePanel>{children}</DisclosurePanel>
    </Disclosure>
  );
}

export interface BreadcrumbItemProps extends ComponentProps<"li"> {
  children: ReactNode;
  href?: string;
  isCurrent?: boolean;
}
export function BreadcrumbItem(_props: BreadcrumbItemProps): ReactNode {
  void _props;
  return null;
}

export interface BreadcrumbsProps<T extends object> extends RACBreadcrumbsProps<T> {
  ref?: Ref<HTMLOListElement>;
}
export function Breadcrumbs<T extends object>({
  className,
  children,
  ...props
}: BreadcrumbsProps<T>) {
  const transformed =
    typeof children === "function"
      ? children
      : Children.map(children, (child) => {
          if (isValidElement(child) && child.type === BreadcrumbItem) {
            const { href, isCurrent, children: label, ...rest } = child.props as BreadcrumbItemProps;
            return (
              <Breadcrumb {...rest}>
                <Link href={href} aria-current={isCurrent ? "page" : undefined}>
                  {label}
                </Link>
              </Breadcrumb>
            );
          }
          return child;
        });

  return (
    <RACBreadcrumbs
      {...props}
      className={["cinder-breadcrumbs", className].filter(Boolean).join(" ")}
    >
      {transformed}
    </RACBreadcrumbs>
  );
}
export { Breadcrumb };

export interface TagGroupProps<T> extends Omit<RACTagGroupProps, "children"> {
  label?: ReactNode;
  items?: Iterable<T>;
  children: TagListProps<T>["children"];
  ref?: Ref<HTMLDivElement>;
}
export function TagGroup<T>({ label, items, children, className, ...props }: TagGroupProps<T>) {
  return (
    <RACTagGroup {...props} className={["cinder-tag-group", className].filter(Boolean).join(" ")}>
      {label && <Label>{label}</Label>}
      <TagList items={items}>{children}</TagList>
    </RACTagGroup>
  );
}

export interface FilterTagProps extends RACTagProps {
  ref?: Ref<HTMLDivElement>;
}
export function FilterTag({ className, children, ...props }: FilterTagProps) {
  return (
    <RACTag {...props} className={classes("cinder-filter-tag", className)}>
      {composeRenderProps(children, (content, { allowsRemoving }) => (
        <>
          {content}
          {allowsRemoving && (
            <Button slot="remove" size="sm" iconOnly variant="ghost">
              <Icon name="close" />
            </Button>
          )}
        </>
      ))}
    </RACTag>
  );
}
