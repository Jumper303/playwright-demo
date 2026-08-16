import { expect } from "@playwright/test";
import { test } from "@fixtures/sauce-fixture";
import credentials from "../resources/credential.json" with { type: "json" };
import standardCredentials from "../resources/standard-credentials.json" with { type: "json" };

test.describe("Purchase process", () => {
  test.beforeEach(async ({ page }) => {
    await test.step("navigate to inventory page using base URL", async () => {
      await page.goto("", { waitUntil: "domcontentloaded" });
    });
  });

  test("Should be able to successfully perform purchase process", async ({
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

    await test.step("login", async () => {
      await sauceLoginPage.login(credentials.username, credentials.password);
      await expect(sauceLoginPage.productsTitle).toBeVisible();
    });

    for (const item of shoppingCartItems) {
      await test.step(`add ${item} to cart`, async () => {
        await sauceShoppingCartPage.addToCart(item);
        const shoppingCartBadge = await sauceShoppingCartPage.getShoppingCartBadge();
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

  test("Verify error messages for mandatory fields", async ({
    sauceLoginPage,
    sauceShoppingCartPage,
  }) => {
    await test.step("login with empty credentials", async () => {
      await sauceLoginPage.loginButton.click();
      await expect(sauceLoginPage.errorMessage).toHaveText("Epic sadface: Username is required");
    });

    await test.step("login with standard credentials", async () => {
      await sauceLoginPage.login(standardCredentials.username, standardCredentials.password);
    });

    await test.step("verify footer messages", async () => {
      await sauceShoppingCartPage.footerMessages.scrollIntoViewIfNeeded();
      await expect(sauceShoppingCartPage.footerMessages).toContainText("2026");
      await expect(sauceShoppingCartPage.footerMessages).toContainText("Terms of Service");
    });
  });
});
