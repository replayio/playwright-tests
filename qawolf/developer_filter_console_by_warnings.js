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
  await page.waitForSelector(':text("Airtable: Playwright Test")');
  await assertText(page, "DevTools");
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await assertText(page, "Console");
  
  // filter console by warnings
  const warnings = page.locator('[title="Warn"]');
  await page.check("#show-warnings");
  await page.waitForTimeout(6000); // wait for warnings to load
  
  // assert warnings loaded
  await expect(warnings).toHaveCount(101); //101
  
  // hide warnings
  await page.uncheck("#show-warnings");
  
  // assert warnings hid
  await expect(warnings).toHaveCount(0);

  process.exit();
})();