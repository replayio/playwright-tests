const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Show privacy information from search anything component using user role";

  // log in
  const { page } = await logIn({ userId: 7 });
  await assertText(page, "Library");
  
  // go to recording
  await page.click("text=Greater Scott");
  
  // assert recording loaded
  await assertText(page, "Greater Scott");
  await assertText(page, "DevTools");
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await assertText(page, "Console");
  
  // open privacy info
  const privacyInfoCookies = page.locator("text=Cookies");
  await expect(privacyInfoCookies).toHaveCount(0);
  const privacyInfoStorage = page.locator("text=Local Storage");
  await expect(privacyInfoStorage).toHaveCount(0);
  const privacyInfoScripts = page.locator("text=Executed Scripts");
  await expect(privacyInfoStorage).toHaveCount(0);
  await page.keyboard.press("Control+K");
  await page.click("text=Show Privacy");
  
  // assert privacy info opened
  await expect(privacyInfoCookies).toHaveCount(1);
  await expect(privacyInfoStorage).toHaveCount(1);
  await expect(privacyInfoStorage).toHaveCount(1);
  
  // follow learn more link
  const [page2] = await Promise.all([
    page.waitForEvent("popup"),
    page.click("text=Learn more"),
  ]);
  
  // assert security and privacy page loaded
  await assertText(page2, "Privacy Policy");
  await assertText(page2, "security@replay.io");
  expect(page2.url()).toEqual("https://www.replay.io/security-and-privacy");

  process.exit();
})();