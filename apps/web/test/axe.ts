import { configureAxe } from "vitest-axe";

/**
 * jsdom no pinta: el contraste de color se valida en el navegador real
 * (Playwright + Lighthouse), no en los tests unitarios.
 */
export const axe = configureAxe({
  rules: { "color-contrast": { enabled: false } },
});
