import { defineConfig, devices } from "@playwright/test";

const WEB_PORT = 4173;
const API_PORT = 3101;
const CI = Boolean(process.env.CI);

/**
 * E2E contra el build de producción y la API real (con adapters en memoria).
 * La web se compila apuntando a esta API, así se prueba el flujo completo.
 */
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 2 : 0,
  reporter: CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${WEB_PORT}`,
    trace: "on-first-retry",
    // Fuera de CI se puede usar el Chrome del sistema: PW_CHROME_PATH=/usr/bin/google-chrome
    ...(process.env.PW_CHROME_PATH && {
      launchOptions: { executablePath: process.env.PW_CHROME_PATH },
    }),
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: [
    {
      command: `npm run dev -w @oriledesma/api`,
      env: { PORT: String(API_PORT), LOG_LEVEL: "warn", RATE_LIMIT_PER_MINUTE: "1000" },
      url: `http://localhost:${API_PORT}/health`,
      reuseExistingServer: !CI,
    },
    {
      command: `npm run build -w @oriledesma/web && npm run serve -w @oriledesma/web -- ${WEB_PORT}`,
      env: { VITE_API_URL: `http://localhost:${API_PORT}` },
      url: `http://localhost:${WEB_PORT}`,
      reuseExistingServer: !CI,
      timeout: 120_000,
    },
  ],
});
