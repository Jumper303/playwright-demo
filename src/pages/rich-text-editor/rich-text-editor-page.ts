import type { Page, Locator } from "@playwright/test";

export class RichTextEditorPage {
  private page: Page;
  readonly richTextEditor: Locator;
  private boldButton: Locator;
  private underlineButton: Locator;
  private allowCookiesButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.richTextEditor = this.page
      .getByRole("textbox", { name: "Rich Text Editor. Editing" })
      .getByRole("paragraph");
    this.boldButton = this.page.getByRole("button", { name: "Bold" });
    this.underlineButton = this.page.getByRole("button", { name: "Underline" });
    this.allowCookiesButton = this.page.getByRole("button", { name: "Allow all cookies" });
  }

  async allowCookies() {
    await this.allowCookiesButton.click();
  }

  async insertText(text: string) {
    await this.richTextEditor.fill(text);
  }

  async formatText(text: string, format: string) {
    await this.richTextEditor.click();
    await this.selectTextByTextContent(text);
    switch (format) {
      case "bold":
        await this.boldButton.click();
        break;
      case "underline":
        await this.underlineButton.click();
        break;
    }
  }

  findFormattedText(text: string, format: string): Locator {
    switch (format) {
      case "bold":
        return this.richTextEditor.locator("strong", { hasText: text });
      case "underline":
        return this.richTextEditor.locator("u", { hasText: text });
      default:
        throw new Error(`Unsupported text format: ${format}`);
    }
  }

  async selectTextByTextContent(searchText: string) {
    await this.richTextEditor.evaluate((element, text) => {
      const doc = element.ownerDocument;
      const selection = doc.defaultView?.getSelection();
      const range = doc.createRange();

      for (let i = 0; i < element.childNodes.length; i++) {
        const child = element.childNodes.item(i);
        if (!child) {
          continue;
        }

        const content = child.textContent;
        // process only text nodes
        if (child.nodeType !== 3 || content == null) {
          continue;
        }

        const start = content.indexOf(text);
        if (start < 0) {
          throw new Error(`Text ${text} not found in content ${content}`);
        }

        range.setStart(child, start);
        range.setEnd(child, start + text.length);
        selection?.removeAllRanges();
        selection?.addRange(range);
        return;
      }
    }, searchText);
  }
}
