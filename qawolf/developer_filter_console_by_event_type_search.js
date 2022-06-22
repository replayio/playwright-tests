const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 10 });
  await assertText(page, 'Library');
  
  // go to recording
  await page.click('[title="Test Permissions"]');
  await page.click('text=Great Scott');
  
  // assert recording loaded
  await assertText(page, 'Great Scott');
  await assertText(page, 'DevTools');
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await assertText(page, 'Console');
  
  // clear console
  // check if console-filter-toggle is already open
  if (await page.isChecked("#hide-node-modules")) {
    await page.click("#hide-node-modules");
  };
  await page.click("#show-errors");
  await page.click("#show-logs");
  await page.waitForTimeout(5 * 1000); // give console elements time to load
  
  // search for pointerup events
  const logEntries = page.locator('.message');
  await expect(logEntries).toHaveCount(1);
  await page.fill('[placeholder="Filter by event type"]', "click");
  
  // assert only pointerup events in search area
  await expect(page.locator('[title="View setTimeout fired events"]')).not.toBeVisible();
  await expect(page.locator('[title="View click events"]')).toBeVisible();
  
  // enable pointer up filter
  const clickEvents = page.locator('.objectTitle >> text=click');
  await expect(clickEvents).toHaveCount(0);
  await page.click('[title="View click events"] [type="checkbox"]');
  
  // assert pointerup events loaded
  await expect(logEntries).toHaveCount(5);
  await expect(clickEvents).toHaveCount(4);

  process.exit();
})();