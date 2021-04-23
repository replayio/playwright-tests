const { example } = require("../src/helpers");

const selectors = {
  nav: {
    root: "#global-nav",
    itemByText(text) {
      return `${this.root} >> text=${text}`;
    },
    team: ".team",
    teamByText(text) {
      return `${this.team} >> text=${text}`;
    },
  },
  search: {
    button: "#global-search-trigger",
    input: "#global-search input",
  },
};

const search = (text) => async (page) => {
  await page.click(selectors.search.button);
  await page.fill(selectors.search.input, text);
  await page.press(selectors.search.input, "Enter");
  await page.waitForNavigation();
};

example("ESPN", async (page, { step }) => {
  await page.goto("https://www.espn.com/");

  await step("Navigate to Golden State Warriors", async () => {
    await page.hover(selectors.nav.itemByText("NBA"));
    await page.click(selectors.nav.teamByText("Golden State Warriors"));
  });

  await step("Search for Steph Curry", search("Steph Curry"));
});
