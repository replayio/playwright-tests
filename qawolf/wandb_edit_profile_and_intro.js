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
  // Open Replay Browser
  const { browser, context } = await launchReplay();
  const page = await context.newPage();

  // Navigate to https://wandb.ai/login
  await page.goto("https://wandb.ai/login");

  // REQ 01 Log into Wandb.ai
  // Fill the Email input with WANDB_EMAIL
  await page.fill('[aria-label="Email"]', process.env.WANDB_EMAIL);

  // Fill the Password input with WANDB_PASSWORD
  await page.fill('[aria-label="Password"]', process.env.WANDB_PASSWORD);

  // Click the 'Log In' button
  await page.click('[aria-label="Log In"]');

  // Assert Able to log into Wandb with Replay Browser
  await expect(page.locator('[data-test="home-get-started"] h1')).toBeVisible();

  // REQ Edit Wandb Profile
  // Click on your username
  await page.click('[data-test="nav-profile"]');

  // Select 'Profile' option
  await page.click('[data-test="nav-profile-menu"] :text("Profile")');

  // Have differernt name, username, bio and profile picture
  const ogName = "QA Wolf Replay";
  const ogBio = "Welcome to my bio!";

  // clean up - make sure Profile name and bio and picture are og version
  try {
    await expect(page.locator(':text("QA Wolf Replay")')).toBeVisible();
  } catch {
    await page.click(
      '[data-test="compute-graph-provider"] :text("Edit profile")'
    );
    await page.fill(
      '[data-test="compute-graph-provider"] [placeholder="Name"]',
      ogName
    );
    await page.fill(
      '[data-test="compute-graph-provider"] [placeholder="Bio"]',
      ogBio
    );
    await page.hover('[data-test="compute-graph-provider"] .editable-field');
    const [fileChooser] = await Promise.all([
      page.waitForEvent("filechooser"),

      // Opens the file chooser.
      await page.click(
        '[data-test="compute-graph-provider"] :text("Update photo")'
      ),
    ]);
    await fileChooser.setFiles("/root/files/large.jpg");
    await page.click('[data-test="compute-graph-provider"] :text("Save")');

    await expect(page.locator(`text=${ogName}`)).toBeVisible();
    await expect(page.locator(`text=${ogBio}`)).toBeVisible();
  }

  // Have different text and no link
  const ogIntroText = "Hello, I'm @replay-wandb and I'm new here!";

  // clean up - make sure Profile intro text and links are og version
  try {
    await expect(page.locator(`:text("${ogIntroText}")`)).toBeVisible();
  } catch {
    await page.click('[data-test="entity-report-section"] button');
    await page.fill(
      '[data-test="report-editable-content"][contenteditable="true"]',
      ogIntroText
    );
    await page.click(':text("Save")');

    while (
      await page
        .locator('[data-test="profile-page-tabs"] a .drag-source')
        .count()
    ) {
      await page.click(
        '[data-test="profile-page-tabs"] button:below(:text("Links")) >> nth=0'
      ); // click trash
      await page.waitForTimeout(2000);
    }

    await expect(page.locator(`:text("${ogIntroText}")`)).toBeVisible();
    await expect(
      page.locator('[data-test="profile-page-tabs"] :text("Add a link")')
    ).toBeVisible();
  }

  // Click the 'Edit profile' button
  await page.click(
    '[data-test="compute-graph-provider"] :text("Edit profile")'
  );

  // Fill in different name, username and bio
  const newName = faker.name.firstName() + " " + faker.name.lastName();
  const newBio = faker.random.words(10);
  console.log(newName, newBio);
  await page.fill(
    '[data-test="compute-graph-provider"] [placeholder="Name"]',
    newName
  );
  await page.fill(
    '[data-test="compute-graph-provider"] [placeholder="Bio"]',
    newBio
  );

  // Upload new profile pricture
  await page.hover('[data-test="compute-graph-provider"] .editable-field');
  const [fileChooser] = await Promise.all([
    page.waitForEvent("filechooser"),

    // Opens the file chooser.
    await page.click(
      '[data-test="compute-graph-provider"] :text("Update photo")'
    ),
  ]);
  await fileChooser.setFiles("/root/files/avatar.png");

  // Click the 'Save' button
  await page.click('[data-test="compute-graph-provider"] :text("Save")');

  // Assert Updated information is saved correctly on profile page
  await expect(page.locator(`text=${newName}`)).toBeVisible();
  await expect(page.locator(`text=${newBio}`)).toBeVisible();
  await page.waitForTimeout(2000);

  // REQ Edit Wandb Intro
  // Click the 'Edit intro' button
  await page.click('[data-test="entity-report-section"] button');

  // Update text and links for intro
  const newIntroText =
    "Hello, I'm google and I know all the answers to your questions.";
  await page.fill(
    '[data-test="report-editable-content"][contenteditable="true"]',
    newIntroText
  );
  await page.click(':text("Save")');

  const newLinkTitle = "Google Homepage";
  const newLinkURL = "https://www.google.com/";
  await page.click('[data-test="profile-page-tabs"] :text("Add a link")');
  await page.fill('[placeholder="Link title"]', newLinkTitle);
  await page.fill('[placeholder="http://example.com"]', newLinkURL);
  await page.click('button:has-text("Add link")');

  // Assert Intro is updated correctly and displayed on profile page
  await expect(page.locator(`text=${newIntroText}`)).toBeVisible();
  await expect(page.locator(`text=${newLinkTitle}`)).toBeVisible();
  await expect(page.locator(`text=${newLinkURL}`)).toBeVisible();
  await page.waitForTimeout(2000);

  // clean up - revert Profile name and bio, and change picture
  await page.click(
    '[data-test="compute-graph-provider"] :text("Edit profile")'
  );
  await page.fill(
    '[data-test="compute-graph-provider"] [placeholder="Name"]',
    ogName
  );
  await page.fill(
    '[data-test="compute-graph-provider"] [placeholder="Bio"]',
    ogBio
  );
  await page.hover('[data-test="compute-graph-provider"] .editable-field');
  const [fileChooser] = await Promise.all([
    page.waitForEvent("filechooser"),

    // Opens the file chooser.
    await page.click(
      '[data-test="compute-graph-provider"] :text("Update photo")'
    ),
  ]);
  await fileChooser.setFiles("/root/files/large.jpg");
  await page.click('[data-test="compute-graph-provider"] :text("Save")');

  await expect(page.locator(`text=${ogName}`)).toBeVisible();
  await expect(page.locator(`text=${ogBio}`)).toBeVisible();
  await page.waitForTimeout(2000);

  // clean up - revert Profile intro text and link
  await page.click('[data-test="entity-report-section"] button');
  await page.fill(
    '[data-test="report-editable-content"][contenteditable="true"]',
    ogIntroText
  );
  await page.click(':text("Save")');

  while (
    await page.locator('[data-test="profile-page-tabs"] a .drag-source').count()
  ) {
    await page.click(
      '[data-test="profile-page-tabs"] button:below(:text("Links")) >> nth=0'
    ); // click trash
    await page.waitForTimeout(2000);
  }

  await expect(page.locator(`:text("${ogIntroText}")`)).toBeVisible();
  await expect(
    page.locator('[data-test="profile-page-tabs"] :text("Add a link")')
  ).toBeVisible();
  await page.waitForTimeout(2000);

  // Call uploadReplay helper
  await uploadReplay(page);

  process.exit();
})();
