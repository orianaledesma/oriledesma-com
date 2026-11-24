import { expect, test } from "@playwright/test";

test("navigates the main sections from the header", async ({ page, isMobile }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("probado");

  const open = async () => {
    if (isMobile) await page.getByRole("button", { name: "Menú" }).click();
  };
  const nav = page.getByRole("navigation", { name: "Principal" });

  await open();
  await nav.getByRole("link", { name: "Curso" }).click();
  await expect(page).toHaveURL(/\/curso$/);
  await expect(page).toHaveTitle(/^Curso: Cómo crear una marca entera con IA/);
  // En mobile el menú se cierra al navegar: se vuelve a abrir para ver el link activo.
  await open();
  await expect(nav.getByRole("link", { name: "Curso" })).toHaveAttribute("aria-current", "page");

  await nav.getByRole("link", { name: "Talleres" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Salís del taller");
});

test("serves prerendered HTML that works without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/sobre-mi");
  await expect(page.getByRole("heading", { level: 1, name: "Hola, soy Ori" })).toBeVisible();

  // El FAQ es <details>: abre sin JS.
  await page.goto("/");
  await page.getByText("¿Necesito saber de tecnología?").click();
  await expect(page.getByText(/Si sabés mandar un WhatsApp/)).toBeVisible();
  await context.close();
});

test("shows the not found page for unknown routes", async ({ page }) => {
  await page.goto("/no-existe");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("No encontramos esta página");
});
