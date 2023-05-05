const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Facebook: messenger";

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
  
  // launch replay browser
  const { browser, context } = await launchReplay();
  
  // log in to Facebook
  const { page } = await logInToFacebook(
    process.env.FACEBOOK_EMAIL_5,
    process.env.FACEBOOK_PASSWORD_5
  );
  
  // open messenger
  await page.click('[aria-label="Messenger"]');
  await assertText(page, "See all in Messenger");
  await expect(page.locator('[aria-label="See all in Messenger"]')).toBeVisible();
  
  // view all in messenger
  await page.click("text=See all in Messenger");
  
  // view chat conversations
  await assertText(page, "Mark");
  
  // send message
  const message = faker.hacker.phrase();
  await page.fill('[aria-label="Message"]', message);
  await page.click('[aria-label="Press Enter to send"]');
  await page.hover(
    '[tabindex="0"][data-scope="messages_table"][data-release-focus-from="CLICK"] >> nth=-1'
  );
  console.log(message);
  // await page.click('[aria-label="Choose an emoji"]');
  try {
    await page.click('[aria-label="React"] >> nth=-1');
  } catch {
    await page.hover(
      '[tabindex="0"][data-scope="messages_table"][data-release-focus-from="CLICK"] >> nth=-1'
    );
    await page.click('[aria-label="React"] >> nth=-1');
  }
  
  // await page.click('[aria-label="Smileys & People"] [role="button"]');
  await page.click('[role="menuitem"]');
  await expect(
    page.locator(
      '[aria-label="1 reaction; see who reacted to this"][tabindex="0"]'
    )
  ).toBeVisible();
  
  // list and upload the replay
  await uploadReplay(page);
  
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  shared.message = message;
  

  process.exit();
})();