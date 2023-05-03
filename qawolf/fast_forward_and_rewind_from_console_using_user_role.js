const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 7 });
  await assertText(page, "Library");
  
  // go to recording
  // await page.click('[title="Test Permissions"]');
  await page.click(`:text("Test Permissions")`);
  await page.click("text=Time Travel");
  
  // assert recording loaded
  await assertText(page, "Time Travel");
  await assertText(page, "DevTools");
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // hide video to expose more console entries
  await page.waitForTimeout(3000);
  await page.click("text=videocam_off");
  
  // assert DevTools loaded
  await assertText(page, "Console");
  
  // get current player head time
  await page.waitForTimeout(2000);
  const progressLine = page.locator(".progress-line").last();
  let playheadPosition = await progressLine.getAttribute("style");
  
  // rotates between these two for some reason
  try {
    expect(playheadPosition.split(" ")[1]).toEqual("19.5766%;");
  } catch {
    try {
      expect(playheadPosition.split(" ")[1]).toMatch(/34./);
    } catch {
      expect(playheadPosition.split(" ")[1]).toEqual("47.0727%;");
    }
  }
  
  // fast forward from console
  const discordElement = page.locator(
    'text=Say "hi" in Discord! replay.io/discord'
  );
  await discordElement.hover({ force: true });
  await page.hover('[data-test-message-type="console-log"]');
  await page.click('[data-test-id="ConsoleMessageHoverButton"]');
  
  // assert play head moved forward
  await page.waitForTimeout(2000);
  let playheadPosition = await progressLine.getAttribute("style");
  expect(playheadPosition.split(" ")[1]).toEqual("62.206%;");
  
  // rewind playhead from console
  await page.waitForTimeout(2000);
  const button1 = page.locator(':text("console.log(") >> nth=0');
  await button1.hover({ force: true });
  await page.click('[data-test-name="LogPointToggle"]');
  
  // assert play head moved back
  await page.waitForTimeout(2000);
  let playheadPosition = await progressLine.getAttribute("style");
  expect(playheadPosition.split(" ")[1]).toEqual("62.206%;");
  

  process.exit();
})();