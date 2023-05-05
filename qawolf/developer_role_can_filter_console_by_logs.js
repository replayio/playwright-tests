const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Developer role can filter console by logs";

  // log in
  const { page } = await logIn({ userId: 10 });
  await assertText(page, "Library");
  
  // go to recording
  await page.click(':text("Test Permissions")');
  await page.click('[href="/recording/time-travel--ebf103b3-9b40-4d5b-a9f3-e0c8fe3d4bd5"]');
  
  // assert recording loaded
  await assertText(page, "DevTools");
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await assertText(page, "Console");
  await expect(page.locator('[data-test-name="Messages"]')).toContainText(
    "Welcome to Replay"
  );
  
  // filter console by logs
  await page.click('[data-test-state="closed"]');
  
  // hide errors
  await page.uncheck('[data-test-id="FilterToggle-errors"] #FilterToggle-errors');
  await expect(
    page.locator('[data-test-id="FilterToggle-errors"] #FilterToggle-errors')
  ).not.toBeChecked();
  
  // get message count
  const messagesCount1 = await page.locator('[data-test-name="Message"]').count();
  
  // hide logs
  await page.uncheck("#FilterToggle-logs");
  
  // get message count
  const messagesCount2 = await page.locator('[data-test-name="Message"]').count();
  
  // assert logs hid
  await expect(messagesCount1).not.toEqual(messagesCount2);
  expect(messagesCount2).toEqual(0);
  
  // show logs
  await page.check("#FilterToggle-logs");
  
  // get message count
  const messagesCount3 = await page.locator('[data-test-name="Message"]').count();
  
  // assert logs appeared
  expect(messagesCount1).toEqual(messagesCount3);
  

  process.exit();
})();