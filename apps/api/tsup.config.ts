import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  format: ["esm"],
  target: "node22",
  platform: "node",
  outDir: "dist",
  clean: true,
  sourcemap: true,
  // El paquete de esquemas se publica como TypeScript: se empaqueta adentro del build.
  noExternal: ["@oriledesma/schemas"],
});
