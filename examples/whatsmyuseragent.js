const { example } = require("../src/helpers");

example("whatsmyuseragent", async (page) => {
  await page.goto("http://whatsmyuseragent.org/");
});
