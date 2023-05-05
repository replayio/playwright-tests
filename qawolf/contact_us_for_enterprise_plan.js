const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Contact us for enterprise plan";

  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto("https://www.replay.io/pricing");
  
  // assert page loaded
  await assertText(page, "Login");
  
  // navigate to enterprise plan
  await page.click(".plans_tabs__uqDtX button:nth-of-type(4)");
  await page.waitForTimeout(6000);
  var buttonLocator = page.locator("#Enterprise a").nth('0');
  var buttonLink = await buttonLocator.getAttribute('href');
  
  // assert link opens mailto
  assert(buttonLink.includes("mailto:sales@replay.io"));

  process.exit();
})();