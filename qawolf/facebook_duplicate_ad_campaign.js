const { assertElement,assertText,faker,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,logIn,logInToFacebook,parseInviteUrl,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in to Facebook
  const { page } = await logInToFacebook(process.env.FACEBOOK_EMAIL_4, process.env.FACEBOOK_PASSWORD_4);
  await assertText(page, "Helen");
  
  // go to ads manager
  await page.goto("https://facebook.com/adsmanager/manage");
  
  // view campaigns
  await page.click('[aria-label="Campaigns"]');
  await assertText(page, "Test Campaign");
  
  // duplicate campaign
  await page.check('[role="presentation"] [type="checkbox"]');
  await page.click("#pe_toolbar >> text=Duplicate");
  await page.waitForSelector("text=Duplicate Your Campaign");
  await page.click("#pe_duplicate_create_button");
  
  // delete duplicate campaign
  await page.click('[aria-pressed="false"]');
  await page.click('[data-testid="campaign-structure-item-action-menu-delete"]');
  await assertText(page, "Do you want to delete the campaign?");
  await page.click("text=CancelDelete >> text=Delete");
  
  // navigate to campaigns
  await page.click("text=Close​");
  await page.click("text=ClosePublish draft items >> text=Close");
  
  // assert navigated to campaigns
  await assertText(page, "Campaigns");

  process.exit();
})();