const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://replay.io', { waitUntil: "domcontentloaded" });
  
  // assert page loaded
  await assertText(page, "Your time travel debugger");
  
  // view footer privacy policy
  await page.click(".footer_link:has-text('Privacy Policy')", { button: "middle" });
  await page.waitForTimeout(2000);
  
  // bring privacy policy to front
  var pages = context.pages();
  await pages[1].bringToFront();
  
  // assert privacy policy
  await assertText(pages[1], "Privacy Policy");
  await assertText(pages[1], "EFFECTIVE DATE: 13 SEP 2021");
  await assertText(pages[1], "At Replay, we take your privacy seriously.");
  
  // close privacy policy
  await pages[1].close();
  
  // view footer terms of service
  await page.click(".footer_link:has-text('Terms of Service')", { button: "middle" });
  await page.waitForTimeout(2000);
  
  // bring terms of service to front
  var pages = context.pages();
  await pages[1].bringToFront();
  
  // assert terms of service
  await assertText(pages[1], "Terms of Use");
  await assertText(pages[1], "EFFECTIVE DATE: 14 JUL 2021");
  await assertText(pages[1], "Please read on to learn the rules and restrictions that govern your use of our website(s)");

  process.exit();
})();