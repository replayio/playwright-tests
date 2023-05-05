const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "logpoints-01 - Log-points appear in the correct order and allow time warping";

  const { browser, context, page } = await launchForBreakpoints();
  
  const url = "doc_rr_basic.html";
  
  await openDevToolsTab(page);
  
  await addBreakpoint(page, { lineNumber: 20, url });
  await addLogpoint(page, {
    content: '"Logpoint Number " + number',
    lineNumber: 20,
    url,
  });
  
  await addLogpoint(page, {
    content: '"Logpoint Beginning"',
    lineNumber: 9,
    url,
  });
  
  await addLogpoint(page, {
    content: '"Logpoint Ending"',
    lineNumber: 7,
    url,
  });
  
  await openConsolePanel(page);
  
  const loadingMessages = await findConsoleMessage(page, "Loading", "log-point");
  await expect(loadingMessages).toHaveCount(0);
  
  const logPointMessages = await findConsoleMessage(page, "Logpoint", "log-point");
  await expect(logPointMessages).toHaveCount(12);
  await expect(logPointMessages.first()).toHaveText(/Beginning/);
  await expect(logPointMessages.last()).toHaveText(/Ending/);
  
  const message = await findConsoleMessage(page, "Number 5", "log-point");
  await seekToConsoleMessage(page, message);
  
  await executeAndVerifyTerminalExpression(page, "number", "5");
  await reverseStepOverToLine(page, 19);
  
  await resumeToLine(page, { url, lineNumber: 20 });

  process.exit();
})();