const { example } = require("../src/helpers");
const { nthMatch } = require("../src/selectors");
const { getBoundingClientRect } = require("../src/dom");

const selectors = {
  search: {
    root: "form[action='/s/all']",
    get input() {
      return `${this.root} input[data-testid="structured-search-input-field-query"]`;
    },
    get submit() {
      return `${this.root} [data-testid="structured-search-input-search-button"]`;
    },
    get dropdownOption() {
      return `${this.root} [data-testid="structured-search-input-field-query-panel"] li`;
    },
  },
  results: {
    filter: {
      button: "#filter-menu-chip-group button",
      priceRange: {
        root: '[data-testid="menuBarPanel-price_range"]',
        get handle() {
          return `${this.root} button`;
        },
        get save() {
          return `${this.root} button[data-testid="filter-panel-save-button"]`;
        },
      },
    },
  },
};

function search(text) {
  return async (page) => {
    await page.click(selectors.search.input);
    await page.fill(selectors.search.input, text);
    // TODO: wait for dropdown to populate correctly. not ideal ...
    await page.waitForTimeout(400);
    await page.click(selectors.search.dropdownOption);
    await page.click(selectors.search.submit);
  };
}

const getPriceButton = nthMatch(selectors.results.filter.button, 2);
const getPriceDragHandleBounds = getBoundingClientRect(
  selectors.results.filter.priceRange.handle
);

example("Search Airbnb for Tahoe", async (page, { action, step }) => {
  await page.goto("https://www.airbnb.com/");

  await step("Search for tahoe", search("tahoe"));
  await action("Filter by Price", async (page, { log }) => {
    const priceButton = await getPriceButton(page);
    await priceButton.click();

    step("Click on start and end ranges", async () => {
      const bounds = await getPriceDragHandleBounds(page);
      const center = bounds.top + bounds.height / 2;

      await page.mouse.click(bounds.left + 100, center);
      await page.mouse.click(bounds.left + 300, center);
    });

    await page.click(selectors.results.filter.priceRange.save);

    await page.waitForTimeout(1000);
  });
});
