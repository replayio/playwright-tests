const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "My Test 3";

  // log in
  const { browser, page } = await logIn({ userId: 2 });
  await assertText(page, "Your Library");

  process.exit();
})();