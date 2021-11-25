const { assertElement,assertText,faker,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,logIn,logInToFacebook,parseInviteUrl,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in to Facebook
  const { page } = await logInToFacebook();
  
  // wait for page to load
  await page.waitForTimeout(3 * 1000);
  
  // search for a user
  await page.fill('[aria-label="Search Facebook"]', "Mike");
  await assertText(page, "Mike Algdbbidiajhg Martinazzison");
  await page.keyboard.press("Enter");
  await page.waitForSelector("text=Search Results");
  
  // view posts
  await page.click('text=Posts');
  await assertText(page, "Posts You've Seen");
  
  // view people
  await page.click('text=People');
  await assertText(page, "Friends of Friends");

  process.exit();
})();