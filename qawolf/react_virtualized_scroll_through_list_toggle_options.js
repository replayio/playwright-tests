const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "React virtualized: scroll through list, toggle options";

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
  
  // helpers
  const selectors = {
    scrollContainer: ".ReactVirtualized__Grid__innerScrollContainer",
    dynamicHeightLabel: "text='Use dynamic row heights?'",
    scrollPlaceholderLabel: "text='Show scrolling placeholder?'",
  };
  
  const scrollThroughList = async (page) => {
    await page.click(`${selectors.scrollContainer} > div`);
  
    await page.press(selectors.scrollContainer, "Home");
  
    for (let i = 0; i < 10; i++) {
      await page.press(selectors.scrollContainer, "PageDown");
      await page.waitForTimeout(200);
    }
  };
  
  // launch replay browser
  const { browser, context } = await launchReplay();
  
  // launch page
  // const { context } = await launch();
  const page = await context.newPage();
  await page.goto(
    "https://bvaughn.github.io/react-virtualized/#/components/List"
  );
  
  // scroll through list
  await scrollThroughList(page);
  
  // toggle use dynamic row height
  await page.click(selectors.dynamicHeightLabel);
  
  // toggle show scrolling placehodler
  await page.click(selectors.scrollPlaceholderLabel);
  
  // assert dynamic row toggle
  await assertText(page, "It has a 3rd row.");
  
  // scroll through list
  await page.click(`${selectors.scrollContainer} > div`);
  
  await page.press(selectors.scrollContainer, "Home");
  
  // assert scroll placeholder is toggled
  for (let i = 0; i < 10; i++) {
    await page.press(selectors.scrollContainer, "PageDown");
    await assertText(page, "Scrolling");
    await page.waitForTimeout(200);
  }
  
  // list and upload the replay
  await uploadReplay(page);
  
  shared.selectors = selectors;
  shared.scrollThroughList = scrollThroughList;
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  

  process.exit();
})();