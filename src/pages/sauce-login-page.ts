import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class SauceLoginPage {
  private page: Page;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private pageLogo: Locator;
  readonly productsTitle: Locator;
  private shoppingCartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = this.page.locator("#user-name");
    this.passwordInput = this.page.locator("#password");
    this.loginButton = this.page.getByRole("button", { name: "Login" });
    this.pageLogo = this.page.getByText("Swag Labs");
    this.productsTitle = this.page.locator('[data-test="title"]');
    this.shoppingCartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await expect(this.pageLogo).toBeVisible();
  }

  async addToCart(productName: string) {
    const addToCartButton = this.page.locator(`[data-test='add-to-cart-${productName}']`);
    await addToCartButton.click();
  }

  async getShoppingCartBadge() {
    return parseInt((await this.shoppingCartBadge.textContent()) || "0");
  }
}
