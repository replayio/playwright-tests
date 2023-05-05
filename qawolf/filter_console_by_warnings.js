const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Filter console by warnings";

  /*
    This test needs a new recording. If it somehow gets pulled into a run and
    gets auto-marked as "Active" and subsequently fails, do not mark as "Bug"
    Just mark as maintenance.
    
    Removed CI tag 10/27
  */
  
  // log in
  const { page } = await logIn({ userId: 7 });
  await assertText(page, "Library");
  
  // go to recording
  await page.goto(
    buildUrl(
      "/recording/playwright-test-teams-airtable--69bdd408-b9bf-49a4-b914-608e92c026ce?point=144735274938938674723349946383212339&time=3528.62009569378&hasFrames=true"
    )
  );
  
  // assert recording loaded
  await assertText(page, "Playwright Test: Teams - Airtable", { timeout: 30 * 1000 }); // timeout for page to load);
  await assertText(page, "DevTools");
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await assertText(page, "Console");
  
  // filter console by warnings
  const warnings = page.locator('[data-test-message-type="console-warning"]');
  await expect(warnings).toHaveCount(0);
  try {
    await page.click("#FilterToggle-warnings", { timeout: 5000 });
  } catch {
    await page.click('[data-test-id="ConsoleMenuToggleButton"]');
    await page.click("#FilterToggle-warnings");
  }
  
  // get # of warnings
  const numOfWarnings = parseInt(await page.innerText('[class*=FilterToggles] [class*=FilterToggles]:has([data-test-id*="warnings"]) [class*="Badge_"]'));
  
  await page.waitForTimeout(3 * 1000); // needed to wait for warnings to load
  
  // assert warnings loaded
  await expect(warnings).toHaveCount(numOfWarnings, { timeout: 3 * 60 * 1000 }); //101
  
  // hide warnings
  await page.click("#FilterToggle-warnings");
  
  // assert warnings hid
  await expect(warnings).toHaveCount(0);
  

  process.exit();
})();