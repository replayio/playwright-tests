const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  const { browser, context, page } = await launchForBreakpoints();
  
  await openDevToolsTab(page);
  await openConsolePanel(page);
  
  // in e2e tests replay always starts at the very end of the recording but at that point
  // console evaluations always fail, so we seek to the point of the last screenshot instead
  await seekToPreviousScreenshot(page);
  await page.waitForTimeout(2000);
  await executeAndVerifyTerminalExpression(page, "333", "333");
  
  await warpToMessage(page, "ExampleFinished", 7);
  await executeAndVerifyTerminalExpression(page, "number", "10");
  await executeAndVerifyTerminalExpression(
    page, "window.updateNumber", "ƒupdateNumber()"
  );

  process.exit();
})();