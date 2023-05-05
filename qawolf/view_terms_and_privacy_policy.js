const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "View terms and privacy policy";

  // https://qawolfhq.slack.com/archives/C02K01LSEAE/p1663127885792379
  
  // log in
  const { page } = await logIn();
  
  // open settings - legal
  await page.click("text=View settings");
  await page.click("text=Legal");
  
  // view terms of use
  const [page2] = await Promise.all([
    page.waitForEvent("popup"),
    page.click("text=Terms of Use"),
  ]);
  await page2.waitForLoadState("domcontentloaded");
  await page2.bringToFront();
  
  // assert terms of use
  await assertText(page2, "Terms of Use");
  await assertText(
    page2,
    "Welcome to Replay. Please read on to learn the rules and restrictions that govern"
  );
  assert(page2.url().includes("/terms-of-service"));
  // 🐺 QA Wolf will create code here
  
  // view privacy policy
  await page.bringToFront();
  const [page3] = await Promise.all([
    page.waitForEvent("popup"),
    page.click("text=Privacy Policy"),
  ]);
  await page3.waitForLoadState("domcontentloaded");
  await page3.bringToFront();
  
  // assert privacy policy
  await assertText(page3, "Privacy Policy");
  await assertText(page3, "At Replay, we take your privacy seriously");
  assert(page3.url().includes("/privacy-policy"));
  
  await page.bringToFront();
  await page.click(".modal-close");
  await logOut(page);
  

  process.exit();
})();