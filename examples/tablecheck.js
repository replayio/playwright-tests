// not working for firefox // 

const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo:2000
  });
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  // Go to https://www.tablecheck.com/en/japan
  await page.goto('https://www.tablecheck.com/en/japan');

  // Click [placeholder="Area, cuisine or restaurant"]
  await page.click('[placeholder="Area, cuisine or restaurant"]');

  // Fill [placeholder="Area, cuisine or restaurant"]
  await page.fill('[placeholder="Area, cuisine or restaurant"]', 'japan');
  
  // Click text=Central Japan International Airport Station
  await page.click('text=Central Japan International Airport Station');

  // Click button:has-text("Search")
  await page.click('button:has-text("Search")');

  await page.waitForTimeout(3000);

  await context.close();
  await browser.close();
})();