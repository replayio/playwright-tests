const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "console_eval - Support global console evaluations";

  const { browser, context, page } = await launchForBreakpoints();
  
  await openDevToolsTab(page);
  await openConsolePanel(page);
  
  // in e2e tests replay always starts at the very end of the recording but at that point
  // console evaluations always fail, so we seek to the point of the last screenshot instead
  await seekToPreviousScreenshot(page);
  await page.waitForTimeout(2000);
  await executeAndVerifyTerminalExpression(page, "333", "333");
  
  await warpToMessage(page, "ExampleFinished", 7);
  await executeAndVerifyTerminalExpression(page, "number", "10");
  await executeAndVerifyTerminalExpression(
    page, "window.updateNumber", "ƒupdateNumber()"
  );

  process.exit();
})();