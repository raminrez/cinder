import { createContext, useContext, useMemo, type ComponentPropsWithRef } from "react";
import { I18nProvider, useLocale } from "react-aria-components";
import { nextLayer, type LayerLevel, type ThemeName } from "@cinder/tokens";

type ThemeContextValue = { theme: ThemeName; layer: LayerLevel; direction: "ltr" | "rtl" };
const ThemeContext = createContext<ThemeContextValue>({ theme: "white", layer: 0, direction: "ltr" });

export interface ThemeProps extends ComponentPropsWithRef<"div"> {
  theme?: ThemeName;
  locale?: string;
}

export function Theme({ locale, ...props }: ThemeProps) {
  return (
    <I18nProvider locale={locale}>
      <ThemeRoot {...props} />
    </I18nProvider>
  );
}

function ThemeRoot({ theme = "white", className, children, ...props }: Omit<ThemeProps, "locale">) {
  const { direction } = useLocale();
  const value = useMemo(() => ({ theme, layer: 0 as const, direction }), [theme, direction]);
  return (
    <ThemeContext.Provider value={value}>
      <div {...props} dir={props.dir ?? direction} data-cinder-theme={theme} data-cinder-layer="0" className={["cinder-theme", className].filter(Boolean).join(" ")}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export interface LayerProps extends ComponentPropsWithRef<"div"> {
  level?: LayerLevel;
}

export function Layer({ level, className, children, ...props }: LayerProps) {
  const parent = useTheme();
  const layer = level ?? nextLayer(parent.layer);
  const value = useMemo(() => ({ ...parent, layer }), [parent, layer]);
  return (
    <ThemeContext.Provider value={value}>
      <div {...props} data-cinder-layer={layer} className={["cinder-layer", className].filter(Boolean).join(" ")}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

/** CSS inheritance stops at a portal; React context does not. */
export function useOverlayTheme() {
  const { theme, layer, direction } = useTheme();
  return { "data-cinder-theme": theme, "data-cinder-layer": layer, dir: direction };
}
