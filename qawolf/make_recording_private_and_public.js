const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { browser, context, page } = await logIn();
  
  // open options menu
  await page.fill('[placeholder="Search"]', "Clade");
  await page.keyboard.press("Enter");
  await page.hover("text=Clade");
  await page.click("text=more_vert");
  
  // ensure recording not already public
  const makePrivateButton = await page.$("[role='menu'] >> text=Make private");
  if (makePrivateButton) {
    await makePrivateButton.click();
    await page.hover("text=Clade");
    await page.click("text=more_vert");
    // below refreshes the dropdown
    await page.click("body");
    await page.waitForTimeout(5000);
    await page.click("text=more_vert");
  };
  
  // make recording public
  await page.click("[role='menu'] >> text=Make public");
  
  // assert recording is public (anyone can view URL)
  const context2 = await browser.newContext();
  const page2 = await context2.newPage();
  await page2.goto(buildUrl("/recording/clade--24f5b323-e89e-4a75-8503-74dea6444601"));
  await assertText(page2, "Clade", { timeout: 4 * 60 * 1000 });
  
  // make recording private
  await page.bringToFront();
  await page.hover("text=Clade");
  await page.click("text=more_vert");
  await page.click("[role='menu'] >> text=Make private");
  
  // assert recording is private (anyone cannot view URL)
  await page2.bringToFront();
  await page2.reload();
  await assertText(page2, "Almost there!");
  await assertText(page2, "This is a private replay. Please sign in.");

  process.exit();
})();