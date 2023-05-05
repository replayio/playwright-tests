const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Sign up for free plan";

  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://www.replay.io/');
  
  // assert page looded
  await expect(page.locator('text=The time-travel debugger from the future.')).toBeVisible();
  await expect(page.locator('text=More than a video. Replay lets you jump to any point in execution, add Console logs on the fly, and squash bugs as a team.')).toBeVisible();
  
  // go to pricing page
  await page.click('[href="/pricing"]:visible');
  
  // assert pricing page loaded
  await assertText(page, 'Pricing');
  await assertText(page, 'Sign Up');
  
  // sign up for free plan
  const [page2] = await Promise.all([
    page.waitForEvent('popup'),
    page.click('.hero_slide__AJNo_ [href="https://app.replay.io/"]')
  ]);
  await page2.click("button:has-text('Sign')");
  
  // assert Google sign in page loaded
  await assertText(page2, 'Sign in with Google');
  await assertText(page2, 'to continue to Replay');

  process.exit();
})();