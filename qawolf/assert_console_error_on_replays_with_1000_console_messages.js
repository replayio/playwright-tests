const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Assert console error on Replays with 1000+ console messages";

  // log in and go to replay
  const { page } = await logIn({ userId: 10 });
  
  // go to replay with many logs
  await page.click("text=Replay with many logs");
  await expect(page.locator("#video")).toBeVisible();
  
  // assert replay loaded
  await assertText(page, "Replay with many logs");
  await assertElement(page, "#app-container .view-toggle");
  
  // open script.js
  await page.click("text=ViewerDevTools");
  await assertElement(page, "text=script.js");
  await page.click("text=script.js");
  
  // assert script.js opened
  await assertElement(page, "text=console.log(i);");
  
  // assert error message
  await page.hover('[data-test-id="SourceLine-24"] :text("console")');
  
  // assert console error
  const consoleError = page.locator(
    "text=There are too many console messages so not all are being displayed"
  );
  await expect(consoleError).toHaveCount(1);
  

  process.exit();
})();