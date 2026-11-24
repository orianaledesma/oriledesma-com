import { expect, test } from "@playwright/test";

test("keeps library filters in the URL", async ({ page }) => {
  await page.goto("/aprende");
  await expect(page.getByText("7 piezas")).toBeVisible();

  await page.getByRole("button", { name: "Solo casos con números" }).click();
  await expect(page).toHaveURL(/\?numeros=si$/);
  await expect(page.getByText("1 pieza", { exact: true })).toBeVisible();

  await page.reload();
  await expect(page.getByText("1 pieza", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Solo casos con números" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});
