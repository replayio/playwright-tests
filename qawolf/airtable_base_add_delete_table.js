const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Airtable: Base - Add & Delete Table";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, extractAppAndPageFromUrl, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // REQ305 Airtable: log in
  const { page } = await logInToAirtable();
  
  // navigate to designated workspace
  await page.click('[aria-label="Awesome Base"]');
  await page.waitForTimeout(2000);
  
  // clean test
  while (await page.locator("text=QA table").count()) {
    await page.click(`:text("QA table") >> nth=0`);
    await page.waitForTimeout(500);
    await page.click(`:text("QA table") >> nth=0`);
    await page.click(':text("Delete table")');
    await page.click(".focusFirstInModal");
    await page.waitForTimeout(500);
  }
  
  // REQ460 Airtable: Add Table
  await page.click('[aria-label="Add or import table"]');
  await page.click(':text("Create empty table")');
  const tableName = `QA Table ` + Date.now().toString().slice(-4);
  await page.fill('[aria-label="Table name editor"]', tableName);
  await page.keyboard.press("Enter");
  
  await expect(page.locator(`text=${tableName}`)).toBeVisible();
  
  // REQ461 Airtable: Delete table
  await page.click(`:text("${tableName}")`);
  await page.click(':text("Delete table")');
  await page.click(".focusFirstInModal");
  
  await expect(page.locator(`text=${tableName}`)).toBeHidden();
  
  
  
  shared.page = page;
  shared.tableName = tableName;

  process.exit();
})();