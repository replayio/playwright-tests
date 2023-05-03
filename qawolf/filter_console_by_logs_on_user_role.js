const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 7 });
  await assertText(page, "Library");
  
  // go to replay with logs
  await page.click('[href="/recording/replay-with-logs--2e63ccb9-ada6-4d2a-a3a9-5d09d551e68d"]');
  
  // assert recording loaded
  await assertText(page, "Replay with logs", { timeout: 30 * 1000 }); // timeout for page to load);
  await assertText(page, "DevTools");
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await assertText(page, "Console");
  
  // filter console by logs
  const logs = page.locator('[data-test-message-type="console-log"]');
  await expect(logs).toHaveCount(1);
  try {
    await page.click("#FilterToggle-logs", { timeout: 5000 });
  } catch {
    await page.click('[data-test-id="ConsoleMenuToggleButton"]');
    await page.click("#FilterToggle-logs");
  }
  
  // assert logs hid
  await expect(logs).toHaveCount(0, { timeout: 60 * 1000 });
  
  // show logs
  await page.click("#FilterToggle-logs");
  
  // assert logs appeared
  await expect(logs).toHaveCount(1);

  process.exit();
})();