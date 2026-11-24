import { expect, test } from "@playwright/test";

test("subscribes to the newsletter through the real API", async ({ page }) => {
  await page.goto("/");
  const footer = page.getByRole("contentinfo");
  const email = footer.getByLabel("Tu email");

  await footer.getByRole("button", { name: "Sumarme" }).click();
  await expect(email).toBeFocused();
  await expect(email).toHaveAttribute("aria-invalid", "true");

  await email.fill(`e2e+${Date.now()}@example.com`);
  await footer.getByRole("button", { name: "Sumarme" }).click();
  await expect(footer.getByRole("status")).toHaveText(/Te sumaste a la newsletter/);
  await expect(email).toBeDisabled();
});

test("sends an implementation inquiry in English", async ({ page }) => {
  await page.goto("/en/implementation");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");

  const form = page.getByRole("form", { name: "Tell me about your business" });
  await form.getByLabel("Your name").fill("Ana");
  await form.getByLabel("Your email").fill("ana@example.com");
  await form.getByLabel("Which process do you want to solve?").fill("WhatsApp orders");
  await form.getByLabel("Which tools do you use today?").fill("Shopify");
  await form.getByLabel("When do you need it?").selectOption("this-month");
  await form.getByRole("button", { name: "Send" }).click();

  await expect(form.getByRole("status")).toHaveText(/I got your message/);
});

test("loads the course seats from the API", async ({ page }) => {
  await page.goto("/curso");
  await expect(
    page.getByRole("progressbar", { name: "Lugares disponibles" }).first(),
  ).toHaveAttribute("aria-valuetext", "Quedan 20 de 20 lugares (contador simulado)");
});
