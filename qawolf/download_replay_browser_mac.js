const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Download Replay browser: Mac";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, extractAppAndPageFromUrl, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // open new context with Mac userAgent
  const { browser } = await launch();
  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.131 Safari/537.36"
  })
  
  const page = await context.newPage();
  await page.goto("https://www.replay.io/");
  
  // assert home page loaded
  await page.mouse.wheel(0, 30000);
  await assertText(page, "Download");
  
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.click(':text("Download Replay")'),
  ]);
  
  // get suggested file name
  var macDownloadName = download.suggestedFilename();
  
  // assert mac version of replay downloaded
  expect(macDownloadName).toEqual("replay.dmg");
  await page.click(':text("Start Replaying now")');
  
  
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  shared.download = download;
  shared.macDownloadName = macDownloadName;

  process.exit();
})();