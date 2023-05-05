const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Remove user: team member";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, extractAppAndPageFromUrl, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // log in
  const { browser, page } = await logIn({ userId: 6 });
  await assertText(page, "Your Library");
  
  // go to team settings
  await page.click("text=Remove Member Test");
  await page.click("text=settings");
  
  // assert settings loaded
  await assertText(page, 'Team Members');
  
  // ensure replay+deletemember@qawolf.email is present
  await page.click("text=Team Members");
  try {
    await assertText(page, 'replay+deletemember@qawolf.email', {timeout: 7 * 1000});
  } catch (e) {
    // invite the member to delete
    await page.fill('[placeholder="Email address"]', 'replay+deletemember@qawolf.email');
    await page.click("text=Invite");
  };
  
  // remove team member
  await page.click('button:right-of(:text("replay+deletemember@qawolf.email"))');
  await page.waitForTimeout(1000);
  await page.click("[role='menuitem'] >> text=Remove");
  await page.click("text=Remove them");
  
  // assert member removed
  await assertNotText(page, 'replay+deletemember@qawolf.email');
  
  // reinvite replay+deletemember@qawolf.email for next test run
  await page.fill('[placeholder="Email address"]', 'replay+deletemember@qawolf.email');
  await page.click("text=Invite");
  
  // assert member invited
  await assertText(page, 'replay+deletemember@qawolf.email');
  
  
  shared.browser = browser;
  shared.page = page;

  process.exit();
})();