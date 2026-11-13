import type { Preview } from "@storybook/react-vite";
import { Theme } from "@hashti/react";
import "@hashti/react/styles.css";

const preview: Preview = {
  tags: ["autodocs"],
  globalTypes: {
    theme: {
      description: "Frame appearance",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "frame-light", title: "Frame light" },
          { value: "frame-dark", title: "Frame dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "frame-light" },
  parameters: {
    layout: "fullscreen",
    a11y: { test: "error" },
  },
  decorators: [
    (Story, { globals, viewMode }) => (
      <Theme
        theme={globals.theme === "frame-dark" ? "frame-dark" : "frame-light"}
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
