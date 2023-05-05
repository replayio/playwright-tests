const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Library: Owners own video appears in library";

  // log in
  const { page } = await logIn({ userId: 10 });
  await assertText(page, "Library");
  
  // assert users own video appears in library
  await expect(
    page.locator("text=Log in and out (PR deployment) - Replay - QA Wolf")
  ).toBeVisible();
  

  process.exit();
})();