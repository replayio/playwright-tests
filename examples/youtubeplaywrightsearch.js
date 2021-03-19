const { firefox } = require('playwright');
(async () => {
  const browser = await firefox.launch({
    headless: false
  });
  const context = await browser.newContext();
  // Open new page
  const page = await context.newPage();

  // Go to https://www.youtube.com/
  await page.goto('https://www.youtube.com/');
  
  // Click [placeholder="Search"]
  await page.click('[placeholder="Search"]');

  // Fill [placeholder="Search"]
  await page.fill('[placeholder="Search"]', 'playwright');

  // Press Enter
  await page.press('[placeholder="Search"]', 'Enter');

  // assert.equal(page.url(), 'https://www.youtube.com/results?search_query=playwright');
  // Click text=Introduction to web Automation testing with Playwright
  await page.click('text=Introduction to web Automation testing with Playwright');

  // assert.equal(page.url(), 'https://www.youtube.com/watch?v=2_BPIA5RgXU');
  // Click .ytp-fullscreen-button
  await page.click('.ytp-fullscreen-button');

  // Click video
  await page.click('video');

  // issue faced here is skip video is not working

  
  await context.close();
  await browser.close();
})();