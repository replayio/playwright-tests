const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  // Go to https://www.huawei.com/en/
  await page.goto('https://www.huawei.com/en/');

  // Click text=This site uses cookies. By continuing to browse the site you are agreeing to our >> :nth-match(a, 2)
  await page.click('text=This site uses cookies. By continuing to browse the site you are agreeing to our >> :nth-match(a, 2)');

  // Click text=Consumer Products
  await page.click('text=Consumer Products');

  // Click text=Phones Laptops Tablets Wearables Audio Routers EMUI Accessories All Products >> span
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.click('text=Phones Laptops Tablets Wearables Audio Routers EMUI Accessories All Products >> span')
  ]);

  // 0× click
  await page1.click('text=HUAWEI Mate 40 Pro Leap Further Ahead Enjoy cutting-edge shooting features, resp');

  // Click text=HUAWEI Mate 40 Pro Leap Further Ahead Enjoy cutting-edge shooting features, resp >> a
  await page1.click('text=HUAWEI Mate 40 Pro Leap Further Ahead Enjoy cutting-edge shooting features, resp >> a');

  // assert.equal(page1.url(), 'https://consumer.huawei.com/en/phones/mate40-pro/');
  // Click text=Specifications
  await page1.click('text=Specifications');

  // assert.equal(page1.url(), 'https://consumer.huawei.com/en/phones/mate40-pro/specs/');
  // Click div[role="main"] >> text=HUAWEI Mate 40 Pro
  await page1.click('div[role="main"] >> text=HUAWEI Mate 40 Pro');

  // Press PageDown
  const pagedown=await page1.press('text=HUAWEI Mate 40 Pro Specification We use cookies to improve our site and your exp', 'PageDown');
  // Press PageDown
  await page1.press('text=HUAWEI Mate 40 Pro Specification We use cookies to improve our site and your exp', 'PageDown');
  // Press PageDown
  await page1.press('text=HUAWEI Mate 40 Pro Specification We use cookies to improve our site and your exp', 'PageDown');
  // Press PageDown
  await page1.press('text=HUAWEI Mate 40 Pro Specification We use cookies to improve our site and your exp', 'PageDown');
  // Press PageDown
  await page1.press('text=HUAWEI Mate 40 Pro Specification We use cookies to improve our site and your exp', 'PageDown');
  // Press PageDown
  await page1.press('text=HUAWEI Mate 40 Pro Specification We use cookies to improve our site and your exp', 'PageDown');
  // Press PageDown
  await page1.press('text=HUAWEI Mate 40 Pro Specification We use cookies to improve our site and your exp', 'PageDown');
  // Press PageDown
  await page1.press('text=HUAWEI Mate 40 Pro Specification We use cookies to improve our site and your exp', 'PageDown');
  // Press PageDown
  await page1.press('text=HUAWEI Mate 40 Pro Specification We use cookies to improve our site and your exp', 'PageDown');
  // Press PageDown
  await page1.press('text=HUAWEI Mate 40 Pro Specification We use cookies to improve our site and your exp', 'PageDown');
  // Press PageDown
  await page1.press('text=HUAWEI Mate 40 Pro Specification We use cookies to improve our site and your exp', 'PageDown');
  // Press PageDown
  await page1.press('text=HUAWEI Mate 40 Pro Specification We use cookies to improve our site and your exp', 'PageDown');
  // Press PageDown
  await page1.press('text=HUAWEI Mate 40 Pro Specification We use cookies to improve our site and your exp', 'PageDown');
  // Press PageDown
  await page1.press('text=HUAWEI Mate 40 Pro Specification We use cookies to improve our site and your exp', 'PageDown');
  // Press PageDown
  await page1.press('text=HUAWEI Mate 40 Pro Specification We use cookies to improve our site and your exp', 'PageDown');
  // Press PageDown
  await page1.press('text=HUAWEI Mate 40 Pro Specification We use cookies to improve our site and your exp', 'PageDown');
  // Press PageDown
  await page1.press('text=HUAWEI Mate 40 Pro Specification We use cookies to improve our site and your exp', 'PageDown');
  // Press PageDown
  await page1.press('text=HUAWEI Mate 40 Pro Specification We use cookies to improve our site and your exp', 'PageDown');
  // Press PageDown
  await page1.press('text=HUAWEI Mate 40 Pro Specification We use cookies to improve our site and your exp', 'PageDown');
  
  
  
   await page.waitForTimeout(2000);


  // ---------------------
  await context.close();
  await browser.close();
})();