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
  const { page } = await logIn({ userId: 6 });
  await expect(page.locator('text="Your Library"')).toHaveCount(2);
  await page.click(':text("Test Team")');
  
  // go to recording
  await page.locator(`:text-is("Great Scott")`).click();
  
  // assert recording loaded
  await expect(page.locator('text="Great Scott"')).toBeVisible({
    timeout: 30 * 1000,
  });
  await expect(page.locator('text="DevTools"')).toBeVisible();
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await expect(page.locator('text="Console"')).toBeVisible();
  
  // open privacy info
  const privacyInfoCookies = page.locator("text=Cookies");
  const privacyInfoStorage = page.locator("text=Local Storage");
  const privacyInfoScripts = page.locator("text=Executed Scripts");
  await expect(privacyInfoCookies).toHaveCount(0);
  await expect(privacyInfoStorage).toHaveCount(0);
  await expect(privacyInfoStorage).toHaveCount(0);
  await page.keyboard.press("Control+K");
  await page.click("text=Show Privacy");
  
  // assert privacy info opened
  await expect(privacyInfoCookies).toHaveCount(1);
  await expect(privacyInfoStorage).toHaveCount(1);
  await expect(privacyInfoStorage).toHaveCount(1);
  await page.mouse.click(0, 0);
  
  // show sharing options
  await page.click(':text("ios_shareShare")');
  await expect(page.locator('text="Add People"')).toBeVisible();
  await expect(page.locator('text="Privacy Settings"')).toBeVisible();
  await expect(page.locator('text="Copy Link"')).toBeVisible();
  await page.mouse.click(0, 0);
  await expect(page.locator('text="Add People"')).toHaveCount(0);
  await expect(page.locator('text="Privacy Settings"')).toHaveCount(0);
  await expect(page.locator('text="Copy Link"')).toHaveCount(0);
  

  process.exit();
})();