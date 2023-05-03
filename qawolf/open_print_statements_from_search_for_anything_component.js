const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 7 });
  await assertText(page, 'Library');
  
  // go to recording
  await page.click('text=Greater Scott');
  
  // assert recording loaded
  await assertText(page, 'Greater Scott');
  await assertText(page, 'DevTools');
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await assertText(page, 'Console');
  
  // open print statements
  const printStatementsPanel = page.locator("text=Click on the add in the editor to add a print statement");
  await expect(printStatementsPanel).toHaveCount(0);
  await page.keyboard.press("Control+K");
  await page.click("text=Open Print Statements");
  
  // assert print statements console opened
  await expect(printStatementsPanel).toHaveCount(1);

  process.exit();
})();