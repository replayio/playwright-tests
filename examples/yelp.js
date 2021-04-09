const { example } = require("../src/helpers");

example("Find a thai restaurant on yelp", async (page, { action }) => {
  await action("Search for a thai restaurant", async () => {
    await page.goto("https://www.yelp.com/");

    // NOTE: (plumbers, delivery, takeout) is not locale friendly
    await page.click('input[placeholder="plumbers, delivery, takeout..."]');
    await page.fill("input[placeholder]", "thai");
    await page.click("//span[normalize-space(.)='Search']/span[1]");
  });

  await action("Click on the first result", () =>
    Promise.all([
      // waiting on url 'https://www.yelp.com/biz/thaibodia-bistro-campbell-campbell'
      // NOTE: we need a more general selector
      page.waitForNavigation(),
      page.click("h4 a"),
    ])
  );
});
