const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://replay.io');
  
  // assert page loaded
  await assertText(page, "Your time travel debugger");
  
  // view footer docs
  const [page2] = await Promise.all([
    page.waitForEvent("popup"),
    page.click(".footer_link:has-text('Docs')"),
  ]);
  await page2.waitForLoadState("domcontentloaded");
  await page2.bringToFront();
  
  // assert docs
  await assertText(page2, "Docs");
  await assertText(page2, "Getting Started");
  await assertText(page2, "Resources");
  
  // close docs
  await page2.close();
  
  // view GitHub issues
  const [page3] = await Promise.all([
    page.waitForEvent("popup"),
    page.click(".footer_link:has-text('GitHub Issues')"),
  ]);
  await page3.waitForLoadState("domcontentloaded");
  await page3.bringToFront();
  
  // assert GitHub
  await expect(page3).toHaveURL("https://github.com/replayio");
  
  // close GitHub
  await page3.close();
  
  // view contact us
  var contactUsLocator = page.locator(".footer_link:has-text('Contact Us')");
  var link = await contactUsLocator.getAttribute('href');
  
  // assert contact us
  assert(link.includes("mailto:sales@replay.io"));

  process.exit();
})();