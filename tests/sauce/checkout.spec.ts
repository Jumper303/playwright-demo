import { expect } from "@playwright/test";
import { test } from "#fixtures/sauce-fixture.js";
import credentials from "../resources/credential.json" with { type: "json" };

test("checkout", async ({ page, sauceLoginPage }) => {
  const pageLogo = page.getByText("Swag Labs");
  await page.goto("/inventory.html");
  await expect(pageLogo).toBeVisible();
  await sauceLoginPage.login(credentials.username, credentials.password);
  await sauceLoginPage.verifyPageLoaded();
});
