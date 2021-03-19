const { firefox } = require('playwright');
(async () => {
  const browser = await firefox.launch({
    headless: false,
    slowMo:1000
  });
  const context = await browser.newContext();
  // Open new page
  const page = await context.newPage();
  // Go to https://bandstand.co.uk/
  await page.goto('https://bandstand.co.uk/');
  // Click body
  await page.click('body');
  // Click text=Make your mark
  await page.click('text=Make your mark');
  // assert.equal(page.url(), 'https://bandstand.co.uk/work/myo/');
  // Click button
  await page.click('button');
  // Click text=What we do
  await page.click('text=What we do');
  // assert.equal(page.url(), 'https://bandstand.co.uk/about/');
  // Click img[alt="Cluck"]
  await page.click('img[alt="Cluck"]');
  // assert.equal(page.url(), 'https://bandstand.co.uk/work/cluck/');
  // Click text=Joy in every moment
  await page.click('text=Joy in every moment');

  await page.waitForTimeout(2000);
  // assert.equal(page.url(), 'https://bandstand.co.uk/work/intu-hero-brochure/');
  // ---------------------
  await page.close();
  await context.close();
  await browser.close();
})();