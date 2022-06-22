const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // Bug reported - 19 May after filtering for pointerup nothing is displayed in console - https://qawolfhq.slack.com/archives/C02GEJCC9JP/p1652680166715709
  
  // log in
  const { page } = await logIn({ userId: 7 });
  await assertText(page, "Library");
  
  // go to recording
  await page.click("text=Great Scott");
  
  // assert recording loaded
  await assertText(page, "Great Scott");
  await assertText(page, "DevTools");
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await assertText(page, "Console");
  
  // clear console
  // check if console-filter-toggle is already open
  if (await page.isChecked("#hide-node-modules")) {
    await page.click("#hide-node-modules");
  }
  await page.click("#show-errors");
  await page.click("#show-logs");
  await page.waitForTimeout(10 * 1000); // give console elements time to load
  
  // search for pointerup events
  const logEntries = page.locator(".message");
  await expect(logEntries).toHaveCount(1);
  await page.fill('[placeholder="Filter by event type"]', "pointerup");
  
  // assert only pointerup events in search area
  await expect(
    page.locator('[title="View pointerdown events"]')
  ).not.toBeVisible();
  await expect(page.locator('[title="View pointerup events"]')).toBeVisible();
  
  // enable pointer up filter
  const pointerEventText = page.locator("text=PointerEvent");
  await expect(pointerEventText).toHaveCount(0);
  await page.click('[title="View pointerup events"] [type="checkbox"]');
  
  // assert pointerup events loaded
  await page.waitForSelector("text=isTrusted", { timeout: 3 * 60 * 1000 });
  await expect(logEntries).toHaveCount(39);
  await expect(pointerEventText).toHaveCount(38);

  process.exit();
})();