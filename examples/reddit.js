const { example } = require("../src/helpers");

const selectors = {
  search: 'input[name="q"]',
  // *css= tells this selector to return the <a> instead of the <button>
  community: '*css=a >> button:text("Join")',
};

example("Reddit", async (page, { step }) => {
  // Lower-weight starting page to avoid load timeouts
  await page.goto("https://www.reddit.com/topics/a-1/");

  await step("Search for climate", async () => {
    await page.fill(selectors.search, "climate");
    await page.press(selectors.search, "Enter");
  });

  await page.click(selectors.community);
  await page.waitForLoadState("networkidle");
});
