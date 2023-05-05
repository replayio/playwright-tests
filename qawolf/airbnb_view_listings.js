const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  const TEST_NAME = "Airbnb: view listings";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, extractAppAndPageFromUrl, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, extractAppAndPageFromUrl, addEventAddAction } = shared;
  
  // launch replay browser
  const { browser, context } = await launchReplay();
  
  // go to Airbnb
  const page = await context.newPage();
  await page.goto("https://airbnb.com");
  await assertText(page, "Cabins");
  
  try {
    await expect(page.locator('[data-testid="modal-container"]')).not.toBeVisible(
      { timeout: 5000 }
    );
  } catch {
    await page.click('[data-testid="modal-container"] [aria-label="Close"]');
  }
  
  // search for tahoe
  await page.waitForTimeout(3000);
  await page.click('[data-testid="little-search"] :text("LocationAnywhere")');
  await page.fill('[data-testid="structured-search-input-field-query"]', "tahoe");
  await page.click(
    '[data-testid="structured-search-input-field-query-panel"] >> text=Tahoe'
  );
  await page.click(
    ':text("Search"):right-of([data-testid="structured-search-input-field-guests-button"])'
  );
  await assertText(page, "Lake Tahoe");
  
  // filter by price
  await page.waitForTimeout(3000);
  await page.click(':text("Filters")');
  await page.fill('[data-testid="modal-container"] #price_filter_max', "500");
  
  await page.click('[data-testid="modal-container"] footer a');
  
  // assert price filter applied
  await expect(page.locator(':text("$500")')).not.toBeVisible();
  
  // list and upload the replay
  await uploadReplay(page);
  
  
  shared.browser = browser;
  shared.context = context;
  shared.page = page;

  process.exit();
})();