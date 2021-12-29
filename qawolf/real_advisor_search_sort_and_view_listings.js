const { assertElement,assertText,faker,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,logIn,logInToFacebook,parseInviteUrl,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://realadvisor.ch');
  
  // search listings
  await page.click("text=Buy");
  await page.waitForTimeout(1000);
  await page.fill('[placeholder="Enter location"]', "Zurich");
  await page.waitForTimeout(1000);
  await page.click("text=Zürich");
  await page.waitForTimeout(1000);
  await page.click('button.filter');
  
  // assert search listings
  await assertText(page, "Houses & Apartments For Sale in Zürich");
  
  // filter by most recent
  await page.click("text=Our recommendations");
  await page.click("text=Most recent");
  
  // assert filter by most recent
  await assertText(page, "Most recent");
  
  // click first listing
  await page.waitForTimeout(3000);
  await page.click('[class$=AggregatesListings] [class$=AggregatesListingCard] a');
  
  // assert listing
  await assertText(page, "Description");

  process.exit();
})();