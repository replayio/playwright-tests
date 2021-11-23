const { assertElement, assertNotElement, assertNotText, assertText, faker, logInToFacebook } = require("./helpers");

(async () => {
  // go to google
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://www.google.com');
  
  // search
  await page.fill('input[aria-label="Search"]', "site:wikipedia.org time travel debugging");
  await page.press('input[aria-label="Search"]', "Enter");
  
  // assert search
  await assertText(page, "Time travel debugging - Wikipedia", { selector: "h3:below(input[aria-label='Search'])" });
  
  // open about this result modal
  await page.click('.g [role="button"] > span');
  
  // assert about this result modal
  await assertText(page, "About this result");
  
  // close about this result modal
  await page.click('#lb [role="button"]');
  
  // assert close about this result modal
  await assertNotText(page, "About this result");

  process.exit();
});