const { example } = require("../src/helpers");

const selectors = {
  search: {
    root: "#gh-f",
    input: `#gh-ac`,
    categories: `#gh-cat`,
    submit: `#gh-btn`,
  },
  results: {
    sort: {
      root: ".srp-controls__sort",
      get button() {
        return `${this.root} button`;
      },
      sortByLabel(label) {
        // TODO: This selector is too DOM-bound. Alternatively, we could get the
        // menu via aria-controls but would require an attribute retrieval and a
        // second selector which isn't possible via _only_ selectors.
        return `${this.button} + * >> a >> text=${label}`;
      },
    },
    get item() {
      return ".srp-results li.s-item a.s-item__link";
    },
  },
  listing: {
    sellerInfo: {
      root: ".si-cnt",
      get profile() {
        return `${this.root} a[href *= "/usr/"]`;
      },
    },
  },
  profile: {
    feedback: {
      root: "#feedback_ratings",
      get positive() {
        return `${this.root} a >> text=Positive`;
      },
      get neutral() {
        return `${this.root} a >> text=Neutral`;
      },
      get negative() {
        return `${this.root} a >> text=Negative`;
      },
    },
  },
};

example("ebay", async (page, { step }) => {
  await page.goto("https://ebay.com/");

  await step("Search for iPhone", async () => {
    await page.click(selectors.search.input);
    await page.fill(selectors.search.input, "iPhone");
    await page.selectOption(selectors.search.categories, "15032"); // Cell Phones & Accessories
    await page.click(selectors.search.submit);
  });

  await step("Sort by Ending Soonest", async () => {
    await page.click(selectors.results.sort.button);
    await page.click(selectors.results.sort.sortByLabel("ending soonest"));
  });

  await step("View listing", () => page.click(selectors.results.item));
  await step("View Seller Profile", async () => {
    await page.click(selectors.listing.sellerInfo.profile);
    await page.click(selectors.profile.feedback.positive);
  });

  // Wait for the feedback page to load and stabilize before ending
  await page.waitForLoadState("networkidle");
});
