const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch replay browser
  const { browser, context } = await launchReplay();
  // const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://www.espn.com/', { timeout: 60 * 1000 });
  
  // navigate to team page
  await page.hover('#global-nav >> text=NBA');
  await page.click('.team >> text=Denver Nuggets');
  
  // search player
  await page.waitForTimeout(3000);
  await page.click(".Nav__Search__Toggle");
  await page.waitForTimeout(3000);
  await page.fill("#searchBox", "Nikola Jokic");
  await page.waitForTimeout(3000);
  await page.press("#searchBox", "Enter");
  await page.waitForTimeout(3000);
  // await page.waitForNavigation();
  
  // assert search player
  await assertElement(page, 'span:has-text("Nikola Jokic")');
  
  // list and upload the replay
  await uploadReplay();

  process.exit();
})();