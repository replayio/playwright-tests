const { example } = require("../src/helpers");

const selectors = {
  addressSearch: {
    root: "[class$=HeroAddressSearch]",
    get buy() {
      return `${this.root} .tab a[href *= 'property-for-sale']`;
    },
    get input() {
      return `${this.root} input`;
    },
    get submit() {
      return `${this.root} button:not([hidden])`;
    },
  },
  results: {
    root: "[class$=AggregatesListings]",
    get sort() {
      return `${this.root} [class$=chipStyle]`;
    },
    get listing() {
      return `${this.root} [class$=AggregatesListingCard] a`;
    },
  },
  listing: "[class $= AggregatesListingDialog]",
  filter: {
    root: "[class$=Filter] [class $=FilterDialog]",
    optionByText: function (text) {
      return `${this.root} [role=button] >> text="${text}"`;
    },
  },
};

example("RealAdvisor", async (page, { step }) => {
  await page.goto("https://realadvisor.ch/");

  await Promise.all([
    page.waitForNavigation(),
    page.click(selectors.addressSearch.buy),
  ]);

  await step("Search for listings", async () => {
    await page.click(selectors.addressSearch.input);
    await page.click(selectors.addressSearch.submit);
  });

  await step("Sort by Most Recent", async () => {
    await page.click(selectors.results.sort);
    await page.click(selectors.filter.optionByText("Most recent"));
    await page.waitForSelector("[class*=useGridLoadingStyle]", {
      state: "detached",
    });
  });

  await step("Open first listing", async () => {
    // TODO: Bit of flakiness bevause the listing entry still exists while
    // loading so giving a little time for it to be replaced with the valid
    // entry post filter
    await page.waitForTimeout(500);
    await page.click(selectors.results.listing);
    await page.waitForSelector(selectors.listing);
  });
});
