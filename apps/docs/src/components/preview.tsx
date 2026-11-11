import type { ReactNode } from "react";

export interface ComponentPreviewProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function ComponentPreview({
  title,
  description,
  children,
  className = "",
}: ComponentPreviewProps) {
  return (
    <div
      className={`my-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden shadow-xs not-prose ${className}`}
    >
      {(title || description) && (
        <div className="px-5 py-3 border-b border-neutral-200 dark:border-neutral-800 flex flex-col gap-0.5 bg-neutral-50/60 dark:bg-neutral-900/40">
          {title && (
            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {title}
            </span>
          )}
          {description && (
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              {description}
            </span>
          )}
        </div>
      )}
      <div className="relative p-6 md:p-8 flex items-center justify-center min-h-[160px] bg-neutral-50/40 dark:bg-neutral-900/20 [background-image:radial-gradient(rgba(8,189,186,0.25)_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="relative z-10 w-full flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
