const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 8 });
  await assertText(page, 'Library');
  
  // go to recording
  await page.click('text=Replay To Do List - Replay Sample');
  await page.click('text=DevTools', { timeout: 60 * 1000 });
  await page.click("text=videocam_off");
  
  // assert initial console messages
  await page.waitForTimeout(5000);
  const messages = page.locator('.message');
  await expect(messages).toHaveCount(6);
  
  // set focus
  await page.click('[title="Start focus edit mode"]');
  await setFocus({ handleLocation: 'left', moveToX: 300, page });
  
  // assert new console message count
  await expect(messages).toHaveCount(1);

  process.exit();
})();