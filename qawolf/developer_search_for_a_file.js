const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 10 });
  await assertText(page, "Your Library");
  
  // go to replay
  // await page.click('[title="Test Permissions"]');
  await page.click(':text("Test Permissions")');
  
  // open replay
  await page.click('text=Time Travel');
  await page.click("text=ViewerDevTools");
  
  // open full search bar from search for anything component
  const searchBar = page.locator('[placeholder="Go to file…"]');
  await expect(searchBar).not.toBeVisible();
  await page.click(':text("Search for fileCtrl+P")');
  
  // assert full search bar opened
  await expect(searchBar).toBeVisible();
  
  // search files
  await searchBar.fill('demo-script');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000); // give search time to populate
  
  // assert searched term results
  await expect(page.locator('#result-list >> li:has-text("demo-script.js")')).toBeVisible();
  await expect(page.locator('text=demo-script.js')).toHaveCount(8);
  await expect(page.locator('.highlight')).toHaveText("demo-script");
  await page.waitForTimeout(2000); // give search time to populate
  await page.keyboard.press('Enter');
  
  await expect(page.locator(".tab:has-text('demo-script')")).toBeVisible();

  process.exit();
})();