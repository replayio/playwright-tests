const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Airtable: log in and search";

  // REQ305 Airtable: log in
  // MAINTENANCE NOTE: if test is showing human verification close out of all tabs manually then rerun
  const { page, browser, context } = await logInToAirtable();
  
  // // REQ304 Airtable: search for base
  await page.fill('[aria-label="Find a base or interface"]', "Awesome Base");
  await expect(page.locator('text=Bases matching "awesome base"')).toBeVisible();
  await expect(page.locator('[aria-label="Awesome Base"]')).toBeVisible();
  
  await browser.close() // very important to eliminate build up of browsers

  process.exit();
})();gn in")
  
  // search for base
  await page.fill('[aria-label="Find a base or interface"]', "Awes");
  
  // assert base exists
  await assertElement(page, '[aria-label="Awesome Base"]');

  process.exit();
})();