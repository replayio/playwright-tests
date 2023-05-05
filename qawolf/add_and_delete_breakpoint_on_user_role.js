const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Add and delete breakpoint on user role";

  // log in
  const { page } = await logIn({ userId: 7 });
  await assertText(page, 'Library');
  
  // go to recording
  await page.click("text=Test Permissions");
  await page.click('text=Time Travel');
  
  // assert recording loaded
  await assertText(page, 'Time Travel');
  await assertText(page, 'DevTools');
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await expect(page.locator('[data-test-id="PanelButton-console"]')).toHaveText("Console")
  
  // open script.js file and breakpoint panel
  // await page.click("text=Search for fileCtrl+P");
  await page.keyboard.press('Control+P');
  await page.keyboard.type('s');
  await page.click('#result-list [role="option"]');
  await page.click("text=motion_photos_paused");
  
  // assert breakpoint panel opened
  await expect(page.locator('text=Click on a line number in the editor to add a breakpoint')).toBeVisible();
  
  // add breakpoint
  // await page.click("text=7");
  await page.waitForTimeout(5000);
  await page.click('[data-test-id="SourceLine-LineNumber-7"]');
  
  // assert breakpoint added
  await expect(page.locator('text=Click on a line number in the editor to add a breakpoint')).not.toBeVisible();
  await expect(page.locator('text=7:12')).toBeVisible();
  
  // delete breakpoint click 7 again
  await page.waitForTimeout(5000);
  await page.hover('[data-test-id="AccordionPane-Breakpoints"] :text("demo-script.js")');
  await page.click('[data-test-id="AccordionPane-Breakpoints"] [title="Remove all breakpoint from this source"]');
  
  // assert breakpoint deleted
  await expect(page.locator('text=Click on a line number in the editor to add a breakpoint')).toBeVisible();
  await expect(page.locator('text=7:12')).not.toBeVisible();

  process.exit();
})();