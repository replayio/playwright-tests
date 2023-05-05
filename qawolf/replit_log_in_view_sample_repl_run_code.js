const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Replit: log in, view sample REPL, run code";

  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://replit.com/site/pricing');
  
  //replay+replit@qawolf.email
  await page.click("text=Log in");
  await page.click('[aria-label="input"]');
  await page.type('[aria-label="input"]', "replay+replit1@qawolf.email", {delay:100});
  await page.type('[name="password"]', process.env.DEFAULT_PASSWORD.toString(), {delay: 100});
  await page.keyboard.press('Enter');
  
  // CAPTCHA

  process.exit();
})();