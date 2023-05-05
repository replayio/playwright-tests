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
  const { page } = await logIn({ userId: 7 });
  await assertText(page, "Library");
  
  // go airtable recording
  await page.click('[href="/recording/playwright-test-teams-airtable--69bdd408-b9bf-49a4-b914-608e92c026ce"]');
  
  // assert recording loaded
  await assertText(page, "Playwright Test: Teams - Airtable");
  await assertText(page, "DevTools");
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await assertText(page, "Console");
  
  // filter console by errors
  const consoleErrors = page.locator('[data-test-message-type="console-error"]');
  await page.waitForTimeout(10 * 1000);
  await expect(consoleErrors).toHaveCount(1, { timeout: 3 * 60 * 1000 }); //6
  
  // toggle errors off
  await page.click('[data-test-id="ConsoleMenuToggleButton"]');
  await page.click("#FilterToggle-errors");
  
  // assert errors hid
  await expect(consoleErrors).toHaveCount(0);
  
  // show errors
  await page.click("#FilterToggle-errors");
  
  // assert errors appeared
  await expect(consoleErrors).toHaveCount(1);
  

  process.exit();
})();