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