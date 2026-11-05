import {
  themes,
  buttonTokens,
  tagTokens,
  notificationTokens,
  statusTokens,
  contentSwitcherTokens,
} from "@carbon/themes";
import * as layout from "@carbon/layout";
import * as typography from "@carbon/type";
import * as motion from "@carbon/motion";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const destination = resolve(import.meta.dir, "../src");

export function kebab(name: string): string {
  return name
    .replace(/([a-z\d])([A-Z])/g, "$1-$2")
    .replace(/([a-z])([0-9]+)/g, "$1-$2")
    .toLowerCase();
}

const componentGroups = [
  buttonTokens,
  tagTokens,
  notificationTokens,
  statusTokens,
  contentSwitcherTokens,
];

const semantic = Object.fromEntries(
  Object.entries(themes).map(([theme, values]) => {
    const entries: [string, string][] = Object.entries(values)
      .filter((entry): entry is [string, string] => typeof entry[1] === "string")
      .map(([name, value]) => [kebab(name), value]);
    for (const group of componentGroups) {
      for (const [name, values] of Object.entries(group)) {
        const map = values as Record<string, string>;
        const value = map[theme === "white" ? "whiteTheme" : theme] ?? map.fallback;
        if (value !== undefined) entries.push([kebab(name), value]);
      }
    }
    return [theme, Object.fromEntries(entries.sort(([a], [b]) => a.localeCompare(b)))];
  }),
);

const global: Record<string, string | number> = {
  "font-sans": '"IBM Plex Sans", "Helvetica Neue", Arial, sans-serif',
  "font-mono": '"IBM Plex Mono", ui-monospace, SFMono-Regular, monospace',
};
for (const [key, value] of Object.entries(layout)) {
  if (/^(spacing\d|container\d|size(Xs|Sm|Md|Lg|Xl|2xl)$|borderRadius)/.test(key)) {
    if (typeof value === "string") global[kebab(key)] = value;
  }
}
for (const [key, value] of Object.entries(typography)) {
  if (/^(body|bodyCompact|label|helperText|heading|code|display)\d/.test(key)) {
    for (const [property, setting] of Object.entries(value)) {
      if (typeof setting === "number" || typeof setting === "string") {
        global[`${kebab(key)}-${kebab(property)}`] = setting;
      }
    }
  }
}
for (const [key, value] of Object.entries(motion)) {
  if (key.startsWith("duration") && typeof value === "string") global[kebab(key)] = value;
}
for (const [name, modes] of Object.entries(motion.easings)) {
  for (const [mode, value] of Object.entries(modes)) global[`ease-${name}-${mode}`] = value;
}

const declarations = (values: Record<string, string | number>) =>
  Object.entries(values)
    .map(([name, value]) => `  --cinder-${name}: ${value};`)
    .join("\n");

// A layer changes contextual aliases, not the source theme. A new Theme resets
// its layer context. Portalled overlays carry both attributes from React context.
const layeredTokens = [
  "layer", "layer-hover", "layer-active", "layer-selected", "layer-selected-hover",
  "layer-accent", "layer-accent-hover", "layer-accent-active", "field", "field-hover",
  "border-subtle", "border-strong", "border-tile", "border-subtle-selected",
];
const aliases = (layer: number) =>
  layeredTokens
    .map((name) => `  --cinder-${name}: var(--cinder-${name}-0${Math.min(layer + 1, 3)});`)
    .join("\n");

const css = `/* Generated from Carbon Design System. Copyright IBM Corp.
 * Apache-2.0. Cinder changes: CSS namespace and contextual layer aliases.
 * Regenerate with: bun run build:tokens
 */
:root {\n${declarations(global)}\n}
${Object.entries(semantic)
  .map(([name, values]) => `${name === "white" ? ":root,\n" : ""}[data-cinder-theme="${name}"] {\n${declarations(values)}\n  color-scheme: ${name === "white" || name === "g10" ? "light" : "dark"};\n}`)
  .join("\n")}
:root, [data-cinder-theme], [data-cinder-layer="0"] {\n${aliases(0)}\n}
[data-cinder-layer="1"] {\n${aliases(1)}\n}
[data-cinder-layer="2"], [data-cinder-layer="3"] {\n${aliases(2)}\n}
`;

await mkdir(destination, { recursive: true });
await Promise.all([
  Bun.write(`${destination}/tokens.css`, css),
  Bun.write(`${destination}/tokens.json`, JSON.stringify({ themes: semantic, global, breakpoints: layout.breakpoints }, null, 2) + "\n"),
]);
console.log(`Generated ${Object.keys(semantic.white ?? {}).length} theme tokens × 4 themes, ${Object.keys(global).length} foundations.`);
