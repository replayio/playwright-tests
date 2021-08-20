const { example } = require("../src/helpers");
const {
  waitForTitleChange,
  waitForFrameAttached,
  getBoundingClientRect,
} = require("../src/dom");

const selectors = {
  section: ".section",
  sectionByLabel(label) {
    return `${this.section}[data-section="${label}"]`;
  },
  itemBySection(section, item) {
    return `ul[data-section="${section}"] >> text=${item}`;
  },
};

const getCanvasBounds = getBoundingClientRect("iframe", { state: "attached" });
const waitForFrame = waitForFrameAttached();

const openSample = async (page, section, item) => {
  await page.click(selectors.itemBySection(section, item));
  await waitForFrame(page);
  // wait for render ...
  await page.waitForTimeout(1000);
};

example("PixiJS", async (page, { action, step }) => {
  await page.goto("https://pixijs.io/examples/#/demos-basic/container.js");

  await action("Demos-Advanced", async () => {
    await page.click(selectors.sectionByLabel("demos-advanced"));
    await page.waitForTimeout(500);

    await action("Opening Slots example", async () => {
      await openSample(page, "demos-advanced", "slots");

      await step("Clicking button", async () => {
        const bounds = await getCanvasBounds(page);
        await page.mouse.click(
          bounds.left + 25,
          bounds.top + bounds.height - 25
        );
        await page.waitForTimeout(6000);
      });
    });

    await action("Opening Star Warp example", async () => {
      await openSample(page, "demos-advanced", "star warp");
      await page.waitForTimeout(5000);
    });
  });
});
