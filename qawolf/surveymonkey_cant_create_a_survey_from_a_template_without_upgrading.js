const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Surveymonkey: Can't create a survey from a template without upgrading";

  // REQ471 Surveymonkey: Login
  const { page } = await logInToSurveymonkey();
  
  // REQ476 Surveymonkey: Can't create a survey from template
  await page.click(':text("Create Survey")');
  await page.click('[data-testid="CreateSurvey__Content"] :text("Start from template")');
  await page.click('[data-testid="CreateSurvey__Content"] [data-testid="SurveyTemplateTile_Container"]');
  await page.click('[data-testid="FullScreenModal__Container"] [type="button"] [aria-label="ArrowRight"]');
  await expect(page.locator('[data-testid="CreateSurvey__Content"] :text("Paid Templates")')).toBeVisible();
  await expect(page.locator('text=UPGRADE')).toHaveCount(3);
  await page.click('[data-testid="CreateSurvey__Content"] footer [type="button"]');
  await expect(page.locator('text=Choose a plan that works for you')).toBeVisible();
  
  // upload replay
  await uploadReplay();

  process.exit();
})();