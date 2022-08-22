const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 10 });
  await assertText(page, 'Library');
  
  // go to recording
  await page.goto(buildUrl('/recording/hello-world--aae188fb-57d2-46af-a23a-0adba3ed0687'));
  
  // assert recording loaded
  await assertText(page, 'Hello World!');
  await assertText(page, 'DevTools');
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await assertText(page, 'Console');
  
  // get current player head time
  const progressLine = page.locator(".progress-line").last();
  let playheadPosition = await progressLine.getAttribute("style");
  expect(playheadPosition.split(" ")[1]).toEqual("12.6563%;");
  
  // open source
  await page.click('[role="tree"] >> text=utils.js');
  
  // assert utils.js opened
  const newPromises = page.locator('text=return new Promise(resolve => {');
  await expect(newPromises).toHaveCount(1);
  await page.waitForTimeout(3000);
  
  // add print statement
  await newPromises.hover({ force: true });
  await page.click("text=add", { delay: 500 });
  const callStackPane = page.locator('.call-stack-pane');
  await expect(callStackPane).toHaveCount(0);
  
  // advance call stack
  const fastForwardButton = page.locator('[title="Jump Forward (to next hit)"]');
  const rewindButton = page.locator('[title="Jump Back (to previous hit)"]');
  await expect(fastForwardButton).toHaveCount(1);
  await expect(rewindButton).toHaveCount(0);
  for (let i = 0; i < 21; i++) {
    await fastForwardButton.click();
  };
  
  // assert callstack moved forward
  let playheadPosition2 = await progressLine.getAttribute("style");
  expect(playheadPosition2.split(" ")[1]).toEqual("77.6805%;");
  await expect(fastForwardButton).toHaveCount(0);
  
  // rewind callstack
  await expect(rewindButton).toHaveCount(1);
  for (let i = 0; i < 20; i++) {
    await rewindButton.click();
  };
  
  // assert callstack moved backward
  let playheadPosition3 = await progressLine.getAttribute("style");
  expect(playheadPosition3.split(" ")[1]).toEqual("22.1121%;");
  
  // open call stack
  await page.click("text=motion_photos_paused");
  
  // assert callstack panel opened
  await expect(callStackPane).toHaveCount(1);

  process.exit();
})();