import type { Locator, Page } from "@playwright/test";

export class SauceLoginPage {
  readonly errorMessage: Locator;
  readonly loginButton: Locator;
  readonly productsTitle: Locator;
  private page: Page;
  private usernameInput: Locator;
  private passwordInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = this.page.getByPlaceholder("Username");
    this.passwordInput = this.page.getByPlaceholder("Password");
    this.loginButton = this.page.getByRole("button", { name: "Login" });
    this.productsTitle = this.page.getByTestId("title");
    this.errorMessage = this.page.getByTestId("error");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
