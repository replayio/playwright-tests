const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Facebook: toggle ad campaign on and off";

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
  // const { browser, context } = await launchReplay();
  
  // log in to Facebook
  const { page } = await logInToFacebook(
    "qawreplayuser@gmail.com",
    "Replayfb-qaw1"
  );
  
  await assertText(page, "Richard Qaw");
  
  // go to ads manager
  await page.goto("https://facebook.com/adsmanager/manage");
  
  // view campaigns
  await page.click("#CAMPAIGN_GROUP_AdsClassicTab");
  
  // ensure campaign toggled on
  await assertText(page, "Test Campaign");
  const turnOnToggle = await page.$('#statusChangeNuxRoot [role="switch"]');
  if (turnOnToggle) turnOnToggle.click();
  
  // toggle campaign off
  await page.uncheck('[data-visualcompletion="ignore"] [type="checkbox"]');
  await page.hover('[data-visualcompletion="ignore"] [type="checkbox"]');
  await assertText(page, "Turn on campaign");
  
  // toggle campaign on
  await page.check('[data-visualcompletion="ignore"] [type="checkbox"]');
  await page.hover('[data-visualcompletion="ignore"] [type="checkbox"]');
  await assertText(page, "Turn off campaign");
  
  // list and upload the replay
  await uploadReplay(page);
  
  shared.page = page;
  shared.turnOnToggle = turnOnToggle;
  

  process.exit();
})();