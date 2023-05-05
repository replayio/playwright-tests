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
  // Title from repo: Should show the correct docking behavior for recordings with video
  const { browser, context, page } = await launchForBreakpoints();
  
  const url = "doc_rr_basic.html";
  await page.waitForTimeout(5000);
  
  await openDevToolsTab(page);
  
  // Verify default docking position, reset if needed
  try {
    await expect(page.locator(
      '[data-test-state="ide"]'
    )).toBeVisible({ timeout: 5000 });
  } catch {
    await page.click('[data-test-id="consoleDockButton"]');
    await page.locator('[data-test-id="DockToBottomRightButton"]').click();
    await expect(page.locator(
      '[data-test-state="ide"]'
    )).toBeVisible({ timeout: 5000 });
  }
  
  // Verify docking options
  await page.click('[data-test-id="consoleDockButton"]');
  await expect(page.locator(
    '[data-test-id="DockToBottomRightButton"]'
  )).toBeVisible();
  await expect(page.locator('[data-test-id="DockToLeftButton"]')).toBeVisible();
  await expect(page.locator('[data-test-id="DockToBottomButton"]')).toBeVisible();
  
  // Toggle bottom and verify
  await page.locator('[data-test-id="DockToBottomButton"]').click();
  await expect(page.locator('[data-test-state="bottom"]')).toBeVisible();
  
  // Toggle left and verify
  await page.click('[data-test-id="consoleDockButton"]');
  await page.locator('[data-test-id="DockToLeftButton"]').click();
  await expect(page.locator('[data-test-state="left"]')).toBeVisible();
  
  // Toggle back to bottom right and verify
  await page.click('[data-test-id="consoleDockButton"]');
  await page.locator('[data-test-id="DockToBottomRightButton"]').click();
  await expect(page.locator('[data-test-state="ide"]')).toBeVisible();

  process.exit();
})();