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
  await page.goto('https://udemy.com');
  
  // assert page loaded
  await assertText(page, "A broad selection of courses");
  
  // search courses
  await page.type('[placeholder="Search for anything"]', "JavaScript");
  await page.keyboard.press('Enter');
  await page.waitForTimeout(5000);
  
  // CAPTCHA

  process.exit();
})();