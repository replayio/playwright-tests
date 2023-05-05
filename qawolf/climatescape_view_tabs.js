const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Climatescape: view tabs";

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
  const page = await context.newPage();
  await page.goto("https://climatescape.org/");
  
  // navigate to organizations
  await page.click("text=Organizations");
  
  // assert on organizations page
  await assertText(page, "All Organizations");
  
  // navigate to buildings & cities
  await page.click('[href="/categories/buildings-and-cities"]');
  
  // assert on buildings & cities page
  await assertText(page, "Buildings & Cities", { selector: "h2" });
  
  // filter location
  await page.click("text=HQ Location");
  await page.click("text='Australia'");
  
  // assert filtered location
  await expect(page.locator(':text("Smappee")')).not.toBeVisible();
  await expect(page.locator(':text("CIM")')).toBeVisible();
  
  // navigate to compnay page
  await page.click("text=/.*It uses the Internet of Things.*/");
  
  // assert navigate to compnay page
  await assertText(
    page,
    "Developer of a machine learning platform designed to improve building performance."
  );
  assert(page.url() === "https://climatescape.org/organizations/cim");
  
  // navigate to energy efficiency
  await page.click("text=Energy Efficiency");
  
  // assert on energy efficiency page
  await assertText(page, "Energy Efficiency", { selector: "h2" });
  
  // list and upload the replay
  await uploadReplay(page);
  
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  

  process.exit();
})();