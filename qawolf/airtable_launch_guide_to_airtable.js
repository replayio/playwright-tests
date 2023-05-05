const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Airtable: Launch 'Guide to Airtable'";

  // launch replay browser
  const { browser, context } = await launchReplay();
  
  // REQ305 Airtable: log in
  const { page } = await logInToAirtable();
  
  // REQ469 Airtable: View 'Guide to Airtable' from user dashboard
  const [page2] = await Promise.all([
    page.waitForEvent("popup"),
    page.click(':text("Guide to Airtable")'),
  ]);
  
  await expect(page2).toHaveURL(/\/learning-and-resources/)
  await expect(page2.locator('text=Learning and resources')).toHaveCount(3);
  await expect(page2.locator("#doc_left_sidebar")).toBeVisible();
  
  // list and upload the replay
  await uploadReplay();

  process.exit();
})();