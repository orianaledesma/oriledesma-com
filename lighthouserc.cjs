/**
 * Lighthouse CI: corre sobre el build prerenderizado servido como en producción.
 * Si una métrica baja del presupuesto, el PR no pasa.
 */
const BASE = "http://localhost:4173";

module.exports = {
  ci: {
    collect: {
      // Web + API: el contador de cupos llama a la API y no debe dejar errores en consola.
      startServerCommand:
        'concurrently "npm run dev -w @oriledesma/api" "npm run serve -w @oriledesma/web -- 4173"',
      startServerReadyPattern: "serving",
      url: ["/", "/curso", "/aprende", "/en/implementation", "/links"].map((p) => BASE + p),
      numberOfRuns: 3,
      settings: { preset: "desktop" },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.95 }],
        "categories:accessibility": ["error", { minScore: 1 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 0.95 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
        "total-blocking-time": ["error", { maxNumericValue: 200 }],
      },
    },
    upload: { target: "temporary-public-storage" },
  },
};
