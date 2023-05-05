const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Facebook: search for user";

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
  
  // log in to Facebook
  const { page } = await logInToFacebook(
    "qawreplayuser@gmail.com",
    "Replayfb-qaw1"
  );
  
  // wait for page to load
  await page.waitForTimeout(3 * 1000);
  
  // search for a user
  await page.mouse.click(0, 0);
  await page.fill('[aria-label="Search Facebook"]', "Mike");
  await assertText(page, "Mike Algdbbidiajhg Martinazzison");
  
  // added something to get rid of the facebook modal
  const facebookModal = await page
    .locator(
      ':text("If you change your mind, click the lock to give Chrome permission to send you desktop notifications.")'
    )
    .count();
  if (facebookModal) {
    await page.click('[role="main"]');
    await page.fill('[aria-label="Search Facebook"]', "Mike");
    await assertText(page, "Mike Algdbbidiajhg Martinazzison");
  }
  await page.click('[aria-label="Search Facebook"]');
  await page.waitForTimeout(3000);
  await page.click("text=Search for mike");
  try {
    await page.waitForSelector("text=Search Results");
  } catch {
    await page.click("text=Search for mike"); // I'm not sure why but it only hover clicks the first time so this second one is needed
  }
  
  // view posts
  await page.waitForTimeout(5000);
  await page.click(':text("Posts")');
  await assertText(page, "Posts You've Seen");
  
  // view people
  await page.click(":text('People')");
  // friends of friends now hidden below a dropdown
  await page.click('[aria-label="Friends"] i');
  await assertText(page, "Friends of Friends");
  
  // list and upload the replay
  await uploadReplay(page);
  
  shared.page = page;
  shared.facebookModal = facebookModal;
  

  process.exit();
})();