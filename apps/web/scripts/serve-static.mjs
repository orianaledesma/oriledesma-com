/**
 * Servidor estático que se comporta como Cloudflare Pages con el build prerenderizado:
 *   /ruta → /ruta/index.html, rutas desconocidas → 404.html con status 404,
 *   assets con hash → cache inmutable. Lo usan los E2E y Lighthouse.
 * Uso: node scripts/serve-static.mjs [puerto]
 */
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../build/client");
const port = Number(process.argv[2] ?? process.env.PORT ?? 4173);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".webp": "image/webp",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

const isFile = async (file) => (await stat(file).catch(() => null))?.isFile() ?? false;

async function resolve(urlPath) {
  const clean = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, "");
  const base = path.join(root, clean);
  if (!base.startsWith(root)) return null;
  for (const candidate of [base, path.join(base, "index.html"), `${base}.html`]) {
    if (await isFile(candidate)) return candidate;
  }
  return null;
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url ?? "/", "http://localhost");
  let file = await resolve(pathname);
  let status = 200;
  if (!file) {
    status = 404;
    file = path.join(root, "404.html");
  }
  const ext = path.extname(file);
  res.writeHead(status, {
    "Content-Type": TYPES[ext] ?? "application/octet-stream",
    "Cache-Control": pathname.startsWith("/assets/")
      ? "public, max-age=31536000, immutable"
      : "public, max-age=0, must-revalidate",
  });
  createReadStream(file).pipe(res);
}).listen(port, () => {
  console.log(`serving ${root} on http://localhost:${port}`);
});
