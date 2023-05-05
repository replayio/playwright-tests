const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Pinterest: Create Idea Pin";

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
  
  // launch replay
  const { browser, context } = await launchReplay({ slowMo: 500 });
  
  // login to pinterest
  const { page } = await logInToPinterest(context, {
    email: "replay+pinaccount@qawolf.email",
  });
  
  // click on create idea pin
  await page.click(':text-is("Create")');
  await page.click(':text-is("Create Idea Pin")');
  await expect(
    page.locator(
      ':text("Start fresh with a new Idea Pin or keep designing a recent draft")'
    )
  ).toBeVisible();
  await page.waitForTimeout(5000);
  
  // upload pin and create
  await page.click(
    '[data-test-id="storyboard-create-button"] :text("Create new")'
  );
  page.once("filechooser", (chooser) =>
    chooser.setFiles("/root/files/large.jpg").catch((err) => console.log(err))
  );
  await page.click(':has-text("Drag and drop")', { force: true });
  
  // fill out idea pin creation form and submit
  const title = `${faker.name.findName()} ${Date.now().toString().slice(-4)}`;
  await page.fill(
    '[data-test-id="storyboard-details-list"] #storyboard-selector-title',
    title
  );
  
  // add tags
  await page.fill(
    '[data-test-id="storyboard-interest-tags"] #storyboard-selector-interest-tags',
    "wolf"
  );
  await page.click(
    '[data-test-id="storyboard-suggestions-item"]:has-text("wolf")'
  );
  await page.waitForTimeout(2000);
  await page.fill(
    '[data-test-id="storyboard-interest-tags"] #storyboard-selector-interest-tags',
    "animal logo"
  );
  await page.click(
    '[data-test-id="storyboard-suggestions-item"]:has-text("animal logo")'
  );
  await page.waitForTimeout(2000);
  await page.fill(
    '[data-test-id="storyboard-interest-tags"] #storyboard-selector-interest-tags',
    "dogs"
  );
  await page.click(
    '[data-test-id="storyboard-suggestions-item"]:has-text("dogs")'
  );
  await page.waitForTimeout(3000);
  
  // publish
  await page.click(
    '[data-test-id="storyboard-creation-nav-done"] :text("Publish")'
  );
  await expect(
    page.locator(':text("Warming up the Pin machine...")')
  ).toBeVisible();
  
  // assert pin appears on profile page with correct details
  await expect(
    page.locator(':text("Warming up the Pin machine...")')
  ).not.toBeVisible();
  await expect(page.locator(`:text("${title}")`)).toBeVisible();
  
  // edit pin
  await page.click(
    '[data-test-id="closeup-action-bar-button"] [aria-label="More options"]'
  );
  await page.click(
    '[data-test-id="pin-action-dropdown-edit-pin"] :text("Edit Pin")'
  );
  
  // add note to self
  await page.click('[for="notes"]');
  await page.fill("#storyboard-details-list", "Personal Note");
  
  // press save
  await page.click('button :text("Save") >> nth = -1');
  await page.waitForTimeout(5000);
  
  // assert note
  await expect(page.locator(':text("Note to self")')).toBeVisible();
  await page.waitForTimeout(3000);
  
  // delete pin
  await deleteIdeaPin(page, title);
  
  // list and upload the replay
  await uploadReplay(page);
  
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  shared.title = title;
  

  process.exit();
})();