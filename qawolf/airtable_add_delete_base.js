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
  const { page, browser } = await logInToAirtable();
  
  // clean up
  while (await page.locator("text=QA Base").count()) {
    await page.click(':text("Qa")', {button: "right"});
    await page.click(':text("Delete base")');
    await page.click(".focusFirstInModal");
    await page.waitForTimeout(500);
  }
  
  // REQ451 Airtable: Add base
  const baseName = `QA base ` + Date.now().toString().slice(-4);
  await page.click(':text("Add a base")');
  await page.click('[aria-label="Open base settings menu"]');
  await page.fill('[aria-label="rename base"]', baseName);
  await page.keyboard.press("Enter");
  
  // assert base
  await page.click('[aria-label="Go home"]');
  await expect(page.locator(`text=${baseName}`)).toBeVisible();
  
  // REQ452 Airtable: Delete base
  await page.click(`[aria-label="${baseName}"]`, {button: "right"})
  await page.click(':text("Delete base")');
  await page.click(".focusFirstInModal");
  await expect(page.locator(`text=${baseName}`)).toBeHidden();
  
  // upload replay
  await uploadReplay();
  
  

  process.exit();
})();