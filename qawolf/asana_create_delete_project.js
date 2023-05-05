const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Asana: Create & Delete Project";

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
  
  // clean test
  while (await page.locator("text=QA Project").count()) {
    await page.click(`:text("QA Project")`);
    await page.click('[aria-label="Show options"]');
    await page.waitForTimeout(500);
    await page.click(':text("Delete project")');
    await page.waitForTimeout(500);
    await page.click(".DangerButton");
    await expect(page.locator('[role="alert"]')).toBeVisible();
    await page.click('[aria-label="Close this notification"]');
    await page.waitForTimeout(1000);
  }
  
  // create project
  await page.click(':text("Create")');
  await page.click(".ProjectIcon");
  await page.click(':text("Blank projectStart from scratch")');
  const projectName = `QA Project ` + Date.now().toString().slice(-4);
  await page.fill("#new_project_dialog_content_name_input", projectName);
  await page.click('.PotSetupFormStructure-submitButton [role="button"]');
  await page.click(':text("Go to project")');
  
  // assert project
  await expect(page.locator(`text=${projectName}`)).toHaveCount(2);
  
  // delete project
  await page.click('[aria-label="Show options"]');
  await page.click(':text("Delete project")');
  await page.waitForTimeout(500);
  await page.click(".DangerButton");
  await expect(page.locator('[role="alert"]')).toBeVisible();
  await expect(page.locator(`text=${projectName}`)).toHaveCount(0);
  
  // upload replay
  await uploadReplay(page);
  
  shared.page = page;
  shared.browser = browser;
  shared.projectName = projectName;
  

  process.exit();
})();