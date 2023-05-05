const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  const TEST_NAME = "View footer links: legal";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, extractAppAndPageFromUrl, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, extractAppAndPageFromUrl, addEventAddAction } = shared;
  
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://replay.io', { waitUntil: "domcontentloaded" });
  
  // assert page loaded
  await expect(page.locator('text=The time-travel debugger from the future.')).toBeVisible();
  
  // wheel down to footer links
  await page.mouse.wheel(0, 30000);
  
  // view footer privacy policy
  await page.click('[href="/privacy-policy"]');
  await page.waitForTimeout(2000);
  
  // assert privacy policy
  await expect(page.locator('h1:has-text("Privacy Policy")')).toBeVisible();
  await expect(page.locator('text=EFFECTIVE DATE: 8 FEB 2023')).toBeVisible();
  await expect(page.locator('text=At Replay, we take your privacy seriously.')).toBeVisible();
  
  // close privacy policy
  await page.goBack();
  
  // wheel down to footer links
  await page.mouse.wheel(0, 30000);
  
  // view footer terms of service
  await page.click('[href="/terms-of-service"]');
  await page.waitForTimeout(2000);
  
  // assert terms of service
  await expect(page.locator('h1:has-text("Terms of Use")')).toBeVisible();
  await expect(page.locator('text=EFECTIVE DATE: 28 MAR 2023')).toBeVisible();
  await expect(page.locator('text=Please read on to learn the rules and restrictions that govern your use of our website(s)')).toBeVisible();
  
  
  shared.context = context;
  shared.page = page;

  process.exit();
})();