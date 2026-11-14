import { createAgent } from "./registry";

const agent = createAgent({ allow: () => window.confirm("Run this step?") });

declare global {
  interface Window {
    agent: typeof agent;
  }
}

export { agent };