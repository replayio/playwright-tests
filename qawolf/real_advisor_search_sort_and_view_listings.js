const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "RealAdvisor: search, sort and view listings";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, extractAppAndPageFromUrl, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, extractAppAndPageFromUrl, addEventAddAction } = shared;
  
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://realadvisor.ch');
  
  // search listings
  await page.click("text=Buy");
  await page.waitForTimeout(1000);
  await page.fill('[placeholder="Enter location"]', "Zurich");
  await page.waitForTimeout(1000);
  await page.click("text=Zürich");
  await page.waitForTimeout(1000);
  await page.click('button.filter');
  
  // assert search listings
  await assertText(page, "Houses & Apartments For Sale in 8001 Zürich");
  
  // filter by most recent
  await page.click("text=Our recommendations");
  await page.click("text=Most recent");
  
  // assert filter by most recent
  await assertText(page, "Most recent");
  
  // click first listing
  await page.waitForTimeout(3000);
  await page.click('[class$=AggregatesListings] [class$=AggregatesListingCard] a >> nth=1'); // NOTE: Added nth=1 because the RealAdvisor site was broken on the first listing
  await page.waitForTimeout(3000);
  
  // assert listing
  await assertText(page, "Description");
  
  
  shared.context = context;
  shared.page = page;

  process.exit();
})();