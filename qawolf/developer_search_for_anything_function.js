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
  const searchBar = page.locator('[placeholder="Go to file…"]');
  await expect(searchBar).not.toBeVisible();
  await page.click(':text("Search for a functionCtrl+O")');
  
  // assert full search bar opened
  await expect(searchBar).toBeVisible();
  
  // search function
  await searchBar.fill('@initialize');
  await page.click(':text("initialize")');
  await page.waitForTimeout(2000); // give search time to populate
  
  // assert searched term results
  await expect(page.locator('.CodeMirror-code [role="presentation"]').first()).toBeVisible();
  await expect(page.locator('text="initialize"')).toHaveCount(2);
  
  // search for function using Ctrl+Shift+O
  await page.click('[title="Close tab"]');
  await expect(searchBar).not.toBeVisible();
  await page.keyboard.press('Control+O')
  await expect(searchBar).toBeVisible();
  
  // search function off shortcut ( bug? )
  await searchBar.fill('@initialize');
  await page.click(':text("initialize")');
  await page.waitForTimeout(2000); // give search time to populate
  
  // assert searched term results
  await expect(page.locator('.CodeMirror-code [role="presentation"]').first()).toBeVisible();
  await expect(page.locator('text="initialize"')).toHaveCount(2);

  process.exit();
})();