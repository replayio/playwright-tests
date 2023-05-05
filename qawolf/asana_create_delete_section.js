const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  const TEST_NAME = "Asana: Create & Delete Section";

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
  
  // login
  const { page, browser } = await logInToAsana(
    process.env.ASANA_EMAIL,
    process.env.ASANA_PASSWORD
  );
  await page.click(':text("First Test Project")');
  await expect(page.locator("h1")).toHaveText("First Test Project");
  
  // clean test
  while ((await page.locator("text=QA Section").count()) > 1) {
    await page.hover(`:text("QA Section")`);
    await page.click('[aria-label="More section actions"]');
    await page.waitForTimeout(500);
    await page.click(':text("Delete section")');
    await expect(page.locator('[role="alert"]')).toBeVisible();
    await page.click('[aria-label="Close this notification"]');
    await page.waitForTimeout(1000);
  }
  
  // create section
  const sectionName = `QA Section ` + Date.now().toString().slice(-4);
  await page.keyboard.press("Tab+N");
  await page.keyboard.type(sectionName);
  await page.keyboard.press("Enter");
  
  // assert section
  await expect(page.locator(`text=${sectionName}`)).toBeVisible();
  
  // delete section
  await page.hover(`:text("${sectionName}")`);
  await page.click('[aria-label="More section actions"]');
  await page.waitForTimeout(5000);
  await page.click(':text("Delete section")', { force: true });
  await expect(page.locator('[role="alert"]')).toBeVisible();
  await page.click('[aria-label="Close this notification"]');
  
  // assert deleted
  await expect(page.locator(`text=${sectionName}`)).toBeHidden();
  
  // upload replay
  await uploadReplay(page);
  
  shared.page = page;
  shared.browser = browser;
  shared.sectionName = sectionName;
  

  process.exit();
})();