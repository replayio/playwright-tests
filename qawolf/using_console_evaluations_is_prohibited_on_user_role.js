const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 7 });
  await assertText(page, "Your Library");
  
  // go to replay
  await page.click('[title="Test Permissions"]');
  
  // open replay
  await page.click('text=Great Scott');
  await page.click("text=ViewerDevTools");
  
  // enter console evaluation
  await assertNotText(page, 'Evaluations are only available for Developers in the Team plan.');
  await page.click("pre");
  await page.keyboard.type('window.querySelectorAll("timeout")');
  await page.keyboard.press('Enter');
  
  // assert user can't use console evaluation
  await assertText(page, 'Evaluations are only available for Developers in the Team plan.');

  process.exit();
})();