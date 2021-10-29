const {
  assertElement,
  assertNotElement,
  assertNotText,
  assertText,
  faker,
  logInToFacebook,
} = require("./helpers");

(async () => {
  // log in to Facebook
  const { page } = await logInToFacebook(
    process.env.FACEBOOK_EMAIL_3,
    process.env.FACEBOOK_PASSWORD_3
  );
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
  await assertText(page, "Campaign Name");
  await page.fill(
    '[placeholder="Enter your campaign name here..."]',
    campaignName
  );
  await page.click("text=Next");

  // set ad name
  await assertText(page, "Ad Set Name");
  await page.fill(
    '[placeholder="Enter your ad set name here..."]',
    faker.hacker.adjective()
  );
  await page.fill('[aria-invalid="false"]', faker.commerce.price(1, 20));
  await page.click("text=Next");

  // preview campaign
  await assertText(page, "Ad Setup");

  // close campaign
  await page.click('[aria-label="Close"]');
  await assertText(page, "Publish draft items?");
  await page.click(
    '[data-auto-logging-component-type="GeoModalFooter"] >> text=Close'
  );

  // delete campaign
  await page.click("#CAMPAIGN_GROUP_AdsClassicTab");
  await page.click("#pe_toolbar >> text=More");
  await page.click('[data-testid="ContextualLayerRoot"] >> text=Delete');
  await page.click(
    '[data-auto-logging-component-type="GeoModalFooter"] >> text=Delete'
  );
  await assertNotText(page, campaignName);

  process.exit();
})();
