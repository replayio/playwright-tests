const { assertElement, assertNotElement, assertNotText, assertText, faker, logInToFacebook } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://realadvisor.ch');
  
  // search listings
  await page.click("text=Buy");
  await page.click('[type="button"]:has-text("Search")');
  
  // assert search listings
  await assertText(page, "Houses & Apartments For Sale Switzerland");
  
  // filter by most recent
  await page.click("text=Our recommendations");
  await page.click("text=Most recent");
  
  // assert filter by most recent
  await assertText(page, "Most recent");
  
  // click first listing
  await page.click('[class$=AggregatesListings] [class$=AggregatesListingCard] a');
  
  // assert listing
  await assertText(page, "Description");

  process.exit();
});