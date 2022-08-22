const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { browser, page } = await logIn({ userId: 10});
  await assertText(page, "Your Library");
  
  // go to team settings
  // await page.click('[title="Test Permissions"]');
  await page.click(':text("Test Permissions")');
  await page.click("text=settings");
  
  // assert team seetings loaded
  await assertText(page, 'Team Members');
  await assertText(page, 'Chris Burton');
  
  // assert unable to access billing
  await assertNotText(page, 'Billing');
  
  // assert unable to delete team
  await assertNotText(page, 'Delete Team');
  
  // expect that ability to change name disabled
  await page.click("text=Profile");
  await expect(page.locator('.space-y-4 input[type="text"]')).not.toBeVisible();
  // await page.fill('.space-y-4 input[type="text"]', "New Name");
  // await page.keyboard.press('Enter'); 
  // await page.click(".modal-close");
  // await page.click("text=Your Library");
  
  // // assert team name didn't change
  // await assertText(page, 'Test Permissions');
  // await assertNotText(page, 'New Name');

  process.exit();
})();