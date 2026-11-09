"use client";

import type { ReactNode, Ref } from "react";
import {
  Heading,
  type ModalOverlayProps,
} from "react-aria-components";
import { Modal, Dialog } from "./overlays";
import { Button } from "./buttons";
import { Icon } from "./icons";
import { classes } from "./utils";

export type AlertDialogKind = "danger" | "warning" | "info";

export interface AlertDialogProps extends Omit<ModalOverlayProps, "children"> {
  title: ReactNode;
  children?: ReactNode;
  description?: ReactNode;
  kind?: AlertDialogKind;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  isPending?: boolean;
  ref?: Ref<HTMLDivElement>;
}

export function AlertDialog({
  title,
  children,
  description,
  kind = "danger",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  isPending = false,
  className,
  ref,
  ...props
}: AlertDialogProps) {
  const iconName = kind === "danger" ? "alert" : kind === "warning" ? "warning" : "info";
  const bodyContent = children ?? description;

  return (
    <Modal {...props} size="sm" isDismissable={false} className={classes("cinder-alert-modal", className)}>
      <Dialog role="alertdialog" className="cinder-alert-dialog" ref={ref}>
        {({ close }) => (
          <>
            <div className="cinder-alert-dialog-header" data-kind={kind}>
              <Icon name={iconName} size={24} />
              <div>
                <Heading slot="title">{title}</Heading>
              </div>
            </div>
            {bodyContent && <div className="cinder-alert-dialog-body">{bodyContent}</div>}
            <div className="cinder-alert-dialog-footer">
              <Button
                variant="secondary"
                onPress={() => {
                  onCancel?.();
                  close();
                }}
                isDisabled={isPending}
              >
                {cancelLabel}
              </Button>
              <Button
                variant={kind === "danger" ? "danger" : "primary"}
                isPending={isPending}
                onPress={() => {
                  onConfirm?.();
                  close();
                }}
              >
                {confirmLabel}
              </Button>
            </div>
          </>
        )}
      </Dialog>
    </Modal>
  );
}
