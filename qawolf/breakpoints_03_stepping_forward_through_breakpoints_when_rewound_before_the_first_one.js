const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "breakpoints-03 - Stepping forward through breakpoints when rewound before the first one";

  // Title from repo: Test stepping forward through breakpoints when rewound before the first one
  const { browser, context, page } = await launchForBreakpoints();
  
  const url = "doc_rr_basic.html";
  
  await openDevToolsTab(page);
  
  await addBreakpoint(page, { lineNumber: 9, url });
  
  // Rewind to when the point was hit
  await rewindToLine(page, { url, lineNumber: 9 });
  
  // Rewind further (past the first hit)
  await rewindToLine(page, { url });
  
  await removeBreakpoint(page, { lineNumber: 9, url });
  
  await addBreakpoint(page, { lineNumber: 21, url });
  await resumeToLine(page, { url, lineNumber: 21 });
  await executeAndVerifyTerminalExpression(page, "number", "1");
  await resumeToLine(page, { url, lineNumber: 21 });
  await executeAndVerifyTerminalExpression(page, "number", "2");

  process.exit();
})();