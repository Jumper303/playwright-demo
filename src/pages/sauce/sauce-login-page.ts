import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class SauceLoginPage {
  readonly errorMessage: Locator;
  readonly loginButton: Locator;
  readonly productsTitle: Locator;
  private page: Page;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private pageLogo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = this.page.locator("#user-name");
    this.passwordInput = this.page.locator("#password");
    this.loginButton = this.page.getByRole("button", { name: "Login" });
    this.pageLogo = this.page.getByText("Swag Labs");
    this.productsTitle = this.page.locator('[data-test="title"]');
    this.errorMessage = this.page.locator('[data-test="error"]');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await expect(this.pageLogo).toBeVisible();
  }
}
