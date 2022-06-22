const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto(buildUrl("/recording/99215af1-7f6f-4db2-84e4-7a2ea6142240?point=32127336818069823763437554336007621&time=16223&hasFrames=false"));
  
  // assert page loaded
  await assertText(page, "sample-folder");
  
  // go to comments
  await page.click("text=forum");
  
  // assert viewing comments
  await assertText(page, "Comments");
  
  // click comments
  await page.click("text=forum");
  await page.click(":text('Laura Cressman') >> nth=2");
  
  // get current playhead time
  const progressLine = page.locator(".progress-line").last();
  let playheadPosition = await progressLine.getAttribute("style");
  expect(playheadPosition.split(" ")[1]).toMatch(/46./);

  process.exit();
})();