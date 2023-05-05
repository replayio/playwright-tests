const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Surveymonkey: View upgrade options";

  // REQ471 Surveymonkey: Login
  const { page } = await logInToSurveymonkey();
  
  // REQ483 Surveymonkey: View upgrade options
  await page.click(':text("Upgrade")');
  await expect(page.locator('text=Choose a plan that works for you')).toBeVisible();
  await expect(page.locator('text=TEAM ADVANTAGE')).toHaveCount(3);
  await expect(page.locator('text=TEAM PREMIER')).toHaveCount(3);
  await expect(page.locator('text=ENTERPRISE')).toHaveCount(7);
  await expect(page.locator('text=SELECT')).toHaveCount(5);
  
  // upload replay
  await uploadReplay();

  process.exit();
})();