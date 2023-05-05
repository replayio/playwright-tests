const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Storybook UI: open story, click tabs component";

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
  await page.goto("https://5ccbc373887ca40020446347-qbeeoghter.chromatic.com");
  
  // open avatar story
  await page.click(selectors.storyByPath("/Avatar/"));
  
  // open avatar story small
  await page.click(selectors.storyByPath("/Avatar/Small"));
  
  // open codesnippets
  await page.click(selectors.storyByPath("/CodeSnippets/"));
  
  // open codesnippets multiple
  await page.click(selectors.storyByPath("/CodeSnippets/Multiple"));
  
  // select tabs
  await page.click(selectors.tabByTitle("Actions"));
  await page.click(selectors.tabByTitle("Story"));
  
  // assert story tab
  await assertText(page, "1(args) => <CodeSnippets {...args} />");
  
  // list and upload the replay
  await uploadReplay(page);
  
  shared.selectors = selectors;
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  

  process.exit();
})();