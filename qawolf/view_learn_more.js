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
} = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto("https://replay.io");

  // assert page loaded
  await assertText(page, "The time-travel debugger from the future.");

  // navigate to learn more links
  const [page2] = await Promise.all([
    context.waitForEvent("page"),
    page.click("text=Blog"),
  ]);

  // navigate to how replay works page
  await page2.click('[href="/replay:-november-issue"]');

  // assert universal recorder URL
  // expect(page2.url()).toBe('https://medium.com/p/5c9c29580c58');
  await page2.waitForTimeout(2000);
  expect(page2.url()).toBe("https://blog.replay.io/replay:-november-issue");

  // close tab
  await page2.close();

  // navigate to security and privacy
  await page.click(':text("Security & Privacy")');

  // assert security and privacy
  await assertText(page, "Security & Privacy");
  await assertText(page, "Our Approach to Secure Development");

  process.exit();
})();
