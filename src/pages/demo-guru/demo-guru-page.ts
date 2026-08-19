import type { Locator, Page } from "@playwright/test";

export class DemoGuruPage {
  private page: Page;
  private advertisementLink: Locator;
  private topMenu: Locator;
  public readonly testingSubMenu: Locator;
  public readonly startLearningButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.advertisementLink = this.page
      .locator('iframe[name="a077aa5e"]')
      .contentFrame()
      .getByRole("link");
    this.topMenu = this.page.locator(".menu-block");
    this.testingSubMenu = this.topMenu.getByRole("link", { name: "Testing " });
    this.startLearningButton = this.page.getByRole("link", { name: "Start Learning" });
  }

  async openAdvertisementLinkInNewTab(): Promise<Page> {
    const newTab = this.page.context().waitForEvent("page");

    await this.advertisementLink.click();
    return newTab;
  }

  async openSeleniumSubMenu(): Promise<void> {
    await this.testingSubMenu.hover();
    const seleniumSubMenu = this.topMenu
      .getByRole("list")
      .getByRole("listitem")
      .getByRole("link", { name: " Selenium ", exact: true });
    await seleniumSubMenu.click();
  }
}
