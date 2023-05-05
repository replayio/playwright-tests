const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "View footer links: resources";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, extractAppAndPageFromUrl, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, extractAppAndPageFromUrl, addEventAddAction } = shared;
  
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://replay.io');
  
  // assert page loaded
  await expect(page.locator('text=The time-travel debugger from the future.')).toBeVisible();
  
  // wheel down to footer links 
  await page.mouse.wheel(0, 30000);
  
  // view footer blog
  const [page2] = await Promise.all([
    page.waitForEvent('popup'),
    page.click(':text("Blog")')
  ]);
  
  // assert url is correct
  expect(page2.url()).toEqual('https://blog.replay.io/');
  
  // close blog
  await page2.close();
  
  // view footer security and privacy
  await page.click('[href="/security-and-privacy"]');
  
  // assert security and privacy
  expect(page.url()).toEqual('https://www.replay.io/security-and-privacy');
  await expect(page.locator('h1')).toHaveText('Security & Privacy');
  await expect(page.locator('text=EFECTIVE DATE')).toBeVisible();
  await expect(page.locator('text=Our Approach to Secure Development')).toBeVisible();
  
  
  shared.context = context;
  shared.page = page;
  shared.page2 = page2;

  process.exit();
})();