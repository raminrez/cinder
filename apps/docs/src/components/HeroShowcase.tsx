import React, { useState } from "react";
import {
  ButtonLiveDemo,
  SelectLiveDemo,
  ColorPickerLiveDemo,
  CommandPaletteLiveDemo,
  SheetLiveDemo,
  TokenFieldLiveDemo,
} from "./demos";

const TABS = [
  { id: "buttons", label: "Button Variants" },
  { id: "select", label: "Multi-Select Chips" },
  { id: "color", label: "ColorPicker 2D" },
  { id: "command", label: "Command Palette ⌘K" },
  { id: "sheet", label: "Sheet Drawer" },
  { id: "tokens", label: "TokenField AI" },
];

export function HeroShowcase() {
  const [activeTab, setActiveTab] = useState("buttons");

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl shadow-2xl overflow-hidden">
      {/* Stage Header / Navigation Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-950/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 items-center me-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 dark:bg-red-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 dark:bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 dark:bg-emerald-500 inline-block" />
          </div>
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-mono">
            Interactive Stage
          </span>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-full py-0.5">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-all duration-150 whitespace-nowrap ${
                  isActive
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage Canvas */}
      <div className="p-8 md:p-12 min-h-[360px] flex items-center justify-center bg-gradient-to-b from-neutral-50/50 to-neutral-100/30 dark:from-neutral-950/30 dark:to-neutral-900/50">
        <div className="w-full flex items-center justify-center">
          {activeTab === "buttons" && <ButtonLiveDemo />}
          {activeTab === "select" && <SelectLiveDemo />}
          {activeTab === "color" && <ColorPickerLiveDemo />}
          {activeTab === "command" && <CommandPaletteLiveDemo />}
          {activeTab === "sheet" && <SheetLiveDemo />}
          {activeTab === "tokens" && <TokenFieldLiveDemo />}
        </div>
      </div>

      {/* Stage Footer Status */}
      <div className="px-5 py-2.5 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-950/40 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 font-mono">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>React Aria Components 1.22.1 • Live Runtime</span>
        </span>
        <span>Zero-Runtime CSS Variables</span>
      </div>
    </div>
  );
}
