import type { Locator, Page } from "@playwright/test";

export class SauceCheckoutInfoPage {
  private page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completedTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = this.page.getByPlaceholder("First Name");
    this.lastNameInput = this.page.getByPlaceholder("Last Name");
    this.postalCodeInput = this.page.getByPlaceholder("Zip/Postal Code");
    this.continueButton = this.page.getByRole("button", { name: "Continue" });
    this.finishButton = this.page.getByRole("button", { name: "Finish" });
    this.completedTitle = this.page.getByTestId("complete-header");
  }

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }
}
