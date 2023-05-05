const {
  assert,
  assertElement,
  assertText,
  expect,
  faker,
  getInbox,
  getValue,
  launch,
  launchReplay,
  uploadReplay,
  assertNotElement,
  assertNotText,
  buildUrl,
  deleteTeam,
  getBoundingClientRect,
  getPlaybarTooltipValue,
  logIn,
  logInToFacebook,
  parseInviteUrl,
  setFocus,
  waitForFrameNavigated,
} = require("./helpers");

(async () => {
  // open replay browser
  // login to slack
  const { slackPage: page, context } = await slackLogin({ slowMo: 1000 });

  // REQ 02 Add zoom application on Slack
  // Click on Add apps
  await page.click('[data-qa="virtual-list-item"] :text("More")');
  await page.waitForTimeout(1000);
  await page.click('[data-qa="gn-menu"]');

  // Click the 'Add' button under an application (Zoom for example)
  const [page2] = await Promise.all([
    context.waitForEvent("page"),
    page
      .locator(
        '[data-qa="app_launcher__app_card--not_installed"] [aria-label="Easily start a Zoom video meeting directly from Slack."]'
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
  await expect(
    page2.locator("text=Zoom for Slack is installed!")
  ).toBeVisible();

  // Navigate to Apps
  // Assert Zoom app is added on Slack
  await page.bringToFront();
  await page.waitForTimeout(2000);
  await page.reload();
  await expect(
    page.locator('[data-qa="app_launcher__app_card--installed"]')
  ).toContainText("Zoom");

  // REQ 03 Delete zoom application on slack
  // Click the Zoom App
  await page.click('[data-qa="app_launcher__app_card--installed"]');

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
  await page.click('[data-qa="virtual-list-item"] :text("More")');
  await page.waitForTimeout(1000);
  await page.click('[data-qa="gn-menu"]');

  // Assert Able to remove Zoom from applications
  await expect(
    page.locator(
      '[data-qa="app_launcher__app_card--not_installed"] [aria-label="Easily start a Zoom video meeting directly from Slack."]'
    )
  ).toBeVisible();

  // list and upload the replay
  await uploadReplay(page);

  process.exit();
})();
