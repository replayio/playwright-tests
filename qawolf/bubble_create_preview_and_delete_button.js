const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Bubble: Create, preview, and delete button";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // bubble log in
  const { context, page, browser } = await bubbleLogin();
  
  // navigate to project 'testing-buttonreplay'
  const { page2 } = await navigateTo(page, "testing-buttonreplay");
  
  // cleanup
  try {
    await page2.click(':text("Cancel")', { timeout: 15 * 1000 });
  } catch {}
  await selectAllDelete(page2);
  
  // select element and create on page2
  await page2.click(".button");
  await page2.mouse.click(350, 70);
  
  // assert element created
  await assertText(page2, "...edit me...");
  await assertElement(page2, "button");
  await page2.fill(".text-entry input", "I am a button");
  
  // wait for preview to update
  await page2.waitForTimeout(3000);
  
  // view in preview
  var page3 = await openPopup(page2, "text=Preview");
  
  // assert element
  await expect(page3.locator('button:text("I am a button")')).toBeVisible();
  
  // delete element
  await page2.bringToFront();
  await assertText(page2, "I am a button");
  await page2.click("button");
  await page2.keyboard.press("Delete");
  await expect(page2.locator(':text("I am a button")')).not.toBeVisible();
  
  // assert deletion in preview
  await page3.bringToFront();
  await assertText(page3, "We just updated this page");
  await page3.reload();
  await expect(page3.locator(':text("I am a button")')).not.toBeVisible();
  
  // upload replay
  await uploadReplay(page);
  
  shared.context = context;
  shared.page = page;
  shared.browser = browser;
  shared.page2 = page2;
  shared.page3 = page3;
  

  process.exit();
})();