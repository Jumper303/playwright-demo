import { test as base } from "@playwright/test";
import { SauceLoginPage } from "../pages/sauce-login-page";

export const test = base.extend<{
  sauceLoginPage: SauceLoginPage;
}>({
  sauceLoginPage: async ({ page }, use) => {
    const sauceLoginPage = new SauceLoginPage(page);
    await use(sauceLoginPage);
  },
});
