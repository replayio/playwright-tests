const { firefox } = require('playwright');
(async () => {
  const browser = await firefox.launch({
    headless: false
  });
  const context = await browser.newContext();
  // Open new page
  const page = await context.newPage();
  // Go to https://www.samsung.com/pk/
  await page.goto('https://www.samsung.com/pk/');
  // Click text=Search Cart Number of Products : 0 Log-In Log-In/Sign-Up Open My Menu My Account >> a[role="button"]
  await page.click('text=Search Cart Number of Products : 0 Log-In Log-In/Sign-Up Open My Menu My Account >> a[role="button"]');
  // Click input[name="search"]
  await page.click('input[name="search"]');
  // Fill input[name="search"]
  await page.fill('input[name="search"]', 'galaxys21');
  // Press Enter
  await page.press('input[name="search"]', 'Enter');
  // assert.equal(page.url(), 'https://www.samsung.com/pk/search/?searchvalue=galaxys21');
  // Click text=Galaxy S21 Ultra 5G Product Summary Specification Product Price () : ₨. 229,999. >> a
  await page.click('text=Galaxy S21 Ultra 5G Product Summary Specification Product Price () : ₨. 229,999. >> a');
  // assert.equal(page.url(), 'https://www.samsung.com/pk/smartphones/galaxy-s21-ultra-5g/');
  await page.waitForTimeout(2000);
  // ---------------------
  await context.close();
  await browser.close();
})();