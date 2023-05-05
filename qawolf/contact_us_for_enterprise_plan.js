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
  await page.goto("https://www.replay.io/pricing");
  
  // assert page loaded
  await assertText(page, "Login");
  
  // navigate to enterprise plan
  await page.click(".plans_tabs__uqDtX button:nth-of-type(4)");
  await page.waitForTimeout(6000);
  var buttonLocator = page.locator("#Enterprise a").nth('0');
  var buttonLink = await buttonLocator.getAttribute('href');
  
  // assert link opens mailto
  assert(buttonLink.includes("mailto:sales@replay.io"));

  process.exit();
})();