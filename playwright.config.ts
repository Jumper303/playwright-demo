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
  workers: process.env.CI ? "100%" : 2,
  reporter: "html",
  timeout: 30000,
  expect: {
    timeout: 10000,
  },
  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "sauce",
      testDir: "./tests/sauce",
      use: {
        ...devices["Desktop Chrome"],
        testIdAttribute: "data-test",
        // Simplified base URL for demonstration purposes.
        // Real life projects would use a TEST_ENV variable to set the base URL based on the target test environment.
        baseURL: "https://www.saucedemo.com",
      },
    },
    {
      name: "rich-text-editor",
      testDir: "./tests/rich-text-editor",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://onlinehtmleditor.dev",
      },
    },
    {
      name: "demo-guru",
      testDir: "./tests/demo-guru",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://demo.guru99.com/test/guru99home",
      },
    },
    {
      name: "api-testing",
      testDir: "./tests/api-testing",
      use: {
        baseURL: "https://jsonplaceholder.typicode.com",
      },
    },
  ],
});
