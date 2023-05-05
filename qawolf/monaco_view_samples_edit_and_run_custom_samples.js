const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  const TEST_NAME = "Monaco: view samples, edit and run custom samples";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, extractAppAndPageFromUrl, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, extractAppAndPageFromUrl, addEventAddAction } = shared;
  
  // helpers
  const editors = [
    "creating-the-editor-editor-basic-options",
    "creating-the-editor-hard-wrapping",
    "interacting-with-the-editor-adding-a-command-to-an-editor-instance",
    "interacting-with-the-editor-adding-an-action-to-an-editor-instance",
    "interacting-with-the-editor-revealing-a-position",
    "interacting-with-the-editor-rendering-glyphs-in-the-margin",
    "interacting-with-the-editor-line-and-inline-decorations",
    "interacting-with-the-editor-customizing-the-line-numbers",
    "interacting-with-the-editor-listening-to-mouse-events",
    "interacting-with-the-editor-listening-to-key-events",
    "customizing-the-appearence-exposed-colors",
    "customizing-the-appearence-scrollbars",
    "creating-the-diffeditor-hello-diff-world",
    "creating-the-diffeditor-multi-line-example",
    "creating-the-diffeditor-inline-diff-example",
    "creating-the-diffeditor-navigating-a-diff",
  ];
  
  const selectors = {
    tabs: ".tabArea",
    get run() {
      return `${this.tabs} button`;
    },
    tabByText(text) {
      return `${this.tabs} .tab >> :text="${text}"`;
    },
    select: ".form-select >> nth=0",
    runner: "#runner",
    runnerContainer: "#container",
  };
  
  const code =`
  // The Monaco Editor can be easily created, given an
  // empty container and an options literal.
  // Two members of the literal are "value" and "language".
  // The editor takes the full size of its container.
  
  monaco.editor.create(document.getElementById("container"), {
    value: "async function hello() {alert('Hello world!');}",
    language: "javascript"
  })`
  
  const waitForRunner = waitForFrameNavigated(/runner/);
  
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://microsoft.github.io/monaco-editor/playground.html');
  
  // cycle through examples
  for (i=2; i<32; i++) {
    if ( i == 5 ) {
      i++;
    }
    await page.selectOption(selectors.select, `${i}`);
    var frame = await waitForRunner(page);
    await frame.waitForSelector('.monaco-editor');
  };
  
  await page.selectOption(selectors.select, `9`);
  
  // clear input
  await page.click('.monaco-editor');
  
  // seelct all code
  await page.press('.monaco-editor', "Control+a");
  
  // delete code
  await page.press('.monaco-editor', "Backspace");
  
  // add code
  for (let line of code.trim().split("\n")) {
    await page.type('.monaco-editor', line);
  
    // clear any auto-complete dialogs
    await page.press('.monaco-editor textarea.inputarea', "Escape");
    await page.press('.monaco-editor textarea.inputarea', "Enter");
  
    // Clear any auto-inserted content
    await page.press('.monaco-editor textarea.inputarea', "Control+Shift+ArrowRight");
    await page.press('.monaco-editor textarea.inputarea', "Delete");
  
    await page.waitForTimeout(100);
  };
  
  
  
  shared.editors = editors;
  shared.selectors = selectors;
  shared.code = code;
  shared.waitForRunner = waitForRunner;
  shared.context = context;
  shared.page = page;

  process.exit();
})();