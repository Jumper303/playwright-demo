import { expect, type Locator, type Page } from "@playwright/test";

export class SauceShoppingCartPage {
  readonly shoppingCartLink: Locator;
  readonly checkoutButton: Locator;
  readonly footerMessages: Locator;
  private page: Page;
  private shoppingCartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = this.page.getByRole("button", { name: "Checkout" });
    this.shoppingCartLink = this.page.getByTestId("shopping-cart-link");
    this.shoppingCartBadge = this.page.getByTestId("shopping-cart-badge");
    this.footerMessages = this.page.getByTestId("footer-copy");
  }
  async getShoppingCartBadge() {
    await expect(this.shoppingCartBadge).toBeVisible();
    return parseInt((await this.shoppingCartBadge.textContent()) || "0");
  }

  async addToCart(productName: string) {
    const addToCartButton = this.page.getByTestId(`add-to-cart-${productName}`);
    await addToCartButton.click();
  }
}
