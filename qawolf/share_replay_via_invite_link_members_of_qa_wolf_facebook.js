const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { browser, context, page } = await logIn({ userId: 1 });
  await context.grantPermissions(["clipboard-read"]);
  await assertText(page, "Your Library");
  
  // go to Facebook: no search results recording
  await page.click("text=QAWolf :: Facebook");
  await page.click("text=Facebook: no search results for new chat");
  
  // assert recording loaded
  await assertText(page, "DevTools", { timeout: 60 * 1000 });
  
  // go to devtools
  await page.click("text=ViewerDevTools");
  
  // assert devtools loaded
  await assertText(page, "Network");
  
  // copy share link
  await page.click("text=ios_shareShare");
  await page.click("text=Copy Link");
  
  // assert link copied
  const copiedLink = await page.evaluate(() => {
    return navigator.clipboard.readText();
  });
  expect(copiedLink).toEqual(
    buildUrl(
      "/recording/facebook-no-search-results-for-new-chat--b30b1ebd-de5f-4fdd-9d49-5d55cb173f83"
    )
  );
  
  // user without access goes to copied link
  const context2 = await browser.newContext();
  await context2.setExtraHTTPHeaders({
    Authorization: `Bearer ${process.env.USER_4_API_KEY}`,
  });
  const page2 = await context2.newPage();
  await page2.bringToFront();
  await page2.goto(copiedLink);
  
  // assert user can't access recording
  expect(page2.url()).toEqual(copiedLink);
  await assertNotText(page2, "Facebook: no search results for new chat");
  await expect(
    page2.locator(`text=Sorry, you don't have permission!`)
  ).toBeVisible();
  await expect(page2.locator("button")).toHaveText("Request access");
  

  process.exit();
})();