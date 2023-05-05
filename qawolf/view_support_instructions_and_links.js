const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "View support instructions and links";

  // log in
  const { context, page } = await logIn({ userId: 8 });
  
  // assert page loaded
  await assertText(page, 'Your Library');
  await assertText(page, 'View settings');
  
  // go to support
  await page.click("text=View settings");
  await page.click('li :text("Support")');
  
  // assert support info loaded
  await assertText(page, 'Discord server');
  await assertText(page, 'support@replay.io');
  
  // click Disord server link
  const [discordPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click("text=Discord server.")
  ]);
  
  // assert Discord login page loaded
  await discordPage.click("text=jv invited you to join");
  await assertText(discordPage, "Replay");
  
  // assert email link href
  await page.bringToFront();
  const emailLink = page.locator('.modal-content :text("support@replay.io")');
  await expect(emailLink).toHaveAttribute('href', 'mailto:support@replay.io');
  await page.click(".img");
  
  await logOut(page);
  

  process.exit();
})();