const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Developer role search for anything: file";

  // log in
  const { page } = await logIn({ userId: 6, options: { slowMo: 1000 } });
  await assertText(page, "Your Library");
  
  // go to replay
  // await page.click('[title="Test Permissions"]');
  await page.click(':text("Test Permissions")');
  
  // open replay
  await page.click("text=Time Travel");
  await page.click("text=ViewerDevTools");
  
  // click search tab
  await page.click(".search button");
  
  // search files
  await page.fill('[data-test-id="leftSidebar"] [data-test-id="SearchFiles-Input"]', "demo");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000); // give search time to populate
  
  // assert searched term results
  await expect(page.locator('text="12 results"')).toBeVisible();
  

  process.exit();
})();