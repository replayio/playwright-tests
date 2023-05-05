const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  const TEST_NAME = "User role: unable to edit roles or enable email domain access, able to copy invite link";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, extractAppAndPageFromUrl, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, extractAppAndPageFromUrl, addEventAddAction } = shared;
  
  // log in
  const { browser, page } = await logIn({ userId:  7 });
  await expect(page.locator(':text("Your Library")').first()).toBeVisible();
  
  // go to team settings
  // await page.click('[title="Test Permissions"]');
  await page.click(`:text("Test Permissions")`);
  await page.click("text=settings");
  await page.waitForTimeout(2000); // give settings time to load
  
  // edit self role
  await page.click('[type="button"] >> text=User');
  
  // assert no role options
  await expect(page.locator('text=Leave')).toBeVisible();
  await expect(page.locator('text=Remove')).not.toBeVisible();
  // Only the role dropdown can be programmatically interacted with while open - no option to close
  await page.reload();
  
  // edit developer user
  await page.click("text=Test Permissions");
  await page.click("text=settings");
  await page.waitForSelector("text=Manage members");
  await page.click('text=Developer >> nth=0');
  
  // assert admin user role dropdown didn't open
  await expect(page.locator('text=Leave')).not.toBeVisible();
  await page.reload();
  
  // assert user unable to give access to anyone via email domain
  await page.waitForTimeout(3000);
  await page.click("text=settings >> nth=0");
  await expect(page.locator('text=Give access to anyone with a qawolf.com email address')).not.toBeVisible();
  
  // copy invite link
  await page.click('div:nth-of-type(4) input[type="text"]');
  const copiedLink = await page.evaluate(() => {
    return navigator.clipboard.readText();
  });
  
  // assert link copied
  await assertText(page, 'Copied');
  
  // go to copied link
  const page2 = await browser.newPage();
  await page2.goto(copiedLink);
  
  // assert copiedLink page loaded
  await expect(page2.locator('text=Replay').first()).toBeVisible();
  await expect(page2.locator('button >> text=Sign in with Google')).toBeVisible();
  
  
  shared.browser = browser;
  shared.page = page;
  shared.copiedLink = copiedLink;
  shared.page2 = page2;

  process.exit();
})();