import { useState } from "react";

interface AssetCard {
  name: string;
  tagline: string;
  filename: string;
  path: string;
  width: number;
  height: number;
  aspectRatio: string;
  description: string;
}

const ASSETS: AssetCard[] = [
  {
    name: "Hashti Mark",
    tagline: "Iconic Concentric Ogival Arch",
    filename: "hashti-mark.svg",
    path: "/hashti-mark.svg",
    width: 256,
    height: 256,
    aspectRatio: "1:1",
    description: "Favicon, app bar emblem, social avatar, navigation mark.",
  },
  {
    name: "Horizontal Lockup",
    tagline: "Mark + Satoshi Typography",
    filename: "hashti-horizontal.svg",
    path: "/hashti-horizontal.svg",
    width: 600,
    height: 120,
    aspectRatio: "5:1",
    description: "Documentation header, navigation bar, pitch deck titles.",
  },
  {
    name: "Vertical Stack",
    tagline: "Monumental Poster Layout",
    filename: "hashti-vertical.svg",
    path: "/hashti-vertical.svg",
    width: 400,
    height: 500,
    aspectRatio: "4:5",
    description: "Splash screens, poster merchandise, conference banners.",
  },
  {
    name: "App Icon",
    tagline: "Squircle PWA & Desktop Icon",
    filename: "hashti-app-icon.svg",
    path: "/hashti-app-icon.svg",
    width: 512,
    height: 512,
    aspectRatio: "1:1",
    description: "macOS Dock, iOS homescreen, Android adaptive launcher.",
  },
];

export function BrandbookAssets() {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = (path: string, filename: string) => {
    setDownloading(filename);
    const link = document.createElement("a");
    link.href = path;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloading(null), 1200);
  };

  return (
    <div className="my-8 not-prose grid grid-cols-1 md:grid-cols-2 gap-6">
      {ASSETS.map((asset) => (
        <div
          key={asset.filename}
          className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
        >
          {/* Preview Container */}
          <div className="relative p-8 min-h-[180px] flex items-center justify-center bg-neutral-50/60 dark:bg-neutral-950/60 border-b border-neutral-200 dark:border-neutral-800 [background-image:radial-gradient(rgba(8,189,186,0.2)_1px,transparent_1px)] [background-size:16px_16px]">
            <img
              src={asset.path}
              alt={asset.name}
              className="max-h-24 max-w-full object-contain filter drop-shadow-xs transition-transform hover:scale-105"
            />
            <span className="absolute top-3 right-3 text-[11px] font-mono px-2 py-0.5 rounded-full bg-neutral-200/70 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
              {asset.aspectRatio}
            </span>
          </div>

          {/* Details & Download Bar */}
          <div className="p-5 flex flex-col gap-3">
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                  {asset.name}
                </h4>
                <code className="text-xs font-mono text-neutral-500">
                  {asset.width}×{asset.height}
                </code>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                {asset.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <span className="text-xs font-mono text-neutral-400">{asset.filename}</span>
              <button
                type="button"
                onClick={() => handleDownload(asset.path, asset.filename)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-xs active:scale-95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                {downloading === asset.filename ? "Downloaded!" : "Download SVG"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
