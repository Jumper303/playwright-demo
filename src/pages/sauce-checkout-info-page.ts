import type { Locator, Page } from "@playwright/test";
export class SauceCheckoutInfoPage {
  private page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = this.page.getByPlaceholder("First Name");
    this.lastNameInput = this.page.getByPlaceholder("Last Name");
    this.postalCodeInput = this.page.getByPlaceholder("Zip/Postal Code");
    this.continueButton = this.page.getByRole("button", { name: "Continue" });
  }
}
