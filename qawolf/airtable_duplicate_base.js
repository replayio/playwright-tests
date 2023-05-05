const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Airtable: Duplicate Base";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, extractAppAndPageFromUrl, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // REQ305 Airtable: log in
  const { page } = await logInToAirtable();
  
  // clean test
  while (await page.locator("text=Awesome Base copy").count()) {
    await page.click('[aria-label="Awesome Base copy"]', {button: "right"});
    await page.click(':text("Delete base")');
    await page.click(".focusFirstInModal");
    await page.waitForTimeout(500);
  }
  
  // REQ468 Airtable: Duplicate Base
  await page.click('[aria-label="Awesome Base"]', {button: "right"});
  await page.click(':text("Duplicate base")');
  await page.waitForTimeout(500);
  await page.click(':text("Duplicate base")');
  
  await expect(page.locator('text=Awesome Base copy')).toBeVisible();
  
  // REQ452 Airtable: Delete base
  await page.click('[aria-label="Awesome Base copy"]', {button: "right"});
  await page.click(':text("Delete base")');
  await page.waitForTimeout(500);
  await page.click(".focusFirstInModal");
  
  await page.waitForTimeout(4000);
  await expect(page.locator('text=copy')).toBeHidden();
  
  
  shared.page = page;

  process.exit();
})();