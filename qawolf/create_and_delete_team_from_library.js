const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  const TEST_NAME = "Create and delete team from library";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, extractAppAndPageFromUrl, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, extractAppAndPageFromUrl, addEventAddAction } = shared;
  
  // log in
  const { browser, page } = await logIn({ userId: 3 });
  await assertText(page, "Your Library");
  
  // ensure test team deleted
  const testTeamLink = await page.$("text=Test Team:");
  if (testTeamLink) {
    await testTeamLink.click();
    await page.click("text=settings");
    await deleteTeam({ page });
  }
  
  // create new team
  await page.click("text=Create new team");
  await assertText(page, "Team name");
  
  // enter team name
  const teamName = `Test Team: ${Date.now()}`;
  await page.fill('.space-y-3 [type="text"]', teamName);
  await page.click("text=Next");
  
  // assert taken to invite modal
  await assertText(page, "Invite team members");
  
  // try to invite invalid email address
  await page.fill('[placeholder="Email address"]', "invalid");
  await page.click("button:has-text('Invite')");
  
  // assert error message shown
  await assertText(page, "Invalid email address");
  
  // invite team member with valid email address
  const { email, waitForMessage } = getInbox({ new: true });
  await page.fill('[placeholder="Email address"]', email);
  await page.click("button:has-text('Invite')");
  
  // assert team member invited via email
  await assertText(page, "Developer (pending)");
  await assertText(page, email);
  
  // continue team creation
  await page.click("text=Next");
  
  // assert team setup complete
  await assertText(page, "Team setup complete");
  await assertText(page, "Your new team is ready.");
  
  // go to new team
  await page.click("text=Take me to my team");
  const newTeamLibrary = page.locator(`span >> text=${teamName}`);
  await expect(newTeamLibrary).toHaveCount(1);
  await assertText(page, `${teamName}`);
  
  // get invite information from email
  const { html, subject, text } = await waitForMessage({ timeout: 5 * 60000 });
  const inviteUrl = parseInviteUrl({ text });
  assert(html.includes(teamName));
  assert(subject.includes(teamName));
  assert(text.includes(`QA 2 Team has invited you to ${teamName}`));
  
  // accept invite
  const context2 = await browser.newContext();
  const page2 = await context2.newPage();
  await page2.bringToFront();
  await page2.goto(inviteUrl);
  console.log(inviteUrl);
  // assert taken to accept invite flow
  await assertText(page2, "Almost there!");
  await assertText(
    page2,
    "In order to join your team, we first need you to sign in."
  );
  await assertText(page2, "Sign in with Google");
  
  // open team settings
  await page.bringToFront();
  await page.click(`:text("${teamName}")`);
  await page.click("text=settings");
  await assertText(page, "Team Members");
  
  // remove invite
  // await page.hover("text=Developer (pending)");
  // await page.click(".expand-dropdown");
  await page.click(':text("Developer (pending)expand_more")');
  await page.click("text=Remove");
  
  // confirm remove invite
  await assertText(page, "Remove team member?");
  await assertText(page, `Are you sure you want to remove ${email}`);
  await page.click("text=Remove them");
  await page.waitForTimeout(2000);
  await expect(page.locator(`:text("${email}")`)).not.toBeVisible();
  
  // delete team
  await deleteTeam({ page });
  
  // assert team deleted
  await page.waitForTimeout(2000);
  await expect(page.locator(`:text("${teamName}")`)).not.toBeVisible();
  
  
  
  shared.browser = browser;
  shared.page = page;
  shared.testTeamLink = testTeamLink;
  shared.teamName = teamName;
  shared.email = email;
  shared.waitForMessage = waitForMessage;
  shared.newTeamLibrary = newTeamLibrary;
  shared.html = html;
  shared.subject = subject;
  shared.text = text;
  shared.inviteUrl = inviteUrl;
  shared.context2 = context2;
  shared.page2 = page2;

  process.exit();
})();