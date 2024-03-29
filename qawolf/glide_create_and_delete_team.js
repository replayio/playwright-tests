const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Glide: Create and Delete Team";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  // Open Replay Browser
  const { browser, context } = await launchReplay({ slowMo: 1000 });
  
  // Navigate to https://www.glideapps.com/
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
  console.log(subject, urls);
  const url = urls[10];
  console.log(urls[10]);
  
  // Sign in with link sent to email
  await page2.goto(url);
  
  // Assert Able to log into Glide with Replay Browser
  await expect(page2.locator("text=QA Wolf Replay")).toBeVisible();
  
  const teamName = "Certified QA Lovers";
  
  // clean up if teamName already exists
  try {
    await expect(page2.locator(`text=${teamName} >> nth=0`)).not.toBeVisible();
  } catch {
    // Click on team to delete
    await page2.click(`text=${teamName} >> nth=0`);
  
    // Click the 'Billing' button on side navigation
    await page2.click('[data-testid="billing-link"]');
  
    // Click the 'Delete team' option
    await page2.click('[data-testid="button-normal"]:has-text("Delete team")');
  
    // Type 'delete [teamName] forever' in confirmation prompt
    await page2.fill('[type="text"]', `delete ${teamName} forever`);
  
    // Click the 'Delete' button in confirmation prompt
    await page2.click('[data-testid="button-normal"][label="Delete"]');
  
    // Assert Team is deleted successfully
    await expect(page2.locator(`text=${teamName} >> nth=0`)).not.toBeVisible();
  }
  
  // REQ Create Glide team
  // Click on the 'New team...' button
  await page2.click(':text("New team…")');
  
  // Fill the 'Team Name' with new team name
  await page2.fill('[placeholder=""]', teamName);
  
  // Select Company Size
  await page2.click('[data-testid="glide-dropdown-button"]');
  await page2.click('[data-testid="51-200 employees"]');
  
  // Click the 'Continue' button
  await page2.click(':text("Continue")');
  
  // Click the 'skip' button for adding members modal
  await page2.click(':text("Skip")');
  
  // Assert New team is created successfully
  await expect(page2.locator(`text=${teamName} >> nth=0`)).toBeVisible();
  
  // REQ Delete GLide team
  // Click on team to delete
  await page2.click(`text=${teamName} >> nth=0`);
  
  // Click the 'Billing' button on side navigation
  await page2.click('[data-testid="billing-link"]');
  
  // Click the 'Delete team' option
  await page2.click('[data-testid="button-normal"]:has-text("Delete team")');
  
  // Type 'delete [teamName] forever' in confirmation prompt
  await page2.fill('[type="text"]', `delete ${teamName} forever`);
  
  // Click the 'Delete' button in confirmation prompt
  await page2.click('[data-testid="button-normal"][label="Delete"]');
  
  // Assert Team is deleted successfully
  await expect(page2.locator(`text=${teamName} >> nth=0`)).not.toBeVisible();
  
  // Call uploadReplay helper
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
  shared.teamName = teamName;
  

  process.exit();
})();