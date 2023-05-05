const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Repro: cannot comment when logged in with API key";

  // log in
  const { browser } = await launch({});
  const context = await browser.newContext({
    extraHTTPHeaders: {
      Authorization: `Bearer ${process.env.USER_1_API_KEY}`
    }
  });
  const page = await context.newPage();
  await page.goto(buildUrl("/"));
  
  await page.click(".border-gray-200 >> text=sample-folder");
  
  // assert page loaded
  await assertText(page, "sample-folder");
  
  // view comments
  await assertText(page, "Comments");
  await assertText(page, "See error about not being able to open");
  
  // add comment
  await page.click("#video", {timeout: 60000});
  await page.fill('#comment-editor-PENDING [contenteditable="true"]', "This is a test comment");
  await page.press("#comment-editor-PENDING", "Enter");
  
  // prompted to log in

  process.exit();
})();