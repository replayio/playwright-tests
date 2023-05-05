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
  await assertText(page, "Your Library");
  
  // go to replay
  await page.click(':text("Test Permissions")');
  
  // open replay
  await page.click('text="Time Travel"');
  await page.click("text=ViewerDevTools");
  
  // open script.js
  // await page.click("text=Search for fileCtrl+P");
  await page.keyboard.press("Control+P");
  await page.keyboard.type('s');
  await page.click('#result-list [role="option"]');
  
  // assert file opened
  await page.fill('[placeholder="Filter functions"]', "circles");
  const circles = page.locator('text=λcirclesAreAllTheSameColor()');
  const circlesFunction = page.locator('text=function circlesAreAllTheSameColor()');
  await expect(circles).toHaveCount(1);
  await expect(circlesFunction).toHaveCount(0);
  
  // click function to scroll into view
  await circles.click();
  await expect(circlesFunction).toHaveCount(1);

  process.exit();
})();