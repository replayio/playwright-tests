const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Make recording private and public";

  // log in
  const { browser, context, page } = await logIn({ userId: 6 });
  
  // open options menu
  await page.fill('[placeholder="Search"]', "Clade");
  await page.keyboard.press("Enter");
  await page.hover("text=Clade");
    await page.click('#recording-list [data-test-id="consoleDockButton"]');
  
  // ensure recording not already public
  const makePrivateButton = await page.$("[role='menu'] >> text=Make private");
  if (makePrivateButton) {
    await makePrivateButton.click();
    await page.hover("text=Clade");
      await page.click('#recording-list [data-test-id="consoleDockButton"]');
    // below refreshes the dropdown
    await page.click("body");
    await page.waitForTimeout(5000);
      await page.click('#recording-list [data-test-id="consoleDockButton"]');
  }
  
  // make recording public
  await page.click("[role='menu'] >> text=Make public");
  await page.waitForTimeout(5000);
  
  // assert recording is public (anyone can view URL)
  const context2 = await browser.newContext();
  const page2 = await context2.newPage();
  await page2.goto(
    buildUrl("/recording/clade--4bdab26c-78c0-47c4-bbc1-f0e77a478e2c")
  );
  await assertText(page2, "Clade", { timeout: 4 * 60 * 1000 });
  await page2.close();
  
  // make recording private
  // await page.bringToFront();
  await page.hover("text=Clade");
    await page.click('#recording-list [data-test-id="consoleDockButton"]');
  await page.click("[role='menu'] >> text=Make private");
  await page.waitForTimeout(5000);
  
  await logOut(page);
  await page.close();
  
  // assert recording is private (anyone cannot view URL)
  // await page2.bringToFront();
  // await page2.reload();
  const context2 = await browser.newContext();
  const page2 = await context2.newPage();
  await page2.goto(
    buildUrl("/recording/clade--4bdab26c-78c0-47c4-bbc1-f0e77a478e2c")
  );
  await assertText(page2, "Almost there!");
  await assertText(page2, "This is a private replay. Please sign in.");
  

  process.exit();
})();