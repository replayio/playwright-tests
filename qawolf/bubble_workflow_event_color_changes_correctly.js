const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Bubble: Workflow event color changes correctly";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // bubble log in
  const { context, page, browser } = await bubbleLogin();
  
  // navigate to project elementproperties
  const { page2 } = await navigateTo(page, "elementproperties");
  await page2.waitForTimeout(15 * 1000);
  
  // upgrade bubble version
  try {
    await expect(page2.locator("text=Upgrade Bubble Version")).toBeVisible();
    await page2.click(':text("Cancel")');
  } catch {}
  
  // if the activate trial prompt appears
  try {
    await expect(page2.locator("text=Activate my trial")).toBeVisible();
    await page2.click(':text("Cancel")');
  } catch {}
  
  // go into workflow
  // close modal if needed
  try {
    await page2.click(':text("Cancel")');
  } catch {}
  await page2.click(".tabs-2:has-text('Workflow')");
  
  // close modal if needed
  try {
    await page2.click(':text("Cancel")');
  } catch {}
  
  // click on User is logged in event
  await page2.click("text=User is logged in");
  
  // get current event color
  var currentEventColorName = await getValue(
    page2,
    ".composer-dropdown:right-of(:text('Event color'))"
  );
  
  // if the current color is not Gray set it to Gray
  if (currentEventColorName !== "Gray") {
    await page2.click(".composer-dropdown:right-of(:text('Event color'))");
    await page2.click("text=Gray");
  }
  
  // assert event box has Gray color
  await expect(page2.locator(".token-box.grey")).toHaveCSS(
    "background-color",
    "rgb(156, 156, 156)"
  );
  
  // set color to blue
  await page2.click(".composer-dropdown:right-of(:text('Event color'))");
  await page2.click("text=Blue");
  
  // assert color set to blue
  await expect(
    page2.locator(".composer-dropdown:right-of(:text('Event color'))").first()
  ).toHaveText("Blue");
  
  // assert event box has Blue color
  await expect(page2.locator(".token-box.blue")).toHaveCSS(
    "background-color",
    "rgb(121, 186, 230)"
  );
  
  // go to design tab
  await page2.click(".tabs-1:has-text('Design')");
  
  // go to workflow tab
  await page2.click(".tabs-2:has-text('Workflow')");
  
  // reload page2 -> click workflow event
  await page2.reload();
  // if the activate trial prompt appears
  try {
    await expect(page2.locator("text=Activate my trial")).toBeVisible();
    await page2.click(':text("Cancel")');
  } catch {}
  
  await page2.click("text=WhenUser is logged in", { timeout: 60 * 1000 });
  
  // assert event box has Blue color
  await page2.waitForTimeout(7000);
  await expect(page2.locator(".token-box.blue")).toHaveCSS(
    "background-color",
    "rgb(121, 186, 230)",
    { timeout: 40000 }
  );
  
  // upload
  await uploadReplay(page);
  
  
  
  shared.context = context;
  shared.page = page;
  shared.browser = browser;
  shared.page2 = page2;
  shared.currentEventColorName = currentEventColorName;

  process.exit();
})();