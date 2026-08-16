import type { Locator, Page } from "@playwright/test";

export class SauceShoppingCartPage {
  readonly shoppingCartLink: Locator;
  readonly checkoutButton: Locator;
  readonly footerMessages: Locator;
  private page: Page;
  private shoppingCartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = this.page.getByRole("button", { name: "Checkout" });
    this.shoppingCartLink = this.page.locator('[data-test="shopping-cart-link"]');
    this.shoppingCartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
    this.footerMessages = this.page.locator('[data-test="footer"]');
  }
  async getShoppingCartBadge() {
    return parseInt((await this.shoppingCartBadge.textContent()) || "0");
  }

  async addToCart(productName: string) {
    const addToCartButton = this.page.locator(`[data-test='add-to-cart-${productName}']`);
    await addToCartButton.click();
  }
}
