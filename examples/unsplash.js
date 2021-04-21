const { example } = require("../src/helpers");

const selectors = {
  tag: 'a[href^="/s"]',
  modal: ".ReactModalPortal",
  search: {
    input: 'input[data-test="homepage-header-search-form-input"]',
    results: {
      image: "figure img",
      next: "a[title=Next]",
      info: "button >> text='Info'",
      get tag() {
        return `${selectors.modal} ${selectors.tag}`;
      },
    },
  },
};

example("Unsplash", async (page, { action }) => {
  await page.goto("https://unsplash.com/");

  await action("Search for trees", async () => {
    await page.click(selectors.search.input);
    await page.fill(selectors.search.input, "trees");
    await page.press(selectors.search.input, "Enter");
  });

  await action("Navigate through results", async () => {
    await page.click(selectors.search.results.image);
    await page.click(selectors.search.results.next);
    await page.click(selectors.search.results.next);
    await page.click(selectors.search.results.next);
  });

  await action("Select tag", async () => {
    await page.click(selectors.search.results.tag);
    await page.waitForLoadState("networkidle");
    await page.click(selectors.search.results.image);
    await page.click(selectors.search.results.info);
  });
});
