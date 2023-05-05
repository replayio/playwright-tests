const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Edit LogRocket session replay preferences";

  // log in
  const { page } = await logIn({ userId: 6});
  
  // assert library loaded
  await assertText(page, 'Your Library');
  
  // go to account settings
  await page.click("text=View settings");
  
  // assert settings loaded
  await page.click(':text("Personal")');
  await assertText(page, 'API Keys');
  await assertText(page, 'Log Out');
  
  // go to preferences
  await page.click("text=Preferences");
  
  // assert preferences loaded
  await expect(page.locator("main h1")).toHaveText("Preferences")
  
  // assert LogRocket checkbox state
  const logRocketCheckbox = page.locator('[for="disableLogRocket"] [type="checkbox"]');
  if(await logRocketCheckbox.isChecked()){
    await logRocketCheckbox.uncheck()
  }
  expect(await logRocketCheckbox.isChecked()).toBeFalsy();
  
  // check logRocketCheckbox
  await logRocketCheckbox.check();
  
  // assert logRocketCheckbox is checked
  expect(await logRocketCheckbox.isChecked()).toBeTruthy();

  process.exit();
})();