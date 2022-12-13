// Generic test runner for loading a static website, waiting a bit, and then finishing.
const { example } = require("../src/helpers");

let url = process.env.STATIC_WEBSITE;
if (!url) {
  throw new Error("Target website not specified");
}
if (!url.startsWith("http")) {
  url = "https://" + url;
}

const timeout = +process.env.STATIC_WEBSITE_DURATION || 30000;

example(`Load static website ${url}`, async (page, { action }) => {
  await page.goto(url);
  await action(`Wait for ${timeout} ms`, async () => {
    await new Promise(resolve => setTimeout(resolve, timeout));
  });
});
