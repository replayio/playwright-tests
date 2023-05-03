const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 7 });
  await assertText(page, "Your Library");
  
  // go to replay
  await page.click(`:text("Test Permissions")`)
  
  // open replay
  await page.click('text=Time Travel');
  await page.click("text=ViewerDevTools");
  
  // open full search bar from search for anything component
  const searchBar = page.locator('[data-test-id="SearchFiles-Input"]');
  await expect(searchBar).not.toBeVisible();
  await page.keyboard.press("Control+K");
  await page.click("text=Search full textCtrl+Shift+F");
  
  // assert full search bar opened
  await expect(searchBar).toBeVisible();
  
  // search files
  const demoText = page.locator('[data-test-id="leftSidebar"] [data-test-name="SearchFiles-ResultRow"][data-test-type="Match"]:has-text("background-image")');
  const demoFile = page.locator('[data-test-filename="demo-script.js"] [data-test-name="ExpandablePreview"]:has-text("demo-script.js (demo)")');
  
  await expect(demoFile).not.toBeVisible();
  await searchBar.fill('demo');
  await page.waitForTimeout(2000);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000); // give search time to populate
  
  // assert searched term results
  expect(await demoText.count()).toBeGreaterThan(0);
  await expect(demoFile).toBeVisible();

  process.exit();
})();