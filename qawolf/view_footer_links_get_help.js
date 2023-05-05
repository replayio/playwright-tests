const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  const TEST_NAME = "View footer links: get help";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, extractAppAndPageFromUrl, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, extractAppAndPageFromUrl, addEventAddAction } = shared;
  
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://replay.io');
  
  // assert page loaded
  await expect(page.locator('text=The time-travel debugger from the future.')).toBeVisible();
  
  // wheel down to footer links
  await page.mouse.wheel(0, 30000);
  
  // view footer docs
  const [page2] = await Promise.all([
    page.waitForEvent("popup"),
    page.click('[href="https://docs.replay.io/"]'),
  ]);
  await page2.waitForLoadState("domcontentloaded");
  await page2.bringToFront();
  
  // assert docs
  await assertText(page2, "Docs");
  await assertText(page2, "Guides");
  await assertText(page2, "Learn More");
  
  // close docs
  await page2.close();
  
  // view GitHub issues
  const [page3] = await Promise.all([
    page.waitForEvent("popup"),
    page.click('[href="https://github.com/replayio"]'),
  ]);
  await page3.waitForLoadState("domcontentloaded");
  await page3.bringToFront();
  
  // assert GitHub
  await expect(page3).toHaveURL("https://github.com/replayio");
  
  // close GitHub
  await page3.close();
  
  // view contact us
  var contactUsLocator = page.locator('.footer_nav__Wxyub [href="mailto:hey@replay.io"]');
  var link = await contactUsLocator.getAttribute('href');
  
  // assert contact us
  assert(link.includes("mailto:hey@replay.io"));
  
  
  shared.context = context;
  shared.page = page;
  shared.page2 = page2;
  shared.page3 = page3;
  shared.contactUsLocator = contactUsLocator;
  shared.link = link;

  process.exit();
})();