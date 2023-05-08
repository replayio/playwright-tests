const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Bubble: Create, Preview and Delete Input Element";

  // Arrange:
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
  
  // bubble log in
  const { context, page, browser } = await bubbleLogin();
  await page.waitForTimeout(3000);
  
  // navigate to project
  const { page2 } = await navigateTo(page, "inputformreplay");
  
  // cleanup
  try {
    await page2.click(':text("Cancel")', { timeout: 10 * 1000 });
  } catch {}
  await selectAllDelete(page2);
  
  // Act:
  // Click the input element
  await page2.click(':text-is("Input") >> nth=0');
  
  // Drag element to canvas
  await page2.mouse.click(350, 70);
  
  // Fill name input
  // enter button name
  await page2.click('[placeholder="Type here..."]');
  await page2.click(':text("Type here...")');
  await page2.fill('[autocomplete="new-password"]', "Input Form Created");
  await page2.waitForTimeout(2000);
  
  // Assert:
  // Input and input name is created
  await assertElement(page2, '[placeholder="Input Form Created"]');
  
  shared.page = page;
  shared.page2 = page2;
  

  process.exit();
})();