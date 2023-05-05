const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "ESPN: search for player";

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
  // const { context } = await launch();
  const page = await context.newPage();
  await page.goto("https://www.espn.com/", { timeout: 60 * 1000 });
  
  // navigate to team page
  await page.hover("#global-nav >> text=NBA");
  await page.click(".team >> text=Denver Nuggets");
  
  // search player
  await page.waitForTimeout(3000);
  await page.click(".Nav__Search__Toggle");
  await page.waitForTimeout(3000);
  await page.fill("#searchBox", "Nikola Jokic");
  await page.waitForTimeout(3000);
  await page.press("#searchBox", "Enter");
  await page.waitForTimeout(3000);
  // await page.waitForNavigation();
  
  // assert search player
  await assertElement(page, 'span:has-text("Nikola Jokic")');
  
  // list and upload the replay
  await uploadReplay(page);
  
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  

  process.exit();
})();