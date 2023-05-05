const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Open viewer from search anything component with user role";

  // log in
  const { page } = await logIn({ userId: 7 });
  await assertText(page, "Your Library");
  
  // go to replay
  // await page.click('[title="Test Permissions"]');
  await page.click(`:text("Test Permissions")`)
  
  // open replay
  await page.click('text=Time Travel');
  await page.click("text=ViewerDevTools");
  
  // open viewer
  const network = page.locator('header button >> text=Network');
  await expect(network).toBeVisible();
  await page.keyboard.press("Control+K");
  await page.click("text=Open Viewer");
  
  // assert viewer opened
  await expect(network).not.toBeVisible();

  process.exit();
})();