const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 10 });
  await assertText(page, "Library");
  
  // go to recording
  await page.goto(
    buildUrl(
      "/recording/airtable-playwright-test--6847ab82-8b0a-4dc2-af73-eb6bf14918e7?point=12331705040172899620536796682649667&time=5072.277283660569&hasFrames=true"
    )
  );
  
  // assert recording loaded
  await assertText(page, "Airtable: Playwright Test");
  await assertText(page, "DevTools");
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await assertText(page, "Console");
  
  // filter console by errors
  const typeError = page.locator("text=TypeError: can't access dead object");
  await page.waitForTimeout(6 * 1000);
  await expect(typeError).toHaveCount(6, { timeout: 3 * 60 * 1000 }); //6
  await page.click("#show-errors");
  
  // assert errors hid
  await expect(typeError).toHaveCount(0);
  
  // show errors
  await page.click("#show-errors");
  
  // assert errors appeared
  await expect(typeError).toHaveCount(6); //6

  process.exit();
})();