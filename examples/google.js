const { example } = require("../src/helpers");

example("google.com search", async (page, { action, log }) => {
  // Go to https://www.google.com/?gws_rd=ssl
  await page.goto("https://www.google.com/");

  // Click input[aria-label="Search"]
  await page.click('input[aria-label="Search"]');

  log("Executing search");
  await page.fill(
    'input[aria-label="Search"]',
    "site:wikipedia.org time travel debugging"
  );

  // Press Enter
  await Promise.all([
    page.waitForNavigation(),
    page.press('input[aria-label="Search"]', "Enter"),
  ]);

  await action('Showing "About this result"', async () => {
    await page.click(".g [role='button'] > span");
    await page.click("#lb [role='button']");
  });
});
