const { example } = require("../src/helpers");

// Searches for results on the main page or via header on detail page
function search(text) {
  return async (page) => {
    const searchFormSelector = "form[action='/search']";
    const inputSelector = `${searchFormSelector} input:not([tabIndex = "-1"])`;
    const submitSelector = `${searchFormSelector} button[type='submit']`;

    await page.click(inputSelector);
    await page.fill(inputSelector, text);
    await page.click(submitSelector);
  };
}

// returns the nth (0-based) non-sponsored result
function selectNthResult(n = 0) {
  return async (page) => {
    const elements = await page.$$('li h4 a[href *= "/biz/"]');
    if (elements[n]) {
      await elements[n].click();
    }
  };
}

example("Find a thai restaurant on yelp", async (page, { action }) => {
  await page.goto("https://www.yelp.com/");

  await action("Search for a thai restaurant", search("thai"));
  await action("Click on the first result", selectNthResult());

  await action("Search for a taco restaurant", search("taco"));
  await action("Click on the first result", selectNthResult());
});
