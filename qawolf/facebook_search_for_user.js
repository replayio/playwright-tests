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
  // log in to Facebook
  const { page } = await logInToFacebook(
    "qawreplayuser@gmail.com",
    "Replayfb-qaw1"
  );

  // wait for page to load
  await page.waitForTimeout(3 * 1000);

  // search for a user
  await page.mouse.click(0, 0);
  await page.fill('[aria-label="Search Facebook"]', "Mike");
  await assertText(page, "Mike Algdbbidiajhg Martinazzison");

  // added something to get rid of the facebook modal
  const facebookModal = await page
    .locator(
      ':text("If you change your mind, click the lock to give Chrome permission to send you desktop notifications.")'
    )
    .count();
  if (facebookModal) {
    await page.click('[role="main"]');
    await page.fill('[aria-label="Search Facebook"]', "Mike");
    await assertText(page, "Mike Algdbbidiajhg Martinazzison");
  }
  await page.click('[aria-label="Search Facebook"]');
  await page.waitForTimeout(3000);
  await page.click("text=Search for mike");
  try {
    await page.waitForSelector("text=Search Results");
  } catch {
    await page.click("text=Search for mike"); // I'm not sure why but it only hover clicks the first time so this second one is needed
  }

  // view posts
  await page.waitForTimeout(5000);
  await page.click(':text("Posts")');
  await assertText(page, "Posts You've Seen");

  // view people
  await page.click(":text('People')");
  // friends of friends now hidden below a dropdown
  await page.click('[aria-label="Friends"] i');
  await assertText(page, "Friends of Friends");

  // list and upload the replay
  await uploadReplay(page);

  process.exit();
})();
