const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Developer role search for anything: full text";

  //Maintenance Context: https://qawolfhq.slack.com/archives/C02K01LSEAE/p1661361991936259
  
  // log in
  const { page } = await logIn({ userId: 10 });
  await assertText(page, "Your Library");
  
  // go to replay
  // await page.click('[title="Test Permissions"]');
  await page.click(':text("Test Permissions")');
  
  // open replay
  await page.click('text=Time Travel');
  await page.click("text=ViewerDevTools");
  
  // open full search bar from search for anything component
  const searchBar = page.locator('[data-test-id="SearchFiles-Input"]');
  await expect(searchBar).not.toBeVisible();
  await page.keyboard.press("Control+K");
  await page.click("text=Search full textCtrl+Shift+F");
  
  // assert full search bar opened
  await expect(searchBar).toBeVisible();
  
  // search files
  const demoText = page.locator('[data-test-id="leftSidebar"] [data-test-name="SearchFiles-ResultRow"][data-test-type="Match"]:has-text("background-image")');
  const demoFile = page.locator('[data-test-filename="demo-script.js"] [data-test-name="ExpandablePreview"]:has-text("demo-script.js (demo)")');
  await expect(demoFile).not.toBeVisible();
  await searchBar.fill('demo');
  await page.waitForTimeout(1000);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000); // give search time to populate
  
  // assert searched term results
  expect(await demoText.count()).toBeGreaterThan(0);
  await expect(demoFile).toBeVisible();

  process.exit();
})();