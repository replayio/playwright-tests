const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Team settings: invite team members by link";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, extractAppAndPageFromUrl, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // log in
  const { context, page } = await logIn({ userId: 9 });
  await context.grantPermissions(['clipboard-read']);
  await assertText(page, "Your Library");
  
  // go to team settings
  await page.click("text=Test team");
  await page.click("text=settings");
  
  // assert team settings loaded
  await page.click("text=Team Members");
  const h1 = page.locator('main h1');
  const inviteButton = page.locator('form button');
  await expect(h1).toHaveText('Team Members');
  await expect(inviteButton).toHaveText('Invite');
  
  // copy invite link
  await page.click('div:nth-of-type(4) [type="text"]');
  
  // assert link copied
  const copiedLink = await page.evaluate(() => {
    return navigator.clipboard.readText();
  });
  
  // log out and go to invite link
  await context.setExtraHTTPHeaders({});
  await page.goto(copiedLink);
  
  // assert correct page loaded
  await assertText(page, 'Sign');
  await assertText(page, 'in with Google');
  
  // go to log in
  await page.click("button:has-text('Sign in with Google')");
  
  // assert Google log in page loaded
  await assertText(page, 'Sign in with Google');
  await assertText(page, 'to continue to Replay');
  
  
  shared.context = context;
  shared.page = page;
  shared.h1 = h1;
  shared.inviteButton = inviteButton;
  shared.copiedLink = copiedLink;

  process.exit();
})();