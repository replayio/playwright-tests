const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,logIn,logInToFacebook,parseInviteUrl,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in to Facebook
  const { page } = await logInToFacebook(process.env.FACEBOOK_EMAIL_4, process.env.FACEBOOK_PASSWORD_4);
  await assertText(page, "Helen");
  
  // go to ads manager
  await page.goto("https://facebook.com/adsmanager/manage");
  
  // view campaigns
  await page.click('[aria-label="Campaigns"]');
  await assertText(page, "Test Campaign");
  
  // view campaign ad sets
  await page.click("text=Test Campaign");
  await assertText(page, "Test Ad Set");
  
  // view campaign ads
  await page.click("text=Test Ad Set");
  await assertText(page, "New Ad");

  process.exit();
})();