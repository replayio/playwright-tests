const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto("https://www.replay.io/pricing");
  
  // assert page loaded
  await assertText(page, "Login");
  
  // navigate to enterprise plan
  var buttonLocator = page.locator("text=Email Us").nth('0');
  var buttonLink = await buttonLocator.getAttribute('href');
  
  // assert link opens mailto
  assert(buttonLink.includes("mailto:sales@replay.io"));

  process.exit();
})();