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
  const { page } = await logIn({ userId: 7 }); // User

  // Do not leave enabled - for debugging only! **************************
  // const { page } = await logIn({ userId: 10 }); // Developer for debugging
  // *********************************************************************

  await assertText(page, "Your Library");

  // go to replay
  await page.click(':text("Test Permissions")');

  // open replay
  await page.click(":text-is('Time Travel')");
  await page.click("text=ViewerDevTools");

  // check for role message
  const consoleInput = page.locator('[data-test-id="ConsoleTerminalInput"]');
  // remove suite ID if test fails here
  await expect(consoleInput).toHaveText(
    "Only 'Developer'-role users can evaluate expressions"
  );

  // try to enter console evaluation
  await consoleInput.click();
  await expect(consoleInput).toHaveText(
    "Only 'Developer'-role users can evaluate expressions"
  );

  process.exit();
})();
