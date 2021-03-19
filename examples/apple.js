const { firefox } = require('playwright');
(async () => {
  const browser = await firefox.launch({
    headless: false,
    slowMo:1000

  });
  const context = await browser.newContext();
  // Open new page
  const page = await context.newPage();

  // Go to https://www.apple.com/
  await page.goto('https://www.apple.com/');

  // Click a:has-text("Mac")
  await page.click('a:has-text("Mac")');

  // assert.equal(page.url(), 'https://www.apple.com/mac/');
  // Click text=MacBook Pro 16”
  await page.click('text=MacBook Pro 16”');

  // assert.equal(page.url(), 'https://www.apple.com/macbook-pro-16/');
  // Click text=Apple Mac iPad iPhone Watch TV Music Support Shopping Bag + >> [aria-label="Search apple.com"]
  await page.click('text=Apple Mac iPad iPhone Watch TV Music Support Shopping Bag + >> [aria-label="Search apple.com"]');
  
  // Click text=COVID-19 Information
  await page.click('text=COVID-19 Information');
  
  // assert.equal(page.url(), 'https://covid19.apple.com/screening/');
  // Go to https://covid19.apple.com/screening/
  await page.goto('https://covid19.apple.com/screening/');

  await page.waitForTimeout(1000);
  // ---------------------//
  await context.close();
  await browser.close();
})();