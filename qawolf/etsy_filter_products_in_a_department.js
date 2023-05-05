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
  // const { context, browser } = await launch();
  const page = await context.newPage();
  
  // nav to site
  await page.goto('https://etsy.com/');
  await expect(page.locator(':text("Popular gifts right now")')).toBeVisible();
  
  // REQ493 Etsy: Navigate to a Department
  await page.hover(':text("Craft Supplies")');
  await page.click(':text("Gardening & Plants")');
  await expect(page.locator(':text("Gardening & Plants") >> nth=2')).toBeVisible();
  
  // REQ494 Etsy: Filter Products
  // "estimated arrival" - pick a suggested date
  await page.click(':text("Estimated Arrival Any time")');
  await page.waitForTimeout(1000);
  const suggestedDate = await page.innerText('a label:above(:text("Custom date")) >> nth=1');
  await page.click('a label:above(:text("Custom date")) >> nth=1');
  await expect(page.locator(`:text("Estimated Arrival ${suggestedDate}")`)).toBeVisible();
  
  // "estimated arrival" - pick a custom date
  await page.click(`:text("Estimated Arrival ${suggestedDate}")`);
  await page.waitForTimeout(1000);
  await page.click('[aria-label="Select custom date"]');
  await page.keyboard.type("By ");
  await page.keyboard.press("Enter");
  await expect(page.locator(':text("Estimated Arrival By ")')).toBeVisible();
  
  // reset to arrival to "any time"
  await page.click(':text("Estimated Arrival By ")');
  await page.click('a label:has-text("Any time")');
  await expect(page.locator(':text("Estimated Arrival Any time") >> nth=0')).toBeVisible();
  
  // "all filters"
  await page.click("#search-filter-button");
  
  // add 3 different filters
  await page.click('[aria-label="Select a price range"] [for="price-input-2"]');
  await page.click(':text("Black"):above(:text("Show more")) >> nth=0');
  await page.click('[for="shop-location-input-1"]');
  
  // apply
  await page.click('[aria-label="Apply"]');
  
  // assert filters
  await expect(page.locator(':text("$25 – $50")')).toBeVisible();
  const firstListingPrice = (await page.innerText('.listing-link >> nth=0'))
    .split("$")[1].substring(0, 5);
  expect(Number(firstListingPrice)).toBeGreaterThanOrEqual(25);
  expect(Number(firstListingPrice)).toBeLessThanOrEqual(50);
  await expect(page.locator(':text("Items from United States")')).toBeVisible();
  await expect(page.locator('[aria-label="Remove Black Filter"]')).toBeVisible();
  
  // grab two listings - can't grab first two because they're the sponsored ones
  const firstListingName = (await page.innerText('.listing-link >> nth=5'))
    .split(" |")[0];
  const secondListingName = (await page.innerText('.listing-link >> nth=6'))
    .split(" |")[0];
  
  // "sort by" - lowest price
  await page.click(':text("Sort by: Relevancy")');
  await page.click(':text("Lowest Price")');
  await expect(page.locator(':text("Sort by: Lowest Price")')).toBeVisible();
  
  // grab new "nth=5&6" listings
  let tempName1 = (await page.innerText('.listing-link >> nth=5'))
    .split(" |")[0];
  let tempName2 = (await page.innerText('.listing-link >> nth=6'))
    .split(" |")[0];
  
  // assert at least one of them is not in the same place
  try {
    expect(firstListingName).not.toEqual(tempName1);
  } catch {
    expect(secondListingName).not.toEqual(tempName2);
  }
  
  // "sort by" - most recent
  await page.click(':text("Sort by: Lowest Price")');
  await page.click(':text("Most Recent")');
  await expect(page.locator(':text("Sort by: Most Recent")')).toBeVisible();
  
  // grab new "nth=5&6" listings
  tempName1 = (await page.innerText('.listing-link >> nth=5'))
    .split(" |")[0];
  tempName2 = (await page.innerText('.listing-link >> nth=6'))
    .split(" |")[0];
  
  // assert at least one of them is not in the same place
  try {
    expect(firstListingName).not.toEqual(tempName1);
  } catch {
    expect(secondListingName).not.toEqual(tempName2);
  }
  
  // list and upload the replay
  await uploadReplay();

  process.exit();
})();