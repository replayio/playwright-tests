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
  await page.goto('https://replay.io', { waitUntil: "domcontentloaded" });
  
  // assert page loaded
  await expect(page.locator('text=The time-travel debugger from the future.')).toBeVisible();
  
  // wheel down to footer links
  await page.mouse.wheel(0, 30000);
  
  // view footer privacy policy
  await page.click('[href="/privacy-policy"]');
  await page.waitForTimeout(2000);
  
  // assert privacy policy
  await expect(page.locator('h1:has-text("Privacy Policy")')).toBeVisible();
  await expect(page.locator('text=EFFECTIVE DATE: 8 FEB 2023')).toBeVisible();
  await expect(page.locator('text=At Replay, we take your privacy seriously.')).toBeVisible();
  
  // close privacy policy
  await page.goBack();
  
  // wheel down to footer links
  await page.mouse.wheel(0, 30000);
  
  // view footer terms of service
  await page.click('[href="/terms-of-service"]');
  await page.waitForTimeout(2000);
  
  // assert terms of service
  await expect(page.locator('h1:has-text("Terms of Use")')).toBeVisible();
  await expect(page.locator('text=EFECTIVE DATE: 28 MAR 2023')).toBeVisible();
  await expect(page.locator('text=Please read on to learn the rules and restrictions that govern your use of our website(s)')).toBeVisible();

  process.exit();
})();