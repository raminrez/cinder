"use client";

import {
  type ComponentPropsWithRef,
  type ReactNode,
  type Ref,
} from "react";
import { cx } from "./utils";

export interface EmptyStateProps extends Omit<ComponentPropsWithRef<"div">, "title"> {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  children,
  className,
  ref,
  ...props
}: EmptyStateProps) {
  return (
    <div {...props} ref={ref} className={cx("cinder-empty-state", className)}>
      {icon && <div className="cinder-empty-state-icon">{icon}</div>}
      {typeof title === "string" ? <h3 className="cinder-empty-state-title">{title}</h3> : title}
      {description &&
        (typeof description === "string" ? (
          <p className="cinder-empty-state-description">{description}</p>
        ) : (
          description
        ))}
      {action && <div className="cinder-empty-state-actions">{action}</div>}
      {children}
    </div>
  );
}
