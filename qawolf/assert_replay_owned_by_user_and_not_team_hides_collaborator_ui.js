const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Assert replay owned by user and not team hides collaborator UI";

  // log in
  const { page } = await logIn({ userId: 6 });
  await assertText(page, 'Library');
  
  // go to replay
  await page.click(':text("Test Permissions")');
  await page.click('text=www.qawolf.com/');
  
  // open share modal
  await page.click("text=ios_shareShare");
  
  // assert collaborator UI is present
  const emailInput = page.locator('[placeholder="Email address"]');
  const authorText = page.locator('text=Author');
  await expect(emailInput).toHaveCount(1);
  await expect(authorText).toHaveCount(1);

  process.exit();
})();