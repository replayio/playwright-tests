const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Bubble: Interval Workflow";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // bubble log in
  const { context, page, browser } = await bubbleLogin({ slowMo: 700 });
  
  /// navigate to project 'Testing Button:Replay'
  const { page2 } = await navigateTo(page, "replay-link-map-text");
  
  // cleanup
  try {
    await page2.click(':text("Cancel")');
  } catch {}
  
  // delete all events and/or workflows
  await selectAllDelete(page2);
  await deleteEvenFlows(page2);
  
  // add Text element to canvas
  await addElementToCanvas(page2, '[element_name="Text"]');
  
  // go to workflow
  await page2.click(".tabs-2:has-text('Workflow')");
  
  // add event Do every 5 seconds
  await page2.click("text=Click here to add an event...");
  await page2.hover("text=General");
  await page2.click("text=Do every 5 seconds");
  
  // assert correct event added
  await assertText(page2, "Do every 5 seconds");
  
  // add action Set state
  await page2.click("text=Click here to add an action...");
  await page2.hover("text=Element Actions");
  await page2.click("text=Set state");
  
  // select element Text A
  await page2.click('[prop_name="element_id"]:right-of(:text("Element"))');
  await page2.click(".composer-palette:has-text('Text A')");
  
  // assert correct action selected
  await assertText(page2, "Set state of Text A");
  
  // create a new custom state called trigger_counter
  await page2.click('[prop_name="custom_state"]');
  await page2.click("text=Create a new custom state...");
  await page2.fill(
    ".new-field-name:right-of(:text('State name'))",
    "trigger_counter"
  );
  await page2.click(".children .spot:right-of(:text('State type'))");
  await page2.click(".composer-dropdown-long >> text=number");
  
  // assert correct state set up
  await assertText(page2, "trigger_counter", {
    selector: ".new-field-name:right-of(:text('State name'))",
  });
  await assertText(page2, "number", {
    selector: ".children .spot:right-of(:text('State type'))",
  });
  
  // create and assert creation
  await page2.click(".btn-create");
  await assertText(page2, "trigger_counter", {
    selector: '[prop_name="custom_state"]',
  });
  
  // set value to increment by 1
  await page2.click('[prop_name="value"]');
  await page2.click(".page .dropdown-option:has-text('Text A')");
  await page2.click("text='s trigger_counter");
  try {
    await page2.click("text=+", { timeout: 2000 });
  } catch {
    await page2.click(".composer .empty");
    await page2.click("text=+");
  }
  await page2.fill('[placeholder="Search..."]', "1");
  await page2.click("text=Value");
  
  // assert Value set up correctly
  await expect(
    page2.locator(`:text("Text A's trigger_counter + 1")`)
  ).toBeVisible();
  
  // go to Design tab
  await page2.click(".tabs-1:has-text('Design')");
  
  // insert dynamic data trigger_counter for Text A
  await page2.click(".text-composer");
  await page2.click("text=Insert dynamic data");
  await page2.click(".dropdown-option:has-text('Text')");
  await page2.click("text='s trigger_counter");
  
  // assert trigger counter dynamic data added
  await assertText(page2, "  Text A's trigger_counter");
  
  // go to preview page
  var previewPage = await openPopup(page2, "text=Preview", {
    timeout: 3 * 60 * 1000,
  });
  
  // wait for page to load
  await previewPage.waitForTimeout(10 * 1000);
  
  // assert counter is working as expected
  var starting = await previewPage.innerText(".Text div");
  await previewPage.waitForTimeout(5 * 1000);
  var newtime = await previewPage.innerText(".Text div");
  expect(Number(starting)).toBeLessThan(Number(newtime));
  await previewPage.waitForTimeout(10 * 1000);
  var latestTime = await previewPage.innerText(".Text div");
  expect(Number(starting)).toBeLessThan(Number(latestTime));
  expect(Number(newtime)).toBeLessThan(Number(latestTime));
  
  // bring editor page to front -> close preview page
  await page2.bringToFront();
  await previewPage.close();
  
  // upload replay
  await uploadReplay(page);
  
  shared.context = context;
  shared.page = page;
  shared.browser = browser;
  shared.page2 = page2;
  shared.previewPage = previewPage;
  shared.starting = starting;
  shared.newtime = newtime;
  shared.latestTime = latestTime;
  

  process.exit();
})();