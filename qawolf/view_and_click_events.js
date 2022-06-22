const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto(
    buildUrl(
      "/recording/sample-folder-visual-studio-code-insiders--99215af1-7f6f-4db2-84e4-7a2ea6142240?point=10384593718233283943681123422306591&time=4183&hasFrames=true"
    )
  );
  
  // assert page loaded
  await assertText(page, "sample-folder", { timeout: 3 * 60 * 1000 });
  
  // assert viewing events
  await page.click("text=info");
  await assertText(page, "Replay Info");
  await assertText(page, "Events");
  
  // click event @ :12s
  await page.click("text=ads_clickClick0:12", {force: true});
  
  // assert playhead moved to :12s
  const progressLine = page.locator(".progress-line").last();
  let playheadPosition = await progressLine.getAttribute("style");
  expect(playheadPosition.split(" ")[1]).toEqual("36.6793%;");
  
  // click event @ :28s
  await page.click("text=ads_clickClick0:28");
  
  // assert playhead moved to :28s
  let playheadPosition = await progressLine.getAttribute("style");
  expect(playheadPosition.split(" ")[1]).toEqual("84.0444%;");

  process.exit();
})();