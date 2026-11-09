"use client";

import type { Ref } from "react";
import {
  ProgressBar as RACProgressBar,
  type ProgressBarProps as RACProgressBarProps,
} from "react-aria-components";
import { classes } from "./utils";

export interface ProgressCircleProps extends RACProgressBarProps {
  size?: "sm" | "md" | "lg";
  status?: "active" | "success" | "error";
  showValueLabel?: boolean;
  ref?: Ref<HTMLDivElement>;
}

export function ProgressCircle({
  size = "md",
  status = "active",
  showValueLabel = false,
  value,
  minValue = 0,
  maxValue = 100,
  isIndeterminate = false,
  className,
  ref,
  ...props
}: ProgressCircleProps) {
  const pixelSize = size === "sm" ? 32 : size === "lg" ? 64 : 48;
  const strokeWidth = size === "sm" ? 3 : size === "lg" ? 5 : 4;
  const radius = (pixelSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const currentVal = value ?? 0;
  const percent = Math.min(Math.max((currentVal - minValue) / (maxValue - minValue), 0), 1);
  const strokeDashoffset = isIndeterminate
    ? circumference * 0.25
    : circumference * (1 - percent);

  return (
    <RACProgressBar
      {...props}
      ref={ref}
      value={value}
      minValue={minValue}
      maxValue={maxValue}
      isIndeterminate={isIndeterminate}
      data-size={size}
      data-status={status}
      data-indeterminate={isIndeterminate || undefined}
      className={classes("cinder-progress-circle", className)}
    >
      {({ valueText }) => (
        <>
          <svg
            width={pixelSize}
            height={pixelSize}
            viewBox={`0 0 ${pixelSize} ${pixelSize}`}
            aria-hidden="true"
          >
            <circle
              className="cinder-progress-circle-track"
              cx={pixelSize / 2}
              cy={pixelSize / 2}
              r={radius}
              strokeWidth={strokeWidth}
            />
            <circle
              className="cinder-progress-circle-fill"
              cx={pixelSize / 2}
              cy={pixelSize / 2}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          {showValueLabel && !isIndeterminate && (
            <span className="cinder-progress-circle-value">{valueText}</span>
          )}
        </>
      )}
    </RACProgressBar>
  );
}
