const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Airtable: Add & Delete template Base";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  // REQ305 Airtable: log in
  const { page } = await logInToAirtable();
  
  // clean up
  while (await page.locator("text=Content Calendar").count()) {
    await page.click('[aria-label="Content Calendar"]', {button: "right"});
    await page.click(':text("Delete base")');
    await page.click(".focusFirstInModal");
    await page.waitForTimeout(500);
  }
  
  // REQ456 Airtable: view templates
  await page.click(':text("Templates")');
  await expect(page).toHaveURL(/\/templates/)
  
  // REQ457 Airtable: Add templates
  await page.click(':text("Content Calendar")');
  await page.click(':text("Use template")');
  await page.click(':text("Add base")');
  
  // assert template
  await expect(page.locator('[aria-label="Open base settings menu"]')).toHaveText("Content Calendar")
  await expect(page.locator('text=Content Calendar Template')).toBeVisible();
  await page.click('[aria-label="Go home"]');
  await expect(page.locator('text=Content Calendar')).toBeVisible();
  
  // REQ458 Airtable: Delete template
  await page.click('[aria-label="Content Calendar"]', {button: "right"});
  await page.click(':text("Delete base")');
  await page.click(".focusFirstInModal");
  await expect(page.locator('text=Content Calendar')).toBeHidden();
  
  
  shared.page = page;

  process.exit();
})();