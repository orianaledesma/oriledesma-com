import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// Config aparte de vite.config.ts: el plugin de React Router no corre dentro de Vitest.
export default defineConfig({
  plugins: [react()],
  resolve: { tsconfigPaths: true },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./test/setup.ts"],
    css: { modules: { classNameStrategy: "non-scoped" } },
    include: ["app/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      include: ["app/**/*.{ts,tsx}"],
      exclude: ["app/**/*.test.{ts,tsx}", "app/routes.ts", "app/entry.*"],
    },
  },
});
