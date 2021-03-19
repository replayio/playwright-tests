const { firefox } = require('playwright');
(async () => {
  const browser = await firefox.launch({
    headless: false
  });
  const context = await browser.newContext();
  // Open new page
  const page = await context.newPage();
  // Go to https://www.ferrari.com/en-EN
  await page.goto('https://www.ferrari.com/en-EN');
  // Click #onetrust-consent-sdk div
  await page.click('#onetrust-consent-sdk div');
  // Click #onetrust-close-btn-container [aria-label="Close"]
  await page.click('#onetrust-close-btn-container [aria-label="Close"]');
  // Click text=Menu
  await page.click('text=Menu');
  // Click text=Auto
  await page.click('text=Auto');
  // Click text=812 Superfast
  await page.click('text=812 Superfast');
  // assert.equal(page.url(), 'https://www.ferrari.com/en-EN/auto/812-superfast');
  // Go to https://www.ferrari.com/en-EN/auto/812-superfast
  await page.goto('https://www.ferrari.com/en-EN/auto/812-superfast');
  // Click img[alt="Logo"]

  
  // error here that read more is down//
  await page.click('img[alt="Logo"]');
  // Click button:has-text("Read more")

  await page.click('button:has-text("Read more")');
  // Click button:has-text("scroll")
  await page.click('button:has-text("scroll")');
  // Click text=ShareWlpt: test for CO₂ emissions and fuel consumptionIn order to be placed on t >> :nth-match(button, 3)
  await page.click('text=ShareWlpt: test for CO₂ emissions and fuel consumptionIn order to be placed on t >> :nth-match(button, 3)');
  // Click text=ShareWlpt: test for CO₂ emissions and fuel consumptionIn order to be placed on t >> :nth-match(button, 3)
  await page.click('text=ShareWlpt: test for CO₂ emissions and fuel consumptionIn order to be placed on t >> :nth-match(button, 3)');
  // ---------------------
  await context.close();
  await browser.close();
})();