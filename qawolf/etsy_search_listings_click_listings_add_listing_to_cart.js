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
  // launch page
  // launch replay browser
  const { browser, context } = await launchReplay();
  // const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://www.etsy.com/');
  
  // assert page is loaded
  await assertText(page, "Sign in");
  
  // search for tables
  await page.fill("#global-enhancements-search-query", "tables");
  await page.press("#global-enhancements-search-query", "Enter");
  
  // click on listings
  const [multipage] = await Promise.all([
    context.waitForEvent("page"),
  
    // listings to be viewed
    await page.click(".listing-link >> nth=0"),
    await page.click(".listing-link >> nth=1")
  ]);
  
  await page.waitForTimeout(10 * 1000);
  let tabs = multipage.context().pages();
  
  // close extra tab
  await tabs[2].close();
  
  // set options for product
  var variationOptions1 = await multipage.$('#inventory-variation-select-0');
  if (variationOptions1) {
    await multipage.click("#inventory-variation-select-0");
    await multipage.press("#inventory-variation-select-0", "ArrowDown");
    await multipage.press("#inventory-variation-select-0", "Enter");
  };
  
  // set options for product
  var variationOptions2 = await multipage.$('#inventory-variation-select-1');
  if (variationOptions2) {
    await multipage.click("#inventory-variation-select-1");
    await multipage.press("#inventory-variation-select-1", "ArrowDown");
    await multipage.press("#inventory-variation-select-1", "Enter");
  };
  
  // set personalization message 
  var personalizationInput = await multipage.$('#personalization-input');
  if (personalizationInput) {
    await multipage.fill("#personalization-input", "Test");
  };
  
  // get product title
  var productTitle = await getValue(multipage, "h1");
  
  // add listing to cart
  await multipage.click("text=Add to cart");
  
  // assert added to cart
  await assertText(multipage, productTitle);
  
  // list and upload the replay
  await uploadReplay();

  process.exit();
})();