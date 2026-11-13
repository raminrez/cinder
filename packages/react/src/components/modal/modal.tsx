"use client";

import type { Ref } from "react";
import { Modal as RACModal, ModalOverlay, type ModalOverlayProps } from "react-aria-components";
import { classes } from "../../utils";
import { useOverlayTheme } from "../../theme";

export interface ModalProps extends ModalOverlayProps {
  size?: "xs" | "sm" | "md" | "lg";
  ref?: Ref<HTMLDivElement>;
  overlayClassName?: ModalOverlayProps["className"];
  overlayRef?: Ref<HTMLDivElement>;
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
        "hashti-modal-overlay",
        classes(appearanceClassName ?? "", overlayClassName),
      )}
    >
      <RACModal
        data-slot="root"
        ref={ref}
        dir={resolvedDir}
        data-size={size}
        className={classes("hashti-modal", className)}
        style={modalStyle}
      >
        {children}
      </RACModal>
    </ModalOverlay>
  );
}
