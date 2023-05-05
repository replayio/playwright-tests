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
  await page.goto('https://replay.io', {timeout: 60000});
  
  // assert page loaded
  await expect(page.locator('text=The time-travel debugger from the future.')).toBeVisible();
  
  // wheel down to bottom of page
  await page.mouse.wheel(0, 30000);
  
  // view footer about
  await page.click('.footer_nav__Wxyub [href="/about"]');
  
  // assert about
  await assertText(page, "About Replay");
  await assertText(page, "Learn where Replay is right now and where we are going next");
  
  // close about
  await page.goto('https://replay.io', {timeout: 60000});
  
  // wheel down to bottom of page
  await page.mouse.wheel(0, 30000);
  
  // view footer pricing
  await page.click('.footer_nav__Wxyub [href="/pricing"]');
  
  // assert viewing pricing
  await assertText(page, "Pricing");
  await expect(page.locator(':text("Individuals and open source communities will always be able to use Replay for free.")')).toBeVisible();
  
  // close tab
  await page.goto('https://replay.io', {timeout: 60000});
  
  // wheel down to bottom of page
  await page.mouse.wheel(0, 30000);
  
  // view footer we're hiring
  await page.click('.footer_nav__Wxyub [href="/about#jobs"]');
  
  // assert viewing we're hiring
  await assertText(page, "Join our journey");
  await assertText(page, "hiring@replay.io");
  
  // close tab
  await page.goto('https://replay.io', {timeout: 60000});
  
  // wheel down to bottom of page
  await page.mouse.wheel(0, 30000);
  
  // view footer values
  await page.click('[href="/about#values"]');
  
  // assert viewing values
  await assertText(page, "Replay here and now");
  await assertText(page, "We believe people understand what they can see");

  process.exit();
})();