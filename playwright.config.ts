import { defineConfig, devices } from "@playwright/test";
import { envConfig } from "./src/env_config";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  ...(process.env.CI ? { workers: 1 } : {}),
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  workers: 2,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "sauce",
      testDir: "./tests/sauce",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: envConfig().PURCHASE_BASE_URL,
      },
    },
    {
      name: "rich-text-editor",
      testDir: "./tests/rich-text-editor",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: envConfig().ONLINE_HTML_EDITOR_BASE_URL,
      },
    },
  ],
});
