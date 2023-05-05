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
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://www.qawolf.com/guides/create-a-test?user_id=ckyf23vxd000508jkhjvv47xg');
  await page.click("#wolf-name");
  await page.click("#wolf-name");
  await page.click("#wolf-name");
  await page.fill("#wolf-name", "hello");
  await page.click('[aria-label="Name your wolf"]');
  await page.click('[aria-label="Next"]');
  await page.click('[aria-label="Next"]');
  await page.click('[alt="toggle code creation"]');
  await page.click('[alt="toggle code creation"]');
  await page.click('[alt="toggle code creation"]');
  await page.click('[aria-label="Next"]');
  await assertText(page, "Then select this text.");
  await page.click('[aria-label="Next"]');
  // 🐺 QA Wolf will create code here

  process.exit();
})();