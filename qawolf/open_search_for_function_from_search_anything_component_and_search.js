const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Open search for function from search anything component and search";

  // log in
  const { page } = await logIn({ userId: 7 });
  await assertText(page, "Your Library");
  
  // go to replay
  // await page.click('[title="Test Permissions"]');
  await page.click(`:text("Test Permissions")`)
  
  // open replay
  await page.click('text=Time Travel');
  await page.click("text=ViewerDevTools");
  
  // open function search component
  const functionSearch = page.locator('[placeholder="Go to file…"]');
  const printWelcomeMessageFunction = page.locator('text=λonClick(button, number)');
  const functionText = page.locator('text=function printWelcomeMessage() {');
  await expect(functionSearch).not.toBeVisible();
  await expect(printWelcomeMessageFunction).not.toBeVisible();
  await expect(functionText).not.toBeVisible();
  await page.waitForTimeout(3000);
  await page.keyboard.press("Control+K");
  await page.click("text=Search for a functionCtrl+O");
  
  // assert function search component opened
  await expect(functionSearch).toBeVisible();
  
  // search for function
  await page.waitForTimeout(3000);
  await page.click("text=printWelcomeMessage");
  
  // assert function appeared
  await expect(printWelcomeMessageFunction).toBeVisible();
  await expect(functionText).toBeVisible();

  process.exit();
})();