const { example } = require("../src/helpers");

const selectors = {
  search: 'input[aria-label="Search"]',
  results: {
    about: ".g [role='button'] > span",
    closeAbout: "#lb [role='button']",
  },
};

example("google.com search", async (page, { step }) => {
  await page.goto("https://www.google.com/");

  await step("Executing search", async () => {
    await page.click(selectors.search);
    await page.fill(
      selectors.search,
      "site:wikipedia.org time travel debugging"
    );
    await page.press(selectors.search, "Enter");
  });

  await step('Showing "About this result"', async () => {
    await page.click(selectors.results.about);
    await page.click(selectors.results.closeAbout);
  });
});
