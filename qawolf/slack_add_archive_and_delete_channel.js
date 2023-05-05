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

  // Act:
  // Click on Add channels
  await page.click('[data-qa="section_heading_button__channels"]');

  // Click on Create a new channel
  await page.hover('[data-qa="menu_item_submenu_indicator"]');
  await page.click(
    '[data-qa="channel_section_menu__create_channel-wrapper"] [data-qa="channel_section_menu__create_channel"]'
  );

  // Fill the Name field with channel name
  await expect(page.locator('[data-qa="help"]')).toBeVisible();
  await page.fill('[data-qa="channel-name-input"]', "testchannel");

  // Click the 'Create' button
  await page.click('[data-qa="create-channel-next-button"]');

  // Click the 'Create' button again
  await page.click('[data-qa="create-channel-next-button"]');

  // Click the 'Skip for now' button for adding people
  await page.click(
    '[data-qa="footer_actions_container"] [data-qa="invite_to_workspace_skip_button"]'
  );

  // Assert:
  // Channel was created successully
  await expect(
    page.locator(
      "text=You created this channel today. This is the very beginning of the testchannel channel."
    )
  ).toBeVisible();

  // Act:
  // Click on the Channel's name
  await page.click('[data-qa="channel_name_button"]');

  // Click on the Settings tab
  await page.click(
    '[data-qa="channel_details_modal"] [data-qa="channel_details_settings_tab"]'
  );

  // Click the 'Archive channel for everyone' button
  await page.click('[data-qa="archive-channel"]');
  await expect(page.locator("text=Archive this channel?")).toBeVisible();

  // Click the 'Archive Channel' button on modal
  await page.click('[data-qa="archive_modal_go"]');

  // Assert:
  // Channel was successfully archived and is no longer visible
  await expect(page.locator('[data-qa="channels"]')).not.toContainText(
    "testchannel"
  );

  // Arrange:
  // Navigate to a channel
  await page.click('[data-qa="section_heading_button__channels"]');
  await page.hover('[data-qa="channel_section_submenu_manage"]');
  await page.click('[data-qa="channel_section_menu__channels__browse"]');
  await page.fill(
    '[data-qa="browse_page_search_autocomplete_input"]',
    "testchannel"
  );
  await page.waitForTimeout(3000);
  await page.keyboard.press("Enter");
  await page.click(
    '[data-qa="browse_page_channel"] :text("testchannel (archived)")'
  );

  // Act:
  // Click on the Channel's name
  await page.click('[data-qa="channel_name_button"]');

  // Click on the Settings tab
  await page.click(
    '[data-qa="channel_details_modal"] [data-qa="channel_details_settings_tab"]'
  );

  // Click the 'Delete this channel' button
  await page.click(
    '[data-qa="slack_kit_scrollbar"] [aria-label="Delete this channel"]'
  );
  await expect(page.locator("text=Delete this channel?")).toBeVisible();

  // Check the 'Yes, permanently delete the channel' checkbox
  await page.click('[type="checkbox"]');

  // Click the 'Delete this channel' button on modal
  await page.click(':text("Delete Channel")');

  // Assert:
  // Channel was successfully deleted and is no longer visible
  await page.click('[data-qa="section_heading_button__channels"]');
  await page.hover('[data-qa="channel_section_submenu_manage"]');
  await page.click('[data-qa="channel_section_menu__channels__browse"]');
  await page.fill(
    '[data-qa="browse_page_search_autocomplete_input"]',
    "testchannel"
  );
  await page.waitForTimeout(3000);
  await page.keyboard.press("Enter");
  await expect(page.locator("text=No results").first()).toBeVisible();

  // list and upload the replay
  await uploadReplay(page);

  process.exit();
})();
