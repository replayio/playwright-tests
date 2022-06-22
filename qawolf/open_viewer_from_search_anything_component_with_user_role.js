const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 7 });
  await assertText(page, "Your Library");
  
  // go to replay
  await page.click('[title="Test Permissions"]');
  
  // open replay
  await page.click('text=Great Scott');
  await page.click("text=ViewerDevTools");
  
  // open viewer
  const network = page.locator('header button >> text=Network');
  await expect(network).toBeVisible();
  await page.click("text=Open Viewer");
  
  // assert viewer opened
  await expect(network).not.toBeVisible();

  process.exit();
})();