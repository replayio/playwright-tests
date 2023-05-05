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
  // launch replay browser
  const { browser, context } = await launchReplay();

  // go to page
  // const { context } = await launch();
  const page = await context.newPage();
  await page.goto("https://www.denydesigns.com/collections/credenza");

  // assert page loaded
  await assertText(page, "CREDENZA");

  // go to page with Grand Teton National Park
  await page.click('[alt="Search"]');
  await page.fill('[placeholder="Search"]', "GRAND TETON NATIONAL PARK");

  // go to product
  await page.click(
    ':text("grand teton national parkcredenzaBy nature magick")'
  );

  // assert product page loaded
  await page.waitForSelector("text=WHOLESALE LOGIN");
  await assertText(page, "GRAND TETON NATIONAL PARK");

  // list and upload the replay
  await uploadReplay(page);

  process.exit();
})();
