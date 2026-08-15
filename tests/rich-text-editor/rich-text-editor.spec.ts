import { expect } from "@playwright/test";
import { test } from "@fixtures/rich-text-editor-fixture";

test.describe("Rich Test Editor", () => {
  test("Should be able to successfully format text", async ({ page, richTextEditorPage }) => {
    await page.goto("/");
    await richTextEditorPage.insertText("Automation Test Example");
    await richTextEditorPage.formatTextBold("Automation");
    await expect(richTextEditorPage.boldText("Automation")).toBeVisible();
    await richTextEditorPage.formatTextUnderline("Test");
    await expect(richTextEditorPage.underlineText("Test")).toBeVisible();
  });
});
