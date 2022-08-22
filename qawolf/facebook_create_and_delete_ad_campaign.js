const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in to Facebook
  const { page } = await logInToFacebook(process.env.FACEBOOK_EMAIL_3, process.env.FACEBOOK_PASSWORD_3);
  await assertText(page, "Abigail");
  
  // go to ads manager
  await page.goto("https://facebook.com/adsmanager/manage");
  
  // create new campaign
  await page.click("text=Create");
  
  // choose campaign objective
  await assertText(page, "Choose a Campaign Objective");
  await page.click('#BRAND_AWARENESS [type="radio"]');
  await page.click("text=Continue");
  
  // rename campaign
  const campaignName = faker.commerce.productName();
  await page.waitForSelector("text=Campaign Name");
  await page.fill('[placeholder="Enter your campaign name here..."]', campaignName);
  await page.click("text=Next");
  
  // set ad name
  await expect(page.locator('text="Ad set name"')).toBeVisible();
  await page.fill('[placeholder="Enter your ad set name here..."]', faker.hacker.adjective());
  await page.fill('[aria-invalid="false"]', faker.commerce.price(1, 20));
  await page.click("text=Next");
  
  // preview campaign
  await assertText(page, "Ad");
  
  // close campaign
  await page.click(':text("Close")');
  await assertText(page, "Publish draft items?");
  await page.click(":text('Close'):left-of(:text('Publish Draft Items'))");
  
  // delete campaign
  await page.click("#CAMPAIGN_GROUP_AdsClassicTab");
  await page.click("#pe_toolbar >> text=More");
  await page.click('[data-testid="ContextualLayerRoot"] >> text=Delete');
  await page.click(":text('Delete'):right-of(:text('Cancel'))");
  await assertNotText(page, campaignName);

  process.exit();
})();