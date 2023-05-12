const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Pinterest: View Pin";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // launch replay
  const { browser, context } = await launchReplay({ slowMo: 3000 });
  
  // login to pinterest
  const { page } = await logInToPinterest(context);
  
  // view pin
  await page.click('[data-test-id="pinrep-image"]');
  try {
    await expect(page.locator("text=Comment").first()).toBeVisible();
  } catch {
    await expect(page.locator("text=Comments").first()).toBeVisible();
  }
  
  await page.waitForTimeout(1000);
  await page.click('[data-test-id="header-background"] [aria-label="Home"]');
  
  // view 5 more pins
  for (i = 1; i < 5; i++) {
    if (
      await page
        .locator(
          `[data-test-id="pinWrapper"] >> nth=${i} >> :has([data-test-id="one-tap-desktop"])`
        )
        .count()
    ) {
      i++;
    }
    await page.click(`[data-test-id="pinrep-image"] >> nth=${i}`);
    await expect(page.locator("text=Comments").first()).toBeVisible();
    await page.waitForTimeout(1000);
    await page.click('[data-test-id="header-background"] [aria-label="Home"]');
  }
  
  // list and upload the replay
  await uploadReplay(page);
  
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  

  process.exit();
})();