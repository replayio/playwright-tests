const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Lit: view component, click button, view example preview, clear input";

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
  
  // navigate to page
  // launch replay browser
  const { browser, context } = await launchReplay();
  // const { context } = await launch();
  const page = await context.newPage();
  await page.goto("https://lit.dev/playground/");
  
  // helpers
  const selectors = {
    drawer: {
      root: "litdev-drawer",
      sampleByPath(path) {
        return `${this.root} li[data-sample *= "${path}"]`;
      },
    },
  };
  
  // navigate to full component
  await page.click(selectors.drawer.sampleByPath("examples/full-component"));
  
  // grab preview frame and button
  var frame = await(
    await page.waitForSelector('[title="Project preview"]', {
      timeout: 120 * 1000,
    })
  ).contentFrame();
  const buttonText = await frame.$("my-element >> span.planet");
  
  // assert button text
  assert((await buttonText.innerText()) === "World");
  
  // change button text
  await frame.click("my-element:not(.mars)");
  
  // assert button text
  assert((await buttonText.innerText()) === "Mars");
  
  // navigate to slotting children
  await page.click(selectors.drawer.sampleByPath("examples/slotting-children"));
  
  // wait for frame to load
  await page.waitForTimeout(5 * 1000);
  
  // grab preview frame and results
  var frame = await(
    await page.waitForSelector('[title="Project preview"]')
  ).contentFrame();
  const resultsText = await frame.$("p");
  
  // assert results text
  assert(
    (await resultsText.innerText()) === "Use the slot element to render children"
  );
  
  // navigate to ifDefined directive
  await page.click(
    selectors.drawer.sampleByPath("examples/directive-if-defined")
  );
  
  // wait for frame to load
  await page.waitForTimeout(5 * 1000);
  
  // grab preview frame
  var frame = await(
    await page.waitForSelector('[title="Project preview"]')
  ).contentFrame();
  
  // assert input already has beach
  await assertText(frame, "beach", { selector: "#name" });
  
  // clear input
  await frame.fill("#name", "");
  
  // assert input has been cleared
  await assertText(frame, "", { selector: "#name" });
  
  // list and upload the replay
  await uploadReplay(page);
  
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  shared.selectors = selectors;
  shared.frame = frame;
  shared.buttonText = buttonText;
  shared.frame = frame;
  shared.resultsText = resultsText;
  shared.frame = frame;
  

  process.exit();
})();