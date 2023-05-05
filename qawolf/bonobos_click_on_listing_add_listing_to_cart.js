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
  // "This page needs some tailoring..."

  // launch replay browser
  const { browser, context } = await launchReplay();

  // launch page
  const page = await context.newPage();
  await page.goto("https://bonobos.com/");

  // assert page loaded
  await assertText(page, "Sign In");

  // navigate to products
  await page.hover("text=Accessories");
  await page.click("text=Socks");

  // close modal pop up
  try {
    await page.waitForSelector('[aria-label="Close the Dialog Window"]');
    await page.click('[aria-label="Close the Dialog Window"]');
  } catch {}

  // select product
  await page.click(".product-tile-component", "nth=0");

  // get product title
  var productTitle = await getValue(page, ".summary-component h1");

  // add to cart
  await page.click('[aria-label="Add product to your shopping cart"]');

  // assert product added to cart
  await expect(
    page.locator(`[aria-label="${productTitle} thumbnail"]`)
  ).toBeVisible();
  await assertText(page, productTitle, { selector: ".line-item-component" });

  // list and upload the replay
  await uploadReplay(page);

  process.exit();
})();
