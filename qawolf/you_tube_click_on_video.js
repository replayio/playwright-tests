const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,logIn,logInToFacebook,parseInviteUrl,waitForFrameNavigated } = require("./helpers");

(async () => {
  // go to page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://youtube.com');
  
  // assert page loaded
  await assertText(page, 'SIGN IN');
  
  // click on first video
  var videoTitle = await getValue(page, "h3 #video-title-link");
  await page.click('h3 #video-title-link');
  
  // assert video loaded
  await assertText(page, videoTitle);
  await assertText(page, 'views');
  await assertText(page, 'subscribers');
  await assertText(page, 'SAVE');

  process.exit();
})();