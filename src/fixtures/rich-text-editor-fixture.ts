import { test as base } from "@playwright/test";
import { RichTextEditorPage } from "../pages/rich-text-editor-page";
export const test = base.extend<{
  richTextEditorPage: RichTextEditorPage;
}>({
  richTextEditorPage: async ({ page }, use) => {
    const richTextEditorPage = new RichTextEditorPage(page);
    await use(richTextEditorPage);
  },
});
