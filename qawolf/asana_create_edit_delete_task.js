const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  const TEST_NAME = "Asana: Create, Edit, & Delete Task";

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
  
  // dismiss coaching popover if present
  try {
    await expect(page.locator(".CoachingPopover")).not.toBeVisible({
      timeout: 5000,
    });
  } catch {
    await page.click('.CoachingPopover :text("Got it")');
    await expect(page.locator(".CoachingPopover")).not.toBeVisible({
      timeout: 5000,
    });
  }
  
  // clean test
  while (await page.locator("text=QA task").count()) {
    await page.hover(`:text("QA task") >> nth=1`);
    await page.click(':text("Details")');
    await page.waitForTimeout(500);
    await page.click('[aria-label="More actions for this task"]');
    await page.waitForTimeout(500);
    await page.click(':text("Delete task")');
    await page.click(':text("First Test Project")');
    await expect(page.locator('[role="alert"]')).toBeVisible();
    await page.click('[aria-label="Close this notification"]');
    await page.waitForTimeout(1000);
  }
  
  // create task
  await page.click(':text("Add task")');
  const taskName = `QA Task ` + Date.now().toString().slice(-4);
  await page.keyboard.type(taskName);
  await page.keyboard.press("Enter");
  await page.waitForTimeout(500);
  
  // assert section
  await expect(page.locator(`text=${taskName}`)).toHaveCount(2);
  
  // edit task
  await page.hover(`:text("${taskName}") >> nth=1`);
  await page.click(':text("Details")');
  const newTask = `QA Task ` + Date.now().toString().slice(-4);
  await page.fill('[aria-label="Task Name"]', newTask);
  await page.keyboard.press("Enter");
  await page.mouse.click(0, 0);
  await page.click('[aria-label="Close details"]');
  
  await expect(page.locator(`text=${newTask}`)).toHaveCount(2);
  await expect(page.locator(`text=${taskName}`)).toHaveCount(0);
  
  // delete task
  await page.hover(`:text("${newTask}") >> nth=1`);
  await page.click(':text("Details")');
  await page.click('[aria-label="More actions for this task"]');
  await page.waitForTimeout(500);
  await page.click(':text("Delete task")');
  await expect(page.locator('[role="alert"]')).toBeVisible();
  await page.click('[aria-label="Close this notification"]');
  
  // assert deleted
  await page.click(':text("Home")');
  await page.click(':text("First Test Project")');
  await expect(page.locator(`text=${newTask}`)).toHaveCount(0);
  
  // upload replay
  await uploadReplay(page);
  
  shared.page = page;
  shared.browser = browser;
  shared.taskName = taskName;
  shared.newTask = newTask;
  

  process.exit();
})();