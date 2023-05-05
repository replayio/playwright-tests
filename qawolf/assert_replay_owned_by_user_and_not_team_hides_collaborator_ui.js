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
} = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 6 });
  await assertText(page, "Library");

  // go to replay
  await page.click(':text("Test Permissions")');
  await page.click("text=www.qawolf.com/");

  // open share modal
  await page.click("text=ios_shareShare");

  // assert collaborator UI is present
  const emailInput = page.locator('[placeholder="Email address"]');
  const authorText = page.locator("text=Author");
  await expect(emailInput).toHaveCount(1);
  await expect(authorText).toHaveCount(1);

  process.exit();
})();
