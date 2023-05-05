const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "fin";

  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://finviz.com/');
  
  // assert page loaded
  await assertText(page, "Login");
  
  // navigate to maps page
  await page.click("text=Maps");
  
  // click Google box
  

  process.exit();
})();