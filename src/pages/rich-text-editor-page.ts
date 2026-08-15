import type { Page, Locator } from "@playwright/test";

/** Structural browser types — DOM globals are unresolved inside Playwright evaluate(). */
type BrowserRange = {
  setStart: (node: BrowserTextNode, offset: number) => void;
  setEnd: (node: BrowserTextNode, offset: number) => void;
};

type BrowserTextNode = {
  textContent: string | null;
};

type BrowserSelection = {
  removeAllRanges: () => void;
  addRange: (range: BrowserRange) => void;
};

type BrowserDocument = {
  defaultView: { getSelection: () => BrowserSelection | null } | null;
  createTreeWalker: (
    root: BrowserElement,
    whatToShow: number,
  ) => { nextNode: () => BrowserTextNode | null };
  createRange: () => BrowserRange;
};

type BrowserElement = {
  ownerDocument: BrowserDocument;
};

export class RichTextEditorPage {
  private page: Page;
  private richTextEditor: Locator;
  private boldButton: Locator;
  private underlineButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.richTextEditor = this.page
      .getByRole("presentation")
      .getByLabel("Rich Text Editor. Editing area: main. Press Alt+0 for help.");
    this.boldButton = this.page.getByRole("button", { name: "Bold" });
    this.underlineButton = this.page.getByRole("button", { name: "Underline" });
  }

  async insertText(text: string) {
    await this.richTextEditor.fill(text);
  }

  async formatTextBold(text: string) {
    await this.richTextEditor.focus();
    await this.selectText(text);
    await this.boldButton.click();
  }

  async formatTextUnderline(text: string) {
    await this.richTextEditor.focus();
    await this.selectText(text);
    await this.underlineButton.click();
  }

  boldText(text: string): Locator {
    return this.richTextEditor.locator("strong", { hasText: text });
  }

  underlineText(text: string): Locator {
    return this.richTextEditor.locator("u", { hasText: text });
  }

  private async selectText(searchText: string) {
    await this.richTextEditor.evaluate((element, text) => {
      const editor = element as unknown as BrowserElement;
      const document = editor.ownerDocument;
      const selection = document.defaultView?.getSelection();

      if (!selection) {
        throw new Error("The editor's window exposes no selection.");
      }

      // Range offsets count characters only inside text nodes; on element nodes
      // they count child nodes, so the match has to be resolved to a text node.
      // NodeFilter.SHOW_TEXT === 4 (inlined: evaluate cannot close over outer vars)
      const walker = document.createTreeWalker(editor, 4);

      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        const start = node.textContent?.indexOf(text) ?? -1;
        if (start < 0) {
          continue;
        }

        const range = document.createRange();
        range.setStart(node, start);
        range.setEnd(node, start + text.length);
        selection.removeAllRanges();
        selection.addRange(range);
        return;
      }

      throw new Error(`No text node of the editor contains "${text}".`);
    }, searchText);
  }
}
