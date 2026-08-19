import { test } from "@fixtures/demo-guru-fixture";
import { expect } from "@playwright/test";

test("Verify Demo Guru Home Page Elements", async ({ page, demoGuruPage }) => {
  test.slow();

  await test.step("Navigate to Demo Guru Home Page using the baseUrl", async () => {
    await page.goto("", { waitUntil: "domcontentloaded" });
  });

  await test.step("Open Advertisement Image in New Tab", async () => {
    const newTab = await demoGuruPage.openAdvertisementLinkInNewTab();
    await expect(newTab).toHaveTitle("Selenium Live Project for Practice");
    await newTab.close();
  });

  await test.step("Open Selenium Sub Menu", async () => {
    await demoGuruPage.openSeleniumSubMenu();
    await expect(demoGuruPage.startLearningButton).toBeVisible();
  });
});
