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
  // launch replay
  const { browser, context } = await launchReplay({ slowMo: 3000 });
  
  // login to pinterest
  const { page } = await logInToPinterest(context);
  
  // view pin
  await page.click('[data-test-id="pinrep-image"]');
  try {
    await expect(page.locator('text=Comment').first()).toBeVisible();
  } catch {
    await expect(page.locator('text=Comments').first()).toBeVisible();
  };
  
  await page.waitForTimeout(1000);
  await page.click('[data-test-id="header-background"] [aria-label="Home"]');
  
  // view 5 more pins
  for (i=1; i<5; i++) {
    if (await page.locator(`[data-test-id="pinWrapper"] >> nth=${i} >> :has([data-test-id="one-tap-desktop"])`).count()) {
      i++;
    }
    await page.click(`[data-test-id="pinrep-image"] >> nth=${i}`);
    await expect(page.locator('text=Comments').first()).toBeVisible();
    await page.waitForTimeout(1000);
    await page.click('[data-test-id="header-background"] [aria-label="Home"]');
  }
  
  // list and upload the replay
  await uploadReplay();
  

  process.exit();
})();