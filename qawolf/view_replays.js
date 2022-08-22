const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://replay.io');
  
  // assert page loaded
  await assertText(page, "Your time travel debugger");
  var replayLinks = await page.$$("text=View in Replay");
  
  // navigate to replay links
  const [multiPage] = await Promise.all([
    context.waitForEvent("page"),
    replayLinks.forEach((link) => {
      link.click();
    })
  ]);
  
  await multiPage.waitForLoadState('networkidle');
  
  // get tabs
  let tabs = multiPage.context().pages();
  
  // assert viewing Hello World replay
  await assertText(tabs[2], "Hello World!");
  await assertText(tabs[2], "Sign In");
  
  // assert comment on Hello World replay
  await assertText(tabs[2], "Looks like this isn't effecting anything");
  
  // close tab
  await tabs[2].close();
  
  // assert viewing Climatescape replay
  await assertText(tabs[1], "Climatescape");
  await assertText(tabs[1], "Sign In");
  
  // assert comment on Climatescape replay
  await assertText(tabs[1], "SAF+ shows up twice");

  process.exit();
})();