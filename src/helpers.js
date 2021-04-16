const playwright = require("playwright");

let browserName = process.env.PLAYWRIGHT_CHROMIUM ? "chromium" : "firefox";
const launchOptions = {
  headless: !!process.env.PLAYWRIGHT_HEADLESS,
};

let depth = 0;
const log = (...args) => {
  if (depth) {
    console.log("".padStart(depth * 2).substr(1), ...args);
  } else {
    console.log(...args);
  }
};

function wrapped(cbk, pageLog = log) {
  return async (name, ...args) => {
    try {
      await pageLog(`> ${name}`);
      depth++;
      return await cbk(...args);
    } catch (e) {
      console.error(`Error in ${name}`);
      console.error(e);
    } finally {
      depth--;
      await pageLog(`< ${name}`);
    }
  };
}

function bindPageActions(page) {
  const actions = {};

  // Create page-bound actions
  const pageLog = (...args) => {
    log(...args);
    return page.evaluate((extArgs) => {
      console.log("Test Step:", ...extArgs);
    }, args);
  };
  const pageAction = wrapped(async (cbk) => await cbk(page, actions), pageLog);

  actions.log = pageLog;
  actions.action = pageAction;

  return actions;
}

const action = wrapped(async (cbk) => await cbk());

const example = wrapped(async (cbk) => {
  const browser = await playwright[browserName].launch(launchOptions);
  const context = await browser.newContext();
  const page = await context.newPage();

  log("Browser launched");

  await action(
    "Running example",
    async () => await cbk(page, bindPageActions(page))
  );

  await page.close();
  await context.close();
  await browser.close();
});

module.exports = {
  action,
  example,
  log,
};
