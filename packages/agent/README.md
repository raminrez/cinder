# @hashti/agent

The agent surface for Hashti components: `snapshot`, `act` and `query` over a page, plus WebMCP
registration.

```ts
import { createAgent, registerTools } from "@hashti/agent";

const agent = createAgent({ allow: (request) => request.action !== "press" });
registerTools(agent, { allow: () => window.confirm("Run this step?") });
```

Components from `@hashti/react` register themselves while they are mounted; creating the bridge is
the whole setup. Decisions behind the contract are in
[docs/adr/0001](../../docs/adr/0001-ui-sdk-and-hashti-agent-bridge.md).

Agent writes reach the component's `onChange`; on an uncontrolled component the new value appears in
the snapshot before it appears on screen, so control the value when an agent has to change it.