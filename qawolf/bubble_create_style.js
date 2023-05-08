const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Bubble: Create Style";

  const {
    assertNotElement,
    assertNotText,
    buildUrl,
    deleteTeam,
    getBoundingClientRect,
    getPlaybarTooltipValue,
    launchReplay,
    uploadReplay,
    logIn,
    logoutSequence,
    logOut,
    logInToPinterest,
    logInToLinkedin,
    logInToFacebook,
    parseInviteUrl,
    setFocus,
    waitForFrameNavigated,
    logInToAsana,
    deleteAllSuperblocks,
    logInToAirtable,
    getBoundingBox,
    addElementToCanvas,
    logInToSurveymonkey,
    logInToEtsy,
    createSurveyFromScratch,
    cleanSurveys,
    openPopup,
    deleteSurvey,
    selectAllDelete,
    deleteIdeaPin,
    deleteEvenFlows,
    deletePin,
    deleteSurvey2,
    bubbleLogin,
    extractAppAndPageFromUrl,
    navigateTo,
    superblocksLogin,
    dragAndDrogPdf,
    downloadS3File,
    builderLogin,
    twitterLogin,
    editTwitterProfile,
    slackLogin,
    resetSlackProfile,
    bubbleUrl,
    extractAppAndPageFromUrl,
    addEventAddAction,
  } = shared;
  
  // bubble log in
  const { context, page, browser } = await bubbleLogin({});
  
  // navigate to project
  const { page2 } = await navigateTo(page, "operationsreplay");
  
  // cleanup
  try {
    await page2.click(':text("Cancel")');
  } catch {}
  await selectAllDelete(page2);
  
  // Act:
  // Navigate to Styles
  await page2.click(':text("Styles") >> nth = 0', { force: true });
  
  // Delete Previous styles if needed
  page2.on("dialog", async (dialog) => await dialog.accept());
  try {
    await expect(
      page2.locator(':text("New Created Style") >> nth = 0')
    ).toBeVisible();
  
    // delete style
    await page2.click(':text("Button - New Created Style") >> nth = 0');
    await page2.click(".delete-btn");
  } catch {}
  
  // Click Add style
  await page2.click(':text("Add style")');
  
  // Fill style name
  await page2.fill(".new-style-name", "New Created Style");
  
  // Select Button element style
  await page2.click(".children .spot");
  await page2.click('.dropdown-option:text("Button")', { force: true });
  
  // Click the 'Create' button
  await page2.click(".btn-create");
  
  // Update color for this style
  await page2.click(".color-input");
  await page2.click('[style*="rgb(255, 0, 0)"] >> nth = 0');
  
  // Assert:
  // Style is created
  await expect(
    page2.locator('[class*="left-pane"] :text("New Created Style")')
  ).toBeVisible();
  await expect(page2.locator(".color-input.token-chosen")).toHaveValue(
    "Destructive (#FF0000)"
  );
  
  shared.page = page;
  shared.page2 = page2;
  

  process.exit();
})();