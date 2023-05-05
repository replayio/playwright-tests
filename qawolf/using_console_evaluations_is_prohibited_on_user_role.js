const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Using console evaluations is prohibited on user role";

  // log in
  const { page } = await logIn({ userId: 7 }); // User
  
  // Do not leave enabled - for debugging only! **************************
  // const { page } = await logIn({ userId: 10 }); // Developer for debugging
  // *********************************************************************
  
  await assertText(page, "Your Library");
  
  // go to replay
  await page.click(':text("Test Permissions")');
  
  // open replay
  await page.click(":text-is('Time Travel')");
  await page.click("text=ViewerDevTools");
  
  // check for role message
  const consoleInput = page.locator(
    '[data-test-id="ConsoleTerminalInput"]'
  );
  // remove suite ID if test fails here
  await expect(consoleInput).toHaveText(
    "Only 'Developer'-role users can evaluate expressions"
  );
  
  // try to enter console evaluation
  await consoleInput.click();
  await expect(consoleInput).toHaveText(
    "Only 'Developer'-role users can evaluate expressions"
  );
  

  process.exit();
})();