const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://replay.io');
  
  // assert page loaded
  await assertText(page, "Your time travel debugger");
  
  // navigate to learn more links
  const [page2] = await Promise.all([
    context.waitForEvent("page"),
    page.click("text=Learn more")
  ]);
  
  // assert universal recorder URL
  const url = await page2.url()
  await expect(url).toBe('https://medium.com/replay-io/how-replay-works-5c9c29580c58');
  
  // close tab
  await page2.close();
  
  // navigate to security and privacy
  await page.click('[href="/security-privacy"]');
  
  // assert security and privacy
  await assertText(page, "Security & Privacy");
  await assertText(page, "Our Approach to Secure Development");

  process.exit();
})();