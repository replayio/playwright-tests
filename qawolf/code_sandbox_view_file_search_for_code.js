const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  const TEST_NAME = "CodeSandbox: view file, search for code";

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
  await page.goto("https://codesandbox.io/s/0d68e?file=/src/App.js", {
    timeout: 45 * 1000,
  });
  
  // navigate to index.js
  await page.click("text=index.js");
  
  // assert index.js
  await expect(
    page.locator(':text("import { motion } from ")')
  ).not.toBeVisible();
  await assertText(page, 'const rootElement = document.getElementById("root");');
  
  // search for useState
  await page.click('[aria-label="Search"]');
  await page.fill('[placeholder="Search"]', "useState");
  
  // assert search
  await assertText(
    page,
    'App.js\nimport { useState } from "react";\nconst [isOn, setIsOn] = useState(false);'
  );
  
  // list and upload the replay
  await uploadReplay(page);
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  

  process.exit();
})();