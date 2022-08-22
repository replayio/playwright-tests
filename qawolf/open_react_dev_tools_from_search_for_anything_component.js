const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 6, options: { slowMo: 1000 } });
  await assertText(page, "Library");
  
  // go to 1st recording in Bug team
  await page.click(':text("QA Wolf - Replay Issues")');
  const recording = page.locator('[class*="Library_libraryRow"]');
  await recording.first().click();
  
  // assert recording loaded
  await assertText(page, "Viewer");
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert search component loaded
  await expect(
    page.locator('[placeholder="What would you like to do?"]')
  ).toBeVisible();
  
  // open React DevTools
  const reactDevTools = page.locator('[placeholder="Search (text or /regex/)"]');
  await expect(reactDevTools).toHaveCount(0);
  await page.waitForTimeout(5000);
  
  // open React DevTools
  await page.click("text=Open React DevTools");
  
  // assert React DevTools opened
  // give DevTools time to load NOTE: It's taking a long time lately
  await expect(
    page.locator(':text("Loading React Developer Tools...")')
  ).not.toBeVisible({
    timeout: 2 * 60 * 1000,
  });
  
  try {
    await expect(reactDevTools).toHaveCount(1);
  } catch {
    await page.click("img");
    await page.waitForTimeout(50 * 1000);
    await expect(reactDevTools).toHaveCount(1);
  }
  
  await logOut(page);
  

  process.exit();
})();