const { example } = require("../src/helpers");

const selectors = {
  run: "a.run-list-item",
  flakyText: '[data-cy="test-overview-test-link"]',
  section: "[data-cy=collapsing-section]",
  sectionToggleButton: "button",
};

example("Cypress", async (page, { step }) => {
  await page.goto("https://dashboard.cypress.io/projects/7s5okt/runs");

  await step("View flaky test result", async (page) => {
    await page.click(selectors.run);
    await page.click(selectors.flakyText);
  });

  await step("Expand runtime environment section", async (page) => {
    const envSelector = `${selectors.section}:nth-of-type(4) ${selectors.sectionToggleButton}`;
    await page.click(envSelector);
  });
});
