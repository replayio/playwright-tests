const { example } = require("../src/helpers");
const { getBoundingClientRect } = require("../src/dom");

const selectors = {
  search: {
    root: "[role=combobox]",
    get input() {
      return `${this.root} input`;
    },
    button: "button >> text=Search",
    get option() {
      return `${this.root} [role=listbox] li`;
    },
    optionByText(text) {
      return `${this.option} >> text=${text}`;
    },
  },
  results: {
    filter: {
      // Site includes 2 nav bars for different screen resolutions so the test finds
      // the visible one for a wide screen
      open: "[class*=InlineDialogContainer] + button >> text=Filter",
      dialog: "[role=dialog]",
      get slider() {
        return `${this.dialog} h6 + * .rc-slider`;
      },
      get search() {
        return `text="Search"`;
      },
    },
    item: "[class*=ReactVirtualized] a",
  },
};

const getSliderBounds = getBoundingClientRect(selectors.results.filter.slider);

example("TableCheck", async (page, { action, step }) => {
  await page.goto("https://www.tablecheck.com/en/japan");

  await step("Search for Tokyo", async (page) => {
    await page.click(selectors.search.input);
    await page.type(selectors.search.input, "tokyo");
    await page.click(selectors.search.optionByText("Tokyo"));
    await page.click(selectors.search.button);
  });

  await page.waitForSelector(selectors.results.item);

  await action("Filter by budget", async (page, { step }) => {
    await page.click(selectors.results.filter.open);
    await page.waitForTimeout(1000); // animation timeout

    step("Set min and max budget", async () => {
      const bounds = await getSliderBounds(page);
      const center = bounds.top + bounds.height / 2;

      await page.mouse.click(
        bounds.left + Math.round(bounds.width * 0.25),
        center
      );

      await page.mouse.click(
        bounds.left + Math.round(bounds.width * 0.75),
        center
      );
    });

    await Promise.all([
      page.waitForSelector(selectors.results.filter.dialog, {
        state: "detached",
      }),
      page.click(selectors.results.filter.search),
    ]);
    // allow a little time for the search to run and old results to be removed
    await page.waitForTimeout(500);
  });

  await page.waitForSelector(selectors.results.item);
});
