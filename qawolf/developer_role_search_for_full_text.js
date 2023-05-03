const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 10 });
  await assertText(page, "Your Library");
  
  // go to replay
  await page.click(':text("Test Permissions")');
  
  // open replay
  await page.click('text=Time Travel');
  await page.click("text=ViewerDevTools");
  
  // click search tab
  await page.click(".search button");
  
  // search files
  await page.fill('[data-test-id="leftSidebar"] [data-test-id="SearchFiles-Input"]', 'background-image: url("/demo/demo_car.png');
  await page.waitForTimeout(5000);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(4000); // give search time to populate
  
  // assert searched term results
  // if this fails, wait five minutes and run again
  await expect(page.locator('text="1 result"')).toBeVisible();

  process.exit();
})();