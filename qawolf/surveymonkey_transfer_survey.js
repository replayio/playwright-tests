const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Surveymonkey: Transfer survey";

  // REQ471 Surveymonkey: Login
  const { page, browser } = await logInToSurveymonkey();
  
  // clean tests
  await cleanSurveys(page);
  
  // REQ473 Surveymonkey: Create a survey from scratch
  const survey = await createSurveyFromScratch(page);
  await page.click(':text("SUMMARY")');
  await page.click(':text("Home")');
  
  // REQ480 Surveymonkey: Can't transfer survey to a free account
  await page.click(`:text(". Copy of ${survey}")`);
  await page.click('li:nth-of-type(2) [data-action="transfer"]');
  await expect(page.locator("#transfer-survey-dialog")).toBeVisible();
  await page.fill("#username", "replay+surveymonkeytransfer@qawolf.email");
  await page.fill("#email", "replay+surveymonkeytransfer@qawolf.email");
  await page.click('[value="TRANSFER"]');
  
  await expect(
    page.locator("text=This username isn’t on a paid plan")
  ).toBeVisible();
  await page.click('[name="Cancel"]');
  
  // REQ475 Surveymonkey: Delete survey
  await deleteSurvey(page, survey);
  

  process.exit();
})();