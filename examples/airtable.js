const { example } = require("../src/helpers");
const { loginToGoogle } = require("./shared/google");

example("airtable", async (page, { step }) => {
  await page.goto(
    "https://airtable.com/tbl2B9XDcGl90oG58/viwA7GIBsYINpwH0O?blocks=hide"
  );

  await loginToGoogle({ step, page });
  await page.click("text=Views");
  await page.waitForTimeout(2000);

  await page.click("#searchButton");
  await page.type(`[placeholder="Find in view"]`, "Bernard");
  await page.waitForSelector(".galleryCardContainer.highlight");
  // await page.waitForTimeout(200000);
});
