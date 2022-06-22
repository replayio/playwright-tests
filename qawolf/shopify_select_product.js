const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // go to page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://www.denydesigns.com/collections/credenza');
  
  // assert page loaded
  await assertText(page, 'CREDENZA');
  await assertNotText(page, 'VINTAGE MUSHROOM PRINT');
  
  // go to page with Grand Teton National Park
  while (0 == await page.locator('text=GRAND TETON NATIONAL PARK').count()) {
    await page.click("text=>");
    await page.waitForTimeout(3000);
  }
  
  // go to product
  await page.click('text=GRAND TETON NATIONAL PARK');
  
  // assert product page loaded
  await page.waitForSelector('text=WHOLESALE LOGIN');
  await assertText(page, 'GRAND TETON NATIONAL PARK');
  await assertNotText(page, 'ZODIAC SUN STAR PRINT NAVY');

  process.exit();
})();