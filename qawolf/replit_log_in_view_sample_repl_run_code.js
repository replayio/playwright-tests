const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://replit.com/site/pricing');
  
  //replay+replit@qawolf.email
  await page.click("text=Log in");
  await page.click('[aria-label="input"]');
  await page.type('[aria-label="input"]', "replay+replit1@qawolf.email", {delay:100});
  await page.type('[name="password"]', process.env.DEFAULT_PASSWORD.toString(), {delay: 100});
  await page.keyboard.press('Enter');
  
  // CAPTCHA

  process.exit();
})();