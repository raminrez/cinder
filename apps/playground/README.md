# Playground

Where Cinder's agent surface is prototyped, and where ui-sdk is evaluated on components Cinder
does not ship.

`src/agent/` is a prototype of the contract described in
[ADR 0001](../../docs/adr/0001-ui-sdk-and-hashti-agent-bridge.md): a registry, a `useAgentSurface`
hook, and `snapshot` / `act` / `query` over it.

```bash
bun run dev        # http://localhost:5173
bun test src/agent # contract tests
```

`window.agent` exists in the page's own console. Automation that reads it through a scripted
console runs in an isolated world and will not see it; drive the demo buttons instead.