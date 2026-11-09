"use client";

import type { ReactNode, Ref } from "react";
import { Icon } from "./icons";
import { cx } from "./utils";

export interface AILabelProps {
  label?: ReactNode;
  revertActive?: boolean;
  onRevert?: () => void;
  revertLabel?: string;
  className?: string;
  ref?: Ref<HTMLElement>;
}

export function AILabel({
  label = "AI",
  revertActive = false,
  onRevert,
  revertLabel = "Revert to AI suggestion",
  className,
  ref,
}: AILabelProps) {
  if (revertActive) {
    return (
      <button
        type="button"
        ref={ref as Ref<HTMLButtonElement>}
        aria-label={revertLabel}
        data-revert-active="true"
        onClick={onRevert}
        className={cx("cinder-ai-label", className)}
      >
        <Icon name="undo" size={16} />
        <span>{label}</span>
      </button>
    );
  }

  return (
    <span
      ref={ref as Ref<HTMLSpanElement>}
      role="status"
      className={cx("cinder-ai-label", className)}
    >
      <Icon name="sparkle" size={16} />
      <span>{label}</span>
    </span>
  );
}
