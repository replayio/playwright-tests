const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Google: search, view about result";

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
  
  // go to google
  // const { context } = await launch();
  // launch replay browser
  const { browser, context } = await launchReplay();
  const page = await context.newPage();
  await page.goto("https://www.google.com");
  
  // search
  await page.fill(
    '[aria-label="Search"]',
    "site:wikipedia.org time travel debugging"
  );
  await page.press('[aria-label="Search"]', "Enter");
  
  // assert search
  await page.waitForSelector('h3:has-text("Time travel debugging")');
  
  // open about this result modal
  await page.click('.g [role="button"] > span');
  
  // assert about this result modal
  await assertText(page, "About this result");
  
  // close about this result modal
  await page.waitForTimeout(2000);
  await page.click('[aria-label="Close About This Result"]');
  
  // assert close about this result modal
  await assertNotText(page, "About this result");
  
  // list and upload the replay
  await uploadReplay(page);
  
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  

  process.exit();
})();