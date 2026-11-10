"use client";

import {
  createContext,
  useContext,
  type ComponentPropsWithRef,
  type ReactNode,
  type Ref,
} from "react";
import {
  DropZone as RACDropZone,
  FileTrigger as RACFileTrigger,
  isFileDropItem,
  type DropZoneProps as RACDropZoneProps,
  type DropZoneRenderProps,
  type FileTriggerProps as RACFileTriggerProps,
} from "react-aria-components";
import { classes, cx } from "./utils";

export interface DropZoneContextValue {
  variant?: "dashed" | "solid" | "card";
  isDropTarget?: boolean;
}

export const DropZoneContext = createContext<DropZoneContextValue>({});

export interface DropZoneRootProps extends Omit<RACDropZoneProps, "className"> {
  variant?: "dashed" | "solid" | "card";
  onDropFiles?: (files: File[]) => void;
  className?: string | ((values: DropZoneRenderProps) => string);
  children?: ReactNode | ((values: DropZoneRenderProps) => ReactNode);
  ref?: Ref<HTMLDivElement>;
}

export function DropZoneRoot({
  variant = "dashed",
  onDropFiles,
  onDrop,
  className,
  children,
  ref,
  ...props
}: DropZoneRootProps) {
  return (
    <RACDropZone
      {...props}
      ref={ref}
      data-variant={variant}
      className={classes(
        cx("cinder-dropzone", `cinder-dropzone--${variant}`),
        className
      )}
      onDrop={async (e) => {
        onDrop?.(e);
        if (onDropFiles) {
          const fileItems = e.items.filter(isFileDropItem);
          const files = await Promise.all(fileItems.map((item) => item.getFile()));
          if (files.length > 0) {
            onDropFiles(files);
          }
        }
      }}
    >
      {(renderProps) => {
        const contextValue: DropZoneContextValue = {
          variant,
          isDropTarget: renderProps.isDropTarget,
        };
        return (
          <DropZoneContext.Provider value={contextValue}>
            {typeof children === "function" ? children(renderProps) : children}
          </DropZoneContext.Provider>
        );
      }}
    </RACDropZone>
  );
}

export interface DropZoneFeedbackProps extends ComponentPropsWithRef<"div"> {
  children?: ReactNode;
}
export function DropZoneFeedback({ children, className, ...props }: DropZoneFeedbackProps) {
  const { isDropTarget } = useContext(DropZoneContext);
  return (
    <div
      {...props}
      data-drop-target={isDropTarget || undefined}
      className={cx("cinder-dropzone-feedback", className)}
    >
      {children}
    </div>
  );
}

export interface FileTriggerProps extends RACFileTriggerProps {
  children: ReactNode;
}
export function FileTrigger({ children, ...props }: FileTriggerProps) {
  return <RACFileTrigger {...props}>{children}</RACFileTrigger>;
}

export interface DropZoneProps extends DropZoneRootProps {}

function DropZoneDefault({ children, ...props }: DropZoneProps) {
  return <DropZoneRoot {...props}>{children}</DropZoneRoot>;
}

export const DropZone = Object.assign(DropZoneDefault, {
  Root: DropZoneRoot,
  Feedback: DropZoneFeedback,
  FileTrigger,
});
