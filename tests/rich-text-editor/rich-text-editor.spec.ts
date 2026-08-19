import { expect } from "@playwright/test";
import { test } from "@fixtures/rich-text-editor-fixture";

test.describe("Rich Test Editor", () => {
  test(
    "Should be able to successfully format text",
    { tag: "@rich-text-editor" },
    async ({ page, richTextEditorPage }) => {
      await test.step("Navigate to Rich Text Editor Page by using the baseUrl", async () => {
        await page.goto("");
      });

      await test.step("Allow cookies", async () => {
        await richTextEditorPage.allowCookies();
      });

      await test.step("Insert text", async () => {
        await richTextEditorPage.insertText("Automation Test Example");
        await expect(richTextEditorPage.richTextEditor).toHaveText("Automation Test Example");
      });

      await test.step("Format text as bold", async () => {
        const boldFormat = "bold";
        await richTextEditorPage.formatText("Automation", boldFormat);
        await expect(richTextEditorPage.findFormattedText("Automation", boldFormat)).toBeVisible();
      });

      await test.step("Format text as underline", async () => {
        const underlineFormat = "underline";
        await richTextEditorPage.formatText("Test", underlineFormat);
        await expect(richTextEditorPage.findFormattedText("Test", underlineFormat)).toBeVisible();
      });
    },
  );
});
