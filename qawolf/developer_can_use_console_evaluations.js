const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 10 });
  await assertText(page, "Your Library");
  
  // go to replay
  await page.click('[title="Test Permissions"]');
  
  // open replay
  await page.click('text=Great Scott');
  await page.click("text=ViewerDevTools");
  
  // enter console evaluation
  await expect(page.locator("syntax-highlighted")).toBeHidden();
  await page.click("pre");
  await page.keyboard.type('window.querySelectorAll("timeout")');
  await page.keyboard.press('Enter');
  
  // assert dev can use console evaluation
  await expect(page.locator("syntax-highlighted")).toBeVisible();
  await expect(page.locator(`text='TypeError: "window.querySelectorAll is not a function"'`)).toBeVisible();

  process.exit();
})();