const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Assert collaborator UI hidden from non-team member";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, extractAppAndPageFromUrl, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // test helpers
  const url = buildUrl(
    "/recording/collaborator-ui-recording--0a576b87-1bb9-420c-8a09-80d4235e8ac3?point=76910897217837429657213841486905344&time=24345&hasFrames=false"
  );
  
  // log in
  const { page } = await logIn({ userId: 11 });
  await assertText(page, "Library");
  
  // go to recording
  await page.goto(url);
  
  // assert recording loaded
  await assertText(page, "Collaborator UI Recording");
  await assertText(page, "DevTools");
  
  // try to add collaborator
  await page.click("text=ios_shareShare");
  
  // assert share modal opened
  await assertElement(page, ".sharing-modal");
  
  // assert collaborator UI is hidden
  const emailInput = page.locator('[placeholder="Email address"]');
  await expect(emailInput).toHaveCount(0);
  
  
  
  shared.url = url;
  shared.page = page;
  shared.emailInput = emailInput;

  process.exit();
})();