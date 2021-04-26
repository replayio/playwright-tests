const { example } = require("../src/helpers");

const selectors = {
  files: {
    root: "section[class *= Files]",
    get file() {
      return `${this.root} li`;
    },
    fileByName(name) {
      return `${this.file} >> text=${name}`;
    },
  },
  search: {
    input: 'input[placeholder="Search"]',
    button: 'button[aria-label="Search"]',
    results: 'li[class *= "Result"] button',
  },
  tab: ".tab",
  tabByTitle(title) {
    return `${this.tab}[title *= "${title}"]`;
  },
};

const search = (text) => async (page) => {
  // activate search panel
  await page.click(selectors.search.button);

  // activate and fill field
  await page.click(selectors.search.input);
  await page.fill(selectors.search.input, text);

  // select first result
  await page.click(selectors.search.results);
};

example("Codesandbox.io", async (page, { step }) => {
  await page.goto("https://codesandbox.io/s/0d68e?file=/src/App.js");

  await step("Navigate to index.js", async () => {
    await page.click(selectors.files.fileByName("index.js"));
    await page.waitForSelector(selectors.tabByTitle("src/index.js"));
  });

  await step("Search for useState", search("useState"));
  await page.waitForSelector(selectors.tabByTitle("src/App.js"));
});
