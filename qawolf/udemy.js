const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Udemy";

  // launch page
  const { context } = await launch({slowMo: 100});
  const page = await context.newPage();
  await page.goto('https://udemy.com');
  
  // assert page loaded
  await assertText(page, "A broad selection of courses");
  
  // search courses
  await page.type('[placeholder="Search for anything"]', "JavaScript");
  await page.keyboard.press('Enter');
  await page.waitForTimeout(5000);
  
  // CAPTCHA

  process.exit();
})();