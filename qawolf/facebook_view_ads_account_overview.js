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
  // log in to Facebook
  const { page } = await logInToFacebook(
    process.env.FACEBOOK_EMAIL_4,
    process.env.FACEBOOK_PASSWORD_4
  );
  await assertText(page, "David");

  // go to ads manager
  await page.goto(
    "https://adsmanager.facebook.com/ads/manager/account_settings/account_billing/?act=232754385888419&pid=p1&page=account_settings&tab=account_billing_settings"
  );

  // view account overview
  await assertText(page, "Add payment method");

  // view settings page
  await page.click('[aria-label="Global Scope Selector"]');
  await page.click('[href="/ads/manager/account_settings/"]');
  await assertText(page, "Ad Account Setup");

  // expand sidebar
  const tools = page.locator('[aria-label="Tools"]');
  const toolsText = tools.locator("xpath=..");
  await expect(toolsText).toContainText("Ad accounts");

  // collapse sidebar
  await page.click("text=Collapse​");
  await expect(page.locator("text=Ad account settings")).not.toBeVisible(); // aria labels still visible, need to use this to confirm collapsed

  // upload replay
  await uploadReplay(page);

  process.exit();
})();
