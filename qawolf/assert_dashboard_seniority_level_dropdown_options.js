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
  // helper
  const dashboardUrl = 'https://sheets.lido.app/lido-files/22d86489-9813-4fac-89ec-b30b432a80d7/share';
  
  // go to dashboard
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto(dashboardUrl);
  
  // assert dashboard loaded
  await page.waitForSelector('button >> text=Search');
  await expect(page.locator('text=Candidate search')).toBeVisible();
  // await page.waitForTimeout(45 * 1000); // give table time to load
  
  // open seniority dropdown
  await page.click('div:below(:text("Seniority level"))');
  await page.waitForSelector('[data-test-id="entrySelect"]');
  
  // assert dropdown options
  await expect(page.locator('[data-test-id="cxoSelect"] >> text=cxo')).toBeVisible();
  await expect(page.locator('[data-test-id="directorSelect"] >> text=director')).toBeVisible();
  await expect(page.locator('[data-test-id="managerSelect"] >> text=manager')).toBeVisible();
  await expect(page.locator('[data-test-id="vpSelect"] >> text=vp')).toBeVisible();
  await expect(page.locator('[data-test-id="seniorSelect"] >> text=senior')).toBeVisible();
  await expect(page.locator('[data-test-id="entrySelect"] >> text=entry')).toBeVisible();

  process.exit();
})();