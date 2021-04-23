const { example } = require("../src/helpers");
const { waitForTitleChange } = require("../src/dom");

const selectors = {
  search: '.notion-topbar >> text="Search"',
  searchMenu: ".notion-quick-find-menu",
  get searchField() {
    return `${this.searchMenu} input`;
  },
  get searchResult() {
    return `${this.searchMenu} section [role=button]`;
  },
};

example("Notion - Replay Docs", async (page, { step }) => {
  await page.goto(
    "https://www.notion.so/replayio/Replay-Docs-56758667f53a4d51b7c6fc7a641adb02"
  );

  await step("Search for 'help'", async () => {
    await page.click(selectors.search);
    await page.click(selectors.searchField);

    await page.fill(selectors.searchField, "help");
    await page.press(selectors.searchField, "Enter");
    await page.click(selectors.searchResult);
  });

  await waitForTitleChange(page);
});
