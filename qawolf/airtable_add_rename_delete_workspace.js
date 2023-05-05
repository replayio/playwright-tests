const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Airtable: Add, Rename, & Delete Workspace";

  // launch replay browser
  const { browser, context } = await launchReplay();
  
  // REQ305 Airtable: log in
  const { page } = await logInToAirtable();
  
  // clean test
  while (await page.locator("text=QA Workspace").count()) {
    await page.click(`h2:has-text("QA Workspace")`);
    await page.click(':text("Delete workspace")');
    await page.waitForTimeout(500);
    await page.click(':text("Delete workspace")');
    await page.waitForTimeout(500);
  }
  
  // REQ453 Airtable: Add workspace
  await page.click('[aria-label="homescreen scroll view"] [role="button"]');
  await page.click(':text("Create workspace")');
  const workspaceName = `QA Workspace ` + Date.now().toString().slice(-4);
  await page.fill('[aria-label="rename workspace"]', workspaceName);
  await page.keyboard.press("Enter");
  
  // assert workspace
  await expect(page.locator(`text=${workspaceName}`)).toHaveCount(2);
  
  // REQ454 Airtable: Rename workspace
  const renameWorkspaceName = `QA Workspace ` + Date.now().toString().slice(-4);
  await page.locator(`:text("${workspaceName}")`).last().click();
  await page.click(':text("Rename workspace")');
  await page.fill('[aria-label="rename workspace"]', renameWorkspaceName);
  await page.keyboard.press("Enter");
  
  // assert workspace
  await expect(page.locator(`text=${renameWorkspaceName}`)).toHaveCount(2);
  await expect(page.locator(`text=${workspaceName}`)).toHaveCount(0);
  
  // REQ455 Airtable: Delete workspace
  await page.click(`div h2 >> text="${renameWorkspaceName}"`);
  await page.click(':text("Delete workspace")');
  await page.waitForTimeout(500);
  await page.click(':text("Delete workspace")');
  await expect(page.locator(`text=${renameWorkspaceName}`)).toHaveCount(0);
  
  // list and upload the replay
  await uploadReplay();

  process.exit();
})();