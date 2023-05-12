const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "React-window: select examples in list";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // launch replay browser
  const { browser, context } = await launchReplay();
  
  // launch page
  // const { context } = await launch();
  const page = await context.newPage();
  await page.goto(
    "https://react-window.vercel.app/#/examples/list/memoized-list-items"
  );
  
  // assert page loaded
  await assertText(page, "react-window");
  
  // navigate to example
  await page.click("text=Fixed Size List");
  
  // assert on fixed size list
  await assertText(page, "import { FixedSizeList as List } from 'react-window';");
  
  // navigate to example
  await page.click("text=Variable Size List");
  
  // assert on variable size list
  await assertText(
    page,
    "import { VariableSizeList as List } from 'react-window';"
  );
  
  // navigate to example
  await page.click("text=Fixed Size Grid");
  
  // assert on fixed size grid
  await assertText(page, "import { FixedSizeGrid as Grid } from 'react-window';");
  
  // navigate to example
  await page.click("text=Variable Size Grid");
  
  // assert on variable size grid
  await assertText(
    page,
    "import { VariableSizeGrid as Grid } from 'react-window';"
  );
  
  // navigate to example
  await page.click("text=Scrolling indicators");
  
  // assert on scrolling indicators
  await assertText(page, " {isScrolling ? 'Scrolling' : `Row ${index}`}");
  
  // navigate to example
  await page.click("text=Scrolling to an item");
  
  // assert on scrolling to an item
  await assertText(
    page,
    "// The List will scroll as little as possible to ensure the item is visible."
  );
  
  // navigate to example
  await page.click("text=Memoized List items");
  
  // assert on memoized list items
  await assertText(page, "import memoize from 'memoize-one';");
  
  // navigate to example
  await page.click("text=RTL layout");
  
  // assert on RTL layout
  await assertText(page, "<div style={style}>عمود {index}</div>");
  
  // list and upload the replay
  await uploadReplay(page);
  
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  

  process.exit();
})();