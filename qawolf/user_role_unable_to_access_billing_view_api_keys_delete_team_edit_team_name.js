const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { browser, page } = await logIn({ userId: 7 });
  await assertText(page, "Your Library");
  
  // go to team settings
  // await page.click('[title="Test Permissions"]');
  await page.click(`:text("Test Permissions")`);
  await page.click("text=settings");
  
  // assert team seetings loaded
  await assertText(page, "Team Members");
  await assertText(page, "Chris Burton");
  
  // assert unable to access billing
  await expect(page.locator(`:text("Billing")`)).not.toBeVisible();
  
  // assert unable to access API keys
  await expect(page.locator(`:text("API Keys")`)).not.toBeVisible();
  
  // assert unable to delete team
  await expect(page.locator(`:text("Delete Team")`)).not.toBeVisible();
  
  // assert unable to change team name
  await page.click("text=Profile");
  await expect(page.locator('.space-y-4 input[type="text"]')).not.toBeVisible();
  

  process.exit();
})();