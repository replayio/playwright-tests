const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 10 });
  await assertText(page, 'Library');
  
  // go to recording
  // await page.click('[title="Test Permissions"]');
  await page.click(':text("Test Permissions")');
  await page.click('text=Time Travel');
  
  // assert recording loaded
  await assertText(page, 'Time Travel');
  await assertText(page, 'DevTools');
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // hide video to expose more console entries
  await page.click("text=videocam_off");
  
  // assert DevTools loaded
  await assertText(page, 'Console');
  
  // get current player head time
  const progressLine = page.locator(".progress-line").last();
  let playheadPosition = await progressLine.getAttribute("style");
  expect(playheadPosition.split(" ")[1]).toEqual("8.02173%;");
  
  // fast forward from console
  const discordElement = page.locator('text=Say "hi" in Discord! replay.io/discord');
  await discordElement.hover({ force: true });
  await page.click('[data-message-id="6"] .img');
  
  // assert play head moved forward
  let playheadPosition = await progressLine.getAttribute("style");
  expect(playheadPosition.split(" ")[1]).toEqual("72.5791%;");
  
  // rewind playhead from console
  const button1 = page.locator('[data-link-actor-id="1. Clicking on a console message"]');
  await button1.hover({ force: true });
  await page.click('[data-message-id="2"] .img');
  
  // assert play head moved back
  let playheadPosition = await progressLine.getAttribute("style");
  expect(playheadPosition.split(" ")[1]).toEqual("72.5791%;");

  process.exit();
})();