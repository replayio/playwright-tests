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
  // helper
  const url = buildUrl(
    "/recording/longer-replay-for-testing--7e7af868-3651-49ed-b02c-4216df943fec"
  );

  // log in
  const { page } = await logIn({ userId: 7, options: { slowMo: 1000 } });
  await assertText(page, "Library");

  // go to recording url
  await page.goto(url);
  await page.waitForTimeout(3000);

  // assert recording loaded
  const recordingName = page.locator("text=Longer Replay for Testing");
  await expect(recordingName).toBeVisible({ timeout: 3 * 60 * 1000 });

  // open share modal
  await page.click("text=ios_shareShare");

  // assert share modal opened
  await assertElement(page, ".sharing-modal");

  // assert collaborator UI is hidden
  const emailInput = page.locator('[placeholder="Email address"]');
  const collaboratorText = page.locator("text=Collaborator");
  await expect(emailInput).toHaveCount(0); // Author is present - NOTE: It is made public now though
  await expect(collaboratorText).toHaveCount(0);
  await page.mouse.click(0, 0);

  await page.goBack();
  await logOut(page);

  process.exit();
})();
