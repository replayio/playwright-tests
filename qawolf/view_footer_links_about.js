const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://replay.io', {timeout: 60000});
  
  // assert page loaded
  await assertText(page, "Your time travel debugger");
  
  // view footer about
  await page.click(".footer_link:has-text('About Us')");
  
  // assert about
  await assertText(page, "About Replay");
  await assertText(page, "Learn where Replay is right now and where we are going next");
  
  // close about
  await page.goto('https://replay.io', {timeout: 60000});
  
  // view footer pricing
  await page.click(".footer_link:has-text('Pricing')");
  
  // assert viewing pricing
  await assertText(page, "Pricing");
  await assertText(page, "Individuals and open source communities will always be able to use Replay for free.");
  
  // close tab
  await page.goto('https://replay.io', {timeout: 60000});
  
  // view footer we're hiring
  await page.click('.footer_links-wrapper [href="/about#careers"]');
  
  // assert viewing we're hiring
  await assertText(page, "Join our journey");
  await assertText(page, "hiring@replay.io");
  
  // close tab
  await page.goto('https://replay.io', {timeout: 60000});
  
  // view footer values
  await page.click(".footer_link:has-text('Values')");
  
  // assert viewing values
  await assertText(page, "Replay here and now");
  await assertText(page, "We believe people understand what they can see");

  process.exit();
})();