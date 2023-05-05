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
  const { browser, page } = await logIn({ userId: 10 });
  await expect(page.locator(':text("Your Library")').first()).toBeVisible();
  
  // go to team settings
  // await page.click('[title="Test Permissions"]');
  await page.click(':text("Test Permissions")');
  await page.click("text=settings");
  await page.waitForTimeout(2000); // give settings time to load
  
  // edit user role
  await page.click('[type="button"] >> text=User');
  
  // assert role options
  await expect(page.locator('[role="menu"] .permissions-dropdown-item >> text=User')).toBeVisible();
  await expect(page.locator('[role="menu"] .permissions-dropdown-item >> text=Developer')).toBeVisible();
  await expect(page.locator('text=Remove')).toBeVisible();
  
  // Only the role dropdown can be programmatically interacted with while open - no option to close
  await page.reload();
  
  // edit admin user
  await page.click("text=Test Permissions");
  await page.click("text=settings");
  await page.waitForSelector("text=Manage members");
  await page.click('text=Developer >> nth=0');
  
  // assert user unable to give access to anyone via email domain
  await page.reload();
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