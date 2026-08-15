import { expect } from "@playwright/test";
import { test } from "@fixtures/sauce-fixture";
import credentials from "../resources/credential.json" with { type: "json" };

test.describe("purchase process", () => {
  test("should be able to perform purchase process", async ({
    page,
    sauceLoginPage,
    sauceShoppingCartPage,
    sauceCheckoutInfoPage,
  }) => {
    const shoppingCartItems = ["sauce-labs-backpack", "sauce-labs-fleece-jacket"];
    const checkoutInfoData = {
      firstName: "John",
      lastName: "Doe",
      postalCode: "12345",
    };

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

    await test.step("start checkout process", async () => {
      await sauceShoppingCartPage.shoppingCartLink.click();
      await sauceShoppingCartPage.checkoutButton.click();
    });

    await test.step("fill checkout info", async () => {
      await sauceCheckoutInfoPage.fillCheckoutInfo(
        checkoutInfoData.firstName,
        checkoutInfoData.lastName,
        checkoutInfoData.postalCode,
      );
      await sauceCheckoutInfoPage.continueButton.click();
    });

    await test.step("finish checkout process", async () => {
      await sauceCheckoutInfoPage.finishButton.click();
      await expect(sauceCheckoutInfoPage.completedTitle).toHaveText("Thank you for your order!");
    });
  });
});
