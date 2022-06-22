const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // BUG - https://qa-wolf.monday.com/boards/2150171022/pulses/2783436171
  
  // log in and go to replay
  const { page } = await logIn({ userId: 7 });
  await page.goto(buildUrl('/recording/1000-hits--76ff5bc7-fcf7-459b-a711-86b1df46a6f4'));
  
  // assert replay loaded
  await assertText(page, "1000 hits");
  await assertElement(page, "#app-container .view-toggle");
  
  // open script.js
  await page.click("text=ViewerDevTools");
  await assertElement(page, "text=script.js");
  await page.click("text=script.js");
  
  // assert script.js opened
  await assertElement(page, "text=let count = 0;");
  
  // assert error message
  const addButton = page.locator('text=add');
  await page.hover('text=while');
  await assertElement(page, "text=1001 hits");
  await addButton.click();
  await assertElement(page, "text=Use Focus Mode to reduce the number of hits.");
  
  // assert console error
  const consoleError = page.locator('text=There are too many console messages so not all are being displayed');
  await expect(consoleError).toHaveCount(1);

  process.exit();
})();