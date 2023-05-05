const {
  assert,
  assertElement,
  assertText,
  expect,
  faker,
  getInbox,
  getValue,
  launch,
  launchReplay,
  uploadReplay,
  assertNotElement,
  assertNotText,
  buildUrl,
  deleteTeam,
  getBoundingClientRect,
  getPlaybarTooltipValue,
  logIn,
  logInToFacebook,
  parseInviteUrl,
  setFocus,
  waitForFrameNavigated,
  bubbleLogin,
  superblocksLogin,
  navigateTo,
  openPopup
} = require("./helpers");

(async () => {
  // log in
  const { browser, page } = await logIn({ userId: 6 });
  await assertText(page, "Your Library");
  
  // go to team settings
  await page.click("text=Remove Member Test");
  await page.click("text=settings");
  
  // assert settings loaded
  await assertText(page, 'Team Members');
  
  // ensure replay+deletemember@qawolf.email is present
  await page.click("text=Team Members");
  try {
    await assertText(page, 'replay+deletemember@qawolf.email', {timeout: 7 * 1000});
  } catch (e) {
    // invite the member to delete
    await page.fill('[placeholder="Email address"]', 'replay+deletemember@qawolf.email');
    await page.click("text=Invite");
  };
  
  // remove team member
  await page.click('button:right-of(:text("replay+deletemember@qawolf.email"))');
  await page.waitForTimeout(1000);
  await page.click("[role='menuitem'] >> text=Remove");
  await page.click("text=Remove them");
  
  // assert member removed
  await assertNotText(page, 'replay+deletemember@qawolf.email');
  
  // reinvite replay+deletemember@qawolf.email for next test run
  await page.fill('[placeholder="Email address"]', 'replay+deletemember@qawolf.email');
  await page.click("text=Invite");
  
  // assert member invited
  await assertText(page, 'replay+deletemember@qawolf.email');

  process.exit();
})();