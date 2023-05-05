const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  const TEST_NAME = "Developer role able to view team API keys";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, extractAppAndPageFromUrl, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, extractAppAndPageFromUrl, addEventAddAction } = shared;
  
  // log in
  const { browser, page } = await logIn({ userId: 10 });
  await assertText(page, "Your Library");
  
  // go to team settings
  // await page.click('[title="Test Permissions"]');
  await page.click(':text("Test Permissions")');
  await page.click("text=settings");
  // NOTE: API Keys used to be under these settings below Team Members
  
  // assert team seetings loaded
  await assertText(page, "Team Members");
  await assertText(page, "Chris Burton");
  
  // go to api keys
  await page.click(".close");
  await page.click(':text("QA WolfView settings")');
  await expect(page.locator("text=API Keys").first()).toBeVisible();
  await page.click("text=API Keys");
  
  // assert api key view loaded
  await expect(page.locator("text=CREATE NEW API KEY")).toBeVisible();
  await expect(page.locator('[placeholder="API Key Label"]')).toBeVisible();
  await expect(page.locator("button:has-text('Add')").first()).toBeVisible();
  
  // close settings
  await page.click(".close");
  
  await logOut(page);
  
  
  
  shared.browser = browser;
  shared.page = page;

  process.exit();
})();