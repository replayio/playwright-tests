const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Airtable: Base - Create, Rename, & Delete View";

  // launch replay browser
  const { browser, context } = await launchReplay();
  
  // REQ305 Airtable: log in
  const { page } = await logInToAirtable();
  
  // navigate to designated workspace
  await page.click('[aria-label="Awesome Base"]');
  await page.waitForTimeout(2000);
  
  // clean test
  while (await page.locator("text=QA View").count()) {
    await page.click(`:text("QA View") >> nth=0`);
    await page.waitForTimeout(500);
    await page.click(':text("Delete view")');
    await page.waitForTimeout(500);
  }
  
  // REQ462 Airtable: Add view
  await page.click("#viewSidebarCreateView-Grid");
  const viewName = `QA View ` + Date.now().toString().slice(-4);
  await page.fill('[aria-label="Update view name"]', viewName);
  await page.keyboard.press("Enter");
  
  await expect(page.locator(`text=${viewName}`)).toHaveCount(2);
  
  // REQ463 Airtable: Rename View
  await page.click(`:text("${viewName}")`);
  await page.click(':text("Rename view")');
  
  const renameView = `QA View ` + Date.now().toString().slice(-4);
  await page.fill('[data-testid="View sidebar toggle hover zone"] [aria-label="rename view"]', renameView);
  await page.keyboard.press("Enter");
  
  await expect(page.locator(`text=${renameView}`)).toHaveCount(2);
  await expect(page.locator(`text=${viewName}`)).toHaveCount(0);
  
  // REQ465 Airtable: Delete view
  await page.click(`:text("${renameView}")`);
  await page.click(':text("Delete view")');
  
  await expect(page.locator(`text=${renameView}`)).toHaveCount(0);
  await expect(page.locator(`text=${viewName}`)).toHaveCount(0);
  
  // list and upload the replay
  await uploadReplay();

  process.exit();
})();