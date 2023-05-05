const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  const TEST_NAME = "Surveymonkey: View account settings";

  const {
    assertNotElement,
    assertNotText,
    buildUrl,
    deleteTeam,
    getBoundingClientRect,
    getPlaybarTooltipValue,
    launchReplay,
    uploadReplay,
    logIn,
    logoutSequence,
    logOut,
    logInToPinterest,
    logInToLinkedin,
    logInToFacebook,
    parseInviteUrl,
    setFocus,
    waitForFrameNavigated,
    logInToAsana,
    deleteAllSuperblocks,
    logInToAirtable,
    getBoundingBox,
    addElementToCanvas,
    logInToSurveymonkey,
    logInToEtsy,
    createSurveyFromScratch,
    cleanSurveys,
    openPopup,
    deleteSurvey,
    selectAllDelete,
    deleteIdeaPin,
    deleteEvenFlows,
    deletePin,
    deleteSurvey2,
    bubbleLogin,
    extractAppAndPageFromUrl,
    navigateTo,
    superblocksLogin,
    dragAndDrogPdf,
    downloadS3File,
    builderLogin,
    twitterLogin,
    editTwitterProfile,
    slackLogin,
    resetSlackProfile,
    bubbleUrl,
    extractAppAndPageFromUrl,
    addEventAddAction,
  } = shared;
  
  // REQ471 Surveymonkey: Login
  const { page } = await logInToSurveymonkey();
  
  // REQ482 Surveymonkey: View account settings
  await page.click('[data-testid="mm-header"] [aria-label="Open User menu"]');
  await page.click('[data-testid="mm-header"] [role="menuitem"] a'); // clicks My Account
  await expect(page.locator("text=Account Details")).toBeVisible();
  await expect(page.locator("text=Basic (Free) Account")).toBeVisible();
  await expect(page.locator("text=Profile")).toHaveCount(3);
  await expect(page.locator("text=Data Features")).toBeVisible();
  await expect(
    page.locator(
      "text=Automatic Insights includes any feature that uses machine learning to process your survey and serve up insights for you—like sentiment analysis."
    )
  ).toBeVisible();
  await expect(
    page.locator(
      "text=Benchmarks give context to your survey results by allowing you to compare your results to others."
    )
  ).toBeVisible();
  await expect(page.locator("text=Linked Accounts")).toBeVisible();
  await expect(page.locator("text=General Preferences")).toBeVisible();
  await expect(page.locator("text=English")).toHaveCount(2);
  
  await page.click(':text("BILLING DETAILS")');
  await expect(
    page.locator(
      "text=You have a BASIC (free) plan. Upgrade now to get unlimited questions, downloadable reports, and more."
    )
  ).toBeVisible();
  
  await page.click(':text("TRANSACTION HISTORY")');
  await expect(
    page.locator("text=You don't have any invoices yet.")
  ).toBeVisible();
  await expect(page.locator("text=Add Audience Credits")).toBeVisible();
  
  // upload replay
  await uploadReplay(page);
  
  shared.page = page;
  

  process.exit();
})();