const { chromium, firefox } = require("playwright");

// Get the browser runtime to use.
function getRuntime() {
  if (process.env.PLAYWRIGHT_CHROMIUM) {
    return chromium;
  }
  return firefox;
}

const gBrowsers = [];

// Launch the browser according to the current configuration and open a new page.
async function launch() {
  const options = {};
  if (process.env.PLAYWRIGHT_HEADFUL) {
    options.headless = false;
  }

  const browser = await getRuntime().launch(options);
  gBrowsers.push(browser);

  return browser.newPage();
}

async function cleanup() {
  for (const browser of gBrowsers) {
    await browser.close();
  }
}

module.exports = { launch, cleanup };
