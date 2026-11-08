import { useState, type ReactNode, type ComponentPropsWithRef, type CSSProperties } from "react";
import { Button } from "./buttons";
import { Icon } from "./icons";

export type TagColor =
  | "gray"
  | "blue"
  | "cyan"
  | "green"
  | "red"
  | "teal"
  | "purple"
  | "magenta"
  | "cool-gray"
  | "warm-gray";
export interface TagProps extends ComponentPropsWithRef<"span"> {
  color?: TagColor;
  size?: "sm" | "md";
}
export function Tag({ color = "gray", size = "md", className, style, ...props }: TagProps) {
  return (
    <span
      {...props}
      data-size={size}
      className={["cinder-tag", className].filter(Boolean).join(" ")}
      style={
        {
          "--tag-background": `var(--cinder-tag-background-${color})`,
          "--tag-color": `var(--cinder-tag-color-${color})`,
          ...style,
        } as CSSProperties
      }
    />
  );
}

export interface CodeSnippetProps {
  children: string;
  label?: string;
  language?: string;
  copyable?: boolean;
  className?: string;
  maxHeight?: string;
  type?: "single" | "multi" | "inline";
  wrapText?: boolean;
}
export function CodeSnippet({
  children,
  label = "Code example",
  language,
  copyable = true,
  className,
  maxHeight,
  type = "multi",
  wrapText = false,
}: CodeSnippetProps) {
  const [copyStatus, setCopyStatus] = useState("");
  async function copy() {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(children);
      }
      setCopyStatus("Copied to clipboard");
    } catch {
      setCopyStatus("Could not copy. Select the code and copy it manually.");
    }
  }

  if (type === "inline") {
    return (
      <span
        data-type="inline"
        className={["cinder-code-snippet", "cinder-code-snippet--inline", className]
          .filter(Boolean)
          .join(" ")}
      >
        <code data-language={language}>{children}</code>
        {copyable && (
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            aria-label={`Copy ${label.toLowerCase()}`}
            onPress={copy}
          >
            <Icon name={copyStatus === "Copied to clipboard" ? "check" : "copy"} />
          </Button>
        )}
        <span role="status" className="cinder-visually-hidden">
          {copyStatus}
        </span>
      </span>
    );
  }

  return (
    <div
      data-type={type}
      data-wrap={wrapText ? "true" : undefined}
      className={[
        "cinder-code-snippet",
        `cinder-code-snippet--${type}`,
        wrapText ? "cinder-code-snippet--wrap" : undefined,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {copyable && (
        <Button
          variant="ghost"
          size="sm"
          iconOnly
          aria-label={`Copy ${label.toLowerCase()}`}
          onPress={copy}
        >
          <Icon name={copyStatus === "Copied to clipboard" ? "check" : "copy"} />
        </Button>
      )}
      <pre tabIndex={0} aria-label={label} style={{ maxHeight }}>
        <code data-language={language}>{children}</code>
      </pre>
      <span role="status" className="cinder-visually-hidden">
        {copyStatus}
      </span>
    </div>
  );
}

export interface TileProps extends ComponentPropsWithRef<"div"> {
  children: ReactNode;
  as?: "div" | "article" | "section";
}
export function Tile({ className, as: Component = "div", ...props }: TileProps) {
  return <Component {...props} className={["cinder-tile", className].filter(Boolean).join(" ")} />;
}

export interface ClickableTileProps extends ComponentPropsWithRef<"a"> {
  children: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
}
export function ClickableTile({
  className,
  disabled,
  children,
  ...props
}: ClickableTileProps) {
  return (
    <a
      {...props}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : props.tabIndex ?? 0}
      data-clickable="true"
      className={[
        "cinder-tile",
        "cinder-tile--clickable",
        disabled && "cinder-tile--disabled",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </a>
  );
}

export interface SelectableTileProps extends Omit<ComponentPropsWithRef<"label">, "onChange"> {
  children: ReactNode;
  id?: string;
  name?: string;
  value?: string;
  selected?: boolean;
  defaultSelected?: boolean;
  onChange?: (selected: boolean) => void;
  disabled?: boolean;
  title?: string;
}
export function SelectableTile({
  children,
  className,
  id,
  name,
  value,
  selected: controlledSelected,
  defaultSelected = false,
  onChange,
  disabled,
  title,
  ...props
}: SelectableTileProps) {
  const [internalSelected, setInternalSelected] = useState(defaultSelected);
  const isSelected = controlledSelected !== undefined ? controlledSelected : internalSelected;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.checked;
    if (controlledSelected === undefined) {
      setInternalSelected(next);
    }
    onChange?.(next);
  }

  return (
    <label
      {...props}
      data-selectable="true"
      data-selected={isSelected || undefined}
      data-disabled={disabled || undefined}
      className={[
        "cinder-tile",
        "cinder-tile--selectable",
        isSelected && "cinder-tile--selected",
        disabled && "cinder-tile--disabled",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={isSelected}
        disabled={disabled}
        onChange={handleChange}
        className="cinder-visually-hidden"
        title={title}
      />
      <span className="cinder-tile-checkmark" aria-hidden="true">
        <Icon name="check" />
      </span>
      <div className="cinder-tile-content">{children}</div>
    </label>
  );
}

export interface ExpandableTileProps extends Omit<ComponentPropsWithRef<"div">, "onToggle"> {
  children?: ReactNode;
  tileAboveTheFoldContent: ReactNode;
  tileBelowTheFoldContent: ReactNode;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onToggle?: (expanded: boolean) => void;
}
export function ExpandableTile({
  className,
  tileAboveTheFoldContent,
  tileBelowTheFoldContent,
  expanded: controlledExpanded,
  defaultExpanded = false,
  onToggle,
  ...props
}: ExpandableTileProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  function toggle() {
    const next = !isExpanded;
    if (controlledExpanded === undefined) {
      setInternalExpanded(next);
    }
    onToggle?.(next);
  }

  return (
    <div
      {...props}
      data-expandable="true"
      data-expanded={isExpanded || undefined}
      className={[
        "cinder-tile",
        "cinder-tile--expandable",
        isExpanded && "cinder-tile--expanded",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="cinder-tile-above-fold">{tileAboveTheFoldContent}</div>
      <button
        type="button"
        aria-expanded={isExpanded}
        className="cinder-tile-expand-button"
        onClick={toggle}
      >
        <span>{isExpanded ? "Show less" : "Show more"}</span>
        <Icon name="chevronDown" />
      </button>
      {isExpanded && (
        <div className="cinder-tile-below-fold">{tileBelowTheFoldContent}</div>
      )}
    </div>
  );
}

export type ListProps =
  | ({ ordered: true } & ComponentPropsWithRef<"ol">)
  | ({ ordered?: false } & ComponentPropsWithRef<"ul">);
export function List(props: ListProps) {
  if (props.ordered) {
    const { ordered, className, ...rest } = props;
    return <ol {...rest} className={["cinder-list", className].filter(Boolean).join(" ")} />;
  }
  const { ordered, className, ...rest } = props;
  return <ul {...rest} className={["cinder-list", className].filter(Boolean).join(" ")} />;
}

export interface StructuredListProps extends ComponentPropsWithRef<"dl"> {
  children: ReactNode;
}
export function StructuredList({ className, ...props }: StructuredListProps) {
  return (
    <dl {...props} className={["cinder-structured-list", className].filter(Boolean).join(" ")} />
  );
}

export interface StructuredListRowProps extends ComponentPropsWithRef<"div"> {
  children?: ReactNode;
  label?: ReactNode;
  value?: ReactNode;
}
export function StructuredListRow({
  className,
  children,
  label,
  value,
  ...props
}: StructuredListRowProps) {
  return (
    <div
      {...props}
      className={["cinder-structured-list-row", className].filter(Boolean).join(" ")}
    >
      {label && <dt>{label}</dt>}
      {value && <dd>{value}</dd>}
      {children}
    </div>
  );
}

export interface ProgressStep {
  id: string;
  label: string;
  description?: string;
  status?: "complete" | "current" | "incomplete" | "invalid";
  disabled?: boolean;
}
export interface ProgressIndicatorProps {
  steps: ProgressStep[];
  onStepChange?: (id: string) => void;
  orientation?: "horizontal" | "vertical";
  "aria-label"?: string;
  className?: string;
}
export function ProgressIndicator({
  steps,
  onStepChange,
  orientation = "horizontal",
  "aria-label": label = "Progress",
  className,
}: ProgressIndicatorProps) {
  return (
    <ol
      aria-label={label}
      className={["cinder-progress-indicator", className].filter(Boolean).join(" ")}
      data-orientation={orientation}
    >
      {steps.map((step) => (
        <li
          key={step.id}
          data-status={step.status ?? "incomplete"}
          aria-current={step.status === "current" ? "step" : undefined}
        >
          <span className="cinder-step-marker" aria-hidden="true">
            {step.status === "complete" ? (
              <Icon name="check" />
            ) : step.status === "invalid" ? (
              <Icon name="error" />
            ) : (
              <span />
            )}
          </span>
          <div className="cinder-step-details">
            {onStepChange ? (
              <Button
                variant="ghost"
                size="sm"
                isDisabled={step.disabled}
                onPress={() => onStepChange(step.id)}
              >
                {step.label}
              </Button>
            ) : (
              <span className="cinder-step-label">{step.label}</span>
            )}
            <span className="cinder-visually-hidden"> — {step.status ?? "incomplete"}</span>
            {step.description && <p className="cinder-step-description">{step.description}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
