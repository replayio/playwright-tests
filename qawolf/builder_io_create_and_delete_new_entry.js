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
  // launch replay browser
  const { browser, context } = await launchReplay();
  const page = await context.newPage();

  // Navigate to https://builder.io/login
  await page.goto("https://builder.io/login");

  // REQ Log into Builder.io
  // Fill the Work Email input with BUILDERIO_EMAIL
  await page.fill(
    '[data-test-id="login-email-input"] [placeholder="stephanie@mycompany.com"]',
    "jabersami+replay@gmail.com"
  );

  // Fill the Password input with BUILDERIO_PASSWORD
  await page.fill(
    '[data-test-id="login-password-input"] [placeholder="••••••••••"]',
    "v2ajdbguH23XUnLR"
  );

  // Click the 'Submit' button
  await page.click('[data-test-id="login-submit-button"]');

  // Assert Able to log into builder.io
  await expect(
    page.locator(
      '[src="https://cdn.builder.io/static/media/builder-logo.bff0faae.png"]'
    )
  ).toBeVisible();

  // Navigate to existing space
  await page.click(
    '[data-test-id="router-container"] :text("Sami Jaber Space")'
  );
  await page.waitForTimeout(2000);
  await page.hover(
    '[src="https://cdn.builder.io/static/media/builder-logo.bff0faae.png"]'
  );
  await page.click(':text("Content")');

  // REQ Create Builder.io Entry
  // Click the 'Create New Entry' button
  await page.click('[data-test-id="router-container"] :text("+ New")');

  // Select a model 'Page'
  await page.click('[data-test-id="router-container"] :text("Page")');

  // Fill the 'Name' input of model
  const pageName = Date.now() + " " + faker.random.words(2);
  console.log(pageName);
  await page.fill('form [type="text"]', pageName);

  // Click the 'Create Page' button
  await page.click('[type="submit"]');

  // Select a template
  await page.click('[title="Gift guide"]');

  // Assert Entry is created successfully with selected template and name
  await expect(
    page.locator(
      '[data-test-id="content-entry-name-input"] [placeholder="Content Entry Name"]'
    )
  ).toHaveValue(`${pageName}`);

  // REQ Publish Builder.io Entry
  // Click the 'Publish' button
  await page.click('[data-test-id="router-container"] :text("Publish")');

  // Assert Publish button disappears with 'Published!' message
  await expect(
    page.locator(
      '[data-test-id="router-container"] div:nth-of-type(5) >> nth=0'
    )
  ).toHaveText("Published");

  // list and upload the replay
  await uploadReplay(page);

  process.exit();
})();
