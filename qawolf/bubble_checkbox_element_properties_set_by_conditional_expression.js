const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Bubble: Checkbox element properties set by conditional expression";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // bubble log in
  const { context, page, browser } = await bubbleLogin();
  
  // navigate to project 'Testing Button:Replay'
  const { page2 } = await navigateTo(page, "conditionalreplaycheckbox");
  
  // cleanup
  try {
    await page2.click(':text("Cancel")');
  } catch {}
  await selectAllDelete(page2);
  
  // Create checkbox
  await page2.click(':text("Checkbox") >> nth=0', { dblclick: true });
  await page2.mouse.click(350, 70);
  
  // assert element created
  await assertText(page2, "...edit me...");
  await assertElement(page2, ".Checkbox");
  
  // enter button name
  await page2.dblclick(':text("...edit me...Insert dynamic data")');
  await page2.fill(".text-entry input", "I am a checkbox");
  
  // wait for preview to update
  await page2.waitForTimeout(3000);
  
  // Arrange:
  // Open Element Editor
  // Click the 'Conditional' button
  await page2.click(':text("Conditional")');
  
  // Act:
  // Click the 'Define another condition' button
  await page2.click(':text("Define another condition")');
  
  // Click 'When click' option
  await page2.click(':text("Click").empty');
  
  // Select the 'This Checkbox' option
  await page2.click(".dropdown-option");
  
  // Select the 'is checked' option
  await page2.click(':text("is checked")');
  
  // Click the 'Select a property to change' dropdown
  await page2.click(':text("Select a property to change when true")');
  
  // Select the 'This element is visible' option
  await page2.click(':text("This element is visible")');
  
  // Ensure the checkbox for element is visible is unchecked
  try {
    await page2.click(".editor .checked", { timeout: 2000 });
  } catch {}
  
  // Assert:
  // Conditional was created successfully
  await expect(page2.locator('[title="This element is visible"]')).toBeVisible();
  await expect(page2.locator(':text("is checked")')).toBeVisible();
  
  // view button preview
  var previewPage = await openPopup(page2, "text=Preview");
  await previewPage.waitForTimeout(3000);
  await expect(previewPage.locator(':text("I am a checkbox")')).toBeVisible();
  
  // check checkbox
  await previewPage.click(':text("I am a checkbox")');
  
  // assert while pressed, button is hidden
  await expect(previewPage.locator(':text("I am a checkbox")')).not.toBeVisible();
  
  // upload replay
  await uploadReplay(page);
  
  shared.context = context;
  shared.page = page;
  shared.browser = browser;
  shared.page2 = page2;
  shared.previewPage = previewPage;
  

  process.exit();
})();