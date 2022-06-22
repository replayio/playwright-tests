const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 10 });
  await assertText(page, 'Library');
  
  // go to recording
  // await page.click('text=Airtable: Playwright Test');
  await page.goto(buildUrl('/recording/time-travel-qa8--a7576f44-e4d3-46f3-a349-058b65a17046'));
  
  // assert recording loaded
  // await assertText(page, 'Airtable: Playwright Test');
  await assertText(page, 'DevTools');
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await assertText(page, 'Console');
  
  // filter console by logs
  // check if console-filter-toggle is already open
  try {
    const consoleLocator = page.locator('text="Hide Node Modules"');
    await expect(consoleLocator).toBeVisible();
  } catch (e) {
    await page.click("#toolbox-content-console button");
  }
  const logs = page.locator('[title="Log"]');
  await expect(logs).toHaveCount(45, { timeout: 60 * 1000 });
  await page.click("#show-logs");
  
  // assert logs hid
  await expect(logs).toHaveCount(0);
  
  // show logs
  await page.click("#show-logs");
  
  // assert logs appeared
  await expect(logs).toHaveCount(45);

  process.exit();
})();