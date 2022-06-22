const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://finviz.com/');
  
  // assert page loaded
  await assertText(page, "Login");
  
  // navigate to maps page
  await page.click("text=Maps");
  
  // click Google box
  

  process.exit();
})();