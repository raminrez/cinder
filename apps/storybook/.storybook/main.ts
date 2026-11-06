import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import { watchPackages } from "./watch-packages.ts";

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(ts|tsx)"],
  framework: "@storybook/react-vite",
  addons: ["@storybook/addon-a11y"],
  viteFinal(config) {
    return mergeConfig(config, {
      resolve: { dedupe: ["react", "react-dom"] },
      optimizeDeps: { exclude: ["@cinder/react", "@cinder/tokens"] },
      plugins: [watchPackages()],
    });
  },
};

export default config;
