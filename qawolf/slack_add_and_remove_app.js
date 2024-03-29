const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Slack: Add and Remove App";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // open replay browser
  // login to slack
  const { slackPage: page, context } = await slackLogin({ slowMo: 1000 });
  await page.waitForTimeout(5000);
  
  // if zoom is present, remove it
  try {
    // check on Apps page
    await page.click('[data-qa="virtual-list-item"] :text("More")');
    await page.waitForTimeout(1000);
    await page.click('[data-qa="gn-menu"]');
    await expect(page.locator('[data-qa="app_launcher__app_card--installed"]')).not.toBeVisible({ timeout: 5000 });
    await page.click('[data-qa="channel_sidebar_name_general"]');
  } catch {
    // remove it in Configuration
    await page.click('[data-qa="app_launcher__app_card--installed"]');
    await page.click('[data-qa="about"]');
    const [cleanUpPage] = await Promise.all([
      context.waitForEvent("page"),
      page.locator('[data-qa="app_profile_settings_link"]').click(), // Opens a new tab
    ]);
    await cleanUpPage.waitForLoadState();
  
    // Click the 'Remove App' button under Configuration
    await cleanUpPage.click('[data-qa="page_contents"] [data-qa="remove_app_button"]');
  
    // Click the 'Remove App' button in modal
    await cleanUpPage.click('[type="submit"].c-button--danger');
  
    // Click on Add apps in Slack
    await page.bringToFront();
    await page.click('[data-qa="virtual-list-item"] :text("More")');
    await page.waitForTimeout(1000);
    await page.click('[data-qa="gn-menu"]');
  
    // Assert Able to remove Zoom from applications
    await expect(
      page.locator('[data-qa="channel_sidebar_name_zoom"]')
    ).not.toBeVisible({ timeout: 5000 });
  
    await cleanUpPage.close();
    await page.waitForTimeout(2000);
    await page.click('[data-qa="channel_sidebar_name_general"]');
  }
  
  
  // REQ 02 Add zoom application on Slack
  // Click on Add apps
  await page.click('[data-qa="virtual-list-item"] :text("More")');
  await page.waitForTimeout(1000);
  await page.click('[data-qa="gn-menu"]');
  
  // Click the 'Add' button under an application (Zoom for example)
  await page.fill(
    '[placeholder="Search by name or category (e.g. productivity, sales)"]',
    "Zoom"
  );
  const [page2] = await Promise.all([
    context.waitForEvent("page"),
    page
      .locator(
        `[data-qa="app_launcher__app_card--not_installed"] [aria-label="Easily start a Zoom video meeting directly from Slack."]`
      )
      .click(), // Opens a new tab
  ]);
  await page2.waitForLoadState();
  
  // Click the 'Add to Slack' button in app directory page
  await page2.click('[data-qa="manage-requests-button"]');
  
  // Click the 'Add Now' button under Zoom for Yourself
  await page2.click(".slack-integration-child-right-button a");
  await page.waitForTimeout(1000);
  
  // Click the 'Allow' button
  await page2.click('[data-qa="oauth_submit_button"]');
  
  // Assert 'Zoom for Slack is installed!'
  await expect(page2.locator("text=Zoom for Slack is installed!")).toBeVisible();
  
  // Navigate to Apps
  // Assert Zoom app is added on Slack
  await page.bringToFront();
  await page.waitForTimeout(2000);
  await page.reload();
  
  // Slack UI being weird and not showing the Apps category sidebar sometimes
  try {
    // checking side bar
    await expect(page.locator('[data-qa="channel_sidebar_name_zoom"]')).toBeVisible({ timeout: 10000 });
  } catch {
    // checking Apps page
    await page.click('[data-qa="virtual-list-item"] :text("More")');
    await page.waitForTimeout(1000);
    await page.click('[data-qa="gn-menu"]');
    await expect(page.locator('[data-qa="app_launcher__app_card--installed"]')).toBeVisible();
  }
  
  // REQ 03 Delete zoom application on slack
  // Click the Zoom App
  try {
    // via side bar
    await page.click('[data-qa="channel_sidebar_name_zoom"]', { timeout: 10000 });
  } catch {
    // via Apps page
    await page.click('[data-qa="channel_sidebar_name_general"]');
    await page.click('[data-qa="virtual-list-item"] :text("More")');
    await page.waitForTimeout(1000);
    await page.click('[data-qa="gn-menu"]');
    await page.click('[data-qa="app_launcher__app_card--installed"]');
  }
  
  // Click the 'About' tab
  await page.click('[data-qa="about"]');
  
  // Click the 'Configuration' button
  const [page3] = await Promise.all([
    context.waitForEvent("page"),
    page.locator('[data-qa="app_profile_settings_link"]').click(), // Opens a new tab
  ]);
  await page3.waitForLoadState();
  
  // Click the 'Remove App' button under Configuration
  await page3.click('[data-qa="page_contents"] [data-qa="remove_app_button"]');
  
  // Click the 'Remove App' button in modal
  await page3.click('[type="submit"].c-button--danger');
  
  // Click on Add apps in Slack
  await page.bringToFront();
  await page.click('[data-qa="channel_sidebar_name_general"]');
  await page.click('[data-qa="virtual-list-item"] :text("More")');
  await page.waitForTimeout(1000);
  await page.click('[data-qa="gn-menu"]');
  
  // Assert Able to remove Zoom from applications
  await expect(page.locator('[data-qa="app_launcher__app_card--installed"]')).not.toBeVisible({ timeout: 5000 });
  
  
  // list and upload the replay
  await uploadReplay(page);
  
  shared.page = page;
  shared.context = context;
  shared.page2 = page2;
  shared.page3 = page3;
  

  process.exit();
})();