const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 6 });
  await assertText(page, "Your Library");
  
  // go to replay
  await page.click('[title="Test Commenters"]');
  await page.click('text=Test commenter 3');
  
  // assert replay loaded
  await assertText(page, 'Test commenter 3');
  await assertText(page, 'DevTools');
  
  // open command palette
  await page.keyboard.press('Control+k');
  
  // assert command palette opened
  await assertElement(page, '[placeholder="What would you like to do?"]');
  
  // select show sharing options
  await page.click("text=Show Sharing Options");
  
  // assert sharing options opened
  await assertElement(page, '[placeholder="Email address"]');
  await assertElement(page, "text=Privacy Settings");
  await assertElement(page, "text=Copy Link");

  process.exit();
})();