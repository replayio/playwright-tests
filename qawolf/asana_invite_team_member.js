const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  const TEST_NAME = "Asana: Invite Team Member";

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
  
  // Arrange:
  // login
  const { page, browser } = await logInToAsana(
    "replay+asana@qawolf.email",
    process.env.ASANA_PASSWORD
  );
  
  // clean test
  await page.click(`:text("QA's First Team")`);
  try {
    await expect(page.locator(':text("asana2@qawolf.email")')).toBeVisible();
  
    // Click the 'Manage members' button
    await page.click(':text("Manage members")');
    await page.waitForTimeout(2000);
    await page.hover(':text("Team settings")');
  
    // Click the 'Member' option
    await page.click(
      '.TeamSettingsDialogListFullMemberRow:has-text("asana2") :text("Member")'
    );
  
    // Click the 'Remove from team' button
    await page.click(`:text-is("Remove from team")`);
  
    // Click the 'Remove Access' button
    await page.click(':text-is("Remove Access")');
  
    // Invited Team member is no longer visible
    await expect(page.locator(':text("asana2@qawolf.email")')).not.toBeVisible();
  
    // exit
    await page.click('[aria-label="Close this dialog"]');
  } catch {}
  
  // Act:
  // Click the '+' icon next to a team
  await page.click('[aria-label="Add to this team"]');
  
  // Click the 'Invite people' button
  await page.click(':text("Invite people")');
  
  // Enter email address
  const after = new Date();
  const { email, waitForMessage } = getInbox({ id: "asana2" });
  await page.fill('[placeholder*="name@dummy"]', email);
  await page.keyboard.press("Enter");
  
  // Click Send
  await page.click(':text-is("Send")');
  
  // Assert:
  // Team Member is added
  await page.click(`:text("QA's First Team")`);
  await expect(page.locator(':text("asana2@qawolf.email"):visible').last()).toBeVisible();
  
  shared.page = page;
  shared.browser = browser;
  

  process.exit();
})();