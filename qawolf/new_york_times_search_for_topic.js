const { assertElement, assertNotElement, assertNotText, assertText, faker, logInToFacebook } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  
  // using a lighter-weight starting page than root
  await page.goto('https://www.nytimes.com/sitemap');
  
  // assert page load
  await assertText(page, "Site Map");
  
  // open menu
  await page.click('[data-testid="desktop-section-button"]');
  
  // select world
  await page.click('[data-testid="desktop-nav"] >> text=World');
  
  // search for climate
  await page.click('[data-test-id="search-button"]');
  await page.fill('[data-testid="search-input"]', "climate");
  await page.press('[data-testid="search-input"]', "Enter");
  
  // assert search for climate
  await assertText(page, "climate", { selector: '[data-testid="search-page-text-field"]' });

  process.exit();
});