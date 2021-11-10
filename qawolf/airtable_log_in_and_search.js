const { assertElement, assertNotElement, assertNotText, assertText, faker, logInToFacebook } = require("./helpers");

(async () => {
  // go to Airtable
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://airtable.com');
  
  // log in 
  await page.click("text=Sign in");
  await page.fill('[name="email"]', "replay+airtable@qawolf.email");
  await page.fill('[name="password"]', process.env.DEFAULT_PASSWORD);
  await page.click('[type="submit"]');
  
  // assert logged in
  await page.waitForSelector('[aria-label="Account"]')
  await assertNotText(page, "Sign in")
  
  // search for base
  await page.fill('[aria-label="Find a base or interface"]', "Awes");
  
  // assert base exists
  await assertElement(page, '[aria-label="Awesome Base"]');

  process.exit();
});