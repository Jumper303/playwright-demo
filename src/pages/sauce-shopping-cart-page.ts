import type { Locator, Page } from "@playwright/test";

export class SauceShoppingCartPage {
  private page: Page;
  readonly shoppingCartLink: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = this.page.getByRole("button", { name: "Checkout" });
    this.shoppingCartLink = this.page.locator('[data-test="shopping-cart-link"]');
  }
}
