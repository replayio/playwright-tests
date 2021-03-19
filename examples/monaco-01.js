const { firefox } = require('playwright');
(async () => {
  const browser = await firefox.launch({
    headless: false
  });
  const context = await browser.newContext();
  // Open new page
  const page = await context.newPage();
  // Go to https://microsoft.github.io/monaco-editor/playground.html
  await page.goto('https://microsoft.github.io/monaco-editor/playground.html');

  // Select creating-the-editor-editor-basic-options
  await page.selectOption('select', 'creating-the-editor-editor-basic-options');

  // assert.equal(page.url(), 'https://microsoft.github.io/monaco-editor/playground.html#creating-the-editor-editor-basic-options');
  // Select creating-the-editor-hard-wrapping
  await page.waitForTimeout(1000);
  await page.selectOption('select', 'creating-the-editor-hard-wrapping');

  // assert.equal(page.url(), 'https://microsoft.github.io/monaco-editor/playground.html#creating-the-editor-hard-wrapping');
  // Select creating-the-editor-syntax-highlighting-for-html-elements
  await page.waitForTimeout(1000);
  await page.selectOption('select', 'creating-the-editor-syntax-highlighting-for-html-elements');

  // assert.equal(page.url(), 'https://microsoft.github.io/monaco-editor/playground.html#creating-the-editor-syntax-highlighting-for-html-elements');
  // Select creating-the-editor-hello-world
  await page.waitForTimeout(1000);

  await page.selectOption('select', 'creating-the-editor-hello-world');

  // assert.equal(page.url(), 'https://microsoft.github.io/monaco-editor/playground.html#creating-the-editor-hello-world');
  // Click text=CSS
  await page.waitForTimeout(1000);
  await page.click('text=CSS');

  // Click span:has-text("HTML")
  await page.waitForTimeout(1000);
  await page.click('span:has-text("HTML")');
  // Click text=Run
  await page.click('text=Run');


  await page.waitForTimeout(2000);
  // ---------------------
  await context.close();
  await browser.close();
})();