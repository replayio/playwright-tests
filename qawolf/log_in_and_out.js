const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // store broken image URLs
  const brokenImageUrls = [];
  
  // go to home page
  const { browser, context } = await launch();
  const page = await context.newPage();
  
  // track broken images
  page.on("response", (response) => {
    if (
      response.status() >= 400 &&
      response.request().resourceType() === "image"
    ) {
      console.log("BROKEN IMAGE", response.url());
      brokenImageUrls.push(response.url());
    }
  });
  await page.goto(buildUrl("/"));
  
  // assert viewing home page
  try {
    await expect(page.locator('[src="/images/logo.svg"]')).toBeVisible();
  } catch {
    await expect(page.locator('[src="/images/logo-wide-dark.svg"]')).toBeVisible();
  }
  await expect(
    page.locator(
      'text="Replay captures everything you need for the perfect bug report, all in one link"'
    )
  ).toBeVisible();
  
  // go to login page
  await page.click("button");
  
  // assert viewing login page
  await assertText(page, "Sign in");
  await assertText(page, "to continue to Replay");
  
  // log in
  const context2 = await browser.newContext({
    extraHTTPHeaders: {
      // Authorization: `Bearer ${process.env.USER_12_API_KEY}`,
      Authorization: `Bearer ${process.env.USER_1_API_KEY}`,
    },
  });
  const page2 = await context2.newPage();
  await page2.bringToFront();
  await page2.goto(buildUrl("/"));
  
  // assert logged in
  await assertText(page2, "Launch Replay");
  
  // log out
  await logOut(page2);
  await page2.reload();
  
  // assert logged out
  expect(page.locator(':text("View settings")'));
  
  // assert no broken images
  console.log(brokenImageUrls)
  assert(!brokenImageUrls.length);
  

  process.exit();
})();