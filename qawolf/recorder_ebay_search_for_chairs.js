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
  const { context } = await launch();
  const page = await context.newPage();
  
  // Navigate to www.ebay.com
  await page.goto("https://www.ebay.com");
  
  // Search for chairs
  await page.fill('[aria-label="Search for anything"]', "chairs");
  await page.click('[value="Search"]');
  
  // get text of first item
  const text = await page.innerText("ul a.s-item__link");
  
  // Select the first item
  const [page2] = await Promise.all([
    // wait for popup
    page.waitForEvent("popup"),
    // click first item
    page.click("ul .s-item__link"),
  ]);
  
  // assert title of item
  await expect(page2.locator('[data-testid="x-item-title"]')).toHaveText(
    text.split("\n")[0]
  );
  

  process.exit();
})();