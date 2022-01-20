const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,logIn,logInToFacebook,parseInviteUrl,waitForFrameNavigated } = require("./helpers");

(async () => {
  // go to Airbnb
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://airbnb.com');
  await assertText(page, "Become a Host");
  
  // search for tahoe
  await page.waitForTimeout(3000);
  await page.fill('[data-testid="structured-search-input-field-query"]', "tahoe");
  await page.click('[data-testid="structured-search-input-field-query-panel"] >> text=Tahoe');
  await page.click(':text("Search"):right-of([data-testid="structured-search-input-field-guests-button"])');
  await page.waitForSelector("text=stays in");
  await assertText(page, "Lake Tahoe");
  
  // filter by price
  await page.waitForTimeout(3000);
  await page.click('[data-testid="menuItemButton-price_range"] >> text=Price');
  await page.fill('[data-testid="menuBarPanel-price_range"] #price_filter_max', "500");
  await page.click('[data-testid="filter-panel-save-button"]');
  
  // assert price filter applied
  await assertText(page, "Up to $500");

  process.exit();
})();