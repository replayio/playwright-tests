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
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto(
    buildUrl(
      "/recording/longer-replay-for-testing--7e7af868-3651-49ed-b02c-4216df943fec"
    ),
    {
      timeout: 2 * 60 * 1000,
    }
  );
  
  // assert page loaded
  await assertText(page, "Longer Replay for Testing");
  await page.waitForTimeout(2000);
  
  // click to move to starting position
  await page.click(':text("Beginning comment")');
  
  // get player time
  const progressLine = page.locator(".progress-line").last();
  let beforePlayTimestamp = await progressLine.getAttribute("style");
  expect(beforePlayTimestamp.split(" ")[1]).toMatch(/0./);
  
  // play replay
  await page.click('button [src="/images/playback-play.svg"]');
  
  // wait for video to play 2s
  await page.waitForTimeout(2000);
  
  // pause replay
  await page.click('[src="/images/playback-pause.svg"]');
  
  // get player time after pausing
  let afterPlayTimestamp = await progressLine.getAttribute("style");
  await page.waitForTimeout(2000);
  expect(afterPlayTimestamp.split(" ")[1]).toMatch(/12.9/);
  
  // assert video played
  expect(beforePlayTimestamp).not.toEqual(afterPlayTimestamp);
  

  process.exit();
})();