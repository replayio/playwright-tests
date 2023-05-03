const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { context, page } = await logIn({ userId: 6 });
  
  // assert page loaded
  await assertText(page, 'Your Library');
  await assertText(page, 'View settings');
  
  // goto test team
  await page.click(':text("Test Permissions")');
  
  // go to replay "Great Scott"
  await page.click(':text("Permissions: Great Scott")');
  
  // assert viewing events
  try {
    await assertText(page, "static.replay.io/demo/", { timeout: 10 * 1000 });
  } catch (e) {
    await page.click("text=info");
    await assertText(page, "Replay Info");
    await assertText(page, "Events");
    await assertText(page, "static.replay.io/demo/", { timeout: 10 * 1000 });
  }
  
  // click event @ :02s
  await page.click(':text("ads_clickClick0:02")');
  
  // assert playhead moved to :02s
  const progressLine = page.locator(".progress-line").last();
  let playheadPosition = await progressLine.getAttribute("style");
  expect(playheadPosition.split(" ")[1]).toEqual("35.253%;");
  
  // click event @ :03s
  await page.click("text=ads_clickClick0:03");
  
  // assert playhead moved to :03s
  let playheadPosition = await progressLine.getAttribute("style");
  expect(playheadPosition.split(" ")[1]).toEqual("56.25%;");

  process.exit();
})();