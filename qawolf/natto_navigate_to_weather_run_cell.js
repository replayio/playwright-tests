const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Natto: navigate to weather, run cell";

  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://natto.dev/');
  
  // assert page loaded
  await assertText(page, "welcome!");
  
  // hover over menu
  await page.hover("text=natto.dev");
  
  // navigate to weather
  // await page.click("text=weather");
  await page.click(':text("1. tip calculator")');
  
  // assert weather page
  await assertText(page, "1. tip calculator");
  
  // grab iframe
  var frame = await (await page.waitForSelector('#sandbox-iframe')).contentFrame();
  
  // give time for frame to load
  await page.waitForTimeout(5000);
  const runButton = await frame.$('button span:has-text("run")');
  
  // run cell
  await runButton.click();
  
  // assert cell ran
  await assertText(frame, "60");

  process.exit();
})();