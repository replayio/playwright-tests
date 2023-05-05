const {
  assert,
  assertElement,
  assertText,
  expect,
  faker,
  getInbox,
  getValue,
  launch,
  launchReplay,
  uploadReplay,
  assertNotElement,
  assertNotText,
  buildUrl,
  deleteTeam,
  getBoundingClientRect,
  getPlaybarTooltipValue,
  logIn,
  logInToFacebook,
  parseInviteUrl,
  setFocus,
  waitForFrameNavigated,
  bubbleLogin,
  superblocksLogin,
  navigateTo,
  openPopup,
  runCommand
} = require("./helpers");

(async () => {
  // log in
  const { browser, context, page } = await logIn({ userId: 2 });
  await context.grantPermissions(["clipboard-read"]);
  await assertText(page, "Your Library");
  
  // go to Facebook: no search results recording
  await page.click("text=Test sharing");
  await page.click("text=Share replay link video");
  
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
      "/recording/share-replay-link-video--25bc57dc-778e-42ab-bf6b-f6433a1b171b"
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
  await expect(
    page2.locator(`text=Sorry, you don't have permission!`)
  ).toBeVisible();
  await expect(page2.locator("button")).toHaveText("Request access");
  

  process.exit();
})();