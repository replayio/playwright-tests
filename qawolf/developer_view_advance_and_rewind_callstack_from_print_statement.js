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
  
  // go to recording "New Hello World!"
  await page.click("text=New Hello World!");
  
  // assert recording loaded
  await assertText(page, "Hello World!");
  await assertText(page, "DevTools");
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await assertText(page, "Console");
  
  // restart replay
  await page.click('[src="/images/playback-refresh.svg"]');
  
  // get current player head time
  const progressLine = page.locator(".progress-line").last();
  let playheadPosition = await progressLine.getAttribute("style");
  try {
    expect(playheadPosition.split(" ")[1]).toEqual("0%;");
  } catch {
    expect(playheadPosition.split(" ")[1]).toEqual("100%;");
  }
  
  // open source
  await page.click('[role="tree"] >> text=utils.js');
  
  // assert utils.js opened
  const newPromises = page.locator("text=return new Promise(resolve => {");
  await expect(newPromises).toHaveCount(1);
  await page.waitForTimeout(6000);
  
  // add print statement
  await newPromises.hover({ force: true });
  await page.click('[data-test-id="Source-2"] [data-test-name="LogPointToggle"]');
  const callStackPane = page.locator(".call-stack-pane");
  await expect(callStackPane).toHaveCount(0);
  
  // advance call stack
  const fastForwardButton = page.locator('[data-test-name="NextHitPointButton"]');
  const rewindButton = page.locator('[data-test-name="PreviousHitPointButton"]');
  await expect(fastForwardButton).toHaveCount(1);
  await expect(rewindButton).toHaveJSProperty("disabled", true);
  for (let i = 0; i < 21; i++) {
    await fastForwardButton.click();
    await page.waitForTimeout(1000);
  }
  
  // assert callstack moved forward
  let playheadPosition2 = await progressLine.getAttribute("style");
  expect(playheadPosition2.split(" ")[1]).toEqual("40.0899%;");
  await expect(fastForwardButton).toHaveJSProperty("disabled", true);
  
  // rewind callstack
  await expect(rewindButton).toHaveJSProperty("disabled", false);
  for (let i = 0; i < 20; i++) {
    await rewindButton.click();
    await page.waitForTimeout(1000);
  }
  
  // assert callstack moved backward
  let playheadPosition3 = await progressLine.getAttribute("style");
  expect(playheadPosition3.split(" ")[1]).toEqual("2.48068%;");
  
  // open call stack
  await page.click("text=motion_photos_paused");
  
  // assert callstack panel opened
  await expect(callStackPane).toHaveCount(1);
  

  process.exit();
})();