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
  // test helpers
  const moveRecordingTo = async (page, location) => {
    await page.fill('[placeholder="Search"]', "Move recording library > team");
    await page.keyboard.press("Enter");
    await page.hover("text=Move recording library > team");
    await page.click('#recording-list [data-test-id="consoleDockButton"]');
    await page.click(`[role="menu"] >> text=${location}`);
  };

  // log in
  const { page } = await logIn({ userId: 6 });

  // go to test library
  await page.click(':text("LC Team (Test team)")');

  // ensure recording listed under test team
  try {
    await expect(
      page.locator(':text("Move recording library > team")')
    ).toBeVisible();
  } catch {
    await page.click("text=Your Library");
    await moveRecordingTo(page, "LC Team (Test team)");
    await page.click("text=LC Team (Test team)");
  }

  // move recording to library
  await moveRecordingTo(page, "Your Library");

  // assert recording moved to library
  await page.click("text=Your Library");
  await expect(
    page.locator("text=Move recording library > team")
  ).toBeVisible();

  // move recording to LC Team
  await moveRecordingTo(page, "LC Team (Test team)");

  // assert recording moved to test team
  await page.click("text=LC Team (Test team)");
  await expect(
    page.locator("text=Move recording library > team")
  ).toBeVisible();

  process.exit();
})();
