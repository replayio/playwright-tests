const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch replay browser
  const { browser, context } = await launchReplay();
  
  // go to Airbnb
  const page = await context.newPage();
  await page.goto("https://airbnb.com");
  await assertText(page, "Cabins");
  
  try {
    await expect(page.locator('[data-testid="modal-container"]')).not.toBeVisible(
      { timeout: 5000 }
    );
  } catch {
    await page.click('[data-testid="modal-container"] [aria-label="Close"]');
  }
  
  // search for tahoe
  await page.waitForTimeout(3000);
  await page.click('[data-testid="little-search"] :text("LocationAnywhere")');
  await page.fill('[data-testid="structured-search-input-field-query"]', "tahoe");
  await page.click(
    '[data-testid="structured-search-input-field-query-panel"] >> text=Tahoe'
  );
  await page.click(
    ':text("Search"):right-of([data-testid="structured-search-input-field-guests-button"])'
  );
  await assertText(page, "Lake Tahoe");
  
  // filter by price
  await page.waitForTimeout(3000);
  await page.click(':text("Filters")');
  await page.fill('[data-testid="modal-container"] #price_filter_max', "500");
  
  await page.click('[data-testid="modal-container"] footer a');
  
  // assert price filter applied
  await expect(page.locator(':text("$500")')).not.toBeVisible();
  
  // list and upload the replay
  await uploadReplay();

  process.exit();
})();