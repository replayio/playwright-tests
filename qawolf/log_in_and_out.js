const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // store broken image URLs
  const brokenImageUrls = [];
  
  // go to home page
  const { browser, context } = await launch();
  const page = await context.newPage();
  
  // track broken images
  page.on('response', response => {
    if (response.status() >= 400 && response.request().resourceType() === "image") {
      console.log("BROKEN IMAGE", response.url())
      brokenImageUrls.push(response.url());
    } 
  });
  await page.goto(buildUrl("/"));
  
  // assert viewing home page
  // await expect(page.locator('[src="/images/logo-wide-dark.svg"]')).toBeVisible(); // dark mode
  await expect(page.locator('[src="/images/logo-wide.svg"]')).toBeVisible();
  await expect(page.locator('text="Replay captures everything you need for the perfect bug report, all in one link"')).toBeVisible();
  
  // go to login page
  await page.click("button");
  
  // assert viewing login page
  await assertText(page, "Sign in")
  await assertText(page, "to continue to Replay");
  
  // log in
  const context2 = await browser.newContext({
    extraHTTPHeaders: {
      Authorization: `Bearer ${process.env.USER_1_API_KEY}`
    }
  });
  const page2 = await context2.newPage();
  await page2.bringToFront();
  await page2.goto(buildUrl("/"));
  
  // assert logged in
  await assertText(page2, "Launch Replay");
  
  // log out
  await page2.click("text=View settings");
  await page2.click(':text("Personal")');
  await assertText(page2, "Log Out");
  await context2.setExtraHTTPHeaders({});
  await page2.reload();
  
  // assert logged out
  await assertText(page2, "Replay");
  await assertText(page2, "Learn more");
  
  // assert no broken images
  assert(!brokenImageUrls.length);
  await page2.click("#app-container");

  process.exit();
})();