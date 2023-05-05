const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Download Replay browser: Windows";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, extractAppAndPageFromUrl, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // open new context with Windows userAgent
  const { browser } = await launch();
  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
  })
  
  const page = await context.newPage();
  await page.goto("https://www.replay.io/");
  
  // assert home page loaded
  await page.mouse.wheel(0, 30000);
  await assertText(page, "Download");
  
  // download replay
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.click(':text("Download Replay")'),
  ]);
  
  // get suggested file name
  var windowsDownloadName = download.suggestedFilename();
  
  // assert windows version of replay downloaded
  expect(windowsDownloadName).toEqual("windows-replay.zip");
  
  
  
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  shared.download = download;
  shared.windowsDownloadName = windowsDownloadName;

  process.exit();
})();