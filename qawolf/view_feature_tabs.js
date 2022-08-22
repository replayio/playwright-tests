const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // go to home page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://replay.io');
  
  // assert page loaded
  await assertText(page, "Login");
  
  // scroll to DevTools
  await page.click('[role="tab"] >> text=Console');
  
  // assert viewing console
  await assertText(page, "Inspect messages and events in the Console Panel");
  
  // select debugger
  await page.click('[role="tab"]:has-text("Debugger")');
  
  // assert viewing debugger
  await assertText(page, "Inspect application state with print statements");
  
  // select React
  await page.click('[role="tab"]:has-text("React")');
  
  // assert viewing React
  await assertText(page, "Inspect React Components");
  
  // select network
  await page.click('[role="tab"]:has-text("Network")');
  
  // assert viewing network
  await assertText(page, "COMING SOON");
  await assertText(page, "Inspect Resource Timings");
  
  // select elements
  await page.click('[role="tab"]:has-text("Elements")');
  
  // assert viewing elements
  await assertText(page, "COMING SOON");
  await assertText(page, "Inspect visuals with the Elements Panel");

  process.exit();
})();