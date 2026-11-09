import type { ReactNode, Ref } from "react";
import {
  Popover as RACPopover,
  Modal as RACModal,
  ModalOverlay,
  Dialog as RACDialog,
  Tooltip as RACTooltip,
  OverlayArrow,
  MenuTrigger,
  Menu,
  type PopoverProps as RACPopoverProps,
  type ModalOverlayProps,
  type DialogProps as RACDialogProps,
  type TooltipProps as RACTooltipProps,
  type Key,
} from "react-aria-components";
import { Button } from "./buttons";
import { Icon } from "./icons";
import { classes, type ControlSize } from "./utils";
import { useOverlayTheme } from "./theme";

export interface PopoverProps extends RACPopoverProps {
  ref?: Ref<HTMLElement>;
}
export function Popover({ className, ...props }: PopoverProps) {
  const { appearanceClassName, ...theme } = useOverlayTheme();
  return (
    <RACPopover
      {...props}
      {...theme}
      lang={props.lang ?? theme.lang}
      className={classes("cinder-popover", classes(appearanceClassName ?? "", className))}
    />
  );
}

export interface ModalProps extends ModalOverlayProps {
  size?: "xs" | "sm" | "md" | "lg";
  ref?: Ref<HTMLDivElement>;
  /** Class for the backdrop; className continues to target the inner modal. */
  overlayClassName?: ModalOverlayProps["className"];
  overlayRef?: Ref<HTMLDivElement>;
  /** Style for the inner modal; style continues to target the backdrop. */
  modalStyle?: ModalOverlayProps["style"];
}
export function Modal({
  size = "md",
  children,
  className,
  ref,
  overlayClassName,
  overlayRef,
  modalStyle,
  ...props
}: ModalProps) {
  const { appearanceClassName, ...theme } = useOverlayTheme();
  const resolvedDir = (props as { dir?: "ltr" | "rtl" }).dir ?? theme.dir;
  return (
    <ModalOverlay
      {...props}
      {...theme}
      dir={resolvedDir}
      lang={props.lang ?? theme.lang}
      ref={overlayRef}
      className={classes(
        "cinder-modal-overlay",
        classes(appearanceClassName ?? "", overlayClassName),
      )}
    >
      <RACModal
        ref={ref}
        dir={resolvedDir}
        data-size={size}
        className={classes("cinder-modal", className)}
        style={modalStyle}
      >
        {children}
      </RACModal>
    </ModalOverlay>
  );
}

export interface DialogProps extends RACDialogProps {
  ref?: Ref<HTMLElement>;
}
export function Dialog({ className, ...props }: DialogProps) {
  return (
    <RACDialog {...props} className={["cinder-dialog", className].filter(Boolean).join(" ")} />
  );
}

export interface TooltipProps extends RACTooltipProps {
  ref?: Ref<HTMLDivElement>;
}
export function Tooltip({ children, className, ...props }: TooltipProps) {
  const { appearanceClassName, ...theme } = useOverlayTheme();
  return (
    <RACTooltip
      offset={8}
      {...props}
      {...theme}
      lang={props.lang ?? theme.lang}
      className={classes("cinder-tooltip", classes(appearanceClassName ?? "", className))}
    >
      {(state) => (
        <>
          <OverlayArrow>
            <svg width="8" height="8" viewBox="0 0 8 8">
              <path d="M0 0h8L4 4Z" />
            </svg>
          </OverlayArrow>
          {typeof children === "function" ? children(state) : children}
        </>
      )}
    </RACTooltip>
  );
}

export interface OverflowMenuProps {
  "aria-label": string;
  children: ReactNode;
  onAction?: (key: Key) => void;
  disabledKeys?: Iterable<Key>;
  size?: ControlSize;
  className?: string;
  popoverClassName?: string;
}

export function OverflowMenu({
  "aria-label": ariaLabel,
  children,
  onAction,
  disabledKeys,
  size = "md",
  className,
  popoverClassName,
}: OverflowMenuProps) {
  return (
    <MenuTrigger>
      <Button variant="ghost" iconOnly size={size} aria-label={ariaLabel} className={className}>
        <Icon name="overflow" />
      </Button>
      <Popover className={popoverClassName}>
        <Menu onAction={onAction} disabledKeys={disabledKeys}>
          {children}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
