import { defineConfig, devices } from "@playwright/test";

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
    trace: "on",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "sauce",
      testDir: "./tests/sauce",
      use: {
        ...devices["Desktop Chrome"],
        // Simplified base URL for demonstration purposes.
        // Real life projects would use a TEST_ENV variable to set the base URL based on the target test environment.
        baseURL: "https://www.saucedemo.com/",
      },
    },
    {
      name: "rich-text-editor",
      testDir: "./tests/rich-text-editor",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://onlinehtmleditor.dev/",
      },
    },
  ],
});
