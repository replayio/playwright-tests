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
  // go to google
  // const { context } = await launch();
  // launch replay browser
  const { browser, context } = await launchReplay();
  const page = await context.newPage();
  await page.goto("https://www.google.com");

  // search
  await page.fill(
    '[aria-label="Search"]',
    "site:wikipedia.org time travel debugging"
  );
  await page.press('[aria-label="Search"]', "Enter");

  // assert search
  await page.waitForSelector('h3:has-text("Time travel debugging")');

  // open about this result modal
  await page.click('.g [role="button"] > span');

  // assert about this result modal
  await assertText(page, "About this result");

  // close about this result modal
  await page.waitForTimeout(2000);
  await page.click('[aria-label="Close About This Result"]');

  // assert close about this result modal
  await assertNotText(page, "About this result");

  // list and upload the replay
  await uploadReplay(page);

  process.exit();
})();
