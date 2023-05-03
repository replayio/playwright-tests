const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://replay.io');
  
  // assert page loaded
  await expect(page.locator('text=The time-travel debugger from the future.')).toBeVisible();
  
  // view docs
  const [docsPage] = await Promise.all([
    context.waitForEvent("page"),
    page.click('[href="https://docs.replay.io"]:visible')
  ]);
  
  // assert viewing docs
  await expect(docsPage.locator(':text("🤔How Replay Works")')).toBeVisible();
  
  // close docs page
  await docsPage.close();
  
  // view pricing
  await page.click('[href="/pricing"]:visible');
  await page.waitForTimeout(2000);
  
  // // bring pricing to front
  // let pages = context.pages();
  // await pages[1].bringToFront();
  
  // assert viewing pricing
  await assertText(page, "Pricing");
  await expect(page.locator('text=Individuals and open source communities will always be able to use Replay for free.')).toBeVisible();
  
  // go back
  await page.goBack();
  
  // view we're hiring
  await page.click('[href="/about#jobs"]:visible');
  await page.waitForTimeout(2000);
  
  // assert viewing we're hiring
  await assertText(page, "Join our journey");
  await assertText(page, "hiring@replay.io");
  
  // go back
  await page.goBack();
  
  // view about
  await page.click('[href="/about"]:visible');
  await page.waitForTimeout(2000);
  
  // assert about
  await assertText(page, "About Replay");
  await assertText(page, "Learn where Replay is right now and where we are going next");
  
  // close tab
  await page.goBack();
  
  // view log in
  await page.click('[href="https://app.replay.io/"]:visible');
  await page.waitForTimeout(2000);
  
  // bring log in to front
  let pages = context.pages();
  await pages[1].bringToFront();
  
  // assert log in
  await assertText(pages[1], "Replay");
  await assertText(pages[1], "Replay captures everything you need for the perfect bug report");
  await assertText(pages[1], "Sign");
  await assertText(pages[1], "in");

  process.exit();
})();