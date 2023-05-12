const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Asana: Add & Remove New User";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // email for new user that will be added
  const { email, waitForMessage } = getInbox({ new: true });
  console.log(email);
  
  // nav to asana landing page
  const { context, browser } = await launchReplay({ slowMo: 1000 });
  const page = await context.newPage();
  await page.goto("https://app.asana.com/-/login");
  
  // login
  await page.fill(".LoginEmailForm-emailInput", process.env.ASANA_EMAIL);
  await page.click(".LoginEmailForm-continueButton");
  await page.fill('[type="password"]', process.env.ASANA_PASSWORD);
  let after = new Date();
  await page.click(".LoginPasswordForm-loginButton");
  
  try {
    // assert dashboard
    await expect(page.locator(':text("Good evening, QA"), :text("Good afternoon, QA"), :text("Good morning, QA")')).toBeVisible();
  } catch {
    // if can't log in, need to go to log in link from email
    const { waitForMessage } = getInbox({ id: "asana1" });
    const { urls } = await waitForMessage({ after });
    console.log(urls[1]); // log in link
  
    await page.goto(urls[1]);
    await page.click(".LoginConfirmView-logInButton"); // click Log in
    await expect(page.locator(':text("Good evening, QA"), :text("Good afternoon, QA"), :text("Good morning, QA")')).toBeVisible();
  }
  await page.waitForTimeout(3000);
  
  // add new user
  await page.click(':text("Create")');
  await page.click(".UserPlusIcon");
  await page.click("form");
  await page.keyboard.type(email);
  await page.waitForTimeout(3000);
  await page.click('[role="option"]', { force: true });
  await page.click(`.PrimaryButton:has-text("Send") >> nth=0`);
  
  // Asana seems to have error when inviting a member
  try {
    // assert member
    await page.waitForTimeout(5000);
    await page.click(`:text("QA's First Team")`);
    await page.click(':text("Manage members")');
    await expect(page.locator(`text=${email}`)).toHaveCount(3);
  } catch {
    // add new user
    await page.click('[placeholder="Add team members by name or email…"]');
    await page.keyboard.type(email);
    await page.waitForTimeout(3000);
    await page.click('[role="option"]', { force: true });
    await page.click(`.PrimaryButton:has-text("Send") >> nth=0`);
  
    // assert member
    await page.waitForTimeout(5000);
    await page.mouse.click(0,0);
    await page.click(`:text("QA's First Team")`);
    await page.click(':text("Manage members")');
    await expect(page.locator(`text=${email}`)).toHaveCount(3);
  }
  
  // remove member
  // await page.hover(`:text('${email}') >> nth=1`);
  await page.click(`[aria-label="Cancel invite"]:right-of(:text("${email}"))`);
  await page.click(':text("Remove Access")');
  await page.click('[aria-label="Close this dialog"]');
  
  // assert memeber deleted
  await page.click(':text("Manage members")');
  await expect(page.locator(`text=${email}`)).toHaveCount(0);
  
  // upload replay
  await uploadReplay(page);
  
  shared.email = email;
  shared.waitForMessage = waitForMessage;
  shared.page = page;
  shared.browser = browser;
  

  process.exit();
})();