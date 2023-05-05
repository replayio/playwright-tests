const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Assert team recording's collaborator UI is shown to team member";

  // log in
  const { browser, page } = await logIn({ userId: 7 });
  await assertText(page, "Your Library");
  
  // go to team recording
  await page.click("text=Test Permissions");
  await page.click("text=Time Travel");
  
  // open share modal
  await page.click("text=ios_shareShare");
  
  // assert collaborator UI shown
  const emailInput = page.locator('[placeholder="Email address"]');
  const authorText = page.locator("text=Author");
  await expect(emailInput).toHaveCount(1);
  await expect(authorText).toHaveCount(1);
  

  process.exit();
})();