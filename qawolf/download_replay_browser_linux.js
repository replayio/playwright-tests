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
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto("https://www.replay.io/");
  
  // assert home page loaded
  await expect(
    page.locator("text=The time-travel debugger from the future.")
  ).toBeVisible();
  
  // wheel down to download
  await page.mouse.wheel(0, 30000);
  
  // download for Linux
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.click('.button_tertiary__aSJSu [alt="Linux"]'),
  ]);
  
  // get suggested file name
  var linuxDownloadName = download.suggestedFilename();
  
  // assert Linux download
  assert(linuxDownloadName.includes("linux-replay.tar.bz2"));
  

  process.exit();
})();