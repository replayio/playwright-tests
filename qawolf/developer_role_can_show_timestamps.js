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
  const { page } = await logIn({ userId: 10 });
  await assertText(page, 'Library');
  
  // go to recording
  // await page.click('[title="Test Permissions"]');
  await page.click(':text("Test Permissions")');
  await page.click('text=Time Travel');
  
  // assert recording loaded
  await assertText(page, 'Time Travel');
  await assertText(page, 'DevTools');
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // make sure the filter menu is expanded
  try {
    await expect(page.locator('[data-test-id="EventTypeFilterInput"]')).toBeVisible( {timeout: 10 * 1000});
  } catch {
    await page.click('[data-test-id="ConsoleMenuToggleButton"][title="Open filter menu"]');
    await expect(page.locator('[data-test-id="EventTypeFilterInput"]')).toBeVisible();
  }
  
  // assert DevTools loaded
  await assertText(page, 'Console');
  
  // enable timestamps
  const showTimestampsCheckbox = page.locator('#FilterToggle-timestamps');
  const timestamp = page.locator(':text("0:02")');
  if (await timestamp.count()) showTimestampsCheckbox.uncheck();
  await page.waitForTimeout(2000);
  expect(await timestamp.count()).toEqual(0);
  expect(await showTimestampsCheckbox.isChecked()).toBeFalsy();
  await showTimestampsCheckbox.check();
  
  // assert timestamps appeared
  expect(await showTimestampsCheckbox.isChecked()).toBeTruthy();
  await page.waitForTimeout(2000);
  expect(await timestamp.count()).toEqual(6);
  
  // hide timestamps
  await showTimestampsCheckbox.uncheck();
  expect(await showTimestampsCheckbox.isChecked()).not.toBeTruthy();
  expect(await timestamp.count()).toEqual(0);

  process.exit();
})();