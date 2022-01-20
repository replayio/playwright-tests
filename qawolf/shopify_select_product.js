const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,logIn,logInToFacebook,parseInviteUrl,waitForFrameNavigated } = require("./helpers");

(async () => {
  // go to page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://www.denydesigns.com/collections/credenza');
  
  // assert page loaded
  await assertText(page, 'CREDENZA');
  await assertNotText(page, 'VINTAGE MUSHROOM PRINT');
  
  // go to page 3
  await page.click("text=>");
  await page.click("text=>");
  
  // assert next page loaded
  await assertText(page, "MODERN MANDALA 02");
  
  // go to product
  await page.click('text=MODERN MANDALA 02');
  
  // assert product page loaded
  await page.waitForSelector('text=WHOLESALE LOGIN');
  await assertText(page, 'MODERN MANDALA 02');
  await assertNotText(page, 'ZODIAC SUN STAR PRINT NAVY');

  process.exit();
})();