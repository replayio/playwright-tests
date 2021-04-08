// Generic test runner for loading a static website, waiting a bit, and then finishing.
const { launch, cleanup } = require("../utils");

if (!process.env.STATIC_WEBSITE) {
  throw new Error("Target website not specified");
}

(async () => {
  const page = await launch();

  let url = process.env.STATIC_WEBSITE;
  if (!url.startsWith("http")) {
    url = "https://" + url;
  }

  const timeout = +process.env.STATIC_WEBSITE_DURATION || 30000;

  console.log("Visiting page");
  await page.goto(url);
  await new Promise(resolve => setTimeout(resolve, timeout));

  console.log("Saving recording");
  await cleanup();
})();
