import type { Ref } from "react";
import {
  Button as RACButton,
  Link as RACLink,
  ToggleButton as RACToggleButton,
  ToggleButtonGroup as RACToggleButtonGroup,
  composeRenderProps,
  type ButtonProps as RACButtonProps,
  type LinkProps as RACLinkProps,
  type ToggleButtonProps as RACToggleButtonProps,
  type ToggleButtonGroupProps as RACToggleButtonGroupProps,
} from "react-aria-components";
import { classes, type ControlSize } from "./utils";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "ghost" | "danger" | "danger-tertiary" | "danger-ghost";
export interface ButtonProps extends RACButtonProps {
  variant?: ButtonVariant;
  size?: ControlSize | "xl" | "2xl";
  iconOnly?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

export function Button({ variant = "primary", size = "lg", iconOnly = false, className, children, ...props }: ButtonProps) {
  return (
    <RACButton {...props} className={classes("cinder-button", className)} data-variant={variant} data-size={size} data-icon-only={iconOnly || undefined}>
      {composeRenderProps(children, (content, { isPending }) => <>{content}{isPending && <span className="cinder-spinner" aria-hidden="true" />}</>)}
    </RACButton>
  );
}

export interface LinkProps extends RACLinkProps {
  ref?: Ref<HTMLAnchorElement>;
  inline?: boolean;
}
export function Link({ className, inline, ...props }: LinkProps) {
  return <RACLink {...props} data-inline={inline || undefined} className={classes("cinder-link", className)} />;
}

export interface ToggleButtonProps extends RACToggleButtonProps {
  size?: ControlSize;
  ref?: Ref<HTMLButtonElement>;
}
export function ToggleButton({ className, size = "md", ...props }: ToggleButtonProps) {
  return <RACToggleButton {...props} data-size={size} className={classes("cinder-toggle-button", className)} />;
}

export interface ContentSwitcherProps extends RACToggleButtonGroupProps {
  size?: ControlSize;
  ref?: Ref<HTMLDivElement>;
}
export function ContentSwitcher({ className, size = "md", ...props }: ContentSwitcherProps) {
  return <RACToggleButtonGroup selectionMode="single" disallowEmptySelection {...props} data-size={size} className={classes("cinder-content-switcher", className)} />;
}
