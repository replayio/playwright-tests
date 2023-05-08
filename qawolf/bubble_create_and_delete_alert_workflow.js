const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Bubble: Create and Delete alert workflow";

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
  const { context, page, browser } = await bubbleLogin();
  
  // navigate to project 'Testing Button:Replay'
  const { page2 } = await navigateTo(page, "alertreplayworkflow");
  
  // cleanup
  try {
    await page2.click(':text("Cancel")');
  } catch {}
  await selectAllDelete(page2);
  
  // Arrange:
  // Log Into Bubble with Google Account
  // Navigate to App
  
  // Act:
  // Click the 'Button' Button
  await page2.click(':text("Button") >> nth=0');
  
  // Drag Button across canvas
  await page2.mouse.click(350, 70);
  
  // enter button name
  await page2.dblclick(':text("...edit me...Insert dynamic data")');
  await page2.fill(".text-entry input", "I am a button");
  
  // wait for preview to update
  await page2.waitForTimeout(3000);
  
  // Assert:
  // Button is created
  // assert element created
  await assertElement(page2, "button");
  
  // Arrange:
  // Act:
  // Click the 'Alert' button
  await page2.click(':text("Alert") >> nth=0');
  
  // Drag Alert across canvas
  await page2.mouse.click(350, 170);
  
  // Assert:
  // Alert is created
  await expect(page2.locator(`:text("Alert A") >> nth = 0`)).toBeVisible();
  
  // Arrange:
  // Click the 'Conditional' button
  await page2.click(':text("Conditional")');
  
  // Act:
  // Click the 'Define another condition' button
  await page2.click(':text("Define another condition")');
  
  // Click 'When click' option
  await page2.click(':text("Click")');
  
  // Select the 'This Alert' option
  await page2.click(':text("This Alert")');
  
  // Select the 'is hovered' option
  await page2.click(':text("is hovered")');
  
  // Click the 'Select a property to change' dropdown
  await page2.click(':text("Select a property to change when true")');
  
  // Select the 'Text' option
  await page2.click('[class*="option"]:text("Text")');
  
  // Fill in Text
  await page2.click(".clickable-area");
  await page2.fill("textarea", "Alert Test");
  await page2.waitForTimeout(3000);
  
  // Assert:
  // Conditional was created successfully
  await expect(page2.locator("textarea")).toHaveValue("Alert Test");
  
  // Arrange:
  // Navigate to Workflow
  await page2.click(':text("Workflow")');
  
  // Act:
  // Click the 'Click here to add an event...' button
  await page2.click(':text("Click here to add an event...")');
  
  // Click the 'Do when condition is true' option
  await page2.click(':text("Do when condition is true")');
  
  // Click the 'Only when' button
  await page2.click(".not-finished");
  
  // Select Button A option
  await page2.click(':text("Button I am a button")');
  
  // Select Is hovered option
  await page2.click(':text("is hovered")');
  
  // Click the 'Click here to add an action' button
  await page2.click(':text("Click here to add an action...")');
  
  // Hover over Element Actions
  await page2.click(':text("Element Actions")');
  
  // Click the 'Show message' option
  await page2.click(':text("Show message")');
  
  // Assert:
  // Workflow was created with no error messages
  await expect(page2.locator(':text("Error")')).not.toBeVisible();
  await expect(page2.locator(':text("Show message in  Alert A")')).toBeVisible();
  
  // Arrange:
  // Click the 'Preview' button
  var previewPage = await openPopup(page2, "text=Preview");
  await previewPage.waitForTimeout(3000);
  
  // Act:
  // Hover over button
  await previewPage.hover(`:text("I am a button")`);
  
  // Assert:
  // Alert is visible after hovering on button
  await expect(previewPage.locator(':text("...edit me...")')).toBeVisible();
  
  shared.context = context;
  shared.page = page;
  shared.browser = browser;
  shared.page2 = page2;
  

  process.exit();
})();