const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Show timestamps with user role";

  // log in
  const { page } = await logIn({ userId: 7 });
  await assertText(page, "Library");
  
  // go to recording
  await page.click(':text("Test Permissions")');
  await page.click("text=Permissions: Great Scott");
  
  // assert recording loaded
  await assertText(page, "Great Scott");
  await assertText(page, "DevTools");
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // make sure the filter menu is expanded
  try {
    await expect(
      page.locator('[data-test-id="EventTypeFilterInput"]')
    ).toBeVisible({ timeout: 10 * 1000 });
  } catch {
    await page.click(
      '[data-test-id="ConsoleMenuToggleButton"][title="Open filter menu"]'
    );
    await expect(
      page.locator('[data-test-id="EventTypeFilterInput"]')
    ).toBeVisible();
  }
  
  // assert DevTools loaded
  await assertText(page, "Console");
  await expect(page.locator(`:text("(index)")`)).not.toBeVisible();
  
  // enable timestamps
  const showTimestampsCheckbox = page.locator("#FilterToggle-timestamps");
  const timestamp = page.locator(':text("0:03")');
  if (await timestamp.count()) showTimestampsCheckbox.uncheck();
  await page.waitForTimeout(2000);
  expect(await timestamp.count()).toEqual(0);
  expect(await showTimestampsCheckbox.isChecked()).toBeFalsy();
  await showTimestampsCheckbox.check();
  
  // assert timestamps appeared
  expect(await showTimestampsCheckbox.isChecked()).toBeTruthy();
  await page.waitForTimeout(5000);
  expect(await timestamp.count()).toEqual(6);
  
  // hide timestamps
  await showTimestampsCheckbox.uncheck();
  expect(await showTimestampsCheckbox.isChecked()).not.toBeTruthy();
  expect(await timestamp.count()).toEqual(0);
  

  process.exit();
})();