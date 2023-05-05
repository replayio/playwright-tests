const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Team settings: give access to anyone with email domain";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, extractAppAndPageFromUrl, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // log in
  const { browser, context, page } = await logIn({ userId: 2 });
  await context.grantPermissions(["clipboard-read"]);
  await assertText(page, "Your Library");
  page.on("dialog", async (dialog) => {
    await dialog.accept();
  });
  
  // go to team settings
  await page.click("text=Test Invite Team");
  await page.click("text=settings");
  
  // go to team members
  await page.click("text=Team Members");
  await page.waitForSelector("text=Invite link");
  const buttonToCheck = page.locator("#domain-limited");
  
  // ensure member deleted
  const lauraInvite = page.locator("text=Laura Cressman");
  if (await lauraInvite.isVisible()) {
    await page.click('button:right-of(:text("Laura Cressman"))');
    await page.click("text=Remove");
    await page.waitForTimeout(3000);
  }
  
  // ensure checkbox not checked
  try {
    expect(await buttonToCheck.isChecked()).toBeFalsy();
  } catch (e) {
    await page.click("#domain-limited");
    await page.waitForTimeout(3000);
  }
  
  // give access to anyone with qawolf.com email address
  await page.waitForTimeout(2000);
  await page.click('#domain-limited[type="checkbox"]');
  await page.waitForTimeout(2000);
  
  // assert checked
  expect(await buttonToCheck.isChecked()).toBeTruthy();
  
  // copy invite link
  await page.click('div:nth-of-type(4) [type="text"]');
  
  // assert link copied
  const copiedLink = await page.evaluate(() => {
    return navigator.clipboard.readText();
  });
  
  // go to invite link
  const context2 = await browser.newContext();
  await context2.setExtraHTTPHeaders({
    Authorization: `Bearer ${process.env.USER_1_API_KEY}`,
  });
  const page2 = await context2.newPage();
  await page2.bringToFront();
  await page2.goto(copiedLink);
  
  // assert new team added to user 1
  await assertText(page2, "Test Invite Team");
  await assertText(page2, "New");
  
  // accept invitation
  await page2.click("text=Test Invite Team");
  await page2.click("text=Accept");
  await page.waitForTimeout(2000);
  
  // assert team added
  await page2.click("text=Test Invite Team");
  await page2.click("text=settings");
  await page2.click("text=Team Members");
  await assertText(page2, "QA Wolf");
  
  // assert new member added
  await page.bringToFront();
  await expect(lauraInvite).toBeVisible();
  
  // leave team
  await page2.bringToFront();
  page2.on("dialog", async (dialog) => {
    await dialog.accept();
  });
  await page.waitForTimeout(2000);
  await page2.click('button:right-of(:text("Laura Cressman"))');
  await page2.click("text=Leave");
  
  // assert team removed from account
  await assertNotText(page2, "Test Invite Team");
  await page.bringToFront();
  await expect(lauraInvite).not.toBeVisible();
  
  // uncheck checkbox
  await page.click("#domain-limited");
  await page.waitForTimeout(2000);
  
  // assert checkbox not checked
  expect(await buttonToCheck.isChecked()).toBeFalsy();
  
  
  
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  shared.buttonToCheck = buttonToCheck;
  shared.lauraInvite = lauraInvite;
  shared.copiedLink = copiedLink;
  shared.context2 = context2;
  shared.page2 = page2;

  process.exit();
})();