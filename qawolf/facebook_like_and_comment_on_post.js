const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Facebook: like and comment on post";

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
  
  // launch replay browser
  const { browser, context } = await launchReplay();
  
  // log in to Facebook
  // const { page } = await logInToFacebook();
  
  // constants for facebook signup
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email =
    "replay" + "+" + "fb" + faker.random.alphaNumeric(5) + "@qawolf.email";
  const emailId = email.split("+")[1].split("@")[0];
  console.log(emailId);
  console.log(firstName, lastName, email);
  const password = "Password123!";
  
  // sign up for facebook account
  const page = await context.newPage();
  await page.goto("https://www.facebook.com/r.php?locale=en_GB&display=page");
  
  await page.fill('[aria-label="First name"]', firstName);
  await page.fill('[aria-label="Surname"]', lastName);
  await page.click('[aria-label="Mobile number or email address"]');
  await page.keyboard.type(email);
  await page.waitForTimeout(1000);
  await page.click('[aria-label="Re-enter email address"]');
  await page.keyboard.type(email);
  await page.waitForTimeout(1000);
  await page.fill('[aria-label="New password"]', password);
  await page.selectOption("select#year", "1997"); // choose 1999
  await page.click('[name="sex"][value="2"]'); // male
  let after = new Date();
  await page.click('[type="submit"]');
  
  // get email
  const { waitForMessage } = getInbox({ id: emailId });
  const { subject } = await waitForMessage({ after });
  console.log(subject);
  
  // view friend profile
  await page.goto("https://www.facebook.com/profile.php?id=100074229491087");
  await assertText(page, "Mike Algdbbidiajhg Martinazzison");
  
  // ensure post is not liked
  const unlikeButton = await page.$('[aria-label="Remove Like"]');
  if (unlikeButton) unlikeButton.click();
  
  // like post
  await page.click('[aria-label="Like"]');
  await assertElement(page, '[aria-label="Like: 1 person"]');
  
  // unlike post
  await page.click('[aria-label="Remove Like"]');
  await assertElement(page, '[aria-label="Like"]');
  
  // check if previous comment is present, if so, delete it
  var oldComment = await page.$('[aria-label="Edit or delete this"]');
  if (oldComment) {
    await oldComment.click();
    await page.click("[role='menu'] >> text=Delete");
    await assertText(page, "Are you sure");
    await page.click('[aria-label="Delete"][tabindex="0"]');
  }
  
  // comment on post
  const comment = faker.hacker.phrase();
  await page.fill(
    '[aria-posinset="2"] [aria-label="Write a comment…"][contenteditable="true"]',
    comment
  );
  await page.keyboard.press("Enter");
  
  // assert comment saved
  await page.waitForFunction(() => {
    const commentInput = document.querySelector(
      '[aria-posinset="2"] [aria-label="Write a comment…"][contenteditable="true"]'
    );
    return commentInput && commentInput.innerText.length <= 1;
  });
  await assertText(page, comment);
  
  // delete comment on post
  await page.hover(`text=${comment}`);
  await page.click('[aria-label="Edit or delete this"]');
  await page.click("[role='menu'] >> text=Delete");
  await assertText(page, "Are you sure");
  await page.click('[aria-label="Delete"][tabindex="0"]');
  await expect(page.locator(`:text("${comment}")`)).not.toBeVisible();
  
  // list and upload the replay
  await uploadReplay(page);
  
  shared.browser = browser;
  shared.context = context;
  shared.firstName = firstName;
  shared.lastName = lastName;
  shared.email = email;
  shared.emailId = emailId;
  shared.password = password;
  shared.page = page;
  shared.after = after;
  shared.waitForMessage = waitForMessage;
  shared.subject = subject;
  shared.unlikeButton = unlikeButton;
  shared.oldComment = oldComment;
  shared.comment = comment;
  

  process.exit();
})();