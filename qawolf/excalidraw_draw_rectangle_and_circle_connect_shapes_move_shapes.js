const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Excalidraw: draw rectangle and circle, connect shapes, move shapes";

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
  
  // open Excalidraw
  // launch replay browser
  const { browser, context } = await launchReplay();
  // const { context } = await launch();
  const page = await context.newPage();
  await page.goto("https://excalidraw.com");
  
  // calculate center
  const canvas = await getBoundingClientRect("canvas")(page);
  const center = {
    x: canvas.x + canvas.width / 2,
    y: canvas.y + canvas.height / 2,
  };
  
  // draw a rectangle
  await page.click('[title="Rectangle — R or 2"]');
  await page.mouse.move(center.x, center.y);
  await page.mouse.down();
  await page.mouse.move(center.x + 100, center.y + 100, { steps: 10 });
  await page.mouse.up();
  
  // draw a circle
  await page.click('[title="Ellipse — O or 4"]');
  await page.mouse.move(center.x + 250, center.y);
  await page.mouse.down();
  await page.mouse.move(center.x + 350, center.y + 100, { steps: 10 });
  await page.mouse.up();
  
  // connect shapes
  await page.click('[title="Arrow — A or 5"]');
  await page.mouse.move(center.x + 100, center.y + 50);
  await page.mouse.down();
  await page.mouse.move(center.x + 250, center.y + 50, { steps: 10 });
  await page.mouse.up();
  
  // select all shapes
  await page.click('[title="Selection — V or 1"]');
  await page.keyboard.press("Control+A");
  
  // move shapes
  await page.mouse.move(center.x + 250, center.y + 50);
  await page.mouse.down();
  await page.mouse.move(center.x + 100, center.y + 50, { steps: 10 });
  await page.mouse.up();
  
  // list and upload the replay
  await uploadReplay(page);
  
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  shared.canvas = canvas;
  shared.center = center;
  

  process.exit();
})();