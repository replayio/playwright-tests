const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  const TEST_NAME = "View learn more";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, extractAppAndPageFromUrl, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, extractAppAndPageFromUrl, addEventAddAction } = shared;
  
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://replay.io');
  
  // assert page loaded
  await assertText(page, "The time-travel debugger from the future.");
  
  // navigate to learn more links
  const [page2] = await Promise.all([
    context.waitForEvent("page"),
    page.click("text=Blog")
  ]);
  
  
  // navigate to how replay works page
  await page2.click('[href="/replay:-november-issue"]');
  
  // assert universal recorder URL
  // expect(page2.url()).toBe('https://medium.com/p/5c9c29580c58');
  await page2.waitForTimeout(2000);
  expect(page2.url()).toBe('https://blog.replay.io/replay:-november-issue')
  
  // close tab
  await page2.close();
  
  // navigate to security and privacy
  await page.click(':text("Security & Privacy")');
  
  // assert security and privacy
  await assertText(page, "Security & Privacy");
  await assertText(page, "Our Approach to Secure Development");
  
  
  shared.context = context;
  shared.page = page;
  shared.page2 = page2;

  process.exit();
})();