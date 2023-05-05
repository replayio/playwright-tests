const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  const TEST_NAME = "View team recording";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, extractAppAndPageFromUrl, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, extractAppAndPageFromUrl, addEventAddAction } = shared;
  
  // helper
  const url = buildUrl("/recording/private-recording-test--d27fd0e2-42a4-4f76-a957-34c940b6b162");
  
  // open a team replay
  // let { browser, context, page } = await logIn({ userId: 1 });
  let { browser, context, page } = await logIn({ userId: 7 });
  await page.goto(url);
  
  // check the team member can access it
  await expect(page.locator(`:text('Private Recording Test')`).first()).toBeVisible({timeout: 60 * 1000});
  await page.close();
  
  // go to the replay with a non-team member user
  let { page } = await logIn({ userId: 3 });
  await page.goto(url);
  
  // check the non-team member cannot access it
  await assertText(page, "Sorry, you don't have permission!");
  await assertText(page, "Request access");
  
  
  shared.url = url;
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  shared.page = page;

  process.exit();
})();