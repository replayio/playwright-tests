const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  const TEST_NAME = "Asana: Send New Message";

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
  
  // login
  const { page, browser } = await logInToAsana(
    process.env.ASANA_EMAIL,
    process.env.ASANA_PASSWORD
  );
  
  // create message
  await page.click(':text("Create")');
  await page.click(':text("Message")');
  try {
    await page.click(
      '[placeholder="Type the name of a team, a project, or people"]',
      { delay: 500, timeout: 5000 }
    );
    await page.type(
      '[placeholder="Type the name of a team, a project, or people"]',
      "Asana"
    );
    await page.click(':text("QWQA Wolfreplay+asana@qawolf.email")', {
      force: true,
    });
  } catch {}
  
  const message = `Test Message ` + Date.now().toString().slice(-4);
  await page.fill('[aria-label="Edit message draft"]', message);
  await page.click(`.PrimaryButton:has-text("Send")`);
  
  // assert message
  await expect(page.locator("text=Sent message")).toBeVisible();
  await page.click(':text("message")');
  await expect(page.locator('[aria-label="Conversation Name"]')).toHaveText(
    message
  );
  
  // upload replay
  await uploadReplay(page);
  shared.page = page;
  shared.browser = browser;
  shared.message = message;
  

  process.exit();
})();