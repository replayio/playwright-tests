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
  // launch replay browser
  const { browser, context } = await launchReplay();
  const page = await context.newPage();
  await page.goto("https://ebay.com");
  
  // search iPhone
  await page.fill('[aria-label="Search for anything"]', "iPhone");
  await page.click('[type="submit"]');
  
  // assert search results
  await expect(page.locator(':text("Android")')).not.toBeVisible()
  await expect(page.locator("text=results for iPhone")).toBeVisible();
  
  // sort listings
  await page.click('[aria-label="Sort selector. Best Match selected."]');
  await page.click("text=Time: ending soonest");
  
  // assert sort listing
  await assertText(page, "Time: ending soonest");
  
  // navigate to listing
  const [popup] = await Promise.all([
    page.waitForEvent("popup"),
    page.click(".srp-results li.s-item a.s-item__link"),
  ]);
  await popup.waitForLoadState();
  
  // assert listing
  await assertText(popup, "iPhone");
  
  // list and upload the replay
  await uploadReplay();

  process.exit();
})();