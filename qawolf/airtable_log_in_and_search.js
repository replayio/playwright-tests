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
  // REQ305 Airtable: log in
  // MAINTENANCE NOTE: if test is showing human verification close out of all tabs manually then rerun
  const { page, browser, context } = await logInToAirtable();
  
  // // REQ304 Airtable: search for base
  await page.fill('[aria-label="Find a base or interface"]', "Awesome Base");
  await expect(page.locator('text=Bases matching "awesome base"')).toBeVisible();
  await expect(page.locator('[aria-label="Awesome Base"]')).toBeVisible();
  
  await browser.close() // very important to eliminate build up of browsers

  process.exit();
})();