const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://www.replay.io/');
  
  // assert page looded
  await assertText(page, "Your time travel debugger");
  await assertText(page, "Record, Collaborate, Inspect");
  
  // go to pricing page
  await page.click("text=Pricing");
  
  // assert pricing page loaded
  await assertText(page, 'Pricing');
  await assertText(page, 'Sign Up');
  
  // sign up for free plan
  await page.click("text=Sign Up");
  await page.click("button:has-text('Sign')");
  
  // assert Google sign in page loaded
  await assertText(page, 'Sign in with Google');
  await assertText(page, 'to continue to Replay');

  process.exit();
})();