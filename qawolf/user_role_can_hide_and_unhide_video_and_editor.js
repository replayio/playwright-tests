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
  await assertText(page, 'Library');
  
  // go to recording
  // await page.click('[title="Test Permissions"]');
  await page.click(`:text("Test Permissions")`);
  await page.click('text=Time Travel');
  
  // assert recording loaded
  await assertText(page, 'Time Travel');
  await assertText(page, 'DevTools');
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await assertText(page, 'Console');
  
  // hide video
  const video = page.locator('#video');
  await expect(video).toBeVisible();
  await page.click(':text("videocam_off")');
  
  // assert video hid
  await expect(video).not.toBeVisible();
  
  // show video
  await page.click('[title="Show Video"]');
  
  // assert video is shown
  await expect(video).toBeVisible();

  process.exit();
})();