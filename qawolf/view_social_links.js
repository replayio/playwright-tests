const {
  assert,
  assertElement,
  assertText,
  expect,
  faker,
  getInbox,
  getValue,
  launch,
  launchReplay,
  uploadReplay,
  assertNotElement,
  assertNotText,
  buildUrl,
  deleteTeam,
  getBoundingClientRect,
  getPlaybarTooltipValue,
  logIn,
  logInToFacebook,
  parseInviteUrl,
  setFocus,
  waitForFrameNavigated,
  bubbleLogin,
  superblocksLogin,
  navigateTo,
  openPopup
} = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto("https://replay.io");
  
  // assert page loaded
  await expect(
    page.locator("text=The time-travel debugger from the future.")
  ).toBeVisible();
  
  // wheel down to social links
  await page.mouse.wheel(0, 30000);
  
  // view Twitter
  const [page2] = await Promise.all([
    page.waitForEvent("popup"),
    page.click('[href="https://twitter.com/replayio"]'),
  ]);
  await page2.waitForLoadState("domcontentloaded");
  await page2.bringToFront();
  
  // assert viewing Twitter
  await expect(page2).toHaveURL("https://twitter.com/replayio");
  await assertText(page2, "New to Twitter?");
  
  // close Twitter
  await page2.close();
  
  // view Discord
  var discordButton = page.locator('[aria-label="discord"]');
  var discordLink = await discordButton.getAttribute("href");
  
  await page.click('[aria-label="discord"][href="/discord"]');
  
  // assert viewing Discord
  assert(discordLink.includes("discord"));
  await assertText(page, "Replay");
  
  // close Discord
  await page.goto("https://replay.io");
  
  // wheel down to social links
  await page.mouse.wheel(0, 30000);
  
  // view LinkedIn
  const [page4] = await Promise.all([
    page.waitForEvent("popup"),
    page.click('[href="https://www.linkedin.com/company/replayio/"]'),
  ]);
  
  // assert viewing linkedIn
  await expect(page4.locator('[data-test-id="nav-logo"]')).toBeVisible();
  try {
    await expect(
      page4.locator("text=New to LinkedIn? Join now").last()
    ).toBeVisible({ timeout: 5000 });
  } catch {
    await page4.click(':text("Already on Linkedin? Sign in")');
  }
  

  process.exit();
})();