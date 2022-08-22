const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 6, options: { slowMo: 1000 } });
  await assertText(page, "Your Library");
  
  // go to replay
  // await page.click('[title="Test Permissions"]');
  await page.click(':text("Test Permissions")');
  
  // open replay
  await page.click("text=Time Travel");
  await page.click("text=ViewerDevTools");
  
  // click search tab
  await page.click(".search button");
  
  // search files
  await page.fill('[placeholder="Find in files…"]', "demo");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000); // give search time to populate
  
  // assert searched term results
  await expect(page.locator('text="12 results"')).toBeVisible();
  

  process.exit();
})();