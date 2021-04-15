const { example } = require("../src/helpers");
const { nthMatch } = require("../src/selectors");
const { getBoundingClientRect } = require("../src/dom");

function search(text) {
  return async (page, { log }) => {
    const searchFormSelector = "form[action='/s/all']";
    const inputSelector = `${searchFormSelector} input[data-testid="structured-search-input-field-query"]`;
    const submitSelector = `${searchFormSelector} [data-testid="structured-search-input-search-button"]`;
    const dropdownOptionSelector = `${searchFormSelector} [data-testid="structured-search-input-field-query-panel"] li`;

    await page.click(inputSelector);
    await page.fill(inputSelector, text);
    // TODO: wait for dropdown to populate correctly. not ideal ...
    await page.waitForTimeout(400);
    await page.click(dropdownOptionSelector);
    await page.click(submitSelector);
  };
}

const getPriceButton = nthMatch("#filter-menu-chip-group button", 2);
const getPriceDragHandleBounds = getBoundingClientRect(
  '[data-testid="menuBarPanel-price_range"] button'
);

example("Search Airbnb for Tahoe", async (page, { action, log }) => {
  await page.goto("https://www.airbnb.com/");

  await action("Search for tahoe", search("tahoe"));
  await action("Filter by Price", async (page, { log }) => {
    await (await getPriceButton(page)).click();
    const bounds = await getPriceDragHandleBounds(page);

    const center = bounds.top + bounds.height / 2;
    log("Click on start and end ranges");
    await page.mouse.click(bounds.left + 100, center);
    await page.mouse.click(bounds.left + 300, center);
    await page.click(
      '[data-testid="menuBarPanel-price_range"] button[data-testid="filter-panel-save-button"]'
    );

    await page.waitForTimeout(1000);
  });
});
