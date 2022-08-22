const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 7 });
  await assertText(page, 'Library');
  
  // go to recording
  await page.goto(buildUrl('/recording/airtable-playwright-test--6847ab82-8b0a-4dc2-af73-eb6bf14918e7?point=12331705040172899620536796682649667&time=5072.277283660569&hasFrames=true'));
  
  // assert recording loaded
  await assertText(page, 'Airtable: Playwright Test', {timeout: 30 * 1000}); // timeout for page to load);
  await assertText(page, 'DevTools');
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await assertText(page, 'Console');
  
  // filter console by logs
  // check if console-filter-toggle is already open
  const isConsoleVisible = await page.$('text="Hide Node Modules"');
  if (isConsoleVisible) {
  } else {
    await page.click("#toolbox-content-console button");
  }
  // await page.click("#show-errors");
  // await page.click("#show-logs");
  const logs = page.locator('[title="Log"]');
  await expect(logs).toHaveCount(9, {timeout: 3 * 60 * 1000}); //9
  await page.click("#show-logs");
  
  // assert logs hid
  await expect(logs).toHaveCount(0, {timeout: 60 * 1000});
  
  // show logs
  await page.click("#show-logs");
  
  // assert logs appeared
  await expect(logs).toHaveCount(9); //9

  process.exit();
})();