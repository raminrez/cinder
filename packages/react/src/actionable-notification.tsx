"use client";

import {
  useEffect,
  useId,
  useRef,
  type ComponentPropsWithRef,
  type ReactNode,
  type Ref,
} from "react";
import { Button } from "./buttons";
import { Icon } from "./icons";
import { cx } from "./utils";
import type { NotificationKind } from "./feedback";

export interface ActionableNotificationProps
  extends Omit<ComponentPropsWithRef<"div">, "title"> {
  kind?: NotificationKind;
  title: ReactNode;
  action: ReactNode;
  onDismiss?: () => void;
  closeButtonLabel?: string;
  autoFocusAction?: boolean;
  ref?: Ref<HTMLDivElement>;
}

export function ActionableNotification({
  kind = "info",
  title,
  action,
  onDismiss,
  closeButtonLabel = "Dismiss notification",
  autoFocusAction = true,
  children,
  className,
  ref,
  ...props
}: ActionableNotificationProps) {
  const titleId = useId();
  const descId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoFocusAction && containerRef.current) {
      const btn = containerRef.current.querySelector<HTMLButtonElement>(
        ".cinder-actionable-notification-actions button",
      );
      btn?.focus();
    }
  }, [autoFocusAction]);

  return (
    <div
      {...props}
      ref={ref ?? containerRef}
      role="alertdialog"
      aria-labelledby={titleId}
      aria-describedby={children ? descId : undefined}
      data-kind={kind}
      className={cx("cinder-actionable-notification", className)}
    >
      <Icon name={kind} size={20} />
      <div className="cinder-actionable-notification-content">
        <strong id={titleId}>{title}</strong>
        {children && <div id={descId}>{children}</div>}
        <div className="cinder-actionable-notification-actions">{action}</div>
      </div>
      {onDismiss && (
        <Button
          variant="ghost"
          size="sm"
          iconOnly
          aria-label={closeButtonLabel}
          onPress={onDismiss}
        >
          <Icon name="close" />
        </Button>
      )}
    </div>
  );
}
