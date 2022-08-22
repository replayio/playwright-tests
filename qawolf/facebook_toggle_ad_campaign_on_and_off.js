const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in to Facebook
  const { page } = await logInToFacebook(process.env.FACEBOOK_EMAIL_4, process.env.FACEBOOK_PASSWORD_4);
  await assertText(page, "Helen");
  
  // go to ads manager
  await page.goto("https://facebook.com/adsmanager/manage");
  
  // view campaigns
  await page.click('[aria-label="Campaigns"]');
  
  // ensure campaign toggled on
  await assertText(page, "Test Campaign");
  const turnOnToggle = await page.$('#statusChangeNuxRoot [role="switch"]');
  if (turnOnToggle) turnOnToggle.click();
  
  // toggle campaign off
  await page.uncheck('[data-visualcompletion="ignore"] [type="checkbox"]');
  await page.hover('[data-visualcompletion="ignore"] [type="checkbox"]');
  await assertText(page, "Turn on campaign");
  
  // toggle campaign on
  await page.check('[data-visualcompletion="ignore"] [type="checkbox"]');
  await page.hover('[data-visualcompletion="ignore"] [type="checkbox"]');
  await assertText(page, "Turn off campaign");

  process.exit();
})();