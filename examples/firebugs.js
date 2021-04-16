const { example } = require("../src/helpers");

const selectors = {
  searchInput: ".search-field input",
  filters: ".filters",
  menu: "[role=menu]",
  filter: function (label) {
    return `${this.filters} >> text="${label}"`;
  },
  menuItem: function (label) {
    return `${this.menu} >> text="${label}"`;
  },
};

const filter = (type, value) => async (page) => {
  await page.click(selectors.filter(type));
  await page.click(selectors.menuItem(value));
};

example("firebugs.dev", async (page, { action }) => {
  await page.goto("https://firebugs.dev/");

  await page.click(selectors.searchInput);
  await page.fill(selectors.searchInput, "break");

  await action("Filter by bugs", filter("Type", "Bug"));
  await action("Filter by priority", filter("Priority", "P3"));
  await action("Filter by keyword", filter("Keyword", "Good First Bugs"));
});
