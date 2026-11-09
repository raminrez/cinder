"use client";

import type { KeyboardEvent, ReactNode, Ref } from "react";
import { Icon } from "./icons";
import { cx } from "./utils";

export interface AILabelProps {
  label?: ReactNode;
  revertActive?: boolean;
  onRevert?: () => void;
  revertLabel?: string;
  className?: string;
  ref?: Ref<HTMLSpanElement>;
}

export function AILabel({
  label = "AI",
  revertActive = false,
  onRevert,
  revertLabel = "Revert to AI suggestion",
  className,
  ref,
}: AILabelProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (revertActive && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onRevert?.();
    }
  };

  return (
    <span
      ref={ref}
      role={revertActive ? "button" : "status"}
      tabIndex={revertActive ? 0 : undefined}
      aria-label={revertActive ? revertLabel : undefined}
      data-revert-active={revertActive || undefined}
      onClick={revertActive ? onRevert : undefined}
      onKeyDown={handleKeyDown}
      className={cx("cinder-ai-label", className)}
    >
      <Icon name={revertActive ? "undo" : "sparkle"} size={16} />
      <span>{label}</span>
    </span>
  );
}
