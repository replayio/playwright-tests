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
  const { page } = await logIn({ userId: 10 });
  await assertText(page, "Your Library");
  
  // go to replay
  // await page.click('[title="Test Permissions"]');
  await page.click(':text("Test Permissions")');
  
  // open replay
  await page.click('text=Time Travel');
  await page.click("text=ViewerDevTools");
  
  // hide video
  const video = page.locator("#video");
  await expect(video).toBeVisible();
  await page.click(':text("videocam_off")');
  await expect(video).toBeHidden();
  
  // unhide video
  await page.click('[title="Show Video"]');
  await expect(video).toBeVisible();
  
  // unhide edior
  // const editor = page.locator(".editor-mount");
  const editor = page.locator(`.source-footer`); // couldn't find a editor mount but footer was only visible inside editor
  await expect(editor).toBeHidden();
  await page.click(':text("static.replay.io")');
  await page.click(':text("demo")');
  await page.click(':text("demo-script.js")');
  await expect(editor).toBeVisible();
  
  // hide editor
  await page.click('[title="Close tab"]');
  await expect(editor).toBeHidden();

  process.exit();
})();