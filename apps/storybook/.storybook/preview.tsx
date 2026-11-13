import type { Preview } from "@storybook/react-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { mswLoader } from "msw-storybook-addon/csf3";
import { Theme } from "@hashti/react";
import "@hashti/react/styles.css";

// Frame themes are attribute-driven, so the addon flips data-hashti-theme on the
// document and every Theme boundary below it inherits the resolved tokens.
const preview: Preview = {
  tags: ["autodocs"],
  initialGlobals: { theme: "Frame light" },
  parameters: {
    layout: "fullscreen",
    a11y: { test: "error" },
  },
  loaders: [mswLoader()],
  decorators: [
    withThemeByDataAttribute({
      themes: { "Frame light": "frame-light", "Frame dark": "frame-dark" },
      defaultTheme: "Frame light",
      attributeName: "data-hashti-theme",
      parentSelector: "html",
    }),
    (Story, { globals, viewMode }) => (
      <Theme
        theme={globals.theme === "Frame dark" ? "frame-dark" : "frame-light"}
        style={
          viewMode === "docs"
            ? { padding: "1rem" }
            : { minHeight: "100vh", padding: "1.5rem", boxSizing: "border-box" }
        }
      >
        <Story />
      </Theme>
    ),
  ],
};

export default preview;
