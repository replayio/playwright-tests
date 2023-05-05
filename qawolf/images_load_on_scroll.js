const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Images Load on Scroll";

  // Arrange:
  // Log in
  const { page } = await logIn({slowMo: 1500});
  
  // View Library with more items then fit on screen
  await page.click(':text("QA Wolf - Replay Issues")');
  await expect(page.locator(':text("QA Wolf - Replay Issues(")')).toBeVisible();
  await page.waitForTimeout(5000);
  
  // Assert:
  // Before scroll, all images visible load in
  const imgCount1 = await page.locator('[class="lazyload-wrapper "] img').count();
  expect(imgCount1).toEqual(9);
  
  // Act:
  // Scroll down to view more items
  await page.hover(':text("Private") >> nth=0');
  await page.mouse.wheel(0, 1000);
  await page.waitForTimeout(2000);
  
  // Assert:
  // After scroll, newly visible images load in
  const imgCount2 = await page.locator('[class="lazyload-wrapper "] img').count();
  expect(imgCount2).toBeGreaterThan(imgCount1);
  
  // grab variables
  const rowCount = await page.locator('.border-chrome').count();
  const totalReplays = Number((await page.innerText(
    '.font-semibold')).split("(")[1].replace(")", ""));
  
  // scroll to bottom
  await page.locator(
    `.border-chrome >> nth=${rowCount - 1}`
  ).scrollIntoViewIfNeeded();
  await page.waitForTimeout(5000);
  
  // ensure that all images are loaded
  // scroll back to top
  
  await page.locator('[href="/recording/time-travel--9b410334-a4d6-48b8-9cf9-116077e1ef37"]').scrollIntoViewIfNeeded();
  const imgCount3 = page.locator('[class="lazyload-wrapper "] img');
  await page.mouse.wheel(0, 5000);
  await page.waitForTimeout(3000);
  expect ( await imgCount3.count()).toEqual(totalReplays);
  

  process.exit();
})();