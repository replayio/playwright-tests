const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  const TEST_NAME = "Quill: add text, bold text";

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
  
  // navigate to quilljs
  const page = await context.newPage();
  await page.goto("https://quilljs.com/playground/");
  
  // assert page loaded
  await assertText(page, "Interactive Playground");
  
  // grab iframe
  const frame = await(await page.waitForSelector("iframe")).contentFrame();
  const resultFrame = await(
    await frame.waitForSelector("#result-iframe")
  ).contentFrame();
  
  // click into editor
  await resultFrame.click("#editor-container");
  
  // add text
  await resultFrame.type("#editor-container", "Hello World");
  
  // highlight text
  await page.keyboard.down("Control");
  await page.keyboard.down("Shift");
  await page.keyboard.press("ArrowLeft");
  
  await page.keyboard.up("Control");
  await page.keyboard.up("Shift");
  
  // bold text
  await resultFrame.click(".ql-bold");
  
  await resultFrame.click("#editor-container");
  
  // list and upload the replay
  await uploadReplay(page);
  
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  shared.frame = frame;
  shared.resultFrame = resultFrame;
  

  process.exit();
})();