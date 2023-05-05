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
  const { context } = await launch({slowMo: 100});
  const page = await context.newPage();
  await page.goto(
    buildUrl(
      "/recording/longer-replay-for-testing--7e7af868-3651-49ed-b02c-4216df943fec"
    )
  );
  
  // assert page loaded
  await assertText(page, "Longer Replay for Testing");
  
  // go to comments
  await page.click("text=forum");
  
  // go to middle of replay
  await page.click(".progress-bar");
  
  // get current playhead time
  const progressLine = page.locator(".progress-line").last();
  let playheadPosition = await progressLine.getAttribute("style");
  expect(playheadPosition.split(" ")[1]).toMatch(/49./);
  
  // assert viewing comments
  await assertText(page, "Comments");
  
  // click comments
  await page.click("text=forum");
  await page.click('[data-test-id="leftSidebar"] :text("QA Wolf") >> nth=-1');
  
  // get current playhead time
  const newProgressLine = page.locator(".progress-line").last();
  playheadPosition = await newProgressLine.getAttribute("style");
  expect(playheadPosition.split(" ")[1]).not.toMatch(/49./);
  expect(playheadPosition.split(" ")[1]).toMatch(/100%/);
  

  process.exit();
})();