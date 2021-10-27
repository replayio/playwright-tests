const { assertElement, assertText } = require("qawolf");
const faker = require("faker");
require("dotenv").config();

async function launch({ headless } = { headless: false }) {
  const playwright = require("@recordreplay/playwright");
  let browserName = process.env.PLAYWRIGHT_CHROMIUM ? "chromium" : "firefox";

  const browser = await playwright[browserName].launch({
    headless,
  });
  const context = await browser.newContext();
  return { browser, context };
}

async function assertNotElement(page, element) {
  return page.waitForFunction((element) => {
    return !document.body.innerText.includes(element);
  }, element);
}

async function assertNotText(page, text) {
  return page.waitForFunction((text) => {
    return !document.body.innerText.includes(text);
  }, text);
}

async function logInToFacebook() {
  // go to Facebook landing page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto("https://www.facebook.com");

  // log in as test user
  await page.fill('[data-testid="royal_email"]', process.env.FACEBOOK_EMAIL);
  await page.fill('[data-testid="royal_pass"]', process.env.FACEBOOK_PASSWORD);
  await page.click('[data-testid="royal_login_button"]');

  // wait for log in to succeed
  await assertElement(page, '[aria-label="Account"]');

  return { page };
}

module.exports = {
  assertElement,
  assertNotElement,
  assertNotText,
  assertText,
  faker,
  logInToFacebook,
};
