const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Developer role can filter outline";

  // log in
  const { page } = await logIn({ userId: 10 });
  await assertText(page, 'Library');
  
  // go to recording
  await page.click(':text("Test Permissions")');
  await page.click('text=Time Travel');
  await page.click('text=DevTools');
  await page.waitForTimeout(5000); // give DevTools time to fully load
  
  // assert demo-script.js outline not visible
  const logEntry = page.locator('text=λlog(callback)');
  const preloadImage = page.locator('text=λpreloadImage(url)');
  await expect(logEntry).not.toBeVisible();
  await expect(preloadImage).not.toBeVisible();
  
  // view demo-script.js outline
  await page.click(':text("static.replay.io")');
  await page.click("text=demo");
  await page.click("text=demo-script.js");
  
  // assert outline opened
  await expect(logEntry).toBeVisible();
  await expect(preloadImage).toBeVisible();
  
  // filter outline functions
  await page.fill('[placeholder="Filter functions"]', "preloadImage");
  
  // assert filtering
  await expect(logEntry).not.toBeVisible();
  await expect(preloadImage).toBeVisible();
  
  // reset filter
  await page.fill('[placeholder="Filter functions"]', "");
  
  // assert filter removed
  await expect(logEntry).toBeVisible();
  await expect(preloadImage).toBeVisible();

  process.exit();
})();