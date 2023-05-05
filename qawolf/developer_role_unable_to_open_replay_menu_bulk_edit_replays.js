const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  const TEST_NAME = "Developer role unable to: open replay menu, bulk edit replays";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, extractAppAndPageFromUrl, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, extractAppAndPageFromUrl, addEventAddAction } = shared;
  
  // log in
  const { page } = await logIn({ userId: 6, options: { slowMo: 1000 } });
  await expect(page.locator("text=Test Permissions")).toBeVisible();
  
  // go to team
  await page.click(':text("Test Permissions")');
  
  // assert replays loaded
  await expect(page.locator("text=Private Recording Test")).toBeVisible();
  await expect(page.locator("text=Time Travel")).toBeVisible();
  
  // assert replay menus are accessible
  await expect(page.locator('text=more_vert')).toHaveCount(5);
  
  // bulk edit replays
  await page.click("button >> text=Edit");
  
  // assert access to bulk edit
  const checkboxes = page.locator("[type=checkbox]");
  const checkboxCount = await checkboxes.count();
  expect(checkboxCount).toBe(5);
  await expect(page.locator("text=0 item selected")).toBeVisible();
  
  // select replays for editing
  const checkbox1 = page
    .locator('[type=checkbox]:left-of(:text("Private Recording Test"))')
    .first();
  const checkbox2 = page
    .locator('[type=checkbox]:left-of(:text("Time Travel"))')
    .first();
  await checkbox1.click();
  await checkbox2.click();
  
  // assert replays selected
  await expect(page.locator("text=2 items selected")).toBeVisible();
  
  // deselect replays
  await checkbox1.click();
  await checkbox2.click();
  
  // assert replays de-selected
  await expect(page.locator("text=0 item selected")).toBeVisible();
  await page.click("text=Done");
  
  // assert replays still visible
  await expect(page.locator("text=Private Recording Test")).toBeVisible();
  await expect(page.locator("text=Time Travel")).toBeVisible();
  
  await logOut(page);
  
  
  
  shared.page = page;
  shared.checkboxes = checkboxes;
  shared.checkboxCount = checkboxCount;
  shared.checkbox1 = checkbox1;
  shared.checkbox2 = checkbox2;

  process.exit();
})();