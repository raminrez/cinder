import { createContext, useContext, type Ref } from "react";
import {
  Button as RACButton,
  Link as RACLink,
  ToggleButton as RACToggleButton,
  ToggleButtonGroup as RACToggleButtonGroup,
  ProgressBar as RACProgressBar,
  composeRenderProps,
  type ButtonProps as RACButtonProps,
  type LinkProps as RACLinkProps,
  type ToggleButtonProps as RACToggleButtonProps,
  type ToggleButtonGroupProps as RACToggleButtonGroupProps,
} from "react-aria-components";
import { classes, type ControlSize } from "./utils";

export type ButtonVariant =
  "primary" | "secondary" | "tertiary" | "ghost" | "danger" | "danger-tertiary" | "danger-ghost";
export interface ButtonProps extends RACButtonProps {
  variant?: ButtonVariant;
  size?: ControlSize | "xl" | "2xl";
  iconOnly?: boolean;
  /** Accessible progress label while pending; localize alongside the button text. */
  pendingLabel?: string;
  ref?: Ref<HTMLButtonElement>;
}

export function Button({
  variant = "primary",
  size: requestedSize,
  iconOnly = false,
  pendingLabel = "Pending",
  className,
  children,
  ...props
}: ButtonProps) {
  const size = requestedSize === undefined ? "lg" : requestedSize;
  return (
    <RACButton
      {...props}
      className={classes("cinder-button", className)}
      data-variant={variant}
      data-size={size}
      data-cinder-size-default={requestedSize === undefined ? "" : undefined}
      data-icon-only={iconOnly || undefined}
    >
      {composeRenderProps(children, (content, { isPending }) => (
        <>
          {content}
          {isPending && (
            <RACProgressBar className="cinder-spinner" isIndeterminate aria-label={pendingLabel} />
          )}
        </>
      ))}
    </RACButton>
  );
}

export interface LinkProps extends RACLinkProps {
  ref?: Ref<HTMLAnchorElement>;
  inline?: boolean;
}
export function Link({ className, inline, ...props }: LinkProps) {
  return (
    <RACLink
      {...props}
      data-inline={inline || undefined}
      className={classes("cinder-link", className)}
    />
  );
}

export interface ToggleButtonProps extends RACToggleButtonProps {
  size?: ControlSize;
  ref?: Ref<HTMLButtonElement>;
}
const ContentSwitcherSizeContext = createContext<ControlSize>("md");

export function ToggleButton({ className, size, ...props }: ToggleButtonProps) {
  const inheritedSize = useContext(ContentSwitcherSizeContext);
  return (
    <RACToggleButton
      {...props}
      data-size={size ?? inheritedSize}
      className={classes("cinder-toggle-button", className)}
    />
  );
}

export interface ContentSwitcherProps extends RACToggleButtonGroupProps {
  size?: ControlSize;
  ref?: Ref<HTMLDivElement>;
}
export function ContentSwitcher({ className, size = "md", ...props }: ContentSwitcherProps) {
  return (
    <ContentSwitcherSizeContext.Provider value={size}>
      <RACToggleButtonGroup
        selectionMode="single"
        disallowEmptySelection
        {...props}
        data-size={size}
        className={classes("cinder-content-switcher", className)}
      />
    </ContentSwitcherSizeContext.Provider>
  );
}
