const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Asana: Add & Remove Goal";

  // login
  const { page } = await logInToAsana(process.env.ASANA_EMAIL, process.env.ASANA_PASSWORD);
  
  // navigate to goals
  await page.click(':text("Goals")');
  await page.waitForTimeout(2000);
  
  // clean test
  while (await page.locator("text=QA Goal").count()) {
    await page.click(`:text("QA Goal")`);
    await expect(page.locator(`text=QA Goal`).first()).toBeVisible({ timeout: 60000 });
    await page.click('[aria-label="Show options"]');
    await page.waitForTimeout(500);
    await page.click(':text("Delete goal")');
    await page.click(':text("Delete goal")');
    await page.waitForTimeout(500);
    await page.click('[aria-label="Close this notification"]');
    await page.waitForTimeout(500);
  }
  
  // add goal
  await expect(page.locator(':text("Add Goal")')).toBeVisible();
  await page.click(':text("Add Goal")');
  const goalName = `QA Goal ` + Date.now().toString().slice(-4);
  await page.fill('[placeholder="Enter goal name"]', goalName);
  await page.click(':text("Save goal")');
  
  // assert goal
  await expect(page.locator('[role="alert"]')).toBeVisible();
  await page.click('[aria-label="Close this notification"]');
  await page.waitForTimeout(2000);
  await expect(page.locator(`text=${goalName}`)).toBeVisible({ timeout: 60000 });
  
  // delete goal
  await page.click(`:text("${goalName}")`);
  await expect(page.locator(`text=${goalName}`).first()).toBeVisible({ timeout: 60000 });
  await page.click('[aria-label="Show options"]');
  await page.waitForTimeout(500);
  await page.click(':text("Delete goal")');
  await page.click(':text("Delete goal")');
  
  // assert deleted
  await page.waitForTimeout(2000);
  await expect(page.locator('[role="alert"]')).toBeVisible();
  await page.click('[aria-label="Close this notification"]');
  await expect(page.locator(`text=${goalName}`)).toBeHidden({ timeout: 60000 });

  process.exit();
})();