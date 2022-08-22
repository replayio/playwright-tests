const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto("https://www.yelp.com/");
  
  // assert page loaded
  await assertText(page, "Log In");
  
  // search for thai
  await page.fill('[data-testid="suggest-desc-input"]', "thai");
  await page.press('[data-testid="suggest-desc-input"]', "Enter");
  
  // click first result under all results
  await page.click('[data-testid="TRUSTED_PROPERTY"]');
  
  // assert on business page
  await expect(page.locator(':text("Location")').first()).toBeVisible({ timeout: 30 * 1000 });
  
  

  process.exit();
})();