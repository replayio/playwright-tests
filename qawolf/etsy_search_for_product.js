const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Etsy: Search for Product";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // launch replay browser
  const { browser, context } = await launchReplay();
  const page = await context.newPage();
  
  // nav to site
  await page.goto("https://etsy.com/");
  await expect(page.locator(':text("Popular gifts right now")')).toBeVisible();
  
  // REQ496 Etsy: Search and select suggestion
  await page.click("#global-enhancements-search-query");
  await page.keyboard.type("Y");
  await page.waitForTimeout(1000);
  const suggestion = await page.innerText("li >> nth=0");
  await page.click("li >> nth=0");
  await expect(page.locator(".listing-link >> nth=0")).toBeVisible();
  await page.waitForTimeout(3000); // wait for results
  let listingInnerText = (
    await page.innerText(".listing-link >> nth=0")
  ).toLowerCase();
  expect(listingInnerText).toContain(suggestion);
  
  // REQ497 Etsy: Search unique search terms
  // const searchTerm = "hello world"; // WAs probably too unique there were no matching results
  const searchTerm = "blue";
  
  await page.click(':text("Close search")');
  await page.keyboard.type(searchTerm);
  await page.keyboard.press("Enter");
  await expect(page.locator(".listing-link >> nth=0")).toBeVisible();
  listingInnerText = (
    await page.innerText(".listing-link >> nth=0")
  ).toLowerCase();
  expect(listingInnerText).toContain(searchTerm);
  
  // REQ498 Etsy: Search Trending Search Term
  await page.waitForTimeout(5000);
  const trending = (await page.innerText(".ingress-card >> nth=9"))
    .toLowerCase()
    .replace(searchTerm + " ", "");
  
  await page.click(".ingress-card >> nth=9"); // clicks the fourth suggestion
  await page.waitForTimeout(5000);
  await expect(page.locator(".listing-link >> nth=0")).toBeVisible();
  listingInnerText = (
    await page.innerText(".listing-link >> nth=0")
  ).toLowerCase();
  expect(listingInnerText).toContain(trending);
  
  // list and upload the replay
  await uploadReplay(page);
  
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  shared.suggestion = suggestion;
  shared.listingInnerText = listingInnerText;
  shared.searchTerm = searchTerm;
  shared.trending = trending;
  

  process.exit();
})();