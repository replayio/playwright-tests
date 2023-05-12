const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "PixiJS: view examples";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // launch replay browser
  const { browser, context } = await launchReplay();
  
  // go to PixiJS
  // const { context } = await launch();
  const page = await context.newPage();
  await page.goto("https://pixijs.io/examples/#/demos-basic/container.js");
  
  // view advanced demos
  await page.click('[data-section="demos-advanced"]');
  
  // go to slots example
  await page.click("text=Slots");
  await assertText(page, "Slots", { selector: "#example-title" });
  
  // spin slot machine
  await page.click("#Layer_1");
  await page.evaluate(() => {
    const content = document.querySelector(".main-content");
    content.scrollTo(0, 0);
  });
  await page.waitForTimeout(5000);
  
  // go to star warp example
  await page.click("text=Star Warp");
  await assertText(page, "Star Warp", { selector: "#example-title" });
  await page.waitForTimeout(5000);
  
  // list and upload the replay
  await uploadReplay(page);
  
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  

  process.exit();
})();