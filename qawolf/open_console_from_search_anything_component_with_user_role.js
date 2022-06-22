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
  
  // open network tab to close console
  await page.click('button >> text=Network');
  const consolePanel = page.locator('[placeholder="Filter Output"]');
  await expect(consolePanel).toHaveCount(0);
  
  // open console from search anything component
  await page.click("text=Open Console");
  
  // assert console opened
  await expect(consolePanel).toHaveCount(1);

  process.exit();
})();