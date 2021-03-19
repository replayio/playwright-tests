const { firefox } = require('playwright');
(async () => {
  const browser = await firefox.launch({
    headless: false
  });
  const context = await browser.newContext();
  // Open new page
  const page = await context.newPage();

  // Go to https://www.nokia.com/phones/en_us/smartphones
  await page.goto('https://www.nokia.com/phones/en_us/smartphones');

  // Click footer >> text=Accessories
  await page.click('footer >> text=Accessories');

  // assert.equal(page.url(), 'https://www.nokia.com/phones/en_us/accessories');
  // Click div:nth-child(5) .css-uik519-ProductAnchor .col picture .css-1bvms8u-Img
  await page.click('div:nth-child(5) .css-uik519-ProductAnchor .col picture .css-1bvms8u-Img');

  // assert.equal(page.url(), 'https://www.nokia.com/phones/en_us/nokia-fast-car-charger');
  // Click button:has-text("Add to shopping bag")
  await page.click('button:has-text("Add to shopping bag")');

  // Click button:has-text("Go to shopping bag")
  await page.click('button:has-text("Go to shopping bag")');

  // assert.equal(page.url(), 'https://www.nokia.com/phones/en_us/cart');
  // Go to https://www.nokia.com/phones/en_us/cart?
  await page.goto('https://www.nokia.com/phones/en_us/cart?');

  // Click button:has-text("Continue as guest")
  //await page.click('button:has-text("Continue as guest")');
  await page.click('button:has-text("Take me Shopping")');
  
  // ---------------------
  await context.close();
  await browser.close();
})();