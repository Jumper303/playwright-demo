import { expect } from "@playwright/test";
import { test } from "@fixtures/sauce-fixture";
import credentials from "../resources/credential.json" with { type: "json" };

test.describe("purchase process", () => {
  test("should be able to perform purchase process", async ({
    page,
    sauceLoginPage,
    sauceShoppingCartPage,
  }) => {
    const shoppingCartItems = ["sauce-labs-backpack", "sauce-labs-fleece-jacket"];

    await test.step("navigate to inventory page", async () => {
      await page.goto("/inventory.html");
    });

    await test.step("login", async () => {
      await sauceLoginPage.login(credentials.username, credentials.password);
      await expect(sauceLoginPage.productsTitle).toBeVisible();
    });

    for (const item of shoppingCartItems) {
      await test.step(`add ${item} to cart`, async () => {
        await sauceLoginPage.addToCart(item);
        const shoppingCartBadge = await sauceLoginPage.getShoppingCartBadge();
        expect(shoppingCartBadge).toBe(shoppingCartItems.indexOf(item) + 1);
      });
    }

    await test.step("checkout", async () => {
      await sauceShoppingCartPage.shoppingCartLink.click();
      await sauceShoppingCartPage.checkoutButton.click();
    });
  });
});
