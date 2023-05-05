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
  // launch replay browser
  const { browser, context } = await launchReplay();
  
  // launch page
  // const { context } = await launch();
  const page = await context.newPage();
  await page.goto(
    "https://docs.replay.io/"
  );
  
  // assert page load
  await assertText(page, "Docs");
  await expect(page.locator(':text("Search")').first()).toBeVisible(); // search bar is seen
  
  // search
  await page.click('[aria-label="Search"]');
  await page.waitForTimeout(6500);
  await page.type('[aria-label="Search input"]', "console", { delay: 100 });
  
  // assert search option
  await expect(
    page.locator('[role="option"] >> text=Console').first()
  ).toBeVisible();
  
  // navigate to search results
  await page.click('[role="option"]:has-text("Console")');
  
  // assert search results
  await assertText(page, "Console");
  
  // list and upload the replay
  await uploadReplay();
  

  process.exit();
})();