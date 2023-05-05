const {
  assert,
  assertElement,
  assertText,
  expect,
  faker,
  getInbox,
  getValue,
  launch,
  launchReplay,
  uploadReplay,
  assertNotElement,
  assertNotText,
  buildUrl,
  deleteTeam,
  getBoundingClientRect,
  getPlaybarTooltipValue,
  logIn,
  logInToFacebook,
  parseInviteUrl,
  setFocus,
  waitForFrameNavigated,
  bubbleLogin,
  superblocksLogin,
  navigateTo,
  openPopup,
  runCommand
} = require("./helpers");

(async () => {
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