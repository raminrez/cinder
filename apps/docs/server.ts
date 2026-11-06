import index from "./index.html";
import prototypes from "./prototypes.html";
import { resolve } from "node:path";
import { siteLicenses } from "../../scripts/licenses";
import { researchReports } from "./reports";

const root = resolve(import.meta.dir, "../..");

const server = Bun.serve({
  port: Number(process.env.PORT ?? 3000),
  hostname: process.env.HOST ?? "127.0.0.1",
  routes: {
    "/": index,
    "/components": index,
    "/components/*": index,
    "/foundations": index,
    "/get-started": index,
    "/research": index,
    "/relay": index,
    "/relay/": index,
    "/prototypes": prototypes,
    ...Object.fromEntries(
      Object.values(researchReports).map((filename) => [
        `/reports/${filename}`,
        () =>
          new Response(Bun.file(`${root}/docs/${filename}`), {
            headers: { "Content-Type": "text/markdown; charset=utf-8" },
          }),
      ]),
    ),
    "/LICENSE.txt": () =>
      new Response(Bun.file(`${root}/LICENSE`), {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      }),
    "/NOTICE.txt": () =>
      new Response(Bun.file(`${root}/NOTICE`), {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      }),
    "/THIRD_PARTY_LICENSES.txt": async () =>
      new Response(await siteLicenses(root), {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      }),
    "/health": () => Response.json({ status: "ok", runtime: Bun.version }),
  },
  development: { hmr: true, console: true },
  fetch() {
    return new Response("Page not found", { status: 404 });
  },
});

console.log(`Cinder · http://${server.hostname}:${server.port}`);
