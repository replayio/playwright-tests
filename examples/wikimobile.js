// not working for firefox //
const {chromium, devices} = require("playwright");
const iphone = devices['iPhone 11 Pro Max'];
(async () => {
    const browser = await chromium.launch({

      headless: false,
      slowMo:1000
      
    });
    const context = await browser.newContext({
        ...iphone,
        permissions:['geolocation'],
        geolocation:{latitude:29.987500, longitude:32.545040}   
    });
    
    
    // Open new page
    const page = await context.newPage();

    // Go to https://www.wikipedia.org/
    await page.goto('https://www.wikipedia.org/');

    // Click input[name="search"]
    await page.click('input[name="search"]');

    // Fill input[name="search"]
    await page.fill('input[name="search"]', 'playwright');

    // Press Enter
    await page.press('input[name="search"]', 'Enter');
    await page.waitForTimeout(3000);
    await context.close();
    await browser.close();
  })();