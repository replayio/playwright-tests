const { firefox } = require("playwright");

(async () => {
  const browser = await firefox.launch({});
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  // Go to https://www.yelp.com/
  await page.goto("https://www.yelp.com/");

  // Click input[placeholder="plumbers, delivery, takeout..."]
  await page.click('input[placeholder="plumbers, delivery, takeout..."]');

  // Fill input[placeholder="plumbers, delivery, takeout..."]
  await page.fill(
    'input[placeholder="plumbers, delivery, takeout..."]',
    "thai"
  );

  // Click //span[normalize-space(.)='Search']/span[1]
  await page.click("//span[normalize-space(.)='Search']/span[1]");
  // assert.equal(page.url(), 'https://www.yelp.com/search?find_desc=Thai+Food&find_loc=Willow+Glen,+San+Jose,+CA&ns=1');

  // Click text="Thaibodia Bistro - Campbell"
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://www.yelp.com/biz/thaibodia-bistro-campbell-campbell' }*/),
    page.click('text="Thaibodia Bistro - Campbell"'),
  ]);

  // Close page
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();
