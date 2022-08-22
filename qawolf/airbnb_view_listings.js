const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // go to Airbnb
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://airbnb.com');
  await assertText(page, "Become a Host");
  
  try{
    await expect(page.locator('[data-testid="modal-container"]')).toBeVisible();
    await page.click('[data-testid="modal-container"] [aria-label="Close"]');
  } catch {}
  
  // search for tahoe
  await page.waitForTimeout(3000);
  await page.click('[data-testid="little-search"] :text("LocationAnywhere")');
  await page.fill('[data-testid="structured-search-input-field-query"]', "tahoe");
  await page.click('[data-testid="structured-search-input-field-query-panel"] >> text=Tahoe');
  await page.click(':text("Search"):right-of([data-testid="structured-search-input-field-guests-button"])');
  await assertText(page, "stays");
  await assertText(page, "Lake Tahoe");
  
  // filter by price
  await page.waitForTimeout(3000);
  // await page.click('[aria-label="Filters"]');
  await page.click(':text("Filters")');
  //await page.click('[data-testid="menuItemButton-price_range"] >> text=Price');
  await page.fill('[data-testid="modal-container"] #price_filter_max', "500");
  //await page.click('[data-testid="filter-panel-save-button"]');
  await page.click('[data-testid="modal-container"] footer a');
  
  // assert price filter applied
  await assertNotText(page, "$500");

  process.exit();
})();