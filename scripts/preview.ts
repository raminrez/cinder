import { resolve, sep } from "node:path";

const root = resolve(import.meta.dir, "../dist/site");
export async function startPreview({
  port = Number(process.env.PORT ?? 3000),
  hostname = process.env.HOST ?? "127.0.0.1",
} = {}) {
  if (!(await Bun.file(`${root}/index.html`).exists()))
    throw new Error("Run bun run build before starting the production preview.");
  return Bun.serve({
    hostname,
    port,
    async fetch(request) {
      const url = new URL(request.url);
      if (url.pathname === "/health") return Response.json({ status: "ok", runtime: Bun.version });
      if (request.method !== "GET" && request.method !== "HEAD")
        return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
      let path: string;
      try {
        path = decodeURIComponent(url.pathname);
      } catch {
        return new Response("Bad request", { status: 400 });
      }
      const filename = resolve(root, `.${path}`);
      if (!filename.startsWith(`${root}${sep}`) && filename !== root)
        return new Response("Not found", { status: 404 });
      const file = Bun.file(filename);
      if (filename !== root && (await file.exists()))
        return new Response(file, {
          headers: {
            "Cache-Control": /-[a-z0-9]{8,}\./i.test(filename)
              ? "public, max-age=31536000, immutable"
              : "no-cache",
          },
        });
      if (/^\/(?:components(?:\/[^/]+)?|foundations|get-started|research)?\/?$/.test(path))
        return new Response(Bun.file(`${root}/index.html`), {
          headers: { "Cache-Control": "no-cache" },
        });
      return new Response("Not found", { status: 404 });
    },
  });
}

if (import.meta.main) {
  const server = await startPreview();
  console.log(`Cinder production preview · http://${server.hostname}:${server.port}`);
}
