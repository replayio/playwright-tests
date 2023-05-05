const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Download Replay browser: Linux";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, extractAppAndPageFromUrl, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, extractAppAndPageFromUrl, addEventAddAction } = shared;
  
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto("https://www.replay.io/");
  
  // assert home page loaded
  await expect(
    page.locator("text=The time-travel debugger from the future.")
  ).toBeVisible();
  
  // wheel down to download
  await page.mouse.wheel(0, 30000);
  
  // download for Linux
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.click('.button_tertiary__aSJSu [alt="Linux"]'),
  ]);
  
  // get suggested file name
  var linuxDownloadName = download.suggestedFilename();
  
  // assert Linux download
  assert(linuxDownloadName.includes("linux-replay.tar.bz2"));
  
  
  
  shared.context = context;
  shared.page = page;
  shared.download = download;
  shared.linuxDownloadName = linuxDownloadName;

  process.exit();
})();