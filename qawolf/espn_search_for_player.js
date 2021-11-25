const { assertElement,assertText,faker,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,logIn,logInToFacebook,parseInviteUrl,waitForFrameNavigated } = require("./helpers");

(async () => {
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://www.espn.com/', { timeout: 60 * 1000 });
  
  // navigate to team page
  await page.hover('#global-nav >> text=NBA');
  await page.click('.team >> text=Denver Nuggets');
  
  // search player
  await page.click("#global-search-trigger");
  await page.fill("#global-search-input", "Nikola Jokic");
  await page.press("#global-search-input", "Enter");
  await page.waitForNavigation();
  
  // assert search player
   await assertElement(page, 'span:has-text("Nikola Jokic")');

  process.exit();
})();