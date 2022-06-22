const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 10 });
  await assertText(page, "Your Library");
  
  // go to replay
  await page.click('[title="Test Permissions"]');
  
  // open replay
  await page.click('text=Time Travel');
  await page.click("text=ViewerDevTools");
  
  // open full search bar from search for anything component
  const searchBar = page.locator('[placeholder="Find in files…"]');
  await expect(searchBar).not.toBeVisible();
  await page.click("text=Search full textCtrl+Shift+F");
  
  // assert full search bar opened
  await expect(searchBar).toBeVisible();
  
  // search files
  const demoText = page.locator('text=​ background-image: url("/demo/demo_car.png");');
  const demoFile = page.locator('text=demo-script.jsdemo (2 matches)');
  await expect(demoFile).not.toBeVisible();
  await searchBar.fill('demo');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000); // give search time to populate
  
  // assert searched term results
  expect(await demoText.count()).toBeGreaterThan(0);
  await expect(demoFile).toBeVisible();

  process.exit();
})();