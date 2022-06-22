const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 8 });
  await page.goto(
    buildUrl("/recording/react-todomvc--a09ba001-9b5c-4976-8bdf-5e8d361f2c81")
  );
  
  // go to recording network tab
  await page.click("text=DevTools");
  await page.waitForTimeout(2000);
  await page.click("text=info");
  
  // assert initial network messages
  const events = page.locator(".event");
  await expect(events).toHaveCount(38);
  
  // set left focus
  await expect(page.locator('[title="Start focus edit mode"]')).toBeVisible();
  await page.click('[title="Start focus edit mode"]');
  await setFocus({ handleLocation: "left", moveToX: 300, page });
  
  // assert new event count
  await expect(events).toHaveCount(0);
  
  // set right focus
  await setFocus({ handleLocation: "right", moveToX: 900, page });
  
  // assert new event count
  await expect(events).toHaveCount(21);

  process.exit();
})();