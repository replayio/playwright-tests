const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Library: Shared video (outside of a team or organization) shows up in the library of the user that is given access";

  // log in to user 11  
  const { page } = await logIn({ userId: 11 });  
  await assertText(page, "Library");  
    
  // assert video from qa8 is in Library  
  await expect(page.locator(":text('Time Travel QA8')")).toBeVisible();  
  

  process.exit();
})();