import type { Ref } from "react";
import {
  Popover as RACPopover,
  Modal as RACModal,
  ModalOverlay,
  Dialog as RACDialog,
  Tooltip as RACTooltip,
  OverlayArrow,
  type PopoverProps as RACPopoverProps,
  type ModalOverlayProps,
  type DialogProps as RACDialogProps,
  type TooltipProps as RACTooltipProps,
} from "react-aria-components";
import { classes } from "./utils";
import { useOverlayTheme } from "./theme";

export interface PopoverProps extends RACPopoverProps {
  ref?: Ref<HTMLElement>;
}
export function Popover({ className, ...props }: PopoverProps) {
  const theme = useOverlayTheme();
  return <RACPopover {...props} {...theme} className={classes("cinder-popover", className)} />;
}

export interface ModalProps extends ModalOverlayProps {
  size?: "xs" | "sm" | "md" | "lg";
  ref?: Ref<HTMLDivElement>;
}
export function Modal({ size = "md", children, className, ref, ...props }: ModalProps) {
  const theme = useOverlayTheme();
  return (
    <ModalOverlay {...props} {...theme} className="cinder-modal-overlay">
      <RACModal ref={ref} data-size={size} className={classes("cinder-modal", className)}>
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
  const theme = useOverlayTheme();
  return (
    <RACTooltip offset={8} {...props} {...theme} className={classes("cinder-tooltip", className)}>
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
