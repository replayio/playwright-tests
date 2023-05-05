const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "[Recorder] Reddit: search for community";

  const { context } = await launch();
  const page = await context.newPage();
  
  // Navigate to www.reddit.com
  await page.goto("https://www.reddit.com");
  
  // Search for a reddit community
  await page.fill("#header-search-bar", "python");
  await page.click('[href="/r/Python/"]');
  
  // View the Community
  await expect(
    page.locator('[data-testid="no-edit-description-block"]')
  ).toHaveText(
    `News about the programming language Python. If you have something to teach others post here.
     If you have questions or are a newbie use r/learnpython`
  );
  

  process.exit();
})();