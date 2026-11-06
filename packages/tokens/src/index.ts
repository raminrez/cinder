import data from "./tokens.json";

export const themeNames = [
  "white",
  "g10",
  "g90",
  "g100",
  "relay-light",
  "relay-dark",
  "frame-light",
  "frame-dark",
] as const;
export type ThemeName = (typeof themeNames)[number];
export type LayerLevel = 0 | 1 | 2;
export const themes = data.themes;
export const foundations = data.global;
export const breakpoints = data.breakpoints;
/** Carbon's complete type definitions, with unmodified breakpoint overrides. */
export const typeStyles = data.typeStyles;
export type TypeStyleName = keyof typeof typeStyles;
export type ThemeToken = {
  [Name in keyof typeof themes]: keyof (typeof themes)[Name];
}[keyof typeof themes];
export type FoundationToken = keyof typeof foundations;
export type TokenName = ThemeToken | FoundationToken;

/** A semantic CSS reference that follows the nearest Theme and Layer. */
export function token(name: TokenName): `var(--cinder-${TokenName})` {
  return `var(--cinder-${name})`;
}

export function isThemeName(value: unknown): value is ThemeName {
  return typeof value === "string" && themeNames.some((theme) => theme === value);
}

/** Carbon defines three contextual layer levels; deeper nesting uses the third. */
export function nextLayer(level: LayerLevel): LayerLevel {
  return level === 0 ? 1 : 2;
}
