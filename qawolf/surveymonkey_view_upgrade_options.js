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
  // REQ471 Surveymonkey: Login
  const { page } = await logInToSurveymonkey();

  // REQ483 Surveymonkey: View upgrade options
  await page.click(':text("Upgrade")');
  await expect(
    page.locator("text=Choose a plan that works for you")
  ).toBeVisible();
  await expect(page.locator("text=TEAM ADVANTAGE")).toHaveCount(3);
  await expect(page.locator("text=TEAM PREMIER")).toHaveCount(3);
  await expect(page.locator("text=ENTERPRISE")).toHaveCount(7);
  await expect(page.locator("text=SELECT")).toHaveCount(5);

  // upload replay
  await uploadReplay(page);

  process.exit();
})();
