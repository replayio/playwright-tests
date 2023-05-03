const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 10 });
  await assertText(page, 'Library');
  
  // go to recording
  // await page.click('[title="Test Permissions"]');
  await page.click(':text("Test Permissions")');
  await page.click('text=Time Travel');
  
  // assert recording loaded
  await assertText(page, 'Time Travel');
  await assertText(page, 'DevTools');
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await assertText(page, 'Console');
  
  // clear console
  // check if console-filter-toggle is already open
  // if (await page.isChecked("#hide-node-modules")) {
  //   await page.click("#hide-node-modules");
  // };
  // await page.click("#show-errors");
  // await page.click("#show-logs");
  await page.waitForTimeout(5 * 1000); // give console elements time to load
  
  // make sure console options are open
  try {
    await expect(page.locator('[data-test-id="EventTypeFilterInput"]')).toBeVisible();
  } catch {
    await page.click('[data-test-id="ConsoleMenuToggleButton"]');
    await expect(page.locator('[data-test-id="EventTypeFilterInput"]')).toBeVisible();
  }
  
  // search for pointerup events
  await page.fill('[placeholder="Filter by event type"]', "click");
  
  // assert only pointerup events in search area
  await expect(page.locator('[title="View setTimeout fired events"]')).not.toBeVisible();
  await expect(page.locator(':text("click2")')).toBeVisible();
  
  // enable pointer up filter
  const clickEvents = page.locator('[data-test-name="Message"] :text("click")');
  await expect(clickEvents).toHaveCount(1);
  await page.click('[data-test-id="EventTypes-event.mouse.click"] [type="checkbox"]');
  
  // assert pointerup events loaded
  await expect(clickEvents).toHaveCount(1);

  process.exit();
})();