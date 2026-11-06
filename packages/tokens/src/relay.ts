// Relay's authored choices. The generator fills the remaining roles from Carbon.
const palettes = {
  "relay-light": {
    ground: "#f5f5f5",
    surface: "#ffffff",
    raised: "#eeeeee",
    active: "#e5e5e5",
    text: "#171717",
    muted: "#606060",
    disabled: "#818181",
    border: "#dfdfdf",
    control: "#848484",
    focus: "#3346a8",
    primary: "#171717",
    primaryHover: "#383838",
    primaryActive: "#525252",
    onPrimary: "#ffffff",
    error: "#b42332",
    errorSurface: "#fff0f2",
    danger: "#b42332",
    dangerHover: "#941d2a",
    dangerActive: "#761723",
  },
  "relay-dark": {
    ground: "#151515",
    surface: "#242424",
    raised: "#303030",
    active: "#3d3d3d",
    text: "#f4f4f4",
    muted: "#b9b9b9",
    disabled: "#898989",
    border: "#444444",
    control: "#818181",
    focus: "#b3beff",
    primary: "#f4f4f4",
    primaryHover: "#d7d7d7",
    primaryActive: "#b9b9b9",
    onPrimary: "#151515",
    error: "#ff9ca3",
    errorSurface: "#3d2327",
    danger: "#ff9ca3",
    dangerHover: "#ffbcc1",
    dangerActive: "#fa747e",
  },
};

export const relayThemes = Object.fromEntries(
  Object.entries(palettes).map(([name, p]) => {
    const values: Record<string, string> = {
      "color-scheme": name === "relay-light" ? "light" : "dark",
      background: p.ground,
      "background-hover": p.raised,
      "background-active": p.active,
      "background-selected": p.active,
      "background-selected-hover": p.active,
      "background-inverse": p.primary,
      "text-primary": p.text,
      "text-secondary": p.muted,
      "text-helper": p.muted,
      "text-placeholder": p.muted,
      "text-disabled": p.disabled,
      "text-on-color": p.onPrimary,
      "text-on-color-disabled": p.disabled,
      "text-inverse": p.onPrimary,
      "text-error": p.error,
      "icon-primary": p.text,
      "icon-secondary": p.muted,
      "icon-disabled": p.disabled,
      "icon-inverse": p.onPrimary,
      "icon-on-color": p.onPrimary,
      "icon-on-color-disabled": p.disabled,
      "border-inverse": p.text,
      "border-disabled": p.border,
      "layer-selected-inverse": p.primary,
      "layer-selected-disabled": p.raised,
      "link-primary": p.focus,
      "link-primary-hover": p.focus,
      "link-visited": p.focus,
      interactive: p.focus,
      focus: p.focus,
      "focus-inset": p.surface,
      "focus-inverse": p.onPrimary,
      "button-primary": p.primary,
      "button-primary-hover": p.primaryHover,
      "button-primary-active": p.primaryActive,
      "button-secondary": p.raised,
      "button-secondary-hover": p.active,
      "button-secondary-active": p.border,
      "button-tertiary": p.control,
      "button-tertiary-hover": p.raised,
      "button-tertiary-active": p.active,
      "button-danger-primary": p.danger,
      "button-danger-secondary": p.error,
      "button-danger-hover": p.dangerHover,
      "button-danger-active": p.dangerActive,
      "button-disabled": p.raised,
      "support-error": p.error,
      "notification-background-error": p.errorSurface,
      "toggle-off": p.muted,
      "content-switcher-background": p.surface,
      "content-switcher-background-hover": p.raised,
      highlight: p.active,
      overlay: "rgb(0 0 0 / 48%)",
      shadow: "rgb(0 0 0 / 16%)",
      "control-radius": "0.5rem",
      "popover-radius": "0.75rem",
      "overlay-radius": "1.25rem",
      "focus-width": "2px",
      "focus-offset": "2px",
    };
    for (const level of [1, 2, 3]) {
      const surface = level === 1 ? p.surface : level === 2 ? p.raised : p.active;
      for (const role of ["layer", "layer-background"]) values[`${role}-0${level}`] = surface;
      for (const role of ["layer-hover", "layer-accent", "field-hover"])
        values[`${role}-0${level}`] = p.raised;
      for (const role of [
        "layer-active",
        "layer-selected",
        "layer-selected-hover",
        "layer-accent-hover",
        "layer-accent-active",
      ])
        values[`${role}-0${level}`] = p.active;
      values[`field-0${level}`] = p.surface;
      values[`border-strong-0${level}`] = p.control;
      values[`border-tile-0${level}`] = p.border;
      values[`border-subtle-selected-0${level}`] = p.control;
      values[`border-subtle-0${level - 1}`] = p.border;
    }
    return [name, values];
  }),
);
