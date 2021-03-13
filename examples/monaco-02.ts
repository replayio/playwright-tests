import { it, expect } from "@playwright/test";

const editors = [
  "creating-the-editor-hello-world",
  "creating-the-editor-editor-basic-options",
  "creating-the-editor-hard-wrapping",
  "creating-the-editor-syntax-highlighting-for-html-elements",
  "interacting-with-the-editor-adding-a-command-to-an-editor-instance",
  "interacting-with-the-editor-adding-an-action-to-an-editor-instance",
  "interacting-with-the-editor-revealing-a-position",
  "interacting-with-the-editor-rendering-glyphs-in-the-margin",
  "interacting-with-the-editor-line-and-inline-decorations",
  "interacting-with-the-editor-customizing-the-line-numbers",
  "interacting-with-the-editor-listening-to-mouse-events",
  "interacting-with-the-editor-listening-to-key-events",
  "customizing-the-appearence-exposed-colors",
  "customizing-the-appearence-scrollbars",
  "customizing-the-appearence-tokens-and-colors",
  "creating-the-diffeditor-hello-diff-world",
  "creating-the-diffeditor-multi-line-example",
  "creating-the-diffeditor-inline-diff-example",
  "creating-the-diffeditor-navigating-a-diff",
  "extending-language-services-custom-languages",
  "extending-language-services-completion-provider-example",
  "extending-language-services-codelens-provider-example",
  "extending-language-services-color-provider-example",
  "extending-language-services-symbols-provider-example",
  "extending-language-services-folding-provider-example",
  "extending-language-services-hover-provider-example",
  "extending-language-services-semantic-tokens-provider-example",
  "extending-language-services-configure-javascript-defaults",
  "extending-language-services-configure-json-defaults",
];
for (const editor of editors) {
  it(`${editor}`, async ({ page }) => {
    await page.goto(
      "https://microsoft.github.io/monaco-editor/playground.html"
    );

    await page.selectOption(".sample-switcher", editor);
  });
}
