const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto("https://replay.io");
  
  // assert page loaded
  await assertText(page, "Your time travel debugger");
  
  // view Twitter
  const [page2] = await Promise.all([
    page.waitForEvent("popup"),
    page.click('.footer_wrapper [href="https://twitter.com/replayio"]'),
  ]);
  await page2.waitForLoadState("domcontentloaded");
  await page2.bringToFront();
  
  // assert viewing Twitter
  await expect(page2).toHaveURL("https://twitter.com/replayio");
  await assertText(page2, "New to Twitter?");
  
  // close Twitter
  await page2.close();
  
  // view Discord
  const [page3] = await Promise.all([
    page.waitForEvent("popup"),
    page.click('.footer_wrapper [href="https://replay.io/discord"]'),
  ]);
  
  var discordButton = page.locator(
    '.footer_wrapper [href="https://replay.io/discord"]'
  );
  var discordLink = await discordButton.getAttribute("href");
  
  // assert viewing Discord
  assert(discordLink.includes("discord"));
  await assertText(page3, "Replay");
  
  // close Discord
  await page3.close();
  
  // view GitHub
  const [page4] = await Promise.all([
    page.waitForEvent("popup"),
    page.click('.footer_wrapper [href="https://github.com/replayio"]'),
  ]);
  
  // assert viewing GitHub
  await expect(page4).toHaveURL("https://github.com/replayio");
  

  process.exit();
})();