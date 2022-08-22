const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto(buildUrl("/recording/e64e05d0-7e55-4165-aa03-0e026335785a"), {
    timeout: 2 * 60 * 1000,
  });
  
  // assert page loaded
  await assertText(page, "Replay Example");
  await page.waitForTimeout(2000);
  
  // click to move to starting position
  await page.click(':text("Manuel Martín Fernández")');
  
  // get player time
  const progressLine = page.locator(".progress-line").last();
  let beforePlayTimestamp = await progressLine.getAttribute("style");
  await expect(beforePlayTimestamp.split(" ")[1]).toMatch(/96./);
  
  // play replay
  await page.click('button [src="/images/playback-play.svg"]');
  
  // wait for video to play 2s
  await page.waitForTimeout(2000);
  
  // pause replay
  await page.click('[src="/images/playback-pause.svg"]');
  
  // get player time after pausing
  let afterPlayTimestamp = await progressLine.getAttribute("style");
  await page.waitForTimeout(2000);
  expect(afterPlayTimestamp.split(" ")[1]).toMatch(/98./);
  
  // assert video played
  expect(beforePlayTimestamp).not.toEqual(afterPlayTimestamp);

  process.exit();
})();