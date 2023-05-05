const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  const TEST_NAME = "Bubble: Create, Edit, Delete, Reusable element";

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
  
  // navigate to project 'testing-buttonreplay'
  const { page2 } = await navigateTo(page, "testing-reusablereplay");
  
  // cleanup
  try {
    await page2.click(':text("Cancel")');
  } catch {}
  await selectAllDelete(page2);
  
  // Create a button
  await page2.click(".button");
  await page2.mouse.click(350, 70);
  
  // assert element created
  await assertText(page2, "...edit me...");
  await assertElement(page2, "button");
  await page2.fill(".text-entry input", "Button for re-use");
  
  // create reusable element
  const elementName = "spark-element"; // change this name when needed
  await page2.click(':text("New reusable...")');
  await page2.fill(".new-page-name", elementName);
  await page2.click(".btn-create");
  
  // wait for page to update
  await page2.waitForTimeout(3000);
  
  // asssert element was created
  await expect(
    page2.locator(`.add_element:has-text("${elementName}")`)
  ).toBeVisible();
  
  // edit element
  await page2.click(".spot");
  await page2.click(".self");
  
  // change name
  await page2.click('[class="static-title"]:has-text("spark-element")'); // change this name when needed
  await page2.fill(".name-input", "Updated spark-element"); // change this name when needed
  await page2.keyboard.press("Escape");
  
  // wait for page to update
  await page2.waitForTimeout(3000);
  await page2.reload();
  
  // assert updated re element
  await expect(
    page2.locator(`.add_element:has-text("Updated ${elementName}")`)
  ).toBeVisible();
  
  // cleanup
  try {
    await page2.click(':text("Cancel")');
  } catch {}
  
  // delete reusable element
  // todo: update delete
  page2.on("dialog", (dialog) => dialog.accept());
  for (let i = 0; i < 2; i++) {
    await page2.click(".undo");
    await page.waitForTimeout(2000);
  }
  
  // assert reusable element deleted (newly added this to make sure)
  await expect(
    page2.locator(`.add_element:has-text("Updated ${elementName}")`)
  ).not.toBeVisible();
  
  await uploadReplay(page);
  
  shared.context = context;
  shared.page = page;
  shared.browser = browser;
  shared.page2 = page2;
  shared.elementName = elementName;
  

  process.exit();
})();