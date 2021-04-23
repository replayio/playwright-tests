const { example } = require("../src/helpers");
const { openStory, selectors } = require("./shared/storybook");

example("Storybook", async (page, { action, step }) => {
  await page.goto("https://next--storybookjs.netlify.app/official-storybook/");

  await step(
    "/Addons/A11y/BaseButton/Label",
    openStory("/Addons/A11y/BaseButton/Label")
  );
  await step(
    "/Addons/A11y/BaseButton/Disabled",
    openStory("/Addons/A11y/BaseButton/Disabled")
  );
  await step("/Addons/Backgrounds/", openStory("/Addons/Backgrounds/"));
  await action(
    "/Addons/Backgrounds/Overridden",
    openStory("/Addons/Backgrounds/Overridden", async (page, { step }) => {
      await step("Zoom story", async () => {
        for (let i = 0; i < 5; i++) {
          await page.click(selectors.toolbarButtonByTitle("Zoom in"));
        }
        for (let i = 0; i < 5; i++) {
          await page.click(selectors.toolbarButtonByTitle("Zoom out"));
        }
      });

      await action("Activate tabs", async (page, { step }) => {
        const tabs = [
          "Controls",
          "Actions",
          "Story",
          "Events",
          "Knobs",
          "CSS",
          "Accessibility",
          "Tests",
        ];

        for (let tab of tabs) {
          await step(`Selecting ${tab}`, async () => {
            await page.click(selectors.tabByTitle(tab));
            await page.waitForTimeout(250);
          });
        }
      });
    })
  );
});
