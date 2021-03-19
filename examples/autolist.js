const { firefox } = require('playwright');
(async () => {
  const browser = await firefox.launch({
    headless: false,
    slowMo:1000
  });
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  // Go to https://www.autolist.com/
  await page.goto('https://www.autolist.com/');

  // Click text=Make / Model
  await page.click('text=Make / Model');

  // Click li:has-text("Acura")
  await page.click('li:has-text("Acura")');

  // Click text=MDXNot enough data
  await page.click('text=MDXNot enough data');

  // assert.equal(page.url(), 'https://www.autolist.com/listings#make=Acura&model=MDX');
  // Go to https://www.autolist.com/listings#make=Acura&model=MDX&s=a
  await page.goto('https://www.autolist.com/listings#make=Acura&model=MDX&s=a');

  // Go to https://www.autolist.com/listings#page=1&make=Acura&model=MDX&location=Lahore%2C+PB&latitude=31.4653&longitude=74.3802
  await page.goto('https://www.autolist.com/listings#page=1&make=Acura&model=MDX&location=Lahore%2C+PB&latitude=31.4653&longitude=74.3802');
  // Click .noUi-origin
  await page.click('.noUi-origin');

  // assert.equal(page.url(), 'https://www.autolist.com/listings#page=1&make=Acura&model=MDX&location=Lahore%2C+PB&latitude=31.4653&longitude=74.3802&price_min=50000&price_max=');
  // Click .year .slider-container .slider .noUi-base .noUi-origin.noUi-connect
  await page.click('.year .slider-container .slider .noUi-base .noUi-origin.noUi-connect');

  // assert.equal(page.url(), 'https://www.autolist.com/listings#page=1&make=Acura&model=MDX&location=Lahore%2C+PB&latitude=31.4653&longitude=74.3802&price_min=50000&price_max=&year_min=1981&year_max=');
  // Click text=ABOUT
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://www.autolist.com/about-us' }*/),
    page.click('text=ABOUT')
  ]);
  // Press PageDown
  await page.press('body:has-text("HomeSaved SearchesFavoritesResearchMoreHomeSaved SearchesFavoritesGuides & Revie")', 'PageDown');
  // Press PageDown
  await page.press('body:has-text("HomeSaved SearchesFavoritesResearchMoreHomeSaved SearchesFavoritesGuides & Revie")', 'PageDown');
  // Press PageDown
  await page.press('body:has-text("HomeSaved SearchesFavoritesResearchMoreHomeSaved SearchesFavoritesGuides & Revie")', 'PageDown');
  // Press PageDown
  await page.press('body:has-text("HomeSaved SearchesFavoritesResearchMoreHomeSaved SearchesFavoritesGuides & Revie")', 'PageDown');
 
    await page.waitForTimeout(2000);
 
  // ---------------------
  await context.close();
  await browser.close();
})();