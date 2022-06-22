const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 7 });
  await assertText(page, 'Library');
  
  // go to recording
  await page.click('text=Great Scott');
  
  // assert recording loaded
  await assertText(page, 'Great Scott');
  await assertText(page, 'DevTools');
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await assertText(page, 'Console');
  
  // open React DevTools
  const reactDevTools = page.locator('[placeholder="Search (text or /regex/)"]');
  await expect(reactDevTools).toHaveCount(0);
  
  // open React DevTools
  await page.click("text=Open React DevTools");
  
  // assert React DevTools opened
  await page.waitForTimeout(10 * 1000) // give DevTools time to load
  await expect(reactDevTools).toHaveCount(1);

  process.exit();
})();