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
  // log in
  const { browser, page } = await logIn({ userId: 10 });
  await assertText(page, "Your Library");
  
  // go to team settings
  // await page.click('[title="Test Permissions"]');
  await page.click(':text("Test Permissions")');
  await page.click("text=settings");
  // NOTE: API Keys used to be under these settings below Team Members
  
  // assert team seetings loaded
  await assertText(page, "Team Members");
  await assertText(page, "Chris Burton");
  
  // go to api keys
  await page.click(".close");
  await page.click(':text("QA WolfView settings")');
  await expect(page.locator("text=API Keys").first()).toBeVisible();
  await page.click("text=API Keys");
  
  // assert api key view loaded
  await expect(page.locator("text=CREATE NEW API KEY")).toBeVisible();
  await expect(page.locator('[placeholder="API Key Label"]')).toBeVisible();
  await expect(page.locator("button:has-text('Add')").first()).toBeVisible();
  
  // close settings
  await page.click(".close");
  
  await logOut(page);
  

  process.exit();
})();