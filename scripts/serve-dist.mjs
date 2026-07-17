// Minimal static server that mirrors the Vercel production routing used by this
// site: `cleanUrls` (so /en serves dist/en/index.html), the ?lang= -> /en|/ur
// permanent redirects, and an SPA fallback to the root index.html. Used by the
// Playwright config so E2E runs against production-equivalent routing.

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(__dirname, "..", "dist");
const port = Number(process.env.PORT) || 4173;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
};

async function resolveFile(pathname) {
  // Direct file hit.
  const direct = path.join(dist, pathname);
  if (existsSync(direct) && (await stat(direct)).isFile()) return direct;

  // Clean URL: /en -> /en/index.html
  const asIndex = path.join(dist, pathname, "index.html");
  if (existsSync(asIndex)) return asIndex;

  // Clean URL: /foo -> /foo.html
  const asHtml = path.join(dist, `${pathname}.html`);
  if (existsSync(asHtml)) return asHtml;

  return null;
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  const pathname = decodeURIComponent(url.pathname);

  // Mirror vercel.json redirects: /?lang=en -> /en, /?lang=ur -> /ur
  if (pathname === "/") {
    const lang = url.searchParams.get("lang");
    if (lang === "en" || lang === "ur") {
      res.writeHead(308, { Location: `/${lang}` });
      res.end();
      return;
    }
  }

  let file = await resolveFile(pathname === "/" ? "/index.html" : pathname);

  // SPA fallback to the Arabic root.
  if (!file) file = path.join(dist, "index.html");

  try {
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": MIME[path.extname(file)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
});

server.listen(port, () => {
  console.log(`serve-dist: http://localhost:${port} (dist/)`);
});
