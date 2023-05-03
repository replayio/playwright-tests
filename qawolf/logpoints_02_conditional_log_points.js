const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
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