const { example } = require("../src/helpers");

const search = (text) => async (page) => {
  await page.click("#global-search-trigger");
  await page.fill("#global-search input", text);
  await page.press("#global-search input", "Enter");
  await page.waitForNavigation();
};

example("ESPN", async (page, { action }) => {
  await page.goto("https://www.espn.com/");

  await action("Navigate to Golden State Warriors", async () => {
    await page.hover('#global-nav >> text="NBA"');
    await page.waitForTimeout(300);
    await page.click('.team >> text="Golden State Warriors"');
  });

  await action("Search for Steph Curry", search("Steph Curry"));
});
