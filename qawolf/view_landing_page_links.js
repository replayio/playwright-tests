const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "View landing page links";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, extractAppAndPageFromUrl, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://replay.io');
  
  // assert page loaded
  await expect(page.locator('text=The time-travel debugger from the future.')).toBeVisible();
  
  // view docs
  const [docsPage] = await Promise.all([
    context.waitForEvent("page"),
    page.click('[href="https://docs.replay.io"]:visible')
  ]);
  
  // assert viewing docs
  await expect(docsPage.locator(':text("🤔How Replay Works")')).toBeVisible();
  
  // close docs page
  await docsPage.close();
  
  // view pricing
  await page.click('[href="/pricing"]:visible');
  await page.waitForTimeout(2000);
  
  // // bring pricing to front
  // let pages = context.pages();
  // await pages[1].bringToFront();
  
  // assert viewing pricing
  await assertText(page, "Pricing");
  await expect(page.locator('text=Individuals and open source communities will always be able to use Replay for free.')).toBeVisible();
  
  // go back
  await page.goBack();
  
  // view we're hiring
  await page.click('[href="/about#jobs"]:visible');
  await page.waitForTimeout(2000);
  
  // assert viewing we're hiring
  await assertText(page, "Join our journey");
  await assertText(page, "hiring@replay.io");
  
  // go back
  await page.goBack();
  
  // view about
  await page.click('[href="/about"]:visible');
  await page.waitForTimeout(2000);
  
  // assert about
  await assertText(page, "About Replay");
  await assertText(page, "Learn where Replay is right now and where we are going next");
  
  // close tab
  await page.goBack();
  
  // view log in
  await page.click('[href="https://app.replay.io/"]:visible');
  await page.waitForTimeout(2000);
  
  // bring log in to front
  let pages = context.pages();
  await pages[1].bringToFront();
  
  // assert log in
  await assertText(pages[1], "Replay");
  await assertText(pages[1], "Replay captures everything you need for the perfect bug report");
  await assertText(pages[1], "Sign");
  await assertText(pages[1], "in");
  
  
  shared.context = context;
  shared.page = page;
  shared.docsPage = docsPage;
  shared.pages = pages;

  process.exit();
})();