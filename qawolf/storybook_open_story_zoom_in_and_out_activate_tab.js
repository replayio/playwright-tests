const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  const TEST_NAME = "Storybook: open story, zoom in and out, activate tab";

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
    toolbarButtonByTitle: function (title) {
      return `button[title="${title}"]`;
    },
    tabByTitle: function (title) {
      return `button[role="tab"]:text("${title}")`;
    },
    storyByPath: function (path) {
      const parts = path.toLowerCase().split("/");
  
      if (path[0] === "/") parts.shift();
  
      const story = parts.pop();
      return this.storyByItemId(
        story ? `${parts.join("-")}--${story}` : parts.join("-")
      );
    },
    storyByItemId: function (id) {
      return `[data-item-id="${id}"]`;
    },
  };
  
  // launch replay browser
  const { browser, context } = await launchReplay();
  
  // launch page
  // const { context } = await launch();
  const page = await context.newPage();
  await page.goto(
    "https://storybooks-official.netlify.app/?path=/story/ui-panel--default"
  );
  
  // open addons/label
  await page.click(':text("A11y")');
  await page.click(':text("BaseButton")');
  await page.click(':text("Label")');
  
  // open addons/disabled
  await page.click(':text("Disabled")');
  
  // zoom in
  for (let i = 0; i < 5; i++) {
    await page.click(selectors.toolbarButtonByTitle("Zoom in"));
  }
  for (let i = 0; i < 5; i++) {
    await page.click(selectors.toolbarButtonByTitle("Zoom out"));
  }
  
  const tabs = [
    "Story",
    "Actions",
    "Events",
    "Knobs",
    "CSS Resources",
    "Accessibility",
    "Tests",
  ];
  
  // activate tabs
  for (let tab of tabs) {
    await page.click(selectors.tabByTitle(tab));
    await page.waitForTimeout(250);
  }
  
  // list and upload the replay
  await uploadReplay(page);
  
  shared.selectors = selectors;
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  shared.tabs = tabs;
  

  process.exit();
})();