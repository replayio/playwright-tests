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
  await page.goto('https://replay.io');
  
  // assert page loaded
  await expect(page.locator('text=The time-travel debugger from the future.')).toBeVisible();
  
  // wheel down to footer links
  await page.mouse.wheel(0, 30000);
  
  // view footer docs
  const [page2] = await Promise.all([
    page.waitForEvent("popup"),
    page.click('[href="https://docs.replay.io/"]'),
  ]);
  await page2.waitForLoadState("domcontentloaded");
  await page2.bringToFront();
  
  // assert docs
  await assertText(page2, "Docs");
  await assertText(page2, "Guides");
  await assertText(page2, "Learn More");
  
  // close docs
  await page2.close();
  
  // view GitHub issues
  const [page3] = await Promise.all([
    page.waitForEvent("popup"),
    page.click('[href="https://github.com/replayio"]'),
  ]);
  await page3.waitForLoadState("domcontentloaded");
  await page3.bringToFront();
  
  // assert GitHub
  await expect(page3).toHaveURL("https://github.com/replayio");
  
  // close GitHub
  await page3.close();
  
  // view contact us
  var contactUsLocator = page.locator('.footer_nav__Wxyub [href="mailto:hey@replay.io"]');
  var link = await contactUsLocator.getAttribute('href');
  
  // assert contact us
  assert(link.includes("mailto:hey@replay.io"));

  process.exit();
})();