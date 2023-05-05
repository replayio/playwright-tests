const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "[Scratch] waitForMessage issue";

  const { email, waitForMessage } = getInbox({ id: 'airtable' });
  console.log("EMAIL", email);
  const { subject } = await waitForMessage({ after: new Date('2000') });
  console.log("SUBJECT", subject);

  process.exit();
})();