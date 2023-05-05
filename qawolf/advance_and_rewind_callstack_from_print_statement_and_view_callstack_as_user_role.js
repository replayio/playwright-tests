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
  await assertText(page, "Library");
  
  // go to "replay with logs"
  await page.click(
    '[href="/recording/replay-with-logs--2e63ccb9-ada6-4d2a-a3a9-5d09d551e68d"]'
  );
  
  // assert recording loaded
  await assertText(page, "Replay with logs");
  await assertText(page, "DevTools");
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await assertText(page, "Console");
  
  // get current player head time
  await page.waitForTimeout(3000);
  const progressLine = page.locator(".progress-line").last();
  let playheadPosition = await progressLine.getAttribute("style");
  expect(playheadPosition.split(" ")[1]).toEqual("5.06466%;");
  
  // open source "_async_to_generator.js"
  await page.click('[data-test-id="AccordionPane-Sources"] :text("search")');
  await page.fill('[data-test-id="QuickOpenInput"]', "_async");
  await page.click(
    '[data-test-id="QuickOpenResultsList"] :text("_async_to_generator.js")'
  );
  
  // assert _async_to_generator.js opened
  await page.waitForTimeout(10 * 1000);
  await page.hover(':text("var self = this, args = arguments;")');
  await page.click(
    '[data-test-id="SourceLine-8"] [data-test-name="LogPointToggle"]'
  );
  const callStackPane = page.locator(".call-stack-pane");
  await expect(callStackPane).toHaveCount(0);
  
  // advance call stack to end
  const fastForwardButton = page.locator(
    '[data-test-name="NextHitPointButton"]'
  );
  const disabledFastForwardButton = await page
    .locator('[data-test-name="NextHitPointButton"][disabled]')
    .count();
  const rewindButton = page.locator(
    '[data-test-id="PointPanel-8"] [data-test-name="PreviousHitPointButton"]'
  );
  const disabledRewindButton = await page
    .locator('[data-test-name="PreviousHitPointButton"][disabled]')
    .count();
  await expect(fastForwardButton).toHaveCount(1);
  
  while (disabledFastForwardButton != 1) {
    await fastForwardButton.click();
    await page.waitForTimeout(1000);
    disabledFastForwardButton = await page
      .locator('[data-test-name="NextHitPointButton"][disabled]')
      .count();
  }
  
  // assert callstack moved forward
  let playheadPosition = await progressLine.getAttribute("style");
  expect(playheadPosition.split(" ")[1]).toContain("82.3"); //"82.3853%;"
  expect(disabledFastForwardButton).toBe(1); // if the fast forward button is greyed out
  
  // rewind callstack
  await expect(rewindButton).toHaveCount(1);
  
  while ((disabledRewindButton) < 1) {
    await rewindButton.click();
    await page.waitForTimeout(1000);
    disabledRewindButton = await page
      .locator('[data-test-name="PreviousHitPointButton"][disabled]')
      .count();
  }
  
  // assert callstack moved backward
  let playheadPosition = await progressLine.getAttribute("style");
  expect(playheadPosition.split(" ")[1]).toEqual("2.57073%;");
  
  // open call stack
  await page.click("text=motion_photos_paused");
  
  // assert callstack panel opened
  await expect(callStackPane).toHaveCount(1);
  

  process.exit();
})();