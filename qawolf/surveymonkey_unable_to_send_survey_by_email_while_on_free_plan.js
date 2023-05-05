const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Surveymonkey: Unable to send survey by email while on free plan";

  // REQ471 Surveymonkey: Login
  const { page, browser } = await logInToSurveymonkey();
  
  // clean tests
  await cleanSurveys(page);
  
  // REQ473 Surveymonkey: Create a survey from scratch
  const survey = await createSurveyFromScratch(page)
  
  // REQ481 Surveymonkey: Unable to send survey by email while on free account
  await page.click("#previewSurvey");
  await page.click("#sendSurvey");
  await page.click('[data-testid="AudiencePromoGrid__SendYourWay"]');
  await page.click('[data-testid="CreateCollectorButton__email"]');
  
  // assert upgrade page
  await page.click('[data-testid="CreateCollectorButton__email"] :text("UPGRADE")');
  await expect(page.locator('text=Choose a plan that works for you')).toBeVisible();
  await expect(page.locator('text=TEAM ADVANTAGE')).toHaveCount(3);
  await expect(page.locator('text=TEAM PREMIER')).toHaveCount(3);
  await expect(page.locator('text=ENTERPRISE')).toHaveCount(7);
  
  // REQ475 Surveymonkey: Delete survey
  await page.click('[data-testid="mm-header"] [title="Dashboard"]');
  await deleteSurvey(page, survey);
  
  // upload replay
  await uploadReplay();

  process.exit();
})();