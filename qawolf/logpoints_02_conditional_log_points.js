const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "logpoints-02 - Conditional log-points";

  const { browser, context, page } = await launchForBreakpoints();
  
  const url = "doc_rr_basic.html";
  
  await openDevToolsTab(page);
  
  try {
    await addLogpoint(page, {
      condition: `number % 2 == 0`,
      content: '"Logpoint Number " + number',
      lineNumber: "20",
      url,
      });
  } catch {
    await addLogpoint(page, {
      condition: `number % 2 == 0`,
      content: '"Logpoint Number " + number',
      lineNumber: "20",
      url,
    });
  }
  
  await addLogpoint(page, {
    content: '"Logpoint Beginning"',
    lineNumber: "9",
    url,
  });
  
  await addLogpoint(page, {
    content: '"Logpoint Ending"',
    lineNumber: "7",
    url,
  });
  
  const logPointMessages = await findConsoleMessage(page, "Logpoint", "log-point");
  await expect(logPointMessages).toHaveCount(12); // 5 logs in the loop + beginning and end
  await expect(logPointMessages.first()).toHaveText(/Beginning/);
  await expect(logPointMessages.last()).toHaveText(/Ending/);

  process.exit();
})();