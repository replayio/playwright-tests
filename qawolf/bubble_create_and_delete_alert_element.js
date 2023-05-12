const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Bubble: Create and Delete Alert Element";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // bubble log in
  const { context, page, browser } = await bubbleLogin();
  
  // navigate to project 'Testing Button:Replay'
  const { page2 } = await navigateTo(page, "alertreplay");
  
  // cleanup
  try {
    await page2.click(':text("Cancel")');
    await page2.waitForTimeout(3000);
  } catch {}
  await selectAllDelete(page2);
  
  // Arrange:
  // Act:
  // Click the 'Alert' button
  await page2.click(':text("Alert") >> nth=0');
  
  // Drag Alert across canvas
  await page2.mouse.click(350, 170);
  
  // Assert:
  // Alert is created
  await expect(page2.locator(`:text("Alert A") >> nth = 0`)).toBeVisible();
  
  shared.page = page;
  shared.page2 = page2;
  

  process.exit();
})();