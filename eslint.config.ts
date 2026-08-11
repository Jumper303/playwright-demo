import js from "@eslint/js";
import tseslint from "typescript-eslint";
import playwright from "eslint-plugin-playwright";
import prettier from "eslint-config-prettier/flat";

export default tseslint.config(
  {
    ignores: [
      "node_modules/",
      "test-results/",
      "playwright-report/",
      "blob-report/",
      "playwright/.cache/",
      "playwright/.auth/",
      "dist/",
    ],
  },
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  {
    /* Playwright rules only for the test suite. */
    files: ["tests/**/*.ts"],
    ...playwright.configs["flat/recommended"],
  },
  {
    files: ["tests/**/*.ts"],
    rules: {
      ...playwright.configs["flat/recommended"].rules,
      /* Fail the review, not the run, on skipped/focused tests. */
      "playwright/no-skipped-test": "warn",
    },
  },
  /* Keep last: disables stylistic rules that Prettier owns. */
  prettier,
);
