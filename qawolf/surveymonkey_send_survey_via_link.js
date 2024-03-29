const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Surveymonkey: Send survey via link";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // REQ471 Surveymonkey: Login
  const { page, browser } = await logInToSurveymonkey({
    permissions: ["clipboard-read", "clipboard-write"],
  });
  
  // clean tests
  await cleanSurveys(page);
  
  // REQ473 Surveymonkey: Create a survey from scratch
  const survey = await createSurveyFromScratch(page);
  
  // REQ479 Surveymonkey: Share survey via share link
  await page.click(':text("SUMMARY")');
  await page.click(':text("Send survey")');
  await page.click('[data-testid="AudiencePromoGrid__SendYourWay"]');
  await page.click('[data-testid="CreateCollectorButton__weblink"]');
  await page.click("#copy-link-btn");
  const copiedLink = await page.evaluate(() => {
    return navigator.clipboard.readText();
  });
  const context2 = await browser.newContext();
  const page2 = await context2.newPage();
  await page2.goto(copiedLink);
  await page2.waitForLoadState();
  
  // assert survey
  await expect(page2.locator(`:text("${survey}")`)).toBeVisible();
  await expect(page2.locator("text=Test Question")).toBeVisible();
  
  // REQ475 Surveymonkey: Delete survey
  await page.bringToFront();
  await page.click(':text("SUMMARY")');
  await page.waitForTimeout(2000);
  await page.click('[href="/"]');
  await page.waitForTimeout(2000);
  console.log(survey);
  await expect(page.locator(`:text("${survey}")`)).toHaveCount(1); // One row 
  
  const deleteSurveyItem = await page.locator(
    `.survey-item:has-text("${survey}")`
  );
  
  await deleteSurveyItem.first().locator(":text('.Options')").scrollIntoViewIfNeeded()
  await deleteSurveyItem.first().locator(":text('.Options')").click();
  await page.waitForTimeout(3000);
  await page.click(':text-is("Delete"):visible', { force: true, delay: 500 });
  await page.click(':text-is("DELETE"):visible', { force: true, delay: 500 });
  
  try {
    await page.waitForTimeout(3000);
  await deleteSurveyItem
    .first()
    .locator(".survey-actions")
    .scrollIntoViewIfNeeded();
  await deleteSurveyItem
    .first()
    .locator(".survey-actions")
    .click({ force: true, delay: 500 });
  await page.click(':text-is("Delete"):visible', { force: true, delay: 500 });
  await page.click(':text-is("DELETE"):visible', { force: true, delay: 500 });
  } catch {}
  
  await page.reload();
  await page.waitForTimeout(2000);
  await expect(page.locator(`:text-is("${survey}")`)).not.toBeVisible(); // One row but haveCount is 2
  
  // upload replay
  await uploadReplay(page);
  
  
  shared.page = page;
  shared.browser = browser;
  shared.survey = survey;
  shared.copiedLink = copiedLink;
  shared.context2 = context2;
  shared.page2 = page2;
  shared.deleteSurveyItem = deleteSurveyItem;

  process.exit();
})();