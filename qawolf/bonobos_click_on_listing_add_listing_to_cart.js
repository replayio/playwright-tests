const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  const TEST_NAME = "Bonobos: click on listing, add listing to cart";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, extractAppAndPageFromUrl, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, extractAppAndPageFromUrl, addEventAddAction } = shared;
  
  // "This page needs some tailoring..."
  
  // launch replay browser
  const { browser, context } = await launchReplay();
  
  // launch page
  const page = await context.newPage();
  await page.goto("https://bonobos.com/");
  
  // assert page loaded
  await assertText(page, "Sign In");
  
  // navigate to products
  await page.hover("text=Accessories");
  await page.click("text=Socks");
  
  // close modal pop up
  try{
    await page.waitForSelector('[aria-label="Close the Dialog Window"]');
    await page.click('[aria-label="Close the Dialog Window"]');
  } catch {}
  
  // select product
  await page.click(".product-tile-component", "nth=0");
  
  // get product title
  var productTitle = await getValue(page, ".summary-component h1");
  
  // add to cart
  await page.click('[aria-label="Add product to your shopping cart"]');
  
  // assert product added to cart
  await expect(
    page.locator(`[aria-label="${productTitle} thumbnail"]`)
  ).toBeVisible();
  await assertText(page, productTitle, { selector: ".line-item-component" })
  
  // list and upload the replay
  await uploadReplay(page);
  
  
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  shared.productTitle = productTitle;

  process.exit();
})();