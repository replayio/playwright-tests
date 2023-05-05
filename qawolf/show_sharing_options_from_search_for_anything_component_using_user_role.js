const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Show sharing options from search for anything component using user role";

  // log in
  const { page } = await logIn({ userId: 7 });
  await assertText(page, 'Library');
  
  // go to recording
  await page.click('text=Greater Scott');
  
  // assert recording loaded
  await assertText(page, 'Greater Scott');
  await assertText(page, 'DevTools');
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await assertText(page, 'Console');
  
  // show sharing options from search for anything component
  await page.keyboard.press("Control+K");
  await page.click("text=Show Sharing Options");
  
  // assert share modal opened
  const emailInput = page.locator('[placeholder="Email address"]');
  const priavcyText = page.locator('text=Privacy Settings');
  await expect(emailInput).toHaveCount(1);
  await expect(priavcyText).toHaveCount(1);

  process.exit();
})();