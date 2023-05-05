const {
  assert,
  assertElement,
  assertText,
  expect,
  faker,
  getInbox,
  getValue,
  launch,
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

  // clean tests
  await cleanSurveys(page);

  // REQ473 Surveymonkey: Create a survey from scratch
  const survey = await createSurveyFromScratch(page);

  await page.click(':text("SUMMARY")');
  await page.waitForTimeout(2000);
  await page.click(':text("Dashboard")');
  await page.waitForTimeout(2000);
  await expect(page.locator(`:text("${survey}"):visible`)).toHaveCount(1);

  // REQ474 Surveymonkey: Copy survey
  await page.click(`.survey-item:has-text("${survey}") .more-options`);
  await page.click(':text("Make a copy"):visible');
  await page.waitForTimeout(5000);
  await page.click(':text("SUMMARY")');
  await page.click(':text("Dashboard")');
  await expect(
    page.locator(`:text-is("Copy of ${survey}"):visible`)
  ).toHaveCount(1);

  // REQ475 Surveymonkey: Delete survey
  await page.waitForTimeout(5000);

  // await deleteSurvey(page, `Copy of ${survey}`); // these selectors sometimes alternate
  let deleteSurveyItem = await page.locator(
    // `.survey-item:has-text("${survey}")`
    `.survey-item:has-text("${survey}")`
  );
  // await deleteSurveyItem.first().locator(".more-options").scrollIntoViewIfNeeded()
  // await deleteSurveyItem.first().locator(".more-options").click();
  await deleteSurveyItem
    .first()
    .locator(".more-options")
    .scrollIntoViewIfNeeded();
  await deleteSurveyItem.first().locator(".more-options").click();
  await page.click(':text-is("Delete"):visible');
  await page.click(':text-is("DELETE"):visible');

  await page.waitForTimeout(5000);
  await page.reload();

  deleteSurveyItem = await page.locator(`.survey-item:has-text("${survey}")`);
  await deleteSurveyItem
    .first()
    .locator(".more-options")
    .scrollIntoViewIfNeeded();
  await deleteSurveyItem.first().locator(".more-options").click();
  await page.click(':text-is("Delete"):visible');
  await page.click(':text-is("DELETE"):visible');
  await page.waitForTimeout(2000);
  //

  await page.reload();
  await expect(
    page.locator(`:text-is("Copy of ${survey}"):visible`)
  ).toHaveCount(0);
  await expect(page.locator(`:text("${survey}"):visible`)).toHaveCount(0);

  // upload replay
  await uploadReplay(page);

  process.exit();
})();
