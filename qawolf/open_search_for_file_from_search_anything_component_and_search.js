const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 7 });
  await assertText(page, "Your Library");
  
  // go to replay
  await page.click('[title="Test Permissions"]');
  
  // open replay
  await page.click('text=Time Travel');
  await page.click("text=ViewerDevTools");
  
  // open file search
  const fileSearchInput = page.locator('[placeholder="Go to file…"]');
  await expect(fileSearchInput).not.toBeVisible();
  const indexFile = page.locator('text=(index)');
  await expect(indexFile).not.toBeVisible();
  await page.click("text=Search for fileCtrl+P");
  
  // assert file search opened
  await expect(fileSearchInput).toBeVisible();
  
  // search for file
  await fileSearchInput.fill('static');
  await page.keyboard.press('Enter');
  
  // assert file opened
  await expect(indexFile).toBeVisible();

  process.exit();
})();