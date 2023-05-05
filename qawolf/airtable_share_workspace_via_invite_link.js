const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Airtable: Share workspace via invite link";

  // REQ305 Airtable: log in
  const { page, browser } = await logInToAirtable({ permissions: ["clipboard-read", "clipboard-write"]});
  
  
  // REQ459 Airtable: Share workspace
  await page.click("h2:has-text('My First Workspace')");
  await page.click(':text("Share workspace")');
  await page.click('[aria-label="Copy link"]');
  
  // REQ464 Airtable: Shared link prompts user to sign up
  const copiedLink = await page.evaluate(() => {
    return navigator.clipboard.readText();
  });
  const context = await browser.newContext();
  const page2 = await context.newPage();
  await page2.goto(copiedLink);
  await page2.waitForLoadState();
  
  await expect(page2.locator(':text("Test invited you!")')).toBeVisible();
  await expect(page2.locator('text=Start working with Test in My First Workspace.')).toBeVisible();
  await expect(page2.locator('[aria-label="Work email address"]')).toBeVisible();
  await expect(page2.locator('[name="fullName"]')).toBeVisible();
  await expect(page2.locator('[name="password"]')).toBeVisible();
  await expect(page2.locator(':text("Sign up with Google")')).toBeVisible();

  process.exit();
})();