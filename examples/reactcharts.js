const { waitForFrameNavigated } = require("../src/dom");
const { example } = require("../src/helpers");

const selectors = {
  chart: ".ReactChart",
  exampleByText: (text) => `text="${text}"`,
};

const examples = [
  "Line Chart",
  "Bar Chart",
  "Column Chart",
  "Axis Options",
  "Custom Tooltip",
  "Synced Cursors",
  "Grouping Modes",
  "Tooltip Options",
  "Dynamic Box",
  "Sparklines",
  "Mixed Types",
  "Multiple Axes",
  "Dark Mode",
];

const waitForSandbox = waitForFrameNavigated(/csb.app/);

example("React-charts", async (page, { action }) => {
  await page.goto("https://react-charts.tanstack.com/docs/overview");

  for (const example of examples) {
    await action(example, async (page, { log }) => {
      await page.click(selectors.exampleByText(example));

      log("Waiting for sample to load");

      const contentFrame = await waitForSandbox(page);

      try {
        await contentFrame.waitForSelector(selectors.chart);
      } catch (e) {
        // TODO: waitForSelector currently fails with replay but works with
        // firefox so we're falling back to a generic timeout in that case
        if (contentFrame.isDetached()) {
          await page.waitForTimeout(5000);
        }
      }
    });
  }
});
