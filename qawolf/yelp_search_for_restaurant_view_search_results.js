const { assertElement,assertText,faker,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,logIn,logInToFacebook,parseInviteUrl,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://www.yelp.com/');
  
  // assert page loaded
  await assertText(page, "Log In");
  
  // search for thai 
  await page.fill(".business-search-form_input-field", "thai");
  await page.press('.business-search-form_input-field', "Enter");
  
  // click first result under all results
  await page.click('li h4 a[href *= "/biz/"]');
  
  // assert on business page
  await assertText(page, "Location & Hours");

  process.exit();
})();