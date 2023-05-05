const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Surveymonkey: Create a survey from scratch";

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
  await expect(page.locator(`:text("${survey}")`)).toHaveCount(1);
  
  // REQ475 Surveymonkey: Delete survey
  // await deleteSurvey(page, survey);
    const deleteSurveyItem = await page.locator(
      `.survey-item:has-text("${survey}")`
    );
  
      await deleteSurveyItem.first().locator(".more-options").scrollIntoViewIfNeeded()
      await deleteSurveyItem.first().locator(".more-options").click();
      await page.click(':text-is("Delete"):visible');
      await page.click(':text-is("DELETE"):visible');
  
  await page.waitForTimeout(5000);
  await page.reload()
  await page.waitForTimeout(5000);
  await expect(page.locator(`:text("${survey}")`)).toHaveCount(0);
  
  // upload replay
  await uploadReplay();

  process.exit();
})();