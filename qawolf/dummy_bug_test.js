const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Dummy bug test";

  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://qawolf.com/');
  // 🐺 QA Wolf will create code here

  process.exit();
})();