const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Developer role search for anything: function";

  // log in
  const { page } = await logIn({ userId: 10 });
  await assertText(page, "Your Library");
  
  // go to replay
  await page.click(':text("Test Permissions")');
  
  // open replay
  await page.click(':text-is("Time Travel")');
  await page.click("text=ViewerDevTools");
  
  // open full search bar from search for anything component
  const searchBar = page.locator('[placeholder="Go to file…"]');
  await expect(searchBar).not.toBeVisible();
  await page.keyboard.press("Control+K");
  await page.click(':text("Search for a functionCtrl+O")');
  
  // assert full search bar opened
  await expect(searchBar).toBeVisible();
  
  // search function
  await page.waitForTimeout(2000);
  await searchBar.fill('@initialize');
  await page.waitForTimeout(2000); // give search time to populate
  await page.click(':text("initialize")');
  
  // assert searched term results
  // await expect(page.locator('.CodeMirror-code [role="presentation"]').first()).toBeVisible();
  await page.click('[data-test-id="SourceLine-11"] :text("initialize")');
  await expect(page.locator('text="initialize"')).toHaveCount(2);
  
  // search for function using Ctrl+Shift+O
  await page.click('[title="Close tab"]');
  await expect(searchBar).not.toBeVisible();
  await page.keyboard.press('Control+O')
  await expect(searchBar).toBeVisible();
  
  // search function off shortcut ( bug? )
  await searchBar.fill('@initialize');
  await page.click(':text("initialize")');
  await page.waitForTimeout(2000); // give search time to populate
  
  // assert searched term results
  // await expect(page.locator('.CodeMirror-code [role="presentation"]').first()).toBeVisible();
  await page.click('[data-test-id="SourceLine-11"] :text("initialize")');
  await expect(page.locator('text="initialize"')).toHaveCount(2);

  process.exit();
})();