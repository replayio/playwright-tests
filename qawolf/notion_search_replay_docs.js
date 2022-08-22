const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://www.notion.so/replayio/Replay-Docs-56758667f53a4d51b7c6fc7a641adb02');
  
  // assert page load
  await assertText(page, "Old Replay Docs");
  
  // search
  await page.click('.notion-topbar >> text="Search"');
  await page.fill('[type="text"]', "console");
  
  // assert search option
  await expect(page.locator('.search-query-result-item >> text=Console').first()).toBeVisible();
  
  // navigate to search results
  await page.click(".search-query-result-item:has-text('Console')");
  
  // assert search results
  await assertText(page, "Displaying Events");

  process.exit();
})();