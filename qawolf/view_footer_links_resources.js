const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://replay.io');
  
  // assert page loaded
  await expect(page.locator('h1')).toHaveText('Your time travel debugger');
  
  // view footer blog
  const [page2] = await Promise.all([
    page.waitForEvent('popup'),
    page.click(".footer_link:has-text('Blog')")
  ]);
  
  // assert url is correct
  expect(page2.url()).toEqual('https://medium.com/replay-io');
  
  // close blog
  await page2.close();
  
  // view footer security and privacy
  await page.click(".footer_link:has-text('Security & Privacy')");
  
  // assert security and privacy
  expect(page.url()).toEqual('https://www.replay.io/security-privacy');
  await expect(page.locator('h1')).toHaveText('Security & Privacy');
  await expect(page.locator('.text-color-red')).toHaveText('Effective date: 16 Sep 2021');
  await expect(page.locator('h3').first()).toHaveText('Our Approach to Secure Development');

  process.exit();
})();