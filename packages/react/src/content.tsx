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
}
export function CodeSnippet({
  children,
  label = "Code example",
  language,
  copyable = true,
  className,
  maxHeight,
}: CodeSnippetProps) {
  const [copyStatus, setCopyStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(children);
      setCopyStatus("Copied to clipboard");
    } catch {
      setCopyStatus("Could not copy. Select the code and copy it manually.");
    }
  }
  return (
    <div className={["cinder-code-snippet", className].filter(Boolean).join(" ")}>
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
}
export function Tile({ className, ...props }: TileProps) {
  return <div {...props} className={["cinder-tile", className].filter(Boolean).join(" ")} />;
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
}
export function ProgressIndicator({
  steps,
  onStepChange,
  orientation = "horizontal",
  "aria-label": label = "Progress",
}: ProgressIndicatorProps) {
  return (
    <ol aria-label={label} className="cinder-progress-indicator" data-orientation={orientation}>
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
          <div>
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
              <span>{step.label}</span>
            )}
            <span className="cinder-visually-hidden"> — {step.status ?? "incomplete"}</span>
            {step.description && <p>{step.description}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
