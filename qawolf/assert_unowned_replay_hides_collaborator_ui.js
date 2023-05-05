const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  const TEST_NAME = "Assert unowned replay hides collaborator UI";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, extractAppAndPageFromUrl, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, extractAppAndPageFromUrl, addEventAddAction } = shared;
  
  // helper
  const url = buildUrl(
    "/recording/longer-replay-for-testing--7e7af868-3651-49ed-b02c-4216df943fec"
  );
  
  // log in
  const { page } = await logIn({ userId: 7, options: { slowMo: 1000 } });
  await assertText(page, "Library");
  
  // go to recording url
  await page.goto(url);
  await page.waitForTimeout(3000);
  
  // assert recording loaded
  const recordingName = page.locator("text=Longer Replay for Testing");
  await expect(recordingName).toBeVisible({ timeout: 3 * 60 * 1000 });
  
  // open share modal
  await page.click("text=ios_shareShare");
  
  // assert share modal opened
  await assertElement(page, ".sharing-modal");
  
  // assert collaborator UI is hidden
  const emailInput = page.locator('[placeholder="Email address"]');
  const collaboratorText = page.locator("text=Collaborator");
  await expect(emailInput).toHaveCount(0); // Author is present - NOTE: It is made public now though
  await expect(collaboratorText).toHaveCount(0);
  await page.mouse.click(0, 0);
  
  await page.goBack();
  await logOut(page);
  
  
  
  shared.url = url;
  shared.page = page;
  shared.recordingName = recordingName;
  shared.emailInput = emailInput;
  shared.collaboratorText = collaboratorText;

  process.exit();
})();