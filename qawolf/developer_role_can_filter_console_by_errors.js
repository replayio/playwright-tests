const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Developer role can filter console by errors";

  // log in
  const { page } = await logIn({ userId: 7 });
  await assertText(page, "Library");
  
  // goto 'Playwright Test: Teams - Airtable'
  await page.click('[href="/recording/playwright-test-teams-airtable--69bdd408-b9bf-49a4-b914-608e92c026ce"]');
  
  // assert recording loaded
  await assertText(page, "Playwright Test: Teams - Airtable");
  await assertText(page, "DevTools");
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await assertText(page, "Console");
  
  // make sure the filter menu is expanded
  try {
    await expect(page.locator('[data-test-id="EventTypeFilterInput"]')).toBeVisible( {timeout: 10 * 1000});
  } catch {
    await page.click('[data-test-id="ConsoleMenuToggleButton"][title="Open filter menu"]');
    await expect(page.locator('[data-test-id="EventTypeFilterInput"]')).toBeVisible();
  }
  
  // ensure errors aren't checked
  await page.uncheck('[data-test-id="FilterToggle-errors"] #FilterToggle-errors');
  
  // assert errors not visible
  await expect(page.locator('[data-test-message-type="console-error"]').first()).not.toBeVisible();
  
  // show console errors
  await page.check('[data-test-id="FilterToggle-errors"] #FilterToggle-errors');
  
  // assert errors populated
  await expect(page.locator('[data-test-message-type="console-error"]').first()).toBeVisible();
  
  

  process.exit();
})();