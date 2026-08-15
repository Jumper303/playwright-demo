import { test as base } from "@playwright/test";
import { SauceLoginPage } from "../pages/sauce-login-page";
import { SauceShoppingCartPage } from "../pages/sauce-shopping-cart-page";

export const test = base.extend<{
  sauceLoginPage: SauceLoginPage;
  sauceShoppingCartPage: SauceShoppingCartPage;
}>({
  sauceLoginPage: async ({ page }, use) => {
    const sauceLoginPage = new SauceLoginPage(page);
    await use(sauceLoginPage);
  },
  sauceShoppingCartPage: async ({ page }, use) => {
    const sauceShoppingCartPage = new SauceShoppingCartPage(page);
    await use(sauceShoppingCartPage);
  },
});
