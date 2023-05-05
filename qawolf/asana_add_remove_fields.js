const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  const TEST_NAME = "Asana: Add & Remove Fields";

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
  const { page } = await logInToAsana(
    process.env.ASANA_EMAIL,
    process.env.ASANA_PASSWORD
  );
  
  // nav to first test project
  await page.click(':text("First Test Project")');
  await expect(page.locator('[aria-label="Add field"]')).toBeVisible({
    timeout: 60 * 1000,
  });
  
  // clean test
  await page.waitForTimeout(5000);
  while (await page.locator("text=QA Field").count()) {
    let text = await page.innerText(':text("QA Field")');
    console.log(text);
    await page.waitForTimeout(500);
    try {
      await page.click(
        `[role="button"][aria-label="Show options for ${text} column"]`
      );
    } catch {}
    await page.click(
      `[role="button"][aria-label="Show options for ${text} column"]`
    );
    await page.click(':text("Remove field from project")');
    await page.click(':text("Delete field")');
    await page.waitForTimeout(500);
  }
  
  // add field
  const fieldName = `QA Field ` + Date.now().toString().slice(-4);
  await page.click('[aria-label="Add field"]');
  await page.click(':text("Single-select")');
  try {
    await page.click(':text("Text")');
  } catch {
    await page.click(':text("Single-select")');
    await page.click(':text("Text")');
  }
  await page.fill('[placeholder="Phone Number, Address…"]', fieldName);
  await page.click(':text("Create Field")');
  
  // assert field
  await expect(page.locator(`text=${fieldName}`).first()).toBeVisible({
    timeout: 60 * 1000,
  });
  
  // delete field
  await page.click(`[aria-label="Show options for ${fieldName} column"]`);
  await page.click(':text("Remove field from project")');
  await page.click(':text("Delete field")');
  await page.waitForTimeout(2000);
  
  // assert field deleted
  await expect(page.locator(`text=${fieldName}`)).not.toBeVisible({
    timeout: 60 * 1000,
  });
  
  // upload replay
  await uploadReplay(page);
  
  shared.page = page;
  shared.fieldName = fieldName;
  

  process.exit();
})();