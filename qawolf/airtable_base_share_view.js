const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Airtable: Base - Share view";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, extractAppAndPageFromUrl, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // REQ305 Airtable: log in
  const { page, browser } = await logInToAirtable({ permissions: ["clipboard-read", "clipboard-write"]});
  
  // navigate to designated workspace
  await page.click('[aria-label="Awesome Base"]');
  await page.waitForTimeout(2000);
  
  // REQ466 Airtable: Generate share view link
  await page.click('[aria-label="Share view"]');
  await page.click('[aria-label="Generate a new link"]', {force: true});
  await page.click(':text("Generate new link")');
  await page.waitForTimeout(2000);
  await page.click('.bg-light-gray-3 [type="text"]', {force: true});
  await page.waitForTimeout(2000);
  await page.dblclick('.bg-light-gray-3 [type="text"]', {force: true});
  await page.keyboard.press('Control+C');
  
  // REQ467 Airtable: View shared link works for anyone
  const copiedLink = await page.evaluate(() => {
    return navigator.clipboard.readText();
  });
  const context = await browser.newContext();
  const page2 = await context.newPage();
  await page2.goto(copiedLink);
  await page2.waitForLoadState();
  
  // assert values
  await expect(page2.locator('[data-testid="viewName"]')).toHaveText("Grid view")
  await expect(page2.locator('[data-testid="navBarButtonInBase"]')).toHaveText("Sign up for free")
  await expect(page2.locator('[aria-label="Name column header (Single line text field)"]')).toBeVisible();
  await expect(page2.locator('[aria-label="Notes column header (Long text field)"]')).toBeVisible();
  await expect(page2.locator('[aria-label="Attachments column header (Attachment field)"]')).toBeVisible();
  await expect(page2.locator('[aria-label="Status column header (Single select field)"]')).toBeVisible();
  
  
  shared.page = page;
  shared.browser = browser;
  shared.copiedLink = copiedLink;
  shared.context = context;
  shared.page2 = page2;

  process.exit();
})();