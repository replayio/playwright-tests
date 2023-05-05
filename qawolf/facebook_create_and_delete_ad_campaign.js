const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  const TEST_NAME = "Facebook: create and delete ad campaign";

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
  
  await assertText(page, "Richard Qaw");
  
  // go to ads manager
  await page.goto("https://facebook.com/adsmanager/manage");
  
  // dismiss banner if present
  try {
    await expect(page.locator('[role="alert"]')).not.toBeVisible({
      timeout: 5000,
    });
  } catch {
    await page.locator('[role="alert"] :text("close​")').click();
  }
  
  // reload if error occurs
  try {
    await expect(
      page.locator(
        "text=Sorry, something unexpected happened. Try again. (An unknown error has occurred."
      )
    ).not.toBeVisible({ timeout: 5000 });
  } catch {
    await page.reload();
  }
  
  // dismiss updates pop up
  if (await page.locator("text=Add payment method").count()) {
    await page.click(':text("Close​")');
  }
  
  // create new campaign
  await page.click("text=Create");
  
  // choose campaign objective
  await assertText(page, "Choose a campaign objective");
  await page.click("#objectiveContainerOUTCOME_AWARENESS");
  await page.click("text=Continue");
  
  // rename campaign
  const campaignName = faker.commerce.productName();
  await page.waitForSelector("text=Campaign Name");
  await page.fill(
    '[placeholder="Enter your campaign name here..."]',
    campaignName
  );
  await page.click("text=Next");
  
  // set ad name
  await expect(page.locator('text="Ad set name"')).toBeVisible();
  await page.fill(
    '[placeholder="Enter your ad set name here..."]',
    faker.hacker.adjective()
  );
  try {
    await page.click(
      '[data-testid="ContextualLayerRoot"] [role="option"] >> nth=0'
    );
  } catch {}
  await page.fill('#tip [placeholder="$X.XX"]', faker.commerce.price(1, 20));
  await page.click('[style="display: inline-block;"] [type="button"]'); // Next button bottom right
  
  // preview campaign
  await assertText(page, "Ad");
  
  // close campaign
  await page.waitForTimeout(1000);
  await page.click(':text("Close") >> nth=-1');
  await page.waitForTimeout(1000);
  await assertText(page, "Publish draft items?");
  await page.click(":text('Close'):left-of(:text('Publish Draft Items'))");
  
  // delete campaign
  await page.click("#CAMPAIGN_GROUP_AdsClassicTab");
  await page.click("#pe_toolbar >> text=More");
  await page.click('[data-testid="ContextualLayerRoot"] >> text=Delete');
  await page.click(":text('Delete'):right-of(:text('Cancel'))");
  await expect(page.locator(`text=${campaignName}`)).not.toBeVisible();
  
  // list and upload the replay
  await uploadReplay(page);
  
  shared.page = page;
  shared.campaignName = campaignName;
  

  process.exit();
})();