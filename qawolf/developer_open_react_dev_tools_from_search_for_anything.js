const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 10 });
  await assertText(page, "Library");
  
  // go to recording
  await page.click('[title="Test Permissions"]');
  await page.click(':text("Private Recording Test")');
  
  // assert recording loaded
  await assertText(page, "Private Recording Test");
  await assertText(page, "DevTools");
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await assertText(page, "Console");
  
  // open React DevTools
  const reactDevTools = page.locator('[placeholder="Search (text or /regex/)"]');
  await expect(reactDevTools).toHaveCount(0);
  
  // open React DevTools
  await page.click("text=Open React DevTools");
  
  // assert React DevTools opened
  await page.click('button [src="/images/playback-play.svg"]');
  await page.waitForTimeout(2000);
  await page.click('[src="/images/playback-pause.svg"]');
  await expect(reactDevTools).toHaveCount(1);

  process.exit();
})();