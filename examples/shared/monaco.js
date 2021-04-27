const selectors = {
  editor: `.monaco-editor`,
  get input() {
    return `${this.editor} textarea.inputarea`;
  },
  get lines() {
    return `${this.editor} .view-line`;
  },
};

const clearInput = async (page, { timeout } = {}) => {
  await page.click(selectors.editor, { timeout });

  await page.press(selectors.input, "Meta+A");
  await page.press(selectors.input, "Backspace");
};

const addInput = (field, text, options) => async (page) => {
  for (let line of text.trim().split("\n")) {
    await page.type(field, line, options);
    // Clear any auto-complete dialogs
    await page.press(field, "Escape");

    await page.press(field, "Enter");

    // Clear any auto-inserted content
    await page.press(field, "Meta+Shift+ArrowLeft");
    await page.press(field, "Delete");
    await page.press(field, "Meta+Shift+ArrowDown");
    await page.press(field, "Delete");

    await page.waitForTimeout(100);
  }
};

module.exports = { selectors, addInput, clearInput };
