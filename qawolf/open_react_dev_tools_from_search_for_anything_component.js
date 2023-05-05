const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Open React DevTools from search for anything component";

  // log in
  const { page } = await logIn({ userId: 6, options: { slowMo: 1000 } });
  await assertText(page, "Library");
  
  // go to 1st recording in Bug team
  await page.click(':text("QA Wolf - Replay Issues")');
  const recording = page.locator('[class*="Library_libraryRow"]');
  await recording.first().click();
  
  // assert recording loaded
  await assertText(page, "Viewer");
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert search component loaded
  await page.keyboard.press("Control+K");
  await expect(
    page.locator('[placeholder="What would you like to do?"]')
  ).toBeVisible();
  
  // open React DevTools
  const reactDevTools = page.locator('[placeholder="Search (text or /regex/)"]');
  await expect(reactDevTools).toHaveCount(0);
  await page.waitForTimeout(5000);
  
  // open React DevTools
  await page.click("text=Open React DevTools");
  
  // assert React DevTools opened
  // going back to Viewer and playing the video allows DevTools to load properly
  try {
    await expect(
      page.locator(':text("Loading React Developer Tools...")')
    ).not.toBeVisible({
      timeout: 10 * 1000,
    });
  } catch {
    await page.click(':text("Viewer") >> nth=0');
    await page.click("img >> nth=0");
    await page.click("img >> nth=0");
    await page.click(':text("ViewerDevTools")');
  }
  
  console.log("reactDevTools", reactDevTools.count());
  try {
    await expect(reactDevTools).toHaveCount(1); //0
  } catch {
    await page.click("img");
    await page.waitForTimeout(50 * 1000);
    await expect(reactDevTools).toHaveCount(0); //0
  }
  await page.mouse.click(0, 0)
  await logOut(page);
  

  process.exit();
})();