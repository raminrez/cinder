"use client";

import type { ReactNode, Ref } from "react";
import {
  Heading,
  ModalOverlay,
  Modal as RACModal,
  Dialog as RACDialog,
  type ModalOverlayProps,
} from "react-aria-components";
import { Button } from "../../buttons";
import { Icon } from "../../icons";
import { useOverlayTheme } from "../../theme";
import { classes } from "../../utils";

export type DrawerPlacement = "left" | "right" | "top" | "bottom" | "start" | "end";
export type DrawerSize = "sm" | "md" | "lg" | "xl" | "full";

export interface DrawerProps extends Omit<ModalOverlayProps, "children"> {
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  placement?: DrawerPlacement;
  size?: DrawerSize;
  isDismissable?: boolean;
  dir?: "ltr" | "rtl";
  className?: string;
  overlayClassName?: string;
  ref?: Ref<HTMLDivElement>;
}

export function Drawer({
  title,
  description,
  children,
  footer,
  placement = "end",
  size = "md",
  isDismissable = true,
  dir,
  className,
  overlayClassName,
  ref,
  ...props
}: DrawerProps) {
  const { appearanceClassName, ...theme } = useOverlayTheme();
  const resolvedDir = dir ?? theme.dir;

  return (
    <ModalOverlay
      {...props}
      {...theme}
      dir={resolvedDir}
      isDismissable={isDismissable}
      className={classes(
        "cinder-drawer-overlay",
        classes(appearanceClassName ?? "", overlayClassName),
      )}
    >
      <RACModal
        ref={ref}
        dir={resolvedDir}
        data-placement={placement}
        data-size={size}
        className={classes("cinder-drawer", className)}
      >
        <RACDialog role="dialog" className="cinder-drawer-dialog">
          {({ close }) => (
            <>
              {(title != null || isDismissable) && (
                <div className="cinder-drawer-header">
                  <div className="cinder-drawer-header-content">
                    {title != null && (
                      <Heading slot="title" className="cinder-drawer-title">
                        {title}
                      </Heading>
                    )}
                    {description != null && (
                      <div className="cinder-drawer-description">{description}</div>
                    )}
                  </div>
                  {isDismissable && (
                    <Button
                      variant="ghost"
                      size="sm"
                      iconOnly
                      aria-label="Close drawer"
                      className="cinder-drawer-close"
                      onPress={close}
                    >
                      <Icon name="close" />
                    </Button>
                  )}
                </div>
              )}
              <div className="cinder-drawer-body">{children}</div>
              {footer != null && <div className="cinder-drawer-footer">{footer}</div>}
            </>
          )}
        </RACDialog>
      </RACModal>
    </ModalOverlay>
  );
}
