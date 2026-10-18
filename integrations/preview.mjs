import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";

const directory = fileURLToPath(new URL("./dist/", import.meta.url));
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
};

export function previewServer() {
  return createServer(async (request, response) => {
    if (!["GET", "HEAD"].includes(request.method)) {
      response.writeHead(405, { Allow: "GET, HEAD" }).end();
      return;
    }
    try {
      const pathname = decodeURIComponent(
        new URL(request.url, "http://localhost").pathname,
      );
      const relative = pathname.endsWith("/")
        ? `${pathname}index.html`
        : extname(pathname)
          ? pathname
          : `${pathname}/index.html`;
      const target = resolve(directory, `.${relative}`);
      if (!target.startsWith(resolve(directory) + sep)) {
        response.writeHead(403).end();
        return;
      }
      let body;
      let type = types[extname(target)] || "application/octet-stream";
      let status = 200;
      try {
        body = await readFile(target);
      } catch {
        body = await readFile(resolve(directory, "404.html"));
        type = types[".html"];
        status = 404;
      }
      response.writeHead(status, {
        "Content-Type": type,
        "X-Content-Type-Options": "nosniff",
        "X-Robots-Tag": "noindex, follow",
        "Cache-Control": "no-store",
      });
      response.end(request.method === "HEAD" ? undefined : body);
    } catch {
      response.writeHead(400).end();
    }
  });
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const port = Number(process.env.INTEGRATIONS_PREVIEW_PORT || 4188);
  previewServer().listen(port, "127.0.0.1", () => {
    console.log(`RCS Integrations local preview: http://127.0.0.1:${port}`);
  });
}
