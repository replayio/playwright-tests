const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Developer role can copy invite link from share settings";

  // log in
  const { browser, page } = await logIn({ userId: 10 });
  await expect(page.locator('text="Your Library"')).toHaveCount(2);
  
  // go to team
  await page.click(':text("Test Permissions")');
  
  // assert replays available
  // await expect(page.locator('text="Great Scott"')).toBeVisible();
  await expect(page.locator('text="Time Travel"')).toBeVisible();
  
  // go to replay
  await page.click('text=Time Travel');
  
  // assert replay loaded
  await expect(page.locator(':text("Time Travel")')).toBeVisible( { timeout: 30 * 1000 });
  await expect(page.locator('text="DevTools"')).toBeVisible();
  
  // go to share settings
  await page.click("text=ios_shareShare");
  
  // assert share settings modal openend
  await expect(page.locator('text="Add People"')).toBeVisible();
  await expect(page.locator('text="Privacy Settings"')).toBeVisible();
  
  // ensure privacy set to private
  const privateButton = page.locator('[data-test-id="consoleDockButton"]:has-text("Test Permissions can viewexpand_more")');
  const publicButton = page.locator('[data-test-id="consoleDockButton"]:has-text("Anyone with the link can viewexpand_more")');
  const publicLink = page.locator('[role="menuitem"] >> text=Anyone with the link');
  const privateLink = page.locator('[role="menuitem"] >> text=Members of Test Permissions');
  
  if (await privateButton.count()) {
    // assert privacy settings button enabled
    await expect(privateButton).not.toBeDisabled();
  } else {
    await page.click('.space-y-1 [type="button"]');
    await privateLink.click();
    await expect(privateButton).toBeVisible();
  };
  
  // open privacy settings
  await privateButton.click();
  
  // assert privacy settings opened
  await expect(publicLink).toBeVisible();
  await expect(privateLink).toBeVisible();
  
  // change privacy setting
  await publicLink.click();
  
  // assert public privacy setting
  await expect(publicButton).toBeVisible();
  
  // change back to private setting
  await publicButton.click();
  await privateLink.click();
  
  // assert privacy set to private
  await expect(privateButton).toBeVisible();
  await expect(publicButton).not.toBeVisible();
  
  // copy invite link
  await page.click("text=Copy Link");
  const copiedLink = await page.evaluate(() => {
    return navigator.clipboard.readText();
  });
  
  // assert link copied to clipboard
  await expect(page.locator('text="Copied"')).toBeVisible();
  expect(copiedLink).toEqual(buildUrl('/recording/time-travel--ebf103b3-9b40-4d5b-a9f3-e0c8fe3d4bd5'));
  
  // go to link
  const page2 = await browser.newPage();
  await page2.goto(copiedLink);
  
  // assert page opened with correct url
  expect(page2.url()).toEqual(buildUrl('/recording/time-travel--ebf103b3-9b40-4d5b-a9f3-e0c8fe3d4bd5'));

  process.exit();
})();