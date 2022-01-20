const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,logIn,logInToFacebook,parseInviteUrl,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in to Facebook
  const { page } = await logInToFacebook(process.env.FACEBOOK_EMAIL_4, process.env.FACEBOOK_PASSWORD_4);
  await assertText(page, "Helen");
  
  // go to ads manager
  await page.goto("https://facebook.com/adsmanager/manage");
  
  // view account overview
  await assertText(page, "Add payment method");
  
  // view settings page
  await page.click("text=Settings​");
  await page.click('[href="/ads/manager/account_settings/"]');
  await assertText(page, "Ad Account Setup");
  
  // expand sidebar
  await page.click("text=Expand​");
  await page.waitForSelector("text=Ad Account Settings")
  
  // collapse sidebar
  await page.click("text=Collapse​");
  await assertNotText(page, "Ad account settings");

  process.exit();
})();