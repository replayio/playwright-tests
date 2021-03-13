import { it, expect } from "@playwright/test";

const examples = [
  'text="Line Chart"',
  'text="Bar Chart"',
  'text="Column Chart"',
  'text="Axis Options"',
  'text="Custom Tooltip"',
  'text="Synced Cursors"',
  'text="Grouping Modes"',
  'text="Tooltip Options"',
  'text="Dynamic Box"',
  'text="Sparklines"',
  'text="Mixed Types"',
  'text="Multiple Axes"',
  'text="Dark Mode"',
  'text="Stress Test"',
];

for (const example of examples) {
  it(example, async ({ page }) => {
    await page.goto("https://react-charts.tanstack.com/examples/bubble");
    await page.click(example);
    await page.waitForTimeout(2000);
  });
}
