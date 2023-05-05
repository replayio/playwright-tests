const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "View hamburger menu on mobile";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, extractAppAndPageFromUrl, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // launch page
  const { context } = await launch({ ...devices["iPhone 8"] });
  const page = await context.newPage();
  await page.goto('https://www.replay.io/');
  
  // assert page looded
  await expect(page.locator('text=The time-travel debugger from the future.')).toBeVisible();
  
  // open menu
  await page.click(".button_md____TNT:above(:text('The time-travel debugger from the future.'))");
  await page.waitForTimeout(1000); // give menu time to open
  
  // find location of each link
  var docsLink = page.locator('.header_menu-inner__zV_GW [href="https://docs.replay.io"]');
  var docsLinkBounds = await docsLink.first().boundingBox();
  var aboutLink = page.locator('.header_menu-inner__zV_GW [href="/about"]');
  var aboutLinkBounds = await docsLink.first().boundingBox();
  var pricingLink = page.locator('.header_menu-inner__zV_GW [href="/pricing"]');
  var pricingLinkBounds = await pricingLink.first().boundingBox();
  var hiringLink = page.locator('.header_menu-inner__zV_GW [href="/about#jobs"]');
  var hiringLinkBounds = await hiringLink.first().boundingBox();
  var loginButton = page.locator('.header_menu-inner__zV_GW [href="https://app.replay.io/"]');
  var loginButtonBounds = await loginButton.first().boundingBox();
  var discordContainer = page.locator('.header_menu-inner__zV_GW [href="/discord"]');
  var discordContainerBounds = await discordContainer.first().boundingBox();
  
  // assert vertical layout
  expect(docsLinkBounds.y).toBeLessThan(pricingLinkBounds.y);
  expect(pricingLinkBounds.y).toBeLessThan(hiringLinkBounds.y);
  expect(hiringLinkBounds.y).toBeGreaterThan(aboutLinkBounds.y);
  expect(aboutLinkBounds.y).toBeLessThan(loginButtonBounds.y);
  expect(loginButtonBounds.y).toBeGreaterThan(discordContainerBounds.y);
  
  
  shared.context = context;
  shared.page = page;
  shared.docsLink = docsLink;
  shared.docsLinkBounds = docsLinkBounds;
  shared.aboutLink = aboutLink;
  shared.aboutLinkBounds = aboutLinkBounds;
  shared.pricingLink = pricingLink;
  shared.pricingLinkBounds = pricingLinkBounds;
  shared.hiringLink = hiringLink;
  shared.hiringLinkBounds = hiringLinkBounds;
  shared.loginButton = loginButton;
  shared.loginButtonBounds = loginButtonBounds;
  shared.discordContainer = discordContainer;
  shared.discordContainerBounds = discordContainerBounds;

  process.exit();
})();