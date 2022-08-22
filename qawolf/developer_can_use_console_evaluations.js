const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  // const { page } = await logIn({ userId: 6 }); // This is Chris Burtons ID - Just using it for maitnenance
  const { page } = await logIn({ userId: 10 }); // USE THIS ID FOR TESTING
  await assertText(page, "Your Library");
  
  // TEAM NEEDS SUBSCRIPTION UPDATED BY REPLAY
  // This could be due to the recording age
  
  // go to replay
  await page.click(':text("Test Permissions")');
  
  // open replay
  await page.click(':text("React DevTools recording")');
  await page.click("text=ViewerDevTools");
  
  // enter console evaluation
  await expect(page.locator("syntax-highlighted")).toBeHidden();
  await page.click("pre"); // console input
  await page.keyboard.type('window.document.querySelectorAll("timeout");');
  await page.keyboard.press("Enter");
  
  // assert dev can use console evaluation
  await expect(
    page.locator('#toolbox-content-console :text("Loading")')
  ).not.toBeVisible({ timeout: 3 * 60 * 1000 });
  
  await expect(page.locator('text=NodeList')).toBeVisible();
  
  await logOut(page);
  

  process.exit();
})();