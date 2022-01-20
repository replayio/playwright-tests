const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,logIn,logInToFacebook,parseInviteUrl,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://natto.dev/');
  
  // assert page loaded
  await assertText(page, "welcome!");
  
  // hover over menu
  await page.hover("text=natto.dev");
  
  // navigate to weather
  await page.click("text=weather");
  
  // assert weather page
  await assertText(page, "weather.gov");
  
  // grab iframe
  var frame = await (await page.waitForSelector('#sandbox-iframe')).contentFrame();
  
  // give time for frame to load
  await page.waitForTimeout(5000);
  const runButton = await frame.$('button span:has-text("run")');
  
  // run cell
  await runButton.click();
  
  // assert cell ran
  await assertText(frame, "@context");

  process.exit();
})();