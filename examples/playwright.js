const { firefox } = require('playwright');
(async () => {
  const browser = await firefox.launch({
    headless: false,
    slowMo:1000
  });
  const context = await browser.newContext();
  // Open new page
  const page = await context.newPage();
  // Go to https://playwright.dev/
  await page.goto('https://playwright.dev/');
  // Click [placeholder="Search"]
  await page.click('[placeholder="Search"]');
  // Fill [placeholder="Search"]
  await page.fill('[placeholder="Search"]', 'func');
  // Click text=worker.evaluateHandle(pageFunction[, arg])
  await page.click('text=worker.evaluateHandle(pageFunction[, arg])');
  // assert.equal(page.url(), 'https://playwright.dev/docs/api/class-worker?_highlight=func#workerevaluatehandlepagefunction-arg');
  // Click text=Classes
  await page.click('text=Classes');
  // Click text=Experimental
  await page.click('text=Experimental');
  // Click text=Classes
  await page.click('text=Classes');
  // Click text=Accessibility
  await page.click('text=Accessibility');
  // assert.equal(page.url(), 'https://playwright.dev/docs/api/class-accessibility');
  // Click text=Browser
  await page.click('text=Browser');
  // assert.equal(page.url(), 'https://playwright.dev/docs/api/class-browser');
  // Click text=BrowserContext
  await page.click('text=BrowserContext');
  // assert.equal(page.url(), 'https://playwright.dev/docs/api/class-browsercontext');
  // Click text=BrowserServer
  await page.click('text=BrowserServer');
  // assert.equal(page.url(), 'https://playwright.dev/docs/api/class-browserserver');
  // Click text=BrowserType
  await page.click('text=BrowserType');
  // assert.equal(page.url(), 'https://playwright.dev/docs/api/class-browsertype');
  // Click text=CDPSession
  await page.click('text=CDPSession');
  // assert.equal(page.url(), 'https://playwright.dev/docs/api/class-cdpsession');
  // Click text=ChromiumBrowser
  await page.click('text=ChromiumBrowser');
  // assert.equal(page.url(), 'https://playwright.dev/docs/api/class-chromiumbrowser');
  // Click text=ChromiumBrowserContext
  await page.click('text=ChromiumBrowserContext');
  // assert.equal(page.url(), 'https://playwright.dev/docs/api/class-chromiumbrowsercontext');
  // Click text=ChromiumCoverage
  await page.click('text=ChromiumCoverage');
  // assert.equal(page.url(), 'https://playwright.dev/docs/api/class-chromiumcoverage');
  // Click text=ConsoleMessage
  await page.click('text=ConsoleMessage');
  // assert.equal(page.url(), 'https://playwright.dev/docs/api/class-consolemessage');
  // Click text=Dialog
  await page.click('text=Dialog');
  // assert.equal(page.url(), 'https://playwright.dev/docs/api/class-dialog');
  // Click text=Download
  await page.click('text=Download');
  // assert.equal(page.url(), 'https://playwright.dev/docs/api/class-download');
  // Click :nth-match(:text("download.delete()"), 3)
  await page.click(':nth-match(:text("download.delete()"), 3)');
  // assert.equal(page.url(), 'https://playwright.dev/docs/api/class-download#downloaddelete');
  // Click :nth-match(:text("download.failure()"), 3)
  await page.click(':nth-match(:text("download.failure()"), 3)');
  // assert.equal(page.url(), 'https://playwright.dev/docs/api/class-download#downloadfailure');
  // Click :nth-match(:text("download.path()"), 4)
  await page.click(':nth-match(:text("download.path()"), 4)');
  // assert.equal(page.url(), 'https://playwright.dev/docs/api/class-download#downloadpath');
  // Click :nth-match(:text("download.saveAs(path)"), 3)
  await page.click(':nth-match(:text("download.saveAs(path)"), 3)');
  // assert.equal(page.url(), 'https://playwright.dev/docs/api/class-download#downloadsaveaspath');
  // Click :nth-match(:text("download.suggestedFilename()"), 3)
  await page.click(':nth-match(:text("download.suggestedFilename()"), 3)');
  // assert.equal(page.url(), 'https://playwright.dev/docs/api/class-download#downloadsuggestedfilename');
  // Click :nth-match(:text("download.url()"), 3)
  await page.click(':nth-match(:text("download.url()"), 3)');
  // assert.equal(page.url(), 'https://playwright.dev/docs/api/class-download#downloadurl');
  // ---------------------
  await context.close();
  await browser.close();
})();