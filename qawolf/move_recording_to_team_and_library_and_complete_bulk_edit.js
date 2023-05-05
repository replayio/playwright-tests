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
  const { browser, page } = await logIn({ userId: 10 });
  await assertText(page, "Your Library");
  
  // assert replays to move are in 'Move Team 1'
  await page.click(':text("Move Team 2")');
  try {
    await expect(page.locator('button:has-text("Edit")')).not.toBeVisible({
      timeout: 10 * 1000,
    });
  } catch (e) {
    await page.click('button:has-text("Edit")');
    await page.waitForTimeout(1000);
    const numOfCheckboxes = await page.locator('[type="checkbox"]').count();
    for (let i = 0; i < numOfCheckboxes; i++) {
      await page.check(`[type="checkbox"] >> nth=${i}`);
    }
    await page.click('[data-test-id="consoleDockButton"]:has-text("selected")');
    await page.click('[role="menuitem"]:has-text("Move Team 1")');
  }
  await page.click(':text("Move Team 1")');
  
  // assert no checkboxes
  await expect(page.locator('[type="checkbox"]')).not.toBeVisible();
  
  // check if replays are in Move Team 1
  await page.waitForTimeout(5000);
  const ifThereAreNoReplays = await page
    .locator(`:text("👋 This is where your replays will go")`)
    .count();
  console.log(ifThereAreNoReplays);
  if (ifThereAreNoReplays) {
    // move replays back to Move Team 1
    await page.click(':text("Move Team 2")');
    await page.click('button:has-text("Edit")');
    await expect(page.locator('[type="checkbox"]')).toHaveCount(2);
    await page.check('[type="checkbox"] >> nth=0');
    await page.check('[type="checkbox"] >> nth=1');
    await page.click("text=expand_more2 items selected");
    await page.click('[role="menu"] >> text=Move Team 1');
  
    // assert replays in Move Team 1
    await page.click(':text("Move Team 1")');
    await expect(page.locator("text=Move Team Amazing")).toBeVisible();
    await expect(page.locator("text=Move Team Wow")).toBeVisible();
    await page.click(':text("Move Team 1settings")');
  }
  
  // click Edit button and assert checkboxes appeared
  try {
    await page.click('button:has-text("Edit")', {timeout: 5000}); // If items are missing, run lines 49 - 60
  } catch {}
  await expect(page.locator('[type="checkbox"]')).toHaveCount(2);
  
  // select replays to move to Move Team 2
  await page.check('[type="checkbox"] >> nth=0');
  await page.check('[type="checkbox"] >> nth=1');
  
  // assert checkboxes checked
  await expect(page.locator('[type="checkbox"] >> nth=0')).toBeChecked();
  await expect(page.locator('[type="checkbox"] >> nth=1')).toBeChecked();
  
  // move replays to Test team
  await page.click("text=expand_more2 items selected");
  await page.click('[role="menu"] >> text=Move Team 2');
  
  // assert checkboxes hid
  await page.waitForTimeout(2000);
  await expect(page.locator('[type="checkbox"]')).not.toBeVisible();
  
  // assert replays moved
  await expect(page.locator("text=Move Team Amazing")).not.toBeVisible();
  await expect(page.locator("text=Move Team Wow")).not.toBeVisible();
  
  // move replays back to Move Team 1
  await page.click(':text("Move Team 2")');
  await page.check('[type="checkbox"] >> nth=0');
  await page.check('[type="checkbox"] >> nth=1');
  await expect(page.locator('[type="checkbox"]')).toHaveCount(2);
  await page.check('[type="checkbox"] >> nth=0');
  await page.check('[type="checkbox"] >> nth=1');
  await page.click("text=expand_more2 items selected");
  await page.click('[role="menu"] >> text=Move Team 1');
  
  // assert replays in Move Team 1
  await page.click(':text("Move Team 1")');
  await page.waitForTimeout(10000);
  await expect(page.locator("text=Move Team Amazing")).toBeVisible();
  await expect(page.locator("text=Move Team Wow")).toBeVisible();
  

  process.exit();
})();