"use client";

import type { ReactNode, Ref } from "react";
import { Button } from "./buttons";
import { cx } from "./utils";

export interface TableBatchActionsProps {
  totalSelected: number;
  onCancel?: () => void;
  cancelLabel?: string;
  selectedLabel?: (count: number) => ReactNode;
  children?: ReactNode;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

export function TableBatchActions({
  totalSelected,
  onCancel,
  cancelLabel = "Cancel",
  selectedLabel,
  children,
  className,
  ref,
}: TableBatchActionsProps) {
  if (totalSelected <= 0) return null;

  const countText = selectedLabel
    ? selectedLabel(totalSelected)
    : `${totalSelected} item${totalSelected === 1 ? "" : "s"} selected`;

  return (
    <div
      ref={ref}
      role="toolbar"
      aria-label="Table batch actions"
      className={cx("cinder-table-batch-actions", className)}
    >
      <div className="cinder-table-batch-bar">
        <span className="cinder-table-batch-count">{countText}</span>
        <div className="cinder-table-batch-action-list">
          {children}
          {onCancel && (
            <Button variant="ghost" size="sm" onPress={onCancel}>
              {cancelLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
