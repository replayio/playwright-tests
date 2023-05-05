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