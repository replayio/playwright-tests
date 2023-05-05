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
  // log in
  const { browser, page } = await logIn({ userId:  7 });
  await expect(page.locator(':text("Your Library")').first()).toBeVisible();
  
  // go to team settings
  // await page.click('[title="Test Permissions"]');
  await page.click(`:text("Test Permissions")`);
  await page.click("text=settings");
  await page.waitForTimeout(2000); // give settings time to load
  
  // edit self role
  await page.click('[type="button"] >> text=User');
  
  // assert no role options
  await expect(page.locator('text=Leave')).toBeVisible();
  await expect(page.locator('text=Remove')).not.toBeVisible();
  // Only the role dropdown can be programmatically interacted with while open - no option to close
  await page.reload();
  
  // edit developer user
  await page.click("text=Test Permissions");
  await page.click("text=settings");
  await page.waitForSelector("text=Manage members");
  await page.click('text=Developer >> nth=0');
  
  // assert admin user role dropdown didn't open
  await expect(page.locator('text=Leave')).not.toBeVisible();
  await page.reload();
  
  // assert user unable to give access to anyone via email domain
  await page.waitForTimeout(3000);
  await page.click("text=settings >> nth=0");
  await expect(page.locator('text=Give access to anyone with a qawolf.com email address')).not.toBeVisible();
  
  // copy invite link
  await page.click('div:nth-of-type(4) input[type="text"]');
  const copiedLink = await page.evaluate(() => {
    return navigator.clipboard.readText();
  });
  
  // assert link copied
  await assertText(page, 'Copied');
  
  // go to copied link
  const page2 = await browser.newPage();
  await page2.goto(copiedLink);
  
  // assert copiedLink page loaded
  await expect(page2.locator('text=Replay').first()).toBeVisible();
  await expect(page2.locator('button >> text=Sign in with Google')).toBeVisible();

  process.exit();
})();