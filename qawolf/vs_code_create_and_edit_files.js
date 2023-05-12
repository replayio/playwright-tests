const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "VS Code: create and edit files";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // launch replay browser
  const { browser, context } = await launchReplay({
    bypassCSP: true, // vscode.dev defines Content-Security-Policies that prevented the choosen from messing with the DOM
  });
  
  // launch page
  // const { context } = await launch({
  //   bypassCSP: true, // vscode.dev defines Content-Security-Policies that prevented the choosen from messing with the DOM
  // });
  const page = await context.newPage();
  await page.goto("https://vscode.dev");
  
  // assert page loaded
  await assertText(page, "NO FOLDER OPENED");
  
  // view open editors
  await page.click('[title="Views and More Actions..."]');
  await page.waitForSelector('[aria-label="Open Editors"]');
  await page.click('[aria-label="Open Editors"]');
  
  // create css file
  await page.click("text=New File...");
  await page.click(':text("Text File")');
  await page.waitForTimeout(2000);
  await page.click("text=Select a language");
  await page.click("text=CSS(css)");
  
  // add css
  await page.click(".view-line");
  await page.type(".view-line", "body { \n font-size: 34px; \n");
  
  // navigate to get started
  await page.click('[aria-label="Welcome"] a');
  
  // create JavaScript file
  await page.click("text=New File...");
  await page.click("text=Text File");
  await page.click("text=Select a language");
  await page.fill('[aria-label="input"][placeholder="Select Language Mode"]', "javascript");
  await page.click("text=JavaScript(javascript)");
  
  // add JavaScript
  await page.click(".view-line");
  await page.type(".view-line", "console.log('Hello World!');");
  
  // list and upload the replay
  await uploadReplay(page);
  
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  

  process.exit();
})();