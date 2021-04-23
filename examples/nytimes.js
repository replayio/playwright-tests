const { example, action } = require("../src/helpers");

const selectors = {
  nav: 'div[data-testid="masthead-mini-nav"]',
  navItem: '[data-testid="mini-nav-item"]',
  navItemByText(text) {
    return `${this.nav} ${this.navItem} >> text="${text}"`;
  },
  searchButton: 'button[data-test-id="search-button"]',
  searchInput: "input[data-testid='search-input']",
  menuButton: "#desktop-sections-button",
  menuItemByText(text) {
    return `[data-testid="desktop-nav"] a[data-name="${text}"]`;
  },
};

example("nytimes.com", async (page, { step }) => {
  // using a lighter-weight starting page than the root
  await page.goto("https://www.nytimes.com/sitemap");

  await page.click(selectors.menuButton);
  await Promise.all([
    page.waitForNavigation({ timeout: 60000 }),
    page.click(selectors.menuItemByText("World")),
  ]);

  await Promise.all([
    page.waitForNavigation(),
    step("Search for 'climate'", async () => {
      await page.click(selectors.searchButton);
      await page.fill(selectors.searchInput, "climate");
      await page.press(selectors.searchInput, "Enter");
    }),
  ]);
});
