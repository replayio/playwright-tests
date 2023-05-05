const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "breakpoints-01 - Basic breakpoint functionality";

  // Title from repo: Test basic breakpoint functionality
  const { browser, context, page } = await launchForBreakpoints();
  
  const url = "doc_rr_basic.html";
  
  await openDevToolsTab(page);
  
  await addBreakpoint(page, { lineNumber: 21, url });
  
  await page.hover('[data-test-id="SourceLine-21"]');
  await page.click('[data-test-name="LogPointToggle"]');
  
  await rewindToLine(page, { url, lineNumber: 21 });
  await executeAndVerifyTerminalExpression(page, "number", "10");
  await rewindToLine(page, { url, lineNumber: 21 });
  await executeAndVerifyTerminalExpression(page, "number", "9");
  await rewindToLine(page, { url, lineNumber: 21 });
  await executeAndVerifyTerminalExpression(page, "number", "8");
  await rewindToLine(page, { url, lineNumber: 21 });
  await executeAndVerifyTerminalExpression(page, "number", "7");
  await rewindToLine(page, { url, lineNumber: 21 });
  await executeAndVerifyTerminalExpression(page, "number", "6");
  await resumeToLine(page, { url, lineNumber: 21 });
  await executeAndVerifyTerminalExpression(page, "number", "7");
  await resumeToLine(page, { url, lineNumber: 21 });
  await executeAndVerifyTerminalExpression(page, "number", "8");
  await resumeToLine(page, { url, lineNumber: 21 });
  await executeAndVerifyTerminalExpression(page, "number", "9");
  await resumeToLine(page, { url, lineNumber: 21 });
  await executeAndVerifyTerminalExpression(page, "number", "10");
  

  process.exit();
})();