const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "stepping-01 - Test basic step-over/back functionality";

  const { browser, context, page } = await launchForBreakpoints();
  
  const url = "doc_rr_basic.html";
  
  await openDevToolsTab(page);
  
  // Open doc_rr_basic.html
  await clickSourceTreeNode(page, "test");
  await clickSourceTreeNode(page, "examples");
  await clickSourceTreeNode(page, url);
  
  // Pause on line 20
  await addBreakpoint(page, { lineNumber: "20", url });
  await rewindToLine(page, { url });
  
  // Should get ten when evaluating number.
  await page.waitForTimeout(5000);
  await executeAndVerifyTerminalExpression(page, "number", "10");
  
  // Should get nine when stepping over.
  await reverseStepOver(page);
  await executeAndVerifyTerminalExpression(page, "number", "9");
  
  // Should get ten when stepping over.
  await stepOver(page);
  await executeAndVerifyTerminalExpression(page, "number", "10");

  process.exit();
})();