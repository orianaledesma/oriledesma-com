/**
 * Después del build:
 *  1. deja el /404 prerenderizado como 404.html en la raíz (Cloudflare Pages lo sirve con status 404);
 *  2. saca el fallback de SPA, que no se usa;
 *  3. genera sitemap.xml con las páginas prerenderizadas indexables.
 */
import { copyFile, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITE_URL = "https://oriledesma.com";
const client = path.join(path.dirname(fileURLToPath(import.meta.url)), "../build/client");

await copyFile(path.join(client, "404/index.html"), path.join(client, "404.html"));
await rm(path.join(client, "404"), { recursive: true });
await rm(path.join(client, "__spa-fallback.html"), { force: true });

/** Rutas = carpetas con index.html, salvo las marcadas noindex. */
async function indexablePaths(dir = client, prefix = "") {
  const paths = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === "assets") continue;
    const route = `${prefix}/${entry.name}`;
    const html = await readFile(path.join(dir, entry.name, "index.html"), "utf8").catch(() => null);
    if (html && !html.includes('content="noindex"')) paths.push(route);
    paths.push(...(await indexablePaths(path.join(dir, entry.name), route)));
  }
  return paths;
}

const today = new Date().toISOString().slice(0, 10);
const urls = ["/", ...(await indexablePaths()).sort()]
  .map((p) => `  <url><loc>${SITE_URL}${p}</loc><lastmod>${today}</lastmod></url>`)
  .join("\n");
await writeFile(
  path.join(client, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

console.log("✓ 404.html and sitemap.xml ready");
