const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { browser, page } = await logIn({ userId: 10 });
  await assertText(page, "Your Library");
  
  // go to team settings
  await page.click('[title="Test Permissions"]');
  await page.click("text=settings");
  
  // assert team seetings loaded
  await assertText(page, 'Team Members');
  await assertText(page, 'Chris Burton');
  
  // go to api keys
  await expect(page.locator("text=API Keys")).toBeVisible();
  await page.click("text=API Keys");
  
  // assert api key view loaded
  await expect(page.locator('text=CREATE NEW API KEY')).toBeVisible();
  await expect(page.locator('[placeholder="API Key Label"]')).toBeVisible();
  await expect(page.locator('text=Add')).toBeVisible();

  process.exit();
})();