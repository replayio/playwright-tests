const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 10 });
  await assertText(page, 'Library');
  
  // go to recording
  // await page.click(':text("Test Permissions")');
  await page.click(':text("Test Team")');
  await page.locator(`:text-is("Great Scott")`).click();
  
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
  await expect(consolePanel).toHaveCount(1);
  
  // open console from search anything component
  await page.click("text=Open Console");
  
  // assert console opened
  await expect(consolePanel).toHaveCount(1);
  
  await logOut(page);

  process.exit();
})();