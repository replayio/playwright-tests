const selectors = {
  editor: `.monaco-editor`,
  get input() {
    return `${this.editor} textarea.inputarea`;
  },
  get lines() {
    return `${this.editor} .view-line`;
  },
};

const clearInput = async (page) => {
  await page.click(selectors.editor);

  await page.press(selectors.input, "Meta+A");
  await page.press(selectors.input, "Backspace");
};

module.exports = { selectors, clearInput };
