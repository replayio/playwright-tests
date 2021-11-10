const { assertElement, assertNotElement, assertNotText, assertText, faker, logInToFacebook } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('http://whatsmyuseragent.org/');
  
  // assert page load
  await assertText(page, "My IP Address");

  process.exit();
});