const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "What's my user agent?: view user agent";

  // launch replay browser
  const { browser, context } = await launchReplay();
  
  // launch page
  // const { context } = await launch();
  const page = await context.newPage();
  await page.goto("http://whatsmyuseragent.org/");
  
  // assert page load
  await assertText(page, "My IP Address");
  
  // list and upload the replay
  await uploadReplay();

  process.exit();
})();