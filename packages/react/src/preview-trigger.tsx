"use client";

import type { ReactNode } from "react";
import {
  PreviewTrigger as RACPreviewTrigger,
  type PreviewTriggerProps as RACPreviewTriggerProps,
} from "react-aria-components";
import { Popover } from "./overlays";

export interface PreviewTriggerProps extends RACPreviewTriggerProps {
  /** The trigger element and Popover making up the preview trigger. */
  children: ReactNode;
  /**
   * The delay time in milliseconds before the preview opens on hover/focus.
   *
   * @default 600
   */
  delay?: number;
  /**
   * The delay time in milliseconds before the preview closes after pointer leaves.
   *
   * @default 200
   */
  closeDelay?: number;
}

export function PreviewTriggerRoot(props: PreviewTriggerProps) {
  return <RACPreviewTrigger {...props} />;
}

export const PreviewTrigger = Object.assign(PreviewTriggerRoot, {
  Root: PreviewTriggerRoot,
  Popover,
});
