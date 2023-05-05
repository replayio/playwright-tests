const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "User role unable to: access billing, view api keys, delete team, edit team name";

  // log in
  const { browser, page } = await logIn({ userId: 7 });
  await assertText(page, "Your Library");
  
  // go to team settings
  // await page.click('[title="Test Permissions"]');
  await page.click(`:text("Test Permissions")`);
  await page.click("text=settings");
  
  // assert team seetings loaded
  await assertText(page, "Team Members");
  await assertText(page, "Chris Burton");
  
  // assert unable to access billing
  await expect(page.locator(`:text("Billing")`)).not.toBeVisible();
  
  // assert unable to access API keys
  await expect(page.locator(`:text("API Keys")`)).not.toBeVisible();
  
  // assert unable to delete team
  await expect(page.locator(`:text("Delete Team")`)).not.toBeVisible();
  
  // assert unable to change team name
  await page.click("text=Profile");
  await expect(page.locator('.space-y-4 input[type="text"]')).not.toBeVisible();
  

  process.exit();
})();