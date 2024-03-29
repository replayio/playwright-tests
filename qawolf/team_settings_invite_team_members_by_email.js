const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Team settings: invite team members by email";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, extractAppAndPageFromUrl, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // log in
  const { browser, page } = await logIn({ userId: 8 });
  await assertText(page, "Your Library");
  
  // go to team settings
  await page.click("text=Test Invite team");
  await page.click("text=settings");
  
  // go to team members
  await page.click("text=Team Members");
  
  // assert team settings loaded
  const h1 = page.locator("main h1");
  const inviteButton = page.locator("form button");
  await expect(h1).toHaveText("Team Members");
  await expect(inviteButton).toHaveText("Invite");
  
  // clear stale replay+VARIABLE invites from different test
  const invites = page.locator(':text("Developer (pending)")');
  while (await invites.count()) {
    await invites.first().hover();
    await page.click(':text("Developer (pending)expand_more")');
    await page.locator(':text("Remove")').click();
    await page.click(':text("Remove them")');
    await page.waitForTimeout(1000);
  }
  
  // try to invite invalid email address
  await page.fill('[placeholder="Email address"]', "invalid");
  await page.click("button:has-text('Invite')");
  
  // assert error message shown
  const errorMessage = page.locator(".text-red-500");
  await expect(errorMessage).toHaveText("Invalid email address");
  
  // invite team member with valid email address
  const { email, waitForMessage } = getInbox({ new: true });
  await page.fill('[placeholder="Email address"]', email);
  await page.click("button:has-text('Invite')");
  
  // assert team member invited via email
  const developerDropdown = page.locator(
    `.expand-dropdown:right-of(:text("${email}")) >> nth=1`
  );
  const invitedEmail = page.locator(`text=${email}`);
  await expect(invites).toHaveCount(1);
  await expect(invitedEmail).toHaveText(email);
  
  // get invite information from email
  const { html, subject, text } = await waitForMessage({
    timeout: 2 * 60 * 1000,
  });
  const inviteUrl = parseInviteUrl({ text });
  assert(html.includes("Test Invite team"));
  assert(subject.includes("Test Invite team"));
  assert(text.includes("QA Wolf has invited you to Test Invite team"));
  
  // accept invite
  const context2 = await browser.newContext();
  const page2 = await context2.newPage();
  await page2.bringToFront();
  await page2.goto(inviteUrl);
  
  // assert taken to accept invite flow
  const page2H1 = page2.locator("h1");
  const page2Paragraph = page2.locator("div p");
  const page2Button = page2.locator('button:has-text("Sign in with Google")');
  await expect(page2H1).toHaveText("Almost there!");
  await expect(page2Paragraph).toHaveText(
    "In order to join your team, we first need you to sign in."
  );
  await expect(page2Button).toBeVisible();
  
  // remove invite
  await page.bringToFront();
  await page.click(`.expand-dropdown:right-of(:text("${email}"))`);
  await page.click("text=Remove");
  
  // confirm remove invite
  const modalH1 = page.locator('[role="dialog"] h1');
  const modalParagraph = page.locator('[role="dialog"] p');
  await expect(modalH1).toHaveText("Remove team member?");
  await expect(modalParagraph).toHaveText(
    `Are you sure you want to remove ${email} from this team?`
  );
  await page.click("text=Remove them");
  await page.waitForTimeout(2000);
  await expect(invitedEmail).not.toBeVisible();
  
  
  
  shared.browser = browser;
  shared.page = page;
  shared.h1 = h1;
  shared.inviteButton = inviteButton;
  shared.invites = invites;
  shared.errorMessage = errorMessage;
  shared.email = email;
  shared.waitForMessage = waitForMessage;
  shared.developerDropdown = developerDropdown;
  shared.invitedEmail = invitedEmail;
  shared.html = html;
  shared.subject = subject;
  shared.text = text;
  shared.inviteUrl = inviteUrl;
  shared.context2 = context2;
  shared.page2 = page2;
  shared.page2H1 = page2H1;
  shared.page2Paragraph = page2Paragraph;
  shared.page2Button = page2Button;
  shared.modalH1 = modalH1;
  shared.modalParagraph = modalParagraph;

  process.exit();
})();