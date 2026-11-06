import { lazy, Suspense, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Theme, ToastProvider, type ThemeName } from "@cinder/react";
import { isThemeName } from "@cinder/tokens";
import Home from "./home";
import { SiteHeader, ThemePreference } from "./site";

const ComponentReference = lazy(() => import("./reference"));
const Foundations = lazy(() => import("./foundations"));
const GetStarted = lazy(() => import("./get-started"));
const Research = lazy(() => import("./research"));

function initialTheme(): ThemeName {
  const requested = new URLSearchParams(window.location.search).get("theme");
  if (isThemeName(requested)) return requested;
  try {
    const saved = localStorage.getItem("cinder-theme");
    if (isThemeName(saved)) return saved;
  } catch {
    /* Storage is optional. */
  }
  return "g10";
}

function App() {
  const [theme, setTheme] = useState<ThemeName>(initialTheme);
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  useEffect(() => {
    try {
      localStorage.setItem("cinder-theme", theme);
    } catch {
      /* Private storage can be unavailable. */
    }
    document.documentElement.style.colorScheme =
      theme === "white" || theme === "g10" ? "light" : "dark";
  }, [theme]);
  return (
    <ThemePreference.Provider value={{ theme, setTheme }}>
      <Theme theme={theme} locale="en-US" className="site-root">
        <ToastProvider>
          <SiteHeader />
          <Suspense
            fallback={
              <main id="main" className="page-frame route-loading" aria-busy="true">
                Loading the reference…
              </main>
            }
          >
            {path.startsWith("/components") ? (
              <ComponentReference />
            ) : path === "/foundations" ? (
              <Foundations />
            ) : path === "/get-started" ? (
              <GetStarted />
            ) : path === "/research" ? (
              <Research />
            ) : (
              <Home />
            )}
          </Suspense>
        </ToastProvider>
      </Theme>
    </ThemePreference.Provider>
  );
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("The Cinder application root is missing.");
const root = (import.meta.hot.data.root ??= createRoot(rootElement));
root.render(<App />);
