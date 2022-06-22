const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { context, page } = await logIn({ userId: 8 });
  
  // assert page loaded
  await assertText(page, 'Your Library');
  await assertText(page, 'View settings');
  
  // go to support
  await page.click("text=View settings");
  await page.click("text=Support");
  
  // assert support info loaded
  await assertText(page, 'Discord server');
  await assertText(page, 'support@replay.io');
  
  // click Disord server link
  const [discordPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click("text=Discord server.")
  ]);
  
  // assert Discord login page loaded
  await discordPage.click("text=jv invited you to join");
  await assertText(discordPage, "Replay");
  
  // assert email link href
  await page.bringToFront();
  const emailLink = page.locator('text=support@replay.io');
  await expect(emailLink).toHaveAttribute('href', 'mailto:support@replay.io');

  process.exit();
})();