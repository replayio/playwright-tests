const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Surveymonkey: View upgrade options";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // REQ471 Surveymonkey: Login
  const { page } = await logInToSurveymonkey();
  
  // REQ483 Surveymonkey: View upgrade options
  await page.click(':text("Upgrade")');
  await expect(
    page.locator("text=Choose a plan that works for you")
  ).toBeVisible();
  await expect(page.locator("text=TEAM ADVANTAGE")).toHaveCount(3);
  await expect(page.locator("text=TEAM PREMIER")).toHaveCount(3);
  await expect(page.locator("text=ENTERPRISE")).toHaveCount(7);
  await expect(page.locator("text=SELECT")).toHaveCount(5);
  
  // upload replay
  await uploadReplay(page);
  
  shared.page = page;
  

  process.exit();
})();