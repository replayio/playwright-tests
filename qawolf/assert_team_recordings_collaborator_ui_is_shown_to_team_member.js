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
  openPopup,
  runCommand
} = require("./helpers");

(async () => {
  // log in
  const { browser, page } = await logIn({ userId: 7 });
  await assertText(page, "Your Library");
  
  // go to team recording
  await page.click("text=Test Permissions");
  await page.click("text=Time Travel");
  
  // open share modal
  await page.click("text=ios_shareShare");
  
  // assert collaborator UI shown
  const emailInput = page.locator('[placeholder="Email address"]');
  const authorText = page.locator("text=Author");
  await expect(emailInput).toHaveCount(1);
  await expect(authorText).toHaveCount(1);
  

  process.exit();
})();