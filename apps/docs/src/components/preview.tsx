import { useState, type ReactNode } from "react";

export interface ComponentPreviewProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  code?: string;
  defaultShowCode?: boolean;
}

export function ComponentPreview({
  title,
  description,
  children,
  className = "",
  code,
  defaultShowCode = false,
}: ComponentPreviewProps) {
  const [showCode, setShowCode] = useState(defaultShowCode);
  const [copied, setCopied] = useState(false);

  // Generate a clean fallback snippet if code wasn't explicitly supplied
  const effectiveCode =
    code ||
    (title
      ? `import { ${title.split(" ")[0] || "Button"} } from "@hashti/react";\n\nexport function Example() {\n  return (\n    <${title.split(" ")[0] || "Button"}>\n      Interactive ${title}\n    </${title.split(" ")[0] || "Button"}>\n  );\n}`
      : undefined);

  const handleCopy = () => {
    if (!effectiveCode) return;
    navigator.clipboard.writeText(effectiveCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`my-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden shadow-xs not-prose ${className}`}
    >
      {/* Card Header with Title, Description, and Code Actions */}
      <div className="px-5 py-3.5 border-b border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3 bg-neutral-50/70 dark:bg-neutral-900/50">
        <div className="flex flex-col gap-0.5 min-w-[200px]">
          {title && (
            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 font-sans tracking-tight">
              {title}
            </span>
          )}
          {description && (
            <span className="text-xs text-neutral-500 dark:text-neutral-400">{description}</span>
          )}
        </div>

        {/* Action Buttons: Show/Hide Code & Copy */}
        {effectiveCode && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowCode(!showCode)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                showCode
                  ? "bg-[#08BDBA]/15 text-[#08BDBA] border border-[#08BDBA]/30"
                  : "bg-white dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
              aria-expanded={showCode}
              aria-label={showCode ? "Hide source code" : "Show source code"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              <span>{showCode ? "Hide Code" : "Show Code"}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${showCode ? "rotate-180" : ""}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {showCode && (
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-xs active:scale-95"
                aria-label="Copy source code to clipboard"
              >
                {copied ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#08BDBA"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-[#08BDBA]">Copied!</span>
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    </svg>
                    <span>Copy</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Live Component Preview Arena */}
      <div className="relative p-8 md:p-10 flex items-center justify-center min-h-[180px] bg-neutral-50/40 dark:bg-neutral-900/20 [background-image:radial-gradient(rgba(8,189,186,0.2)_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="relative z-10 w-full flex items-center justify-center">{children}</div>
      </div>

      {/* Expandable Code Section with comfortable padding */}
      {showCode && effectiveCode && (
        <div className="border-t border-neutral-200 dark:border-neutral-800 bg-[#0c0c0e] text-neutral-200">
          <div className="flex items-center justify-between px-5 py-2.5 border-b border-neutral-800/80 bg-black/40 text-[11px] font-mono text-neutral-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#08BDBA]"></span>
              <span>React JSX</span>
            </span>
            <span>TypeScript</span>
          </div>
          <div className="p-6 overflow-x-auto font-mono text-xs leading-relaxed select-text">
            <pre className="m-0 p-0 overflow-x-auto text-neutral-300 whitespace-pre">
              <code>{effectiveCode}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
