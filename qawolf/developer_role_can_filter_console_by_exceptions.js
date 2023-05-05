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
  const { page } = await logIn({ userId: 7 });
  
  // goto 'replay with logs'
  await page.click('[href="/recording/replay-with-logs--2e63ccb9-ada6-4d2a-a3a9-5d09d551e68d"]');
  
  // view devtools
  await page.click(':text("ViewerDevTools")');
  
  await page.waitForTimeout(6000);
  
  // make sure the filter menu is expanded
  try {
    await expect(page.locator('[data-test-id="EventTypeFilterInput"]')).toBeVisible( {timeout: 10 * 1000});
  } catch {
    await page.click('[data-test-id="ConsoleMenuToggleButton"][title="Open filter menu"]');
    await expect(page.locator('[data-test-id="EventTypeFilterInput"]')).toBeVisible();
  }
  
  // ensure exceptions aren't checked
  await page.uncheck('[data-test-id="FilterToggle-exceptions"] #FilterToggle-exceptions');
  
  // assert exceptions not visible
  await expect(page.locator('[data-test-message-type="exception"]').first()).not.toBeVisible();
  
  // show console exceptions
  await page.check('[data-test-id="FilterToggle-exceptions"] #FilterToggle-exceptions');
  
  // assert exceptions populated
  await expect(page.locator('[data-test-message-type="exception"]').first()).toBeVisible();

  process.exit();
})();