const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Remirror: input text, apply commands";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // launch replay browser
  const { browser, context } = await launchReplay();
  
  // launch page
  // const { context } = await launch();
  const page = await context.newPage();
  await page.goto("https://remirror.io/");
  
  // assert page loaded
  await assertText(page, "Docs");
  
  // set input
  await page.type('[contenteditable="true"]', "@j");
  
  // select joe
  await page.press('[contenteditable="true"]', "Enter");
  
  // select text
  await page.keyboard.down("Shift");
  await page.keyboard.down("Control");
  await page.press('[contenteditable="true"]', "ArrowLeft");
  
  // bold text
  await page.click("[name='bold']");
  
  // unbold text
  await page.click("[name='bold']");
  
  // select text
  await page.keyboard.down("Shift");
  await page.keyboard.down("Control");
  await page.press('[contenteditable="true"]', "ArrowLeft");
  
  // underline text
  await page.click("[name='underline']");
  
  // remove underline
  await page.click("[name='underline']");
  
  // list and upload the replay
  await uploadReplay(page);
  
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  

  process.exit();
})();