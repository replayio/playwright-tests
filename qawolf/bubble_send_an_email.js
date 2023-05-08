const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Bubble: Send an Email";

  // const {
  //   assertNotElement,
  //   assertNotText,
  //   buildUrl,
  //   deleteTeam,
  //   getBoundingClientRect,
  //   getPlaybarTooltipValue,
  //   launchReplay,
  //   uploadReplay,
  //   logIn,
  //   logoutSequence,
  //   logOut,
  //   logInToPinterest,
  //   logInToLinkedin,
  //   logInToFacebook,
  //   parseInviteUrl,
  //   setFocus,
  //   waitForFrameNavigated,
  //   logInToAsana,
  //   deleteAllSuperblocks,
  //   logInToAirtable,
  //   getBoundingBox,
  //   addElementToCanvas,
  //   logInToSurveymonkey,
  //   logInToEtsy,
  //   createSurveyFromScratch,
  //   cleanSurveys,
  //   openPopup,
  //   deleteSurvey,
  //   selectAllDelete,
  //   deleteIdeaPin,
  //   deleteEvenFlows,
  //   deletePin,
  //   deleteSurvey2,
  //   bubbleLogin,
  //   extractAppAndPageFromUrl,
  //   navigateTo,
  //   superblocksLogin,
  //   dragAndDrogPdf,
  //   downloadS3File,
  //   builderLogin,
  //   twitterLogin,
  //   editTwitterProfile,
  //   slackLogin,
  //   resetSlackProfile,
  //   bubbleUrl,
  //   extractAppAndPageFromUrl,
  //   addEventAddAction,
  // } = shared;
  
  // // bubble log in
  // const { context, page, browser } = await bubbleLogin();
  
  // // navigate to project
  // const { page2 } = await navigateTo(page, "elementpreviewreplay");
  
  // // cleanup
  // try {
  //   await page2.click(':text("Cancel")');
  // } catch {}
  // await selectAllDelete(page2);
  
  // // REQ Create and preview button
  // // select button and create on page
  // await page2.dblclick(':text("Button") >> nth=0');
  // await page2.mouse.click(350, 70);
  
  // // assert element created
  // await assertText(page2, "...edit me...");
  // await assertElement(page2, "button");
  
  // // enter button name
  // await page2.dblclick(':text("...edit me...Insert dynamic data")');
  // await page2.fill(".text-entry input", "I am a button");
  
  // // wait for preview to update
  // await page2.waitForTimeout(3000);
  
  // // Arrange:
  // // Navigate to Workflow
  // await page2.click(':text("Workflow")');
  
  // // Act:
  // // Click the 'Click here to add an event...' button
  // await page2.click(':text("Click here to add an event...")');
  
  // // Click the 'Do when condition is true' option
  // await page2.click(':text("Do when condition is true")');
  
  // // Click the 'Only when' button
  // await page2.click(".not-finished");
  
  // // Select Button A option
  // await page2.click(':text("Button I am a button")');
  
  // // Select Is hovered option
  // await page2.click(':text("is hovered")');
  
  // // Click the 'Click here to add an action' button
  // await page2.click(':text("Click here to add an action...")');
  
  // // Hover over Element Actions
  // await page2.click(':text("Element Actions")');
  
  // // Click the 'Hide' option
  // await page2.click(':text-is("Hide")');
  
  // // Assert element is created
  // await expect(page2.locator(':text("Error")')).not.toBeVisible();
  // await expect(
  //   page2.locator(':text("Do when button I am a button is hovered") >> nth = 0')
  // ).toBeVisible();
  
  // // Act:
  // // View Preview page
  // var previewPage = await openPopup(page2, "text=Preview");
  // await previewPage.waitForTimeout(3000);
  
  // // Hover over button
  // await previewPage.hover(`:text("I am a button")`);
  
  // // Click the 'Inspect' button
  // await previewPage.click(':text-is("Inspect")');
  
  // // Choose Button
  // await previewPage.click(':text("index")');
  // await previewPage.click(':text("Button I am a button")');
  
  // // Assert:
  // // Conditions and states display correctly
  // await expect(
  //   previewPage.locator(':text("This Button is hovered")')
  // ).toBeVisible();
  // await expect(previewPage.locator(':text("Condition 1")')).toBeVisible();
  
  // shared.page = page;
  // shared.page2 = page2;
  

  process.exit();
})();