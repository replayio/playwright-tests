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
  // open new context with Mac userAgent
  const { browser } = await launch();
  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.131 Safari/537.36"
  })
  
  const page = await context.newPage();
  await page.goto("https://www.replay.io/");
  
  // assert home page loaded
  await page.mouse.wheel(0, 30000);
  await assertText(page, "Download");
  
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.click(':text("Download Replay")'),
  ]);
  
  // get suggested file name
  var macDownloadName = download.suggestedFilename();
  
  // assert mac version of replay downloaded
  expect(macDownloadName).toEqual("replay.dmg");
  await page.click(':text("Start Replaying now")');

  process.exit();
})();