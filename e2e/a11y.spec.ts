import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const PAGES = [
  "/",
  "/curso",
  "/talleres",
  "/implementacion",
  "/en/implementation",
  "/vivos",
  "/aprende",
  "/en-publico",
  "/guia",
  "/sobre-mi",
  "/links",
  "/privacidad",
];

/** En el navegador real sí se mide el contraste (en jsdom no se puede). */
for (const path of PAGES) {
  test(`${path} has no WCAG 2.1 AA violations`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
