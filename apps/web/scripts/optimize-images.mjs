/**
 * Genera las variantes responsive (AVIF + WebP) de las fotos y optimiza los SVG del logo.
 * Fuente: assets-src/ (originales, versionados). Salida: app/assets/ (lo que importa la app).
 * Uso: npm run images -w @oriledesma/web
 */
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { optimize } from "svgo";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const photosIn = path.join(root, "assets-src/photos");
const photosOut = path.join(root, "app/assets/photos");
const logosDir = path.join(root, "app/assets/logo");

/** Anchos por foto: cubren los tamaños reales de render en 1x y 2x. */
const WIDTHS = {
  "ori-arco": [480, 740, 1111],
  "ori-perfil": [240, 400, 800],
};

async function photos() {
  await mkdir(photosOut, { recursive: true });
  for (const [name, widths] of Object.entries(WIDTHS)) {
    const input = path.join(photosIn, `${name}.webp`);
    for (const width of widths) {
      const base = sharp(input).resize({ width, withoutEnlargement: true });
      await base.clone().avif({ quality: 55, effort: 6 }).toFile(path.join(photosOut, `${name}-${width}.avif`));
      await base.clone().webp({ quality: 78, alphaQuality: 90 }).toFile(path.join(photosOut, `${name}-${width}.webp`));
      console.log(`✓ ${name} @${width}w`);
    }
  }
}

async function logos() {
  for (const file of await readdir(logosDir)) {
    if (!file.endsWith(".svg")) continue;
    const full = path.join(logosDir, file);
    const before = await readFile(full, "utf8");
    const { data } = optimize(before, { multipass: true, path: full });
    await writeFile(full, data);
    console.log(`✓ ${file}: ${before.length} → ${data.length} bytes`);
  }
}

await photos();
await logos();
