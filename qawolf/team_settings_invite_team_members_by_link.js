const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { context, page } = await logIn({ userId: 9 });
  await context.grantPermissions(['clipboard-read']);
  await assertText(page, "Your Library");
  
  // go to team settings
  await page.click("text=Test team");
  await page.click("text=settings");
  
  // assert team settings loaded
  await page.click("text=Team Members");
  const h1 = page.locator('main h1');
  const inviteButton = page.locator('form button');
  await expect(h1).toHaveText('Team Members');
  await expect(inviteButton).toHaveText('Invite');
  
  // copy invite link
  await page.click('div:nth-of-type(4) [type="text"]');
  
  // assert link copied
  const copiedLink = await page.evaluate(() => {
    return navigator.clipboard.readText();
  });
  
  // log out and go to invite link
  await context.setExtraHTTPHeaders({});
  await page.goto(copiedLink);
  
  // assert correct page loaded
  await assertText(page, 'Sign');
  await assertText(page, 'in with Google');
  
  // go to log in
  await page.click("button:has-text('Sign in with Google')");
  
  // assert Google log in page loaded
  await assertText(page, 'Sign in with Google');
  await assertText(page, 'to continue to Replay');

  process.exit();
})();