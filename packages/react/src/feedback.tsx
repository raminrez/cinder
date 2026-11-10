import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Ref,
  type ComponentPropsWithRef,
} from "react";
import {
  ProgressBar as RACProgressBar,
  Meter as RACMeter,
  Label,
  Text,
  UNSTABLE_ToastQueue as ToastQueue,
  UNSTABLE_ToastRegion as ToastRegion,
  UNSTABLE_Toast as Toast,
  UNSTABLE_ToastContent as ToastContent,
  type ProgressBarProps as RACProgressBarProps,
  type MeterProps as RACMeterProps,
  type ToastOptions,
} from "react-aria-components";
import { Button } from "./buttons";
import { Icon } from "./icons";
import { classes } from "./utils";
import { useOverlayTheme } from "./theme";

export type NotificationKind = "info" | "success" | "warning" | "error";
export type NotificationVariant = "subtle" | "solid" | "bordered";

export interface InlineNotificationProps extends Omit<ComponentPropsWithRef<"div">, "title"> {
  kind?: NotificationKind;
  variant?: NotificationVariant;
  title: ReactNode;
  children?: ReactNode;
  onDismiss?: () => void;
  /** Inline content only; this does not create Carbon's focus-managing alertdialog. */
  action?: ReactNode;
  lowContrast?: boolean;
}
export function InlineNotification({
  kind = "info",
  variant,
  title,
  children,
  onDismiss,
  action,
  lowContrast = true,
  className,
  role = "status",
  ...props
}: InlineNotificationProps) {
  const resolvedVariant = variant ?? (lowContrast ? "subtle" : "solid");
  return (
    <div
      {...props}
      role={role}
      data-kind={kind}
      data-variant={resolvedVariant}
      data-low-contrast={lowContrast || undefined}
      className={["cinder-notification", className].filter(Boolean).join(" ")}
    >
      <Icon name={kind} size={20} />
      <div className="cinder-notification-content">
        <strong>{title}</strong>
        {children && <div>{children}</div>}
        {action}
      </div>
      {onDismiss && (
        <Button
          variant="ghost"
          size="lg"
          iconOnly
          aria-label="Dismiss notification"
          onPress={onDismiss}
        >
          <Icon name="close" />
        </Button>
      )}
    </div>
  );
}

export interface AlertProps extends InlineNotificationProps {}
export function Alert(props: AlertProps) {
  return <InlineNotification role="alert" {...props} />;
}

export interface ProgressBarProps extends RACProgressBarProps {
  label?: ReactNode;
  helperText?: ReactNode;
  status?: "active" | "success" | "warning" | "error";
  ref?: Ref<HTMLDivElement>;
}
export function ProgressBar({
  label,
  helperText,
  status = "active",
  children,
  className,
  ...props
}: ProgressBarProps) {
  return (
    <RACProgressBar
      {...props}
      data-status={status}
      className={classes("cinder-progress", className)}
    >
      {children ??
        (({ percentage, valueText, isIndeterminate }) => (
          <>
            <div className="cinder-progress-label">
              <Label>{label}</Label>
              {valueText && <span>{valueText}</span>}
            </div>
            <div
              className="cinder-progress-track"
              data-indeterminate={isIndeterminate || undefined}
            >
              <div
                className="cinder-progress-fill"
                style={{ width: percentage == null ? "30%" : `${percentage}%` }}
              />
            </div>
            {helperText && <span className="cinder-description">{helperText}</span>}
          </>
        ))}
    </RACProgressBar>
  );
}

export interface MeterProps extends RACMeterProps {
  label?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}
export function Meter({ label, children, className, ...props }: MeterProps) {
  return (
    <RACMeter {...props} className={classes("cinder-progress cinder-meter", className)}>
      {children ??
        (({ percentage, valueText }) => (
          <>
            <div className="cinder-progress-label">
              <Label>{label}</Label>
              <span>{valueText}</span>
            </div>
            <div className="cinder-progress-track">
              <div className="cinder-progress-fill" style={{ width: `${percentage}%` }} />
            </div>
          </>
        ))}
    </RACMeter>
  );
}

export interface LoadingProps {
  label?: string;
  size?: "sm" | "lg";
  className?: string;
}
export function Loading({ label = "Loading", size = "lg", className }: LoadingProps) {
  return (
    <div
      role="status"
      className={["cinder-loading", className].filter(Boolean).join(" ")}
      data-size={size}
    >
      <span className="cinder-spinner" aria-hidden="true" />
      <span className="cinder-visually-hidden">{label}</span>
    </div>
  );
}
export interface InlineLoadingProps {
  children?: ReactNode;
  status?: "active" | "success" | "error";
}
export function InlineLoading({ children = "Loading…", status = "active" }: InlineLoadingProps) {
  return (
    <div role="status" className="cinder-inline-loading" data-status={status}>
      {status === "active" ? (
        <span className="cinder-spinner" aria-hidden="true" />
      ) : (
        <Icon name={status} />
      )}
      <span>{children}</span>
    </div>
  );
}
export interface SkeletonProps extends ComponentPropsWithRef<"div"> {
  width?: string;
  height?: string;
  lines?: number;
}
export function Skeleton({ width, height, lines = 1, style, className, ...props }: SkeletonProps) {
  return (
    <div
      {...props}
      className={["cinder-skeleton", className].filter(Boolean).join(" ")}
      aria-hidden="true"
      style={{ width, ...style }}
    >
      {Array.from({ length: Math.max(1, lines) }, (_, index) => (
        <span key={index} style={{ height }} />
      ))}
    </div>
  );
}

export interface ToastMessage {
  title: string;
  description?: string;
  kind?: NotificationKind;
  variant?: NotificationVariant;
}
type ToastApi = {
  add: (message: ToastMessage, options?: ToastOptions) => string;
  close: (key: string) => void;
};
const ToastContext = createContext<ToastApi | null>(null);

/** Experimental: built on RAC's explicitly UNSTABLE toast API. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [queue] = useState(() => new ToastQueue<ToastMessage>({ maxVisibleToasts: 3 }));
  const { appearanceClassName, ...theme } = useOverlayTheme();
  return (
    <ToastContext.Provider value={queue}>
      {children}
      <ToastRegion
        queue={queue}
        {...theme}
        className={classes("cinder-toast-region", appearanceClassName)}
      >
        {({ toast }) => (
          <Toast
            toast={toast}
            className="cinder-toast"
            data-kind={toast.content.kind ?? "info"}
            data-variant={toast.content.variant ?? "subtle"}
          >
            <Icon name={toast.content.kind ?? "info"} size={20} />
            <ToastContent>
              <Text slot="title">{toast.content.title}</Text>
              {toast.content.description && (
                <Text slot="description">{toast.content.description}</Text>
              )}
            </ToastContent>
            <Button
              slot="close"
              variant="ghost"
              size="lg"
              iconOnly
              aria-label="Dismiss notification"
            >
              <Icon name="close" />
            </Button>
          </Toast>
        )}
      </ToastRegion>
    </ToastContext.Provider>
  );
}
export function useToast(): ToastApi {
  const queue = useContext(ToastContext);
  if (!queue) throw new Error("useToast must be used inside a Cinder ToastProvider.");
  return queue;
}
