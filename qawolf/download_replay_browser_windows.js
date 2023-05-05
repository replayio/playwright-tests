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
} = require("./helpers");

(async () => {
  // open new context with Windows userAgent
  const { browser } = await launch();
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
  });

  const page = await context.newPage();
  await page.goto("https://www.replay.io/");

  // assert home page loaded
  await page.mouse.wheel(0, 30000);
  await assertText(page, "Download");

  // download replay
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.click(':text("Download Replay")'),
  ]);

  // get suggested file name
  var windowsDownloadName = download.suggestedFilename();

  // assert windows version of replay downloaded
  expect(windowsDownloadName).toEqual("windows-replay.zip");

  process.exit();
})();
