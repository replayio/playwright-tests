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
  const { page } = await logIn({ userId: 10 });
  await assertText(page, "Library");
  
  // go to recording
  await page.click(':text("Test Permissions")');
  await page.click("text=Time Travel");
  await page.click("text=DevTools");
  await page.waitForTimeout(5000); // give DevTools time to fully load
  
  // assert DevTools loaded
  await assertText(page, "Time Travel");
  await assertText(page, "Network");
  
  // open outline from search for anything tool
  await page.keyboard.press("Control+K");
  await page.click("text=Open Outline");
  await page.click(':text("static.replay.io")');
  await page.click("text=demo");
  await page.click("text=demo-script.js");
  
  // assert outline pane opened
  const outline = page.locator(".outline-filter");
  await expect(outline).toBeVisible();
  
  // click item from outline and assert script scrolls
  await expect(page.locator('text="preloadImage"')).toHaveCount(3);
  await page.fill(
    '[placeholder="Filter functions"]',
    "circlesAreAllTheSameColor"
  );
  await page.click(':text("circlesAreAllTheSameColor")');
  await expect(page.locator('text="preloadImage"')).toHaveCount(0);
  

  process.exit();
})();