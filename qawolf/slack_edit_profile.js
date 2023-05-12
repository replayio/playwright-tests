const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Slack: Edit Profile";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // open replay browser
  // login to slack
  const { slackPage: page, context } = await slackLogin({ slowMo: 1000 });
  
  // Act:
  // Click the profile icon button
  await page.click('[data-qa="user-button"]');
  
  // Click on Profile
  await page.click('[data-qa="menu_item_button"] :text("Profile")');
  
  // Click on Edit next to name
  await page.waitForTimeout(2000);
  await page.click('[data-qa="member_profile_pane"] :text("Edit")');
  await page.waitForTimeout(2000);
  await page.mouse.click(300, 50);
  
  // constants
  const fullName = "replay_slack user";
  const displayName = "replay_display name";
  const title = "Software Engineer";
  const pronounciation = "re-pley";
  
  // reset profile name
  await resetSlackProfile(page, fullName, displayName, title, pronounciation);
  await page.click('[data-qa="member_profile_pane"] :text("Edit")');
  await page.waitForTimeout(2000);
  await page.mouse.click(300, 50);
  await page.waitForTimeout(2000);
  
  // Fill the Full name field with new name
  await page.fill(
    '[data-qa="slack_kit_scrollbar"] #real_name-input',
    "Updated " + fullName
  );
  await page.waitForTimeout(2000);
  
  // Fill the Display name field with new name
  await page.fill("#display_name-input", "Updated " + displayName);
  await page.waitForTimeout(2000);
  
  // Fill the Title field with new title
  await page.fill(
    '[data-qa="slack_kit_scrollbar"] #title-input',
    "Updated " + title
  );
  
  // Fill the Name pronouncisation field with new pronouncisation
  await page.fill(
    '[data-qa="slack_kit_scrollbar"] #name_pronunciation-input',
    "Updated " + pronounciation
  );
  
  // Click the 'Save Changes' button
  await page.waitForTimeout(5000);
  await page.click('[data-qa="edit_profile_modal"] :text("Save Changes")');
  await page.waitForTimeout(5000);
  
  // Assert:
  // Edit profile modal displays
  // User information saves correctly
  // - Name
  // - Display name
  // - Title
  // - Name pronounciation
  await page.click('[data-qa="member_profile_pane"] :text("Edit")');
  await page.mouse.click(300, 50);
  await expect(
    page.locator('[data-qa="slack_kit_scrollbar"] #real_name-input')
  ).toHaveValue(`Updated ${fullName}`);
  await expect(
    page.locator('[data-qa="slack_kit_scrollbar"] #display_name-input')
  ).toHaveValue(`Updated ${displayName}`);
  await expect(
    page.locator('[data-qa="slack_kit_scrollbar"] #title-input')
  ).toHaveValue(`Updated ${title}`);
  await expect(
    page.locator('[data-qa="slack_kit_scrollbar"] #name_pronunciation-input')
  ).toHaveValue(`Updated ${pronounciation}`);
  
  // Arrange:
  // Navigate to Profile
  await page.click(':text-is("Cancel")');
  
  // Act:
  // Click on Edit next to Contact information
  await page.waitForTimeout(2000);
  await page.click('[data-qa="member_profile_pane"] :text("Edit") >> nth = 1');
  
  // Email cannot be updated
  await expect(
    page.locator('label:has-text("Email Address") ~ input[disabled]')
  ).toBeVisible();
  
  // Fill the Phone field with new Phone number
  await page.fill('label:has-text("Phone") ~ input', "17571112222");
  await page.click(':text("Save Changes")');
  
  // Assert:
  // Phone Number is updated correctly
  await expect(
    page.locator('[data-qa="member_profile_pane"] :text("17571112222")')
  ).toBeVisible();
  
  // Act:
  // Click the 'Set a status' button
  await page.click('[data-qa="member_profile_status_btn"]');
  
  // Select a Company option (In a meeting)
  await page.click('[data-qa="emoji"]');
  
  // Click the 'Save' button
  await page.click('[data-qa="custom_status_input_go"]');
  
  // Assert:
  // Status icon is placed next to profile image
  await expect(
    page.locator(
      '[data-qa="member_profile_pane"] [aria-label="spiral calendar pad emoji"]'
    )
  ).toBeVisible();
  
  // clear status
  await page.click('[data-qa="member_profile_status_btn"]');
  await page.click('[data-qa="custom_status_input_go"]');
  await expect(
    page.locator(
      '[data-qa="member_profile_pane"] [aria-label="spiral calendar pad emoji"]'
    )
  ).not.toBeVisible();
  
  // upload replay
  await uploadReplay(page);
  
  shared.page = page;
  shared.context = context;
  shared.fullName = fullName;
  shared.displayName = displayName;
  shared.title = title;
  shared.pronounciation = pronounciation;
  

  process.exit();
})();