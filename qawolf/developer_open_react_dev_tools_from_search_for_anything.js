const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 6, options: { slowMo: 1000 } });
  await assertText(page, "Library");
  
  // go to recording
  await page.click(':text("QA Wolf - Replay Issues")');
  const recording = page.locator('[class*="Library_libraryRow"]');
  // await recording.first().click();
  await page.click("text=React Devtools Hanging");
  
  // assert recording loaded
  await assertText(page, "Viewer");
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await assertText(page, "Console");
  
  // open React DevTools
  await page.click("text=Open React DevTools");
  
  // assert React DevTools opened
  await expect(
    page.locator("text=Loading React Developer Tools...")
  ).not.toBeVisible({ timeout: 3 * 60 * 1000 });
  
  try {
  await page.click('button [src="/images/playback-play.svg"]', {timeout: 5000});
  } catch {
  await page.click('button [src="/images/playback-refresh.svg"]');
  await page.click('button [src="/images/playback-play.svg"]');
  }
  
  await page.waitForTimeout(2000);
  
  try {
    await page.click('[src="/images/playback-pause.svg"]');
  } catch {}
  await expect(page.locator(".inspector-panel-button")).toBeVisible();
  
  await logOut(page);
  

  process.exit();
})();