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

  // log in to Facebook
  const { page } = await logInToFacebook();

  // view friends list
  await page.click('[aria-label="Friends"]');
  await assertText(
    page,
    "When you have friend requests or suggestions, you'll see them here."
  );
  await page.click("text=All Friends");

  // assert friends are listed
  await page.waitForSelector("text=2 Friends");
  await assertText(page, "Mike Algdbbidiajhg Martinazzison");

  // view friend profile
  await page.click("text=Mike Algdbbidiajhg Martinazzison");
  await assertText(page, "Intro");
  await page.evaluate(() => window.scrollTo(0, 500)); // scroll down
  await page.waitForSelector("text=See all friends");

  // view post image
  await page.click('[alt="No photo description available."]');
  await assertElement(page, '[aria-label="Photo Viewer"]');
  await assertElement(page, '[aria-label="Zoom In"]');
  await page.click('[aria-label="Close"]');

  // view user photos
  await assertText(page, "All friends");
  await page.click("text=See All Photos");
  await assertText(page, "Mike's Photos");
  await page.evaluate(() => window.scrollTo(0, 200)); // scroll down

  // view individual photo
  await page.click('[alt="No photo description available."]');
  await assertElement(page, '[aria-label="Photo Viewer"]');

  // list and upload the replay
  await uploadReplay(page);

  process.exit();
})();
