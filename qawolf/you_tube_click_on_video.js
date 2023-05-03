const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch replay browser
  const { browser, context } = await launchReplay();
  
  // go to page
  // const { context } = await launch();
  const page = await context.newPage();
  await page.goto("https://youtube.com");
  
  // assert page loaded
  try {
    await assertText(page, "SIGN IN");
  } catch {
    await expect(page.locator('#buttons [href="https://accounts.google.com/ServiceLogin?service=youtube&uilel=3&passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den%26next%3Dhttps%253A%252F%252Fwww.youtube.com%252F&hl=en&ec=65620"]')).toBeVisible();
  }
  
  // click on first video
  var videoTitle = await getValue(page, "h3 #video-title-link");
  await page.click("h3 #video-title-link");
  
  // assert video loaded
  await assertText(page, videoTitle);
  await assertText(page, "views");
  await assertText(page, "subscribers");
  await assertText(page, "Save");
  
  // list and upload the replay
  await uploadReplay();

  process.exit();
})();