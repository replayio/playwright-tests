const { example } = require("../src/helpers");
const { waitForFrameNavigated } = require("../src/dom");

const selectors = {
  drawer: {
    root: "litdev-drawer",
    sampleByPath(path) {
      return `${this.root} li[data-sample *= "${path}"]`;
    },
  },
};

const waitForPreview = waitForFrameNavigated(/playground-projects/);

example("lit.dev", async (page, { action, step }) => {
  await page.goto("https://lit.dev/playground/");

  await action("examples/full-component", async () => {
    await page.click(selectors.drawer.sampleByPath("examples/full-component"));
    const frame = await waitForPreview(page);

    await step("Click the first button", async () => {
      await frame.click("my-element:not(.mars)");
      await frame.waitForSelector("my-element:not(.mars) >> text=Mars");
    });
  });

  await action("examples/slotting-children", async () => {
    await page.click(
      selectors.drawer.sampleByPath("examples/slotting-children")
    );
    await waitForPreview(page);
  });

  await action("examples/directive-if-defined", async () => {
    await page.click(
      selectors.drawer.sampleByPath("examples/directive-if-defined")
    );
    const frame = await waitForPreview(page);

    await step("Clear the input", async () => {
      await frame.fill("#name", "");
      await frame.waitForSelector("img:not([src])", { state: "attached" });
    });
  });
});
