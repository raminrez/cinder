import { expect, spyOn, test } from "bun:test";
import * as processes from "node:child_process";
import { EventEmitter } from "node:events";
import { resolve } from "node:path";
import type { ViteDevServer } from "vite";
import { watchPackages } from "./watch-packages";

test("package refresh queues edits, retries failures, and stops with Vite", async () => {
  const children: processes.ChildProcess[] = [];
  const createChild = () => {
    const child = new processes.ChildProcess();
    children.push(child);
    return child;
  };
  const spawn = spyOn(processes, "spawn").mockImplementation(createChild as typeof processes.spawn);
  const watcher = Object.assign(new EventEmitter(), { add: () => {} });
  const messages: unknown[] = [];
  const errors: string[] = [];
  let invalidations = 0;
  const server = {
    watcher,
    moduleGraph: { invalidateAll: () => invalidations++ },
    ws: { send: (message: unknown) => messages.push(message) },
    config: { logger: { error: (message: string) => errors.push(message) } },
  };
  const plugin = watchPackages();
  const change = (file: string) => watcher.emit("all", "change", resolve(import.meta.dir, file));

  try {
    plugin.configureServer.call(
      {} as ThisParameterType<typeof plugin.configureServer>,
      server as unknown as ViteDevServer,
    );
    change("../../../packages/tokens/src/tokens.css");
    change("../../../packages/tokens/src/tokens.json");
    change("../../../packages/react/dist/index.js");
    expect(spawn).not.toHaveBeenCalled();

    change("../../../packages/react/src/buttons.tsx");
    change("../../../packages/react/src/frame.css");
    expect(spawn).toHaveBeenCalledTimes(1);
    children[0]!.emit("close", 0);
    await Promise.resolve();
    expect(spawn).toHaveBeenCalledTimes(2);
    expect(messages).toEqual([]);

    children[1]!.emit("close", 1);
    await Promise.resolve();
    expect(errors).toHaveLength(1);
    expect(messages).toEqual([]);

    change("../../../packages/tokens/src/frame.ts");
    children[2]!.emit("close", 0);
    await Promise.resolve();
    expect(invalidations).toBe(1);
    expect(messages).toEqual([{ type: "full-reload" }]);

    change("../../../packages/tokens/scripts/generate.ts");
    const kill = spyOn(children[3]!, "kill").mockReturnValue(true);
    plugin.closeBundle();
    expect(kill).toHaveBeenCalledTimes(1);
    expect(watcher.listenerCount("all")).toBe(0);
    children[3]!.emit("close", null);
    await Promise.resolve();
    expect(errors).toHaveLength(1);
    expect(messages).toHaveLength(1);
    kill.mockRestore();
  } finally {
    plugin.closeBundle();
    spawn.mockRestore();
  }
});
