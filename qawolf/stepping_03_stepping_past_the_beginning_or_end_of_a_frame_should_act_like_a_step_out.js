const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "stepping-03 - Stepping past the beginning or end of a frame should act like a step-out";

  const { browser, context, page } = await launchForBreakpoints();
  
  const url = "doc_rr_basic.html";
  
  await openDevToolsTab(page);
  
  // Open doc_rr_basic.html
  await clickSourceTreeNode(page, "test");
  await clickSourceTreeNode(page, "examples");
  await clickSourceTreeNode(page, url);
  
  await addBreakpoint(page, { lineNumber: 20, url });
  
  await rewindToLine(page, { lineNumber: 20, url });
  await executeAndVerifyTerminalExpression(page, "number", "10");
  await reverseStepOverToLine(page, 19);
  await reverseStepOverToLine(page, 11);
  
  // After reverse-stepping out of the topmost frame we should rewind to the
  // last breakpoint hit.
  await reverseStepOverToLine(page, 20);
  await executeAndVerifyTerminalExpression(page, "number", "9");
  
  await stepOverToLine(page, 21);
  await stepOverToLine(page, 22);
  await stepOverToLine(page, 12);
  await stepOverToLine(page, 16);
  await stepOverToLine(page, 17);
  
  // After forward-stepping out of the topmost frame we should run forward to
  // the next breakpoint hit.
  await stepOverToLine(page, 20);
  await executeAndVerifyTerminalExpression(page, "number", "10");

  process.exit();
})();