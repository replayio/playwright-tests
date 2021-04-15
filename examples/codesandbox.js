const { example } = require("../src/helpers");

const search = (text) => async (page) => {
  const inputSelector = 'input[placeholder="Search"]';

  // activate search panel
  await page.click('button[aria-label="Search"]');

  // activate and fill field
  await page.click(inputSelector);
  await page.fill(inputSelector, text);

  // select first result
  await page.click('li[class *= "Result"] button');
};

const waitForTab = (tab) => async (page) => {
  return await page.waitForSelector(`.tab[title *= "${tab}"]`);
};

const waitForIndex = waitForTab("src/index.js");
const waitForApp = waitForTab("src/App.js");

example("Codesandbox.io", async (page, { action }) => {
  await page.goto("https://codesandbox.io/s/0d68e?file=/src/App.js");

  await action("Navigate to index.js", async () => {
    await page.click('text="index.js"');
    await waitForIndex(page);
  });

  await action("Search for useState", search("useState"));
  await waitForApp(page);
});
