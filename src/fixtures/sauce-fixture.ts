import { test as base } from "@playwright/test";
import { SauceLoginPage } from "../pages/sauce/sauce-login-page";
import { SauceShoppingCartPage } from "../pages/sauce/sauce-shopping-cart-page";
import { SauceCheckoutInfoPage } from "../pages/sauce/sauce-checkout-info-page";

export const test = base.extend<{
  sauceLoginPage: SauceLoginPage;
  sauceShoppingCartPage: SauceShoppingCartPage;
  sauceCheckoutInfoPage: SauceCheckoutInfoPage;
}>({
  sauceLoginPage: async ({ page }, use) => {
    const sauceLoginPage = new SauceLoginPage(page);
    await use(sauceLoginPage);
  },
  sauceShoppingCartPage: async ({ page }, use) => {
    const sauceShoppingCartPage = new SauceShoppingCartPage(page);
    await use(sauceShoppingCartPage);
  },
  sauceCheckoutInfoPage: async ({ page }, use) => {
    const sauceCheckoutInfoPage = new SauceCheckoutInfoPage(page);
    await use(sauceCheckoutInfoPage);
  },
});
