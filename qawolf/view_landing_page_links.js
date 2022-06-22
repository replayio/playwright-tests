const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://replay.io');
  
  // assert page loaded
  await assertText(page, "Your time travel debugger");
  
  // view docs
  const [docsPage] = await Promise.all([
    context.waitForEvent("page"),
    page.click('text=Docs')
  ]);
  
  // assert viewing docs
  await assertText(docsPage, "Search the docs");
  
  // close docs page
  await docsPage.close();
  
  // view pricing
  await page.click("text=Pricing", { button: "middle" });
  await page.waitForTimeout(2000);
  
  // bring pricing to front
  let pages = context.pages();
  await pages[1].bringToFront();
  
  // assert viewing pricing
  await assertText(pages[1], "Pricing");
  await assertText(pages[1], "Individuals and open source communities will always be able to use Replay for free.");
  
  // close tab
  await pages[1].close();
  
  // view we're hiring
  await page.click("text=We’re Hiring", { button: "middle" });
  await page.waitForTimeout(2000);
  
  // bring we're hiring to front
  let pages = context.pages();
  await pages[1].bringToFront();
  
  // assert viewing we're hiring
  await assertText(pages[1], "Join our journey");
  await assertText(pages[1], "hiring@replay.io");
  
  // close tab
  await pages[1].close();
  
  // view about
  await page.click("text=About", { button: "middle" });
  await page.waitForTimeout(2000);
  
  // bring about to front
  let pages = context.pages();
  await pages[1].bringToFront();
  
  // assert about
  await assertText(pages[1], "About Replay");
  await assertText(pages[1], "Learn where Replay is right now and where we are going next");
  
  // close tab
  await pages[1].close();
  
  // view log in
  await page.click("text=Login", { button: "middle" });
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