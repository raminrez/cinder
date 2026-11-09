"use client";

import {
  type ComponentPropsWithRef,
  type ReactNode,
  type Ref,
} from "react";
import { cx } from "./utils";

export type BadgeKind = "danger" | "success" | "warning" | "info" | "primary";
export type BadgePlacement = "top-end" | "top-start" | "bottom-end" | "bottom-start";

export interface BadgeProps extends Omit<ComponentPropsWithRef<"span">, "content"> {
  content?: ReactNode;
  maxCount?: number;
  isDot?: boolean;
  kind?: BadgeKind;
  placement?: BadgePlacement;
  children?: ReactNode;
  ref?: Ref<HTMLSpanElement>;
}

export function Badge({
  content,
  maxCount = 99,
  isDot = false,
  kind = "danger",
  placement = "top-end",
  children,
  className,
  ref,
  ...props
}: BadgeProps) {
  let displayContent: ReactNode = content;
  if (typeof content === "number" && maxCount != null && content > maxCount) {
    displayContent = `${maxCount}+`;
  }

  const badgeElement = (
    <span
      {...props}
      ref={ref}
      role="status"
      data-kind={kind}
      data-placement={placement}
      className={cx(
        "cinder-badge",
        isDot || content == null ? "cinder-badge--dot" : undefined,
        className,
      )}
    >
      {!isDot && displayContent}
    </span>
  );

  if (children) {
    return (
      <span className="cinder-badge-wrapper">
        {children}
        {badgeElement}
      </span>
    );
  }

  return badgeElement;
}
