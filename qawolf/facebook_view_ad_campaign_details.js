const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch replay browser
  const { browser, context } = await launchReplay();
  
  // log in to Facebook
  const { page } = await logInToFacebook(
    process.env.FACEBOOK_EMAIL_4,
    process.env.FACEBOOK_PASSWORD_4
  );
  await assertText(page, "David");
  
  // go to ads manager
  await page.goto("https://facebook.com/adsmanager/manage");
  
  // view campaigns
  await page.click("#CAMPAIGN_GROUP_AdsClassicTab");
  await assertText(page, "Test Campaign");
  
  // view campaign ad sets
  await page.click("text=Test Campaign");
  await assertText(page, "Test Ad Set");
  
  // view campaign ads
  await page.click("text=Test Ad Set");
  await assertText(page, "0 active ads");
  
  // list and upload the replay
  await uploadReplay();
  

  process.exit();
})();