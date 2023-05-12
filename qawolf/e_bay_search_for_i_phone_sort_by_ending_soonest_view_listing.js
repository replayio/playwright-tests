const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "eBay: search for iPhone, sort by ending soonest, view listing";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // launch replay browser
  const { browser, context } = await launchReplay();
  const page = await context.newPage();
  await page.goto("https://ebay.com");
  
  // search iPhone
  await page.fill('[aria-label="Search for anything"]', "iPhone");
  await page.click('[type="submit"]');
  
  // assert search results
  await expect(page.locator(':text("Android")')).not.toBeVisible();
  await expect(page.locator("text=results for iPhone")).toBeVisible();
  
  // sort listings
  await page.click('[aria-label="Sort selector. Best Match selected."]');
  await page.click("text=Time: ending soonest");
  
  // assert sort listing
  await assertText(page, "Time: ending soonest");
  
  // navigate to listing
  const [popup] = await Promise.all([
    page.waitForEvent("popup"),
    page.click(".srp-results li.s-item a.s-item__link"),
  ]);
  await popup.waitForLoadState();
  
  // assert listing
  await assertText(popup, "iPhone");
  
  // list and upload the replay
  await uploadReplay(page);
  
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  shared.popup = popup;
  

  process.exit();
})();