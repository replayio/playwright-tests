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
  const { context } = await launch();
  const page = await context.newPage();
  
  // Navigate to www.reddit.com
  await page.goto("https://www.reddit.com");
  
  // Search for a reddit community
  await page.fill("#header-search-bar", "python");
  await page.click('[href="/r/Python/"]');
  
  // View the Community
  await expect(
    page.locator('[data-testid="no-edit-description-block"]')
  ).toHaveText(
    `News about the programming language Python. If you have something to teach others post here.
     If you have questions or are a newbie use r/learnpython`
  );
  

  process.exit();
})();