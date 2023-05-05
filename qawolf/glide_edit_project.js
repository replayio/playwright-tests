const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Glide: Edit Project";

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
  
  // Open Replay Browser
  const { browser, context } = await launchReplay({
    slowMo: 1000,
    permissions: ["clipboard-read", "clipboard-write"],
  });
  
  // Navigate to glideƒ
  const page = await context.newPage();
  await page.goto("https://www.glideapps.com/");
  
  // REQ Log into Glide
  // Click the 'Log in' button
  const [page2] = await Promise.all([
    context.waitForEvent("page"),
    page.locator(':text("Log In")').click(), // Opens a new tab
  ]);
  await page2.waitForLoadState();
  
  // Fill the Email input with GLIDE_EMAIL
  await page2.fill('[placeholder="you@example.com"]', process.env.GLIDE_EMAIL);
  
  // Click the 'Sign in with Email' button
  let after = new Date();
  await page2.click(':text("Sign in with Email")');
  const { waitForMessage } = getInbox({ id: "glide" });
  const { subject, urls, text } = await waitForMessage({ after });
  const url = urls[10];
  
  // Sign in with link sent to email
  await page2.goto(url);
  
  // Assert Able to log into Glide with Replay Browser
  await expect(page2.locator("text=QA Wolf Replay")).toBeVisible();
  const projectName = "Project to Edit";
  
  // clean up if projectName already exists
  try {
    await expect(page2.locator(`text=${projectName} >> nth=0`)).not.toBeVisible();
  } catch {
    // Hover over project
    await page2.hover('[name="Project to Edit"]');
  
    // Click on the kebab icon
    await page2.click('[name="Project to Edit"] button');
  
    // Click the 'Delete' button
    await page2.click('[data-testid="Delete"]');
  
    // Type project name in the confirmation prompt
    await page2.fill('[type="text"]', `delete ${projectName} forever`);
  
    // Click the 'Delete' button on the confirmation prompt
    await page2.click('[data-testid="button-normal"]:has-text("Delete")');
  
    // Assert Project is deleted successfully
    await expect(page2.locator(`text=${projectName} >> nth=0`)).not.toBeVisible();
  }
  
  // create project
  // Click the 'New project' button
  await page2.click('[name="New project"]');
  
  // Fill in project name
  await page2.fill('[placeholder="Project name"]', projectName);
  
  // Select template for the project
  await page2.click(':text("Large screen")');
  
  // Click COntinue
  await page2.click('[data-testid="button-normal"]:has-text("Continue")');
  
  // Select a source (GLide Tabled)
  await page2.click('[src="/images/glide-icon.svg"]');
  
  // CLick Create PRoject button
  await page2.click('[data-testid="button-normal"]:has-text("Create Project")');
  
  // Assert Able to create project
  await expect(page2.locator(`text=${projectName} >> nth=0`)).toBeVisible();
  
  // Click the 'Publish' button
  await page2.click('[data-testid="button-normal"]:has-text("Publish")');
  
  // Click the 'Publish' button on modal
  await page2.click('#portal [data-testid="button-normal"]:has-text("Publish")');
  
  // Assert Able to publish project
  await expect(
    page2.locator('[data-testid="button-normal"]:has-text("Copy app link")')
  ).toBeVisible();
  
  // Project must have Publish and no sign-in settings in Privacy
  await page2.click(':text("PrivacyPrivacy")');
  await page2.click(':text("PublicAnyone with the link can access")');
  await page2.click(':text("No sign-inUsers do not have profiles")');
  await page2.waitForTimeout(2000);
  await page2.click('[data-cy="back-to-apps"]');
  
  // Act:
  // Hover over project
  await page2.locator(':text("Project to Edit")').hover();
  
  // Click the kebab icon
  await page2.click('[name="Project to Edit"] button');
  
  // Click the 'Edit' option
  await page2.click('[data-testid="Edit"]');
  
  // Click the '+' button near Components
  await page2.click('[data-test="builder-wrapper"] .accent');
  
  // Select a component
  await page2.click('[data-test="builder-wrapper"] .list-component-btn');
  
  // Click the 'Share' button
  await page2.click('[data-testid="button-normal"]');
  
  // Copy app link
  await page2.click('[data-testid="button-normal"]:has-text("Copy app link")');
  const copiedLink = await page.evaluate(() => {
    return navigator.clipboard.readText();
  });
  
  // Open application
  const page3 = await context.newPage();
  await page3.goto(copiedLink);
  
  // Assert:
  // Project changes are saved successfully and displayed on live site
  await expect(page3.locator('h1 :text("Project to Edit")')).toBeVisible();
  await expect(
    page3.locator('[class*="card-collection-list"] >> nth = 0')
  ).toBeVisible();
  
  // // upload replay
  await uploadReplay(page);
  
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  shared.page2 = page2;
  shared.after = after;
  shared.waitForMessage = waitForMessage;
  shared.subject = subject;
  shared.urls = urls;
  shared.text = text;
  shared.url = url;
  shared.projectName = projectName;
  shared.copiedLink = copiedLink;
  shared.page3 = page3;
  

  process.exit();
})();