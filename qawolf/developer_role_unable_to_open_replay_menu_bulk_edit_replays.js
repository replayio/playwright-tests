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
  const { page } = await logIn({ userId: 6, options: { slowMo: 1000 } });
  await expect(page.locator("text=Test Permissions")).toBeVisible();
  
  // go to team
  await page.click(':text("Test Permissions")');
  
  // assert replays loaded
  await expect(page.locator("text=Private Recording Test")).toBeVisible();
  await expect(page.locator("text=Time Travel")).toBeVisible();
  
  // assert replay menus are accessible
  await expect(page.locator('text=more_vert')).toHaveCount(5);
  
  // bulk edit replays
  await page.click("button >> text=Edit");
  
  // assert access to bulk edit
  const checkboxes = page.locator("[type=checkbox]");
  const checkboxCount = await checkboxes.count();
  expect(checkboxCount).toBe(5);
  await expect(page.locator("text=0 item selected")).toBeVisible();
  
  // select replays for editing
  const checkbox1 = page
    .locator('[type=checkbox]:left-of(:text("Private Recording Test"))')
    .first();
  const checkbox2 = page
    .locator('[type=checkbox]:left-of(:text("Time Travel"))')
    .first();
  await checkbox1.click();
  await checkbox2.click();
  
  // assert replays selected
  await expect(page.locator("text=2 items selected")).toBeVisible();
  
  // deselect replays
  await checkbox1.click();
  await checkbox2.click();
  
  // assert replays de-selected
  await expect(page.locator("text=0 item selected")).toBeVisible();
  await page.click("text=Done");
  
  // assert replays still visible
  await expect(page.locator("text=Private Recording Test")).toBeVisible();
  await expect(page.locator("text=Time Travel")).toBeVisible();
  
  await logOut(page);
  

  process.exit();
})();