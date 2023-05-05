const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  const TEST_NAME = "User role unable to: open replay menu, bulk edit replays";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, extractAppAndPageFromUrl, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, extractAppAndPageFromUrl, addEventAddAction } = shared;
  
  // log in
  const { page } = await logIn({ userId: 7 });
  await expect(page.locator('text=Test Permissions')).toBeVisible();
  
  // go to team
  // await page.click('[title="Test Permissions"]');
  await page.click(`:text("Test Permissions")`);
  
  // assert replays loaded
  await expect(page.locator('text=Private Recording Test')).toBeVisible();
  await expect(page.locator('text=Time Travel')).toBeVisible();
  
  // assert replay menus are accessible
  await expect(page.locator('text=more_vert')).toHaveCount(5);
  
  // bulk edit replays
  await page.click("text=Edit");
  
  // assert access to bulk edit (checkboxes)
  await expect(page.locator('[type=checkbox]')).toHaveCount(5);
  await expect(page.locator('text=0 item selected')).toBeVisible();
  await page.click("text=Done");
  
  // assert replays still visible
  await expect(page.locator('text=Private Recording Test')).toBeVisible();
  await expect(page.locator('text=Time Travel')).toBeVisible();
  
  
  shared.page = page;

  process.exit();
})();