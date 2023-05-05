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
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://natto.dev/');
  
  // assert page loaded
  await assertText(page, "welcome!");
  
  // hover over menu
  await page.hover("text=natto.dev");
  
  // navigate to weather
  // await page.click("text=weather");
  await page.click(':text("1. tip calculator")');
  
  // assert weather page
  await assertText(page, "1. tip calculator");
  
  // grab iframe
  var frame = await (await page.waitForSelector('#sandbox-iframe')).contentFrame();
  
  // give time for frame to load
  await page.waitForTimeout(5000);
  const runButton = await frame.$('button span:has-text("run")');
  
  // run cell
  await runButton.click();
  
  // assert cell ran
  await assertText(frame, "60");

  process.exit();
})();