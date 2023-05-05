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
  const { page } = await logIn({ userId: 6, options: { slowMo: 1000 } });
  await assertText(page, "Library");
  
  // go to recording
  await page.click(':text("QA Wolf - Replay Issues")');
  const recording = page.locator('[class*="Library_libraryRow"]');
  await recording.first().click(); // always select 1st (newest) recording
  
  // assert recording loaded
  await assertText(page, "Viewer");
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await assertText(page, "Console");
  
  // open React DevTools
  await page.keyboard.press("Control+K");
  await page.click("text=Open React DevTools");
  
  // assert React DevTools opened
  // going back into the Viewer causes the React DevTools to load properly
  try {
    await expect(
      page.locator("text=Loading React Developer Tools...")
    ).not.toBeVisible({ timeout: 10 * 1000 });
  } catch {
    await page.click(':text("Viewer") >> nth=0');
    await page.click("img >> nth=0");
    await page.click("img >> nth=0");
    await page.click(':text("ViewerDevTools")');
  }
  
  try {
    await page.click('button [src="/images/playback-play.svg"]', {
      timeout: 5000,
    });
  } catch {
    await page.click('button [src="/images/playback-refresh.svg"]');
  }
  
  await page.waitForTimeout(2000);
  
  try {
    await page.click('[src="/images/playback-pause.svg"]');
  } catch {}
  // await expect(page.locator(".inspector-panel-button")).toBeVisible();
  
  await logOut(page);
  

  process.exit();
})();