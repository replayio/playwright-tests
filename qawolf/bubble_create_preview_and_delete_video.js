const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Bubble: Create, preview, and delete video";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // bubble log in
  const { context, page, browser } = await bubbleLogin();
  
  // navigate to project 'Testing videosreplay'
  const { page2 } = await navigateTo(page, "testing-videosreplay");
  
  // cleanup
  try {
    await page2.click(':text("Cancel")');
  } catch {}
  await selectAllDelete(page2);
  
  // Act:
  // Click the 'Video' Button
  await page2.click(".video");
  
  // Drag Video across canvas
  await page2.mouse.click(350, 70);
  
  // assert video component is created
  await assertElement(page2, "img");
  
  // edit video ID
  await page2.fill('[placeholder="Search..."]', "dQw4w9WgXcQ");
  
  // edit video source
  await page2.click("text=YouTube");
  
  // give the app some time to save before loading preview
  await page2.waitForTimeout(5000);
  
  // view in preview
  var page3 = await openPopup(page2, "text=Preview");
  
  // view in preview
  await page3.waitForTimeout(5000);
  await assertElement(page3, ".Video");
  await page3.waitForFunction(() => {
    const video = document.querySelector("iframe");
    return video && video.src.includes("dQw4w9WgXcQ");
  });
  
  // delete element
  await page2.bringToFront();
  await page2.click("img");
  await page2.keyboard.press("Delete");
  
  // assert deletion in preview
  await page3.bringToFront();
  await assertText(page3, "We just updated this page", { timeout: 30 * 1000 });
  await page3.reload();
  await expect(page3.locator(".Video")).not.toBeVisible();
  
  // upload replay
  await uploadReplay(page);
  
  shared.context = context;
  shared.page = page;
  shared.browser = browser;
  shared.page3 = page3;
  

  process.exit();
})();