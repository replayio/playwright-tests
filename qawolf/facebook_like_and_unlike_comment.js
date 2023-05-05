const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Facebook: like and unlike comment";

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
  const { browser } = await launchReplay();
  
  // log in to Facebook`
  const { page } = await logInToFacebook(
    process.env.FACEBOOK_EMAIL_5,
    process.env.FACEBOOK_PASSWORD_5
  );
  
  // view user profile
  await page.goto("https://www.facebook.com/profile.php?id=100091313995937");
  await assertText(page, "James Smith");
  await page.evaluate(() => {
    window.scrollTo(0, 3000);
  });
  
  //ensure first post is there
  try {
    await assertText(page, "first post", { timeout: 7000 });
  } catch {
    await page.click(':text("Write something to Elizabeth...")');
    await page.keyboard.type("first post");
    await page.click('[aria-label="Post"]');
    await page.waitForTimeout(7000);
    await page.click('[aria-label="Write a comment"]');
    await page.keyboard.type("This is my first comment");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(7000);
  }
  
  // ensure comment not liked
  const unlikeButton = await page.$('[aria-label="Remove Like"]');
  if (unlikeButton) unlikeButton.click();
  
  // like comment
  await page.waitForTimeout(5000);
  await page.locator('[aria-label="Like"] >> nth=0').click();
  
  // unlike comment
  await page.click('[aria-label="Remove Like"]');
  
  await uploadReplay(page);
  
  shared.browser = browser;
  shared.page = page;
  shared.unlikeButton = unlikeButton;
  

  process.exit();
})();