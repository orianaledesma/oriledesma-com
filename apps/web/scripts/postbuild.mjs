/**
 * Después del build: deja el /404 prerenderizado como 404.html en la raíz
 * (Cloudflare Pages lo sirve con status 404) y saca el fallback de SPA, que no se usa.
 */
import { copyFile, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const client = path.join(path.dirname(fileURLToPath(import.meta.url)), "../build/client");
await copyFile(path.join(client, "404/index.html"), path.join(client, "404.html"));
await rm(path.join(client, "404"), { recursive: true });
await rm(path.join(client, "__spa-fallback.html"), { force: true });
console.log("✓ 404.html ready");
