import { test as base } from "@playwright/test";
import { DemoGuruPage } from "../pages/demo-guru/demo-guru-page";

export const test = base.extend<{
  demoGuruPage: DemoGuruPage;
}>({
  demoGuruPage: async ({ page }, use) => {
    const demoGuruPage = new DemoGuruPage(page);
    await use(demoGuruPage);
  },
});
