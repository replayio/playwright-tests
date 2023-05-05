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
  // Open Replay browser
  // Twitter login
  const { page, context } = await twitterLogin({ slowMo: 500 });

  // Click the 'Profile' button
  await page.click('[data-testid="AppTabBar_Profile_Link"]');

  // reset profile information if necessary
  const name = "QA Wolf Replay Test";
  const username = "@ReplayQa98928";
  const address = "123 California Rd";
  const bio = "Test Bio";
  const site = "google.com";
  try {
    await expect(
      page.locator(`:text("Updated ${bio}") >> nth = 0`)
    ).not.toBeVisible({ timeout: 10 * 1000 });
  } catch {
    // Reset profile
    await editTwitterProfile(page);
  }

  // if we have a professional profile, reset it
  try {
    await page.click(':text("Edit profile")');
    await expect(
      page.locator(':text("Edit professional profile")')
    ).not.toBeVisible({ timeout: 5000 });
  } catch {
    await page.click(
      '[data-testid="ProfessionalButton_Edit_Professional_Profile"]'
    );
    await page.click(':text("Switch account type")');
    // Click the 'Switch to Personal account' button
    await page.click(
      '[data-testid="sheetDialog"] [role="button"]:has-text("Personal")'
    );

    // Click the 'Switch to personal account' button
    await page.click(':text("Switch to personal account") >> nth = 1');
    await page.mouse.click(0, 0);
    await page.click('[data-testid="app-bar-close"]');
    await page.waitForTimeout(15 * 1000);
    await page.reload();
  }

  // Assert:
  // Redirected to profile page
  // User information loads correctly
  // - Name
  // - Username
  // - Address
  // - Bio
  // - Site
  await expect(
    page.locator(`[data-testid="UserName"]:has-text("${name}")`)
  ).toBeVisible();
  await expect(page.locator(`:text("${username}") >> nth = 0`)).toBeVisible();
  await expect(page.locator(`:text("${bio}") >> nth = 0`)).toBeVisible();
  await expect(page.locator(`:text("${address}") >> nth = 0`)).toBeVisible();
  await expect(page.locator(`:text("${site}") >> nth = 0`)).toBeVisible();

  // Act:
  // Click the 'Edit profile' button
  await page.click(':text("Edit profile")');

  // Fill Name with new value
  await page.fill('[name="displayName"]', "Updated QA Wolf Replay Test");

  // Fill Bio with new value
  await page.fill(':text("Test Bio")', "Updated Test Bio");

  // Fill Location with new value
  await page.fill('[name="location"]', "New 123 California Rd");

  // Fill Website with new value
  const newSite = "https://www.qawolf.com/";
  await page.fill('[name="url"]', newSite);

  // Click the 'Save' button
  await page.click('[data-testid="Profile_Save_Button"]');

  // Assert:
  // Able to save values and see changes on profile page
  await expect(
    page.locator(`[data-testid="UserName"]:has-text("Updated ${name}")`)
  ).toBeVisible();
  await expect(
    page.locator(`:text("Updated ${bio}") >> nth = 0`)
  ).toBeVisible();
  await expect(
    page.locator(`:text("New ${address}") >> nth = 0`)
  ).toBeVisible();
  await expect(page.locator(`:text("qawolf.com") >> nth = 0`)).toBeVisible();

  // reset information
  await editTwitterProfile(page);

  // switch to personal if necessary

  // Arrange:
  // Navigate to Edit Profile modal
  // After completion, switch
  await page.click(':text("Edit profile")');

  // Act:
  // Click the 'Switch to Proffesional' button
  await page.click('[data-testid="ProfessionalButton_Switch_To_Professional"]');

  // Click the 'Agree & Continue' button
  await page.click('[data-testid="ActionListNextButton"]');

  // Select Category
  await page.click('[name="single-choice"]');

  // Click the 'Next' button
  await page.click('[data-testid="ChoiceSelectionNextButton"]');

  // Select Creator account type
  await page.click(
    ':text("CreatorBest fit for public figures, artists, and influencers")'
  );
  // Click the 'Next' button
  await page.click('[data-testid="ChoiceSelectionNextButton"]');

  // Assert:
  // Able to create profesional account and are redirected to 'Professional Home'
  // - Impressions visible
  // - Engagement rate visible
  // - Profile visits visible
  // - Link clicks visible
  await expect(page.locator(':text("Impressions")')).toBeVisible();
  await expect(page.locator(':text("Profile visits")')).toBeVisible();
  await expect(page.locator(':text("Engagement rate")')).toBeVisible();
  await expect(page.locator(':text("Link clicks")')).toBeVisible();

  // Act:
  // Click the settings icon button
  await page.click('[data-testid="settingsAppBar"]');

  // Click on Switch account type
  await page.click(':text("Switch account type")');

  // Click the 'Switch to Business account' button
  await page.click(
    '[data-testid="sheetDialog"] :text("Switch to Business account")'
  );

  // Click the 'Yes, switch' button
  await page.click('[data-testid="sheetDialog"] :text("Yes, switch")');

  // Assert:
  // Switched to Business account message
  await expect(
    page.locator(':text("Switched to Business account")')
  ).toBeVisible();

  // Act:
  // Click on Switch account type
  await page.click(':text("Switch account type")');

  // Click the 'Switch to Personal account' button
  await page.click(
    '[data-testid="sheetDialog"] [role="button"]:has-text("Personal")'
  );

  // Click the 'Switch to personal account' button
  await page.click(':text("Switch to personal account") >> nth = 1');

  // Navigate to Profile
  await page.click('[data-testid="AppTabBar_Profile_Link"]');

  // Assert:
  // Able to switch to personal account
  await page.click(':text("Edit profile")');
  await page.waitForTimeout(15 * 1000);
  await page.reload();
  await expect(
    page.locator('[data-testid="ProfessionalButton_Switch_To_Professional"]')
  ).toBeVisible();

  // upload
  await uploadReplay(page);

  process.exit();
})();
