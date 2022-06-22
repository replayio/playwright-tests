const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 8 });
  await page.goto(
    buildUrl("/recording/react-todomvc-ass--a09ba001-9b5c-4976-8bdf-5e8d361f2c81")
  );
  
  // go to recording network tab
  await page.click("text=DevTools");
  await page.click("text=videocam_off");
  await page.click("text=Network");
  
  // assert initial network messages
  const messages = page.locator('[role="cell"]');
  await expect(messages).toHaveCount(85); //85
  
  // set focus
  await page.click('[title="Start focus edit mode"]');
  await setFocus({ handleLocation: "left", moveToX: 70, page });
  
  // assert new console message count
  await expect(messages).toHaveCount(0); //30

  process.exit();
})();