const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Bubble: Create database view";

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
  
  // navigate to project 'Testing Button:Replay'
  const { page2 } = await navigateTo(page, "optionsattributes");
  
  // cleanup
  try {
    await page2.click(':text("Cancel")', { timeout: 5000 });
  } catch {}
  
  // view data
  await page2.click("text=Data");
  await page2.click("text=App data");
  await page2.waitForTimeout(3000);
  
  // assert database view is not present
  const viewName = "Created View Here";
  try {
    await expect(page2.locator(`:text("${viewName}")`)).not.toBeVisible({
      timeout: 5000,
    });
  } catch {
    // delete
    await page2.click(`:text("${viewName}")`);
    await page2.click(
      `[class*="views-list"] [class*="flex-row"]:has-text("${viewName}") [class*="delete-btn"]`
    );
    await page2.click(`:text("CONFIRM")`);
  }
  
  // Create new view
  await page2.click(':text("New view")');
  
  // Fill name
  await page2.fill(".view-name-input", viewName);
  
  // Select a field
  await page2.click("div:nth-of-type(4).field-zone .component-checkbox");
  
  // create database
  await page2.click(`:text-is("CREATE")`);
  await page2.waitForTimeout(3000);
  
  // Assert:
  // Name is visible with correct column
  await expect(page2.locator(`:text("${viewName}") >> nth = 0`)).toBeVisible();
  
  // cleanup
  await page2.click(
    `[class*="views-list"] [class*="flex-row"]:has-text("${viewName}") [class*="delete-btn"]`
  );
  await page2.click(`:text("CONFIRM")`);
  

  process.exit();
})();