const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  const TEST_NAME = "Surveymonkey: Login/logout";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, extractAppAndPageFromUrl, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // REQ471 Surveymonkey: Login
  const { page } = await logInToSurveymonkey();
  
  // REQ472 Surveymonkey: Logout
  expect(page.url()).toContain("dashboard");
  // await page.click('[aria-label="Open user menu"]');
  await page.click('[data-testid="mm-header"] [aria-label="Open User menu"]'); 
  // await page.click(':text("Sign Out")');
  await page.click('[data-testid="mm-header"] [href="/user/sign-out/?ut_source=header"]');
  
  expect(page.url()).not.toContain("dashboard");
  
  // upload replay
  await uploadReplay(page);
  
  
  shared.page = page;

  process.exit();
})();