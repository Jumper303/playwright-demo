import { expect } from "@playwright/test";
import { test } from "@fixtures/sauce-fixture";
import credentials from "../resources/credential.json" with { type: "json" };

test("checkout", async ({ page, sauceLoginPage }) => {
  await page.goto("/inventory.html");
  await sauceLoginPage.login(credentials.username, credentials.password);
  await expect(sauceLoginPage.productsTitle).toBeVisible();
});
