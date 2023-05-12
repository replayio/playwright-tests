const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Marko: edit code";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // launch page
  // const { context } = await launch();
  
  // launch replay browser
  const { browser, context } = await launchReplay();
  const page = await context.newPage();
  await page.goto("https://markojs.com/try-online/");
  
  // assert page load
  await assertText(page, '"Frank"');
  
  // clear input
  await page.click(".monaco-editor");
  await page.press(".monaco-editor textarea.inputarea", "Control+A");
  await page.press(".monaco-editor textarea.inputarea", "Backspace");
  
  // assert input cleared
  // await assertNotText(page, '"Frank"');
  await expect(page.locator('text="Frank"')).not.toBeVisible();
  
  var text = `
  <div class="container">
      <h1>Here is new code</h1> 
    </div>
  `;
  
  // add input
  for (let line of text.trim().split("\n")) {
    await page.type(".monaco-editor textarea.inputarea", line);
  
    // clear any auto-complete dialogs
    await page.press(".monaco-editor textarea.inputarea", "Escape");
    await page.press(".monaco-editor textarea.inputarea", "Enter");
  
    // Clear any auto-inserted content
    await page.press(
      ".monaco-editor textarea.inputarea",
      "Control+Shift+ArrowRight"
    );
    await page.press(".monaco-editor textarea.inputarea", "Delete");
  
    await page.waitForTimeout(100);
  }
  
  // assert new code
  await assertText(page, "Here is new code", { selector: ".preview-output h1" });
  
  // list and upload the replay
  await uploadReplay(page);
  
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  shared.text = text;
  

  process.exit();
})();