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
    return page.waitForFunction(element => {
      return !document.querySelector(element);
    }, element);
  }
  
  async function assertNotText(page, text) {
    return page.waitForFunction(text => {
      return !document.body.innerText.includes(text);
    }, text);
  }
  
  function buildUrl(route = "/") {
    const baseUrl = (process.env.URL || process.env.DEFAULT_URL || "https://app.replay.io/").replace(/\/$/, '');
  
    return `${baseUrl}${route}`;
  }
  
  function getBoundingClientRect(selector, options) {
    return async (page) => {
      const el = await page.waitForSelector(selector, options);
      return await page.evaluate((e) => e.getBoundingClientRect().toJSON(), el);
    };
  }
  
  async function logIn(options = {}) {
    const userNumber = options.userId || 1;
  
    // log in by setting API key as HTTP header
    const { browser, context } = await launch();
    await context.setExtraHTTPHeaders({
      Authorization: `Bearer ${process.env[`USER_${userNumber}_API_KEY`]}`
    });
    const page = await context.newPage();
    await page.goto(buildUrl("/"));
  
    // go to your library
    await page.click("text=Your Library");
  
    return { browser, context, page };
  }
  
  async function logInToFacebook(email, password) {
    // go to Facebook landing page
    const { context } = await launch({ slowMo: 500 });
    const page = await context.newPage();
    await page.goto('https://www.facebook.com');
  
    // log in as test user
    await page.fill('[data-testid="royal_email"]', email || process.env.FACEBOOK_EMAIL);
    await page.fill('[data-testid="royal_pass"]', password || process.env.FACEBOOK_PASSWORD);
    await page.click('[data-testid="royal_login_button"]');
  
    // wait for log in to succeed
    await assertElement(page, '[aria-label="Account"]');
  
    return { page };
  }
  
  function waitForFrameNavigated(url) {
    return (page) =>
      new Promise((resolve) => {
        const fn = async (frame) => {
          const frameUrl = await frame.url();
          if (
            !url ||
            (url instanceof RegExp ? url.test(frameUrl) : frameUrl.includes(url))
          ) {
            page.off("framenavigated", fn);
            resolve(frame);
          }
        };
  
        page.on("framenavigated", fn);
      });
  }
  
  
  module.exports = {
    assertElement,
    assertNotElement,
    assertNotText,
    assertText,
    faker,
    logInToFacebook,
  };
  