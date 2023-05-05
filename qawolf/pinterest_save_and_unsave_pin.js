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
  // Call loginReplay helper
  const { browser, context } = await launchReplay({ slowmo: 3000 });
  
  // log in to pinterest
    // log in with Replay+pin-one@qawolf.email and default password
  const { page } = await logInToPinterest(context);
  
  
  // create the board that we want to save pin to (more efficient assertion), if not there
  await page.click('[data-test-id="header-profile"] [href="/replaypinone/"]'); // click profile
  try {
    await expect(page.locator('[data-test-id="board-[DONT DELETE] Save/Unsave Pin"]')).toBeVisible();
  } catch {
    await page.click('[data-test-id="boardActionsButton"] [aria-label="Create a Pin or a board"]');
    await page.waitForTimeout(1000);
    await page.click('[data-test-id="Create board"] :text("Board")');
    await page.waitForTimeout(1000);
    await page.fill("#boardEditName", "[DONT DELETE] Save/Unsave Pin");
    await page.waitForTimeout(1000);
    await page.click('[type="submit"]');
    await page.waitForTimeout(5000);
    await page.reload();
  }
  
  // if not already in the board
  try {
    await page.click('[data-test-id="boardCard-[DONT DELETE] Save/Unsave Pin"]');
  } catch (e) {}
  await page.waitForTimeout(1000);
  
  // clean up previous pins inside "[DONT DELETE] Save/Unsave Pin" board
  try {
    await expect(page.locator(
      '[data-test-id="board-feed"] :text("There aren’t any Pins on this board yet")'))
      .toBeVisible({ timeout: 10 * 1000 });
  } catch {
    await expect(page.locator(
      '[data-test-id="pinrep-image"] >> nth=0'))
      .toBeVisible();
    await page.click('[data-test-id="board-tools"] [aria-label="Organize"]');
    await page.waitForTimeout(1000);
    await page.click(':text("Select all")');
    await page.waitForTimeout(1000);
    await page.click('button[aria-label="Delete Pins"]');
    await page.waitForTimeout(1000);
    await page.click(':text-is("Delete")');
    await page.waitForTimeout(1000);
    await page.click('[data-test-id="board-tool-header"] [aria-label="Back"]');
    await expect(page.locator(
      '[data-test-id="board-feed"] :text("There aren’t any Pins on this board yet")'))
      .toBeVisible();
  };
  
  // navigate to home page
  await page.click('[data-test-id="header-background"] :text("Home")');
  await page.waitForTimeout(5000);
  
  // REQ Pinterest: Save Pin (Example)
  // click 'save' on a pin
  await page.hover('[data-test-id="pinrep-image"] >> nth=1');
  await page.waitForTimeout(5000);
  await page.click('[data-test-id="PinBetterSaveButton"] :text("Save")');
  await expect(page.locator('[data-test-id="better-save"] [aria-label="Pin Saved"]')).toBeVisible();
  await page.waitForTimeout(5000);
  
  // edit saved location from 'profle' to '[DONT DELETE] Save/Unsave Pin' to easily assert the exact pin we saved
  await page.click('[data-test-id="pointer-events-wrapper"] [aria-label="Edit"]');
  await page.waitForTimeout(5000);
  await page.click('[data-test-id="edit-board"] :text("Profile")');
  await page.waitForTimeout(5000);
  await page.click('[data-test-id="board-selection"] :text("[DONT DELETE] Save/Unsave Pin")');
  await page.waitForTimeout(5000);
  await page.click('[data-test-id="edit-pin-save"] :text("Save")');
  await page.waitForTimeout(5000);
  
  // Assert pin appears in 'profile' -> '[DONT DELETE] Save/Unsave Pin' board
  await page.click('[data-test-id="header-profile"] [href="/replaypinone/"]');
  await page.waitForTimeout(5000);
  await page.click('[data-test-id="boardCard-[DONT DELETE] Save/Unsave Pin"]');
  await page.waitForTimeout(5000);
  try {
    await expect(page.locator('[data-test-id="pinrep-image"] >> nth=0')).toBeVisible();
  } catch {
    await page.reload();
    await expect(page.locator('[data-test-id="pinrep-image"] >> nth=0')).toBeVisible();
  }
  
  // start with a saved pin
  await page.hover('[data-test-id="pinrep-image"] >> nth=0');
  await page.waitForTimeout(5000);
  
  // REQ Pinterest: Unsave Pin (Example)
  // click 'delete' button
  await page.click('[data-test-id="pointer-events-wrapper"] [aria-label="Edit"]');
  await page.waitForTimeout(5000);
  await page.click('[data-test-id="delete-pin-button"] :text("Delete")');
  await page.waitForTimeout(5000);
  await page.click('[data-test-id="confirm-delete-pin"] :text("Delete")');
  await page.waitForTimeout(5000);
  
  // Assert pin no longer in profile '[DONT DELETE] Save/Unsave Pin' board
  await expect(page.locator('[data-test-id="pinrep-image"] >> nth=0')).not.toBeVisible();
  await page.waitForTimeout(5000);
  
  // Call uploadReplay helper - starting to fail here
  await uploadReplay();

  process.exit();
})();