import { expect, test } from "@playwright/test";

test("checkout", async ({ page }) => {
  const pageLogo = page.getByText("Swag Labs");
  await page.goto("/inventory.html");
  await expect(pageLogo).toBeVisible();
});
