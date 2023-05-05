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
  openPopup
} = require("./helpers");

(async () => {
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