const { example } = require("../src/helpers");
const { nthMatch } = require("../src/selectors");
const { asyncClick } = require("../src/dom");

const selectors = {
  search: {
    root: "form[action='/search']",
    get input() {
      return `${this.root} input:not([tabIndex = "-1"])`;
    },
    get submit() {
      return `${this.root} button[type='submit']`;
    },
  },
  results: 'li h4 a[href *= "/biz/"]',
};

// Searches for results on the main page or via header on detail page
function search(text) {
  return async (page) => {
    await page.click(selectors.search.input);
    await page.fill(selectors.search.input, text);
    await page.click(selectors.search.submit);
  };
}

example("Find a thai restaurant on yelp", async (page, { step }) => {
  await page.goto("https://www.yelp.com/");

  await step("Search for a thai restaurant", search("thai"));
  await step(
    "Click on the first result",
    asyncClick(nthMatch(selectors.results, 0))
  );

  await step("Search for a taco restaurant", search("taco"));
  await step(
    "Click on the second result",
    asyncClick(nthMatch(selectors.results, 1))
  );
});
