const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Bubble: Add element to canvas with locked status";

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
  const { context, page: bubblePage, browser } = await bubbleLogin();
  
  // navigate to project 'Testing Button:Replay'
  const { page2: page } = await navigateTo(bubblePage, "testing-lockedelement");
  
  // cleanup
  try {
    await page.click(':text("Cancel")');
  } catch {}
  await selectAllDelete(page);
  
  // Act:
  // Add shape to canvas
  await page.click(".shape");
  await addElementToCanvas(page, '[element_name="Shape"]');
  
  // Grab current position
  const position = await page.locator(".element.Shape").getAttribute("style");
  
  // Uncheck This element is visible on page load
  await page.click(
    ".component-checkbox.property-editor-control:right-of(:text('Lock this element (not draggable')) >> nth = 0"
  );
  
  // Attempt to Drag Element
  await page.hover(".element.Shape");
  await page.mouse.down();
  await page.mouse.move(450, 250);
  await page.mouse.up();
  
  // Assert:
  // Element cannot be dragged
  const newPosition = await page.locator(".element.Shape").getAttribute("style");
  expect(newPosition).not.toBe(position);
  
  // Displays in preview correctly
  // go to preview page
  var previewPage = await openPopup(page, "text=Preview");
  await previewPage.waitForTimeout(3000);
  
  // get app name and page name from url
  var pageUrl = await previewPage.url();
  
  // assert shape is visible after page load
  await expect(previewPage.locator(".Shape")).toBeVisible();
  
  // upload replay
  await uploadReplay(page);
  
  shared.context = context;
  shared.bubblePage = bubblePage;
  shared.browser = browser;
  shared.page = page;
  shared.previewPage = previewPage;
  shared.pageUrl = pageUrl;
  

  process.exit();
})();