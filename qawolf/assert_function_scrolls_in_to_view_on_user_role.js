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
  
  // open script.js
  await page.click("text=Search for fileCtrl+P");
  await page.click('#result-list [role="option"]');
  
  // assert file opened
  await page.fill('[placeholder="Filter functions"]', "circles");
  const circles = page.locator('text=λcirclesAreAllTheSameColor()');
  const circlesFunction = page.locator('text=function circlesAreAllTheSameColor()');
  await expect(circles).toHaveCount(1);
  await expect(circlesFunction).toHaveCount(0);
  
  // click function to scroll into view
  await circles.click();
  await expect(circlesFunction).toHaveCount(1);

  process.exit();
})();