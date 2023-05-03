const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 8 });
  await assertText(page, 'Library');
  
  // go to TodoMVC replay
  await page.click('[href="/recording/backbonejs-todomvc--c6103fac-79c9-44d0-bf3f-06c00f616c81"]');
  
  // open devtools, close videocam
  await page.click('text=DevTools', { timeout: 60 * 1000 });
  await page.click("text=videocam_off");
  
  // toggle on warnings
  await page.click('[data-test-id="ConsoleMenuToggleButton"]');
  await page.click('[data-test-id="ConsoleFilterToggles"] #FilterToggle-warnings');
  
  // assert initial console messages
  await page.waitForTimeout(5000);
  const messages = page.locator('[data-test-name="Message"]');
  await expect(messages).toHaveCount(3);
  
  // set focus
  await page.click('[title="Start focus edit mode"]');
  await setFocus({ handleLocation: 'left', moveToX: 300, page });
  await page.click('[data-test-id="SaveFocusModeButton"]');
  
  // assert new console message count
  await expect(messages).toHaveCount(0);
  await expect(page.locator('text=3 messages filtered before the focus range')).toBeVisible();
  

  process.exit();
})();