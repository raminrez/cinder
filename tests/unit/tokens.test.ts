import { describe, expect, test } from "bun:test";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import {
  foundations,
  isThemeName,
  nextLayer,
  themeNames,
  themes,
  token,
  typeStyles,
} from "@cinder/tokens";

// Resolve the pinned upstreams from the workspace that owns them. This also works
// with Bun's isolated linker; the test does not rely on accidentally hoisted deps.
const upstream = createRequire(new URL("../../packages/tokens/package.json", import.meta.url));
const carbon = upstream("@carbon/themes");
const layout = upstream("@carbon/layout");
const typography = upstream("@carbon/type");
const motion = upstream("@carbon/motion");

describe("Carbon token parity", () => {
  const semantic = {
    background: "background",
    "layer-01": "layer01",
    "layer-02": "layer02",
    "layer-03": "layer03",
    "field-01": "field01",
    "field-02": "field02",
    "field-03": "field03",
    "text-primary": "textPrimary",
    "text-secondary": "textSecondary",
    "text-error": "textError",
    "border-strong-01": "borderStrong01",
    focus: "focus",
    "focus-inset": "focusInset",
    interactive: "interactive",
    "support-success": "supportSuccess",
    "support-error": "supportError",
  } as const;

  for (const theme of themeNames.filter((name) => !name.startsWith("relay-"))) {
    test(`${theme} preserves semantic and component colors from the official packages`, () => {
      for (const [name, original] of Object.entries(semantic)) {
        expect(themes[theme][name as keyof typeof semantic]).toBe(carbon.themes[theme][original]);
      }
      const upstreamTheme = theme === "white" ? "whiteTheme" : theme;
      expect(themes[theme]["button-primary"]).toBe(
        carbon.buttonTokens.buttonPrimary[upstreamTheme],
      );
      expect(themes[theme]["tag-background-green"]).toBe(
        carbon.tagTokens.tagBackgroundGreen[upstreamTheme],
      );
      expect(themes[theme]["notification-background-error"]).toBe(
        carbon.notificationTokens.notificationBackgroundError[upstreamTheme],
      );
      expect(Object.keys(themes[theme])).toEqual(Object.keys(themes.white));
      if (theme === "g90" || theme === "g100") {
        expect(themes[theme]["status-orange-outline"]).toBe(
          carbon.statusTokens.statusOrange[theme],
        );
        expect(themes[theme]["status-yellow-outline"]).toBe(
          carbon.statusTokens.statusYellow[theme],
        );
        expect(themes[theme]["notification-action-hover"]).toBe("var(--cinder-layer-hover)");
      }
    });
  }

  test("spacing, type, control geometry, and motion retain their upstream values", () => {
    expect(foundations["spacing-01"]).toBe(layout.spacing01);
    expect(foundations["spacing-05"]).toBe(layout.spacing05);
    expect(foundations["spacing-13"]).toBe(layout.spacing13);
    expect(foundations["size-sm"]).toBe(layout.sizeSm);
    expect(foundations["size-md"]).toBe(layout.sizeMd);
    expect(foundations["size-lg"]).toBe(layout.sizeLg);
    expect(foundations["body-01-font-size"]).toBe(typography.body01.fontSize);
    expect(foundations["label-01-line-height"]).toBe(typography.label01.lineHeight);
    expect(foundations["duration-fast-02"]).toBe(motion.durationFast02);
    expect(foundations["ease-entrance-productive"]).toBe(motion.easings.entrance.productive);
  });

  test("every literal Cinder CSS variable reference has a definition", async () => {
    const root = resolve(import.meta.dir, "../..");
    const paths = [
      "packages/tokens/src/tokens.css",
      "packages/react/src/styles.css",
      "packages/react/src/relay.css",
      "apps/docs/src/site.css",
      "apps/docs/src/relay.css",
    ];
    const css = (await Promise.all(paths.map((path) => Bun.file(resolve(root, path)).text()))).join(
      "\n",
    );
    const defined = new Set([...css.matchAll(/(--cinder-[\w-]+)\s*:/g)].map((match) => match[1]));
    const referenced = new Set(
      [...css.matchAll(/var\((--cinder-[\w-]+)/g)].map((match) => match[1]),
    );
    expect([...referenced].filter((name) => !defined.has(name))).toEqual([]);
  });

  test("compact type and expressive breakpoint definitions survive token serialization", () => {
    expect(typeStyles["heading-compact-01"]).toEqual(typography.headingCompact01);
    expect(typeStyles["heading-compact-02"]).toEqual(typography.headingCompact02);
    expect(typeStyles["fluid-heading-05"]).toEqual(typography.fluidHeading05);
    expect(typeStyles["fluid-display-04"]).toEqual(typography.fluidDisplay04);
    expect(typeStyles["display-04"]).toEqual(typography.display04);
    expect(foundations["heading-compact-01-line-height"]).toBe(
      typography.headingCompact01.lineHeight,
    );
    expect(foundations["label-01-letter-spacing"]).toBe("0.32px");
    expect(foundations["helper-text-01-letter-spacing"]).toBe("0.32px");
  });
});

test("theme names are validated and nested layers saturate at Carbon's third level", () => {
  expect(themeNames.filter(isThemeName)).toEqual([
    "white",
    "g10",
    "g90",
    "g100",
    "relay-light",
    "relay-dark",
  ]);
  for (const value of [null, undefined, {}, "dark", "White", 10])
    expect(isThemeName(value)).toBe(false);
  expect([nextLayer(0), nextLayer(1), nextLayer(2)]).toEqual([1, 2, 2]);
  expect(token("background")).toBe("var(--cinder-background)");
  expect(token("control-radius")).toBe("var(--cinder-control-radius)");
});

function luminance(hex: string) {
  const rgb = [1, 3, 5].map((offset) => Number.parseInt(hex.slice(offset, offset + 2), 16) / 255);
  const linear = rgb.map((value) =>
    value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
  );
  return linear[0]! * 0.2126 + linear[1]! * 0.7152 + linear[2]! * 0.0722;
}

for (const name of ["relay-light", "relay-dark"] as const) {
  test(`${name} defines the complete semantic contract and readable control colors`, () => {
    const values = themes[name];
    for (const key of Object.keys(themes.white)) expect(values).toHaveProperty(key);
    expect(Object.keys(values)).toEqual(Object.keys(themes["relay-light"]));
    for (const [foreground, background] of [
      ["text-primary", "background"],
      ["text-secondary", "background"],
      ["text-placeholder", "field-01"],
      ["text-helper", "field-01"],
      ["text-error", "background"],
      ["text-primary", "button-secondary"],
      ["text-primary", "button-secondary-hover"],
      ["text-primary", "button-secondary-active"],
      ["text-on-color", "button-primary"],
      ["text-on-color", "button-primary-hover"],
      ["text-on-color", "button-primary-active"],
      ["text-on-color", "button-danger-primary"],
      ["text-on-color", "button-danger-hover"],
      ["text-on-color", "button-danger-active"],
    ] as const) {
      const pair = [luminance(values[foreground]), luminance(values[background])].sort(
        (a, b) => b - a,
      );
      expect(
        (pair[0]! + 0.05) / (pair[1]! + 0.05),
        `${name}: ${foreground} on ${background}`,
      ).toBeGreaterThanOrEqual(4.5);
    }
    for (const background of ["background", "field-01", "layer-03"] as const) {
      const pair = [luminance(values.focus), luminance(values[background])].sort((a, b) => b - a);
      expect(
        (pair[0]! + 0.05) / (pair[1]! + 0.05),
        `${name}: focus on ${background}`,
      ).toBeGreaterThanOrEqual(3);
    }
  });
}
