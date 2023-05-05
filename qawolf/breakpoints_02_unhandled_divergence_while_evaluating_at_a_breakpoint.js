const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "breakpoints-02 - Unhandled divergence while evaluating at a breakpoint";

  // Title from repo: `Test unhandled divergence while evaluating at a breakpoint`
  const { browser, context, page } = await launchForBreakpoints();
  
  const url = "doc_rr_basic.html";
  
  await openDevToolsTab(page);
  
  await addBreakpoint(page, { lineNumber: 21, url });
  
  await page.hover('[data-test-id="SourceLine-21"]');
  await page.click('[data-test-name="LogPointToggle"]');
  
  await rewindToLine(page, { url, lineNumber: 21 });
  
  await executeAndVerifyTerminalExpression(page, "number", "10");
  await executeAndVerifyTerminalExpression(
    page,
    "dump(3)",
    `The expression could not be evaluated.`
  );
  await executeAndVerifyTerminalExpression(page, "number", "10");
  await executeAndVerifyTerminalExpression(
    page,
    "dump(3)",
    `The expression could not be evaluated.`
  );
  await executeAndVerifyTerminalExpression(page, "number", "10");
  await executeAndVerifyTerminalExpression(page, "testStepping2()", "undefined");
  

  process.exit();
})();