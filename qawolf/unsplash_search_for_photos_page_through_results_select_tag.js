const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Unsplash: search for photos, page through results, select tag";

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
  
  // launch replay browser
  const { browser, context } = await launchReplay();
  
  // launch page
  // const { context } = await launch();
  const page = await context.newPage();
  await page.goto("https://unsplash.com/");
  
  // assert page is loaded
  await assertText(page, "Log in");
  
  // search for trees
  await page.fill('[data-test="homepage-header-search-form-input"]', "trees");
  await page.press('[data-test="homepage-header-search-form-input"]', "Enter");
  
  // assert search results
  await assertText(page, "Trees", {
    selector: '[data-test="page-header-title"]',
  });
  
  // click image
  await page.click("figure img");
  
  // assert clicked image
  // await assertText(page, "Views");
  
  // navigate through results
  await page.click('[title="Next"]');
  await page.click('[title="Next"]');
  await page.click('[title="Next"]');
  
  // select tags
  await page.click('.ReactModalPortal a[href^="/s"]');
  
  // assert results are different after selecing tag
  // await assertNotText(page, "Trees", { selector: '[data-test="page-header-title"]' });
  await expect(page.locator('[data-test="page-header-title"]')).not.toHaveText(
    "Trees"
  );
  
  // list and upload the replay
  await uploadReplay(page);
  
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  

  process.exit();
})();