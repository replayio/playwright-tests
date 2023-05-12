const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Solid: add code, increment button";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // launch replay browser
  const { browser, context } = await launchReplay();
  
  // launch page
  // const { context } = await launch();
  const page = await context.newPage();
  await page.goto("https://playground.solidjs.com/");
  
  // assert page loaded
  await assertText(page, "SOLIDJS PLAYGROUND");
  
  // clear code
  await page.click('[role="code"]');
  await page.press('[role="code"]', "Control+a");
  await page.press('[role="code"]', "Backspace");
  
  var code = `
  import { render } from 'solid-js/web';
  import { createSignal } from 'solid-js';
  function Counter({id, defaultCount = 0}: {id: string, defaultCount?: number}) {
  	const [count, setCount] = createSignal(defaultCount);
  	const increment = () => setCount(count() + 1)
  	return (
  		<button type="button" onClick={increment} id={id} style={{margin: '0px 8px'}}>
  			{count()}
  		</button>
  	);
  }
  render(() => (
  	<div>
  		<Counter id="first" />
  		<Counter defaultCount={10} id="second" />
  	</div>
  ), document.getElementById('app'))`;
  
  await page.waitForTimeout(2000); // helps pass
  
  // add code
  for (let line of code.trim().split("\n")) {
    await page.type(".monaco-editor textarea.inputarea", line);
  
    // clear any auto-complete dialogs
    await page.press(".monaco-editor textarea.inputarea", "Escape");
    await page.press(".monaco-editor textarea.inputarea", "Enter");
  
    // Clear any auto-inserted content
    await page.press(
      ".monaco-editor textarea.inputarea",
      "Control+Shift+ArrowRight"
    );
    await page.press(".monaco-editor textarea.inputarea", "Delete");
  
    await page.waitForTimeout(100);
  }
  
  // increment first button
  var frame = await(
    await page.waitForSelector("[title='Solid REPL']")
  ).contentFrame();
  await frame.waitForSelector("#first");
  for (let i of [1, 2, 3, 4, 5]) {
    await frame.click(`#first`, { force: true });
  }
  
  // assert increment for first button
  await assertText(frame, "10", { selector: "#second" });
  
  // increment second button
  await frame.waitForSelector("#second");
  for (let i of [1, 2, 3, 4, 5]) {
    await frame.click(`#second`, { force: true });
  }
  
  // assert increment for second button
  await assertText(frame, "15", { selector: "#second" });
  
  // list and upload the replay
  await uploadReplay(page);
  
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  shared.code = code;
  shared.frame = frame;
  

  process.exit();
})();