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
  await expect(
    page.locator("text=The time-travel debugger from the future.")
  ).toBeVisible();

  // wheel down to footer links
  await page.mouse.wheel(0, 30000);

  // view footer blog
  const [page2] = await Promise.all([
    page.waitForEvent("popup"),
    page.click(':text("Blog")'),
  ]);

  // assert url is correct
  expect(page2.url()).toEqual("https://blog.replay.io/");

  // close blog
  await page2.close();

  // view footer security and privacy
  await page.click('[href="/security-and-privacy"]');

  // assert security and privacy
  expect(page.url()).toEqual("https://www.replay.io/security-and-privacy");
  await expect(page.locator("h1")).toHaveText("Security & Privacy");
  await expect(page.locator("text=EFECTIVE DATE")).toBeVisible();
  await expect(
    page.locator("text=Our Approach to Secure Development")
  ).toBeVisible();

  process.exit();
})();
